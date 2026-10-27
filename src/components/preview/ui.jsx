import { Check, CheckCircle2, Minus, Plus, RotateCcw, Star, MessageCircle } from '../../lib/icons'
import { buildWhatsAppLink, formatIDR } from '../../lib/format'

export function cx(...parts) {
  return parts.filter(Boolean).join(' ')
}

export function PvSection({ id, children, className = '', tone = 'soft' }) {
  const backgrounds = {
    soft: 'var(--soft)',
    tint: 'var(--tint)',
    white: '#FFFFFF',
    ink: 'var(--ink)',
  }
  return (
    <section id={id} style={{ background: backgrounds[tone] }} className={cx('scroll-mt-16 px-4 py-12 @md:px-8 @lg:py-16', className)}>
      <div className="mx-auto w-full max-w-6xl">{children}</div>
    </section>
  )
}

export function PvHeading({ eyebrow, title, sub, align = 'left', onDark = false, className = '' }) {
  return (
    <div className={cx(align === 'center' ? 'text-center' : 'text-left', className)}>
      {eyebrow && (
        <span
          className="text-[10px] font-bold uppercase tracking-[0.2em]"
          style={{ color: onDark ? 'var(--accent)' : 'var(--accent-2)' }}
        >
          {eyebrow}
        </span>
      )}
      <h2
        className="mt-2 text-[22px] font-extrabold leading-[1.18] tracking-tight @md:text-[30px]"
        style={{ color: onDark ? '#FFFFFF' : 'var(--ink)' }}
      >
        {title}
      </h2>
      {sub && (
        <p
          className={cx('mt-2.5 text-[12.5px] leading-relaxed @md:text-[13.5px]', align === 'center' && 'mx-auto')}
          style={{ color: onDark ? 'rgba(255,255,255,0.7)' : 'rgba(0,0,0,0.55)', maxWidth: align === 'center' ? '46rem' : undefined }}
        >
          {sub}
        </p>
      )}
    </div>
  )
}

const VARIANTS = {
  primary: { background: 'var(--ink)', color: '#FFFFFF', border: '1px solid transparent' },
  accent: { background: 'var(--accent)', color: 'var(--ink)', border: '1px solid transparent' },
  outline: { background: 'transparent', color: 'var(--ink)', border: '1px solid rgba(0,0,0,0.18)' },
  white: { background: '#FFFFFF', color: 'var(--ink)', border: '1px solid rgba(0,0,0,0.08)' },
  ghost: { background: 'rgba(0,0,0,0.04)', color: 'var(--ink)', border: '1px solid transparent' },
  onDark: { background: 'rgba(255,255,255,0.1)', color: '#FFFFFF', border: '1px solid rgba(255,255,255,0.22)' },
}

const SIZES = {
  sm: 'px-3 py-2 text-[11.5px]',
  md: 'px-4 py-2.5 text-[12px]',
  lg: 'px-5 py-3 text-[13px]',
}

export function PvButton({
  as,
  href,
  children,
  variant = 'primary',
  size = 'md',
  className = '',
  style,
  ...rest
}) {
  const Tag = href ? 'a' : as || 'button'
  const isButton = Tag === 'button'
  return (
    <Tag
      href={href}
      {...(href ? { target: '_blank', rel: 'noreferrer' } : {})}
      {...(isButton ? { type: 'button' } : {})}
      className={cx(
        'inline-flex items-center justify-center gap-1.5 rounded-lg font-bold tracking-tight transition hover:brightness-105 disabled:opacity-40',
        SIZES[size],
        className,
      )}
      style={{ ...VARIANTS[variant], ...style }}
      {...rest}
    >
      {children}
    </Tag>
  )
}

export function Stars({ rating = 5, className = '', size = 'h-3 w-3' }) {
  return (
    <span className={cx('inline-flex items-center gap-0.5', className)} aria-label={`${rating} dari 5`}>
      {[1, 2, 3, 4, 5].map((index) => (
        <Star
          key={index}
          className={cx(size, index <= Math.round(rating) ? 'fill-current' : 'opacity-25')}
          style={{ color: '#F5B32C' }}
        />
      ))}
    </span>
  )
}

export const fieldClass =
  'w-full rounded-lg border border-black/10 bg-white px-3 py-2.5 text-[12.5px] text-[var(--ink)] outline-none transition placeholder:text-black/30 focus:border-black/30 focus:ring-2 focus:ring-black/5'

export function Field({ label, hint, children, className = '' }) {
  return (
    <label className={cx('block', className)}>
      <span className="mb-1.5 block text-[11px] font-bold uppercase tracking-wide text-black/50">{label}</span>
      {children}
      {hint && <span className="mt-1 block text-[10.5px] text-black/40">{hint}</span>}
    </label>
  )
}

export function Stepper({ value, onChange, min = 1, max = 99, suffix, className = '' }) {
  return (
    <div className={cx('inline-flex items-center gap-1 rounded-lg border border-black/10 bg-white p-1', className)}>
      <button
        type="button"
        onClick={() => onChange(Math.max(min, value - 1))}
        disabled={value <= min}
        aria-label="Kurangi"
        className="grid h-7 w-7 place-items-center rounded-md text-black/60 transition hover:bg-black/5 disabled:opacity-30"
      >
        <Minus className="h-3 w-3" />
      </button>
      <span className="min-w-[54px] text-center text-[12.5px] font-bold" style={{ color: 'var(--ink)' }}>
        {value}
        {suffix ? <span className="ml-0.5 text-[10px] font-medium text-black/40">{suffix}</span> : null}
      </span>
      <button
        type="button"
        onClick={() => onChange(Math.min(max, value + 1))}
        disabled={value >= max}
        aria-label="Tambah"
        className="grid h-7 w-7 place-items-center rounded-md text-black/60 transition hover:bg-black/5 disabled:opacity-30"
      >
        <Plus className="h-3 w-3" />
      </button>
    </div>
  )
}

export function PriceRow({ label, value, muted = false, strong = false }) {
  return (
    <div className="flex items-baseline justify-between gap-3 text-[11.5px]">
      <span className={muted ? 'text-white/55' : 'text-current opacity-70'}>{label}</span>
      <span className={cx('tabular-nums', strong ? 'text-[13px] font-extrabold' : 'font-semibold')}>{value}</span>
    </div>
  )
}

export function SuccessPanel({ title, desc, rows = [], code, templateName, onReset, note }) {
  const summary = rows.map((row) => `${row.label}: ${row.value}`).join('\n')
  return (
    <div
      role="status"
      aria-live="polite"
      className="rounded-2xl border border-black/10 bg-white p-5 @md:p-6"
    >
      <div className="flex items-start gap-3">
        <span
          className="grid h-10 w-10 shrink-0 place-items-center rounded-full"
          style={{ background: 'var(--accent)', color: 'var(--ink)' }}
        >
          <CheckCircle2 className="h-5 w-5" />
        </span>
        <div>
          <h4 className="text-[15px] font-extrabold" style={{ color: 'var(--ink)' }}>
            {title}
          </h4>
          <p className="mt-1 text-[11.5px] leading-relaxed text-black/55">{desc}</p>
        </div>
      </div>

      {code && (
        <div className="mt-4 flex items-center justify-between rounded-lg bg-black/[0.04] px-3 py-2.5">
          <span className="text-[10.5px] font-bold uppercase tracking-wider text-black/45">Kode booking</span>
          <span className="font-mono text-[12px] font-bold" style={{ color: 'var(--ink)' }}>
            {code}
          </span>
        </div>
      )}

      {rows.length > 0 && (
        <div className="mt-3 space-y-1.5 rounded-lg border border-black/8 px-3 py-3">
          {rows.map((row) => (
            <div key={row.label} className="flex items-start justify-between gap-3 text-[11.5px]">
              <span className="text-black/50">{row.label}</span>
              <span className="text-right font-semibold" style={{ color: 'var(--ink)' }}>
                {row.value}
              </span>
            </div>
          ))}
        </div>
      )}

      {note && <p className="mt-3 text-[10.5px] leading-relaxed text-black/45">{note}</p>}

      <div className="mt-4 flex flex-wrap gap-2">
        {templateName && (
          <PvButton href={buildWhatsAppLink(templateName, { extra: summary })} variant="accent" size="sm">
            <MessageCircle className="h-3.5 w-3.5" />
            Lanjut via WhatsApp
          </PvButton>
        )}
        <PvButton variant="outline" size="sm" onClick={onReset}>
          <RotateCcw className="h-3.5 w-3.5" />
          Ubah pesanan
        </PvButton>
      </div>
    </div>
  )
}

export function PvChip({ children, tone = 'soft', className = '' }) {
  const tones = {
    soft: { background: 'rgba(0,0,0,0.04)', color: 'var(--ink)' },
    accent: { background: 'var(--accent)', color: 'var(--ink)' },
    tint: { background: 'var(--tint)', color: 'var(--ink)' },
    dark: { background: 'rgba(255,255,255,0.12)', color: '#FFFFFF' },
  }
  return (
    <span
      className={cx('inline-flex items-center gap-1 rounded-full px-2.5 py-1 text-[10px] font-bold', className)}
      style={tones[tone]}
    >
      {children}
    </span>
  )
}

export function CheckLine({ children, onDark = false }) {
  return (
    <li className="flex items-start gap-2 text-[12px] leading-snug">
      <Check
        className="mt-0.5 h-3.5 w-3.5 shrink-0"
        strokeWidth={3}
        style={{ color: onDark ? 'var(--accent)' : 'var(--accent-2)' }}
      />
      <span style={{ color: onDark ? 'rgba(255,255,255,0.78)' : 'rgba(0,0,0,0.62)' }}>{children}</span>
    </li>
  )
}

export function MiniMap({ label }) {
  return (
    <div className="relative overflow-hidden rounded-lg border border-black/10 bg-[#E8EDE6]">
      <svg viewBox="0 0 320 150" className="h-full w-full" aria-hidden="true">
        <rect width="320" height="150" fill="#EAF0E6" />
        <g stroke="#FFFFFF" strokeWidth="9">
          <path d="M-10 44 H330" />
          <path d="M-10 112 H330" />
          <path d="M72 -10 V160" />
          <path d="M188 -10 V160" />
          <path d="M262 -10 V160" />
        </g>
        <g stroke="#DDE7D6" strokeWidth="4" strokeDasharray="6 6">
          <path d="M-10 78 H330" />
          <path d="M130 -10 V160" />
        </g>
        <rect x="196" y="54" width="52" height="44" rx="4" fill="#D7E4CE" />
        <rect x="20" y="54" width="40" height="44" rx="4" fill="#D7E4CE" />
        <circle cx="150" cy="76" r="16" fill="var(--accent-2)" opacity="0.2" />
        <circle cx="150" cy="76" r="7" fill="var(--accent-2)" stroke="#FFFFFF" strokeWidth="2.5" />
      </svg>
      <span className="absolute bottom-1.5 left-2 rounded bg-white/85 px-1.5 py-0.5 text-[8.5px] font-semibold text-black/60">
        {label}
      </span>
    </div>
  )
}

export { formatIDR }
