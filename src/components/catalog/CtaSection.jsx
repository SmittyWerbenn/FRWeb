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
        <div className="relative overflow-hidden rounded-3xl bg-[#0B1F3F] px-5 py-10 sm:px-9 sm:py-12">
          <div className="pointer-events-none absolute -right-24 -top-24 h-64 w-64 rounded-full bg-white/10 blur-[90px]" />
          <div className="pointer-events-none absolute -bottom-28 -left-20 h-64 w-64 rounded-full bg-white/5 blur-[90px]" />
          <div className="pointer-events-none absolute left-1/2 top-0 h-px w-3/4 -translate-x-1/2 bg-gradient-to-r from-transparent via-white/30 to-transparent" />

          <div className="relative mx-auto flex max-w-2xl flex-col items-center text-center">
            <span className="inline-flex items-center gap-1.5 rounded-full border border-white/15 bg-white/10 px-3 py-1 text-[11.5px] font-medium text-white/80">
              <Sparkles className="h-3.5 w-3.5" />
              Siap go-live hari ini
            </span>

            <h2 className="mt-4 text-[26px] font-semibold leading-tight tracking-[-0.02em] text-white sm:text-[34px]">
              Website resmi bisnis Anda bisa online sebelum makan siang
            </h2>

            <p className="mt-3 max-w-xl text-[14px] leading-relaxed text-white/60">
              Pilih paket, kunci domain, tentukan tema — sisanya kami yang kerjakan. Tidak perlu tim
              IT, tidak perlu menunggu antrean pengembangan.
            </p>

            <ul className="mt-5 flex flex-col items-center gap-2 sm:flex-row sm:flex-wrap sm:justify-center sm:gap-x-5 sm:gap-y-2">
              {POINTS.map((point) => (
                <li key={point} className="flex items-start gap-2 text-[13px] text-white/75">
                  <Check className="mt-0.5 h-3.5 w-3.5 shrink-0 text-white" strokeWidth={3} />
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
                  className="inline-flex items-center justify-center gap-2 rounded-full bg-white px-6 py-3.5 text-[13px] font-semibold text-[#0B1F3F] transition hover:bg-[#F3F4F6]"
                >
                  <MessageCircle className="h-4 w-4" />
                  Proses &amp; Go-Live via WhatsApp
                </a>
              ) : (
                <button
                  type="button"
                  onClick={() => scrollToSection('order')}
                  className="inline-flex items-center justify-center gap-2 rounded-full bg-white px-6 py-3.5 text-[13px] font-semibold text-[#0B1F3F] transition hover:bg-[#F3F4F6]"
                >
                  Proses &amp; Go-Live via WhatsApp
                  <ArrowRight className="h-4 w-4" />
                </button>
              )}

              <a
                href={WA_CONSULT}
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center justify-center gap-1.5 rounded-full border border-white/20 px-6 py-3.5 text-[13px] font-semibold text-white/85 transition hover:bg-white/10 hover:text-white"
              >
                Konsultasi Dulu
              </a>
            </div>

            <p className="mt-3 text-[11.5px] text-white/45">
              {checkoutReady
                ? 'Pesanan Anda sudah lengkap — lanjut konfirmasi lewat WhatsApp.'
                : 'Belum lengkap? Tombol di atas mengarahkan ke langkah yang tersisa.'}
            </p>

            <div className="mt-8 grid w-full gap-2.5 border-t border-white/10 pt-6 sm:grid-cols-3">
              {GUARANTEES.map(({ icon: Icon, label, note }) => (
                <div
                  key={label}
                  className="flex items-start gap-2.5 rounded-xl border border-white/10 bg-white/[0.04] px-3 py-2.5 text-left"
                >
                  <Icon className="mt-0.5 h-4 w-4 shrink-0 text-white/80" />
                  <div>
                    <p className="text-[12px] font-semibold leading-tight text-white">{label}</p>
                    <p className="mt-0.5 text-[11px] leading-snug text-white/50">{note}</p>
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
