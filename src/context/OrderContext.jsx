import { createContext, useCallback, useContext, useEffect, useMemo, useState } from 'react'
import { TEMPLATES } from '../data'
import { DEFAULT_PLAN_ID, PLANS_BY_ID } from '../data/plans'
import { DEFAULT_TLD, fullDomain, validateDomainName } from '../lib/domain'
import { buildOrderLink, buildWhatsAppLink } from '../lib/format'

const STORAGE_KEY = 'frcloud:order:v1'
const VIEWPORT_IDS = ['desktop', 'tablet', 'mobile']

const OrderContext = createContext(null)

function readInitialOrder() {
  const fallback = {
    planId: DEFAULT_PLAN_ID,
    domainName: '',
    tld: DEFAULT_TLD,
    templateId: '',
  }
  if (typeof window === 'undefined') return fallback
  try {
    const raw = window.localStorage.getItem(STORAGE_KEY)
    if (!raw) return fallback
    const parsed = JSON.parse(raw)
    return {
      planId: PLANS_BY_ID[parsed.planId] ? parsed.planId : fallback.planId,
      domainName: typeof parsed.domainName === 'string' ? parsed.domainName : '',
      tld: typeof parsed.tld === 'string' && parsed.tld.startsWith('.') ? parsed.tld : fallback.tld,
      templateId: TEMPLATES.some((item) => item.id === parsed.templateId) ? parsed.templateId : '',
    }
  } catch {
    return fallback
  }
}

function readPreviewFromUrl() {
  if (typeof window === 'undefined') return { previewId: null, viewport: 'desktop' }
  const params = new URLSearchParams(window.location.search)
  const preview = params.get('preview')
  const viewport = params.get('viewport')
  return {
    previewId: TEMPLATES.some((item) => item.id === preview) ? preview : null,
    viewport: VIEWPORT_IDS.includes(viewport) ? viewport : 'desktop',
  }
}

function syncPreviewUrl(previewId, viewport) {
  if (typeof window === 'undefined') return
  const url = new URL(window.location.href)
  if (previewId) {
    url.searchParams.set('preview', previewId)
    url.searchParams.set('viewport', viewport)
  } else {
    url.searchParams.delete('preview')
    url.searchParams.delete('viewport')
  }
  window.history.replaceState({}, '', url)
}

export function scrollToSection(id) {
  if (typeof document === 'undefined') return
  document.getElementById(id)?.scrollIntoView({ behavior: 'smooth', block: 'start' })
}

export function OrderProvider({ children }) {
  const [order, setOrder] = useState(readInitialOrder)
  const [initialPreview] = useState(readPreviewFromUrl)
  const [previewId, setPreviewId] = useState(initialPreview.previewId)
  const [previewViewport, setPreviewViewport] = useState(initialPreview.viewport)

  const plan = PLANS_BY_ID[order.planId] ?? PLANS_BY_ID[DEFAULT_PLAN_ID]
  const template = useMemo(
    () => TEMPLATES.find((item) => item.id === order.templateId) ?? null,
    [order.templateId],
  )
  const domainCheck = validateDomainName(order.domainName)
  const domain = fullDomain(order.domainName, order.tld)

  useEffect(() => {
    try {
      window.localStorage.setItem(STORAGE_KEY, JSON.stringify(order))
    } catch {
      /* mode privat — abaikan */
    }
  }, [order])

  useEffect(() => {
    syncPreviewUrl(previewId, previewViewport)
  }, [previewId, previewViewport])

  const closePreview = useCallback(() => {
    setPreviewId(null)
  }, [])

  useEffect(() => {
    if (!previewId) return undefined
    const previousOverflow = document.body.style.overflow
    document.body.style.overflow = 'hidden'

    const onKeyDown = (event) => {
      if (event.key === 'Escape') closePreview()
    }
    window.addEventListener('keydown', onKeyDown)

    return () => {
      document.body.style.overflow = previousOverflow
      window.removeEventListener('keydown', onKeyDown)
    }
  }, [previewId, closePreview])

  const selectPlan = useCallback((planId) => {
    if (!PLANS_BY_ID[planId]) return
    setOrder((current) => ({ ...current, planId }))
  }, [])

  const setDomainName = useCallback((domainName) => {
    setOrder((current) => ({ ...current, domainName }))
  }, [])

  const setTld = useCallback((tld) => {
    setOrder((current) => ({ ...current, tld }))
  }, [])

  const selectTemplate = useCallback((templateId) => {
    setOrder((current) => ({ ...current, templateId }))
  }, [])

  const clearTemplate = useCallback(() => {
    setOrder((current) => ({ ...current, templateId: '' }))
  }, [])

  const openPreview = useCallback((nextTemplate) => {
    if (!nextTemplate?.id) return
    setPreviewId(nextTemplate.id)
    setPreviewViewport('desktop')
  }, [])

  const resetOrder = useCallback(() => {
    setOrder({
      planId: DEFAULT_PLAN_ID,
      domainName: '',
      tld: DEFAULT_TLD,
      templateId: '',
    })
  }, [])

  const previewTemplate = useMemo(
    () => TEMPLATES.find((item) => item.id === previewId) ?? null,
    [previewId],
  )

  const isDomainReady = domainCheck.state === 'valid'
  const isTemplateReady = Boolean(template)
  const completedSteps = 1 + (isDomainReady ? 1 : 0) + (isTemplateReady ? 1 : 0)
  const checkoutReady = isDomainReady && isTemplateReady
  const waOrderLink = buildOrderLink({
    planName: plan.name,
    planPrice: plan.price,
    domain,
    templateName: template?.name,
  })
  const waTemplateLink = template ? buildWhatsAppLink(template.name) : ''

  const value = {
    order,
    plan,
    template,
    domain,
    domainCheck,
    previewTemplate,
    previewViewport,
    isDomainReady,
    isTemplateReady,
    checkoutReady,
    completedSteps,
    waOrderLink,
    waTemplateLink,
    selectPlan,
    setDomainName,
    setTld,
    selectTemplate,
    clearTemplate,
    resetOrder,
    openPreview,
    closePreview,
    setPreviewViewport,
  }

  return <OrderContext.Provider value={value}>{children}</OrderContext.Provider>
}

export function useOrder() {
  const context = useContext(OrderContext)
  if (!context) throw new Error('useOrder harus dipakai di dalam OrderProvider')
  return context
}
