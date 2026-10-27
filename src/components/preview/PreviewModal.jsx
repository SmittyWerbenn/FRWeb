import { useEffect, useRef } from 'react'
import { createPortal } from 'react-dom'
import { ArrowUpRight, Check, Eye, MessageCircle, Monitor, Smartphone, Tablet, X } from '../../lib/icons'
import { buildWhatsAppLink } from '../../lib/format'
import { getCategoryLabel } from '../../data'
import PreviewRenderer from './PreviewRenderer'

const VIEWPORTS = {
  desktop: { id: 'desktop', label: 'Desktop', icon: Monitor, widthLabel: '100%', maxWidth: null },
  tablet: { id: 'tablet', label: 'Tablet', icon: Tablet, widthLabel: '768 px', maxWidth: 768 },
  mobile: { id: 'mobile', label: 'Mobile', icon: Smartphone, widthLabel: '390 px', maxWidth: 390 },
}

function ViewportSwitcher({ viewport, onChange, compact = false }) {
  return (
    <div className="inline-flex items-center gap-0.5 rounded-xl border border-white/10 bg-white/[0.04] p-0.5">
      {Object.values(VIEWPORTS).map((item) => {
        const Icon = item.icon
        const active = item.id === viewport
        return (
          <button
            key={item.id}
            type="button"
            onClick={() => onChange(item.id)}
            aria-pressed={active}
            title={`${item.label} — ${item.widthLabel}`}
            className={`inline-flex items-center gap-1.5 rounded-[9px] px-2.5 py-1.5 text-[11px] font-semibold transition ${
              active ? 'bg-white text-[#08111f] shadow-sm' : 'text-slate-400 hover:bg-white/5 hover:text-white'
            }`}
          >
            <Icon className="h-3.5 w-3.5" />
            {!compact && <span className="hidden lg:inline">{item.label}</span>}
            {!compact && <span className="hidden text-[9px] font-bold uppercase tracking-wide opacity-60 xl:inline">{item.widthLabel}</span>}
          </button>
        )
      })}
    </div>
  )
}

export default function PreviewModal({ template, viewport, onViewportChange, onClose, onSelect }) {
  const scrollRef = useRef(null)
  const { theme, brand } = template
  const current = VIEWPORTS[viewport] || VIEWPORTS.desktop
  const waLink = buildWhatsAppLink(template.name, {
    extra: `Saya melihat live preview di tampilan ${current.label} (${current.widthLabel}).`,
  })

  useEffect(() => {
    if (scrollRef.current) scrollRef.current.scrollTop = 0
  }, [template.id, viewport])

  const content = (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 p-0 backdrop-blur-sm sm:p-4"
      role="dialog"
      aria-modal="true"
      aria-label={`Live preview ${template.name}`}
      onMouseDown={(event) => {
        if (event.target === event.currentTarget) onClose()
      }}
    >
      <div className="relative flex h-full w-full max-w-[1440px] flex-col overflow-hidden border border-white/10 bg-[#05080f] shadow-2xl shadow-black/60 sm:h-[92vh] sm:rounded-2xl">
        <div className="flex flex-wrap items-center gap-2.5 border-b border-white/10 bg-[#070b14]/95 px-3 py-2.5 sm:px-4">
          <div className="flex min-w-0 flex-1 items-center gap-2.5">
            <span
              className="grid h-9 w-9 shrink-0 place-items-center rounded-lg text-[12px] font-black"
              style={{ background: theme.accent, color: theme.ink }}
            >
              {brand.mark}
            </span>
            <div className="min-w-0">
              <div className="flex items-center gap-1.5">
                <h2 className="truncate text-[13px] font-bold text-white sm:text-[14px]">{template.name}</h2>
                {template.badge && (
                  <span className="hidden shrink-0 rounded-full border border-amber-400/30 bg-amber-400/10 px-1.5 py-0.5 text-[8.5px] font-bold text-amber-300 sm:inline">
                    {template.badge}
                  </span>
                )}
              </div>
              <p className="truncate text-[10px] text-slate-500">
                {getCategoryLabel(template.category)} · {brand.name}
              </p>
            </div>
          </div>

          <div className="order-3 w-full sm:order-none sm:w-auto">
            <div className="flex items-center justify-between gap-2">
              <ViewportSwitcher viewport={viewport} onChange={onViewportChange} />
              <span className="rounded-md bg-white/5 px-2 py-1 text-[9.5px] font-semibold text-slate-400 sm:hidden">
                {current.widthLabel}
              </span>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <button
              type="button"
              onClick={() => onSelect(template)}
              className="inline-flex items-center gap-1.5 rounded-lg bg-gradient-to-r from-emerald-400 to-teal-300 px-2.5 py-2 text-[11px] font-bold text-[#04140f] transition hover:brightness-110 sm:px-3.5"
            >
              <Check className="h-3.5 w-3.5" strokeWidth={3} />
              <span className="hidden md:inline">Pilih Tema Ini</span>
              <span className="md:hidden">Pilih</span>
            </button>
            <a
              href={waLink}
              target="_blank"
              rel="noreferrer"
              aria-label="Tanya template ini via WhatsApp"
              className="hidden h-9 w-9 place-items-center rounded-lg border border-white/12 text-emerald-300 transition hover:border-emerald-400/40 hover:bg-emerald-400/10 sm:grid"
            >
              <MessageCircle className="h-4 w-4" />
            </a>
            <button
              type="button"
              onClick={onClose}
              autoFocus
              aria-label="Tutup preview"
              className="grid h-9 w-9 place-items-center rounded-lg border border-white/12 text-slate-400 transition hover:border-white/25 hover:bg-white/5 hover:text-white"
            >
              <X className="h-4 w-4" />
            </button>
          </div>
        </div>

        <div className="relative flex min-h-0 flex-1 justify-center overflow-hidden bg-[#070a12] p-1.5 sm:p-4">
          <div className="pointer-events-none absolute inset-0 bg-grid opacity-[0.08]" />

          <div
            className={`relative flex h-full w-full flex-col overflow-hidden bg-white transition-all duration-300 ${
              viewport === 'desktop'
                ? 'rounded-lg border border-white/10 shadow-2xl'
                : 'rounded-[26px] border-[6px] border-[#12161f] shadow-2xl'
            }`}
            style={{
              width: current.maxWidth ? `min(${current.maxWidth}px, 100%)` : '100%',
              maxWidth: current.maxWidth || undefined,
            }}
          >
            {viewport !== 'desktop' && (
              <div className="flex shrink-0 items-center justify-between bg-[#12161f] px-4 py-1">
                <span className="text-[8.5px] font-semibold text-white/40">9:41</span>
                <span className="h-3.5 w-16 rounded-full bg-black/60" />
                <span className="flex items-center gap-1">
                  <span className="h-1.5 w-3 rounded-sm bg-white/30" />
                  <span className="h-1.5 w-1.5 rounded-full bg-white/30" />
                </span>
              </div>
            )}

            <div
              ref={scrollRef}
              key={`${template.id}-${viewport}`}
              className="preview-scroll relative min-h-0 flex-1 overflow-y-auto overscroll-contain bg-white"
            >
              <PreviewRenderer template={template} />
            </div>
          </div>
        </div>

        <div className="flex flex-wrap items-center justify-between gap-2 border-t border-white/10 bg-[#070b14]/95 px-3 py-2 sm:px-4">
          <div className="flex items-center gap-2 text-[10px] text-slate-500">
            <span className="flex items-center gap-1 rounded-md bg-white/5 px-1.5 py-0.5">
              <kbd className="font-sans font-bold text-slate-400">ESC</kbd>
              tutup
            </span>
            <span className="hidden items-center gap-1 sm:flex">
              <Eye className="h-3 w-3" />
              Preview interaktif — coba filter, kalkulator, dan form
            </span>
            <span className="flex items-center gap-1 sm:hidden">
              <Eye className="h-3 w-3" />
              Data contoh
            </span>
          </div>
          <div className="flex items-center gap-2">
            <span className="hidden text-[10px] text-slate-500 md:inline">
              Lebar tampilan: <span className="font-semibold text-slate-300">{current.widthLabel}</span>
            </span>
            <a
              href={waLink}
              target="_blank"
              rel="noreferrer"
              className="inline-flex items-center gap-1 text-[10.5px] font-bold text-emerald-300 hover:text-emerald-200"
            >
              Tanya template ini
              <ArrowUpRight className="h-3 w-3" />
            </a>
          </div>
        </div>
      </div>
    </div>
  )

  return createPortal(content, document.body)
}
