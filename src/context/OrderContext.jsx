import { createContext, useCallback, useContext, useEffect, useMemo, useState } from 'react'
import { TEMPLATES } from '../data'
import { CUSTOM_FEATURE_IDS } from '../data/customFeatures'
import { DEFAULT_PLAN_ID, PLANS_BY_ID } from '../data/plans'
import { DEFAULT_TLD, fullDomain, validateDomainName } from '../lib/domain'
import { buildCustomOrderLink, buildOrderLink, buildWhatsAppLink } from '../lib/format'

const STORAGE_KEY = 'frcloud:order:v2'
const VIEWPORT_IDS = ['desktop', 'tablet', 'mobile']
export const DESIGN_MODES = ['template', 'custom']

const EMPTY_BRIEF = { reference: '', features: [], notes: '' }

const OrderContext = createContext(null)

function sanitizeBrief(raw) {
  if (!raw || typeof raw !== 'object') return { ...EMPTY_BRIEF }
  const features = Array.isArray(raw.features)
    ? [...new Set(raw.features.filter((id) => CUSTOM_FEATURE_IDS.includes(id)))]
    : []
  return {
    reference: typeof raw.reference === 'string' ? raw.reference : '',
    features,
    notes: typeof raw.notes === 'string' ? raw.notes : '',
  }
}

function readInitialOrder() {
  const fallback = {
    planId: DEFAULT_PLAN_ID,
    domainName: '',
    tld: DEFAULT_TLD,
    templateId: '',
    designMode: 'template',
    custom: { ...EMPTY_BRIEF },
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
      designMode: DESIGN_MODES.includes(parsed.designMode) ? parsed.designMode : fallback.designMode,
      custom: sanitizeBrief(parsed.custom),
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

  // Paket Custom Solution selalu memakai jalur Custom Design (langkah 3 terkunci).
  const designLocked = plan.price === null
  const designMode = designLocked ? 'custom' : order.designMode
  const customBrief = order.custom ?? EMPTY_BRIEF

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
    const next = PLANS_BY_ID[planId]
    if (!next) return
    setOrder((current) => ({
      ...current,
      planId,
      designMode: next.price === null ? 'custom' : current.designMode,
    }))
  }, [])

  const setDomainName = useCallback((domainName) => {
    setOrder((current) => ({ ...current, domainName }))
  }, [])

  const setTld = useCallback((tld) => {
    setOrder((current) => ({ ...current, tld }))
  }, [])

  const setDesignMode = useCallback((mode) => {
    if (!DESIGN_MODES.includes(mode)) return
    setOrder((current) => {
      const currentPlan = PLANS_BY_ID[current.planId]
      // Mode template tidak tersedia untuk paket Custom Solution.
      if (mode === 'template' && currentPlan?.price === null) return current
      return { ...current, designMode: mode }
    })
  }, [])

  const selectTemplate = useCallback((templateId) => {
    setOrder((current) => {
      const currentPlan = PLANS_BY_ID[current.planId]
      return {
        ...current,
        templateId,
        designMode: currentPlan?.price === null ? 'custom' : 'template',
      }
    })
  }, [])

  const clearTemplate = useCallback(() => {
    setOrder((current) => ({ ...current, templateId: '' }))
  }, [])

  const setCustomReference = useCallback((reference) => {
    setOrder((current) => ({ ...current, custom: { ...current.custom, reference } }))
  }, [])

  const setCustomNotes = useCallback((notes) => {
    setOrder((current) => ({ ...current, custom: { ...current.custom, notes } }))
  }, [])

  const toggleCustomFeature = useCallback((featureId) => {
    if (!CUSTOM_FEATURE_IDS.includes(featureId)) return
    setOrder((current) => {
      const selected = current.custom?.features ?? []
      const features = selected.includes(featureId)
        ? selected.filter((id) => id !== featureId)
        : [...selected, featureId]
      return { ...current, custom: { ...current.custom, features } }
    })
  }, [])

  const resetCustomBrief = useCallback(() => {
    setOrder((current) => ({ ...current, custom: { ...EMPTY_BRIEF } }))
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
      designMode: 'template',
      custom: { ...EMPTY_BRIEF },
    })
  }, [])

  const previewTemplate = useMemo(
    () => TEMPLATES.find((item) => item.id === previewId) ?? null,
    [previewId],
  )

  const isDomainReady = domainCheck.state === 'valid'
  const isTemplateReady = designMode === 'template' && Boolean(template)
  const isCustomDesignReady =
    customBrief.reference.trim().length > 0 || customBrief.features.length > 0
  const isDesignReady = designMode === 'custom' ? isCustomDesignReady : Boolean(template)
  const completedSteps = 1 + (isDomainReady ? 1 : 0) + (isDesignReady ? 1 : 0)
  const checkoutReady = isDomainReady && isDesignReady

  const waOrderLink =
    designMode === 'custom'
      ? buildCustomOrderLink({
          planName: plan.name,
          planPrice: plan.price,
          domain,
          reference: customBrief.reference,
          features: customBrief.features,
          notes: customBrief.notes,
        })
      : buildOrderLink({
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
    designMode,
    designLocked,
    customBrief,
    isDomainReady,
    isTemplateReady,
    isCustomDesignReady,
    isDesignReady,
    checkoutReady,
    completedSteps,
    waOrderLink,
    waTemplateLink,
    selectPlan,
    setDomainName,
    setTld,
    setDesignMode,
    selectTemplate,
    clearTemplate,
    setCustomReference,
    setCustomNotes,
    toggleCustomFeature,
    resetCustomBrief,
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
