import { ArrowRight, Check, Clock, Eye, Sparkles, Star } from '../../lib/icons'
import { scrollToSection, useOrder } from '../../context/OrderContext'
import { TEMPLATES } from '../../data'
import HeroBrowser from './HeroBrowser'
import Stepper from '../order/Stepper'

const VALUES = [
  'Tanpa ribet teknis & tanpa coding',
  'SSL, domain, dan hosting disiapkan',
  '18 template siap pakai, 4 kategori industri',
  'Go-live hari ini, bukan minggu depan',
]

const STATS = [
  { value: '30 menit', label: 'Setup sampai online' },
  { value: `${TEMPLATES.length}`, label: 'Template terkurasi' },
  { value: '4', label: 'Pilihan paket' },
  { value: '0%', label: 'Potongan penjualan' },
]

const padel = TEMPLATES.find((template) => template.id === 'padel-futsal-master')

export default function Hero() {
  const { completedSteps } = useOrder()

  return (
    <section
      id="top"
      className="relative overflow-hidden px-4 pb-14 pt-10 sm:px-6 sm:pt-14 lg:px-8 lg:pb-20 lg:pt-16"
    >
      {/* Ambient background glow */}
      <div aria-hidden="true" className="pointer-events-none absolute inset-0 -z-10">
        <div className="absolute -left-24 top-0 h-[420px] w-[420px] rounded-full bg-indigo-600/15 blur-[120px]" />
        <div className="absolute right-0 top-24 h-[360px] w-[360px] rounded-full bg-violet-600/12 blur-[120px]" />
        <div className="absolute bottom-0 left-1/3 h-[260px] w-[260px] rounded-full bg-emerald-500/8 blur-[110px]" />
      </div>

      <div className="mx-auto grid w-full max-w-7xl items-center gap-12 lg:grid-cols-[1.04fr_0.96fr] lg:gap-12">
        <div className="relative z-10">
          <div className="inline-flex items-center gap-2 rounded-full border border-indigo-400/25 bg-indigo-500/10 px-3 py-1.5 text-[11.5px] font-semibold text-indigo-200 backdrop-blur">
            <Sparkles className="h-3.5 w-3.5" />
            Solusi website instan siap pakai untuk pemilik bisnis
          </div>

          <h1 className="mt-5 text-[32px] font-extrabold leading-[1.1] tracking-tight text-white sm:text-[44px] lg:text-[52px]">
            Go-Live Dalam{' '}
            <span className="relative whitespace-nowrap bg-gradient-to-r from-indigo-300 via-violet-300 to-emerald-300 bg-clip-text text-transparent">
              30 Menit
              <svg
                className="absolute -bottom-1.5 left-0 h-2 w-full text-indigo-400/60"
                viewBox="0 0 300 12"
                preserveAspectRatio="none"
                aria-hidden="true"
              >
                <path
                  d="M2 9C60 3 150 2 298 7"
                  stroke="currentColor"
                  strokeWidth="3"
                  fill="none"
                  strokeLinecap="round"
                />
              </svg>
            </span>
            : Pilih Paket, Tentukan Domain, Pilih Tema Bisnis Anda.
          </h1>

          <p className="mt-5 max-w-xl text-[14.5px] leading-relaxed text-slate-400 sm:text-base">
            Anda tidak perlu mengurus hosting, SSL, atau instalasi apa pun. Cukup pilih paket,
            tentukan nama domain, pilih desain sesuai industri — website resmi
            bisnis Anda langsung aktif dan bisa diakses pelanggan.
          </p>

          <ul className="mt-6 grid max-w-lg grid-cols-1 gap-2.5 sm:grid-cols-2">
            {VALUES.map((value) => (
              <li key={value} className="flex items-start gap-2 text-[12.5px] text-slate-300">
                <span className="mt-0.5 grid h-4 w-4 shrink-0 place-items-center rounded-full bg-emerald-400/15 text-emerald-300 ring-1 ring-emerald-400/30">
                  <Check className="h-2.5 w-2.5" strokeWidth={3} />
                </span>
                {value}
              </li>
            ))}
          </ul>

          <div className="mt-7 flex flex-col gap-3 sm:flex-row sm:items-center">
            <button
              type="button"
              onClick={() => scrollToSection('paket')}
              className="group relative inline-flex items-center justify-center gap-2 overflow-hidden rounded-xl bg-gradient-to-r from-indigo-500 to-violet-500 px-6 py-3.5 text-sm font-bold text-white shadow-[0_18px_45px_-18px_rgba(99,102,241,0.9)] transition hover:brightness-110"
            >
              <span
                aria-hidden="true"
                className="absolute inset-0 -z-10 animate-pulse bg-gradient-to-r from-indigo-400/0 via-white/10 to-violet-400/0"
              />
              Mulai: Pilih Paket
              <ArrowRight className="h-4 w-4 transition group-hover:translate-x-0.5" />
            </button>
            <button
              type="button"
              onClick={() => scrollToSection('katalog')}
              className="inline-flex items-center justify-center gap-2 rounded-xl border border-slate-800/80 bg-white/5 px-6 py-3.5 text-sm font-semibold text-slate-200 backdrop-blur-md transition hover:border-indigo-400/40 hover:bg-white/[0.08] hover:text-white"
            >
              <Eye className="h-4 w-4 text-indigo-300" />
              Lihat Live Preview Template
            </button>
          </div>

          <div className="mt-8 grid max-w-xl grid-cols-2 gap-x-6 gap-y-4 border-t border-slate-800/80 pt-6 sm:grid-cols-4">
            {STATS.map((stat) => (
              <div key={stat.label}>
                <p className="text-[19px] font-extrabold leading-none text-white">{stat.value}</p>
                <p className="mt-1.5 text-[10.5px] leading-tight text-slate-500">{stat.label}</p>
              </div>
            ))}
          </div>

          <div className="mt-5 flex items-center gap-2">
            <div className="flex">
              {[0, 1, 2, 3, 4].map((index) => (
                <Star key={index} className="h-3.5 w-3.5 fill-amber-400 text-amber-400" />
              ))}
            </div>
            <span className="text-[11px] text-slate-400">4.9 dari 120+ pemilik bisnis</span>
          </div>
        </div>

        <div className="relative mx-auto w-full max-w-[520px] lg:max-w-none">
          <HeroBrowser template={padel} />

          <div className="absolute -bottom-6 left-2 z-20 hidden items-center gap-2.5 rounded-xl border border-slate-800/80 bg-[#0b1120]/95 px-3 py-2.5 shadow-[0_24px_60px_-30px_rgba(0,0,0,0.95)] backdrop-blur-md sm:-left-4 sm:flex">
            <span className="grid h-8 w-8 place-items-center rounded-lg bg-indigo-500/15 text-indigo-300">
              <Clock className="h-4 w-4" />
            </span>
            <div>
              <p className="text-[11px] font-bold text-white">Estimasi go-live</p>
              <p className="text-[10px] text-slate-400">± 30 menit setelah pembayaran</p>
            </div>
            <span className="ml-1 flex items-center gap-1 rounded-full bg-emerald-400/15 px-2 py-0.5 text-[9px] font-bold text-emerald-300">
              <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-emerald-400" />
              READY
            </span>
          </div>
        </div>
      </div>

      <div className="mx-auto mt-16 w-full max-w-7xl lg:mt-20">
        <div className="relative z-10 rounded-2xl border border-slate-800/80 bg-[#0b1120] p-4 shadow-[0_30px_80px_-50px_rgba(0,0,0,0.9)] sm:p-5">
          <div className="mb-3.5 flex flex-wrap items-center justify-between gap-2">
            <div className="flex items-center gap-2">
              <span className="text-[11px] font-bold uppercase tracking-[0.2em] text-indigo-300">
                Alur Order
              </span>
              <span className="hidden text-[11px] text-slate-500 sm:inline">
                klik langkah untuk langsung melompat ke form
              </span>
            </div>
            <span className="rounded-full border border-slate-800/80 bg-[#080c14] px-2.5 py-1 text-[10.5px] font-semibold text-slate-400">
              {completedSteps} / 4 langkah siap
            </span>
          </div>
          <Stepper />
        </div>
      </div>
    </section>
  )
}
