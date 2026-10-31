import {
  ArrowRight,
  Check,
  Gauge,
  Globe,
  LayoutGrid,
  Server,
  ShieldCheck,
  Sparkles,
  Wallet,
} from '../../lib/icons'
import { scrollToSection } from '../../context/OrderContext'

const CUSTOMER_POINTS = [
  'Landing page & halaman produk/jasa siap jual',
  'Form booking, jadwal, dan kalkulator harga',
  'Checkout / order via WhatsApp langsung ke admin',
  'Galeri, testimoni, dan info kontak bisnis',
]

const ADMIN_POINTS = [
  'Pantau pesanan & booking yang masuk',
  'Kelola jadwal dan ketersediaan slot',
  'Rekap transaksi serta laporan penjualan',
  'Ubah konten, harga, dan foto tanpa coding',
]

const FEATURES = [
  {
    icon: Server,
    title: 'Siap pakai tanpa urus teknis',
    desc: 'Website, SSL, dan domain sudah dikonfigurasi sesuai paket. Anda tidak perlu menyentuh terminal atau panel hosting.',
  },
  {
    icon: Globe,
    title: 'Domain & SSL tanpa drama',
    desc: 'Pointing DNS, penerbitan SSL, sampai redirect www ditangani tim kami. Domain tetap terdaftar atas nama bisnis Anda.',
  },
  {
    icon: Gauge,
    title: 'Dibuat untuk konversi',
    desc: 'Setiap template punya alur jelas: tombol WhatsApp, form booking, kalkulator harga, dan bukti sosial yang siap meyakinkan calon pelanggan.',
  },
  {
    icon: ShieldCheck,
    title: 'Aman & terpantau',
    desc: 'Proteksi DDoS, backup berkala, dan monitoring uptime. Jika ada gangguan, tim kami yang bergerak lebih dulu.',
  },
  {
    icon: Wallet,
    title: 'Harga transparan',
    desc: 'Satu harga setup, tanpa biaya tersembunyi. Upgrade paket kapan saja saat trafik bisnis Anda tumbuh.',
  },
  {
    icon: Sparkles,
    title: 'Konten mudah diubah',
    desc: 'Ganti foto, menu, harga, dan jadwal lewat panel sederhana atau minta bantuan tim kami lewat WhatsApp.',
  },
]

const GUARANTEES = [
  'Garansi revisi konten 7 hari',
  'Website online ≤ 24 jam atau uang kembali',
  'Pendampingan onboarding via WhatsApp',
]

export default function ValueSection() {
  return (
    <section id="keunggulan" className="relative scroll-mt-20 px-4 py-14 sm:px-6 lg:px-8 lg:py-20">
      <div className="mx-auto w-full max-w-7xl">
        <div className="max-w-2xl">
          <span className="text-[11px] font-bold uppercase tracking-[0.22em] text-indigo-400">Keunggulan</span>
          <h2 className="mt-2.5 text-[26px] font-extrabold leading-tight tracking-tight text-white sm:text-[34px]">
            Semua kerumitan teknis kami ambil alih
          </h2>
          <p className="mt-3 text-[14px] leading-relaxed text-slate-400">
            Fokus Anda adalah bisnisnya, bukan urusan teknis. FRWeb menangani setup,
            keamanan, dan performa agar website Anda siap menerima pelanggan sejak menit pertama.
          </p>
        </div>

        {/* Value proposition utama: paket = 2 antarmuka */}
        <div className="mt-8 overflow-hidden rounded-2xl border border-indigo-400/25 bg-gradient-to-br from-indigo-500/[0.10] via-violet-500/[0.05] to-transparent p-5 sm:p-6">
          <div className="flex flex-wrap items-center gap-2">
            <span className="inline-flex items-center gap-1.5 rounded-full bg-indigo-500/20 px-2.5 py-1 text-[10px] font-black uppercase tracking-[0.14em] text-indigo-200 ring-1 ring-inset ring-indigo-400/30">
              <LayoutGrid className="h-3 w-3" />
              2-in-1
            </span>
            <h3 className="text-[15.5px] font-extrabold text-white sm:text-[17px]">
              Satu paket, dua antarmuka: Web Customer + Dashboard Admin
            </h3>
          </div>
          <p className="mt-2 max-w-3xl text-[12.5px] leading-relaxed text-slate-300 sm:text-[13px]">
            Setiap paket sudah mencakup{' '}
            <strong className="font-semibold text-white">Web Customer (Landing Page &amp; Booking)</strong>{' '}
            +{' '}
            <strong className="font-semibold text-white">
              Dashboard Admin Pengelola (Pantau Pesanan, Jadwal &amp; Transaksi)
            </strong>
            .
          </p>

          <div className="mt-4 grid gap-3 sm:grid-cols-2">
            <div className="rounded-xl border border-white/10 bg-[#080c14]/60 p-4">
              <div className="flex items-center gap-2">
                <span className="grid h-7 w-7 place-items-center rounded-lg bg-emerald-400/12 text-emerald-300 ring-1 ring-inset ring-emerald-400/25">
                  <Globe className="h-3.5 w-3.5" />
                </span>
                <p className="text-[12.5px] font-bold text-white">Customer View</p>
                <span className="ml-auto text-[9.5px] font-bold uppercase tracking-wide text-emerald-300/80">
                  Publik
                </span>
              </div>
              <ul className="mt-3 space-y-1.5">
                {CUSTOMER_POINTS.map((point) => (
                  <li key={point} className="flex items-start gap-1.5 text-[11.5px] leading-snug text-slate-300">
                    <Check className="mt-0.5 h-3 w-3 shrink-0 text-emerald-300" strokeWidth={3} />
                    {point}
                  </li>
                ))}
              </ul>
            </div>

            <div className="rounded-xl border border-white/10 bg-[#080c14]/60 p-4">
              <div className="flex items-center gap-2">
                <span className="grid h-7 w-7 place-items-center rounded-lg bg-indigo-400/12 text-indigo-300 ring-1 ring-inset ring-indigo-400/25">
                  <LayoutGrid className="h-3.5 w-3.5" />
                </span>
                <p className="text-[12.5px] font-bold text-white">Admin View</p>
                <span className="ml-auto text-[9.5px] font-bold uppercase tracking-wide text-indigo-300/80">
                  Pengelola
                </span>
              </div>
              <ul className="mt-3 space-y-1.5">
                {ADMIN_POINTS.map((point) => (
                  <li key={point} className="flex items-start gap-1.5 text-[11.5px] leading-snug text-slate-300">
                    <Check className="mt-0.5 h-3 w-3 shrink-0 text-indigo-300" strokeWidth={3} />
                    {point}
                  </li>
                ))}
              </ul>
            </div>
          </div>

          <button
            type="button"
            onClick={() => scrollToSection('katalog')}
            className="mt-4 inline-flex items-center gap-1.5 text-[11.5px] font-bold text-indigo-300 transition hover:text-indigo-200"
          >
            Coba kedua antarmuka di Live Demo
            <ArrowRight className="h-3.5 w-3.5" />
          </button>
        </div>

        <div className="mt-9 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {FEATURES.map(({ icon: Icon, title, desc }) => (
            <div
              key={title}
              className="group rounded-2xl border border-slate-800/80 bg-[#0b1120] p-5 transition hover:border-indigo-400/25 hover:bg-[#0a111e]"
            >
              <span className="grid h-10 w-10 place-items-center rounded-xl bg-gradient-to-br from-indigo-400/15 to-indigo-500/10 text-indigo-300 ring-1 ring-inset ring-white/10">
                <Icon className="h-4.5 w-4.5" />
              </span>
              <h3 className="mt-4 text-[14px] font-bold text-white">{title}</h3>
              <p className="mt-1.5 text-[12.5px] leading-relaxed text-slate-400">{desc}</p>
            </div>
          ))}
        </div>

        <div className="mt-5 overflow-hidden rounded-2xl border border-emerald-400/20 bg-gradient-to-r from-emerald-400/[0.07] via-emerald-400/[0.03] to-transparent p-5 sm:p-6">
          <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
            <div>
              <h3 className="text-[15px] font-extrabold text-white">Jaminan FRWeb</h3>
              <ul className="mt-2.5 grid gap-1.5 sm:grid-cols-3 sm:gap-4">
                {GUARANTEES.map((item) => (
                  <li key={item} className="flex items-start gap-1.5 text-[11.5px] leading-snug text-emerald-100/80">
                    <Check className="mt-0.5 h-3.5 w-3.5 shrink-0 text-emerald-300" strokeWidth={3} />
                    {item}
                  </li>
                ))}
              </ul>
            </div>
            <button
              type="button"
              onClick={() => scrollToSection('paket')}
              className="shrink-0 rounded-xl bg-emerald-400 px-4 py-2.5 text-[12px] font-bold text-[#04140f] transition hover:brightness-110"
            >
              Lihat Pilihan Paket
            </button>
          </div>
        </div>
      </div>
    </section>
  )
}
