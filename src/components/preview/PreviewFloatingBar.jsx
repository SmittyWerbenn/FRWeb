import {
  ArrowUpRight,
  ChevronLeft,
  MessageCircle,
  Monitor,
  RotateCcw,
  Smartphone,
  Tablet,
} from '../../lib/icons'
import { getCategoryLabel } from '../../data'

const VIEWPORT_OPTIONS = [
  { id: 'desktop', label: 'Desktop', icon: Monitor },
  { id: 'tablet', label: 'Tablet', icon: Tablet },
  { id: 'mobile', label: 'Mobile', icon: Smartphone },
]

/**
 * Floating action bar di atas halaman pratinjau penuh.
 *
 * `fixed` (bukan `sticky`) supaya selalu terlihat di atas iframe template:
 * scroll terjadi di dalam iframe, bukan di dokumen induk, sehingga bar
 * tidak ikut tergeser sama sekali. Latar glassmorphism gelap dipakai agar
 * kontras terhadap template terang maupun gelap.
 */
export default function PreviewFloatingBar({
  template,
  viewport,
  onViewportChange,
  onBack,
  onReload,
  waHref,
  onUseTemplate,
  htmlPath,
}) {
  const accent = template?.theme?.accent ?? template?.accentColor ?? '#818cf8'
  const categoryLabel = getCategoryLabel(template?.category)

  return (
    <div className="pointer-events-none fixed inset-x-0 top-0 z-50 flex justify-center px-2 pt-2 sm:px-4 sm:pt-4">
      <div
        role="toolbar"
        aria-label="Kontrol pratinjau template"
        className="pointer-events-auto flex w-full max-w-3xl items-center gap-1.5 rounded-2xl border border-white/12 bg-zinc-950/80 px-1.5 py-1.5 shadow-[0_24px_70px_-30px_rgba(0,0,0,0.95)] backdrop-blur-md sm:gap-2 sm:rounded-full sm:px-2.5 sm:py-2"
      >
        <button
          type="button"
          onClick={onBack}
          title="Kembali ke katalog FRWeb"
          aria-label="Kembali ke katalog FRWeb"
          className="inline-flex shrink-0 items-center gap-1 rounded-xl px-2 py-1.5 text-[11.5px] font-bold text-slate-300 transition hover:bg-white/10 hover:text-white sm:rounded-full sm:px-2.5"
        >
          <ChevronLeft className="h-4 w-4" />
          <span className="hidden sm:inline">Kembali</span>
        </button>

        <span aria-hidden="true" className="h-5 w-px shrink-0 bg-white/12" />

        <div className="flex min-w-0 flex-1 items-center gap-1.5 sm:gap-2">
          <span
            aria-hidden="true"
            className="h-2 w-2 shrink-0 rounded-full ring-2 ring-white/10"
            style={{ background: accent }}
          />
          <p className="min-w-0 truncate text-[12px] font-bold text-white">{template?.name}</p>
          {categoryLabel ? (
            <span className="hidden shrink-0 rounded-full bg-white/[0.07] px-2 py-0.5 text-[9.5px] font-semibold uppercase tracking-[0.1em] text-slate-300 sm:inline-flex">
              {categoryLabel}
            </span>
          ) : null}
        </div>

        <div className="hidden shrink-0 items-center gap-0.5 rounded-full border border-white/10 bg-white/[0.04] p-0.5 lg:flex">
          {VIEWPORT_OPTIONS.map((option) => {
            const Icon = option.icon
            const active = option.id === viewport
            return (
              <button
                key={option.id}
                type="button"
                onClick={() => onViewportChange(option.id)}
                aria-pressed={active}
                title={`Tampilan ${option.label}`}
                className={`grid h-6 w-7 place-items-center rounded-full transition ${
                  active ? 'bg-white text-[#08111f]' : 'text-slate-400 hover:bg-white/10 hover:text-white'
                }`}
              >
                <Icon className="h-3.5 w-3.5" />
              </button>
            )
          })}
        </div>

        <button
          type="button"
          onClick={onReload}
          title="Muat ulang pratinjau"
          aria-label="Muat ulang pratinjau"
          className="hidden h-7 w-7 shrink-0 place-items-center rounded-full text-slate-400 transition hover:bg-white/10 hover:text-white sm:grid"
        >
          <RotateCcw className="h-3.5 w-3.5" />
        </button>

        {htmlPath ? (
          <a
            href={htmlPath}
            target="_blank"
            rel="noopener noreferrer"
            title="Buka file template di tab baru"
            aria-label="Buka file template di tab baru"
            className="hidden h-7 w-7 shrink-0 place-items-center rounded-full text-slate-400 transition hover:bg-white/10 hover:text-white sm:grid"
          >
            <ArrowUpRight className="h-3.5 w-3.5" />
          </a>
        ) : null}

        <a
          href={waHref}
          target="_blank"
          rel="noopener noreferrer"
          onClick={onUseTemplate}
          className="inline-flex shrink-0 items-center gap-1.5 rounded-xl bg-gradient-to-r from-emerald-400 to-teal-400 px-2.5 py-1.5 text-[11.5px] font-black text-[#04140f] shadow-[0_12px_30px_-14px_rgba(16,185,129,0.9)] transition hover:brightness-110 sm:rounded-full sm:px-3.5 sm:py-2"
        >
          <MessageCircle className="h-3.5 w-3.5" />
          <span className="hidden sm:inline">Gunakan Template</span>
          <span className="sm:hidden">Pakai</span>
        </a>
      </div>
    </div>
  )
}
