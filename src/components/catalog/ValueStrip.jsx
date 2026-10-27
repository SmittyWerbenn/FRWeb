import { Clock, Globe, ShieldCheck, Zap } from '../../lib/icons'
import { GO_LIVE_MINUTES } from '../../data/plans'

const ITEMS = [
  { icon: Clock, title: `Go-live ${GO_LIVE_MINUTES} menit`, desc: 'Setelah pembayaran terkonfirmasi' },
  { icon: ShieldCheck, title: 'SSL & keamanan aktif', desc: 'HTTPS, proteksi DDoS, backup' },
  { icon: Globe, title: 'Domain milik Anda', desc: 'Terdaftar atas nama bisnis sendiri' },
  { icon: Zap, title: 'Performa optimal', desc: 'Halaman cepat + caching otomatis' },
]

export default function ValueStrip() {
  return (
    <section className="relative px-4 sm:px-6 lg:px-8">
      <div className="mx-auto w-full max-w-7xl">
        <div className="grid gap-px overflow-hidden rounded-2xl border border-slate-800/80 bg-white/[0.06] sm:grid-cols-2 lg:grid-cols-4">
          {ITEMS.map(({ icon: Icon, title, desc }) => (
            <div key={title} className="flex items-start gap-3 bg-[#0b1120] px-4 py-4">
              <span className="grid h-8 w-8 shrink-0 place-items-center rounded-lg bg-indigo-400/10 text-indigo-300 ring-1 ring-inset ring-indigo-400/20">
                <Icon className="h-4 w-4" />
              </span>
              <div>
                <p className="text-[12.5px] font-bold text-white">{title}</p>
                <p className="mt-0.5 text-[11px] leading-snug text-slate-500">{desc}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
