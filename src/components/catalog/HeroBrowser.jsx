import { CheckCircle2, ShieldCheck } from '../../lib/icons'
import MiniMockup from './MiniMockup'

/**
 * Hero mockup: frame browser macOS + URL bar dinamis + floating micro-badge.
 * Efek tilt hanya saat hover (transform 3D ringan), shadow gradasi lembut.
 */
export default function HeroBrowser({ template, className = '' }) {
  if (!template) return null

  const url = `https://demo.frel.cloud/${template.id}`

  return (
    <div className={`group relative [perspective:1500px] ${className}`}>
      {/* Ambient radial glow di belakang mockup */}
      <div aria-hidden="true" className="pointer-events-none absolute -inset-10 -z-10">
        <div className="absolute left-1/2 top-1/2 h-[380px] w-[380px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-indigo-500/25 blur-[110px]" />
        <div className="absolute -right-6 top-0 h-56 w-56 rounded-full bg-violet-500/20 blur-[90px]" />
        <div className="absolute -bottom-4 -left-2 h-48 w-48 rounded-full bg-emerald-400/15 blur-[90px]" />
      </div>

      <div className="tilt-frame relative will-change-transform">
        <div className="overflow-hidden rounded-2xl border border-slate-800/80 bg-[#0b1120] shadow-[0_50px_120px_-45px_rgba(2,6,23,0.95),0_0_0_1px_rgba(99,102,241,0.08)]">
          {/* Browser chrome */}
          <div className="flex items-center gap-3 border-b border-slate-800/80 bg-[#080c14] px-3 py-2.5">
            <div className="flex shrink-0 items-center gap-1.5">
              <span className="h-2.5 w-2.5 rounded-full bg-[#ff5f57] ring-1 ring-black/30" />
              <span className="h-2.5 w-2.5 rounded-full bg-[#febc2e] ring-1 ring-black/30" />
              <span className="h-2.5 w-2.5 rounded-full bg-[#28c840] ring-1 ring-black/30" />
            </div>

            <div className="flex min-w-0 flex-1 items-center gap-2 rounded-md border border-slate-800/90 bg-[#0b1120] px-2.5 py-1.5">
              <ShieldCheck className="h-3 w-3 shrink-0 text-emerald-400" />
              <span className="truncate font-mono text-[10px] text-slate-400">{url}</span>
              <span className="ml-auto hidden shrink-0 items-center gap-1 rounded-full bg-emerald-400/10 px-1.5 py-0.5 text-[8.5px] font-bold uppercase tracking-wide text-emerald-300 sm:inline-flex">
                <span className="h-1 w-1 rounded-full bg-emerald-400" />
                Live
              </span>
            </div>

            <div className="hidden shrink-0 items-center gap-1 sm:flex">
              <span className="h-1 w-1 rounded-full bg-slate-600" />
              <span className="h-1 w-1 rounded-full bg-slate-600" />
              <span className="h-1 w-1 rounded-full bg-slate-600" />
            </div>
          </div>

          {/* Website viewport */}
          <div className="relative bg-white">
            <MiniMockup template={template} chrome={false} />

            {/* Skeleton section di bawah fold — memberi kesan halaman utuh */}
            <div className="grid grid-cols-3 gap-2 border-t border-slate-200/80 bg-white px-3 py-3">
              {[0, 1, 2].map((index) => (
                <div
                  key={index}
                  className="rounded-md border border-slate-200/90 bg-slate-50/80 p-2"
                >
                  <span
                    className="block h-6 rounded"
                    style={{ background: `${template.theme.accent}${index === 0 ? '55' : '2e'}` }}
                  />
                  <span className="mt-1.5 block h-1 w-4/5 rounded bg-slate-300/80" />
                  <span className="mt-1 block h-1 w-3/5 rounded bg-slate-200" />
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Floating micro-badge 1 */}
      <div className="absolute -left-2 top-16 z-20 flex items-center gap-2 rounded-xl border border-slate-700/70 bg-[#0b1120]/95 px-2.5 py-2 shadow-[0_18px_45px_-20px_rgba(0,0,0,0.9)] backdrop-blur-md sm:-left-7">
        <span className="grid h-6 w-6 shrink-0 place-items-center rounded-lg bg-emerald-400/15 text-emerald-300">
          <CheckCircle2 className="h-3.5 w-3.5" />
        </span>
        <div className="min-w-0">
          <p className="text-[9px] uppercase tracking-wide text-slate-500">Status</p>
          <p className="whitespace-nowrap text-[10.5px] font-bold text-white">
            Auto-provisioning: Complete
          </p>
        </div>
      </div>

      {/* Floating micro-badge 2 */}
      <div className="absolute -bottom-5 right-0 z-20 flex items-center gap-2 rounded-xl border border-slate-700/70 bg-[#0b1120]/95 px-2.5 py-2 shadow-[0_18px_45px_-20px_rgba(0,0,0,0.9)] backdrop-blur-md sm:-right-6">
        <span className="relative grid h-6 w-6 shrink-0 place-items-center rounded-lg bg-emerald-400/15">
          <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-emerald-400 shadow-[0_0_10px_2px_rgba(52,211,153,0.7)]" />
        </span>
        <div className="min-w-0">
          <p className="whitespace-nowrap text-[10.5px] font-bold text-white">SSL &amp; Domain Active</p>
          <p className="text-[9px] uppercase tracking-wide text-emerald-300/80">HTTPS • 30 menit</p>
        </div>
      </div>
    </div>
  )
}
