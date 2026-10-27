import ArtScene from '../../ArtScene'
import { ArrowRight, Check, Ruler, ShieldCheck, Sparkles, Truck } from '../../../lib/icons'
import { PvButton, PvChip, PvSection } from '../ui'
import { HighlightsBlock, PreviewFooter, PreviewNav, ReviewBlock, StatStrip } from '../blocks/chrome'
import ProductShop from '../blocks/ProductShop'
import { BouquetBuilder, DimensionEstimator } from '../blocks/Configurators'

export default function RetailComproPreview({ template }) {
  const { hero, theme, retail, shop, stats } = template

  return (
    <div className="min-h-full font-sans" style={{ background: 'var(--soft)', color: 'var(--ink)' }}>
      <PreviewNav template={template} />

      <section id="pv-home" className="relative overflow-hidden" style={{ background: theme.tint }}>
        <div
          className="pointer-events-none absolute inset-0"
          style={{
            backgroundImage: `linear-gradient(180deg, rgba(255,255,255,0.5) 0%, transparent 55%), radial-gradient(circle at 78% 22%, ${theme.accent}33 0%, transparent 55%)`,
          }}
        />
        <div className="relative mx-auto grid w-full max-w-6xl items-center gap-8 px-4 py-9 @md:px-8 @md:py-12 @xl:grid-cols-[1.02fr_0.98fr] @xl:gap-12">
          <div>
            <PvChip className="!bg-white !text-[9.5px] uppercase tracking-[0.14em]" tone="soft">
              <Sparkles className="h-2.5 w-2.5" style={{ color: theme.accent2 }} />
              {hero.eyebrow}
            </PvChip>

            <h1 className="mt-3.5 text-[28px] font-extrabold leading-[1.08] tracking-tight @md:text-[36px] @lg:text-[42px]" style={{ color: theme.ink }}>
              {hero.title} <span style={{ color: theme.accent2 }}>{hero.accentWord}</span>
            </h1>

            <p className="mt-3 max-w-lg text-[12.5px] leading-relaxed text-black/60 @md:text-[13.5px]">{hero.desc}</p>

            <div className="mt-5 flex flex-wrap items-center gap-2.5">
              <PvButton href="#pv-shop" variant="primary" size="lg">
                {hero.cta}
                <ArrowRight className="h-3.5 w-3.5" />
              </PvButton>
              <PvButton href={shop.configurator ? '#pv-booking' : '#pv-features'} variant="outline" size="lg">
                {hero.secondary}
              </PvButton>
            </div>

            <p className="mt-4 flex items-center gap-1.5 text-[10px] font-medium text-black/50">
              <Check className="h-3 w-3" style={{ color: theme.accent2 }} strokeWidth={3} />
              {hero.note}
            </p>

            <div className="mt-5 grid max-w-md grid-cols-3 gap-2">
              {[
                { icon: ShieldCheck, label: 'Garansi kualitas' },
                { icon: Truck, label: 'Kirim nasional' },
                { icon: Ruler, label: 'Ukuran presisi' },
              ].map(({ icon: Icon, label }) => (
                <div key={label} className="flex items-center gap-1.5 rounded-lg bg-white/70 px-2 py-1.5">
                  <Icon className="h-3 w-3 shrink-0" style={{ color: theme.accent2 }} />
                  <span className="text-[8.5px] font-semibold leading-tight" style={{ color: theme.ink }}>
                    {label}
                  </span>
                </div>
              ))}
            </div>
          </div>

          <div className="relative">
            <div className="overflow-hidden rounded-2xl border border-black/[0.06] bg-white p-2 shadow-[0_30px_70px_-45px_rgba(0,0,0,0.5)]">
              <ArtScene art={hero.art} theme={theme} className="overflow-hidden rounded-xl" />
              <div className="flex items-center justify-between px-2 pb-1 pt-2.5">
                <div>
                  <p className="text-[10px] font-extrabold" style={{ color: theme.ink }}>
                    {hero.eyebrow}
                  </p>
                  <p className="text-[8.5px] text-black/45">{template.brand.tagline}</p>
                </div>
                <span className="flex items-center gap-1 text-[8.5px] font-bold" style={{ color: theme.accent2 }}>
                  <span className="h-1.5 w-1.5 rounded-full" style={{ background: theme.accent2 }} />
                  stok real-time
                </span>
              </div>
            </div>

            <div className="absolute -bottom-4 -left-2 rounded-xl border border-white bg-white px-3 py-2 shadow-lg @md:-left-5">
              <p className="text-[8.5px] font-medium uppercase tracking-wide text-black/40">Rating toko</p>
              <p className="flex items-baseline gap-1 text-[13px] font-extrabold" style={{ color: theme.ink }}>
                {stats[2]?.value || '4.9'}
                <span className="text-[8.5px] font-medium text-black/45">/ 5.0</span>
              </p>
            </div>

            <div className="absolute -right-1 top-4 flex items-center gap-1.5 rounded-full bg-white px-2.5 py-1 shadow-md @md:-right-3">
              <span className="h-1.5 w-1.5 animate-pulse rounded-full" style={{ background: theme.accent2 }} />
              <span className="text-[8.5px] font-semibold" style={{ color: theme.ink }}>
                {retail.mode === 'rfq' ? 'Penawaran 1×24 jam' : 'Checkout otomatis'}
              </span>
            </div>
          </div>
        </div>
      </section>

      <div className="px-4 @md:px-8" style={{ background: theme.tint }}>
        <div className="mx-auto w-full max-w-6xl pb-6">
          <StatStrip template={template} />
        </div>
      </div>

      <HighlightsBlock template={template} tone="white" title={retail.featureTitle} sub={retail.featureSub} />

      <PvSection id="pv-shop" tone="soft">
        <div className="flex flex-col gap-3 @md:flex-row @md:items-end @md:justify-between">
          <div>
            <span className="text-[10px] font-bold uppercase tracking-[0.2em]" style={{ color: theme.accent2 }}>
              {retail.mode === 'rfq' ? 'Katalog proyek' : 'Katalog produk'}
            </span>
            <h2 className="mt-2 text-[22px] font-extrabold leading-tight tracking-tight @md:text-[28px]" style={{ color: theme.ink }}>
              {retail.sectionTitle}
            </h2>
            <p className="mt-2 max-w-xl text-[12px] leading-relaxed text-black/55">{retail.sectionSub}</p>
          </div>
          <div className="flex items-center gap-1.5 rounded-full bg-white px-3 py-1.5 shadow-sm">
            <ShieldCheck className="h-3 w-3" style={{ color: theme.accent2 }} />
            <span className="text-[9.5px] font-semibold" style={{ color: theme.ink }}>
              {retail.mode === 'rfq' ? 'Harga proyek tersedia' : 'Pembayaran aman'}
            </span>
          </div>
        </div>

        <div className="mt-5">
          <ProductShop template={template} />
        </div>
      </PvSection>

      {shop.configurator && (
        <PvSection id="pv-booking" tone="white">
          <div className="mb-4 flex items-end justify-between gap-3">
            <div>
              <span className="text-[10px] font-bold uppercase tracking-[0.2em]" style={{ color: theme.accent2 }}>
                Simulator
              </span>
              <h2 className="mt-1.5 text-[22px] font-extrabold tracking-tight @md:text-[26px]" style={{ color: theme.ink }}>
                {shop.configurator.type === 'dimension' ? 'Hitung furnitur ukuran khusus' : 'Rangkai buket & ucapan'}
              </h2>
            </div>
            <span className="hidden rounded-full bg-black/[0.04] px-3 py-1.5 text-[9.5px] font-semibold text-black/50 @md:inline-flex">
              Estimasi langsung, tanpa chat
            </span>
          </div>
          {shop.configurator.type === 'dimension' ? (
            <DimensionEstimator template={template} />
          ) : (
            <BouquetBuilder template={template} />
          )}
        </PvSection>
      )}

      <ReviewBlock template={template} tone="tint" />
      <PreviewFooter template={template} ctaLabel={hero.cta} />
    </div>
  )
}
