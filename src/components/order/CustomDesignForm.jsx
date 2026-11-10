import { Check, Clock, Icon, Link2, PenLine, Sparkles } from '../../lib/icons'
import { CUSTOM_FEATURES, CUSTOM_NOTES_MAX, CUSTOM_TIMELINE } from '../../data/customFeatures'
import { scrollToSection, useOrder } from '../../context/OrderContext'

function StatusDot({ done }) {
  return (
    <span
      className={`grid h-4 w-4 shrink-0 place-items-center rounded-full ${
        done ? 'bg-[#0B1F3F] text-white' : 'bg-[#F3F4F6] text-[#6B7280]'
      }`}
      aria-hidden="true"
    >
      <Check className="h-2.5 w-2.5" strokeWidth={4} />
    </span>
  )
}

export default function CustomDesignForm() {
  const {
    customBrief,
    setCustomReference,
    setCustomNotes,
    toggleCustomFeature,
    resetCustomBrief,
    isCustomDesignReady,
    plan,
    domain,
    designLocked,
  } = useOrder()

  const selectedFeatures = customBrief.features
  const notesLength = customBrief.notes.length

  return (
    <div className="mt-6 grid gap-5 lg:grid-cols-[minmax(0,1fr)_340px]">
      {/* ── Form brief ─────────────────────────────────────────────── */}
      <div className="rounded-2xl border border-[#E5E7EB] bg-[#F9FAFB] p-5 sm:p-6">
        <div className="flex items-start gap-3">
          <span className="grid h-9 w-9 shrink-0 place-items-center rounded-xl bg-[#F3F4F6] text-[#0B1F3F]">
            <Sparkles className="h-4.5 w-4.5" />
          </span>
          <div>
            <h3 className="text-[15px] font-bold text-[#0B1F3F]">Brief singkat kebutuhan custom</h3>
            <p className="mt-1 text-[12.5px] leading-relaxed text-[#6B7280]">
              Kami tidak akan memakai template katalog. Tim desain menyusun konsep baru dari nol
              berdasarkan brief di bawah ini.
            </p>
          </div>
        </div>

        {/* 1. Referensi */}
        <div className="mt-6">
          <div className="flex flex-wrap items-baseline justify-between gap-2">
            <label htmlFor="brief-referensi" className="text-[12.5px] font-semibold text-[#0B1F3F]">
              Referensi Desain / Website Impian
            </label>
            <span className="text-[11px] text-[#6B7280]">URL atau nama website</span>
          </div>
          <div className="relative mt-2">
            <Link2 className="pointer-events-none absolute left-3.5 top-1/2 h-4 w-4 -translate-y-1/2 text-[#6B7280]" />
            <input
              id="brief-referensi"
              value={customBrief.reference}
              onChange={(event) => setCustomReference(event.target.value)}
              placeholder="https://website-kompetitor.com atau nama brand favorit"
              className="w-full rounded-xl border border-[#E5E7EB] bg-[#F9FAFB] py-3 pl-10 pr-3 text-[13px] text-[#0B1F3F] placeholder:text-[#6B7280] focus:border-[#0B1F3F] focus:bg-white focus:outline-none focus:ring-2 focus:ring-[#0B1F3F]/10"
            />
          </div>
          <p className="mt-1.5 text-[11px] leading-relaxed text-[#6B7280]">
            Boleh lebih dari satu, pisahkan dengan koma. Yang kami pelajari: struktur halaman, gaya
            visual, dan alur yang Anda sukai — bukan menjiplak mentah.
          </p>
        </div>

        {/* 2. Fitur khusus */}
        <fieldset className="mt-6">
          <div className="flex flex-wrap items-baseline justify-between gap-2">
            <legend className="text-[12.5px] font-semibold text-[#0B1F3F]">
              Kebutuhan Fitur Spesifik
            </legend>
            <span className="text-[11px] text-[#6B7280]">
              {selectedFeatures.length} dipilih · opsional, bisa dipilih lebih dari satu
            </span>
          </div>

          <div className="mt-2.5 grid gap-2 sm:grid-cols-2">
            {CUSTOM_FEATURES.map((feature) => {
              const active = selectedFeatures.includes(feature.id)
              return (
                <button
                  key={feature.id}
                  type="button"
                  onClick={() => toggleCustomFeature(feature.id)}
                  aria-pressed={active}
                  data-feature-option={feature.id}
                  className={`group flex items-start gap-2.5 rounded-xl border p-3 text-left transition ${
                    active
                      ? 'border-[#0B1F3F] bg-[#F3F4F6] shadow-[0_8px_24px_-12px_rgba(11,31,63,0.18)]'
                      : 'border-[#E5E7EB] bg-[#F9FAFB] hover:border-[#E5E7EB] hover:bg-[#F3F4F6]'
                  }`}
                >
                  <span
                    className={`mt-0.5 grid h-4 w-4 shrink-0 place-items-center rounded-[5px] border ${
                      active
                        ? 'border-[#0B1F3F] bg-[#0B1F3F] text-white'
                        : 'border-[#E5E7EB] text-transparent'
                    }`}
                    aria-hidden="true"
                  >
                    <Check className="h-2.5 w-2.5" strokeWidth={4} />
                  </span>
                  <span className="min-w-0">
                    <span className="flex items-center gap-1.5">
                      <Icon
                        name={feature.icon}
                        className={`h-3.5 w-3.5 ${active ? 'text-[#0B1F3F]' : 'text-[#6B7280]'}`}
                      />
                      <span
                        className={`text-[12px] font-semibold ${
                          active ? 'text-[#0B1F3F]' : 'text-[#374151]'
                        }`}
                      >
                        {feature.label}
                      </span>
                    </span>
                    <span className="mt-0.5 block text-[11px] leading-snug text-[#6B7280]">
                      {feature.desc}
                    </span>
                  </span>
                </button>
              )
            })}
          </div>
        </fieldset>

        {/* 3. Catatan */}
        <div className="mt-6">
          <div className="flex flex-wrap items-baseline justify-between gap-2">
            <label htmlFor="brief-catatan" className="text-[12.5px] font-semibold text-[#0B1F3F]">
              Catatan &amp; Kebutuhan Bisnis
            </label>
            <span
              className={`text-[11px] tabular-nums ${
                notesLength > CUSTOM_NOTES_MAX * 0.9 ? 'text-[#0B1F3F]' : 'text-[#6B7280]'
              }`}
            >
              {notesLength}/{CUSTOM_NOTES_MAX}
            </span>
          </div>
          <textarea
            id="brief-catatan"
            value={customBrief.notes}
            onChange={(event) => setCustomNotes(event.target.value.slice(0, CUSTOM_NOTES_MAX))}
            rows={4}
            placeholder="Misal: 3 cabang kafe, butuh halaman menu per cabang, pesanan online dengan pickup, dan dashboard laporan harian untuk owner."
            className="mt-2 w-full resize-y rounded-xl border border-[#E5E7EB] bg-[#F9FAFB] px-3.5 py-3 text-[13px] leading-relaxed text-[#0B1F3F] placeholder:text-[#6B7280] focus:border-[#0B1F3F] focus:bg-white focus:outline-none focus:ring-2 focus:ring-[#0B1F3F]/10"
          />
        </div>

        {/* Estimasi pengerjaan */}
        <div className="mt-6 rounded-xl border border-[#D1D5DB] bg-[#F9FAFB] p-4">
          <div className="flex items-start gap-3">
            <span className="grid h-8 w-8 shrink-0 place-items-center rounded-lg bg-[#F3F4F6] text-[#0B1F3F]">
              <Clock className="h-4 w-4" />
            </span>
            <div>
              <p className="text-[12.5px] font-bold text-[#0B1F3F]">
                Estimasi pengerjaan ± {CUSTOM_TIMELINE}
              </p>
              <p className="mt-1 text-[11.5px] leading-relaxed text-[#0B1F3F]">
                Dihitung sejak brief disetujui &amp; DP diterima. Termasuk wireframe, desain UI,
                development fitur khusus, QA lintas perangkat, dan 2x revisi mayor. Proyek dengan
                integrasi POS/ERP bisa lebih lama — estimasi final menyusul setelah diskusi teknis.
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* ── Ringkasan brief (sticky) ────────────────────────────────── */}
      <aside className="lg:sticky lg:top-24 lg:self-start">
        <div className="rounded-2xl border border-[#E5E7EB] bg-white p-5">
          <div className="flex items-center justify-between gap-2">
            <h3 className="text-[13.5px] font-bold text-[#0B1F3F]">Ringkasan brief</h3>
            <span className="rounded-full bg-[#F3F4F6] px-2 py-0.5 text-[10px] font-bold uppercase tracking-wide text-[#0B1F3F] ring-1 ring-inset ring-[#D1D5DB]">
              Custom
            </span>
          </div>

          <dl className="mt-4 space-y-2.5 text-[12px]">
            <div className="flex items-start justify-between gap-3">
              <dt className="text-[#6B7280]">Paket</dt>
              <dd className="text-right font-semibold text-[#0B1F3F]">{plan.name}</dd>
            </div>
            <div className="flex items-start justify-between gap-3">
              <dt className="text-[#6B7280]">Domain</dt>
              <dd className="truncate text-right font-medium text-[#4B5563]">
                {domain || 'belum diisi'}
              </dd>
            </div>
            <div className="flex items-start justify-between gap-3">
              <dt className="text-[#6B7280]">Mode desain</dt>
              <dd className="text-right font-semibold text-[#0B1F3F]">Custom Design</dd>
            </div>
          </dl>

          <div className="mt-4 space-y-2 border-t border-[#E5E7EB] pt-4">
            <p className="flex items-center gap-2 text-[11.5px] text-[#4B5563]">
              <StatusDot done={customBrief.reference.trim().length > 0} />
              Referensi web
            </p>
            <p className="flex items-center gap-2 text-[11.5px] text-[#4B5563]">
              <StatusDot done={selectedFeatures.length > 0} />
              Fitur khusus ({selectedFeatures.length})
            </p>
            <p className="flex items-center gap-2 text-[11.5px] text-[#4B5563]">
              <StatusDot done={customBrief.notes.trim().length > 0} />
              Catatan bisnis <span className="text-[#6B7280]">(opsional)</span>
            </p>
          </div>

          {selectedFeatures.length > 0 && (
            <div className="mt-4 flex flex-wrap gap-1.5 border-t border-[#E5E7EB] pt-4">
              {CUSTOM_FEATURES.filter((feature) => selectedFeatures.includes(feature.id)).map(
                (feature) => (
                  <span
                    key={feature.id}
                    className="rounded-md bg-[#F3F4F6] px-2 py-1 text-[10.5px] font-medium text-[#0B1F3F]"
                  >
                    {feature.label}
                  </span>
                ),
              )}
            </div>
          )}

          <div className="mt-4 flex items-center gap-2 rounded-lg bg-[#F9FAFB] px-3 py-2.5 text-[11.5px] text-[#4B5563]">
            <Clock className="h-3.5 w-3.5 shrink-0 text-[#0B1F3F]" />
            Estimasi {CUSTOM_TIMELINE}
          </div>

          <button
            type="button"
            onClick={() => scrollToSection('ringkasan')}
            disabled={!isCustomDesignReady}
            className="mt-4 inline-flex w-full items-center justify-center gap-2 rounded-xl bg-[#0B1F3F] px-4 py-3 text-[12.5px] font-bold text-white transition hover:bg-[#17315F] disabled:cursor-not-allowed disabled:opacity-40"
          >
            <PenLine className="h-3.5 w-3.5" />
            Lanjut ke ringkasan
          </button>

          {!isCustomDesignReady && (
            <p className="mt-2.5 text-[11px] leading-relaxed text-[#6B7280]">
              Isi minimal satu: URL referensi atau centang fitur khusus yang dibutuhkan.
            </p>
          )}

          {designLocked && (
            <p className="mt-2.5 rounded-lg bg-[#F3F4F6] px-3 py-2 text-[11px] leading-relaxed text-[#0B1F3F]">
              Paket {plan.name} otomatis memakai jalur Custom Design — template katalog tidak
              tersedia untuk paket ini.
            </p>
          )}

          <button
            type="button"
            onClick={resetCustomBrief}
            className="mt-3 w-full rounded-lg px-3 py-2 text-[11px] font-semibold text-[#6B7280] transition hover:bg-[#F3F4F6] hover:text-[#4B5563]"
          >
            Kosongkan brief
          </button>
        </div>
      </aside>
    </div>
  )
}
