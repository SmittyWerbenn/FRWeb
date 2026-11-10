import { useCallback, useEffect, useRef, useState } from 'react'
import {
  Activity,
  ArrowUpRight,
  CheckCircle2,
  Clock,
  Coffee,
  Loader2,
  Maximize2,
  Pause,
  Play,
  ShieldCheck,
  Sparkles,
  Truck,
} from '../../lib/icons'

const ROTATE_MS = 7000
const SLOW_AFTER_MS = 9000
const SANDBOX =
  'allow-scripts allow-forms allow-modals allow-popups allow-popups-to-escape-sandbox allow-downloads'

const TEMPLATE_ICON = {
  'padel-futsal-master': Activity,
  'quadra-coffee-shop': Coffee,
  'sinartrans-customer': Truck,
  'fine-wo': Sparkles,
}

const SHORT_LABEL = {
  'padel-futsal-master': 'Padel & Futsal',
  'quadra-coffee-shop': 'Quadra Coffee',
  'sinartrans-customer': 'Sinartrans',
  'fine-wo': 'Fine WO',
}

function prefersReducedMotion() {
  if (typeof window === 'undefined' || typeof window.matchMedia !== 'function') return false
  return window.matchMedia('(prefers-reduced-motion: reduce)').matches
}

export default function HeroShowcase({ templates = [], onOpenFullscreen, className = '' }) {
  const [index, setIndex] = useState(0)
  const [loadedId, setLoadedId] = useState('')
  const [slowId, setSlowId] = useState('')
  const [autoPlay, setAutoPlay] = useState(true)
  const [hovering, setHovering] = useState(false)
  const [inView, setInView] = useState(true)
  const [mounted, setMounted] = useState(false)
  const wrapRef = useRef(null)

  const active = templates[index] ?? templates[0] ?? null
  const activeId = active?.id ?? ''
  const isLoaded = Boolean(activeId) && loadedId === activeId
  const isSlow = Boolean(activeId) && !isLoaded && slowId === activeId

  // Timer "aset lambat" — hanya mengaktifkan state dari callback timeout (bukan render).
  useEffect(() => {
    if (!mounted || !activeId || isLoaded) return undefined
    const timer = window.setTimeout(() => setSlowId(activeId), SLOW_AFTER_MS)
    return () => window.clearTimeout(timer)
  }, [mounted, activeId, isLoaded])

  // iframe ditanam setelah paint pertama: template memuat Tailwind CDN + Lucide dari
  // jaringan, jadi teks hero dibiarkan tampil dulu sebelum frame dihidupkan.
  useEffect(() => {
    const start = () => setMounted(true)
    const hasIdle = typeof window.requestIdleCallback === 'function'
    const handle = hasIdle
      ? window.requestIdleCallback(start, { timeout: 1200 })
      : window.setTimeout(start, 250)
    return () => {
      if (hasIdle) window.cancelIdleCallback(handle)
      else window.clearTimeout(handle)
    }
  }, [])

  // Rotasi hanya jalan saat showcase terlihat di viewport.
  useEffect(() => {
    const node = wrapRef.current
    if (!node || typeof IntersectionObserver === 'undefined') return undefined
    const observer = new IntersectionObserver(
      (entries) => {
        const entry = entries[0]
        if (entry) setInView(entry.isIntersecting)
      },
      { threshold: 0.2 },
    )
    observer.observe(node)
    return () => observer.disconnect()
  }, [])

  // Auto-rotation halus tiap 7 detik, berhenti saat hover/fokus atau setelah user klik.
  useEffect(() => {
    if (!autoPlay || hovering || !inView || templates.length < 2) return undefined
    if (prefersReducedMotion()) return undefined
    const timer = window.setInterval(() => {
      setIndex((current) => (current + 1) % templates.length)
    }, ROTATE_MS)
    return () => window.clearInterval(timer)
  }, [autoPlay, hovering, inView, templates.length])

  const selectTemplate = useCallback((nextIndex) => {
    setIndex(nextIndex)
    setAutoPlay(false)
  }, [])

  if (!active) return null

  const label = SHORT_LABEL[active.id] ?? active.name
  const ActiveIcon = TEMPLATE_ICON[active.id] ?? Sparkles

  return (
    <div
      ref={wrapRef}
      data-hero-showcase
      className={`relative pb-8 sm:pb-10 ${className}`}
      onMouseEnter={() => setHovering(true)}
      onMouseLeave={() => setHovering(false)}
      onFocusCapture={() => setHovering(true)}
      onBlurCapture={() => setHovering(false)}
    >
      {/* Pill selector antar template + kontrol auto-play */}
      <div className="relative z-20 mb-3 flex w-full min-w-0 items-center gap-2">
        <div className="no-scrollbar -mx-1 flex min-w-0 flex-1 items-center gap-1.5 overflow-x-auto px-1 py-1">
          {templates.map((tpl, tplIndex) => {
            const isActive = tplIndex === index
            const tplLabel = SHORT_LABEL[tpl.id] ?? tpl.name
            const PillIcon = TEMPLATE_ICON[tpl.id] ?? Sparkles
            return (
              <button
                key={tpl.id}
                type="button"
                data-hero-pill
                onClick={() => selectTemplate(tplIndex)}
                aria-pressed={isActive}
                aria-label={`Tampilkan pratinjau ${tpl.name} di hero`}
                className={`group relative flex shrink-0 items-center gap-1.5 overflow-hidden rounded-full border px-3 py-1.5 text-[12px] font-medium transition duration-300 ${
                  isActive
                    ? 'border-[#0B1F3F] bg-gradient-to-br from-[#0B1F3F] to-[#1E40AF] text-white'
                    : 'border-[#DDE5F3] bg-white text-[#475569] hover:bg-[#E8EEFA] hover:text-[#0B1F3F]'
                }`}
              >
                <span aria-hidden="true" className="grid h-3.5 w-3.5 place-items-center">
                  <PillIcon className="h-3.5 w-3.5" />
                </span>
                <span className="whitespace-nowrap">{tplLabel}</span>
                {isActive ? (
                  <span
                    aria-hidden="true"
                    key={`${tpl.id}-${index}`}
                    className="animate-rotate-progress absolute inset-x-0 bottom-0 h-[2px] origin-left bg-white/70"
                    style={{ animationPlayState: hovering || !autoPlay ? 'paused' : 'running' }}
                  />
                ) : null}
              </button>
            )
          })}
        </div>

        <button
          type="button"
          onClick={() => setAutoPlay((current) => !current)}
          aria-pressed={autoPlay}
          aria-label={autoPlay ? 'Jeda rotasi otomatis' : 'Mulai rotasi otomatis'}
          title={autoPlay ? 'Jeda rotasi otomatis' : 'Mulai rotasi otomatis'}
          className={`grid h-7 w-7 shrink-0 place-items-center rounded-full border transition ${
            autoPlay
              ? 'border-[#0B1F3F] bg-gradient-to-br from-[#0B1F3F] to-[#1E40AF] text-white'
              : 'border-[#DDE5F3] bg-white text-[#64748B] hover:text-[#0B1F3F]'
          }`}
        >
          {autoPlay ? <Pause className="h-3 w-3" /> : <Play className="h-3 w-3" />}
        </button>
      </div>

      <div className="relative">
        {/* Floating badge atas: status provisioning */}
        <div className="absolute -top-3.5 right-2 z-30 hidden items-center gap-1.5 rounded-full border border-[#DDE5F3] bg-white px-3 py-1.5 shadow-[0_8px_24px_-12px_rgba(11,31,63,0.18)] sm:flex">
          <span className="relative grid h-3.5 w-3.5 shrink-0 place-items-center">
            <span aria-hidden="true" className="absolute inset-0 animate-pulse rounded-full bg-[#2F5BEA]/20" />
            <CheckCircle2 className="relative h-3.5 w-3.5 text-[#0B1F3F]" />
          </span>
          <p className="text-[11px] font-semibold tracking-wide text-[#0B1F3F]">
            Auto-provisioning: Complete
          </p>
          <span aria-hidden="true" className="h-1 w-1 rounded-full bg-[#94A3B8]" />
          <p className="text-[11px] font-medium text-[#64748B]">Ready in 30 Min</p>
        </div>

        {/* Frame browser mini */}
        <div className="relative overflow-hidden rounded-2xl border border-[#DDE5F3] bg-white shadow-[0_24px_60px_-30px_rgba(11,31,63,0.18)]">
          <div className="flex items-center gap-2 border-b border-[#DDE5F3] bg-[#E8EEFA] px-3 py-2.5">
            <div className="flex shrink-0 items-center gap-1.5" aria-hidden="true">
              <span className="h-2.5 w-2.5 rounded-full bg-[#C5D0E4]" />
              <span className="h-2.5 w-2.5 rounded-full bg-[#C5D0E4]" />
              <span className="h-2.5 w-2.5 rounded-full bg-[#C5D0E4]" />
            </div>

            <div
              className="ml-1 flex min-w-0 flex-1 items-center gap-1.5 rounded-md border border-[#DDE5F3] bg-white px-2 py-1"
              title="Pratinjau sandbox — alamat demo, bukan URL publik"
            >
              <ShieldCheck className="h-3 w-3 shrink-0 text-[#2F5BEA]" />
              <p data-hero-address className="truncate text-[11px] font-medium text-[#64748B]">
                https://demo.frcloud.id
                <span className="font-semibold text-[#0B1F3F]">/{active.id}</span>
              </p>
            </div>

            <span className="hidden shrink-0 items-center gap-1 rounded-full border border-[#DDE5F3] bg-white px-1.5 py-0.5 text-[9px] font-semibold uppercase tracking-[0.12em] text-[#334155] sm:flex">
              <span aria-hidden="true" className="h-1 w-1 animate-pulse rounded-full bg-gradient-to-br from-[#0B1F3F] to-[#1E40AF]" />
              live
            </span>
          </div>

          <div className="relative w-full">
            {mounted ? (
              <iframe
                key={active.id}
                src={active.htmlPath}
                title={`Pratinjau live template ${active.name}`}
                sandbox={SANDBOX}
                loading="eager"
                referrerPolicy="no-referrer"
                onLoad={() => setLoadedId(active.id)}
                className={`h-[360px] w-full border-0 pointer-events-none transition-opacity duration-500 ease-out md:h-[420px] md:pointer-events-auto ${
                  isLoaded ? 'opacity-100' : 'opacity-0'
                }`}
              />
            ) : (
              <div aria-hidden="true" className="h-[360px] w-full md:h-[420px]" />
            )}

            <div
              className={`pointer-events-none absolute inset-0 z-10 flex flex-col items-center justify-center gap-2.5 bg-[#F5F8FD] transition-opacity duration-300 ${
                isLoaded ? 'opacity-0' : 'opacity-100'
              }`}
            >
              <Loader2 className="h-5 w-5 animate-spin text-[#2F5BEA]" />
              <p className="text-[12px] font-semibold text-[#334155]">Memuat {label}…</p>
              <p className="max-w-[260px] px-4 text-center text-[11px] leading-relaxed text-[#64748B]">
                {isSlow
                  ? 'Aset CDN lambat. Buka demo penuh untuk melihat template utuh.'
                  : 'Menyiapkan pratinjau live di dalam sandbox'}
              </p>
            </div>

            <div
              aria-hidden="true"
              className="pointer-events-none absolute inset-x-0 bottom-0 z-10 h-14 bg-gradient-to-t from-white/60 to-transparent"
            />
          </div>
        </div>

        {/* Floating badge bawah kiri: estimasi go-live */}
        <div className="absolute -bottom-6 left-1 z-30 hidden items-center gap-2.5 rounded-2xl border border-[#DDE5F3] bg-white px-3 py-2.5 shadow-[0_8px_24px_-12px_rgba(11,31,63,0.18)] sm:-left-3 sm:flex">
          <span className="grid h-8 w-8 place-items-center rounded-lg border border-[#DDE5F3] bg-[#E0E9FD] text-[#2F5BEA]">
            <Clock className="h-4 w-4" />
          </span>
          <div>
            <p className="text-[12px] font-semibold text-[#0B1F3F]">Estimasi Go-Live: ~30 Menit</p>
            <p className="text-[11px] text-[#64748B]">DNS &amp; SSL Ready</p>
          </div>
          <span className="ml-1 flex items-center gap-1 rounded-full border border-[#DDE5F3] bg-[#E8EEFA] px-2 py-0.5 text-[10px] font-semibold text-[#334155]">
            <span aria-hidden="true" className="h-1.5 w-1.5 animate-pulse rounded-full bg-gradient-to-br from-[#0B1F3F] to-[#1E40AF]" />
            READY
          </span>
        </div>

        {/* Floating badge bawah kanan: buka demo fullscreen */}
        <button
          type="button"
          onClick={() => onOpenFullscreen?.(active)}
          className="group absolute -bottom-6 right-1 z-30 inline-flex items-center gap-1.5 rounded-full bg-gradient-to-br from-[#0B1F3F] to-[#1E40AF] px-3 py-2 text-[11.5px] font-semibold text-white shadow-[0_8px_24px_-12px_rgba(11,31,63,0.4)] transition hover:-translate-y-0.5 hover:brightness-125 sm:right-0 sm:px-3.5"
        >
          <Maximize2 className="h-3.5 w-3.5" />
          Buka Preview Penuh
          <ArrowUpRight className="h-3 w-3 transition group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
        </button>
      </div>

      <p className="mt-4 flex items-center justify-center gap-1.5 text-center text-[11px] text-[#64748B] sm:text-[11.5px]">
        <ActiveIcon className="h-3 w-3 shrink-0 text-[#64748B]" aria-hidden="true" />
        <span>
          Pratinjau live <span className="font-semibold text-[#334155]">{active.name}</span> — halaman
          asli berjalan di dalam sandbox, bukan gambar.
        </span>
      </p>
    </div>
  )
}
