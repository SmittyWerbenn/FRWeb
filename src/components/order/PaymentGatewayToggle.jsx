import { Check, Info, QrCode, ShieldCheck, Wallet } from '../../lib/icons'
import { formatIDR } from '../../lib/format'
import { PAYMENT_ADDON } from '../../data/paymentAddon'
import { useOrder } from '../../context/OrderContext'

/**
 * Toggle add-on Payment Gateway & QRIS Otomatis.
 * Dipakai di Step 1 (di bawah pilihan paket) dan bisa dipakai ulang di
 * ringkasan order. Seluruh kartu adalah satu tombol switch agar target
 * klik besar di mobile, tanpa kontrol bersarang.
 */
export default function PaymentGatewayToggle({ className = '', compact = false }) {
  const { includePaymentGateway, togglePaymentGateway } = useOrder()

  return (
    <button
      type="button"
      role="switch"
      aria-checked={includePaymentGateway}
      aria-label={`Add-on ${PAYMENT_ADDON.label}`}
      data-payment-addon={includePaymentGateway ? 'on' : 'off'}
      onClick={togglePaymentGateway}
      className={`group w-full rounded-2xl border px-4 py-4 text-left transition duration-300 focus:outline-none focus-visible:ring-2 focus-visible:ring-[#D1D5DB] sm:px-5 ${
        includePaymentGateway
          ? 'border-[#0B1F3F] bg-[#F3F4F6] shadow-[0_8px_24px_-12px_rgba(11,31,63,0.18)]'
          : 'border-[#E5E7EB] bg-white hover:border-[#D1D5DB] hover:bg-[#F3F4F6]'
      } ${className}`}
    >
      <div className="flex items-start gap-3.5">
        <span
          className={`mt-0.5 grid h-9 w-9 shrink-0 place-items-center rounded-xl transition ${
            includePaymentGateway
              ? 'bg-[#F3F4F6] text-[#0B1F3F]'
              : 'bg-[#F3F4F6] text-[#6B7280] group-hover:text-[#374151]'
          }`}
        >
          <QrCode className="h-4 w-4" />
        </span>

        <div className="min-w-0 flex-1">
          <div className="flex flex-wrap items-center gap-x-2 gap-y-1">
            <p className="text-[13px] font-bold text-[#0B1F3F]">{PAYMENT_ADDON.toggleLabel}</p>
            <span
              className={`rounded-full border px-2 py-0.5 text-[10px] font-bold ${
                includePaymentGateway
                  ? 'border-[#0B1F3F] bg-[#F3F4F6] text-[#0B1F3F]'
                  : 'border-[#E5E7EB] bg-[#F9FAFB] text-[#4B5563]'
              }`}
            >
              {PAYMENT_ADDON.priceLabel}
            </span>
            <span className="rounded-full bg-[#F9FAFB] px-2 py-0.5 text-[9.5px] font-semibold uppercase tracking-wider text-[#6B7280]">
              Opsional
            </span>
          </div>

          <p className="mt-1.5 text-[11.5px] leading-relaxed text-[#6B7280]">{PAYMENT_ADDON.description}</p>

          {!compact && (
            <ul className="mt-2.5 flex flex-wrap gap-x-3.5 gap-y-1.5">
              {PAYMENT_ADDON.includes.map((item) => (
                <li key={item} className="inline-flex items-center gap-1 text-[10.5px] font-medium text-[#6B7280]">
                  <Check className="h-2.5 w-2.5 shrink-0 text-[#0B1F3F]" strokeWidth={3.5} />
                  {item}
                </li>
              ))}
            </ul>
          )}

          <div className="mt-2.5 flex flex-wrap items-center gap-x-2 gap-y-1">
            <span className="inline-flex items-center gap-1 text-[10px] font-semibold uppercase tracking-wider text-[#6B7280]">
              <Wallet className="h-2.5 w-2.5" /> Provider
            </span>
            {PAYMENT_ADDON.providers.map((provider) => (
              <span
                key={provider}
                className="rounded-md border border-[#E5E7EB] bg-[#F9FAFB] px-1.5 py-0.5 text-[10px] font-semibold text-[#4B5563]"
              >
                {provider}
              </span>
            ))}
          </div>

          <p
            data-payment-addon-note
            className={`mt-2.5 flex items-start gap-1.5 rounded-lg px-2.5 py-2 text-[10.5px] leading-snug ${
              includePaymentGateway
                ? 'bg-[#F3F4F6] text-[#0B1F3F]'
                : 'bg-[#F9FAFB] text-[#6B7280]'
            }`}
          >
            {includePaymentGateway ? (
              <>
                <ShieldCheck className="mt-[1px] h-3 w-3 shrink-0 text-[#0B1F3F]" />
                <span>
                  Ditambahkan <span className="font-semibold text-[#0B1F3F]">+{formatIDR(PAYMENT_ADDON.price)}</span>{' '}
                  ke total order. Invoice dirinci terpisah: setup paket + setup gateway.
                </span>
              </>
            ) : (
              <>
                <Info className="mt-[1px] h-3 w-3 shrink-0" />
                <span>{PAYMENT_ADDON.fallbackNote}</span>
              </>
            )}
          </p>
        </div>

        <span
          aria-hidden="true"
          className={`mt-1 flex h-5 w-9 shrink-0 items-center rounded-full border p-0.5 transition duration-300 ${
            includePaymentGateway
              ? 'justify-end border-[#D1D5DB] bg-[#F3F4F6]'
              : 'justify-start border-[#E5E7EB] bg-[#F3F4F6]'
          }`}
        >
          <span
            className={`h-3.5 w-3.5 rounded-full bg-white shadow transition duration-300 ${
              includePaymentGateway ? '' : 'bg-[#D1D5DB]'
            }`}
          />
        </span>
      </div>

      <p className="mt-3 border-t border-[#E5E7EB] pt-2.5 text-[10px] leading-snug text-[#6B7280]">
        {PAYMENT_ADDON.disclaimer}
      </p>
    </button>
  )
}
