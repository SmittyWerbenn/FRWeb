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
      className={`group w-full rounded-2xl border px-4 py-4 text-left transition duration-300 focus:outline-none focus-visible:ring-2 focus-visible:ring-[#C5D0E4] sm:px-5 ${
        includePaymentGateway
          ? 'border-[#0B1F3F] bg-[#E8EEFA] shadow-[0_8px_24px_-12px_rgba(11,31,63,0.18)]'
          : 'border-[#DDE5F3] bg-white hover:border-[#C5D0E4] hover:bg-[#E8EEFA]'
      } ${className}`}
    >
      <div className="flex items-start gap-3.5">
        <span
          className={`mt-0.5 grid h-9 w-9 shrink-0 place-items-center rounded-xl transition ${
            includePaymentGateway
              ? 'bg-[#E8EEFA] text-[#0B1F3F]'
              : 'bg-[#E8EEFA] text-[#64748B] group-hover:text-[#334155]'
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
                  ? 'border-[#0B1F3F] bg-[#E8EEFA] text-[#0B1F3F]'
                  : 'border-[#DDE5F3] bg-[#F5F8FD] text-[#475569]'
              }`}
            >
              {PAYMENT_ADDON.priceLabel}
            </span>
            <span className="rounded-full bg-[#F5F8FD] px-2 py-0.5 text-[9.5px] font-semibold uppercase tracking-wider text-[#64748B]">
              Opsional
            </span>
          </div>

          <p className="mt-1.5 text-[11.5px] leading-relaxed text-[#64748B]">{PAYMENT_ADDON.description}</p>

          {!compact && (
            <ul className="mt-2.5 flex flex-wrap gap-x-3.5 gap-y-1.5">
              {PAYMENT_ADDON.includes.map((item) => (
                <li key={item} className="inline-flex items-center gap-1 text-[10.5px] font-medium text-[#64748B]">
                  <Check className="h-2.5 w-2.5 shrink-0 text-[#0B1F3F]" strokeWidth={3.5} />
                  {item}
                </li>
              ))}
            </ul>
          )}

          <div className="mt-2.5 flex flex-wrap items-center gap-x-2 gap-y-1">
            <span className="inline-flex items-center gap-1 text-[10px] font-semibold uppercase tracking-wider text-[#64748B]">
              <Wallet className="h-2.5 w-2.5" /> Provider
            </span>
            {PAYMENT_ADDON.providers.map((provider) => (
              <span
                key={provider}
                className="rounded-md border border-[#DDE5F3] bg-[#F5F8FD] px-1.5 py-0.5 text-[10px] font-semibold text-[#475569]"
              >
                {provider}
              </span>
            ))}
          </div>

          <p
            data-payment-addon-note
            className={`mt-2.5 flex items-start gap-1.5 rounded-lg px-2.5 py-2 text-[10.5px] leading-snug ${
              includePaymentGateway
                ? 'bg-[#E8EEFA] text-[#0B1F3F]'
                : 'bg-[#F5F8FD] text-[#64748B]'
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
              ? 'justify-end border-[#C5D0E4] bg-[#E8EEFA]'
              : 'justify-start border-[#DDE5F3] bg-[#E8EEFA]'
          }`}
        >
          <span
            className={`h-3.5 w-3.5 rounded-full bg-white shadow transition duration-300 ${
              includePaymentGateway ? '' : 'bg-[#C5D0E4]'
            }`}
          />
        </span>
      </div>

      <p className="mt-3 border-t border-[#DDE5F3] pt-2.5 text-[10px] leading-snug text-[#64748B]">
        {PAYMENT_ADDON.disclaimer}
      </p>
    </button>
  )
}
