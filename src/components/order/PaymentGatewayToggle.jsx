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
      className={`group w-full rounded-2xl border px-4 py-4 text-left transition duration-300 focus:outline-none focus-visible:ring-2 focus-visible:ring-emerald-400/70 sm:px-5 ${
        includePaymentGateway
          ? 'border-emerald-400/45 bg-emerald-400/[0.06] shadow-[0_25px_60px_-40px_rgba(52,211,153,0.55)]'
          : 'border-slate-800/80 bg-[#0b1120] hover:border-indigo-500/40 hover:bg-white/[0.02]'
      } ${className}`}
    >
      <div className="flex items-start gap-3.5">
        <span
          className={`mt-0.5 grid h-9 w-9 shrink-0 place-items-center rounded-xl transition ${
            includePaymentGateway
              ? 'bg-emerald-400/15 text-emerald-300'
              : 'bg-white/[0.05] text-slate-400 group-hover:text-slate-300'
          }`}
        >
          <QrCode className="h-4 w-4" />
        </span>

        <div className="min-w-0 flex-1">
          <div className="flex flex-wrap items-center gap-x-2 gap-y-1">
            <p className="text-[13px] font-bold text-white">{PAYMENT_ADDON.toggleLabel}</p>
            <span
              className={`rounded-full border px-2 py-0.5 text-[10px] font-bold ${
                includePaymentGateway
                  ? 'border-emerald-400/40 bg-emerald-400/15 text-emerald-200'
                  : 'border-slate-700/80 bg-white/[0.04] text-slate-300'
              }`}
            >
              {PAYMENT_ADDON.priceLabel}
            </span>
            <span className="rounded-full bg-white/[0.04] px-2 py-0.5 text-[9.5px] font-semibold uppercase tracking-wider text-slate-500">
              Opsional
            </span>
          </div>

          <p className="mt-1.5 text-[11.5px] leading-relaxed text-slate-400">{PAYMENT_ADDON.description}</p>

          {!compact && (
            <ul className="mt-2.5 flex flex-wrap gap-x-3.5 gap-y-1.5">
              {PAYMENT_ADDON.includes.map((item) => (
                <li key={item} className="inline-flex items-center gap-1 text-[10.5px] font-medium text-slate-400">
                  <Check className="h-2.5 w-2.5 shrink-0 text-emerald-300" strokeWidth={3.5} />
                  {item}
                </li>
              ))}
            </ul>
          )}

          <div className="mt-2.5 flex flex-wrap items-center gap-x-2 gap-y-1">
            <span className="inline-flex items-center gap-1 text-[10px] font-semibold uppercase tracking-wider text-slate-500">
              <Wallet className="h-2.5 w-2.5" /> Provider
            </span>
            {PAYMENT_ADDON.providers.map((provider) => (
              <span
                key={provider}
                className="rounded-md border border-white/10 bg-white/[0.03] px-1.5 py-0.5 text-[10px] font-semibold text-slate-300"
              >
                {provider}
              </span>
            ))}
          </div>

          <p
            data-payment-addon-note
            className={`mt-2.5 flex items-start gap-1.5 rounded-lg px-2.5 py-2 text-[10.5px] leading-snug ${
              includePaymentGateway
                ? 'bg-emerald-400/10 text-emerald-100/85'
                : 'bg-white/[0.03] text-slate-500'
            }`}
          >
            {includePaymentGateway ? (
              <>
                <ShieldCheck className="mt-[1px] h-3 w-3 shrink-0 text-emerald-300" />
                <span>
                  Ditambahkan <span className="font-semibold text-emerald-200">+{formatIDR(PAYMENT_ADDON.price)}</span>{' '}
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
              ? 'justify-end border-emerald-400/60 bg-emerald-400/85'
              : 'justify-start border-white/15 bg-white/[0.08]'
          }`}
        >
          <span
            className={`h-3.5 w-3.5 rounded-full bg-white shadow transition duration-300 ${
              includePaymentGateway ? '' : 'bg-slate-300'
            }`}
          />
        </span>
      </div>

      <p className="mt-3 border-t border-white/[0.06] pt-2.5 text-[10px] leading-snug text-slate-500">
        {PAYMENT_ADDON.disclaimer}
      </p>
    </button>
  )
}
