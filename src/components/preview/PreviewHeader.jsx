import {
  ArrowUpRight,
  ChevronLeft,
  Eye,
  LayoutGrid,
  MessageCircle,
  RotateCcw,
} from '../../lib/icons'
import { getCategoryLabel } from '../../data'

/**
 * Dua antarmuka yang dibundel dalam setiap paket:
 * Customer View (halaman jualan) + Admin View (dashboard pengelola).
 */
export const VIEW_OPTIONS = [
  {
    id: 'customer',
    label: 'Customer View',
    short: 'Customer',
    icon: Eye,
    hint: 'Customer View — landing page & alur booking yang dilihat pelanggan',
  },
  {
    id: 'admin',
    label: 'Admin View',
    short: 'Admin',
    icon: LayoutGrid,
    hint: 'Admin View — dashboard pengelola pesanan, jadwal, dan transaksi',
  },
]

/**
 * Header tetap di paling atas halaman pratinjau.
 *
 * Bukan overlay lagi: bar ini mengambil ruangnya sendiri (`h-14`) di dalam
 * layout flex kolom, sehingga tidak pernah menutupi template di bawahnya.
 * Scroll terjadi di dalam iframe, jadi header tidak ikut tergeser.
 */
export default function PreviewHeader({
  template,
  view = 'customer',
  onViewChange,
  onBack,
  onReload,
  waHref,
  onUseTemplate,
  htmlPath,
}) {
  const accent = template?.theme?.accent ?? template?.accentColor ?? '#818cf8'
  const categoryLabel = getCategoryLabel(template?.category)

  return (
    <header
      role="toolbar"
      aria-label="Kontrol pratinjau template"
      className="relative z-50 flex h-14 w-full shrink-0 items-center gap-1 border-b border-white/10 bg-zinc-950/95 px-2 shadow-[0_10px_30px_-24px_rgba(0,0,0,0.9)] backdrop-blur-md sm:gap-2 sm:px-4"
    >
      <button
        type="button"
        onClick={onBack}
        title="Kembali ke katalog FRWeb"
        aria-label="Kembali ke katalog FRWeb"
        className="inline-flex shrink-0 items-center gap-1 rounded-xl px-2 py-1.5 text-[11.5px] font-bold text-slate-300 transition hover:bg-white/10 hover:text-white sm:px-2.5"
      >
        <ChevronLeft className="h-4 w-4" />
        <span className="hidden sm:inline">Kembali</span>
      </button>

      <span aria-hidden="true" className="h-5 w-px shrink-0 bg-white/10" />

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

      {/* Pemilih antarmuka demo: sistem 2-in-1 (Customer View + Admin View) */}
      <span className="hidden shrink-0 text-[9.5px] font-bold uppercase tracking-[0.14em] text-slate-500 xl:inline">
        2 antarmuka
      </span>
      <div
        role="group"
        aria-label="Pilih antarmuka demo: Customer View atau Admin View"
        className="flex shrink-0 items-center gap-0.5 rounded-full border border-white/10 bg-white/[0.04] p-0.5"
      >
        {VIEW_OPTIONS.map((option) => {
          const Icon = option.icon
          const active = option.id === view
          return (
            <button
              key={option.id}
              type="button"
              onClick={() => onViewChange?.(option.id)}
              aria-pressed={active}
              aria-label={option.label}
              title={option.hint}
              className={`inline-flex h-7 items-center gap-1.5 rounded-full px-1.5 text-[10.5px] font-bold transition sm:px-2.5 ${
                active
                  ? 'bg-white text-[#08111f] shadow-sm'
                  : 'text-slate-400 hover:bg-white/10 hover:text-white'
              }`}
            >
              <Icon className="h-3.5 w-3.5" strokeWidth={active ? 2.6 : 2} />
              <span className="hidden sm:inline">{option.label}</span>
            </button>
          )
        })}
      </div>

      <button
        type="button"
        onClick={onReload}
        title="Muat ulang pratinjau"
        aria-label="Muat ulang pratinjau"
        className="hidden h-8 w-8 shrink-0 place-items-center rounded-full text-slate-400 transition hover:bg-white/10 hover:text-white sm:grid"
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
          className="hidden h-8 w-8 shrink-0 place-items-center rounded-full text-slate-400 transition hover:bg-white/10 hover:text-white sm:grid"
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
    </header>
  )
}
