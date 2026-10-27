import { useMemo, useRef, useState } from 'react'
import { CalendarDays, Check, CheckCircle2, Clock, CreditCard, QrCode, Upload } from '../../../lib/icons'
import { addDays, formatIDR, fullDateLabel, localISO, shortDayLabel, dayNumber, monthLabel } from '../../../lib/format'
import { Field, PvButton, Stepper, SuccessPanel, cx, fieldClass } from '../ui'

function code(prefix) {
  return `${prefix}-${Math.random().toString(36).slice(2, 7).toUpperCase()}`
}

export default function ServiceBooking({ template }) {
  const { service, theme, brand } = template
  const isQuantity = service.mode === 'quantity'
  const [packageId, setPackageId] = useState(service.packages[0].id)
  const [extraIds, setExtraIds] = useState([])
  const [dayIndex, setDayIndex] = useState(0)
  const [time, setTime] = useState(service.times?.[0] || null)
  const [qty, setQty] = useState(service.quantity?.default || service.quantity?.min || 12)
  const [days, setDays] = useState(service.duration?.default || 1)
  const [fields, setFields] = useState({})
  const [files, setFiles] = useState({})
  const [error, setError] = useState('')
  const [success, setSuccess] = useState(null)
  const fileInputs = useRef({})

  const pkg = service.packages.find((item) => item.id === packageId) || service.packages[0]
  const dateOptions = useMemo(() => Array.from({ length: 7 }, (_, index) => addDays(new Date(), index)), [])
  const selectedDate = dateOptions[dayIndex]

  const tier = isQuantity
    ? [...(service.quantity.tiers || [])].reverse().find((item) => qty >= item.min)
    : null
  const unitPrice = isQuantity ? Math.round((pkg.price * (tier?.multiplier || 1)) / 500) * 500 : pkg.price

  const extras = (service.extras || []).filter((item) => extraIds.includes(item.id))
  const extrasTotal = extras.reduce((sum, item) => {
    if (item.per === 'pcs') return sum + item.price * qty
    if (item.per === 'hari') return sum + item.price * days
    return sum + item.price
  }, 0)

  const base = isQuantity ? unitPrice * qty : pkg.price * days
  const total = base + extrasTotal
  const deposit = Math.round((total * (service.depositPct || 0)) / 100)

  const submit = () => {
    const required = (service.fields || []).filter((item) => !fields[item.id]?.trim())
    if (required.length > 0) {
      setError(`Lengkapi ${required[0].label.toLowerCase()} terlebih dahulu.`)
      return
    }
    if (!isQuantity && !time) {
      setError('Pilih jam kedatangan terlebih dahulu.')
      return
    }
    setError('')
    setSuccess({
      code: code(isQuantity ? 'PRD' : 'BKG'),
      rows: [
        { label: 'Layanan', value: pkg.name },
        ...(isQuantity
          ? [{ label: 'Jumlah', value: `${qty} ${service.quantity.unit}` }]
          : [
              { label: 'Tanggal', value: fullDateLabel(localISO(selectedDate)) },
              { label: 'Jam', value: time },
            ]),
        ...(service.duration ? [{ label: service.duration.label, value: `${days} ${service.duration.unit}` }] : []),
        ...extras.map((item) => ({ label: item.name, value: formatIDR(item.price) })),
        ...(Object.keys(files).length
          ? [{ label: 'Berkas', value: Object.values(files).join(', ') }]
          : []),
        { label: 'Total', value: formatIDR(total) },
        ...(deposit ? [{ label: `DP ${service.depositPct}%`, value: formatIDR(deposit) }] : []),
      ],
    })
  }

  if (success) {
    return (
      <div className="rounded-2xl border border-black/[0.08] bg-white p-4 @md:p-6">
        <SuccessPanel
          title={isQuantity ? 'Pesanan masuk ke produksi' : 'Jadwal berhasil dibooking'}
          desc={
            isQuantity
              ? `Tim ${brand.name} akan memeriksa file desain dan mengirim proof maksimal 1×24 jam.`
              : `Kami menahan slot untuk Anda. Konfirmasi dan pengingat dikirim ke WhatsApp ${brand.phone}.`
          }
          code={success.code}
          rows={success.rows}
          templateName={template.name}
          note={isQuantity ? 'Produksi dimulai setelah DP dan proof disetujui.' : 'Datang 10 menit lebih awal agar antrean tetap lancar.'}
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
            1. Pilih {isQuantity ? 'bahan & item' : 'paket layanan'}
          </p>
          <div className="mt-2.5 grid gap-2 @sm:grid-cols-2">
            {service.packages.map((item) => {
              const active = item.id === packageId
              return (
                <button
                  key={item.id}
                  type="button"
                  onClick={() => setPackageId(item.id)}
                  className={cx(
                    'rounded-xl border p-2.5 text-left transition',
                    active ? 'shadow-sm' : 'border-black/10 hover:border-black/25',
                  )}
                  style={active ? { borderColor: theme.accent2, background: theme.tint } : undefined}
                >
                  <span className="flex items-start justify-between gap-1">
                    <span className="text-[11.5px] font-bold leading-tight" style={{ color: theme.ink }}>
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
                  <span className="mt-1 flex items-baseline justify-between">
                    <span className="text-[11px] font-extrabold" style={{ color: theme.accent2 }}>
                      {formatIDR(item.price)}
                    </span>
                    <span className="text-[8.5px] text-black/40">{item.duration}</span>
                  </span>
                </button>
              )
            })}
          </div>

          {isQuantity ? (
            <div className="mt-5">
              <div className="flex items-end justify-between gap-3">
                <div>
                  <p className="text-[12px] font-bold" style={{ color: theme.ink }}>
                    2. {service.quantity.label}
                  </p>
                  <p className="mt-0.5 text-[10px] text-black/45">
                    Min. {service.quantity.min} {service.quantity.unit} • harga per pcs turun otomatis
                  </p>
                </div>
                <Stepper
                  value={qty}
                  onChange={setQty}
                  min={service.quantity.min}
                  max={service.quantity.max}
                  suffix={service.quantity.unit}
                />
              </div>
              <div className="mt-2.5 flex flex-wrap gap-1.5">
                {service.quantity.tiers.map((item) => {
                  const active = qty >= item.min
                  return (
                    <span
                      key={item.min}
                      className="inline-flex items-center gap-1 rounded-full px-2 py-1 text-[9px] font-bold"
                      style={
                        active
                          ? { background: theme.accent, color: theme.ink }
                          : { background: 'rgba(0,0,0,0.04)', color: 'rgba(0,0,0,0.45)' }
                      }
                    >
                      {active && <Check className="h-2.5 w-2.5" strokeWidth={4} />}
                      {item.label} · {item.min}+
                    </span>
                  )
                })}
              </div>
            </div>
          ) : (
            <>
              <div className="mt-5">
                <div className="flex items-center justify-between">
                  <p className="text-[12px] font-bold" style={{ color: theme.ink }}>
                    2. Tanggal kedatangan
                  </p>
                  <span className="flex items-center gap-1 text-[10px] text-black/40">
                    <CalendarDays className="h-3 w-3" />
                    {monthLabel(selectedDate)} {selectedDate.getFullYear()}
                  </span>
                </div>
                <div className="mt-2 grid grid-cols-4 gap-1.5 @sm:grid-cols-7">
                  {dateOptions.map((date, index) => {
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

              <div className="mt-4">
                <p className="text-[12px] font-bold" style={{ color: theme.ink }}>
                  3. Jam
                </p>
                <div className="mt-2 grid grid-cols-4 gap-1.5">
                  {(service.times || []).map((slot) => {
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

              {service.duration && (
                <div className="mt-4 flex items-center justify-between rounded-lg border border-black/10 px-3 py-2">
                  <div>
                    <p className="text-[11px] font-bold" style={{ color: theme.ink }}>
                      {service.duration.label}
                    </p>
                    <p className="text-[9.5px] text-black/45">
                      {formatIDR(pkg.price)} / {service.duration.unit} • maks. {service.duration.max}
                    </p>
                  </div>
                  <Stepper
                    value={days}
                    onChange={setDays}
                    min={service.duration.min}
                    max={service.duration.max}
                    suffix={service.duration.unit}
                  />
                </div>
              )}
            </>
          )}

          {service.extras?.length > 0 && (
            <div className="mt-4">
              <p className="text-[12px] font-bold" style={{ color: theme.ink }}>
                {isQuantity ? '3' : '4'}. Tambahan <span className="font-medium text-black/40">(opsional)</span>
              </p>
              <div className="mt-2 grid gap-1.5 @sm:grid-cols-2">
                {service.extras.map((item) => {
                  const active = extraIds.includes(item.id)
                  return (
                    <button
                      key={item.id}
                      type="button"
                      onClick={() =>
                        setExtraIds((current) =>
                          current.includes(item.id)
                            ? current.filter((id) => id !== item.id)
                            : [...current, item.id],
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
                          {formatIDR(item.price)}/{item.per}
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

          <div className="mt-4 grid gap-2.5 @sm:grid-cols-2">
            {service.fields.map((item) => (
              <Field key={item.id} label={item.label} className={item.type === 'textarea' ? '@sm:col-span-2' : ''}>
                {item.type === 'textarea' ? (
                  <textarea
                    rows={2}
                    value={fields[item.id] || ''}
                    onChange={(event) => setFields((current) => ({ ...current, [item.id]: event.target.value }))}
                    placeholder={item.placeholder}
                    className={cx(fieldClass, '!text-[11px] resize-none')}
                  />
                ) : item.type === 'select' ? (
                  <select
                    value={fields[item.id] || ''}
                    onChange={(event) => setFields((current) => ({ ...current, [item.id]: event.target.value }))}
                    className={cx(fieldClass, '!py-2 !text-[11px]')}
                  >
                    <option value="">Pilih…</option>
                    {item.options.map((option) => (
                      <option key={option} value={option}>
                        {option}
                      </option>
                    ))}
                  </select>
                ) : (
                  <input
                    value={fields[item.id] || ''}
                    onChange={(event) => setFields((current) => ({ ...current, [item.id]: event.target.value }))}
                    placeholder={item.placeholder}
                    className={cx(fieldClass, '!py-2 !text-[11px]')}
                  />
                )}
              </Field>
            ))}
          </div>

          {service.uploads?.length > 0 && (
            <div className="mt-3 grid gap-2 @sm:grid-cols-2">
              {service.uploads.map((upload) => (
                <div key={upload.id}>
                  <input
                    ref={(element) => {
                      fileInputs.current[upload.id] = element
                    }}
                    type="file"
                    className="hidden"
                    onChange={(event) => {
                      const file = event.target.files?.[0]
                      setFiles((current) => ({ ...current, [upload.id]: file ? file.name : '' }))
                    }}
                  />
                  <button
                    type="button"
                    onClick={() => fileInputs.current[upload.id]?.click()}
                    className={cx(
                      'flex w-full items-center gap-2 rounded-lg border border-dashed px-2.5 py-2.5 text-left transition',
                      files[upload.id] ? 'border-solid' : 'border-black/20 hover:border-black/40',
                    )}
                    style={files[upload.id] ? { background: theme.tint, borderColor: theme.accent2 } : undefined}
                  >
                    {files[upload.id] ? (
                      <CheckCircle2 className="h-4 w-4 shrink-0" style={{ color: theme.accent2 }} />
                    ) : (
                      <Upload className="h-4 w-4 shrink-0 text-black/35" />
                    )}
                    <span className="min-w-0">
                      <span className="block truncate text-[10px] font-semibold" style={{ color: theme.ink }}>
                        {files[upload.id] || upload.label}
                      </span>
                      <span className="block text-[8.5px] text-black/40">{upload.hint}</span>
                    </span>
                  </button>
                </div>
              ))}
            </div>
          )}
        </div>

        <div className="flex flex-col bg-[var(--ink)] p-4 text-white @md:p-6">
          <p className="text-[10px] font-bold uppercase tracking-[0.18em] text-white/45">Ringkasan</p>

          <div className="mt-3 space-y-2 text-[11.5px]">
            <div className="flex justify-between gap-3">
              <span className="text-white/55">Layanan</span>
              <span className="text-right font-semibold">{pkg.name}</span>
            </div>
            {isQuantity ? (
              <div className="flex justify-between gap-3">
                <span className="text-white/55">Jumlah</span>
                <span className="font-semibold">
                  {qty} {service.quantity.unit}
                </span>
              </div>
            ) : (
              <>
                <div className="flex justify-between gap-3">
                  <span className="text-white/55">Tanggal</span>
                  <span className="text-right font-semibold">{fullDateLabel(localISO(selectedDate))}</span>
                </div>
                <div className="flex justify-between gap-3">
                  <span className="text-white/55">Jam</span>
                  <span className="font-semibold">{time || '—'}</span>
                </div>
              </>
            )}
            {service.duration && (
              <div className="flex justify-between gap-3">
                <span className="text-white/55">{service.duration.label}</span>
                <span className="font-semibold">
                  {days} {service.duration.unit}
                </span>
              </div>
            )}
          </div>

          <div className="my-3 border-t border-white/12" />

          <div className="space-y-1.5 text-[11.5px]">
            <div className="flex justify-between gap-3">
              <span className="text-white/55">
                {isQuantity ? `${qty} × ${formatIDR(unitPrice)}` : `${days} × ${formatIDR(pkg.price)}`}
              </span>
              <span className="font-semibold tabular-nums">{formatIDR(base)}</span>
            </div>
            {extras.map((item) => (
              <div key={item.id} className="flex justify-between gap-3">
                <span className="min-w-0 truncate text-white/55">
                  {item.name}
                  {item.per === 'pcs' ? ` ×${qty}` : item.per === 'hari' ? ` ×${days}` : ''}
                </span>
                <span className="shrink-0 font-semibold tabular-nums">
                  {formatIDR(
                    item.per === 'pcs' ? item.price * qty : item.per === 'hari' ? item.price * days : item.price,
                  )}
                </span>
              </div>
            ))}
            {tier && (
              <div className="flex justify-between gap-3" style={{ color: theme.accent }}>
                <span>{tier.label}</span>
                <span className="font-semibold">aktif</span>
              </div>
            )}
          </div>

          <div className="mt-auto pt-4">
            <div className="rounded-xl bg-white/[0.06] p-3">
              <div className="flex items-baseline justify-between">
                <span className="text-[10.5px] text-white/55">Total</span>
                <span className="text-[17px] font-extrabold tabular-nums">{formatIDR(total)}</span>
              </div>
              {deposit > 0 && (
                <div className="mt-1.5 flex items-baseline justify-between">
                  <span className="flex items-center gap-1 text-[10.5px] font-semibold" style={{ color: theme.accent }}>
                    <QrCode className="h-3 w-3" /> DP {service.depositPct}%
                  </span>
                  <span className="text-[12.5px] font-extrabold tabular-nums" style={{ color: theme.accent }}>
                    {formatIDR(deposit)}
                  </span>
                </div>
              )}
            </div>

            {error && <p className="mt-2 text-[9.5px] font-semibold text-rose-300">{error}</p>}

            <PvButton variant="accent" size="md" onClick={submit} className="mt-3 w-full">
              <CreditCard className="h-3.5 w-3.5" />
              {service.cta || 'Konfirmasi'}
            </PvButton>
            <p className="mt-2 flex items-center justify-center gap-1 text-center text-[9px] text-white/40">
              <Clock className="h-2.5 w-2.5" />
              {isQuantity ? 'Proof desain sebelum produksi' : 'Konfirmasi instan via WhatsApp'}
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}

export function TrackingTimeline({ template }) {
  const { service, theme } = template
  if (!service.tracking) return null

  return (
    <div className="mt-4 rounded-2xl border border-black/[0.08] bg-white p-4 @md:p-5">
      <div className="flex items-center justify-between">
        <p className="text-[12px] font-extrabold" style={{ color: theme.ink }}>
          Live tracking produksi
        </p>
        <span className="rounded-full px-2 py-0.5 text-[9px] font-bold" style={{ background: theme.tint, color: theme.accent2 }}>
          Contoh order #PRD-8841
        </span>
      </div>
      <div className="mt-4 grid gap-3 @md:grid-cols-4">
        {service.tracking.map((step, index) => {
          const done = step.state === 'done'
          const active = step.state === 'active'
          return (
            <div key={step.label} className="relative">
              <div className="flex items-center gap-2">
                <span
                  className="grid h-6 w-6 shrink-0 place-items-center rounded-full text-[9px] font-black"
                  style={
                    done
                      ? { background: theme.accent2, color: '#fff' }
                      : active
                        ? { background: theme.accent, color: theme.ink, boxShadow: `0 0 0 4px ${theme.accent}33` }
                        : { background: 'rgba(0,0,0,0.06)', color: 'rgba(0,0,0,0.35)' }
                  }
                >
                  {done ? <Check className="h-3 w-3" strokeWidth={4} /> : index + 1}
                </span>
                {index < service.tracking.length - 1 && (
                  <span className="hidden h-px flex-1 @md:block" style={{ background: done ? theme.accent2 : 'rgba(0,0,0,0.1)' }} />
                )}
              </div>
              <p className="mt-2 text-[10.5px] font-bold" style={{ color: done || active ? theme.ink : 'rgba(0,0,0,0.4)' }}>
                {step.label}
              </p>
              <p className="mt-0.5 text-[9px] leading-snug text-black/45">{step.desc}</p>
            </div>
          )
        })}
      </div>
    </div>
  )
}
