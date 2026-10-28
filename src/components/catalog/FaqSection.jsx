import { useState } from 'react'
import { ChevronDown, MessageCircle } from '../../lib/icons'
import { WA_CONSULT } from '../../lib/format'

const FAQS = [
  {
    q: 'Benarkah website bisa online dalam 30 menit?',
    a: 'Ya. Setelah pembayaran terkonfirmasi dan materi dasar (nama bisnis, nomor WhatsApp, logo/foto opsional) tersedia, sistem menyiapkan hosting, menerbitkan SSL, lalu memasang tema pilihan Anda. Proses ini rata-rata selesai 20–30 menit. Order di luar jam operasional 08.00–21.00 WIB dikerjakan pagi berikutnya.',
  },
  {
    q: 'Apa saja yang perlu saya siapkan?',
    a: 'Cukup nama bisnis, daftar layanan atau menu beserta harga, nomor WhatsApp tujuan, dan logo/foto bila ada. Jika belum punya logo, tim kami menyiapkan wordmark sederhana tanpa biaya tambahan.',
  },
  {
    q: 'Apakah harga sudah termasuk domain dan hosting?',
    a: 'Semua paket sudah mencakup setup hosting, SSL, dan pendaftaran domain untuk tahun pertama. Perpanjangan tahun berikutnya dibayarkan langsung oleh klien ke registrar, dan domain terdaftar atas nama bisnis Anda.',
  },
  {
    q: 'Saya sudah punya domain sendiri, bisa dipakai?',
    a: 'Bisa. Cukup berikan akses DNS atau arahkan nameserver sesuai instruksi kami. Tim FRWeb melakukan pointing dan memantau propagasi sampai website aktif tanpa downtime.',
  },
  {
    q: 'Bisakah desain dan fitur diubah?',
    a: 'Warna, tipografi, foto, urutan section, menu, dan konten dapat disesuaikan. Untuk kebutuhan yang jauh berbeda — multi-tenant API, integrasi ERP/POS, atau alur transaksi khusus — gunakan Paket Custom Solution agar arsitekturnya dirancang bersama tim Anda.',
  },
  {
    q: 'Bagaimana sistem pembayarannya?',
    a: 'Pembayaran via transfer bank atau QRIS dengan invoice resmi. Untuk Paket Custom Solution tersedia opsi DP 50% sebelum pengerjaan dan pelunasan setelah uji terima.',
  },
  {
    q: 'Apakah integrasi pembayaran online/QRIS otomatis sudah termasuk di dalam paket?',
    a: 'Semua website sudah mendukung pesanan & invoice via WhatsApp. Jika bisnis Anda membutuhkan integrasi gateway otomatis (QRIS real-time & Virtual Account bank terverifikasi otomatis via Midtrans/Xendit), tersedia modul add-on seharga Rp 1.000.000 (sudah termasuk setup API, webhook status, dan testing sandbox hingga go-live). Add-on ini opsional dan bisa diaktifkan langsung dari pilihan paket.',
  },
  {
    q: 'Apakah termasuk revisi?',
    a: 'Setiap paket mendapat garansi revisi konten selama 7 hari setelah go-live. Revisi struktur atau penambahan fitur di luar cakupan paket dihitung terpisah dan selalu dikonfirmasi lebih dulu.',
  },
]

export default function FaqSection() {
  const [openIndex, setOpenIndex] = useState(0)

  return (
    <section id="faq" className="relative scroll-mt-20 px-4 py-14 sm:px-6 lg:px-8 lg:py-20">
      <div className="mx-auto grid w-full max-w-7xl gap-8 lg:grid-cols-[0.85fr_1.15fr] lg:items-start">
        <div>
          <span className="text-[11px] font-bold uppercase tracking-[0.22em] text-indigo-400">FAQ</span>
          <h2 className="mt-2.5 text-[26px] font-extrabold leading-tight tracking-tight text-white sm:text-[34px]">
            Pertanyaan yang sering diajukan
          </h2>
          <p className="mt-3 text-[14px] leading-relaxed text-slate-400">
            Belum menemukan jawabannya? Tim sales FRWeb siap membantu lewat WhatsApp pada jam
            operasional 08.00–21.00 WIB.
          </p>
          <a
            href={WA_CONSULT}
            target="_blank"
            rel="noreferrer"
            className="mt-5 inline-flex items-center gap-2 rounded-xl border border-emerald-400/25 bg-emerald-400/10 px-4 py-2.5 text-[12.5px] font-bold text-emerald-200 transition hover:bg-emerald-400/15"
          >
            <MessageCircle className="h-4 w-4" />
            Tanya langsung via WhatsApp
          </a>
        </div>

        <div className="divide-y divide-white/[0.07] overflow-hidden rounded-2xl border border-slate-800/80 bg-[#0b1120]">
          {FAQS.map((item, index) => {
            const open = openIndex === index
            return (
              <div key={item.q}>
                <button
                  type="button"
                  onClick={() => setOpenIndex(open ? -1 : index)}
                  aria-expanded={open}
                  className="flex w-full items-start justify-between gap-4 px-4 py-3.5 text-left transition hover:bg-white/[0.02] sm:px-5"
                >
                  <span className={`text-[13px] font-semibold leading-snug ${open ? 'text-white' : 'text-slate-300'}`}>
                    {item.q}
                  </span>
                  <ChevronDown
                    className={`mt-0.5 h-4 w-4 shrink-0 text-slate-500 transition-transform duration-200 ${
                      open ? 'rotate-180 text-indigo-300' : ''
                    }`}
                  />
                </button>
                {open && (
                  <p className="animate-fade-in px-4 pb-4 text-[12.5px] leading-relaxed text-slate-400 sm:px-5">
                    {item.a}
                  </p>
                )}
              </div>
            )
          })}
        </div>
      </div>
    </section>
  )
}
