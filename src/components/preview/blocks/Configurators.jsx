import { useMemo, useState } from 'react'
import { Check, Ruler, Sparkles, Truck } from '../../../lib/icons'
import { formatIDR } from '../../../lib/format'
import { Field, PvButton, SuccessPanel, cx, fieldClass } from '../ui'

const MATERIAL_NOTE = 'Estimasi belum termasuk ongkir, finishing khusus, dan kain pelapis.'

export function DimensionEstimator({ template }) {
  const cfg = template.shop.configurator
  const { theme } = template
  const [typeId, setTypeId] = useState(cfg.types[0].id)
  const [materialId, setMaterialId] = useState(cfg.materials[0].id)
  const [length, setLength] = useState(180)
  const [width, setWidth] = useState(90)
  const [success, setSuccess] = useState(false)

  const type = cfg.types.find((item) => item.id === typeId) || cfg.types[0]
  const material = cfg.materials.find((item) => item.id === materialId) || cfg.materials[0]

  const area = (length / 100) * (width / 100)
  const estimate = useMemo(() => {
    const raw = type.base + area * type.ratePerM2 * material.multiplier
    return Math.round(raw / 50000) * 50000
  }, [area, type, material])

  return (
    <div className="overflow-hidden rounded-2xl border border-black/[0.08] bg-white">
      <div className="grid @xl:grid-cols-[1.3fr_1fr]">
        <div className="p-4 @md:p-5">
          <div className="flex items-center gap-2">
            <span className="grid h-7 w-7 place-items-center rounded-lg" style={{ background: theme.tint, color: theme.accent2 }}>
              <Ruler className="h-3.5 w-3.5" />
            </span>
            <div>
              <p className="text-[12.5px] font-extrabold" style={{ color: theme.ink }}>
                {cfg.title}
              </p>
              <p className="text-[10px] text-black/45">{cfg.sub}</p>
            </div>
          </div>

          <div className="mt-4 grid gap-3 @sm:grid-cols-2">
            <Field label="Jenis furnitur">
              <div className="flex flex-wrap gap-1.5">
                {cfg.types.map((item) => {
                  const active = item.id === typeId
                  return (
                    <button
                      key={item.id}
                      type="button"
                      onClick={() => setTypeId(item.id)}
                      className={cx(
                        'rounded-lg border px-2.5 py-1.5 text-[10.5px] font-semibold transition',
                        active ? 'border-transparent' : 'border-black/10 hover:border-black/25',
                      )}
                      style={active ? { background: theme.ink, color: '#fff' } : { color: theme.ink }}
                    >
                      {item.label}
                    </button>
                  )
                })}
              </div>
            </Field>
            <Field label="Material">
              <select
                value={materialId}
                onChange={(event) => setMaterialId(event.target.value)}
                className={cx(fieldClass, '!py-2 !text-[11px]')}
              >
                {cfg.materials.map((item) => (
                  <option key={item.id} value={item.id}>
                    {item.label} (×{item.multiplier})
                  </option>
                ))}
              </select>
            </Field>
          </div>

          <div className="mt-4 grid gap-4 @sm:grid-cols-2">
            <div>
              <div className="flex items-center justify-between text-[10.5px]">
                <span className="font-semibold" style={{ color: theme.ink }}>
                  Panjang
                </span>
                <span className="font-bold tabular-nums" style={{ color: theme.accent2 }}>
                  {length} cm
                </span>
              </div>
              <input
                type="range"
                min={40}
                max={260}
                step={5}
                value={length}
                onChange={(event) => setLength(Number(event.target.value))}
                className="pv-range mt-2 w-full"
                style={{ accentColor: theme.accent2 }}
                aria-label="Panjang"
              />
            </div>
            <div>
              <div className="flex items-center justify-between text-[10.5px]">
                <span className="font-semibold" style={{ color: theme.ink }}>
                  Lebar / tinggi
                </span>
                <span className="font-bold tabular-nums" style={{ color: theme.accent2 }}>
                  {width} cm
                </span>
              </div>
              <input
                type="range"
                min={30}
                max={160}
                step={5}
                value={width}
                onChange={(event) => setWidth(Number(event.target.value))}
                className="pv-range mt-2 w-full"
                style={{ accentColor: theme.accent2 }}
                aria-label="Lebar"
              />
            </div>
          </div>

          <div className="mt-3 flex items-center gap-2 rounded-lg bg-black/[0.03] px-2.5 py-2 text-[9.5px] text-black/50">
            <Sparkles className="h-3 w-3 shrink-0" style={{ color: theme.accent2 }} />
            Luas permukaan {area.toFixed(2)} m² • {type.label} {material.label}
          </div>
        </div>

        <div className="flex flex-col justify-between bg-[var(--ink)] p-4 text-white @md:p-5">
          {success ? (
            <SuccessPanel
              title="Estimasi terkirim"
              desc="Workshop akan mengirim gambar kerja awal dan harga final maksimal 2 hari kerja."
              rows={[
                { label: 'Jenis', value: `${type.label} ${material.label}` },
                { label: 'Dimensi', value: `${length} × ${width} cm` },
                { label: 'Estimasi', value: formatIDR(estimate) },
              ]}
              templateName={template.name}
              note={MATERIAL_NOTE}
              onReset={() => setSuccess(false)}
            />
          ) : (
            <>
              <div>
                <p className="text-[10px] font-bold uppercase tracking-[0.18em] text-white/45">Estimasi harga</p>
                <p className="mt-1.5 text-[24px] font-extrabold leading-none tabular-nums" style={{ color: theme.accent }}>
                  {formatIDR(estimate)}
                </p>
                <p className="mt-1 text-[10px] text-white/45">untuk ukuran {length} × {width} cm</p>

                <div className="mt-3 space-y-1.5 border-t border-white/12 pt-3 text-[10.5px]">
                  <div className="flex justify-between">
                    <span className="text-white/55">Harga dasar {type.label.toLowerCase()}</span>
                    <span className="tabular-nums">{formatIDR(type.base)}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-white/55">Permukaan {area.toFixed(2)} m²</span>
                    <span className="tabular-nums">{formatIDR(area * type.ratePerM2)}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-white/55">Material {material.label}</span>
                    <span className="tabular-nums">×{material.multiplier}</span>
                  </div>
                </div>
              </div>

              <div>
                <PvButton variant="accent" size="md" className="mt-4 w-full" onClick={() => setSuccess(true)}>
                  <Check className="h-3.5 w-3.5" />
                  {cfg.cta}
                </PvButton>
                <p className="mt-2 text-[8.5px] leading-relaxed text-white/40">{cfg.note || MATERIAL_NOTE}</p>
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  )
}

export function BouquetBuilder({ template }) {
  const cfg = template.shop.configurator
  const { theme, shop } = template
  const bouquets = shop.products.filter((item) => item.cat === 'Buket')
  const [productId, setProductId] = useState(bouquets[0]?.id || shop.products[0].id)
  const [sizeId, setSizeId] = useState(cfg.sizes[0].id)
  const [slot, setSlot] = useState(cfg.slots[0])
  const [card, setCard] = useState('')
  const [success, setSuccess] = useState(false)

  const product = shop.products.find((item) => item.id === productId) || shop.products[0]
  const size = cfg.sizes.find((item) => item.id === sizeId) || cfg.sizes[0]
  const total = product.price + size.delta

  return (
    <div className="overflow-hidden rounded-2xl border border-black/[0.08] bg-white">
      <div className="grid @xl:grid-cols-[1.25fr_1fr]">
        <div className="p-4 @md:p-5">
          <p className="text-[12.5px] font-extrabold" style={{ color: theme.ink }}>
            {cfg.title}
          </p>
          <p className="text-[10px] text-black/45">{cfg.sub}</p>

          <div className="mt-3.5 grid grid-cols-3 gap-1.5">
            {bouquets.map((item) => {
              const active = item.id === productId
              return (
                <button
                  key={item.id}
                  type="button"
                  onClick={() => setProductId(item.id)}
                  className={cx(
                    'rounded-lg border px-2 py-2 text-left transition',
                    active ? 'border-transparent' : 'border-black/10 hover:border-black/25',
                  )}
                  style={active ? { background: theme.tint, borderColor: theme.accent2 } : undefined}
                >
                  <span className="block truncate text-[10px] font-bold" style={{ color: theme.ink }}>
                    {item.name}
                  </span>
                  <span className="block text-[9px] text-black/45">{formatIDR(item.price)}</span>
                </button>
              )
            })}
          </div>

          <div className="mt-3.5 grid gap-2 @sm:grid-cols-3">
            {cfg.sizes.map((item) => {
              const active = item.id === sizeId
              return (
                <button
                  key={item.id}
                  type="button"
                  onClick={() => setSizeId(item.id)}
                  className={cx(
                    'rounded-lg border px-2.5 py-2 text-left transition',
                    active ? 'border-transparent' : 'border-black/10 hover:border-black/25',
                  )}
                  style={active ? { background: theme.ink, color: '#fff' } : { color: theme.ink }}
                >
                  <span className="block text-[10.5px] font-bold">{item.label}</span>
                  <span className="block text-[8.5px] opacity-60">{item.desc}</span>
                  <span className="mt-0.5 block text-[9px] font-semibold" style={{ color: active ? theme.accent : theme.accent2 }}>
                    {item.delta === 0 ? 'termasuk' : `+${formatIDR(item.delta)}`}
                  </span>
                </button>
              )
            })}
          </div>

          <div className="mt-3.5 grid gap-2.5 @sm:grid-cols-[1.4fr_1fr]">
            <Field label={cfg.cardLabel}>
              <input
                value={card}
                onChange={(event) => setCard(event.target.value)}
                placeholder={cfg.cardPlaceholder}
                className={cx(fieldClass, '!py-2 !text-[11px]')}
              />
            </Field>
            <Field label="Jam antar">
              <select
                value={slot}
                onChange={(event) => setSlot(event.target.value)}
                className={cx(fieldClass, '!py-2 !text-[11px]')}
              >
                {cfg.slots.map((item) => (
                  <option key={item} value={item}>
                    {item}
                  </option>
                ))}
              </select>
            </Field>
          </div>
        </div>

        <div className="flex flex-col justify-between bg-[var(--ink)] p-4 text-white @md:p-5">
          {success ? (
            <SuccessPanel
              title="Pesanan buket dibuat"
              desc="Florist menyiapkan rangkaian sesuai pilihan Anda. Foto hasil akan dikirim sebelum berangkat."
              rows={[
                { label: 'Produk', value: product.name },
                { label: 'Ukuran', value: size.label },
                { label: 'Jam antar', value: slot },
                ...(card ? [{ label: 'Kartu ucapan', value: card }] : []),
                { label: 'Total', value: formatIDR(total) },
              ]}
              templateName={template.name}
              note="Pembayaran QRIS/transfer. Pesanan same-day sebelum 14.00 WIB."
              onReset={() => setSuccess(false)}
            />
          ) : (
            <>
              <div>
                <p className="text-[10px] font-bold uppercase tracking-[0.18em] text-white/45">Ringkasan buket</p>
                <p className="mt-2 text-[12.5px] font-bold">{product.name}</p>
                <p className="text-[10px] text-white/50">{product.desc}</p>

                <div className="mt-3 space-y-1.5 border-t border-white/12 pt-3 text-[10.5px]">
                  <div className="flex justify-between">
                    <span className="text-white/55">Harga dasar</span>
                    <span className="tabular-nums">{formatIDR(product.price)}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-white/55">Upgrade {size.label}</span>
                    <span className="tabular-nums">{size.delta ? `+${formatIDR(size.delta)}` : '—'}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-white/55">Ongkir</span>
                    <span className="tabular-nums">dihitung saat checkout</span>
                  </div>
                </div>
              </div>

              <div>
                <div className="mt-3 rounded-xl bg-white/[0.06] px-3 py-2.5">
                  <div className="flex items-baseline justify-between">
                    <span className="text-[10px] text-white/55">Total</span>
                    <span className="text-[16px] font-extrabold tabular-nums" style={{ color: theme.accent }}>
                      {formatIDR(total)}
                    </span>
                  </div>
                </div>
                <PvButton variant="accent" size="md" className="mt-2.5 w-full" onClick={() => setSuccess(true)}>
                  <Truck className="h-3.5 w-3.5" />
                  {cfg.cta}
                </PvButton>
                <p className="mt-2 text-[8.5px] leading-relaxed text-white/40">{shop.note}</p>
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  )
}
