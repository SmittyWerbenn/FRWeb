import { Check, Clock, Layers, Lock, Sparkles, Zap } from '../../lib/icons'
import { TEMPLATES } from '../../data'
import { useOrder } from '../../context/OrderContext'
import CatalogSection from '../catalog/CatalogSection'
import CustomDesignForm from './CustomDesignForm'

function ModeTab({ active, disabled, icon, title, meta, onClick, controls, id, tone }) {
  const toneActive =
    tone === 'custom'
      ? 'border-amber-400/50 bg-amber-400/[0.12] text-white shadow-[0_18px_50px_-30px_rgba(251,191,36,0.9)]'
      : 'border-indigo-400/50 bg-indigo-500/15 text-white shadow-[0_18px_50px_-30px_rgba(99,102,241,0.9)]'
  const iconActive = tone === 'custom' ? 'text-amber-300' : 'text-indigo-300'

  return (
    <button
      type="button"
      role="tab"
      id={id}
      aria-selected={active}
      aria-controls={controls}
      disabled={disabled}
      onClick={onClick}
      className={`group flex flex-1 items-center gap-3 rounded-xl border px-3.5 py-3 text-left transition sm:px-4 ${
        active
          ? toneActive
          : 'border-transparent bg-transparent text-slate-400 hover:bg-white/[0.04] hover:text-white'
      } ${disabled ? 'cursor-not-allowed opacity-45 hover:bg-transparent' : ''}`}
    >
      <span
        className={`grid h-8 w-8 shrink-0 place-items-center rounded-lg ${
          active ? `${iconActive} bg-white/[0.08]` : 'bg-white/[0.04] text-slate-500'
        }`}
      >
        {icon}
      </span>
      <span className="min-w-0">
        <span className="flex items-center gap-1.5">
          <span className="truncate text-[12.5px] font-bold">{title}</span>
          {disabled && <Lock className="h-3 w-3 shrink-0 text-slate-500" />}
        </span>
        <span
          className={`mt-0.5 flex items-center gap-1 text-[10.5px] font-medium ${
            active ? 'text-white/70' : 'text-slate-500'
          }`}
        >
          {meta}
        </span>
      </span>
    </button>
  )
}

export default function DesignModeSection({
  category,
  onCategoryChange,
  query,
  onQueryChange,
  onPreview,
  onSelect,
  onRequestCustom,
}) {
  const { designMode, setDesignMode, designLocked, template, plan, isDesignReady } = useOrder()

  return (
    <section id="katalog" className="relative scroll-mt-20 px-4 py-14 sm:px-6 lg:px-8 lg:py-20">
      <div className="mx-auto w-full max-w-7xl">
        <div className="flex flex-col gap-4 lg:flex-row lg:items-end lg:justify-between">
          <div className="max-w-2xl">
            <span className="text-[11px] font-bold uppercase tracking-[0.22em] text-indigo-400">
              Langkah 3 · Desain
            </span>
            <h2 className="mt-2.5 text-[26px] font-extrabold leading-tight tracking-tight text-white sm:text-[34px]">
              Mau tayang cepat, atau desain khusus dari nol?
            </h2>
            <p className="mt-3 text-[14px] leading-relaxed text-slate-400">
              Dua jalur, satu alur order. Pakai template katalog dan website tayang dalam{' '}
              <span className="font-semibold text-white">± 30 menit</span>, atau ajukan brief custom
              bila butuh tampilan dan sistem yang benar-benar khusus untuk bisnis Anda.
            </p>
          </div>

          <div className="flex items-center gap-2 rounded-xl border border-slate-800/80 bg-white/[0.03] px-3.5 py-2.5">
            <span
              className={`grid h-6 w-6 shrink-0 place-items-center rounded-md ${
                isDesignReady ? 'bg-emerald-400/15 text-emerald-300' : 'bg-white/[0.05] text-slate-500'
              }`}
            >
              <Check className="h-3.5 w-3.5" strokeWidth={3} />
            </span>
            <div className="min-w-0">
              <p className="text-[10px] font-bold uppercase tracking-wider text-slate-500">
                Status langkah 3
              </p>
              <p className="truncate text-[11.5px] font-semibold text-white">
                {isDesignReady
                  ? designMode === 'custom'
                    ? 'Brief custom siap dikirim'
                    : `Template terpilih: ${template?.name ?? '-'}`
                  : designMode === 'custom'
                    ? 'Brief belum lengkap'
                    : 'Belum ada template dipilih'}
              </p>
            </div>
          </div>
        </div>

        {/* Toggle mode desain */}
        <div
          role="tablist"
          aria-label="Mode desain"
          className="mt-7 flex flex-col gap-1.5 rounded-2xl border border-slate-800/80 bg-[#0b1120] p-1.5 sm:flex-row"
        >
          <ModeTab
            id="tab-template"
            controls="panel-template"
            active={designMode === 'template'}
            disabled={designLocked}
            tone="template"
            icon={<Layers className="h-4 w-4" />}
            title={`Katalog Template (${TEMPLATES.length} Template)`}
            meta={
              <>
                <Zap className="h-3 w-3" />
                Go-Live 30 menit
              </>
            }
            onClick={() => setDesignMode('template')}
          />
          <ModeTab
            id="tab-custom"
            controls="panel-custom"
            active={designMode === 'custom'}
            disabled={false}
            tone="custom"
            icon={<Sparkles className="h-4 w-4" />}
            title="Request Custom Design"
            meta={
              <>
                <Clock className="h-3 w-3" />
                Desain baru · 3–7 hari kerja
              </>
            }
            onClick={() => setDesignMode('custom')}
          />
        </div>

        {designLocked && (
          <p className="mt-2.5 flex items-start gap-2 rounded-xl border border-amber-400/25 bg-amber-400/[0.07] px-3.5 py-2.5 text-[11.5px] leading-relaxed text-amber-200/85">
            <Lock className="mt-0.5 h-3.5 w-3.5 shrink-0" />
            Paket <strong className="font-bold text-amber-200">{plan.name}</strong> dirancang khusus,
            jadi Langkah 3 terkunci di mode Custom Design. Ingin pakai template katalog? Ganti paket
            ke Starter, Growth, atau Enterprise di Langkah 1.
          </p>
        )}

        {designMode === 'template' ? (
          <div
            id="panel-template"
            role="tabpanel"
            aria-labelledby="tab-template"
            className="mt-6"
          >
            <div className="flex flex-wrap items-center gap-x-3 gap-y-1.5 rounded-xl border border-indigo-400/20 bg-indigo-500/[0.06] px-4 py-3">
              <span className="inline-flex items-center gap-1.5 rounded-md bg-indigo-500/20 px-2 py-1 text-[10.5px] font-bold uppercase tracking-wide text-indigo-200">
                <Zap className="h-3 w-3" />
                Go-Live 30 menit
              </span>
              <p className="text-[11.5px] leading-relaxed text-slate-300">
                Pilih satu template, lalu tim kami menyalakan website Anda di domain pilihan —
                konten awal disesuaikan dalam hitungan menit setelah pembayaran terkonfirmasi.
              </p>
            </div>

            <CatalogSection
              category={category}
              onCategoryChange={onCategoryChange}
              query={query}
              onQueryChange={onQueryChange}
              onPreview={onPreview}
              onSelect={onSelect}
              selectedTemplateId={template?.id ?? ''}
              onRequestCustom={onRequestCustom}
            />

            <div className="mt-8 flex flex-col gap-3 rounded-2xl border border-slate-800/80 bg-gradient-to-r from-amber-400/[0.07] to-transparent p-5 sm:flex-row sm:items-center sm:justify-between">
              <div className="flex items-start gap-3">
                <span className="grid h-8 w-8 shrink-0 place-items-center rounded-lg bg-amber-400/15 text-amber-300">
                  <Sparkles className="h-4 w-4" />
                </span>
                <div>
                  <p className="text-[12.5px] font-bold text-white">
                    Belum ada template yang mewakili brand Anda?
                  </p>
                  <p className="mt-0.5 text-[11.5px] leading-relaxed text-slate-400">
                    Tim desain bisa membuat konsep baru lengkap dengan fitur khusus — estimasi 3–7
                    hari kerja.
                  </p>
                </div>
              </div>
              <button
                type="button"
                onClick={() => setDesignMode('custom')}
                className="shrink-0 rounded-xl border border-amber-400/40 bg-amber-400/10 px-4 py-2.5 text-[12px] font-bold text-amber-200 transition hover:bg-amber-400/20"
              >
                Request Custom Design →
              </button>
            </div>
          </div>
        ) : (
          <div id="panel-custom" role="tabpanel" aria-labelledby="tab-custom">
            <CustomDesignForm />
          </div>
        )}
      </div>
    </section>
  )
}
