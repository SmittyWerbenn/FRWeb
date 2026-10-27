import { useMemo, useState } from 'react'
import { CalendarDays, Check, Clock, CreditCard, QrCode, Truck, Users } from '../../../lib/icons'
import { addDays, formatIDR, fullDateLabel, localISO, shortDayLabel, dayNumber, monthLabel } from '../../../lib/format'
import { Field, PvButton, Stepper, SuccessPanel, cx, fieldClass } from '../ui'

function code(prefix) {
  return `${prefix}-${Math.random().toString(36).slice(2, 7).toUpperCase()}`
}

export function FnbReservation({ template }) {
  const { fnb, theme, brand } = template
  const [areaId, setAreaId] = useState(fnb.areas[0].id)
  const [guests, setGuests] = useState(fnb.defaultGuests || 2)
  const [dayIndex, setDayIndex] = useState(0)
  const [time, setTime] = useState(fnb.times[0])
  const [addonNames, setAddonNames] = useState([])
  const [success, setSuccess] = useState(null)

  const area = fnb.areas.find((item) => item.id === areaId) || fnb.areas[0]
  const days = useMemo(() => Array.from({ length: 7 }, (_, index) => addDays(new Date(), index)), [])
  const selectedDate = days[dayIndex]

  const addons = (fnb.addons || []).filter((item) => addonNames.includes(item.name))
  const addonTotal = addons.reduce(
    (sum, item) => sum + item.price * (item.per === 'orang' ? guests : 1),
    0,
  )
  const deposit = guests * (fnb.depositPerPerson || 0)
  const belowMinSpend = (area.minSpend || 0) > 0 && deposit < area.minSpend

  const submit = () => {
    setSuccess({
      code: code('RSV'),
      rows: [
        { label: 'Area', value: `${area.name} • ${guests} tamu` },
        { label: 'Tanggal', value: fullDateLabel(localISO(selectedDate)) },
        { label: 'Jam', value: time },
        ...(addons.length ? [{ label: 'Pre-order', value: addons.map((item) => item.name).join(', ') }] : []),
        { label: 'Deposit', value: formatIDR(deposit) },
        ...(area.minSpend ? [{ label: 'Minimum spend', value: formatIDR(area.minSpend) }] : []),
      ],
    })
  }

  if (success) {
    return (
      <div className="rounded-2xl border border-black/[0.08] bg-white p-4 @md:p-6">
        <SuccessPanel
          title="Reservasi terkonfirmasi"
          desc={`Meja di ${area.name} sudah diamankan. Deposit akan dikurangkan dari total bill saat Anda datang.`}
          code={success.code}
          rows={success.rows}
          templateName={template.name}
          note={`Konfirmasi & pengingat dikirim ke WhatsApp. Untuk perubahan, hubungi ${brand.phone}.`}
          onReset={() => setSuccess(null)}
        />
      </div>
    )
  }

  return (
    <div className="overflow-hidden rounded-2xl border border-black/[0.08] bg-white shadow-[0_24px_70px_-45px_rgba(0,0,0,0.45)]">
      <div className="grid @xl:grid-cols-[1.4fr_1fr]">
        <div className="p-4 @md:p-6">
          <p className="text-[12px] font-bold" style={{ color: theme.ink }}>
            1. Pilih area
          </p>
          <div className="mt-2.5 grid gap-2 @sm:grid-cols-3">
            {fnb.areas.map((item) => {
              const active = item.id === areaId
              return (
                <button
                  key={item.id}
                  type="button"
                  onClick={() => setAreaId(item.id)}
                  className={cx(
                    'rounded-xl border p-2.5 text-left transition',
                    active ? 'shadow-sm' : 'border-black/10 hover:border-black/25',
                  )}
                  style={active ? { borderColor: theme.accent2, background: theme.tint } : undefined}
                >
                  <span className="flex items-center justify-between gap-1">
                    <span className="text-[11.5px] font-bold" style={{ color: theme.ink }}>
                      {item.name}
                    </span>
                    {active && <Check className="h-3 w-3" style={{ color: theme.accent2 }} strokeWidth={3} />}
                  </span>
                  <span className="mt-0.5 block text-[9.5px] text-black/45">{item.desc}</span>
                  <span className="mt-1 block text-[9.5px] font-semibold" style={{ color: theme.accent2 }}>
                    {item.minSpend > 0 ? `Min. ${formatIDR(item.minSpend)}` : 'Tanpa minimum'}
                  </span>
                </button>
              )
            })}
          </div>

          <div className="mt-5 flex flex-wrap items-end justify-between gap-3">
            <div>
              <p className="text-[12px] font-bold" style={{ color: theme.ink }}>
                2. Jumlah tamu
              </p>
              <div className="mt-2">
                <Stepper value={guests} onChange={setGuests} min={1} max={fnb.maxGuests || 12} suffix="org" />
              </div>
            </div>
            <div className="rounded-lg bg-black/[0.04] px-3 py-2">
              <p className="text-[9.5px] font-semibold uppercase tracking-wide text-black/45">Deposit / orang</p>
              <p className="text-[12.5px] font-extrabold" style={{ color: theme.ink }}>
                {formatIDR(fnb.depositPerPerson || 0)}
              </p>
            </div>
          </div>

          <div className="mt-5">
            <div className="flex items-center justify-between">
              <p className="text-[12px] font-bold" style={{ color: theme.ink }}>
                3. Tanggal
              </p>
              <span className="flex items-center gap-1 text-[10px] text-black/40">
                <CalendarDays className="h-3 w-3" />
                {monthLabel(selectedDate)} {selectedDate.getFullYear()}
              </span>
            </div>
            <div className="mt-2 grid grid-cols-4 gap-1.5 @sm:grid-cols-7">
              {days.map((date, index) => {
                const active = index === dayIndex
                return (
                  <button
                    key={index}
                    type="button"
                    onClick={() => setDayIndex(index)}
                    className={cx(
                      'rounded-lg border py-2 text-center transition',
                      active ? 'border-transparent' : 'border-black/10 hover:border-black/25',
                    )}
                    style={active ? { background: theme.ink, color: '#fff' } : { color: theme.ink }}
                  >
                    <span className="block text-[9px] uppercase opacity-60">{shortDayLabel(date)}</span>
                    <span className="block text-[13px] font-extrabold leading-tight">{dayNumber(date)}</span>
                  </button>
                )
              })}
            </div>
          </div>

          <div className="mt-5">
            <p className="text-[12px] font-bold" style={{ color: theme.ink }}>
              4. Jam kedatangan
            </p>
            <div className="mt-2 grid grid-cols-4 gap-1.5">
              {fnb.times.map((slot) => {
                const active = slot === time
                return (
                  <button
                    key={slot}
                    type="button"
                    onClick={() => setTime(slot)}
                    className={cx(
                      'rounded-lg border py-2 text-[11px] font-bold transition',
                      active ? 'border-transparent' : 'border-black/10 hover:border-black/30',
                    )}
                    style={active ? { background: theme.accent, color: theme.ink } : { color: theme.ink }}
                  >
                    {slot}
                  </button>
                )
              })}
            </div>
          </div>

          {fnb.addons?.length > 0 && (
            <div className="mt-5">
              <p className="text-[12px] font-bold" style={{ color: theme.ink }}>
                Pre-order <span className="font-medium text-black/40">(opsional)</span>
              </p>
              <div className="mt-2 space-y-1.5">
                {fnb.addons.map((item) => {
                  const active = addonNames.includes(item.name)
                  return (
                    <button
                      key={item.name}
                      type="button"
                      onClick={() =>
                        setAddonNames((current) =>
                          current.includes(item.name)
                            ? current.filter((name) => name !== item.name)
                            : [...current, item.name],
                        )
                      }
                      className={cx(
                        'flex w-full items-center justify-between gap-3 rounded-lg border px-3 py-2 text-left transition',
                        active ? 'border-transparent' : 'border-black/10 hover:border-black/25',
                      )}
                      style={active ? { background: theme.tint, borderColor: theme.accent2 } : undefined}
                    >
                      <span className="min-w-0">
                        <span className="block text-[11px] font-semibold" style={{ color: theme.ink }}>
                          {item.name}
                        </span>
                        <span className="block text-[9.5px] text-black/45">
                          {formatIDR(item.price)} / {item.per}
                        </span>
                      </span>
                      <span
                        className={cx(
                          'grid h-4 w-4 shrink-0 place-items-center rounded border',
                          active ? 'border-transparent' : 'border-black/20',
                        )}
                        style={active ? { background: theme.accent2, color: '#fff' } : undefined}
                      >
                        {active && <Check className="h-2.5 w-2.5" strokeWidth={4} />}
                      </span>
                    </button>
                  )
                })}
              </div>
            </div>
          )}
        </div>

        <div className="flex flex-col bg-[var(--ink)] p-4 text-white @md:p-6">
          <p className="text-[10px] font-bold uppercase tracking-[0.18em] text-white/45">Ringkasan reservasi</p>

          <div className="mt-3 space-y-2 text-[11.5px]">
            <div className="flex justify-between gap-3">
              <span className="text-white/55">Area</span>
              <span className="font-semibold">{area.name}</span>
            </div>
            <div className="flex justify-between gap-3">
              <span className="text-white/55">Tamu</span>
              <span className="font-semibold">{guests} orang</span>
            </div>
            <div className="flex justify-between gap-3">
              <span className="text-white/55">Tanggal</span>
              <span className="text-right font-semibold">{fullDateLabel(localISO(selectedDate))}</span>
            </div>
            <div className="flex justify-between gap-3">
              <span className="text-white/55">Jam</span>
              <span className="font-semibold">{time}</span>
            </div>
          </div>

          <div className="my-3 border-t border-white/12" />

          <div className="space-y-1.5 text-[11.5px]">
            {addons.length === 0 && <p className="text-[10.5px] text-white/40">Belum ada pre-order.</p>}
            {addons.map((item) => (
              <div key={item.name} className="flex justify-between gap-3">
                <span className="min-w-0 truncate text-white/55">
                  {item.name}
                  {item.per === 'orang' ? ` ×${guests}` : ''}
                </span>
                <span className="shrink-0 font-semibold tabular-nums">
                  {formatIDR(item.price * (item.per === 'orang' ? guests : 1))}
                </span>
              </div>
            ))}
          </div>

          <div className="mt-3 rounded-xl bg-white/[0.06] p-3">
            <div className="flex items-baseline justify-between">
              <span className="flex items-center gap-1 text-[10.5px] font-semibold" style={{ color: theme.accent }}>
                <QrCode className="h-3 w-3" /> Deposit {guests} × {formatIDR(fnb.depositPerPerson || 0)}
              </span>
              <span className="text-[15px] font-extrabold tabular-nums" style={{ color: theme.accent }}>
                {formatIDR(deposit)}
              </span>
            </div>
            {addonTotal > 0 && (
              <div className="mt-1.5 flex justify-between text-[10.5px] text-white/55">
                <span>Pre-order dibayar di resto</span>
                <span className="tabular-nums">{formatIDR(addonTotal)}</span>
              </div>
            )}
          </div>

          {belowMinSpend && (
            <p className="mt-2 rounded-lg bg-amber-400/10 px-2.5 py-2 text-[9.5px] leading-relaxed text-amber-200/90">
              Area {area.name} memiliki minimum spend {formatIDR(area.minSpend)}. Deposit Anda
              dikurangkan dari bill, kekurangannya dibayar di lokasi.
            </p>
          )}

          <PvButton variant="accent" size="md" onClick={submit} className="mt-3 w-full">
            <CreditCard className="h-3.5 w-3.5" />
            {fnb.cta || 'Reservasi sekarang'}
          </PvButton>
          <p className="mt-2 flex items-center justify-center gap-1 text-center text-[9px] text-white/40">
            <Clock className="h-2.5 w-2.5" />
            Pembatalan gratis hingga 4 jam sebelum jadwal
          </p>
        </div>
      </div>
    </div>
  )
}

export function CateringCalculator({ template }) {
  const { fnb, theme, brand } = template
  const [packageId, setPackageId] = useState(fnb.packages[0].id)
  const [pax, setPax] = useState(fnb.defaultPax || 50)
  const [addonNames, setAddonNames] = useState([])
  const [date, setDate] = useState(localISO(addDays(new Date(), 3)))
  const [deliveryWindow, setDeliveryWindow] = useState(fnb.deliveryWindows?.[0] || '09.00 – 11.00')
  const [success, setSuccess] = useState(null)

  const pkg = fnb.packages.find((item) => item.id === packageId) || fnb.packages[0]
  const addons = (fnb.addons || []).filter((item) => addonNames.includes(item.name))
  const perPaxAddons = addons.filter((item) => item.per === 'pax').reduce((sum, item) => sum + item.price, 0)
  const orderAddons = addons.filter((item) => item.per === 'order').reduce((sum, item) => sum + item.price, 0)

  const subtotal = pax * (pkg.pricePerPax + perPaxAddons) + orderAddons
  const tier = [...(fnb.discountTiers || [])].reverse().find((item) => pax >= item.minPax)
  const discount = tier ? Math.round((subtotal * tier.pct) / 100) : 0
  const total = subtotal - discount
  const dp = Math.round(total * 0.5)

  const selectPackage = (nextId) => {
    const next = fnb.packages.find((item) => item.id === nextId)
    setPackageId(nextId)
    if (next && pax < next.minPax) setPax(next.minPax)
  }

  const submit = () => {
    setSuccess({
      code: code('CTR'),
      rows: [
        { label: 'Paket', value: `${pkg.name} • ${pax} pax` },
        { label: 'Pengiriman', value: `${fullDateLabel(date)}, ${deliveryWindow}` },
        ...(addons.length ? [{ label: 'Tambahan', value: addons.map((item) => item.name).join(', ') }] : []),
        { label: 'Subtotal', value: formatIDR(subtotal) },
        ...(discount ? [{ label: `Diskon ${tier.pct}%`, value: `− ${formatIDR(discount)}` }] : []),
        { label: 'Total', value: formatIDR(total) },
        { label: 'DP 50%', value: formatIDR(dp) },
      ],
    })
  }

  if (success) {
    return (
      <div className="rounded-2xl border border-black/[0.08] bg-white p-4 @md:p-6">
        <SuccessPanel
          title="Pesanan diteruskan ke dapur"
          desc={`Dapur ${brand.name} akan menghubungi Anda untuk konfirmasi menu dan alamat pengiriman.`}
          code={success.code}
          rows={success.rows}
          templateName={template.name}
          note="Perubahan menu paling lambat H-2. Pembayaran DP 50% via QRIS/transfer."
          onReset={() => setSuccess(null)}
        />
      </div>
    )
  }

  return (
    <div className="overflow-hidden rounded-2xl border border-black/[0.08] bg-white shadow-[0_24px_70px_-45px_rgba(0,0,0,0.45)]">
      <div className="grid @xl:grid-cols-[1.45fr_1fr]">
        <div className="p-4 @md:p-6">
          <p className="text-[12px] font-bold" style={{ color: theme.ink }}>
            1. Pilih paket
          </p>
          <div className="mt-2.5 grid gap-2 @sm:grid-cols-2">
            {fnb.packages.map((item) => {
              const active = item.id === packageId
              return (
                <button
                  key={item.id}
                  type="button"
                  onClick={() => selectPackage(item.id)}
                  className={cx(
                    'rounded-xl border p-2.5 text-left transition',
                    active ? 'shadow-sm' : 'border-black/10 hover:border-black/25',
                  )}
                  style={active ? { borderColor: theme.accent2, background: theme.tint } : undefined}
                >
                  <span className="flex items-start justify-between gap-1">
                    <span className="text-[11.5px] font-bold" style={{ color: theme.ink }}>
                      {item.name}
                    </span>
                    {item.tag && (
                      <span
                        className="shrink-0 rounded-full px-1.5 py-0.5 text-[8px] font-bold"
                        style={{ background: theme.accent, color: theme.ink }}
                      >
                        {item.tag}
                      </span>
                    )}
                  </span>
                  <span className="mt-0.5 block text-[9.5px] leading-snug text-black/45">{item.desc}</span>
                  <span className="mt-1.5 flex items-baseline gap-1">
                    <span className="text-[12px] font-extrabold" style={{ color: theme.accent2 }}>
                      {formatIDR(item.pricePerPax)}
                    </span>
                    <span className="text-[9px] text-black/40">/pax • min {item.minPax}</span>
                  </span>
                </button>
              )
            })}
          </div>

          <div className="mt-5">
            <div className="flex items-end justify-between gap-3">
              <div>
                <p className="text-[12px] font-bold" style={{ color: theme.ink }}>
                  2. Jumlah porsi
                </p>
                <p className="mt-0.5 text-[10px] text-black/45">
                  Minimum {pkg.minPax} pax • maksimum {fnb.maxPax} pax
                </p>
              </div>
              <Stepper value={pax} onChange={setPax} min={pkg.minPax} max={fnb.maxPax} suffix="pax" />
            </div>
            <input
              type="range"
              min={pkg.minPax}
              max={fnb.maxPax}
              step={5}
              value={pax}
              onChange={(event) => setPax(Number(event.target.value))}
              className="pv-range mt-3 w-full"
              style={{ accentColor: theme.accent2 }}
              aria-label="Jumlah pax"
            />
            <div className="mt-3 flex flex-wrap gap-1.5">
              {(fnb.discountTiers || []).map((item) => {
                const active = pax >= item.minPax
                return (
                  <span
                    key={item.label}
                    className="inline-flex items-center gap-1 rounded-full px-2 py-1 text-[9px] font-bold"
                    style={
                      active
                        ? { background: theme.accent, color: theme.ink }
                        : { background: 'rgba(0,0,0,0.04)', color: 'rgba(0,0,0,0.45)' }
                    }
                  >
                    {active ? <Check className="h-2.5 w-2.5" strokeWidth={4} /> : null}
                    {item.label} • hemat {item.pct}%
                  </span>
                )
              })}
            </div>
          </div>

          <div className="mt-5 grid gap-2.5 @sm:grid-cols-2">
            <Field label="Tanggal kirim">
              <input
                type="date"
                value={date}
                min={localISO(new Date())}
                onChange={(event) => setDate(event.target.value)}
                className={fieldClass}
              />
            </Field>
            <Field label="Jam kirim">
              <select
                value={deliveryWindow}
                onChange={(event) => setDeliveryWindow(event.target.value)}
                className={fieldClass}
              >
                {(fnb.deliveryWindows || []).map((item) => (
                  <option key={item} value={item}>
                    {item}
                  </option>
                ))}
              </select>
            </Field>
          </div>

          <div className="mt-5">
            <p className="text-[12px] font-bold" style={{ color: theme.ink }}>
              3. Tambahan <span className="font-medium text-black/40">(opsional)</span>
            </p>
            <div className="mt-2 grid gap-1.5 @sm:grid-cols-2">
              {fnb.addons.map((item) => {
                const active = addonNames.includes(item.name)
                return (
                  <button
                    key={item.name}
                    type="button"
                    onClick={() =>
                      setAddonNames((current) =>
                        current.includes(item.name)
                          ? current.filter((name) => name !== item.name)
                          : [...current, item.name],
                      )
                    }
                    className={cx(
                      'flex items-center justify-between gap-2 rounded-lg border px-2.5 py-2 text-left transition',
                      active ? 'border-transparent' : 'border-black/10 hover:border-black/25',
                    )}
                    style={active ? { background: theme.tint, borderColor: theme.accent2 } : undefined}
                  >
                    <span className="min-w-0">
                      <span className="block truncate text-[10.5px] font-semibold" style={{ color: theme.ink }}>
                        {item.name}
                      </span>
                      <span className="block text-[9px] text-black/45">
                        {formatIDR(item.price)}/{item.per === 'pax' ? 'pax' : 'order'}
                      </span>
                    </span>
                    <span
                      className={cx(
                        'grid h-4 w-4 shrink-0 place-items-center rounded border',
                        active ? 'border-transparent' : 'border-black/20',
                      )}
                      style={active ? { background: theme.accent2, color: '#fff' } : undefined}
                    >
                      {active && <Check className="h-2.5 w-2.5" strokeWidth={4} />}
                    </span>
                  </button>
                )
              })}
            </div>
          </div>
        </div>

        <div className="flex flex-col bg-[var(--ink)] p-4 text-white @md:p-6">
          <div className="flex items-center justify-between">
            <p className="text-[10px] font-bold uppercase tracking-[0.18em] text-white/45">Estimasi biaya</p>
            <span className="flex items-center gap-1 rounded-full bg-white/10 px-2 py-0.5 text-[9px] font-bold">
              <Users className="h-2.5 w-2.5" /> {pax} pax
            </span>
          </div>

          <div className="mt-3 space-y-2 text-[11.5px]">
            <div className="flex justify-between gap-3">
              <span className="min-w-0 truncate text-white/55">{pkg.name} × {pax}</span>
              <span className="shrink-0 font-semibold tabular-nums">{formatIDR(pkg.pricePerPax * pax)}</span>
            </div>
            {perPaxAddons > 0 && (
              <div className="flex justify-between gap-3">
                <span className="text-white/55">Tambahan per pax</span>
                <span className="font-semibold tabular-nums">{formatIDR(perPaxAddons * pax)}</span>
              </div>
            )}
            {orderAddons > 0 && (
              <div className="flex justify-between gap-3">
                <span className="text-white/55">Tambahan per order</span>
                <span className="font-semibold tabular-nums">{formatIDR(orderAddons)}</span>
              </div>
            )}
            {discount > 0 && (
              <div className="flex justify-between gap-3" style={{ color: theme.accent }}>
                <span>Diskon {tier.pct}% ({tier.label})</span>
                <span className="font-semibold tabular-nums">− {formatIDR(discount)}</span>
              </div>
            )}
          </div>

          <div className="my-3 border-t border-white/12" />

          <div className="space-y-1.5 text-[11.5px] text-white/55">
            <div className="flex items-center gap-2">
              <CalendarDays className="h-3 w-3" />
              {date ? fullDateLabel(date) : 'Pilih tanggal'}
            </div>
            <div className="flex items-center gap-2">
              <Truck className="h-3 w-3" />
              {deliveryWindow}
            </div>
          </div>

          <div className="mt-auto pt-4">
            <div className="rounded-xl bg-white/[0.06] p-3">
              <div className="flex items-baseline justify-between">
                <span className="text-[10.5px] text-white/55">Total estimasi</span>
                <span className="text-[17px] font-extrabold tabular-nums">{formatIDR(total)}</span>
              </div>
              <div className="mt-1.5 flex items-baseline justify-between">
                <span className="flex items-center gap-1 text-[10.5px] font-semibold" style={{ color: theme.accent }}>
                  <QrCode className="h-3 w-3" /> DP 50% untuk konfirmasi
                </span>
                <span className="text-[12.5px] font-extrabold tabular-nums" style={{ color: theme.accent }}>
                  {formatIDR(dp)}
                </span>
              </div>
            </div>

            <PvButton variant="accent" size="md" onClick={submit} className="mt-3 w-full">
              <CreditCard className="h-3.5 w-3.5" />
              {fnb.cta || 'Kirim pesanan'}
            </PvButton>
            <p className="mt-2 text-center text-[9px] leading-relaxed text-white/40">
              Harga sudah termasuk kemasan food grade &amp; alat makan
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}
