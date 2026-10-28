import { ArrowRight, Check, Clock, MessageCircle, ShieldCheck, Sparkles } from '../../lib/icons'
import { WA_CONSULT } from '../../lib/format'
import { scrollToSection, useOrder } from '../../context/OrderContext'

const POINTS = [
  'Website aktif di domain Anda dalam 30 menit',
  'SSL, hosting, dan tema sudah terpasang',
  'Pendampingan konten via WhatsApp',
]

const GUARANTEES = [
  { icon: Clock, label: 'Go-live ± 30 menit', note: 'Setelah pembayaran terkonfirmasi' },
  { icon: ShieldCheck, label: 'Domain, SSL & hosting beres', note: 'Tidak ada biaya tersembunyi' },
  { icon: MessageCircle, label: 'Pendampingan 1-on-1', note: 'Langsung ke tim, bukan bot' },
]

export default function CtaSection() {
  const { checkoutReady, waOrderLink } = useOrder()

  return (
    <section className="relative px-4 py-14 sm:px-6 lg:px-8 lg:py-20">
      <div className="mx-auto w-full max-w-5xl">
        <div className="relative overflow-hidden rounded-3xl border border-slate-800/80 bg-gradient-to-br from-[#0b1424] via-[#070c16] to-[#0a1a17] px-5 py-10 sm:px-9 sm:py-12">
          <div className="pointer-events-none absolute -right-24 -top-24 h-64 w-64 rounded-full bg-indigo-500/15 blur-[90px]" />
          <div className="pointer-events-none absolute -bottom-28 -left-20 h-64 w-64 rounded-full bg-emerald-400/12 blur-[90px]" />
          <div className="pointer-events-none absolute left-1/2 top-0 h-px w-3/4 -translate-x-1/2 bg-gradient-to-r from-transparent via-emerald-300/40 to-transparent" />

          <div className="relative mx-auto flex max-w-2xl flex-col items-center text-center">
            <span className="inline-flex items-center gap-1.5 rounded-full border border-indigo-400/25 bg-indigo-400/10 px-3 py-1 text-[11px] font-semibold text-indigo-300">
              <Sparkles className="h-3.5 w-3.5" />
              Siap go-live hari ini
            </span>

            <h2 className="mt-4 text-[26px] font-extrabold leading-tight tracking-tight text-white sm:text-[34px]">
              Website resmi bisnis Anda bisa online sebelum makan siang
            </h2>

            <p className="mt-3 max-w-xl text-[13.5px] leading-relaxed text-slate-400">
              Pilih paket, kunci domain, tentukan tema — sisanya kami yang kerjakan. Tidak perlu tim
              IT, tidak perlu menunggu antrean pengembangan.
            </p>

            <ul className="mt-5 flex flex-col items-center gap-2 sm:flex-row sm:flex-wrap sm:justify-center sm:gap-x-5 sm:gap-y-2">
              {POINTS.map((point) => (
                <li key={point} className="flex items-start gap-2 text-[12.5px] text-slate-300">
                  <Check className="mt-0.5 h-3.5 w-3.5 shrink-0 text-emerald-300" strokeWidth={3} />
                  {point}
                </li>
              ))}
            </ul>

            <div className="mt-7 flex w-full flex-col items-stretch gap-2.5 sm:w-auto sm:flex-row sm:items-center sm:justify-center">
              {checkoutReady ? (
                <a
                  href={waOrderLink}
                  target="_blank"
                  rel="noreferrer"
                  className="inline-flex items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-emerald-400 to-teal-300 px-6 py-3.5 text-[13px] font-bold text-[#04140f] shadow-[0_10px_30px_-12px_rgba(16,185,129,0.7)] transition hover:brightness-110"
                >
                  <MessageCircle className="h-4 w-4" />
                  Proses &amp; Go-Live via WhatsApp
                </a>
              ) : (
                <button
                  type="button"
                  onClick={() => scrollToSection('order')}
                  className="inline-flex items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-emerald-400 to-teal-300 px-6 py-3.5 text-[13px] font-bold text-[#04140f] shadow-[0_10px_30px_-12px_rgba(16,185,129,0.7)] transition hover:brightness-110"
                >
                  Proses &amp; Go-Live via WhatsApp
                  <ArrowRight className="h-4 w-4" />
                </button>
              )}

              <a
                href={WA_CONSULT}
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center justify-center gap-1.5 rounded-xl border border-slate-700/80 px-6 py-3.5 text-[12.5px] font-semibold text-slate-300 transition hover:border-white/25 hover:bg-white/5 hover:text-white"
              >
                Konsultasi Dulu
              </a>
            </div>

            <p className="mt-3 text-[11px] text-slate-500">
              {checkoutReady
                ? 'Pesanan Anda sudah lengkap — lanjut konfirmasi lewat WhatsApp.'
                : 'Belum lengkap? Tombol di atas mengarahkan ke langkah yang tersisa.'}
            </p>

            <div className="mt-8 grid w-full gap-2.5 border-t border-slate-800/70 pt-6 sm:grid-cols-3">
              {GUARANTEES.map(({ icon: Icon, label, note }) => (
                <div
                  key={label}
                  className="flex items-start gap-2.5 rounded-xl border border-slate-800/60 bg-[#080c14]/60 px-3 py-2.5 text-left"
                >
                  <Icon className="mt-0.5 h-4 w-4 shrink-0 text-emerald-300" />
                  <div>
                    <p className="text-[11.5px] font-semibold leading-tight text-white">{label}</p>
                    <p className="mt-0.5 text-[10.5px] leading-snug text-slate-500">{note}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
