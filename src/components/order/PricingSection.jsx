import { ArrowUpRight, Check, CreditCard, MessageCircle, Minus, Sparkles } from '../../lib/icons'
import { PLANS } from '../../data/plans'
import { formatIDR } from '../../lib/format'
import { scrollToSection, useOrder } from '../../context/OrderContext'

function PlanCard({ plan }) {
  const { order, selectPlan } = useOrder()
  const selected = order.planId === plan.id
  const isCustom = plan.price === null

  return (
    <div
      className={`group relative flex flex-col overflow-hidden rounded-2xl border p-5 transition duration-300 ${
        selected
          ? 'border-emerald-400/50 bg-emerald-400/[0.06] shadow-[0_25px_60px_-35px_rgba(52,211,153,0.45)]'
          : 'border-slate-800/80 bg-[#0b1120] hover:-translate-y-1 hover:border-indigo-500/50'
      }`}
    >
      {plan.recommended && (
        <span className="absolute right-4 top-4 inline-flex items-center gap-1 rounded-full bg-gradient-to-r from-emerald-400 to-teal-300 px-2.5 py-1 text-[9.5px] font-black uppercase tracking-wider text-[#04140f]">
          <Sparkles className="h-2.5 w-2.5" />
          {plan.badge}
        </span>
      )}

      <button
        type="button"
        onClick={() => selectPlan(plan.id)}
        aria-pressed={selected}
        aria-label={`Pilih ${plan.name}`}
        className="absolute inset-0 z-0 cursor-pointer rounded-2xl focus:outline-none focus-visible:ring-2 focus-visible:ring-indigo-400"
      />

      <div className="pointer-events-none relative z-10 flex flex-1 flex-col">
        <div className="flex items-start gap-2">
          <span
            className={`mt-0.5 grid h-4 w-4 shrink-0 place-items-center rounded-full border transition ${
              selected ? 'border-emerald-400 bg-emerald-400 text-[#04140f]' : 'border-white/25 text-transparent'
            }`}
          >
            <Check className="h-2.5 w-2.5" strokeWidth={4} />
          </span>
          <div>
            <h3 className="text-[15px] font-extrabold tracking-tight text-white">{plan.name}</h3>
            <p className="mt-1 text-[11.5px] leading-snug text-slate-400">{plan.tagline}</p>
          </div>
        </div>

        <div className="mt-4">
          {isCustom ? (
            <p className="text-[22px] font-extrabold leading-none text-white">Hubungi WhatsApp</p>
          ) : (
            <p className="flex flex-wrap items-baseline gap-1">
              <span className="text-[22px] font-extrabold leading-none text-white">{formatIDR(plan.price)}</span>
              <span className="text-[10.5px] font-medium text-slate-500">{plan.priceSuffix}</span>
            </p>
          )}
        </div>

        <p className="mt-3 rounded-lg bg-white/[0.03] px-2.5 py-2 text-[11px] leading-snug text-slate-400">
          <span className="font-semibold text-slate-300">Cocok untuk: </span>
          {plan.bestFor}
        </p>

        <ul className="mt-4 flex-1 space-y-2">
          {plan.specs.map((spec) => (
            <li key={spec} className="flex items-start gap-2 text-[11.5px] leading-snug text-slate-300">
              <span
                className="mt-[3px] grid h-3.5 w-3.5 shrink-0 place-items-center rounded-full"
                style={{ background: `${plan.accent}24`, color: plan.accent }}
              >
                <Check className="h-2 w-2" strokeWidth={3.5} />
              </span>
              {spec}
            </li>
          ))}
          {plan.notIncluded.map((spec) => (
            <li key={spec} className="flex items-start gap-2 text-[11px] leading-snug text-slate-500 line-through decoration-slate-700">
              <span className="mt-[3px] grid h-3.5 w-3.5 shrink-0 place-items-center rounded-full bg-white/5">
                <Minus className="h-2 w-2" strokeWidth={3} />
              </span>
              {spec}
            </li>
          ))}
        </ul>

        <button
          type="button"
          onClick={() => {
            selectPlan(plan.id)
            scrollToSection('domain')
          }}
          className={`pointer-events-auto mt-5 inline-flex w-full items-center justify-center gap-1.5 rounded-lg px-3 py-2.5 text-[12px] font-bold transition ${
            selected
              ? 'bg-emerald-400 text-[#04140f] hover:brightness-110'
              : 'border border-white/15 bg-white/[0.04] text-white hover:border-indigo-400/50 hover:bg-white/[0.09]'
          }`}
        >
          {selected ? (
            <>
              <Check className="h-3.5 w-3.5" strokeWidth={3} />
              Paket Terpilih
            </>
          ) : (
            <>
              {isCustom ? <MessageCircle className="h-3.5 w-3.5" /> : <CreditCard className="h-3.5 w-3.5" />}
              {isCustom ? 'Konsultasi Custom' : 'Pilih Paket Ini'}
            </>
          )}
        </button>
      </div>
    </div>
  )
}

export default function PricingSection() {
  return (
    <section id="paket" className="relative scroll-mt-20 px-4 py-14 sm:px-6 lg:px-8 lg:py-20">
      <div className="mx-auto w-full max-w-7xl">
        <div className="flex flex-col gap-5 lg:flex-row lg:items-end lg:justify-between">
          <div className="max-w-2xl">
            <span className="text-[11px] font-bold uppercase tracking-[0.22em] text-indigo-400">Langkah 1</span>
            <h2 className="mt-2.5 text-[26px] font-extrabold leading-tight tracking-tight text-white sm:text-[34px]">
              Pilih paket sesuai kebutuhan website Anda
            </h2>
            <p className="mt-3 text-[14px] leading-relaxed text-slate-400">
              Harga setup sekali bayar, sudah termasuk aktivasi, SSL, dan penyambungan
              domain. Tidak ada biaya tersembunyi — Anda bisa upgrade kapan saja.
            </p>
          </div>
          <a
            href="#domain"
            className="inline-flex shrink-0 items-center gap-1.5 rounded-xl border border-slate-800/80 bg-white/[0.03] px-4 py-2.5 text-[12.5px] font-semibold text-slate-200 transition hover:border-white/25 hover:bg-white/[0.07]"
          >
            Sudah tahu paketnya? Lanjut ke domain
            <ArrowUpRight className="h-3.5 w-3.5" />
          </a>
        </div>

        <div className="mt-8 grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
          {PLANS.map((plan) => (
            <PlanCard key={plan.id} plan={plan} />
          ))}
        </div>

        <div className="mt-5 flex flex-wrap items-center gap-x-6 gap-y-2 rounded-xl border border-white/[0.07] bg-white/[0.02] px-4 py-3 text-[11.5px] text-slate-400">
          {['Invoice resmi & pembayaran transfer/QRIS', 'Garansi revisi konten 7 hari', 'Domain & hosting atas nama Anda'].map(
            (item) => (
              <span key={item} className="inline-flex items-center gap-1.5">
                <Check className="h-3.5 w-3.5 text-emerald-300" strokeWidth={3} />
                {item}
              </span>
            ),
          )}
        </div>
      </div>
    </section>
  )
}
