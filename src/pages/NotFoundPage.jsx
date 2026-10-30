import { ChevronLeft, LayoutGrid, Sparkles } from '../lib/icons'
import { catalogHref, HOME_PATH } from '../lib/router'

/**
 * Fallback 404 — dipakai untuk slug pratinjau yang tidak ada di katalog
 * maupun path aplikasi yang tidak dikenal.
 */
export default function NotFoundPage({ slug = '' }) {
  const isPreview = Boolean(slug)

  return (
    <div className="relative flex min-h-screen flex-col items-center justify-center overflow-hidden bg-[#080c14] px-5 py-16 text-slate-100 antialiased">
      <div className="pointer-events-none absolute inset-0 bg-grid opacity-[0.18]" />
      <div className="pointer-events-none absolute -top-32 left-1/2 h-[420px] w-[620px] -translate-x-1/2 rounded-full bg-indigo-600/15 blur-[120px]" />

      <div className="relative w-full max-w-lg rounded-3xl border border-slate-800/80 bg-[#0b1120]/90 p-7 text-center shadow-[0_40px_120px_-60px_rgba(2,6,23,0.95)] sm:p-9">
        <span className="inline-flex items-center gap-1.5 rounded-full border border-indigo-400/30 bg-indigo-500/10 px-3 py-1 text-[10.5px] font-bold uppercase tracking-[0.14em] text-indigo-300">
          <Sparkles className="h-3 w-3" />
          404 · {isPreview ? 'Preview tidak tersedia' : 'Halaman tidak ditemukan'}
        </span>

        <h1 className="mt-5 text-[24px] font-extrabold leading-tight tracking-tight text-white sm:text-[28px]">
          {isPreview ? 'Template ini tidak ada di katalog' : 'Alamat ini tidak mengarah ke halaman mana pun'}
        </h1>

        <p className="mx-auto mt-3 max-w-sm text-[13px] leading-relaxed text-slate-400">
          {isPreview ? (
            <>
              Kami tidak menemukan template dengan slug{' '}
              <span className="rounded bg-white/5 px-1.5 py-0.5 font-mono text-[12px] text-slate-200">
                {slug}
              </span>
              . Kemungkinan tautan salah ketik atau template sudah diganti versi barunya.
            </>
          ) : (
            'Tautan mungkin sudah berubah. Kembali ke katalog untuk melihat 25 template siap go-live.'
          )}
        </p>

        <div className="mt-7 flex flex-col gap-2.5 sm:flex-row sm:justify-center">
          <a
            href={catalogHref()}
            className="inline-flex items-center justify-center gap-1.5 rounded-xl bg-gradient-to-r from-indigo-500 to-violet-500 px-4 py-2.5 text-[12.5px] font-bold text-white transition hover:brightness-110"
          >
            <LayoutGrid className="h-3.5 w-3.5" />
            Kembali ke Katalog
          </a>
          <a
            href={HOME_PATH}
            className="inline-flex items-center justify-center gap-1.5 rounded-xl border border-slate-700/80 bg-white/[0.03] px-4 py-2.5 text-[12.5px] font-bold text-slate-200 transition hover:border-indigo-400/50 hover:bg-indigo-500/10 hover:text-white"
          >
            <ChevronLeft className="h-3.5 w-3.5" />
            Halaman Utama
          </a>
        </div>
      </div>
    </div>
  )
}
