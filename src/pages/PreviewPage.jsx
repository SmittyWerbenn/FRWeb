import { useCallback, useEffect, useMemo, useState } from 'react'
import { Loader2, RotateCcw, ShieldCheck } from '../lib/icons'
import { TEMPLATES_BY_ID } from '../data'
import { useOrder } from '../context/OrderContext'
import { buildWhatsAppLink } from '../lib/format'
import { leavePreview, previewPath } from '../lib/router'
import PreviewHeader from '../components/preview/PreviewHeader'
import PreviewRenderer from '../components/preview/PreviewRenderer'
import NotFoundPage from './NotFoundPage'

/**
 * Sandbox ketat (tanpa allow-same-origin): file template berjalan di origin
 * opak sehingga tidak bisa membaca cookie/localStorage aplikasi, tapi tetap
 * bisa menjalankan interaksinya sendiri (filter, kalkulator, form).
 */
const IFRAME_SANDBOX = [
  'allow-scripts',
  'allow-forms',
  'allow-modals',
  'allow-popups',
  'allow-popups-to-escape-sandbox',
  'allow-downloads',
].join(' ')

const VIEWPORT_MAX_WIDTH = { desktop: null, tablet: 834, mobile: 390 }
const VIEWPORT_IDS = Object.keys(VIEWPORT_MAX_WIDTH)
const SLOW_AFTER_MS = 8000

function readViewportFromUrl() {
  if (typeof window === 'undefined') return 'desktop'
  const value = new URLSearchParams(window.location.search).get('viewport')
  return VIEWPORT_IDS.includes(value) ? value : 'desktop'
}

/**
 * Halaman pratinjau penuh (`/preview/:slug`).
 *
 * Menggantikan modal lama: iframe mengisi 100% viewport, tidak ada scroll-lock
 * pada body, dan seluruh navigasi kembali memakai History API.
 */
export default function PreviewPage({ slug }) {
  const template = TEMPLATES_BY_ID[slug] ?? null
  const { selectTemplate } = useOrder()
  const [viewport, setViewport] = useState(readViewportFromUrl)
  const [frameState, setFrameState] = useState('loading')
  const [slow, setSlow] = useState(false)
  const [reloadKey, setReloadKey] = useState(0)

  const waHref = useMemo(
    () =>
      template
        ? buildWhatsAppLink(template.name, {
            extra: `Saya baru saja melihat live preview penuh di ${previewPath(template.id)}.`,
          })
        : '#',
    [template],
  )

  // Judul tab + noindex: halaman ini duplikat isi file template, jadi tidak
  // perlu masuk indeks mesin pencari.
  useEffect(() => {
    if (!template) return undefined
    const previousTitle = document.title
    document.title = `${template.name} — Live Preview | FRWeb`

    const robots = document.createElement('meta')
    robots.setAttribute('name', 'robots')
    robots.setAttribute('content', 'noindex, follow')
    document.head.appendChild(robots)

    const themeColor = document.createElement('meta')
    themeColor.setAttribute('name', 'theme-color')
    themeColor.setAttribute('content', '#05070d')
    document.head.appendChild(themeColor)

    return () => {
      document.title = previousTitle
      robots.remove()
      themeColor.remove()
    }
  }, [template])

  // Escape = kembali, mengikuti kebiasaan halaman fullscreen.
  useEffect(() => {
    const onKeyDown = (event) => {
      if (event.key === 'Escape') leavePreview()
    }
    window.addEventListener('keydown', onKeyDown)
    return () => window.removeEventListener('keydown', onKeyDown)
  }, [])

  // Timer "aset lambat" memakai timeout, bukan state saat render.
  useEffect(() => {
    if (frameState !== 'loading') return undefined
    const timer = window.setTimeout(() => setSlow(true), SLOW_AFTER_MS)
    return () => window.clearTimeout(timer)
  }, [frameState, reloadKey])

  // File template yang hilang tetap memicu `onLoad` di iframe (body 404),
  // jadi keberadaannya diverifikasi lewat HEAD sebelum dinyatakan siap.
  useEffect(() => {
    if (!template) return undefined
    let cancelled = false
    const controller = new AbortController()

    fetch(template.htmlPath, { method: 'HEAD', signal: controller.signal, cache: 'no-store' })
      .then((response) => {
        if (cancelled || response.ok) return
        setFrameState('error')
      })
      .catch(() => {
        /* offline / diblokir: biarkan iframe mencoba sendiri */
      })

    return () => {
      cancelled = true
      controller.abort()
    }
  }, [template, reloadKey])

  const handleViewportChange = useCallback((next) => {
    if (!VIEWPORT_IDS.includes(next)) return
    setViewport(next)
    if (typeof window === 'undefined') return
    const url = new URL(window.location.href)
    if (next === 'desktop') url.searchParams.delete('viewport')
    else url.searchParams.set('viewport', next)
    window.history.replaceState(window.history.state, '', url)
  }, [])

  const handleReload = useCallback(() => {
    setSlow(false)
    setFrameState('loading')
    setReloadKey((current) => current + 1)
  }, [])

  const handleFrameLoad = useCallback(() => {
    setSlow(false)
    setFrameState('ready')
  }, [])

  const handleUseTemplate = useCallback(() => {
    if (template) selectTemplate(template.id)
  }, [template, selectTemplate])

  if (!template) return <NotFoundPage slug={slug} />

  const maxWidth = VIEWPORT_MAX_WIDTH[viewport]
  const isFramed = viewport !== 'desktop'

  return (
    <div className="fixed inset-0 flex flex-col overflow-hidden bg-[#05070d] text-slate-100 antialiased">
      <PreviewHeader
        template={template}
        viewport={viewport}
        onViewportChange={handleViewportChange}
        onBack={leavePreview}
        onReload={handleReload}
        waHref={waHref}
        onUseTemplate={handleUseTemplate}
        htmlPath={template.htmlPath}
      />

      <div
        className={`flex min-h-0 w-full flex-1 items-stretch justify-center bg-[#05070d] ${
          isFramed ? 'px-3 pb-4 pt-3 sm:px-6 sm:pt-4' : ''
        }`}
      >
        <div
          className={`relative h-full w-full overflow-hidden bg-white ${
            isFramed
              ? 'rounded-[26px] border-[6px] border-[#12161f] shadow-[0_40px_120px_-40px_rgba(0,0,0,0.95)]'
              : ''
          }`}
          style={{ maxWidth: maxWidth ? `${maxWidth}px` : '100%', width: '100%' }}
        >
          {frameState === 'error' ? (
            <div className="preview-scroll h-full w-full overflow-y-auto overscroll-contain bg-white">
              <PreviewRenderer template={template} />
            </div>
          ) : (
            <iframe
              key={`${template.id}-${reloadKey}`}
              src={template.htmlPath}
              title={`Live preview ${template.name}`}
              sandbox={IFRAME_SANDBOX}
              loading="eager"
              referrerPolicy="no-referrer"
              allow="fullscreen"
              onLoad={handleFrameLoad}
              className="block h-full w-full border-0 bg-white"
            />
          )}

          {frameState === 'loading' && (
            <div className="absolute inset-0 z-30 flex flex-col items-center justify-center gap-3 bg-[#080c14] px-6 text-center">
              <span className="grid h-11 w-11 place-items-center rounded-full border border-white/10 bg-white/[0.03]">
                <Loader2 className="h-5 w-5 animate-spin text-indigo-300" />
              </span>
              <p className="text-[13px] font-bold text-white">Memuat {template.name}…</p>
              <p className="max-w-sm text-[11.5px] leading-relaxed text-slate-400">
                {slow
                  ? 'Aset CDN template sedang lambat. Halaman tetap dibuka penuh — tunggu sebentar atau muat ulang.'
                  : 'Menjalankan file template asli di dalam sandbox terisolasi.'}
              </p>
              {slow && (
                <button
                  type="button"
                  onClick={handleReload}
                  className="mt-1 inline-flex items-center gap-1.5 rounded-lg border border-white/12 bg-white/5 px-3 py-1.5 text-[11px] font-bold text-slate-200 transition hover:border-indigo-400/40 hover:text-white"
                >
                  <RotateCcw className="h-3.5 w-3.5" />
                  Muat ulang
                </button>
              )}
            </div>
          )}

          {frameState === 'error' && (
            <div className="pointer-events-none absolute inset-x-0 bottom-0 z-30 flex justify-center p-3 sm:p-4">
              <p className="pointer-events-auto inline-flex items-center gap-1.5 rounded-full border border-amber-300/25 bg-[#1a1408]/90 px-3 py-1.5 text-[10.5px] font-semibold text-amber-200 backdrop-blur">
                <ShieldCheck className="h-3 w-3" />
                File template tidak dapat dimuat — menampilkan versi render cadangan.
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
