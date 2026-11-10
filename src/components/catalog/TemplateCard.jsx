import { useState } from 'react'
import { ArrowUpRight, Check, Clock, Eye, Info, LayoutGrid, Sparkles } from '../../lib/icons'
import { getCategoryLabel } from '../../data'
import { PAYMENT_ADDON, hasPaymentHighlight } from '../../data/paymentAddon'
import { previewLinkProps, previewPath } from '../../lib/router'
import ArchetypeThumb from './ArchetypeThumb'

const BADGE_STYLES = {
  'Best Seller': 'bg-[#E8EEFA] text-[#0B1F3F] ring-[#C5D0E4]',
  Recommended: 'bg-[#E8EEFA] text-[#0B1F3F] ring-[#C5D0E4]',
  Baru: 'bg-[#E8EEFA] text-[#0B1F3F] ring-[#C5D0E4]',
  'Varian Baru': 'bg-[#E8EEFA] text-[#0B1F3F] ring-[#C5D0E4]',
  Populer: 'bg-[#E8EEFA] text-[#0B1F3F] ring-[#C5D0E4]',
  Premium: 'bg-[#E8EEFA] text-[#0B1F3F] ring-[#C5D0E4]',
  Favorit: 'bg-rose-400/15 text-rose-600 ring-rose-400/30',
}

export default function TemplateCard({ template, onSelect, selected = false }) {
  const { theme, badgeLabel, variantStyle, layoutType, colorPalette = [], industry, thumbnail } = template
  const features = template.features ?? template.bullets ?? []
  const paymentHighlight = hasPaymentHighlight(features)
  const badgeClass = BADGE_STYLES[badgeLabel] || 'bg-[#E8EEFA] text-[#475569] ring-[#DDE5F3]'
  const [thumbBroken, setThumbBroken] = useState(!thumbnail)

  return (
    <article
      className={`group relative z-10 flex flex-col overflow-hidden rounded-2xl border bg-white transition duration-300 ${
        selected
          ? 'border-[#0B1F3F] shadow-[0_8px_24px_-12px_rgba(11,31,63,0.18)]'
          : 'border-[#DDE5F3] hover:-translate-y-1 hover:border-[#C5D0E4] hover:shadow-[0_8px_24px_-12px_rgba(11,31,63,0.18)]'
      }`}
      style={{ '--card-accent': `${theme.accent}80` }}
    >
      {selected && (
        <span className="absolute right-3 top-3 z-30 inline-flex items-center gap-1 rounded-full bg-gradient-to-br from-[#0B1F3F] to-[#1E40AF] px-2.5 py-1 text-[9.5px] font-black uppercase tracking-wide text-white shadow-lg">
          <Check className="h-2.5 w-2.5" strokeWidth={4} />
          Tema terpilih
        </span>
      )}

      <a
        {...previewLinkProps(template.id)}
        className="relative block w-full cursor-pointer overflow-hidden border-b border-[#DDE5F3] bg-[#F5F8FD] text-left"
        aria-label={`Buka live preview ${template.name}`}
      >
        {/* Bingkai browser mini + screenshot nyata halaman template */}
        <div className="relative h-[196px] w-full overflow-hidden">
          <div className="absolute inset-x-0 top-0 z-20 flex h-6 items-center gap-1.5 border-b border-[#DDE5F3] bg-[#E8EEFA]/95 px-3 backdrop-blur">
            <span className="h-1.5 w-1.5 rounded-full bg-rose-400/80" />
            <span className="h-1.5 w-1.5 rounded-full bg-[#E8EEFA]" />
            <span className="h-1.5 w-1.5 rounded-full bg-[#E8EEFA]" />
            <span className="ml-2 truncate text-[9px] font-medium tracking-wide text-[#64748B]">
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
            className="pointer-events-none absolute inset-0 bg-gradient-to-t from-[#0B1F3F]/25 via-transparent to-transparent opacity-60"
          />
        </div>

        <div className="pointer-events-none absolute inset-x-3 top-9 z-10 flex items-start justify-between gap-2">
          <span className="rounded-full bg-[#0B1F3F]/70 px-2.5 py-1 text-[10px] font-semibold text-white backdrop-blur">
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

        <span className="pointer-events-none absolute bottom-3 left-3 z-10 inline-flex max-w-[80%] items-center gap-1 truncate rounded-md bg-[#0B1F3F]/70 px-2 py-1 text-[9.5px] font-medium text-white backdrop-blur">
          <Sparkles className="h-2.5 w-2.5 shrink-0 text-[#0B1F3F]" />
          {layoutType}
        </span>

        <div className="pointer-events-none absolute bottom-3 right-3 z-20 flex justify-end">
          <span className="inline-flex translate-y-1 items-center gap-1 rounded-full bg-[#F5F8FD]/90 px-2.5 py-1 text-[10px] font-bold text-[#0B1F3F] opacity-0 shadow-lg ring-1 ring-[#DDE5F3] backdrop-blur transition duration-300 group-hover:translate-y-0 group-hover:opacity-100">
            <Eye className="h-3 w-3" />
            Live Preview
          </span>
        </div>
      </a>

      <div className="flex flex-1 flex-col p-5">
        <div className="flex items-start justify-between gap-2">
          <h3 className="text-[16.5px] font-bold tracking-tight text-[#0B1F3F]">{template.name}</h3>
          <ArrowUpRight className="mt-0.5 h-4 w-4 shrink-0 text-[#94A3B8] transition group-hover:text-[#0B1F3F]" />
        </div>
        <p className="mt-1 text-[11px] font-semibold uppercase tracking-wide text-[#0B1F3F]">
          {variantStyle}
        </p>
        <p className="mt-2 text-[12.5px] leading-relaxed text-[#64748B]">{template.description}</p>

        {/* Keterangan paket: satu paket = dua antarmuka (customer + admin) */}
        <a
          href={`${previewPath(template.id)}?view=admin`}
          title="Buka Dashboard Admin template ini"
          className="mt-3 inline-flex items-start gap-2 rounded-lg border border-[#C5D0E4] bg-[#E8EEFA] px-2.5 py-2 transition hover:border-[#C5D0E4] hover:bg-[#E8EEFA]"
        >
          <LayoutGrid className="mt-[1px] h-3 w-3 shrink-0 text-[#0B1F3F]" />
          <span className="text-[10.5px] font-semibold leading-snug text-[#0B1F3F]">
            Termasuk: Halaman Customer + Dashboard Admin
          </span>
          <ArrowUpRight className="ml-auto mt-[1px] h-3 w-3 shrink-0 text-[#0B1F3F]" />
        </a>

        <div className="mt-3.5 flex items-center justify-between gap-3">
          <div className="flex items-center gap-1.5" aria-label="Palet warna template">
            {colorPalette.slice(0, 4).map((color, index) => (
              <span
                key={`${color}-${index}`}
                className="h-3 w-3 rounded-full ring-1 ring-[#DDE5F3]"
                style={{ background: color }}
                title={color}
              />
            ))}
          </div>
          <span className="truncate text-[10px] uppercase tracking-wider text-[#64748B]">{industry}</span>
        </div>

        <ul className="mt-4 flex-1 space-y-1.5">
          {features.slice(0, 3).map((feature) => (
            <li key={feature} className="flex items-start gap-2 text-[12px] leading-snug text-[#475569]">
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
            className="mt-2.5 flex items-start gap-1.5 rounded-lg border border-[#C5D0E4] bg-[#E8EEFA] px-2 py-1.5 text-[10px] leading-snug text-[#0B1F3F]"
          >
            <Info className="mt-[1px] h-2.5 w-2.5 shrink-0" />
            <span>*{PAYMENT_ADDON.footnote}</span>
          </p>
        )}

        <div className="mt-4 flex items-center justify-between border-t border-[#DDE5F3] pt-3.5">
          <div className="min-w-0">
            <p className="truncate text-[10.5px] uppercase tracking-wider text-[#64748B]">Cocok untuk</p>
            <p className="truncate text-[11.5px] font-medium text-[#475569]">{template.bestFor}</p>
          </div>
          <span className="inline-flex shrink-0 items-center gap-1 rounded-md bg-[#F5F8FD] px-2 py-1 text-[10px] font-semibold text-[#64748B]">
            <Clock className="h-2.5 w-2.5" />
            30 menit
          </span>
        </div>

        <div className="mt-4 grid grid-cols-2 gap-2">
          <a
            {...previewLinkProps(template.id)}
            title="Live Preview"
            className="inline-flex items-center justify-center gap-1.5 rounded-lg border border-[#DDE5F3] bg-[#F5F8FD] px-2 py-2.5 text-[11px] font-bold text-[#0B1F3F] transition hover:border-[#C5D0E4] hover:bg-[#E8EEFA]"
          >
            <Eye className="h-3.5 w-3.5" />
            Live Demo
          </a>
          <button
            type="button"
            onClick={() => onSelect(template)}
            aria-pressed={selected}
            className={`inline-flex items-center justify-center gap-1.5 rounded-lg px-2 py-2.5 text-[11px] font-bold transition ${
              selected
                ? 'bg-gradient-to-br from-[#0B1F3F] to-[#1E40AF] text-white hover:brightness-125'
                : 'bg-gradient-to-br from-[#0B1F3F] to-[#1E40AF] text-white hover:brightness-125'
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
