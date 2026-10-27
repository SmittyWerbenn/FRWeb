import ArtScene from '../../ArtScene'
import { ArrowRight, Check, ChefHat, Clock, Leaf, Star } from '../../../lib/icons'
import { PvButton, PvChip, PvSection, cx } from '../ui'
import { HighlightsBlock, PreviewFooter, PreviewNav, ReviewBlock, StatStrip } from '../blocks/chrome'
import { CateringCalculator, FnbReservation } from '../blocks/FnbWidgets'
import ProductShop from '../blocks/ProductShop'
import { formatIDR } from '../../../lib/format'

export default function FnbComproPreview({ template }) {
  const { hero, theme, fnb, menu, brand } = template
  const mode = fnb.mode

  return (
    <div className="min-h-full font-sans" style={{ background: 'var(--soft)', color: 'var(--ink)' }}>
      <PreviewNav template={template} />

      <section id="pv-home" className="relative overflow-hidden" style={{ background: theme.tint }}>
        <div
          className="pointer-events-none absolute inset-0 opacity-[0.5]"
          style={{
            backgroundImage: `radial-gradient(circle at 12% 20%, ${theme.accent}55 0%, transparent 42%), radial-gradient(circle at 88% 80%, ${theme.accent2}22 0%, transparent 40%)`,
          }}
        />
        <div className="relative mx-auto grid w-full max-w-6xl items-center gap-8 px-4 py-9 @md:px-8 @md:py-12 @xl:grid-cols-[1.02fr_0.98fr] @xl:gap-10">
          <div>
            <PvChip className="!bg-white !text-[9.5px] uppercase tracking-[0.14em]" tone="soft">
              <ChefHat className="h-2.5 w-2.5" style={{ color: theme.accent2 }} />
              {hero.eyebrow}
            </PvChip>

            <h1 className="mt-3.5 text-[28px] font-extrabold leading-[1.08] tracking-tight @md:text-[36px] @lg:text-[42px]" style={{ color: theme.ink }}>
              {hero.title}{' '}
              <span className="relative inline-block">
                <span style={{ color: theme.accent2 }}>{hero.accentWord}</span>
                <span className="absolute -bottom-0.5 left-0 h-[3px] w-full rounded-full" style={{ background: theme.accent }} />
              </span>
            </h1>

            <p className="mt-3 max-w-lg text-[12.5px] leading-relaxed text-black/60 @md:text-[13.5px]">{hero.desc}</p>

            <div className="mt-5 flex flex-wrap items-center gap-2.5">
              <PvButton href="#pv-booking" variant="primary" size="lg">
                {hero.cta}
                <ArrowRight className="h-3.5 w-3.5" />
              </PvButton>
              <PvButton href={menu ? '#pv-menu' : '#pv-features'} variant="outline" size="lg">
                {hero.secondary}
              </PvButton>
            </div>

            <div className="mt-4 flex flex-wrap items-center gap-x-4 gap-y-1.5">
              <span className="flex items-center gap-1.5 text-[10px] font-medium text-black/50">
                <Check className="h-3 w-3" style={{ color: theme.accent2 }} strokeWidth={3} />
                {hero.note}
              </span>
            </div>

            <div className="mt-5 flex items-center gap-4">
              <div className="flex items-center gap-1">
                {[1, 2, 3, 4, 5].map((index) => (
                  <Star key={index} className="h-3 w-3 fill-current" style={{ color: '#E9A23B' }} />
                ))}
              </div>
              <span className="text-[10px] text-black/50">
                <span className="font-bold" style={{ color: theme.ink }}>
                  4.9/5
                </span>{' '}
                dari pelanggan {brand.name}
              </span>
            </div>
          </div>

          <div className="relative">
            <div className="overflow-hidden rounded-2xl bg-white p-2 shadow-[0_30px_70px_-45px_rgba(0,0,0,0.5)]">
              <ArtScene art={hero.art} theme={theme} className="overflow-hidden rounded-xl" />
              <div className="flex items-center justify-between gap-2 px-2 pb-1 pt-2.5">
                <div>
                  <p className="text-[10px] font-extrabold" style={{ color: theme.ink }}>
                    {brand.name}
                  </p>
                  <p className="text-[8.5px] text-black/45">{brand.tagline}</p>
                </div>
                <span
                  className="rounded-full px-2 py-1 text-[8.5px] font-bold"
                  style={{ background: theme.tint, color: theme.accent2 }}
                >
                  {mode === 'shop' ? 'Same-day delivery' : 'Reservasi online'}
                </span>
              </div>
            </div>

            <div className="absolute -bottom-4 -left-2 flex items-center gap-2 rounded-xl border border-white bg-white px-2.5 py-2 shadow-lg @md:-left-5">
              <span className="grid h-7 w-7 place-items-center rounded-lg" style={{ background: theme.ink, color: theme.accent }}>
                <Leaf className="h-3.5 w-3.5" />
              </span>
              <div>
                <p className="text-[9.5px] font-bold" style={{ color: theme.ink }}>
                  Bumbu segar tiap pagi
                </p>
                <p className="text-[8.5px] text-black/45">Tanpa pengawet tambahan</p>
              </div>
            </div>

            <div className="absolute -right-1 top-4 flex items-center gap-1.5 rounded-full bg-white px-2.5 py-1 shadow-md @md:-right-3">
              <Clock className="h-2.5 w-2.5" style={{ color: theme.accent2 }} />
              <span className="text-[8.5px] font-semibold" style={{ color: theme.ink }}>
                Konfirmasi &lt; 1 menit
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

      {menu && (
        <PvSection id="pv-menu" tone="white">
          <div className="flex flex-col gap-2 @md:flex-row @md:items-end @md:justify-between">
            <div>
              <span className="text-[10px] font-bold uppercase tracking-[0.2em]" style={{ color: theme.accent2 }}>
                Pilihan menu
              </span>
              <h2 className="mt-2 text-[22px] font-extrabold tracking-tight @md:text-[28px]" style={{ color: theme.ink }}>
                Yang paling sering dipesan
              </h2>
            </div>
            <a href="#pv-booking" className="inline-flex items-center gap-1 text-[11px] font-bold" style={{ color: theme.accent2 }}>
              {mode === 'calculator' ? 'Lihat paket lengkap' : 'Reservasi meja'}
              <ArrowRight className="h-3 w-3" />
            </a>
          </div>

          <div className="mt-5 grid gap-2.5 @sm:grid-cols-2 @lg:grid-cols-4">
            {menu.map((item, index) => (
              <div
                key={item.name}
                className={cx(
                  'group overflow-hidden rounded-xl border border-black/[0.07] bg-white',
                  index === 0 && '@sm:col-span-2 @lg:col-span-1',
                )}
              >
                <div
                  className="relative h-16"
                  style={{
                    background: `linear-gradient(135deg, ${index % 2 === 0 ? theme.ink : theme.accent2} 0%, ${index % 2 === 0 ? theme.accent2 : theme.accent} 100%)`,
                  }}
                >
                  <span className="absolute bottom-1.5 left-2 text-[18px] font-black text-white/25">
                    0{index + 1}
                  </span>
                  {item.tag && (
                    <span className="absolute right-1.5 top-1.5 rounded-full bg-white/95 px-1.5 py-0.5 text-[7.5px] font-bold" style={{ color: theme.ink }}>
                      {item.tag}
                    </span>
                  )}
                </div>
                <div className="p-2.5">
                  <p className="text-[10.5px] font-bold leading-tight" style={{ color: theme.ink }}>
                    {item.name}
                  </p>
                  <p className="mt-0.5 line-clamp-2 text-[9px] leading-snug text-black/45">{item.desc}</p>
                  <p className="mt-1.5 text-[10.5px] font-extrabold" style={{ color: theme.accent2 }}>
                    {item.price > 0 ? formatIDR(item.price) : 'Termasuk paket'}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </PvSection>
      )}

      <HighlightsBlock
        template={template}
        tone={menu ? 'soft' : 'white'}
        title={fnb.featureTitle}
        sub={fnb.featureSub}
      />

      <PvSection id="pv-booking" tone="tint">
        <div className="flex flex-col gap-3 @md:flex-row @md:items-end @md:justify-between">
          <div>
            <span className="text-[10px] font-bold uppercase tracking-[0.2em]" style={{ color: theme.accent2 }}>
              {mode === 'shop' ? 'Belanja langsung' : mode === 'calculator' ? 'Simulasi biaya' : 'Reservasi'}
            </span>
            <h2 className="mt-2 text-[22px] font-extrabold leading-tight tracking-tight @md:text-[28px]" style={{ color: theme.ink }}>
              {fnb.sectionTitle}
            </h2>
            <p className="mt-2 max-w-xl text-[12px] leading-relaxed text-black/55">{fnb.sectionSub}</p>
          </div>
          {mode !== 'shop' && (
            <div className="flex items-center gap-1.5 rounded-full bg-white px-3 py-1.5 shadow-sm">
              <Check className="h-3 w-3" style={{ color: theme.accent2 }} strokeWidth={3} />
              <span className="text-[9.5px] font-semibold" style={{ color: theme.ink }}>
                Tanpa biaya admin tersembunyi
              </span>
            </div>
          )}
        </div>

        <div className="mt-5">
          {mode === 'reservation' && <FnbReservation template={template} />}
          {mode === 'calculator' && <CateringCalculator template={template} />}
          {mode === 'shop' && <ProductShop template={template} />}
        </div>

        <p className="mt-3 text-center text-[9.5px] text-black/40">
          Semua transaksi pada demo ini bersifat simulasi. Data menu dan harga adalah contoh.
        </p>
      </PvSection>

      <ReviewBlock template={template} tone="soft" />
      <PreviewFooter template={template} ctaLabel={hero.cta} />
    </div>
  )
}
