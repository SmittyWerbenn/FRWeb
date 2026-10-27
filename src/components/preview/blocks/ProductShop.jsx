import { useMemo, useState } from 'react'
import { Check, Icon, Minus, Plus, ShoppingCart, Trash2, Truck, Wallet } from '../../../lib/icons'
import { formatIDR } from '../../../lib/format'
import { Field, PvButton, Stepper, SuccessPanel, cx, fieldClass } from '../ui'

function code(prefix) {
  return `${prefix}-${Math.random().toString(36).slice(2, 7).toUpperCase()}`
}

function unitPrice(product, qty) {
  if (product.wholesale && qty >= product.wholesale.minQty) return product.wholesale.price
  return product.price
}

export default function ProductShop({ template }) {
  const { shop, theme, retail, fnb } = template
  const mode = retail?.mode || 'shop'
  const isRfq = mode === 'rfq'
  const [filter, setFilter] = useState(shop.filters?.[0] || 'Semua')
  const [cart, setCart] = useState({})
  const [shippingIndex, setShippingIndex] = useState(0)
  const [form, setForm] = useState({})
  const [success, setSuccess] = useState(null)
  const [error, setError] = useState('')

  const products = useMemo(
    () => shop.products.filter((product) => filter === 'Semua' || product.cat === filter),
    [shop.products, filter],
  )

  const lines = useMemo(
    () =>
      Object.entries(cart)
        .map(([id, qty]) => {
          const product = shop.products.find((item) => item.id === id)
          if (!product || qty <= 0) return null
          return { product, qty, price: unitPrice(product, qty), total: unitPrice(product, qty) * qty }
        })
        .filter(Boolean),
    [cart, shop.products],
  )

  const subtotal = lines.reduce((sum, line) => sum + line.total, 0)
  const shipping = shop.shipping?.[shippingIndex] || { name: '-', cost: 0 }
  const shippingCost = subtotal >= (shop.freeShippingMin || Infinity) ? 0 : shipping.cost
  const total = subtotal + shippingCost
  const itemCount = lines.reduce((sum, line) => sum + line.qty, 0)

  const setQty = (id, qty) => {
    setCart((current) => ({ ...current, [id]: Math.max(0, qty) }))
  }

  const add = (id) => {
    setError('')
    setCart((current) => ({ ...current, [id]: (current[id] || 0) + 1 }))
  }

  const submit = () => {
    if (lines.length === 0) {
      setError(isRfq ? 'Tambahkan material yang ingin diminta harganya.' : 'Keranjang masih kosong.')
      return
    }
    if (isRfq) {
      const required = shop.rfqFields || []
      const missing = required.find((item) => !form[item.id]?.trim())
      if (missing) {
        setError(`Lengkapi ${missing.label.toLowerCase()} terlebih dahulu.`)
        return
      }
    }
    setSuccess({
      code: code(isRfq ? 'RFQ' : 'ORD'),
      rows: [
        ...(isRfq
          ? [
              ...(shop.rfqFields || [])
                .filter((item) => form[item.id])
                .map((item) => ({ label: item.label, value: form[item.id] })),
            ]
          : []),
        ...lines.map((line) => ({
          label: `${line.product.name} ×${line.qty}`,
          value: formatIDR(line.total),
        })),
        ...(!isRfq
          ? [
              { label: 'Ongkir', value: shippingCost === 0 ? 'Gratis' : `${shipping.name} • ${formatIDR(shippingCost)}` },
              { label: 'Total', value: formatIDR(total) },
            ]
          : [{ label: 'Estimasi nilai', value: formatIDR(subtotal) }]),
      ],
    })
  }

  return (
    <div>
      <div className="flex flex-wrap items-center gap-1.5">
        {shop.filters.map((item) => {
          const active = item === filter
          return (
            <button
              key={item}
              type="button"
              onClick={() => setFilter(item)}
              className={cx(
                'rounded-full border px-3 py-1.5 text-[10.5px] font-semibold transition',
                active ? 'border-transparent' : 'border-black/10 bg-white text-black/60 hover:border-black/25',
              )}
              style={active ? { background: theme.ink, color: '#fff' } : undefined}
            >
              {item}
            </button>
          )
        })}
        <span className="ml-auto text-[10px] text-black/40">{products.length} produk</span>
      </div>

      <div className="mt-4 grid gap-4 @xl:grid-cols-[1.55fr_1fr]">
        <div className="grid content-start gap-2.5 @sm:grid-cols-2">
          {products.map((product) => {
            const qty = cart[product.id] || 0
            const wholesaleActive = product.wholesale && qty >= product.wholesale.minQty
            return (
              <div
                key={product.id}
                className="flex flex-col rounded-xl border border-black/[0.07] bg-white p-3"
              >
                <div className="flex items-start gap-2.5">
                  <span
                    className="grid h-10 w-10 shrink-0 place-items-center rounded-lg"
                    style={{ background: theme.tint, color: theme.accent2 }}
                  >
                    <Icon name={product.icon} className="h-4 w-4" />
                  </span>
                  <div className="min-w-0 flex-1">
                    <div className="flex items-start justify-between gap-1.5">
                      <p className="text-[11.5px] font-bold leading-tight" style={{ color: theme.ink }}>
                        {product.name}
                      </p>
                      {product.tag && (
                        <span
                          className="shrink-0 rounded-full px-1.5 py-0.5 text-[8px] font-bold"
                          style={{ background: theme.accent, color: theme.ink }}
                        >
                          {product.tag}
                        </span>
                      )}
                    </div>
                    <p className="mt-0.5 text-[9.5px] text-black/45">{product.unit}</p>
                    <p className="mt-1 line-clamp-2 text-[10px] leading-snug text-black/55">{product.desc}</p>
                  </div>
                </div>

                <div className="mt-auto flex items-end justify-between gap-2 pt-3">
                  <div>
                    <p className="text-[12px] font-extrabold" style={{ color: theme.ink }}>
                      {formatIDR(qty > 0 ? unitPrice(product, qty) : product.price)}
                    </p>
                    {product.wholesale && (
                      <p
                        className="text-[9px] font-semibold"
                        style={{ color: wholesaleActive ? theme.accent2 : 'rgba(0,0,0,0.4)' }}
                      >
                        {wholesaleActive ? (
                          <span className="inline-flex items-center gap-0.5">
                            <Check className="h-2.5 w-2.5" strokeWidth={4} /> Harga grosir aktif
                          </span>
                        ) : (
                          `≥${product.wholesale.minQty} pcs → ${formatIDR(product.wholesale.price)}`
                        )}
                      </p>
                    )}
                    {product.moq && <p className="text-[9px] text-black/40">MOQ {product.moq} {product.unit}</p>}
                  </div>
                  {qty > 0 ? (
                    <Stepper value={qty} onChange={(value) => setQty(product.id, value)} min={0} max={999} />
                  ) : (
                    <PvButton variant="primary" size="sm" onClick={() => add(product.id)}>
                      <Plus className="h-3 w-3" />
                      {isRfq ? 'RFQ' : 'Keranjang'}
                    </PvButton>
                  )}
                </div>
              </div>
            )
          })}
        </div>

        <div className="self-start rounded-xl border border-black/[0.08] bg-white p-3.5 @xl:sticky @xl:top-20">
          {success ? (
            <SuccessPanel
              title={isRfq ? 'RFQ terkirim ke sales' : 'Pesanan diterima'}
              desc={
                isRfq
                  ? 'Tim sales akan mengirim penawaran resmi lengkap dengan ongkir proyek maksimal 1×24 jam kerja.'
                  : 'Pesanan Anda masuk ke antrean. Konfirmasi pembayaran dikirim via WhatsApp.'
              }
              code={success.code}
              rows={success.rows}
              templateName={template.name}
              note={isRfq ? 'Harga penawaran dapat berubah mengikuti ketersediaan stok.' : shop.note}
              onReset={() => {
                setSuccess(null)
                setCart({})
                setForm({})
              }}
            />
          ) : (
            <>
              <div className="flex items-center justify-between">
                <p className="flex items-center gap-1.5 text-[12px] font-extrabold" style={{ color: theme.ink }}>
                  <ShoppingCart className="h-3.5 w-3.5" />
                  {isRfq ? 'Daftar RFQ' : 'Keranjang'}
                  <span
                    className="rounded-full px-1.5 py-0.5 text-[9px] font-bold"
                    style={{ background: theme.accent, color: theme.ink }}
                  >
                    {itemCount}
                  </span>
                </p>
                {lines.length > 0 && (
                  <button
                    type="button"
                    onClick={() => setCart({})}
                    className="text-[9.5px] font-semibold text-black/40 hover:text-black/70"
                  >
                    Kosongkan
                  </button>
                )}
              </div>

              <div className="mt-3 space-y-2">
                {lines.length === 0 && (
                  <div className="rounded-lg border border-dashed border-black/15 px-3 py-6 text-center">
                    <p className="text-[10.5px] text-black/40">
                      {isRfq ? 'Belum ada material dipilih.' : 'Belum ada produk di keranjang.'}
                    </p>
                  </div>
                )}
                {lines.map((line) => (
                  <div key={line.product.id} className="flex items-start justify-between gap-2 border-b border-black/[0.06] pb-2 last:border-0">
                    <div className="min-w-0">
                      <p className="truncate text-[10.5px] font-semibold" style={{ color: theme.ink }}>
                        {line.product.name}
                      </p>
                      <p className="text-[9px] text-black/40">
                        {line.qty} × {formatIDR(line.price)}
                      </p>
                      <div className="mt-1 flex items-center gap-1">
                        <button
                          type="button"
                          onClick={() => setQty(line.product.id, line.qty - 1)}
                          className="grid h-4 w-4 place-items-center rounded border border-black/15 text-black/50 hover:bg-black/5"
                          aria-label="Kurangi"
                        >
                          <Minus className="h-2 w-2" />
                        </button>
                        <span className="min-w-[18px] text-center text-[9.5px] font-bold">{line.qty}</span>
                        <button
                          type="button"
                          onClick={() => setQty(line.product.id, line.qty + 1)}
                          className="grid h-4 w-4 place-items-center rounded border border-black/15 text-black/50 hover:bg-black/5"
                          aria-label="Tambah"
                        >
                          <Plus className="h-2 w-2" />
                        </button>
                        <button
                          type="button"
                          onClick={() => setQty(line.product.id, 0)}
                          className="ml-1 text-black/30 hover:text-rose-500"
                          aria-label="Hapus"
                        >
                          <Trash2 className="h-2.5 w-2.5" />
                        </button>
                      </div>
                    </div>
                    <p className="shrink-0 text-[10.5px] font-bold tabular-nums" style={{ color: theme.ink }}>
                      {formatIDR(line.total)}
                    </p>
                  </div>
                ))}
              </div>

              {isRfq && (
                <div className="mt-3 space-y-2">
                  {(shop.rfqFields || []).map((item) => (
                    <Field key={item.id} label={item.label}>
                      <input
                        value={form[item.id] || ''}
                        onChange={(event) => setForm((current) => ({ ...current, [item.id]: event.target.value }))}
                        placeholder={item.placeholder}
                        className={cx(fieldClass, '!py-2 !text-[11px]')}
                      />
                    </Field>
                  ))}
                </div>
              )}

              {!isRfq && (
                <div className="mt-3 space-y-2">
                  <Field label="Kota tujuan">
                    <select
                      value={shippingIndex}
                      onChange={(event) => setShippingIndex(Number(event.target.value))}
                      className={cx(fieldClass, '!py-2 !text-[11px]')}
                    >
                      {shop.shipping.map((item, index) => (
                        <option key={item.name} value={index}>
                          {item.name} — {item.cost === 0 ? 'gratis' : formatIDR(item.cost)}
                        </option>
                      ))}
                    </select>
                  </Field>
                  {shop.freeShippingMin && (
                    <div>
                      <div className="flex items-center justify-between text-[9px]">
                        <span className="flex items-center gap-1 text-black/45">
                          <Truck className="h-2.5 w-2.5" />
                          Gratis ongkir min. {formatIDR(shop.freeShippingMin)}
                        </span>
                        <span className="font-bold" style={{ color: theme.accent2 }}>
                          {Math.min(100, Math.round((subtotal / shop.freeShippingMin) * 100))}%
                        </span>
                      </div>
                      <div className="mt-1 h-1.5 overflow-hidden rounded-full bg-black/[0.07]">
                        <div
                          className="h-full rounded-full transition-all"
                          style={{
                            width: `${Math.min(100, (subtotal / shop.freeShippingMin) * 100)}%`,
                            background: theme.accent2,
                          }}
                        />
                      </div>
                    </div>
                  )}
                </div>
              )}

              <div className="mt-3 space-y-1.5 border-t border-black/[0.08] pt-3 text-[10.5px]">
                <div className="flex justify-between">
                  <span className="text-black/50">Subtotal</span>
                  <span className="font-semibold tabular-nums" style={{ color: theme.ink }}>
                    {formatIDR(subtotal)}
                  </span>
                </div>
                {!isRfq && (
                  <div className="flex justify-between">
                    <span className="text-black/50">Ongkir</span>
                    <span className="font-semibold tabular-nums" style={{ color: theme.ink }}>
                      {shippingCost === 0 ? 'Gratis' : formatIDR(shippingCost)}
                    </span>
                  </div>
                )}
                <div className="flex items-baseline justify-between pt-1">
                  <span className="text-[11px] font-bold" style={{ color: theme.ink }}>
                    {isRfq ? 'Estimasi' : 'Total'}
                  </span>
                  <span className="text-[14px] font-extrabold tabular-nums" style={{ color: theme.ink }}>
                    {formatIDR(total)}
                  </span>
                </div>
              </div>

              {error && <p className="mt-2 text-[9.5px] font-semibold text-rose-500">{error}</p>}

              <PvButton variant="accent" size="md" onClick={submit} className="mt-3 w-full">
                <Wallet className="h-3.5 w-3.5" />
                {retail?.cta || fnb?.cta || shop.cta || 'Checkout'}
              </PvButton>
              <p className="mt-2 text-center text-[8.5px] leading-relaxed text-black/40">{shop.note}</p>
            </>
          )}
        </div>
      </div>
    </div>
  )
}
