export default function Logo({ compact = false, onNavigate, tone = 'dark' }) {
  const light = tone === 'light'
  return (
    <a
      href="#top"
      onClick={onNavigate}
      className="group inline-flex items-center gap-2.5"
      aria-label="FRWeb — kembali ke atas"
    >
      {light ? (
        <span className="grid h-9 w-9 place-items-center rounded-xl bg-gradient-to-br from-[#0B1F3F] to-[#1E40AF] text-[13px] font-bold tracking-tight text-white">
          FR
        </span>
      ) : (
        <span className="relative grid h-9 w-9 place-items-center overflow-hidden rounded-xl bg-gradient-to-br from-indigo-400 via-indigo-400 to-emerald-300 shadow-lg shadow-indigo-500/25">
          <span className="absolute inset-[1.5px] rounded-[10px] bg-[#080c14]/90" />
          <span className="relative bg-gradient-to-br from-indigo-300 to-indigo-400 bg-clip-text text-[13px] font-black tracking-tight text-transparent">
            FR
          </span>
          <span className="absolute -right-0.5 -top-0.5 h-2 w-2 rounded-full bg-emerald-300 shadow-[0_0_10px_2px_rgba(52,211,153,0.6)]" />
        </span>
      )}
      {!compact && (
        <span className="flex flex-col leading-none">
          <span
            className={`text-[15px] tracking-tight ${
              light ? 'font-semibold text-[#0B1F3F]' : 'font-extrabold text-white'
            }`}
          >
            FR{light ? 'Web' : <span className="text-indigo-400">Web</span>}
          </span>
          <span
            className={`mt-1 text-[9px] font-semibold uppercase tracking-[0.18em] ${
              light ? 'text-[#64748B]' : 'text-slate-500'
            }`}
          >
            from FRCloud
          </span>
        </span>
      )}
    </a>
  )
}
