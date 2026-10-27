import { useState } from 'react'
import { Icon, Menu, MessageCircle, Phone, MapPin, Clock, Star, Quote, X, ArrowRight } from '../../../lib/icons'
import { PvButton, PvChip, PvHeading, PvSection, Stars, MiniMap, cx } from '../ui'

function openStatus(hours) {
  const match = /(\d{1,2})[.:](\d{2}).*?(\d{1,2})[.:](\d{2})/.exec(hours || '')
  if (!match) return { open: true, label: 'Buka Hari Ini' }
  const now = new Date()
  const minutes = now.getHours() * 60 + now.getMinutes()
  const start = Number(match[1]) * 60 + Number(match[2])
  const end = Number(match[3]) * 60 + Number(match[4])
  const open = minutes >= start && minutes < end
  return {
    open,
    label: open ? 'Buka Sekarang' : `Tutup · buka ${match[1].padStart(2, '0')}.${match[2]}`,
  }
}

export function PreviewNav({ template }) {
  const { brand, nav, hero, theme, location } = template
  const [open, setOpen] = useState(false)
  const status = openStatus(location?.hours)

  return (
    <div
      className="sticky top-0 z-30 border-b border-black/[0.06]"
      style={{ background: 'rgba(255,255,255,0.9)', backdropFilter: 'blur(14px)' }}
    >
      <div className="mx-auto flex h-14 w-full max-w-6xl items-center justify-between gap-3 px-4 @md:h-16 @md:px-8">
        <a href="#pv-home" className="flex min-w-0 items-center gap-2">
          <span
            className="grid h-7 w-7 shrink-0 place-items-center rounded-lg text-[11px] font-black @md:h-8 @md:w-8"
            style={{ background: theme.ink, color: theme.accent }}
          >
            {brand.mark}
          </span>
          <span className="min-w-0">
            <span className="block truncate text-[12.5px] font-extrabold leading-tight @md:text-[13.5px]" style={{ color: theme.ink }}>
              {brand.name}
            </span>
            <span className="hidden text-[9px] font-medium text-black/45 @md:block">{brand.tagline}</span>
          </span>
        </a>

        <nav className="hidden items-center gap-5 @lg:flex">
          {nav.map((item) => (
            <a
              key={item.label}
              href={item.href}
              className="text-[11.5px] font-semibold text-black/60 transition hover:text-black"
            >
              {item.label}
            </a>
          ))}
        </nav>

        <div className="flex items-center gap-2">
          <span
            className="hidden items-center gap-1.5 rounded-full border px-2 py-1 text-[9.5px] font-bold @sm:inline-flex"
            style={{
              borderColor: status.open ? 'rgba(16,185,129,0.35)' : 'rgba(0,0,0,0.12)',
              background: status.open ? 'rgba(16,185,129,0.10)' : 'rgba(0,0,0,0.03)',
              color: status.open ? '#047857' : 'rgba(0,0,0,0.5)',
            }}
          >
            <span
              className={`h-1.5 w-1.5 rounded-full ${status.open ? 'animate-pulse' : ''}`}
              style={{ background: status.open ? '#10b981' : '#94a3b8' }}
            />
            {status.label}
          </span>
          <a
            href="#pv-booking"
            className="hidden items-center gap-1.5 rounded-lg px-3.5 py-2 text-[11.5px] font-bold @sm:inline-flex"
            style={{ background: theme.ink, color: '#FFFFFF' }}
          >
            {hero.cta}
            <ArrowRight className="h-3 w-3" />
          </a>
          <button
            type="button"
            onClick={() => setOpen((value) => !value)}
            aria-label="Menu"
            className="grid h-8 w-8 place-items-center rounded-lg border border-black/10 @lg:hidden"
            style={{ color: theme.ink }}
          >
            {open ? <X className="h-4 w-4" /> : <Menu className="h-4 w-4" />}
          </button>
        </div>
      </div>

      {open && (
        <div className="border-t border-black/[0.06] bg-white px-4 py-2 @lg:hidden">
          {nav.map((item) => (
            <a
              key={item.label}
              href={item.href}
              onClick={() => setOpen(false)}
              className="block rounded-md px-2 py-2 text-[12px] font-semibold text-black/65 hover:bg-black/[0.03]"
            >
              {item.label}
            </a>
          ))}
          <a
            href="#pv-booking"
            onClick={() => setOpen(false)}
            className="mt-1 block rounded-md px-2 py-2 text-[12px] font-bold"
            style={{ color: theme.accent2 }}
          >
            {hero.cta}
          </a>
        </div>
      )}
    </div>
  )
}

export function StatStrip({ template, overlap = false }) {
  const { stats, reviews, theme } = template
  const average = (reviews.reduce((sum, item) => sum + item.rating, 0) / reviews.length).toFixed(1)

  return (
    <div
      className={cx(
        'grid grid-cols-2 gap-px overflow-hidden rounded-xl border border-black/[0.07] bg-black/[0.06] @md:grid-cols-4',
        overlap && 'relative z-10 -mt-8 shadow-[0_18px_40px_-30px_rgba(0,0,0,0.5)]',
      )}
    >
      {stats.map((stat) => (
        <div key={stat.label} className="bg-white px-4 py-3.5 text-center">
          <p className="text-[17px] font-extrabold leading-none @md:text-[19px]" style={{ color: theme.ink }}>
            {stat.value}
          </p>
          <p className="mt-1 text-[9.5px] font-medium uppercase tracking-wide text-black/45">{stat.label}</p>
        </div>
      ))}
      <div className="bg-white px-4 py-3.5 text-center">
        <div className="flex items-center justify-center gap-1">
          <Star className="h-3.5 w-3.5 fill-current" style={{ color: '#F5B32C' }} />
          <p className="text-[17px] font-extrabold leading-none @md:text-[19px]" style={{ color: theme.ink }}>
            {average}
          </p>
        </div>
        <p className="mt-1 text-[9.5px] font-medium uppercase tracking-wide text-black/45">
          {reviews.length} ulasan terverifikasi
        </p>
      </div>
    </div>
  )
}

export function HighlightsBlock({ template, tone = 'white', title, sub }) {
  const { highlights, theme } = template
  return (
    <PvSection id="pv-features" tone={tone}>
      <PvHeading
        eyebrow="Keunggulan"
        title={title || 'Kenapa pelanggan memilih kami'}
        sub={sub || 'Bukan sekadar tampilan. Fitur di bawah ini bekerja setiap hari untuk bisnis kami.'}
      />
      <div className="mt-6 grid gap-3 @md:grid-cols-3">
        {highlights.map((item) => (
          <div
            key={item.title}
            className="group rounded-xl border border-black/[0.07] bg-white p-4 transition hover:-translate-y-0.5 hover:shadow-lg hover:shadow-black/5"
          >
            <span
              className="grid h-9 w-9 place-items-center rounded-lg"
              style={{ background: theme.tint, color: theme.accent2 }}
            >
              <Icon name={item.icon} className="h-4 w-4" />
            </span>
            <h3 className="mt-3 text-[13px] font-bold leading-snug" style={{ color: theme.ink }}>
              {item.title}
            </h3>
            <p className="mt-1.5 text-[11.5px] leading-relaxed text-black/55">{item.desc}</p>
          </div>
        ))}
      </div>
    </PvSection>
  )
}

export function ReviewBlock({ template, tone = 'tint' }) {
  const { reviews, theme, brand } = template
  const average = (reviews.reduce((sum, item) => sum + item.rating, 0) / reviews.length).toFixed(1)

  return (
    <PvSection id="pv-reviews" tone={tone}>
      <div className="flex flex-col gap-4 @md:flex-row @md:items-end @md:justify-between">
        <PvHeading
          eyebrow="Ulasan pelanggan"
          title="Kata mereka yang sudah datang"
          sub={`Rating rata-rata ${average} dari ${reviews.length} ulasan terverifikasi pelanggan ${brand.name}.`}
        />
        <div className="flex items-center gap-2 rounded-full bg-white px-3.5 py-2 shadow-sm">
          <Stars rating={Number(average)} size="h-3.5 w-3.5" />
          <span className="text-[12px] font-extrabold" style={{ color: theme.ink }}>
            {average}
          </span>
          <span className="text-[10.5px] text-black/45">/ 5.0</span>
        </div>
      </div>

      <div className="mt-6 grid gap-3 @md:grid-cols-3">
        {reviews.map((review) => (
          <figure
            key={review.name}
            className="flex h-full flex-col rounded-xl border border-black/[0.07] bg-white p-4"
          >
            <Quote className="h-4 w-4 opacity-20" style={{ color: theme.accent2 }} />
            <blockquote className="mt-2 flex-1 text-[11.5px] leading-relaxed text-black/65">
              “{review.text}”
            </blockquote>
            <figcaption className="mt-4 flex items-center gap-2.5 border-t border-black/[0.06] pt-3">
              <span
                className="grid h-7 w-7 place-items-center rounded-full text-[10px] font-extrabold"
                style={{ background: theme.tint, color: theme.accent2 }}
              >
                {review.name
                  .split(' ')
                  .slice(0, 2)
                  .map((part) => part[0])
                  .join('')}
              </span>
              <span className="min-w-0">
                <span className="block truncate text-[11.5px] font-bold" style={{ color: theme.ink }}>
                  {review.name}
                </span>
                <span className="flex items-center gap-1.5">
                  <Stars rating={review.rating} size="h-2.5 w-2.5" />
                  <span className="truncate text-[9.5px] text-black/45">{review.role}</span>
                </span>
              </span>
            </figcaption>
          </figure>
        ))}
      </div>
    </PvSection>
  )
}

export function PreviewFooter({ template, ctaLabel }) {
  const { brand, location, theme, nav } = template

  return (
    <footer id="pv-location" className="scroll-mt-16 px-4 pb-6 pt-12 @md:px-8" style={{ background: theme.ink }}>
      <div className="mx-auto w-full max-w-6xl">
        <div className="grid gap-8 @md:grid-cols-[1.1fr_0.9fr_0.9fr]">
          <div>
            <div className="flex items-center gap-2.5">
              <span
                className="grid h-9 w-9 place-items-center rounded-xl text-[12px] font-black"
                style={{ background: theme.accent, color: theme.ink }}
              >
                {brand.mark}
              </span>
              <div>
                <p className="text-[14px] font-extrabold text-white">{brand.name}</p>
                <p className="text-[10px] text-white/50">{brand.tagline}</p>
              </div>
            </div>
            <p className="mt-4 max-w-sm text-[11.5px] leading-relaxed text-white/60">
              {location.landmarks}. Kami siap melayani dengan standar yang sama setiap harinya.
            </p>
            <div className="mt-4 flex flex-wrap gap-2">
              {nav.slice(0, 4).map((item) => (
                <a
                  key={item.label}
                  href={item.href}
                  className="rounded-full border border-white/15 px-2.5 py-1 text-[10px] font-medium text-white/65 transition hover:border-white/35 hover:text-white"
                >
                  {item.label}
                </a>
              ))}
            </div>
          </div>

          <div className="space-y-3">
            <div className="flex items-start gap-2.5">
              <MapPin className="mt-0.5 h-3.5 w-3.5 shrink-0" style={{ color: theme.accent }} />
              <div>
                <p className="text-[10px] font-bold uppercase tracking-wider text-white/40">Alamat</p>
                <p className="mt-0.5 text-[11.5px] leading-relaxed text-white/75">{location.address}</p>
              </div>
            </div>
            <div className="flex items-start gap-2.5">
              <Clock className="mt-0.5 h-3.5 w-3.5 shrink-0" style={{ color: theme.accent }} />
              <div>
                <p className="text-[10px] font-bold uppercase tracking-wider text-white/40">Jam buka</p>
                <p className="mt-0.5 text-[11.5px] leading-relaxed text-white/75">{location.hours}</p>
              </div>
            </div>
            <div className="flex items-start gap-2.5">
              <Phone className="mt-0.5 h-3.5 w-3.5 shrink-0" style={{ color: theme.accent }} />
              <div>
                <p className="text-[10px] font-bold uppercase tracking-wider text-white/40">Kontak</p>
                <p className="mt-0.5 text-[11.5px] text-white/75">{brand.phone}</p>
              </div>
            </div>
          </div>

          <div>
            <MiniMap label={location.mapLabel} />
            <PvButton href="#pv-booking" variant="accent" size="sm" className="mt-3 w-full">
              <MessageCircle className="h-3.5 w-3.5" />
              {ctaLabel || 'Hubungi kami'}
            </PvButton>
          </div>
        </div>

        <div className="mt-8 flex flex-col gap-2 border-t border-white/10 pt-4 @md:flex-row @md:items-center @md:justify-between">
          <p className="text-[10px] text-white/45">
            © {new Date().getFullYear()} {brand.name}. Semua hak dilindungi.
          </p>
          <p className="text-[9.5px] text-white/35">
            Template demo oleh FRWeb — data brand, harga, dan ulasan bersifat contoh.
          </p>
        </div>
      </div>
    </footer>
  )
}

export function PreviewHeroBadge({ children, template }) {
  return (
    <PvChip tone="accent" className="!text-[9.5px]">
      <span className="h-1.5 w-1.5 animate-pulse rounded-full" style={{ background: template.theme.ink }} />
      {children}
    </PvChip>
  )
}

export function SectionAnchor({ id }) {
  return <span id={id} className="block h-0 scroll-mt-20" />
}
