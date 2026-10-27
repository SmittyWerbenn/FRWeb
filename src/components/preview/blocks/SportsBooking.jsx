import { useMemo, useState } from 'react'
import { Check, Clock, CreditCard, QrCode, Users, CalendarDays } from '../../../lib/icons'
import { addDays, formatIDR, fullDateLabel, localISO, shortDayLabel, dayNumber, monthLabel } from '../../../lib/format'
import { PvButton, Stepper, SuccessPanel, cx } from '../ui'

function randomCode(prefix = 'BK') {
  return `${prefix}-${Math.random().toString(36).slice(2, 7).toUpperCase()}`
}

export default function SportsBooking({ template }) {
  const { sports, theme, brand } = template
  const [resourceId, setResourceId] = useState(sports.resources[0].id)
  const [dayIndex, setDayIndex] = useState(0)
  const [time, setTime] = useState(null)
  const [players, setPlayers] = useState(4)
  const [addonIds, setAddonIds] = useState([])
  const [success, setSuccess] = useState(null)

  const resource = sports.resources.find((item) => item.id === resourceId) || sports.resources[0]
  const times = resource.times || sports.times || []
  const days = useMemo(() => Array.from({ length: 7 }, (_, index) => addDays(new Date(), index)), [])
  const selectedDate = days[dayIndex]

  const priceForTime = (slot) => {
    const base = resource.price
    const peak = sports.peakHours?.includes(slot.t) ? resource.peakPrice ?? base : base
    return peak + (slot.delta || 0)
  }

  const selectedSlot = times.find((slot) => slot.t === time)
  const slotPrice = selectedSlot ? priceForTime(selectedSlot) : 0
  const addons = (sports.addons || []).filter((item) => addonIds.includes(item.name))
  const addonTotal = addons.reduce(
    (sum, item) => sum + item.price * (item.per === 'orang' ? players : 1),
    0,
  )
  const total = slotPrice + addonTotal
  const deposit = Math.round((total * (sports.depositPct || 0)) / 100)

  const toggleAddon = (name) => {
    setAddonIds((current) =>
      current.includes(name) ? current.filter((item) => item !== name) : [...current, name],
    )
  }

  const submit = () => {
    if (!selectedSlot) return
    setSuccess({
      code: randomCode('BK'),
      rows: [
        { label: 'Unit', value: resource.name },
        { label: 'Tanggal', value: fullDateLabel(localISO(selectedDate)) },
        { label: 'Jam', value: `${selectedSlot.t} • ${resource.timeUnit || 'sesi'}` },
        { label: 'Pemain', value: `${players} orang` },
        ...(addons.length
          ? [{ label: 'Add-on', value: addons.map((item) => item.name).join(', ') }]
          : []),
        { label: 'Total', value: formatIDR(total) },
        { label: 'DP dibayar (QRIS)', value: formatIDR(deposit) },
        { label: 'Sisa di lokasi', value: formatIDR(total - deposit) },
      ],
    })
  }

  if (success) {
    return (
      <div className="rounded-2xl border border-black/[0.08] bg-white p-4 shadow-[0_20px_60px_-40px_rgba(0,0,0,0.4)] @md:p-6">
        <SuccessPanel
          title="Slot berhasil dikunci!"
          desc={`Pembayaran DP via QRIS terverifikasi. Invoice otomatis dikirim ke WhatsApp ${brand.phone}.`}
          code={success.code}
          rows={success.rows}
          templateName={template.name}
          note="Datang 10 menit sebelum jadwal. Tunjukkan kode booking di resepsionis."
          onReset={() => {
            setSuccess(null)
            setTime(null)
            setAddonIds([])
          }}
        />
      </div>
    )
  }

  return (
    <div className="overflow-hidden rounded-2xl border border-black/[0.08] bg-white shadow-[0_24px_70px_-45px_rgba(0,0,0,0.45)]">
      <div className="grid @xl:grid-cols-[1.45fr_1fr]">
        <div className="p-4 @md:p-6">
          <div>
            <div className="flex items-center gap-2">
              <span
                className="grid h-5 w-5 place-items-center rounded-full text-[10px] font-black"
                style={{ background: theme.ink, color: theme.accent }}
              >
                1
              </span>
              <p className="text-[12px] font-bold" style={{ color: theme.ink }}>
                {sports.resourceLabel || 'Pilih unit'}
              </p>
            </div>
            <div className="mt-2.5 grid gap-2 @sm:grid-cols-3">
              {sports.resources.map((item) => {
                const active = item.id === resourceId
                return (
                  <button
                    key={item.id}
                    type="button"
                    onClick={() => {
                      setResourceId(item.id)
                      setTime(null)
                    }}
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
                      {active && <Check className="h-3 w-3 shrink-0" style={{ color: theme.accent2 }} strokeWidth={3} />}
                    </span>
                    <span className="mt-1 block text-[9.5px] leading-snug text-black/45">{item.meta}</span>
                    <span className="mt-1 block text-[10.5px] font-extrabold" style={{ color: theme.accent2 }}>
                      {formatIDR(item.price)}
                      <span className="font-medium text-black/40"> /sesi</span>
                    </span>
                  </button>
                )
              })}
            </div>
          </div>

          <div className="mt-5">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <span
                  className="grid h-5 w-5 place-items-center rounded-full text-[10px] font-black"
                  style={{ background: theme.ink, color: theme.accent }}
                >
                  2
                </span>
                <p className="text-[12px] font-bold" style={{ color: theme.ink }}>
                  Pilih tanggal
                </p>
              </div>
              <span className="flex items-center gap-1 text-[10px] font-medium text-black/40">
                <CalendarDays className="h-3 w-3" />
                {monthLabel(selectedDate)} {selectedDate.getFullYear()}
              </span>
            </div>
            <div className="mt-2.5 grid grid-cols-4 gap-1.5 @sm:grid-cols-7">
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
                    style={active ? { background: theme.ink, color: '#FFFFFF' } : { color: theme.ink }}
                  >
                    <span className="block text-[9px] uppercase opacity-60">{shortDayLabel(date)}</span>
                    <span className="block text-[13px] font-extrabold leading-tight">{dayNumber(date)}</span>
                  </button>
                )
              })}
            </div>
          </div>

          <div className="mt-5">
            <div className="flex items-center gap-2">
              <span
                className="grid h-5 w-5 place-items-center rounded-full text-[10px] font-black"
                style={{ background: theme.ink, color: theme.accent }}
              >
                3
              </span>
              <p className="text-[12px] font-bold" style={{ color: theme.ink }}>
                Pilih jam
              </p>
              <span className="ml-auto flex items-center gap-1 rounded-full bg-black/[0.04] px-2 py-0.5 text-[9px] font-semibold text-black/50">
                <span className="h-1.5 w-1.5 rounded-full" style={{ background: theme.accent2 }} />
                diperbarui real-time
              </span>
            </div>
            <div className="mt-2.5 grid grid-cols-3 gap-1.5 @sm:grid-cols-4 @lg:grid-cols-6">
              {times.map((slot) => {
                const soldOut = slot.left === 0
                const active = slot.t === time
                return (
                  <button
                    key={slot.t}
                    type="button"
                    disabled={soldOut}
                    onClick={() => setTime(slot.t)}
                    className={cx(
                      'rounded-lg border px-1 py-2 text-center transition',
                      soldOut && 'cursor-not-allowed border-black/5 bg-black/[0.03] text-black/25 line-through',
                      !soldOut && !active && 'border-black/10 hover:border-black/30',
                      active && 'border-transparent',
                    )}
                    style={active ? { background: theme.accent, color: theme.ink, borderColor: theme.accent } : undefined}
                  >
                    <span className="block text-[11px] font-bold leading-tight">{slot.t}</span>
                    <span className="block text-[8.5px] opacity-60">
                      {soldOut ? 'penuh' : typeof slot.left === 'number' ? `sisa ${slot.left}` : 'tersedia'}
                    </span>
                  </button>
                )
              })}
            </div>
          </div>

          {sports.addons?.length > 0 && (
            <div className="mt-5">
              <div className="flex flex-wrap items-center justify-between gap-2">
                <p className="text-[12px] font-bold" style={{ color: theme.ink }}>
                  Tambahan <span className="font-medium text-black/40">(opsional)</span>
                </p>
                <div className="flex items-center gap-2">
                  <span className="flex items-center gap-1 text-[10px] text-black/45">
                    <Users className="h-3 w-3" /> Jumlah pemain
                  </span>
                  <Stepper value={players} onChange={setPlayers} min={2} max={20} suffix="org" />
                </div>
              </div>
              <div className="mt-2 grid gap-1.5 @sm:grid-cols-3">
                {sports.addons.map((item) => {
                  const active = addonIds.includes(item.name)
                  return (
                    <button
                      key={item.name}
                      type="button"
                      onClick={() => toggleAddon(item.name)}
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
        </div>

        <div className="relative flex flex-col bg-[var(--ink)] p-4 text-white @md:p-6">
          <div className="flex items-center justify-between gap-2">
            <p className="text-[10px] font-bold uppercase tracking-[0.18em] text-white/45">Ringkasan</p>
            <span className="flex items-center gap-1 rounded-full bg-white/10 px-2 py-0.5 text-[9px] font-bold">
              <span className="h-1.5 w-1.5 rounded-full bg-emerald-400" />
              LIVE
            </span>
          </div>

          <div className="mt-3 space-y-2 text-[11.5px]">
            <div className="flex items-start justify-between gap-3">
              <span className="text-white/55">Unit</span>
              <span className="text-right font-semibold">{resource.name}</span>
            </div>
            <div className="flex items-start justify-between gap-3">
              <span className="text-white/55">Tanggal</span>
              <span className="text-right font-semibold">
                {fullDateLabel(localISO(selectedDate))}
              </span>
            </div>
            <div className="flex items-start justify-between gap-3">
              <span className="text-white/55">Jam</span>
              <span className="text-right font-semibold">{time || '—'}</span>
            </div>
            <div className="flex items-start justify-between gap-3">
              <span className="text-white/55">Durasi</span>
              <span className="text-right font-semibold">{resource.duration || '60 menit'}</span>
            </div>
          </div>

          <div className="my-3 border-t border-white/12" />

          <div className="space-y-1.5 text-[11.5px]">
            <div className="flex justify-between gap-3">
              <span className="text-white/55">Sewa {time ? '' : '(pilih jam)'}</span>
              <span className="font-semibold tabular-nums">{time ? formatIDR(slotPrice) : '—'}</span>
            </div>
            {addons.map((item) => (
              <div key={item.name} className="flex justify-between gap-3">
                <span className="min-w-0 truncate text-white/55">
                  {item.name}
                  {item.per === 'orang' ? ` ×${players}` : ''}
                </span>
                <span className="shrink-0 font-semibold tabular-nums">
                  {formatIDR(item.price * (item.per === 'orang' ? players : 1))}
                </span>
              </div>
            ))}
          </div>

          <div className="mt-3 rounded-xl bg-white/[0.06] p-3">
            <div className="flex items-baseline justify-between">
              <span className="text-[10.5px] text-white/55">Total</span>
              <span className="text-[15px] font-extrabold tabular-nums">{formatIDR(total)}</span>
            </div>
            <div className="mt-1.5 flex items-baseline justify-between">
              <span className="flex items-center gap-1 text-[10.5px] font-semibold" style={{ color: theme.accent }}>
                <QrCode className="h-3 w-3" /> DP QRIS {sports.depositPct}%
              </span>
              <span className="text-[12.5px] font-extrabold tabular-nums" style={{ color: theme.accent }}>
                {formatIDR(deposit)}
              </span>
            </div>
          </div>

          <PvButton
            variant="accent"
            size="md"
            onClick={submit}
            disabled={!time}
            className="mt-3 w-full"
          >
            <CreditCard className="h-3.5 w-3.5" />
            {sports.cta || 'Booking sekarang'}
          </PvButton>
          <p className="mt-2 flex items-center justify-center gap-1 text-center text-[9px] leading-relaxed text-white/40">
            <Clock className="h-2.5 w-2.5" />
            Slot dikunci setelah DP terverifikasi • invoice otomatis
          </p>
        </div>
      </div>
    </div>
  )
}
