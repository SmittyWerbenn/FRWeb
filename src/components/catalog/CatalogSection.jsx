import { useMemo } from 'react'
import { Search, Sparkles, X } from '../../lib/icons'
import { CATEGORIES, TEMPLATES, SEARCH_INDEX, countByCategory } from '../../data'
import TemplateCard from './TemplateCard'

const CATEGORY_NOTES = {
  all: 'Semua template unggulan FRWeb — tiap kategori punya varian visual yang berlawanan.',
  sports: 'Booking lapangan, kelas, dan venue. Bandingkan gaya Neon Athletic vs Luxury Country Club.',
  fnb: 'Reservasi meja, kalkulator catering, dan toko D2C. Dari warm dining sampai wabi-sabi.',
  service: 'Booking jasa, kalkulator produksi, dan agency engagement. Brutalist grid sampai luxe editorial.',
  retail: 'Katalog produk fisik, RFQ grosir, dan toko D2C. Editorial bersih atau cyberpunk spec grid.',
  events: 'Travel, wedding organizer, dan event organizer. Hero destinasi sampai portfolio gathering.',
}

/**
 * Isi katalog template (pencarian, filter kategori, grid kartu).
 * Wrapper section + judul langkah dikelola oleh DesignModeSection.
 */
export default function CatalogSection({
  category,
  onCategoryChange,
  query,
  onQueryChange,
  onPreview,
  onSelect,
  selectedTemplateId,
  onRequestCustom,
}) {
  const filtered = useMemo(() => {
    const needle = query.trim().toLowerCase()
    return TEMPLATES.filter((template) => {
      const matchesCategory = category === 'all' || template.category === category
      const matchesQuery = !needle || SEARCH_INDEX[template.id].includes(needle)
      return matchesCategory && matchesQuery
    })
  }, [category, query])

  const reset = () => {
    onCategoryChange('all')
    onQueryChange('')
  }

  return (
    <div className="mt-6">
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div className="flex gap-2 overflow-x-auto pb-1 [-ms-overflow-style:none] [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
          {CATEGORIES.map((item) => {
            const active = item.id === category
            const total = countByCategory(item.id)
            return (
              <button
                key={item.id}
                type="button"
                data-filter-tab={item.id}
                onClick={() => onCategoryChange(item.id)}
                aria-pressed={active}
                className={`inline-flex shrink-0 items-center gap-2 rounded-full border px-4 py-2.5 text-[12.5px] font-semibold transition ${
                  active
                    ? 'border-indigo-500/50 bg-indigo-500/15 text-indigo-100 shadow-[0_0_24px_-10px_rgba(99,102,241,0.8)]'
                    : 'border-slate-800/80 bg-white/[0.02] text-slate-400 hover:border-slate-700 hover:text-white'
                }`}
              >
                {item.label}
                <span
                  className={`text-[10px] font-bold tabular-nums ${
                    active ? 'text-indigo-200' : 'text-slate-500'
                  }`}
                >
                  ({total})
                </span>
              </button>
            )
          })}
        </div>

        <div className="w-full sm:w-[300px]">
          <label htmlFor="cari-template" className="sr-only">
            Cari template
          </label>
          <div className="relative">
            <Search className="pointer-events-none absolute left-3.5 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-500" />
            <input
              id="cari-template"
              value={query}
              onChange={(event) => onQueryChange(event.target.value)}
              placeholder="Cari template, gaya, atau industri…"
              className="w-full rounded-xl border border-slate-800/80 bg-white/[0.04] py-2.5 pl-10 pr-10 text-[13px] text-white placeholder:text-slate-500 focus:border-indigo-400/60 focus:bg-white/[0.06] focus:outline-none focus:ring-2 focus:ring-indigo-400/20"
            />
            {query && (
              <button
                type="button"
                onClick={() => onQueryChange('')}
                aria-label="Hapus pencarian"
                className="absolute right-2.5 top-1/2 grid h-6 w-6 -translate-y-1/2 place-items-center rounded-md text-slate-400 hover:bg-white/10 hover:text-white"
              >
                <X className="h-3.5 w-3.5" />
              </button>
            )}
          </div>
        </div>
      </div>

      <div className="mt-4 flex flex-wrap items-center justify-between gap-3 border-b border-slate-800/80 pb-4">
        <p className="text-[12px] text-slate-500">{CATEGORY_NOTES[category]}</p>
        <p className="text-[12px] font-medium text-slate-400">
          Menampilkan <span className="font-bold text-white">{filtered.length}</span> dari{' '}
          {TEMPLATES.length} template
        </p>
      </div>

      {filtered.length > 0 ? (
        <div className="mt-6 grid gap-5 sm:grid-cols-2 xl:grid-cols-3">
          {filtered.map((template) => (
            <TemplateCard
              key={template.id}
              template={template}
              onPreview={onPreview}
              onSelect={onSelect}
              selected={template.id === selectedTemplateId}
            />
          ))}
        </div>
      ) : (
        <div className="mt-10 rounded-2xl border border-dashed border-slate-800 bg-white/[0.02] px-6 py-16 text-center">
          <p className="text-[15px] font-bold text-white">Template tidak ditemukan</p>
          <p className="mx-auto mt-2 max-w-sm text-[13px] text-slate-400">
            Coba kata kunci lain seperti “booking”, “catering”, “brutalist”, atau “spec”.
          </p>
          <div className="mt-5 flex flex-wrap items-center justify-center gap-2">
            <button
              type="button"
              onClick={reset}
              className="rounded-lg border border-slate-700 px-4 py-2 text-[12px] font-semibold text-white hover:bg-white/5"
            >
              Reset filter
            </button>
            {onRequestCustom && (
              <button
                type="button"
                onClick={onRequestCustom}
                className="inline-flex items-center gap-1.5 rounded-lg bg-amber-400 px-4 py-2 text-[12px] font-bold text-[#1a1205] hover:brightness-110"
              >
                <Sparkles className="h-3.5 w-3.5" />
                Buatkan desain kustom
              </button>
            )}
          </div>
        </div>
      )}
    </div>
  )
}
