import { Fragment } from 'react'
import { Check, ChevronRight, CreditCard, Globe, Layers, Rocket } from '../../lib/icons'
import { scrollToSection, useOrder } from '../../context/OrderContext'

export const ORDER_STEPS = [
  {
    id: 'paket',
    number: '01',
    title: 'Pilih Paket',
    short: 'Paket',
    desc: 'Pilih paket sesuai skala bisnis Anda',
    icon: CreditCard,
    target: 'paket',
  },
  {
    id: 'domain',
    number: '02',
    title: 'Tentukan Domain',
    short: 'Domain',
    desc: 'Cek & kunci nama domain bisnis',
    icon: Globe,
    target: 'domain',
  },
  {
    id: 'desain',
    number: '03',
    title: 'Pilih Desain',
    short: 'Desain',
    desc: 'Template instan atau custom design',
    icon: Layers,
    target: 'katalog',
  },
  {
    id: 'deploy',
    number: '04',
    title: 'Deploy & Go-Live',
    short: 'Deploy',
    desc: 'Aktif 30 menit atau sesuai brief custom',
    icon: Rocket,
    target: 'ringkasan',
  },
]

/**
 * Segmented step tracker — breadcrumb pill, bukan card.
 * Latar tiap pill solid (tanpa alpha) + `relative z-10` supaya tidak ada
 * elemen dekoratif dari section di belakangnya yang menembus pill.
 */
const PILL_SURFACE = {
  done: 'border-emerald-400/30 bg-[#07120f] text-emerald-200 hover:border-emerald-400/55 hover:bg-[#081813]',
  active:
    'border-indigo-400/60 bg-[#0c1224] text-white shadow-[0_0_0_1px_rgba(99,102,241,0.18),0_0_26px_-8px_rgba(99,102,241,0.7)]',
  idle: 'border-slate-800/80 bg-[#0b1120] text-slate-500 hover:border-slate-700 hover:text-slate-300',
}

export default function Stepper({ className = '' }) {
  const { order, isDomainReady, isDesignReady, checkoutReady } = useOrder()

  const done = [Boolean(order.planId), isDomainReady, isDesignReady, checkoutReady]
  const activeIndex = done.findIndex((value) => !value)
  const completed = done.filter(Boolean).length
  const progress = (completed / ORDER_STEPS.length) * 100

  return (
    <div className={`relative z-10 ${className}`}>
      <ol
        aria-label="Alur pemesanan"
        className="flex flex-wrap items-center gap-x-1 gap-y-2 lg:flex-nowrap lg:gap-x-1.5"
      >
        {ORDER_STEPS.map((step, index) => {
          const Icon = step.icon
          const isDone = done[index]
          const isActive = index === activeIndex
          const state = isDone ? 'done' : isActive ? 'active' : 'idle'

          return (
            <Fragment key={step.id}>
              {index > 0 && (
                <li aria-hidden="true" className="hidden shrink-0 items-center sm:flex">
                  <ChevronRight className="h-3 w-3 text-slate-600" strokeWidth={2.5} />
                </li>
              )}

              <li className="min-w-0 shrink-0">
                <button
                  type="button"
                  onClick={() => scrollToSection(step.target)}
                  aria-current={isActive ? 'step' : undefined}
                  title={step.desc}
                  className={`relative z-10 inline-flex items-center gap-2 rounded-full border px-2.5 py-1.5 text-left transition sm:px-3 ${PILL_SURFACE[state]}`}
                >
                  <span
                    className={`relative grid h-5 w-5 shrink-0 place-items-center rounded-full ${
                      isDone
                        ? 'bg-emerald-400/20 text-emerald-300'
                        : isActive
                          ? 'bg-indigo-500/20 text-indigo-200'
                          : 'bg-white/[0.04] text-slate-500'
                    }`}
                  >
                    {isDone ? (
                      <Check className="h-3 w-3" strokeWidth={3.5} />
                    ) : (
                      <Icon className="h-3 w-3" />
                    )}
                    {isActive && (
                      <span
                        aria-hidden="true"
                        className="absolute inset-0 animate-pulse-ring rounded-full ring-1 ring-indigo-400/60"
                      />
                    )}
                  </span>

                  <span className="font-mono text-[9.5px] font-bold tabular-nums opacity-60">
                    {step.number}
                  </span>
                  <span className="whitespace-nowrap text-[11.5px] font-semibold">
                    <span className="hidden sm:inline">{step.title}</span>
                    <span className="sm:hidden">{step.short}</span>
                  </span>
                </button>
              </li>
            </Fragment>
          )
        })}

        <li className="ml-auto hidden shrink-0 items-center gap-1.5 pl-3 lg:flex">
          <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-emerald-400" />
          <span className="font-mono text-[10px] font-semibold tabular-nums text-slate-400">
            {completed}/{ORDER_STEPS.length} siap
          </span>
        </li>
      </ol>

      <div className="mt-3 flex items-center gap-3">
        <div className="h-[3px] flex-1 overflow-hidden rounded-full bg-white/[0.06]">
          <div
            className="h-full rounded-full bg-gradient-to-r from-indigo-500 via-violet-400 to-emerald-400 transition-all duration-500"
            style={{ width: `${progress}%` }}
          />
        </div>
        <span className="shrink-0 font-mono text-[9.5px] font-semibold tabular-nums text-slate-500 lg:hidden">
          {completed}/{ORDER_STEPS.length}
        </span>
      </div>
    </div>
  )
}
