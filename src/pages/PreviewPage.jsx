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

/**
 * Template multi-halaman (SPA dengan bundler sendiri) memuat CSS/JS lewat path
 * relatif dan memakai History API. Di origin opak, loader modul diblokir
 * browser sehingga halaman tampil kosong. Untuk entri yang menandai
 * `allowSameOrigin: true` di katalog, sandbox dilonggarkan sesuai slug itu saja.
 *
 * Risiko: iframe dapat membaca `parent.document`. Dibatasi hanya ke slug yang
 * memang memerlukannya.
 */
const IFRAME_SANDBOX_OPEN = `${IFRAME_SANDBOX} allow-same-origin`

const SLOW_AFTER_MS = 8000
const DEFAULT_VIEW_IDS = ['customer', 'admin']

function viewIdsFor(template) {
  const options = template?.viewOptions
  if (!Array.isArray(options) || options.length === 0) return DEFAULT_VIEW_IDS
  return options.map((option) => option.id)
}

function readViewFromUrl(allowed) {
  if (typeof window === 'undefined') return allowed[0]
  const value = new URLSearchParams(window.location.search).get('view')
  return allowed.includes(value) ? value : allowed[0]
}

/**
 * Petakan view aktif ke file antarmuka pada template.
 *
 * Sinartrans membundel tiga antarmuka dalam satu SPA dan router-nya berbasis
 * path (BrowserRouter), jadi portal tidak bisa dipilih dari query string.
 * Tiap portal punya entry HTML tipis yang menyetel `window.__SNT_PORTAL__`
 * sebelum bundle dimuat: index.html (customer), driver.html (kurir),
 * admin.html (admin). Template biasa: customer/admin seperti semula.
 */
function resolveViewPath(template, view) {
  if (!template) return null
  const driverPath = template.driverHtmlPath
  if (view === 'driver' && driverPath) return driverPath
  if (view === 'admin' || view === 'admin-driver') return template.adminHtmlPath
  return template.htmlPath
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
  const viewIds = useMemo(() => viewIdsFor(template), [template])
  const [view, setView] = useState(() => readViewFromUrl(viewIdsFor(template)))
  const viewLabel = template?.viewOptions?.find((option) => option.id === view)?.label
  const [frameState, setFrameState] = useState('loading')
  const [slow, setSlow] = useState(false)
  const [reloadKey, setReloadKey] = useState(0)

  // Pratinjau selalu lebar penuh: tidak ada lagi simulator viewport, jadi
  // halaman template memakai seluruh ruang iframe.
  const activePath = resolveViewPath(template, view)

  // Sandbox longgar hanya untuk entri yang menandai `allowSameOrigin` (SPA
  // multi-halaman). Entri lain tetap di origin opak.
  const frameSandbox = template?.allowSameOrigin ? IFRAME_SANDBOX_OPEN : IFRAME_SANDBOX

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
    const viewLabel = template.viewOptions?.find((option) => option.id === view)?.label
    document.title = `${template.name} — ${viewLabel ?? 'Live Preview'} | FRWeb`

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
  }, [template, view])

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
    if (!template || !activePath) return undefined
    let cancelled = false
    const controller = new AbortController()

    fetch(activePath, { method: 'HEAD', signal: controller.signal, cache: 'no-store' })
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
  }, [template, activePath, reloadKey])

  const handleViewChange = useCallback(
    (next) => {
      if (!viewIds.includes(next)) return
      setView(next)
      setSlow(false)
      setFrameState('loading')
      if (typeof window === 'undefined') return
      const url = new URL(window.location.href)
      // View default tidak menuliskan parameter agar URL tetap ringkas.
      if (next === viewIds[0]) url.searchParams.delete('view')
      else url.searchParams.set('view', next)
      // Bersihkan parameter lama `?viewport=` dari tautan yang masih tersebar.
      url.searchParams.delete('viewport')
      window.history.replaceState(window.history.state, '', url)
    },
    [viewIds],
  )

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

  return (
    <div className="fixed inset-0 flex flex-col overflow-hidden bg-[#05070d] text-slate-100 antialiased">
      <PreviewHeader
        template={template}
        view={view}
        onViewChange={handleViewChange}
        onBack={leavePreview}
        onReload={handleReload}
        waHref={waHref}
        onUseTemplate={handleUseTemplate}
        htmlPath={activePath}
        viewOptions={template.viewOptions}
      />

      <div className="flex min-h-0 w-full flex-1 items-stretch justify-center bg-[#05070d]">
        <div className="relative h-full w-full overflow-hidden bg-white">
          {frameState === 'error' ? (
            view === 'customer' ? (
              <div className="preview-scroll h-full w-full overflow-y-auto overscroll-contain bg-white">
                <PreviewRenderer template={template} />
              </div>
            ) : (
              <div className="flex h-full w-full flex-col items-center justify-center gap-3 bg-[#080c14] px-6 text-center">
                <span className="grid h-11 w-11 place-items-center rounded-full border border-amber-300/25 bg-amber-300/[0.06]">
                  <ShieldCheck className="h-5 w-5 text-amber-200" />
                </span>
                <p className="text-[13px] font-bold text-white">
                  {viewLabel ?? 'Antarmuka'} belum dapat dimuat
                </p>
                <p className="max-w-sm text-[11.5px] leading-relaxed text-slate-400">
                  File antarmuka template ini tidak merespons. Muat ulang, atau kembali ke Customer Site
                  untuk melihat halaman pelanggannya.
                </p>
                <div className="mt-1 flex flex-wrap items-center justify-center gap-2">
                  <button
                    type="button"
                    onClick={handleReload}
                    className="inline-flex items-center gap-1.5 rounded-lg border border-white/12 bg-white/5 px-3 py-1.5 text-[11px] font-bold text-slate-200 transition hover:border-indigo-400/40 hover:text-white"
                  >
                    <RotateCcw className="h-3.5 w-3.5" />
                    Muat ulang
                  </button>
                  <button
                    type="button"
                    onClick={() => handleViewChange('customer')}
                    className="inline-flex items-center gap-1.5 rounded-lg bg-white px-3 py-1.5 text-[11px] font-bold text-[#08111f] transition hover:brightness-95"
                  >
                    Buka Customer Site
                  </button>
                </div>
              </div>
            )
          ) : (
            <iframe
              key={`${template.id}-${view}-${reloadKey}`}
              src={activePath}
              title={`${viewLabel ?? 'Live preview'} ${template.name}`}
              sandbox={frameSandbox}
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
              <p className="text-[13px] font-bold text-white">
                {view === 'admin' ? `Memuat Dashboard Admin ${template.name}…` : `Memuat ${template.name}…`}
              </p>
              <p className="max-w-sm text-[11.5px] leading-relaxed text-slate-400">
                {slow
                  ? 'Aset CDN template sedang lambat. Halaman tetap dibuka penuh — tunggu sebentar atau muat ulang.'
                  : view === 'admin'
                    ? 'Menjalankan dashboard pengelola: pesanan, jadwal, dan transaksi di dalam sandbox terisolasi.'
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

          {frameState === 'error' && view === 'customer' && (
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
