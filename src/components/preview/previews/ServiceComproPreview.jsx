import ArtScene from '../../ArtScene'
import { ArrowRight, CalendarDays, Check, CheckCircle2, Clock, ShieldCheck } from '../../../lib/icons'
import { PvButton, PvChip, PvSection } from '../ui'
import { HighlightsBlock, PreviewFooter, PreviewNav, ReviewBlock, StatStrip } from '../blocks/chrome'
import ServiceBooking, { TrackingTimeline } from '../blocks/ServiceBooking'
import { formatIDR } from '../../../lib/format'

export default function ServiceComproPreview({ template }) {
  const { hero, theme, service, stats } = template
  const firstPackage = service.packages[0]
  const slots = (service.times || []).slice(0, 3)

  return (
    <div className="min-h-full font-sans" style={{ background: 'var(--soft)', color: 'var(--ink)' }}>
      <PreviewNav template={template} />

      <section id="pv-home" className="relative overflow-hidden" style={{ background: theme.ink }}>
        <div
          className="pointer-events-none absolute inset-0 opacity-30"
          style={{
            backgroundImage: `radial-gradient(circle at 82% 18%, ${theme.accent}55 0%, transparent 45%), radial-gradient(circle at 8% 85%, ${theme.accent2}44 0%, transparent 45%)`,
          }}
        />
        <div className="relative mx-auto grid w-full max-w-6xl items-center gap-8 px-4 py-9 @md:px-8 @md:py-12 @xl:grid-cols-[1.05fr_0.95fr] @xl:gap-10">
          <div>
            <PvChip tone="dark" className="!text-[9.5px] uppercase tracking-[0.14em]">
              <span className="h-1.5 w-1.5 animate-pulse rounded-full" style={{ background: theme.accent }} />
              {hero.eyebrow}
            </PvChip>

            <h1 className="mt-3.5 text-[28px] font-extrabold leading-[1.08] tracking-tight text-white @md:text-[36px] @lg:text-[42px]">
              {hero.title} <span style={{ color: theme.accent }}>{hero.accentWord}</span>
            </h1>

            <p className="mt-3 max-w-lg text-[12.5px] leading-relaxed text-white/65 @md:text-[13.5px]">{hero.desc}</p>

            <div className="mt-5 flex flex-wrap items-center gap-2.5">
              <PvButton href="#pv-booking" variant="accent" size="lg">
                {hero.cta}
                <ArrowRight className="h-3.5 w-3.5" />
              </PvButton>
              <PvButton href="#pv-features" variant="onDark" size="lg">
                {hero.secondary}
              </PvButton>
            </div>

            <div className="mt-4 flex flex-wrap items-center gap-x-4 gap-y-1.5">
              <span className="flex items-center gap-1.5 text-[10px] text-white/50">
                <Check className="h-3 w-3" style={{ color: theme.accent }} strokeWidth={3} />
                {hero.note}
              </span>
              <span className="flex items-center gap-1.5 text-[10px] text-white/50">
                <ShieldCheck className="h-3 w-3" style={{ color: theme.accent }} />
                Garansi pengerjaan
              </span>
            </div>

            <div className="mt-5 flex items-center gap-2.5 rounded-xl border border-white/12 bg-white/[0.04] px-3 py-2.5">
              <span className="grid h-8 w-8 place-items-center rounded-lg" style={{ background: theme.accent, color: theme.ink }}>
                <CheckCircle2 className="h-4 w-4" />
              </span>
              <div className="min-w-0">
                <p className="text-[9.5px] font-bold text-white">
                  {service.mode === 'quantity' ? 'Harga per pcs otomatis' : 'Slot tersedia minggu ini'}
                </p>
                <p className="truncate text-[8.5px] text-white/45">
                  {service.mode === 'quantity'
                    ? `${firstPackage.name} mulai ${formatIDR(firstPackage.price)} • min ${service.quantity.min} pcs`
                    : `${slots.join(' · ')} dan jam lainnya`}
                </p>
              </div>
            </div>
          </div>

          <div className="relative">
            <div className="overflow-hidden rounded-2xl border border-white/15 shadow-2xl shadow-black/40">
              <ArtScene art={hero.art} theme={theme} className="h-[200px] @md:h-[260px]" />
              <div className="flex items-center justify-between gap-2 bg-white px-3 py-2.5">
                <div className="flex items-center gap-2">
                  <CalendarDays className="h-3.5 w-3.5" style={{ color: theme.accent2 }} />
                  <div>
                    <p className="text-[9.5px] font-bold" style={{ color: theme.ink }}>
                      {service.mode === 'quantity' ? 'Estimasi produksi' : 'Booking real-time'}
                    </p>
                    <p className="text-[8px] text-black/45">
                      {service.mode === 'quantity'
                        ? `${service.quantity.min}–${service.quantity.max} pcs per order`
                        : 'Konfirmasi langsung, tanpa antre telepon'}
                    </p>
                  </div>
                </div>
                <span className="rounded-full px-2 py-1 text-[8px] font-bold" style={{ background: theme.tint, color: theme.accent2 }}>
                  {service.depositPct ? `DP ${service.depositPct}%` : 'Tanpa DP'}
                </span>
              </div>
            </div>

            <div className="absolute -bottom-4 -left-2 flex items-center gap-2 rounded-xl border border-white bg-white px-2.5 py-2 shadow-lg @md:-left-5">
              <span className="grid h-7 w-7 place-items-center rounded-lg" style={{ background: theme.tint, color: theme.accent2 }}>
                <Clock className="h-3.5 w-3.5" />
              </span>
              <div>
                <p className="text-[9.5px] font-bold" style={{ color: theme.ink }}>
                  {stats[1]?.value || '7 hari'} rata-rata
                </p>
                <p className="text-[8.5px] text-black/45">{stats[1]?.label || 'waktu pengerjaan'}</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      <div className="px-4 @md:px-8" style={{ background: theme.ink }}>
        <div className="mx-auto w-full max-w-6xl pb-6">
          <StatStrip template={template} />
        </div>
      </div>

      <HighlightsBlock template={template} tone="white" title={service.featureTitle} sub={service.featureSub} />

      <PvSection id="pv-booking" tone="tint">
        <div className="flex flex-col gap-3 @md:flex-row @md:items-end @md:justify-between">
          <div>
            <span className="text-[10px] font-bold uppercase tracking-[0.2em]" style={{ color: theme.accent2 }}>
              {service.mode === 'quantity' ? 'Kalkulator produksi' : 'Booking online'}
            </span>
            <h2 className="mt-2 text-[22px] font-extrabold leading-tight tracking-tight @md:text-[28px]" style={{ color: theme.ink }}>
              {service.sectionTitle}
            </h2>
            <p className="mt-2 max-w-xl text-[12px] leading-relaxed text-black/55">{service.sectionSub}</p>
          </div>
          <div className="flex items-center gap-1.5 rounded-full bg-white px-3 py-1.5 shadow-sm">
            <span className="h-1.5 w-1.5 animate-pulse rounded-full" style={{ background: theme.accent2 }} />
            <span className="text-[9.5px] font-semibold" style={{ color: theme.ink }}>
              {service.mode === 'quantity' ? 'Proof sebelum produksi' : 'Slot diperbarui otomatis'}
            </span>
          </div>
        </div>

        <div className="mt-5">
          <ServiceBooking template={template} />
        </div>

        {service.tracking && <TrackingTimeline template={template} />}

        <p className="mt-3 text-center text-[9.5px] text-black/40">
          Harga dan jadwal pada demo ini adalah contoh. Data asli dikelola dari dashboard admin Anda.
        </p>
      </PvSection>

      <ReviewBlock template={template} tone="soft" />
      <PreviewFooter template={template} ctaLabel={hero.cta} />
    </div>
  )
}
