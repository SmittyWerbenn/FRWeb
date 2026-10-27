import { formatCompactIDR } from '../../lib/format'

/**
 * Thumbnail miniature landing page — satu layout struktural per archetype,
 * bukan banner gradien 2 kolom. Konten memakai data template asli agar
 * calon klien langsung melihat karakter industri sebelum membuka preview.
 *
 * Tinggi halaman mini ± 320px, viewport kartu 154px → hover menggeser
 * halaman ke bawah (auto-scroll) memperlihatkan section kedua.
 */

const alpha = (hex, value) => `${hex}${value}`

function Mark({ brand, theme, size = 'h-3.5 w-3.5' }) {
  return (
    <span
      className={`grid ${size} place-items-center rounded-[3px] text-[5.5px] font-black leading-none`}
      style={{ background: theme.accent, color: theme.ink }}
    >
      {brand.mark}
    </span>
  )
}

function Stars({ value = 5, color = '#F5B32C' }) {
  return (
    <span className="flex items-center gap-[1px]">
      {Array.from({ length: 5 }).map((_, index) => (
        <svg key={index} viewBox="0 0 24 24" className="h-[5px] w-[5px]" fill={index < value ? color : '#CBD5E1'}>
          <path d="M12 2l2.9 6.3 6.9.8-5 4.7 1.3 6.8L12 17.4 5.9 20.6 7.2 13.8l-5-4.7 6.9-.8z" />
        </svg>
      ))}
    </span>
  )
}

/* ------------------------------------------------------------------ */
/* A. Sport & Arena — dark athletic, hour grid, court cards            */
/* ------------------------------------------------------------------ */
function SportThumb({ template }) {
  const { theme, brand, hero, sports, reviews = [], location } = template
  const courts = (sports?.resources || []).slice(0, 3)
  const slots = ['06', '08', '10', '16', '18', '20', '21']
  const rating = reviews.length
    ? (reviews.reduce((sum, item) => sum + item.rating, 0) / reviews.length).toFixed(1)
    : '4.9'

  return (
    <div className="w-full" style={{ background: theme.ink, color: '#fff' }}>
      <div
        className="flex items-center justify-between px-2.5 py-1.5"
        style={{ borderBottom: '1px solid rgba(255,255,255,0.10)' }}
      >
        <span className="flex items-center gap-1">
          <Mark brand={brand} theme={theme} />
          <span className="text-[6px] font-extrabold uppercase tracking-[0.14em]">{brand.name}</span>
        </span>
        <span className="flex items-center gap-1.5">
          {['Lapangan', 'Jadwal', 'Harga', 'Kontak'].map((item) => (
            <span key={item} className="text-[4.6px] font-semibold text-white/45">
              {item}
            </span>
          ))}
          <span
            className="rounded-[2.5px] px-1.5 py-[2px] text-[4.8px] font-black uppercase"
            style={{ background: theme.accent, color: theme.ink }}
          >
            {hero.cta}
          </span>
        </span>
      </div>

      <div className="grid grid-cols-[1.1fr_1fr] gap-2 px-2.5 pt-2">
        <div>
          <span className="flex items-center gap-1">
            <span className="h-[3px] w-[3px] rounded-full" style={{ background: theme.accent }} />
            <span className="text-[4.4px] font-bold uppercase tracking-[0.16em] text-white/50">{hero.eyebrow}</span>
          </span>
          <p className="mt-1 text-[10px] font-black uppercase leading-[1.02] tracking-tight">
            {hero.title}
            <br />
            <span style={{ color: theme.accent }}>{hero.accentWord}</span>
          </p>
          <div className="mt-1.5 flex items-center gap-1">
            <span
              className="rounded-[3px] px-1.5 py-[3px] text-[4.6px] font-black"
              style={{ background: theme.accent, color: theme.ink }}
            >
              Booking Sekarang
            </span>
            <span className="rounded-[3px] border border-white/20 px-1.5 py-[3px] text-[4.6px] font-bold text-white/70">
              Lihat Slot
            </span>
          </div>
        </div>

        {/* Visual lapangan */}
        <div className="relative h-[54px] overflow-hidden rounded-[4px]" style={{ background: `linear-gradient(150deg, ${theme.accent2}, #052e22)` }}>
          <span className="absolute inset-[5px] rounded-[2px] border border-white/35" />
          <span className="absolute left-1/2 top-[5px] bottom-[5px] w-px bg-white/30" />
          <span className="absolute left-[5px] right-[5px] top-1/2 h-px bg-white/30" />
          <span
            className="absolute bottom-1 left-1 rounded-[2px] px-1 py-[2px] text-[4px] font-black uppercase"
            style={{ background: theme.accent, color: theme.ink }}
          >
            {courts.length || 3} Lapangan Indoor
          </span>
        </div>
      </div>

      {/* Kalender slot */}
      <div className="mt-2 px-2.5">
        <div className="flex items-center justify-between">
          <span className="text-[4.6px] font-bold uppercase tracking-[0.14em] text-white/45">Slot hari ini</span>
          <span className="flex items-center gap-1 text-[4.2px] font-semibold text-white/35">
            <span className="h-[3px] w-[3px] rounded-full" style={{ background: theme.accent }} />
            real-time
          </span>
        </div>
        <div className="mt-1 grid grid-cols-7 gap-[3px]">
          {slots.map((hour, index) => (
            <span
              key={hour}
              className="rounded-[2px] py-[3px] text-center text-[4.2px] font-bold"
              style={
                index === 4
                  ? { background: theme.accent, color: theme.ink }
                  : { background: 'rgba(255,255,255,0.07)', color: 'rgba(255,255,255,0.55)' }
              }
            >
              {hour}:00
            </span>
          ))}
        </div>
      </div>

      {/* Kartu lapangan */}
      <div className="mt-2 grid grid-cols-3 gap-1 px-2.5 pb-2.5">
        {courts.map((court, index) => (
          <div key={court.name} className="rounded-[3px] p-1" style={{ background: 'rgba(255,255,255,0.06)' }}>
            <span
              className="block h-[13px] rounded-[2px]"
              style={{ background: `linear-gradient(140deg, ${alpha(theme.accent, '55')}, ${alpha(theme.accent2, '30')})` }}
            />
            <p className="mt-[3px] truncate text-[4.4px] font-bold text-white/85">{court.name}</p>
            <p className="text-[4.8px] font-black" style={{ color: theme.accent }}>
              {court.price ? `${formatCompactIDR(court.price)}/jam` : `Court ${index + 1}`}
            </p>
          </div>
        ))}
      </div>

      {/* Di bawah fold */}
      <div className="grid grid-cols-3 gap-1 px-2.5 pb-2">
        {(template.highlights || []).slice(0, 3).map((item) => (
          <div key={item.title} className="rounded-[3px] border border-white/10 p-1">
            <p className="text-[4.4px] font-bold text-white/80">{item.title}</p>
            <span className="mt-[2px] block h-[1.5px] w-4/5 rounded bg-white/15" />
          </div>
        ))}
      </div>

      <div className="px-2.5 pb-1" style={{ background: 'rgba(255,255,255,0.05)' }}>
        <div className="flex items-center justify-between py-1.5">
          <span className="text-[4.2px] text-white/45">{location?.hours}</span>
          <span className="flex items-center gap-1">
            <Stars value={Math.round(Number(rating))} />
            <span className="text-[4.2px] font-bold text-white/70">{rating}</span>
          </span>
        </div>
      </div>
      <div className="flex items-center justify-between px-2.5 py-1.5" style={{ background: theme.accent }}>
        <span className="text-[4.6px] font-black uppercase tracking-wide" style={{ color: theme.ink }}>
          Booking via WhatsApp
        </span>
        <span className="text-[4.4px] font-bold" style={{ color: theme.ink }}>
          {brand.name}
        </span>
      </div>
    </div>
  )
}

/* ------------------------------------------------------------------ */
/* B. F&B & Dining — warm editorial, split hero, stacked menu cards    */
/* ------------------------------------------------------------------ */
function FnbThumb({ template }) {
  const { theme, brand, hero, reviews = [], location } = template
  const dishes = (template.menu?.length ? template.menu : template.shop?.products || []).slice(0, 3)
  const palette = [theme.accent, theme.accent2, '#B45309']

  return (
    <div className="w-full" style={{ background: theme.soft, color: theme.ink }}>
      <div className="flex items-center justify-between px-2.5 py-1.5" style={{ borderBottom: `1px solid ${alpha(theme.ink, '12')}` }}>
        <span className="flex items-center gap-1">
          <Mark brand={brand} theme={theme} />
          <span className="font-serif text-[6.5px] font-bold tracking-wide">{brand.name}</span>
        </span>
        <span className="flex items-center gap-1.5">
          {['Menu', 'Paket', 'Reservasi'].map((item) => (
            <span key={item} className="text-[4.6px] font-semibold" style={{ color: alpha(theme.ink, '88') }}>
              {item}
            </span>
          ))}
          <span className="rounded-[2.5px] px-1.5 py-[2px] text-[4.6px] font-bold" style={{ background: theme.ink, color: '#fff' }}>
            {hero.cta}
          </span>
        </span>
      </div>

      <div className="grid grid-cols-[1fr_0.92fr] items-start gap-2 px-2.5 pt-2.5">
        <div>
          <span className="text-[4.4px] font-bold uppercase tracking-[0.18em]" style={{ color: theme.accent2 }}>
            {hero.eyebrow}
          </span>
          <p className="mt-1 font-serif text-[11px] leading-[1.05]">
            {hero.title}
            <br />
            <em style={{ color: theme.accent2 }}>{hero.accentWord}</em>
          </p>
          <span className="mt-1.5 block h-[2px] w-6" style={{ background: theme.accent }} />
          <p className="mt-1 line-clamp-2 text-[4.2px] leading-[1.5]" style={{ color: alpha(theme.ink, '77') }}>
            {hero.desc}
          </p>
          <div className="mt-1.5 flex items-center gap-1">
            <span className="rounded-[2px] px-1.5 py-[3px] text-[4.4px] font-bold" style={{ background: theme.accent2, color: '#fff' }}>
              {hero.cta}
            </span>
            <span className="text-[4.2px] font-semibold" style={{ color: alpha(theme.ink, '66') }}>
              {hero.note || 'Konfirmasi instan'}
            </span>
          </div>
        </div>

        {/* Stacked menu cards */}
        <div className="relative h-[62px]">
          {dishes.map((dish, index) => (
            <div
              key={dish.name}
              className="absolute left-0 right-0 overflow-hidden rounded-[3px] bg-white shadow-[0_3px_8px_-4px_rgba(0,0,0,0.35)]"
              style={{
                top: `${index * 7}px`,
                marginLeft: `${index * 3}px`,
                transform: `rotate(${(index - 1) * 2.2}deg)`,
                zIndex: 3 - index,
              }}
            >
              <span className="flex items-center gap-1 p-[3px]">
                <span
                  className="h-[13px] w-[15px] shrink-0 rounded-[2px]"
                  style={{ background: `linear-gradient(140deg, ${palette[index]}, ${alpha(theme.ink, 'aa')})` }}
                />
                <span className="min-w-0">
                  <span className="block truncate text-[4.2px] font-bold">{dish.name}</span>
                  <span className="block text-[3.8px]" style={{ color: alpha(theme.ink, '66') }}>
                    {dish.tag}
                  </span>
                </span>
                <span className="ml-auto shrink-0 text-[4.2px] font-bold" style={{ color: theme.accent2 }}>
                  {dish.price ? formatCompactIDR(dish.price) : 'Pax'}
                </span>
              </span>
            </div>
          ))}
          <span className="absolute bottom-0 left-0 rounded-[2px] px-1 py-[2px] text-[3.6px] font-bold" style={{ background: theme.tint, color: theme.accent2 }}>
            Menu musiman
          </span>
        </div>
      </div>

      {/* Menu grid */}
      <div className="mt-2 px-2.5">
        <div className="flex items-center justify-between">
          <span className="font-serif text-[5.2px] font-bold">{template.menu?.length ? 'Menu Pilihan' : 'Produk Pilihan'}</span>
          <span className="text-[4px] font-semibold uppercase tracking-wide" style={{ color: alpha(theme.ink, '55') }}>
            {template.menu?.length ? `${template.menu.length} hidangan` : 'Signature'}
          </span>
        </div>
        <div className="mt-1 grid grid-cols-2 gap-x-2 gap-y-[3px]">
          {dishes.map((dish) => (
            <span key={`list-${dish.name}`} className="flex items-baseline gap-1">
              <span className="truncate text-[4.2px] font-semibold">{dish.name}</span>
              <span className="h-px flex-1 border-b border-dotted" style={{ borderColor: alpha(theme.ink, '33') }} />
              <span className="text-[4.2px] font-bold" style={{ color: theme.accent2 }}>
                {dish.price ? formatCompactIDR(dish.price) : '—'}
              </span>
            </span>
          ))}
        </div>
      </div>

      {/* Di bawah fold: testimoni + jam */}
      <div className="mt-2 px-2.5">
        <div className="rounded-[3px] p-1.5" style={{ background: theme.tint }}>
          <Stars value={5} color={theme.accent} />
          <p className="mt-[2px] line-clamp-2 text-[3.9px] italic leading-[1.5]" style={{ color: alpha(theme.ink, '88') }}>
            “{reviews[0]?.text || 'Pengalaman makan yang tidak bisa ditemukan di tempat lain.'}”
          </p>
          <p className="mt-[2px] text-[3.6px] font-bold uppercase tracking-wide" style={{ color: theme.accent2 }}>
            {reviews[0]?.name || 'Tamu tetap'} · {reviews[0]?.role || 'Pelanggan'}
          </p>
        </div>
      </div>

      <div className="mt-2 flex items-center justify-between px-2.5 py-1.5" style={{ background: theme.ink }}>
        <span className="text-[4px] text-white/60">{location?.hours}</span>
        <span className="rounded-[2px] px-1.5 py-[2px] text-[4.2px] font-bold" style={{ background: theme.accent, color: theme.ink }}>
          WhatsApp Booking
        </span>
      </div>
    </div>
  )
}

/* ------------------------------------------------------------------ */
/* C. Toko Fisik & Grosir — marketplace grid, price tags, RFQ          */
/* ------------------------------------------------------------------ */
function RetailThumb({ template }) {
  const { theme, brand, hero, shop, reviews = [] } = template
  const products = (shop?.products || []).slice(0, 6)
  const filters = (shop?.filters || ['Semua', 'Terlaris', 'Baru']).slice(0, 4)

  return (
    <div className="w-full" style={{ background: '#fff', color: theme.ink }}>
      <div className="flex items-center gap-1.5 px-2.5 py-1.5" style={{ borderBottom: `1px solid ${alpha(theme.ink, '12')}` }}>
        <Mark brand={brand} theme={theme} />
        <span className="text-[5.6px] font-extrabold uppercase tracking-wide">{brand.name}</span>
        <span className="ml-1 flex flex-1 items-center gap-1 rounded-[3px] px-1.5 py-[3px]" style={{ background: theme.soft }}>
          <svg viewBox="0 0 24 24" className="h-[5px] w-[5px]" fill="none" stroke={alpha(theme.ink, '77')} strokeWidth="2.4">
            <circle cx="11" cy="11" r="7" />
            <path d="M20 20l-3.5-3.5" />
          </svg>
          <span className="text-[3.9px]" style={{ color: alpha(theme.ink, '55') }}>
            Cari produk, ukuran, atau bahan…
          </span>
        </span>
        <span className="rounded-[2.5px] px-1.5 py-[2.5px] text-[4px] font-bold" style={{ background: theme.accent, color: '#fff' }}>
          RFQ
        </span>
      </div>

      <div className="flex items-center gap-1 overflow-hidden px-2.5 pt-1.5">
        {filters.map((filter, index) => (
          <span
            key={filter}
            className="shrink-0 rounded-full px-1.5 py-[2px] text-[4px] font-semibold"
            style={
              index === 0
                ? { background: theme.ink, color: '#fff' }
                : { background: theme.soft, color: alpha(theme.ink, '77') }
            }
          >
            {filter}
          </span>
        ))}
      </div>

      <div className="mx-2.5 mt-1.5 overflow-hidden rounded-[4px]" style={{ background: theme.tint }}>
        <div className="flex items-center justify-between px-2 py-1.5">
          <span className="min-w-0">
            <span className="block text-[4px] font-bold uppercase tracking-[0.16em]" style={{ color: theme.accent2 }}>
              Grosir & retail
            </span>
            <span className="block truncate text-[6.4px] font-extrabold leading-tight">{hero.title}</span>
            <span className="block truncate text-[3.9px]" style={{ color: alpha(theme.ink, '66') }}>
              {hero.accentWord} · {hero.eyebrow}
            </span>
          </span>
          <span className="shrink-0 rounded-[2.5px] px-1.5 py-[3px] text-[4px] font-bold" style={{ background: theme.accent, color: '#fff' }}>
            {hero.cta}
          </span>
        </div>
      </div>

      <div className="mt-1.5 grid grid-cols-3 gap-1 px-2.5 pb-1.5">
        {products.map((product, index) => (
          <div key={product.id || product.name} className="overflow-hidden rounded-[3px] border" style={{ borderColor: alpha(theme.ink, '15') }}>
            <span
              className="relative flex h-[20px] items-end justify-end"
              style={{ background: `linear-gradient(150deg, ${alpha(index % 2 ? theme.accent2 : theme.accent, '2e')}, ${alpha(theme.accent, '55')})` }}
            >
              {product.tag && (
                <span className="m-[2px] rounded-[1.5px] bg-white/85 px-[2px] py-[1px] text-[3px] font-black uppercase" style={{ color: theme.accent2 }}>
                  {product.tag}
                </span>
              )}
            </span>
            <span className="block px-1 pb-1 pt-[2px]">
              <span className="block truncate text-[3.8px] font-semibold">{product.name}</span>
              <span className="block text-[4px] font-black" style={{ color: theme.accent2 }}>
                {product.price ? formatCompactIDR(product.price) : 'Hubungi'}
              </span>
            </span>
          </div>
        ))}
      </div>

      {/* Di bawah fold */}
      <div className="flex items-center justify-between px-2.5 py-1.5" style={{ background: theme.ink }}>
        <span className="min-w-0">
          <span className="block text-[4.2px] font-bold text-white">Butuh volume besar?</span>
          <span className="block text-[3.6px]" style={{ color: 'rgba(255,255,255,0.6)' }}>
            Request for Quote — harga grosir bertingkat
          </span>
        </span>
        <span className="shrink-0 rounded-[2px] px-1.5 py-[2px] text-[3.8px] font-bold" style={{ background: theme.accent, color: '#fff' }}>
          Ajukan RFQ
        </span>
      </div>

      <div className="grid grid-cols-4 gap-1 px-2.5 py-1.5">
        {(template.stats || []).slice(0, 4).map((stat) => (
          <span key={stat.label} className="text-center">
            <span className="block text-[4.8px] font-black" style={{ color: theme.ink }}>
              {stat.value}
            </span>
            <span className="block text-[3.2px] uppercase tracking-wide" style={{ color: alpha(theme.ink, '55') }}>
              {stat.label}
            </span>
          </span>
        ))}
      </div>

      <div className="flex items-center justify-between px-2.5 pb-1.5">
        <Stars value={5} color={theme.accent2} />
        <span className="text-[3.6px]" style={{ color: alpha(theme.ink, '66') }}>
          {reviews.length} ulasan pembeli
        </span>
      </div>
    </div>
  )
}

/* ------------------------------------------------------------------ */
/* D. Jasa & Custom — mesh hero, 3 langkah, perbandingan paket          */
/* ------------------------------------------------------------------ */
function ServiceThumb({ template }) {
  const { theme, brand, hero, service, reviews = [] } = template
  const packages = (service?.packages || []).slice(0, 3)
  const steps = (template.process || template.steps || []).slice(0, 3)

  return (
    <div
      className="w-full"
      style={{
        background: `radial-gradient(120% 80% at 50% -10%, ${alpha(theme.accent, '26')} 0%, ${alpha(theme.accent2, '12')} 45%, #fff 78%)`,
        color: theme.ink,
      }}
    >
      <div className="flex items-center justify-between px-2.5 py-1.5">
        <span className="flex items-center gap-1">
          <Mark brand={brand} theme={theme} />
          <span className="text-[5.6px] font-extrabold tracking-tight">{brand.name}</span>
        </span>
        <span className="flex items-center gap-1.5">
          {['Layanan', 'Harga', 'Proses'].map((item) => (
            <span key={item} className="text-[4.4px] font-semibold" style={{ color: alpha(theme.ink, '77') }}>
              {item}
            </span>
          ))}
          <span className="rounded-[2.5px] px-1.5 py-[2px] text-[4.2px] font-bold" style={{ background: theme.accent, color: '#fff' }}>
            Booking
          </span>
        </span>
      </div>

      <div className="px-3 pt-2 text-center">
        <span
          className="inline-block rounded-full px-1.5 py-[2px] text-[3.8px] font-bold uppercase tracking-[0.14em]"
          style={{ background: '#fff', color: theme.accent2, border: `1px solid ${alpha(theme.accent, '44')}` }}
        >
          {hero.eyebrow}
        </span>
        <p className="mx-auto mt-1 max-w-[85%] text-[9px] font-extrabold leading-[1.08] tracking-tight">
          {hero.title} <span style={{ color: theme.accent2 }}>{hero.accentWord}</span>
        </p>
        <div className="mx-auto mt-1.5 flex max-w-[92%] items-center gap-[2px] rounded-[4px] border bg-white p-[2px] shadow-sm" style={{ borderColor: alpha(theme.ink, '14') }}>
          <span className="flex flex-1 items-center gap-1 px-1 py-[2px]">
            <svg viewBox="0 0 24 24" className="h-[5px] w-[5px]" fill="none" stroke={alpha(theme.ink, '44')} strokeWidth="2.2">
              <rect x="3" y="5" width="18" height="14" rx="2" />
              <path d="M7 15h4M7 11h6" />
            </svg>
            <span className="text-[3.8px]" style={{ color: alpha(theme.ink, '55') }}>
              Masukkan nomor pelat / jenis unit…
            </span>
          </span>
          <span className="rounded-[3px] px-1.5 py-[3px] text-[3.8px] font-bold" style={{ background: theme.accent, color: '#fff' }}>
            Cek Estimasi
          </span>
        </div>
      </div>

      <div className="mt-2 flex items-center justify-center gap-1 px-2.5">
        {(steps.length ? steps : [{ title: 'Daftar' }, { title: 'Pilih Paket' }, { title: 'Selesai' }]).map((step, index) => (
          <span key={step.title || index} className="flex items-center gap-1">
            <span className="flex items-center gap-[2px] rounded-full bg-white px-1 py-[2px] shadow-sm">
              <span className="grid h-[6px] w-[6px] place-items-center rounded-full text-[3px] font-black" style={{ background: theme.accent, color: '#fff' }}>
                {index + 1}
              </span>
              <span className="text-[3.6px] font-bold" style={{ color: alpha(theme.ink, '88') }}>
                {step.title || step}
              </span>
            </span>
            {index < 2 && <span className="h-px w-2" style={{ background: alpha(theme.accent, '66') }} />}
          </span>
        ))}
      </div>

      <div className="mt-2 grid grid-cols-3 gap-1 px-2.5 pb-1.5">
        {packages.map((pkg, index) => (
          <div
            key={pkg.id || pkg.name}
            className="rounded-[3px] border bg-white p-1"
            style={{
              borderColor: index === 1 ? theme.accent : alpha(theme.ink, '14'),
              boxShadow: index === 1 ? `0 4px 10px -6px ${alpha(theme.accent, 'cc')}` : 'none',
            }}
          >
            {index === 1 && (
              <span className="mb-[2px] block rounded-[1.5px] px-1 py-[1px] text-center text-[2.8px] font-black uppercase" style={{ background: theme.accent, color: '#fff' }}>
                Terlaris
              </span>
            )}
            <p className="truncate text-[3.8px] font-bold" style={{ color: alpha(theme.ink, '88') }}>
              {pkg.name}
            </p>
            <p className="text-[4.6px] font-black" style={{ color: theme.accent2 }}>
              {pkg.price ? formatCompactIDR(pkg.price) : 'Custom'}
            </p>
            {[0, 1, 2].map((row) => (
              <span key={row} className="mt-[1.5px] flex items-center gap-[2px]">
                <span className="h-[2px] w-[2px] rounded-full" style={{ background: theme.accent }} />
                <span className="h-[1.5px] flex-1 rounded" style={{ background: alpha(theme.ink, '1a') }} />
              </span>
            ))}
            <span className="mt-[3px] block rounded-[1.5px] py-[2px] text-center text-[3px] font-bold" style={{ background: index === 1 ? theme.accent : theme.tint, color: index === 1 ? '#fff' : theme.accent2 }}>
              Pilih
            </span>
          </div>
        ))}
      </div>

      {/* Di bawah fold: testimoni + footer */}
      <div className="mx-2.5 rounded-[3px] border bg-white px-1.5 py-1" style={{ borderColor: alpha(theme.ink, '12') }}>
        <div className="flex items-center justify-between">
          <span className="flex items-center gap-[3px]">
            <span className="grid h-[8px] w-[8px] place-items-center rounded-full text-[3px] font-black text-white" style={{ background: theme.accent2 }}>
              {reviews[0]?.name?.charAt(0) || 'A'}
            </span>
            <span className="text-[3.4px] font-bold">{reviews[0]?.name || 'Pelanggan setia'}</span>
          </span>
          <Stars value={5} color={theme.accent2} />
        </div>
        <p className="mt-[2px] line-clamp-2 text-[3.4px] leading-[1.5]" style={{ color: alpha(theme.ink, '77') }}>
          “{reviews[0]?.text || 'Prosesnya cepat, estimasi jelas, hasil rapi.'}”
        </p>
      </div>

      <div className="mt-1.5 flex items-center justify-between px-2.5 py-1.5" style={{ background: theme.ink }}>
        <span className="text-[3.8px] text-white/60">{template.location?.hours}</span>
        <span className="rounded-[2px] px-1.5 py-[2px] text-[3.6px] font-bold" style={{ background: theme.accent, color: '#fff' }}>
          WhatsApp Booking
        </span>
      </div>
    </div>
  )
}

const THUMBS = {
  sports: SportThumb,
  fnb: FnbThumb,
  retail: RetailThumb,
  service: ServiceThumb,
}

export default function ArchetypeThumb({ template }) {
  const Thumb = THUMBS[template.previewType] || RetailThumb

  return (
    <div className="relative h-full w-full overflow-hidden">
      <div className="transition-all duration-700 ease-in-out group-hover:-translate-y-[37.5%]">
        <Thumb template={template} />
      </div>
    </div>
  )
}
