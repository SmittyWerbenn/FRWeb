import { ArrowRight, Check, Clock, MessageCircle, Sparkles } from '../../lib/icons'
import { WA_CONSULT, formatIDR } from '../../lib/format'
import { scrollToSection, useOrder } from '../../context/OrderContext'

const POINTS = [
  'Website aktif di domain Anda dalam 30 menit',
  'SSL, hosting, dan tema sudah terpasang',
  'Pendampingan konten via WhatsApp',
]

export default function CtaSection() {
  const { plan, template, domain, checkoutReady, waOrderLink } = useOrder()
  const totalLabel = plan.price === null ? 'Custom' : formatIDR(plan.price)

  return (
    <section className="relative px-4 py-14 sm:px-6 lg:px-8 lg:py-20">
      <div className="mx-auto w-full max-w-7xl">
        <div className="relative overflow-hidden rounded-3xl border border-slate-800/80 bg-gradient-to-br from-[#0b1424] via-[#070c16] to-[#0a1a17] px-5 py-9 sm:px-9 sm:py-11">
          <div className="pointer-events-none absolute -right-24 -top-24 h-64 w-64 rounded-full bg-indigo-500/15 blur-[90px]" />
          <div className="pointer-events-none absolute -bottom-24 -left-16 h-64 w-64 rounded-full bg-emerald-400/10 blur-[90px]" />

          <div className="relative grid gap-8 lg:grid-cols-[1.15fr_0.85fr] lg:items-center">
            <div>
              <span className="inline-flex items-center gap-1.5 rounded-full border border-indigo-400/25 bg-indigo-400/10 px-3 py-1 text-[11px] font-semibold text-indigo-300">
                <Sparkles className="h-3.5 w-3.5" />
                Siap go-live hari ini
              </span>
              <h2 className="mt-4 text-[26px] font-extrabold leading-tight tracking-tight text-white sm:text-[34px]">
                Website resmi bisnis Anda bisa online sebelum makan siang
              </h2>
              <p className="mt-3 max-w-xl text-[13.5px] leading-relaxed text-slate-400">
                Pilih paket, kunci domain, tentukan tema — sisanya kami yang kerjakan. Tidak perlu
                tim IT, tidak perlu menunggu antrean pengembangan.
              </p>

              <ul className="mt-5 grid gap-2 sm:grid-cols-2">
                {POINTS.map((point) => (
                  <li key={point} className="flex items-start gap-2 text-[12.5px] text-slate-300">
                    <Check className="mt-0.5 h-3.5 w-3.5 shrink-0 text-emerald-300" strokeWidth={3} />
                    {point}
                  </li>
                ))}
              </ul>
            </div>

            <div className="rounded-2xl border border-slate-800/80 bg-[#080c14]/80 p-4 backdrop-blur">
              <p className="text-[10px] uppercase tracking-wider text-slate-500">Order Anda saat ini</p>
              <div className="mt-3 space-y-2 text-[12px]">
                <div className="flex items-center justify-between gap-3">
                  <span className="text-slate-400">Paket</span>
                  <span className="truncate font-semibold text-white">{plan.name}</span>
                </div>
                <div className="flex items-center justify-between gap-3">
                  <span className="text-slate-400">Domain</span>
                  <span className={`truncate font-semibold ${domain ? 'text-white' : 'text-slate-500'}`}>
                    {domain || 'belum dipilih'}
                  </span>
                </div>
                <div className="flex items-center justify-between gap-3">
                  <span className="text-slate-400">Template</span>
                  <span className={`truncate font-semibold ${template ? 'text-white' : 'text-slate-500'}`}>
                    {template ? template.name : 'belum dipilih'}
                  </span>
                </div>
                <div className="flex items-center justify-between gap-3 border-t border-slate-800/80 pt-2.5">
                  <span className="text-slate-400">Total</span>
                  <span className="text-[14px] font-extrabold text-white">{totalLabel}</span>
                </div>
              </div>

              <div className="mt-3 flex items-center gap-1.5 text-[10.5px] text-slate-500">
                <Clock className="h-3 w-3" />
                Estimasi go-live ± 30 menit
              </div>

              {checkoutReady ? (
                <a
                  href={waOrderLink}
                  target="_blank"
                  rel="noreferrer"
                  className="mt-3 inline-flex w-full items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-emerald-400 to-teal-300 px-4 py-3 text-[12.5px] font-bold text-[#04140f] transition hover:brightness-110"
                >
                  <MessageCircle className="h-4 w-4" />
                  Proses &amp; Go-Live
                </a>
              ) : (
                <button
                  type="button"
                  onClick={() => scrollToSection('paket')}
                  className="mt-3 inline-flex w-full items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-indigo-400 to-violet-300 px-4 py-3 text-[12.5px] font-bold text-[#04121f] transition hover:brightness-110"
                >
                  Mulai Pilih Paket
                  <ArrowRight className="h-4 w-4" />
                </button>
              )}

              <a
                href={WA_CONSULT}
                target="_blank"
                rel="noreferrer"
                className="mt-2 inline-flex w-full items-center justify-center gap-1.5 rounded-xl border border-slate-800/80 px-4 py-2.5 text-[11.5px] font-semibold text-slate-300 transition hover:border-white/25 hover:bg-white/5"
              >
                Konsultasi dulu
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
