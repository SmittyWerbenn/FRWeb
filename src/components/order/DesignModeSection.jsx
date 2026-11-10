import { Check, Clock, Layers, LayoutGrid, Lock, Sparkles, Zap } from '../../lib/icons'
import { TEMPLATES } from '../../data'
import { useOrder } from '../../context/OrderContext'
import CatalogSection from '../catalog/CatalogSection'
import CustomDesignForm from './CustomDesignForm'

function ModeTab({ active, disabled, icon, title, meta, onClick, controls, id, tone }) {
  const toneActive =
    tone === 'custom'
      ? 'border-[#0B1F3F] bg-[#E8EEFA] text-[#0B1F3F] shadow-[0_8px_24px_-12px_rgba(11,31,63,0.18)]'
      : 'border-[#0B1F3F] bg-[#E8EEFA] text-[#0B1F3F] shadow-[0_8px_24px_-12px_rgba(11,31,63,0.18)]'
  const iconActive = tone === 'custom' ? 'text-[#0B1F3F]' : 'text-[#0B1F3F]'

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
          : 'border-transparent bg-transparent text-[#64748B] hover:bg-[#E8EEFA] hover:text-[#0B1F3F]'
      } ${disabled ? 'cursor-not-allowed opacity-45 hover:bg-transparent' : ''}`}
    >
      <span
        className={`grid h-8 w-8 shrink-0 place-items-center rounded-lg ${
          active ? `${iconActive} bg-[#E8EEFA]` : 'bg-[#F5F8FD] text-[#64748B]'
        }`}
      >
        {icon}
      </span>
      <span className="min-w-0">
        <span className="flex items-center gap-1.5">
          <span className="truncate text-[12.5px] font-bold">{title}</span>
          {disabled && <Lock className="h-3 w-3 shrink-0 text-[#64748B]" />}
        </span>
        <span
          className={`mt-0.5 flex items-center gap-1 text-[10.5px] font-medium ${
            active ? 'text-[#0B1F3F]' : 'text-[#64748B]'
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
  onSelect,
  onRequestCustom,
}) {
  const { designMode, setDesignMode, designLocked, template, plan, isDesignReady } = useOrder()

  return (
    <section id="katalog" className="relative scroll-mt-20 px-4 py-14 sm:px-6 lg:px-8 lg:py-20">
      <div className="mx-auto w-full max-w-7xl">
        <div className="flex flex-col gap-4 lg:flex-row lg:items-end lg:justify-between">
          <div className="max-w-2xl">
            <span className="text-[11px] font-bold uppercase tracking-[0.22em] text-[#2F5BEA]">
              Langkah 3 · Desain
            </span>
            <h2 className="mt-2.5 text-[26px] font-extrabold leading-tight tracking-tight text-[#0B1F3F] sm:text-[34px]">
              Mau tayang cepat, atau desain khusus dari nol?
            </h2>
            <p className="mt-3 text-[14px] leading-relaxed text-[#64748B]">
              Dua jalur, satu alur order. Pakai template katalog dan website tayang dalam{' '}
              <span className="font-semibold text-[#0B1F3F]">± 30 menit</span>, atau ajukan brief custom
              bila butuh tampilan dan sistem yang benar-benar khusus untuk bisnis Anda.
            </p>
            <p className="mt-2.5 inline-flex items-start gap-2 rounded-lg border border-[#C5D0E4] bg-[#E8EEFA] px-2.5 py-1.5 text-[11.5px] font-medium leading-relaxed text-[#0B1F3F]">
              <LayoutGrid className="mt-0.5 h-3 w-3 shrink-0" />
              Semua template sudah termasuk Web Customer (landing &amp; booking) + Dashboard Admin
              pengelola.
            </p>
          </div>

          <div className="flex items-center gap-2 rounded-xl border border-[#DDE5F3] bg-[#F5F8FD] px-3.5 py-2.5">
            <span
              className={`grid h-6 w-6 shrink-0 place-items-center rounded-md ${
                isDesignReady ? 'bg-[#E8EEFA] text-[#0B1F3F]' : 'bg-[#E8EEFA] text-[#64748B]'
              }`}
            >
              <Check className="h-3.5 w-3.5" strokeWidth={3} />
            </span>
            <div className="min-w-0">
              <p className="text-[10px] font-bold uppercase tracking-wider text-[#64748B]">
                Status langkah 3
              </p>
              <p className="truncate text-[11.5px] font-semibold text-[#0B1F3F]">
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
          className="mt-7 flex flex-col gap-1.5 rounded-2xl border border-[#DDE5F3] bg-white p-1.5 sm:flex-row"
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
          <p className="mt-2.5 flex items-start gap-2 rounded-xl border border-[#C5D0E4] bg-[#E8EEFA] px-3.5 py-2.5 text-[11.5px] leading-relaxed text-[#0B1F3F]">
            <Lock className="mt-0.5 h-3.5 w-3.5 shrink-0" />
            Paket <strong className="font-bold text-[#0B1F3F]">{plan.name}</strong> dirancang khusus,
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
            <div className="flex flex-wrap items-center gap-x-3 gap-y-1.5 rounded-xl border border-[#C5D0E4] bg-[#E8EEFA] px-4 py-3">
              <span className="inline-flex items-center gap-1.5 rounded-md bg-[#E8EEFA] px-2 py-1 text-[10.5px] font-bold uppercase tracking-wide text-[#0B1F3F]">
                <Zap className="h-3 w-3" />
                Go-Live 30 menit
              </span>
              <p className="text-[11.5px] leading-relaxed text-[#475569]">
                Pilih satu template, lalu tim kami menyalakan website Anda di domain pilihan —
                konten awal disesuaikan dalam hitungan menit setelah pembayaran terkonfirmasi.
              </p>
            </div>

            <CatalogSection
              category={category}
              onCategoryChange={onCategoryChange}
              query={query}
              onQueryChange={onQueryChange}
              onSelect={onSelect}
              selectedTemplateId={template?.id ?? ''}
              onRequestCustom={onRequestCustom}
            />

            <div className="mt-8 flex flex-col gap-3 rounded-2xl border border-[#DDE5F3] bg-[#F5F8FD] p-5 sm:flex-row sm:items-center sm:justify-between">
              <div className="flex items-start gap-3">
                <span className="grid h-8 w-8 shrink-0 place-items-center rounded-lg bg-[#E8EEFA] text-[#0B1F3F]">
                  <Sparkles className="h-4 w-4" />
                </span>
                <div>
                  <p className="text-[12.5px] font-bold text-[#0B1F3F]">
                    Belum ada template yang mewakili brand Anda?
                  </p>
                  <p className="mt-0.5 text-[11.5px] leading-relaxed text-[#64748B]">
                    Tim desain bisa membuat konsep baru lengkap dengan fitur khusus — estimasi 3–7
                    hari kerja.
                  </p>
                </div>
              </div>
              <button
                type="button"
                onClick={() => setDesignMode('custom')}
                className="shrink-0 rounded-xl border border-[#C5D0E4] bg-[#E8EEFA] px-4 py-2.5 text-[12px] font-bold text-[#0B1F3F] transition hover:bg-[#E8EEFA]"
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
