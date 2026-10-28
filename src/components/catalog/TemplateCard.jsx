import { useState } from 'react'
import { ArrowUpRight, Check, Clock, Eye, Info, Sparkles } from '../../lib/icons'
import { getCategoryLabel } from '../../data'
import { PAYMENT_ADDON, hasPaymentHighlight } from '../../data/paymentAddon'
import ArchetypeThumb from './ArchetypeThumb'

const BADGE_STYLES = {
  'Best Seller': 'bg-amber-400/15 text-amber-300 ring-amber-400/30',
  Recommended: 'bg-indigo-400/15 text-indigo-300 ring-indigo-400/30',
  Baru: 'bg-emerald-400/15 text-emerald-300 ring-emerald-400/30',
  'Varian Baru': 'bg-violet-400/15 text-violet-300 ring-violet-400/30',
  Populer: 'bg-emerald-400/15 text-emerald-300 ring-emerald-400/30',
  Premium: 'bg-violet-400/15 text-violet-300 ring-violet-400/30',
  Favorit: 'bg-rose-400/15 text-rose-300 ring-rose-400/30',
}

export default function TemplateCard({ template, onPreview, onSelect, selected = false }) {
  const { theme, badgeLabel, variantStyle, layoutType, colorPalette = [], industry, thumbnail } = template
  const features = template.features ?? template.bullets ?? []
  const paymentHighlight = hasPaymentHighlight(features)
  const badgeClass = BADGE_STYLES[badgeLabel] || 'bg-white/10 text-slate-300 ring-white/20'
  const [thumbBroken, setThumbBroken] = useState(!thumbnail)

  return (
    <article
      className={`group relative z-10 flex flex-col overflow-hidden rounded-2xl border bg-[#0b1120] transition duration-300 ${
        selected
          ? 'border-emerald-400/55 shadow-[0_30px_80px_-45px_rgba(52,211,153,0.55)]'
          : 'border-slate-800/80 hover:-translate-y-1 hover:border-indigo-500/50 hover:shadow-[0_35px_80px_-45px_rgba(99,102,241,0.65)]'
      }`}
      style={{ '--card-accent': `${theme.accent}80` }}
    >
      {selected && (
        <span className="absolute right-3 top-3 z-30 inline-flex items-center gap-1 rounded-full bg-emerald-400 px-2.5 py-1 text-[9.5px] font-black uppercase tracking-wide text-[#04140f] shadow-lg">
          <Check className="h-2.5 w-2.5" strokeWidth={4} />
          Tema terpilih
        </span>
      )}

      <button
        type="button"
        onClick={() => onPreview(template)}
        className="relative block w-full cursor-pointer overflow-hidden border-b border-slate-800/80 bg-[#080c14] text-left"
        aria-label={`Buka live preview ${template.name}`}
      >
        {/* Bingkai browser mini + screenshot nyata halaman template */}
        <div className="relative h-[196px] w-full overflow-hidden">
          <div className="absolute inset-x-0 top-0 z-20 flex h-6 items-center gap-1.5 border-b border-white/10 bg-[#0c1220]/95 px-3 backdrop-blur">
            <span className="h-1.5 w-1.5 rounded-full bg-rose-400/80" />
            <span className="h-1.5 w-1.5 rounded-full bg-amber-300/80" />
            <span className="h-1.5 w-1.5 rounded-full bg-emerald-400/80" />
            <span className="ml-2 truncate text-[9px] font-medium tracking-wide text-slate-500">
              {template.id}.html
            </span>
          </div>

          <div className="absolute inset-x-0 bottom-0 top-6 overflow-hidden">
            {thumbBroken ? (
              <ArchetypeThumb template={template} />
            ) : (
              <img
                src={thumbnail}
                alt={`Pratinjau halaman ${template.name}`}
                width="1280"
                height="900"
                loading="lazy"
                decoding="async"
                onError={() => setThumbBroken(true)}
                className="h-full w-full object-cover object-top transition duration-[1200ms] ease-out group-hover:scale-[1.04]"
              />
            )}
          </div>

          <div
            aria-hidden="true"
            className="pointer-events-none absolute inset-0 bg-gradient-to-t from-[#080c14] via-transparent to-transparent opacity-70"
          />
        </div>

        <div className="pointer-events-none absolute inset-x-3 top-9 z-10 flex items-start justify-between gap-2">
          <span className="rounded-full bg-black/65 px-2.5 py-1 text-[10px] font-semibold text-white/90 backdrop-blur">
            {getCategoryLabel(template.category)}
          </span>
          {badgeLabel && !selected && (
            <span
              className={`rounded-full px-2.5 py-1 text-[10px] font-bold ring-1 ring-inset backdrop-blur ${badgeClass}`}
            >
              {badgeLabel}
            </span>
          )}
        </div>

        <span className="pointer-events-none absolute bottom-3 left-3 z-10 inline-flex max-w-[80%] items-center gap-1 truncate rounded-md bg-black/65 px-2 py-1 text-[9.5px] font-medium text-white/85 backdrop-blur">
          <Sparkles className="h-2.5 w-2.5 shrink-0 text-indigo-300" />
          {layoutType}
        </span>

        <div className="pointer-events-none absolute bottom-3 right-3 z-20 flex justify-end">
          <span className="inline-flex translate-y-1 items-center gap-1 rounded-full bg-[#080c14]/90 px-2.5 py-1 text-[10px] font-bold text-white opacity-0 shadow-lg ring-1 ring-white/15 backdrop-blur transition duration-300 group-hover:translate-y-0 group-hover:opacity-100">
            <Eye className="h-3 w-3" />
            Live Preview
          </span>
        </div>
      </button>

      <div className="flex flex-1 flex-col p-5">
        <div className="flex items-start justify-between gap-2">
          <h3 className="text-[16.5px] font-bold tracking-tight text-white">{template.name}</h3>
          <ArrowUpRight className="mt-0.5 h-4 w-4 shrink-0 text-slate-600 transition group-hover:text-indigo-300" />
        </div>
        <p className="mt-1 text-[11px] font-semibold uppercase tracking-wide text-indigo-300/90">
          {variantStyle}
        </p>
        <p className="mt-2 text-[12.5px] leading-relaxed text-slate-400">{template.description}</p>

        <div className="mt-3.5 flex items-center justify-between gap-3">
          <div className="flex items-center gap-1.5" aria-label="Palet warna template">
            {colorPalette.slice(0, 4).map((color, index) => (
              <span
                key={`${color}-${index}`}
                className="h-3 w-3 rounded-full ring-1 ring-white/20"
                style={{ background: color }}
                title={color}
              />
            ))}
          </div>
          <span className="truncate text-[10px] uppercase tracking-wider text-slate-500">{industry}</span>
        </div>

        <ul className="mt-4 flex-1 space-y-1.5">
          {features.slice(0, 3).map((feature) => (
            <li key={feature} className="flex items-start gap-2 text-[12px] leading-snug text-slate-300">
              <span
                className="mt-[3px] grid h-3.5 w-3.5 shrink-0 place-items-center rounded-full"
                style={{ background: `${theme.accent}24`, color: theme.accent }}
              >
                <Check className="h-2 w-2" strokeWidth={3.5} />
              </span>
              {feature}
            </li>
          ))}
        </ul>

        {paymentHighlight && (
          <p
            data-payment-footnote
            title={PAYMENT_ADDON.footnote}
            className="mt-2.5 flex items-start gap-1.5 rounded-lg border border-amber-300/15 bg-amber-300/[0.06] px-2 py-1.5 text-[10px] leading-snug text-amber-200/80"
          >
            <Info className="mt-[1px] h-2.5 w-2.5 shrink-0" />
            <span>*{PAYMENT_ADDON.footnote}</span>
          </p>
        )}

        <div className="mt-4 flex items-center justify-between border-t border-slate-800/80 pt-3.5">
          <div className="min-w-0">
            <p className="truncate text-[10.5px] uppercase tracking-wider text-slate-500">Cocok untuk</p>
            <p className="truncate text-[11.5px] font-medium text-slate-300">{template.bestFor}</p>
          </div>
          <span className="inline-flex shrink-0 items-center gap-1 rounded-md bg-white/5 px-2 py-1 text-[10px] font-semibold text-slate-400">
            <Clock className="h-2.5 w-2.5" />
            30 menit
          </span>
        </div>

        <div className="mt-4 grid grid-cols-2 gap-2">
          <button
            type="button"
            onClick={() => onPreview(template)}
            title="Live Preview"
            className="inline-flex items-center justify-center gap-1.5 rounded-lg border border-slate-700/80 bg-white/[0.03] px-2 py-2.5 text-[11px] font-bold text-white transition hover:border-indigo-400/50 hover:bg-indigo-500/10"
          >
            <Eye className="h-3.5 w-3.5" />
            Live Demo
          </button>
          <button
            type="button"
            onClick={() => onSelect(template)}
            aria-pressed={selected}
            className={`inline-flex items-center justify-center gap-1.5 rounded-lg px-2 py-2.5 text-[11px] font-bold transition ${
              selected
                ? 'bg-emerald-400 text-[#04140f] hover:brightness-110'
                : 'bg-gradient-to-r from-indigo-500 to-violet-500 text-white hover:brightness-110'
            }`}
          >
            <Check className="h-3.5 w-3.5" strokeWidth={3} />
            {selected ? 'Tema Terpilih' : 'Pilih Tema Ini'}
          </button>
        </div>
      </div>
    </article>
  )
}
