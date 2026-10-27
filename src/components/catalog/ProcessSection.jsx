import { CheckCircle2, Clock, CreditCard, Globe, Layers, Rocket } from '../../lib/icons'
import { GO_LIVE_MINUTES } from '../../data/plans'

const STEPS = [
  {
    icon: CreditCard,
    step: '01',
    time: '0–5 menit',
    title: 'Checkout & konfirmasi',
    desc: 'Detail paket, domain, dan tema terkirim otomatis via WhatsApp. Tim sales mengonfirmasi dan mengirim invoice.',
  },
  {
    icon: Globe,
    step: '02',
    time: '5–15 menit',
    title: 'Aktivasi hosting & domain',
    desc: 'SSL diterbitkan, DNS diarahkan, dan website dipasang otomatis. Semua dipantau tanpa downtime.',
  },
  {
    icon: Layers,
    step: '03',
    time: '15–25 menit',
    title: 'Pasang tema & konten',
    desc: 'Template terpasang, logo dan foto bisnis Anda diunggah, nomor WhatsApp serta menu/harga disesuaikan.',
  },
  {
    icon: Rocket,
    step: '04',
    time: '25–30 menit',
    title: 'QA & go-live',
    desc: 'Cek tampilan desktop–mobile, kecepatan, dan form. Website aktif di domain Anda dan siap dibagikan.',
  },
]

export default function ProcessSection() {
  return (
    <section id="cara-kerja" className="relative scroll-mt-20 px-4 py-14 sm:px-6 lg:px-8 lg:py-20">
      <div className="mx-auto w-full max-w-7xl">
        <div className="flex flex-col gap-5 lg:flex-row lg:items-end lg:justify-between">
          <div className="max-w-2xl">
            <span className="text-[11px] font-bold uppercase tracking-[0.22em] text-indigo-400">Cara Kerja</span>
            <h2 className="mt-2.5 text-[26px] font-extrabold leading-tight tracking-tight text-white sm:text-[34px]">
              Dari checkout ke website online dalam {GO_LIVE_MINUTES} menit
            </h2>
            <p className="mt-3 text-[14px] leading-relaxed text-slate-400">
              Tidak ada briefing berhari-hari, tidak ada instalasi manual. Empat tahap ini berjalan
              berurutan setelah pembayaran Anda terkonfirmasi.
            </p>
          </div>
          <div className="inline-flex shrink-0 items-center gap-2 rounded-xl border border-emerald-400/25 bg-emerald-400/[0.06] px-3.5 py-2.5 text-[11.5px] font-semibold text-emerald-200">
            <Clock className="h-4 w-4" />
            Target: online ≤ {GO_LIVE_MINUTES} menit
          </div>
        </div>

        <div className="mt-9 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {STEPS.map(({ icon: Icon, step, time, title, desc }) => (
            <div
              key={step}
              className="group relative overflow-hidden rounded-2xl border border-slate-800/80 bg-[#0b1120] p-5 transition hover:border-indigo-400/30 hover:bg-[#0a111e]"
            >
              <div className="pointer-events-none absolute -right-4 -top-6 text-[68px] font-black leading-none text-white/[0.03] transition group-hover:text-indigo-400/[0.06]">
                {step}
              </div>
              <div className="flex items-center justify-between">
                <span className="grid h-9 w-9 place-items-center rounded-xl bg-indigo-400/10 text-indigo-300 ring-1 ring-inset ring-indigo-400/20">
                  <Icon className="h-4 w-4" />
                </span>
                <span className="rounded-full border border-slate-800/80 px-2 py-0.5 font-mono text-[10px] font-semibold text-slate-400">
                  {time}
                </span>
              </div>
              <h3 className="mt-4 text-[14px] font-bold leading-snug text-white">{title}</h3>
              <p className="mt-1.5 text-[12px] leading-relaxed text-slate-400">{desc}</p>
            </div>
          ))}
        </div>

        <div className="mt-4 flex flex-wrap items-center gap-x-6 gap-y-2 rounded-xl border border-white/[0.07] bg-white/[0.02] px-4 py-3 text-[11.5px] text-slate-400">
          <span className="inline-flex items-center gap-1.5">
            <CheckCircle2 className="h-3.5 w-3.5 text-emerald-300" />
            Tim standby 08.00–21.00 WIB
          </span>
          <span className="inline-flex items-center gap-1.5">
            <CheckCircle2 className="h-3.5 w-3.5 text-emerald-300" />
            Order di luar jam operasional dikerjakan pagi berikutnya
          </span>
          <span className="inline-flex items-center gap-1.5">
            <CheckCircle2 className="h-3.5 w-3.5 text-emerald-300" />
            Progress dikabari via WhatsApp
          </span>
        </div>
      </div>
    </section>
  )
}
