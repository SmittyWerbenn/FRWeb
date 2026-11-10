import { ArrowRight, Check, Eye, Globe, LayoutGrid, Sparkles, Star } from '../../lib/icons'
import { scrollToSection, useOrder } from '../../context/OrderContext'
import { TEMPLATES } from '../../data'
import HeroShowcase from './HeroShowcase'
import { openPreviewRoute } from '../../lib/router'
import Stepper from '../order/Stepper'

const VALUES = [
  'Tanpa ribet teknis & tanpa coding',
  'SSL, domain, dan hosting disiapkan',
  '26 template siap pakai, 5 kategori industri',
  'Go-live hari ini, bukan minggu depan',
]

const STATS = [
  { value: '30 menit', label: 'Setup sampai online' },
  { value: `${TEMPLATES.length}`, label: 'Template terkurasi' },
  { value: '4', label: 'Pilihan paket' },
  { value: '0%', label: 'Potongan penjualan' },
]

const SHOWCASE_IDS = [
  'padel-futsal-master',
  'quadra-coffee-shop',
  'sinartrans-customer',
  'fine-wo',
]

const SHOWCASE_TEMPLATES = SHOWCASE_IDS.map((id) => TEMPLATES.find((template) => template.id === id)).filter(
  Boolean,
)

export default function Hero() {
  const { completedSteps } = useOrder()

  const openFullscreenPreview = (template) => {
    if (template?.id) openPreviewRoute(template.id)
  }

  return (
    <section
      id="top"
      className="relative overflow-hidden bg-[#F9FAFB] px-4 pb-14 pt-10 text-[#0B1F3F] sm:px-6 sm:pt-14 lg:px-8 lg:pb-20 lg:pt-16"
    >
      <div aria-hidden="true" className="pointer-events-none absolute inset-0 -z-0">
        <div className="bg-dots absolute inset-0" />
        <div className="absolute -right-24 top-10 h-[420px] w-[420px] rounded-full bg-[#DCE4F2]/70 blur-[110px]" />
        <div className="absolute -left-32 bottom-0 h-[320px] w-[320px] rounded-full bg-[#F3F4F6] blur-[100px]" />
      </div>

      <div className="relative mx-auto grid w-full max-w-7xl items-center gap-12 lg:grid-cols-[1.04fr_0.96fr] lg:gap-14">
        <div className="animate-fade-up relative z-10">
          <div className="inline-flex items-center gap-2 rounded-full border border-[#E5E7EB] bg-[#F3F4F6] px-3 py-1.5 text-[11.5px] font-medium text-[#374151]">
            <Sparkles className="h-3.5 w-3.5 text-[#6B7280]" />
            Solusi website instan siap pakai untuk pemilik bisnis
          </div>

          <h1 className="mt-5 text-[32px] font-semibold leading-[1.1] tracking-[-0.03em] text-[#0B1F3F] sm:text-[44px] lg:text-[52px]">
            Go-Live Dalam{' '}
            <span className="relative whitespace-nowrap">
              30 Menit
              <svg
                className="absolute -bottom-1.5 left-0 h-2 w-full text-[#0B1F3F]/25"
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
            : Pilih Paket, Tentukan Domain, lalu Pilih Template atau Custom Design.
          </h1>

          <p className="mt-5 max-w-xl text-[14.5px] leading-relaxed text-[#6B7280] sm:text-base">
            Anda tidak perlu mengurus hosting, SSL, atau instalasi apa pun. Cukup pilih paket,
            tentukan nama domain, pilih desain sesuai industri — website resmi
            bisnis Anda langsung aktif dan bisa diakses pelanggan.
          </p>

          <ul className="mt-6 grid max-w-lg grid-cols-1 gap-2.5 sm:grid-cols-2">
            {VALUES.map((value) => (
              <li key={value} className="flex items-start gap-2 text-[13px] text-[#4B5563]">
                <span className="mt-0.5 grid h-4 w-4 shrink-0 place-items-center rounded-full border border-[#E5E7EB] bg-white text-[#475569]">
                  <Check className="h-2.5 w-2.5" strokeWidth={3} />
                </span>
                {value}
              </li>
            ))}
          </ul>

          {/* Value proposition 2-in-1: satu paket, dua antarmuka */}
          <div className="mt-6 flex max-w-xl items-start gap-3 rounded-2xl border border-[#E5E7EB] bg-white p-4">
            <span className="mt-0.5 grid h-8 w-8 shrink-0 place-items-center rounded-xl border border-[#E5E7EB] bg-[#F3F4F6] text-[#374151]">
              <LayoutGrid className="h-4 w-4" />
            </span>
            <div className="min-w-0">
              <p className="text-[10.5px] font-semibold uppercase tracking-[0.16em] text-[#6B7280]">
                Sistem 2-in-1 di setiap paket
              </p>
              <p className="mt-1 text-[13px] leading-relaxed text-[#4B5563]">
                Setiap paket sudah mencakup <strong className="font-semibold text-[#0B1F3F]">Web Customer</strong>{' '}
                (Landing Page &amp; Booking) +{' '}
                <strong className="font-semibold text-[#0B1F3F]">Dashboard Admin Pengelola</strong> (Pantau
                Pesanan, Jadwal &amp; Transaksi).
              </p>
              <div className="mt-2.5 flex flex-wrap items-center gap-1.5">
                <span className="inline-flex items-center gap-1 rounded-md border border-[#E5E7EB] bg-[#F9FAFB] px-2 py-1 text-[11px] font-medium text-[#374151]">
                  <Globe className="h-3 w-3 text-[#6B7280]" />
                  Customer View
                </span>
                <span aria-hidden="true" className="text-[11px] font-semibold text-[#9CA3AF]">
                  +
                </span>
                <span className="inline-flex items-center gap-1 rounded-md border border-[#E5E7EB] bg-[#F9FAFB] px-2 py-1 text-[11px] font-medium text-[#374151]">
                  <LayoutGrid className="h-3 w-3 text-[#6B7280]" />
                  Admin View
                </span>
              </div>
            </div>
          </div>

          <div className="mt-7 flex flex-col gap-3 sm:flex-row sm:items-center">
            <button
              type="button"
              onClick={() => scrollToSection('paket')}
              className="group inline-flex items-center justify-center gap-2 rounded-full bg-[#0B1F3F] px-6 py-3.5 text-sm font-semibold text-white transition hover:bg-[#17315F]"
            >
              Mulai: Pilih Paket
              <ArrowRight className="h-4 w-4 transition group-hover:translate-x-0.5" />
            </button>
            <button
              type="button"
              onClick={() => scrollToSection('katalog')}
              className="inline-flex items-center justify-center gap-2 rounded-full border border-[#E5E7EB] bg-transparent px-6 py-3.5 text-sm font-semibold text-[#0B1F3F] transition hover:bg-[#F3F4F6]"
            >
              <Eye className="h-4 w-4 text-[#6B7280]" />
              Lihat Live Preview Template
            </button>
          </div>

          <div className="mt-9 grid max-w-xl grid-cols-2 gap-x-6 gap-y-4 border-t border-[#E5E7EB] pt-6 sm:grid-cols-4">
            {STATS.map((stat) => (
              <div key={stat.label}>
                <p className="text-[22px] font-bold leading-none tracking-tight text-[#0B1F3F]">{stat.value}</p>
                <p className="mt-1.5 text-[11.5px] leading-tight text-[#6B7280]">{stat.label}</p>
              </div>
            ))}
          </div>

          <div className="mt-5 flex items-center gap-2">
            <div className="flex">
              {[0, 1, 2, 3, 4].map((index) => (
                <Star key={index} className="h-3.5 w-3.5 fill-[#0B1F3F] text-[#0B1F3F]" />
              ))}
            </div>
            <span className="text-[12px] text-[#6B7280]">4.9 dari 120+ pemilik bisnis</span>
          </div>
        </div>

        <div className="animate-fade-up delay-2 relative mx-auto w-full min-w-0 max-w-[520px] lg:max-w-none">
          <HeroShowcase templates={SHOWCASE_TEMPLATES} onOpenFullscreen={openFullscreenPreview} />
        </div>
      </div>

      <div className="mx-auto mt-16 w-full max-w-7xl lg:mt-20">
        <div className="relative z-10 rounded-2xl border border-[#E5E7EB] bg-white p-4 sm:p-5">
          <div className="mb-3.5 flex flex-wrap items-center justify-between gap-2">
            <div className="flex items-center gap-2">
              <span className="text-[11.5px] font-semibold uppercase tracking-[0.2em] text-[#0B1F3F]">
                Alur Order
              </span>
              <span className="hidden text-[12px] text-[#6B7280] sm:inline">
                klik langkah untuk langsung melompat ke form
              </span>
            </div>
            <span className="rounded-full border border-[#E5E7EB] bg-[#F3F4F6] px-2.5 py-1 text-[11px] font-medium text-[#374151]">
              {completedSteps} / 4 langkah siap
            </span>
          </div>
          <Stepper />
        </div>
      </div>
    </section>
  )
}
