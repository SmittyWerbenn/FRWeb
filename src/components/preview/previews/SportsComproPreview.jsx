import ArtScene from '../../ArtScene'
import { ArrowRight, Check, Clock, Sparkles, Users } from '../../../lib/icons'
import { PvButton, PvChip, PvSection } from '../ui'
import { HighlightsBlock, PreviewFooter, PreviewNav, ReviewBlock, StatStrip } from '../blocks/chrome'
import SportsBooking from '../blocks/SportsBooking'

export default function SportsComproPreview({ template }) {
  const { hero, theme, sports, stats } = template
  const available = sports.resources.reduce((sum, resource) => {
    const times = resource.times || sports.times || []
    return sum + times.filter((slot) => slot.left !== 0).length
  }, 0)
  const totalSlots = sports.resources.reduce((sum, resource) => {
    const times = resource.times || sports.times || []
    return sum + times.length
  }, 0)

  return (
    <div className="min-h-full font-sans" style={{ background: 'var(--soft)', color: 'var(--ink)' }}>
      <PreviewNav template={template} />

      <section id="pv-home" className="relative overflow-hidden" style={{ background: theme.ink }}>
        <div
          className="pointer-events-none absolute inset-0 opacity-[0.18]"
          style={{
            backgroundImage:
              'linear-gradient(115deg, transparent 0 48%, rgba(255,255,255,.5) 48% 49%, transparent 49% 100%)',
            backgroundSize: '120px 120px',
          }}
        />
        <div
          className="pointer-events-none absolute -right-24 -top-24 h-80 w-80 rounded-full blur-[90px]"
          style={{ background: theme.accent, opacity: 0.22 }}
        />

        <div className="relative mx-auto grid w-full max-w-6xl gap-8 px-4 pb-14 pt-9 @md:px-8 @md:pt-12 @xl:grid-cols-[1.05fr_0.95fr] @xl:items-center @xl:gap-10 @xl:pb-16">
          <div>
            <PvChip tone="dark" className="!text-[9.5px] uppercase tracking-[0.14em]">
              <span className="h-1.5 w-1.5 animate-pulse rounded-full" style={{ background: theme.accent }} />
              {hero.eyebrow}
            </PvChip>

            <h1 className="mt-3.5 text-[27px] font-extrabold leading-[1.1] tracking-tight text-white @md:text-[36px] @lg:text-[42px]">
              {hero.title}{' '}
              <span style={{ color: theme.accent }}>{hero.accentWord}</span>
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

            <div className="mt-4 flex flex-wrap items-center gap-x-4 gap-y-1.5 text-[10px] text-white/50">
              <span className="flex items-center gap-1.5">
                <Check className="h-3 w-3" style={{ color: theme.accent }} strokeWidth={3} />
                {hero.note}
              </span>
            </div>

            <div className="mt-5 flex items-center gap-3">
              <div className="flex -space-x-1.5">
                {['A', 'R', 'S', 'D'].map((initial, index) => (
                  <span
                    key={initial}
                    className="grid h-6 w-6 place-items-center rounded-full border-2 text-[8.5px] font-bold"
                    style={{
                      borderColor: theme.ink,
                      background: index % 2 === 0 ? theme.accent : 'rgba(255,255,255,0.15)',
                      color: index % 2 === 0 ? theme.ink : '#fff',
                    }}
                  >
                    {initial}
                  </span>
                ))}
              </div>
              <p className="text-[9.5px] leading-tight text-white/50">
                <span className="block font-bold text-white/80">{stats[0]?.value} lapangan aktif</span>
                dipakai ratusan pemain setiap minggu
              </p>
            </div>
          </div>

          <div className="relative">
            <div className="overflow-hidden rounded-2xl border border-white/15 shadow-2xl shadow-black/40">
              <ArtScene art={hero.art} theme={theme} className="h-[210px] @md:h-[280px]" />
              <div className="flex items-center justify-between gap-2 bg-white px-3 py-2.5">
                <div className="flex items-center gap-1.5">
                  <span className="h-1.5 w-1.5 animate-pulse rounded-full" style={{ background: theme.accent2 }} />
                  <span className="text-[9.5px] font-bold" style={{ color: theme.ink }}>
                    {available} slot tersedia hari ini
                  </span>
                </div>
                <span className="text-[8.5px] text-black/40">dari {totalSlots} slot</span>
              </div>
            </div>

            <div className="absolute -bottom-4 -left-3 flex items-center gap-2 rounded-xl border border-white/15 bg-[#0b1a14]/95 px-2.5 py-2 shadow-xl backdrop-blur @md:-left-5">
              <span className="grid h-7 w-7 place-items-center rounded-lg" style={{ background: theme.accent, color: theme.ink }}>
                <Users className="h-3.5 w-3.5" />
              </span>
              <div>
                <p className="text-[9.5px] font-bold text-white">Booking online 24 jam</p>
                <p className="text-[8.5px] text-white/50">Konfirmasi dalam 30 detik</p>
              </div>
            </div>

            <div className="absolute -right-2 top-4 flex items-center gap-1.5 rounded-full border border-white/20 bg-black/40 px-2.5 py-1 backdrop-blur @md:-right-4">
              <Sparkles className="h-2.5 w-2.5" style={{ color: theme.accent }} />
              <span className="text-[8.5px] font-semibold text-white">DP QRIS</span>
            </div>
          </div>
        </div>
      </section>

      <div className="px-4 @md:px-8">
        <div className="mx-auto w-full max-w-6xl">
          <StatStrip template={template} overlap />
        </div>
      </div>

      <HighlightsBlock template={template} tone="soft" title={sports.featureTitle} sub={sports.featureSub} />

      <PvSection id="pv-booking" tone="tint">
        <div className="flex flex-col gap-3 @md:flex-row @md:items-end @md:justify-between">
          <div>
            <span className="text-[10px] font-bold uppercase tracking-[0.2em]" style={{ color: theme.accent2 }}>
              Jadwal &amp; harga
            </span>
            <h2 className="mt-2 text-[22px] font-extrabold leading-tight tracking-tight @md:text-[28px]" style={{ color: theme.ink }}>
              {sports.sectionTitle}
            </h2>
            <p className="mt-2 max-w-xl text-[12px] leading-relaxed text-black/55">{sports.sectionSub}</p>
          </div>
          <div className="flex items-center gap-1.5 rounded-full bg-white px-3 py-1.5 shadow-sm">
            <Clock className="h-3 w-3" style={{ color: theme.accent2 }} />
            <span className="text-[9.5px] font-semibold" style={{ color: theme.ink }}>
              {sports.depositPct}% DP • sisa di lokasi
            </span>
          </div>
        </div>

        <div className="mt-5">
          <SportsBooking template={template} />
        </div>

        <p className="mt-3 text-center text-[9.5px] text-black/40">
          Data jadwal pada demo ini adalah contoh. Jadwal asli tersinkron dengan kalender operasional Anda.
        </p>
      </PvSection>

      <ReviewBlock template={template} tone="soft" />
      <PreviewFooter template={template} ctaLabel={hero.cta} />
    </div>
  )
}
