import ArtScene from '../ArtScene'
import { Icon } from '../../lib/icons'

export default function MiniMockup({ template, className = '', chrome = true }) {
  const { theme, brand, hero, nav, highlights } = template

  return (
    <div
      className={`overflow-hidden ${
        chrome ? 'rounded-xl bg-white shadow-[0_20px_60px_-25px_rgba(0,0,0,0.65)] ring-1 ring-black/10' : ''
      } ${className}`}
    >
      {chrome && (
        <div className="flex items-center gap-1.5 border-b border-slate-200 bg-slate-100/90 px-2.5 py-1.5">
          <span className="h-1.5 w-1.5 rounded-full bg-rose-400" />
          <span className="h-1.5 w-1.5 rounded-full bg-amber-400" />
          <span className="h-1.5 w-1.5 rounded-full bg-emerald-400" />
          <span className="ml-1.5 flex-1 truncate rounded-full bg-white/90 px-2 py-[3px] text-[5.5px] font-medium text-slate-400">
            {template.brand.name.toLowerCase().replaceAll(' ', '')}.com
          </span>
        </div>
      )}

      <div style={{ background: theme.soft }} className="px-2.5 pb-2.5 pt-2">
        <div className="flex items-center justify-between gap-1">
          <div className="flex min-w-0 items-center gap-1">
            <span
              className="grid h-[13px] w-[13px] shrink-0 place-items-center rounded-[3px] text-[5px] font-black"
              style={{ background: theme.ink, color: theme.accent }}
            >
              {brand.mark}
            </span>
            <span
              className="truncate text-[6px] font-extrabold tracking-tight"
              style={{ color: theme.ink }}
            >
              {brand.name}
            </span>
          </div>
          <div className="hidden items-center gap-[5px] sm:flex">
            {nav.slice(0, 3).map((item) => (
              <span key={item.label} className="text-[4.5px] font-medium text-slate-500">
                {item.label}
              </span>
            ))}
          </div>
          <span
            className="shrink-0 rounded-[3px] px-1 py-[2px] text-[4.5px] font-bold"
            style={{ background: theme.accent, color: theme.ink }}
          >
            {hero.cta}
          </span>
        </div>

        <div className="mt-2 flex items-stretch gap-1.5">
          <div className="flex min-w-0 flex-1 flex-col justify-center">
            <span
              className="text-[4px] font-bold uppercase tracking-[0.12em]"
              style={{ color: theme.accent2 }}
            >
              {hero.eyebrow}
            </span>
            <p
              className="mt-[3px] text-[8.5px] font-extrabold leading-[1.15] tracking-tight"
              style={{ color: theme.ink }}
            >
              {hero.title}{' '}
              <span style={{ color: theme.accent2 }}>{hero.accentWord}</span>
            </p>
            <p className="mt-1 line-clamp-2 text-[4.5px] leading-[1.5] text-slate-500">
              {hero.desc}
            </p>
            <div className="mt-1.5 flex items-center gap-1">
              <span
                className="rounded-[3px] px-1.5 py-[3px] text-[4.5px] font-bold text-white"
                style={{ background: theme.ink }}
              >
                {hero.cta}
              </span>
              <span
                className="rounded-[3px] border px-1.5 py-[3px] text-[4.5px] font-semibold"
                style={{ borderColor: `${theme.ink}22`, color: theme.ink }}
              >
                {hero.secondary}
              </span>
            </div>
          </div>
          <div className="w-[40%] shrink-0 overflow-hidden rounded-md">
            <ArtScene art={hero.art} theme={theme} className="h-full min-h-[62px]" />
          </div>
        </div>

        <div className="mt-2 grid grid-cols-3 gap-1">
          {highlights.slice(0, 3).map((item) => (
            <div
              key={item.title}
              className="rounded-[4px] border border-black/5 bg-white/80 px-1 py-1"
            >
              <Icon name={item.icon} className="h-[7px] w-[7px]" style={{ color: theme.accent2 }} />
              <p className="mt-[2px] line-clamp-1 text-[4px] font-bold" style={{ color: theme.ink }}>
                {item.title}
              </p>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
