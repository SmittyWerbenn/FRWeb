/**
 * Modul add-on resmi: Payment Gateway & QRIS Dinamis Otomatis.
 * Satu sumber kebenaran untuk harga, label, dan copy disclaimer — dipakai
 * di Step 1 (pemilihan paket), ringkasan order, kartu template, FAQ, dan
 * pesan WhatsApp otomatis.
 */

export const PAYMENT_ADDON = {
  id: 'payment-gateway',
  label: 'Integrasi Payment Gateway & QRIS Otomatis',
  toggleLabel: '+ Integrasi Payment Gateway & QRIS Otomatis',
  priceLabel: '+ Rp 1.000.000 (One-time setup fee)',
  price: 1_000_000,
  priceSuffix: 'one-time setup fee',
  description:
    'Integrasi payment gateway (Midtrans/Xendit/Duitku) untuk verifikasi otomatis pembayaran via QRIS, Virtual Account bank, dan e-wallet tanpa cek mutasi manual.',
  providers: ['Midtrans', 'Xendit', 'Duitku'],
  includes: ['Setup API & credential', 'Webhook status pembayaran', 'Testing sandbox hingga go-live'],
  /** Catatan mini saat add-on TIDAK dipilih. */
  fallbackNote: 'Menggunakan sistem checkout default via WhatsApp konfirmasi manual (Free).',
  /** Footnote di kartu template yang menyorot QRIS / payment gateway. */
  footnote:
    'Integrasi QRIS/Payment Gateway otomatis merupakan modul add-on opsional (+Rp 1.000.000).',
  /** Disclaimer transparansi — ditampilkan pada panel add-on. */
  disclaimer:
    'Aktivasi gateway mengikuti persetujuan & kelengkapan dokumen merchant oleh penyedia (Midtrans/Xendit/Duitku). Biaya transaksi per pembayaran ditagih langsung oleh provider, di luar biaya setup ini.',
}

/**
 * Template dianggap menyorot pembayaran otomatis bila fiturnya memuat
 * QRIS, payment gateway, deposit, atau pre-payment.
 */
const PAYMENT_HIGHLIGHT_PATTERN = /qris|payment\s*gateway|gateway|deposit|pre-?payment/i

export function hasPaymentHighlight(features = []) {
  return features.some((feature) => PAYMENT_HIGHLIGHT_PATTERN.test(String(feature)))
}

/** Baris add-on untuk pesan checkout WhatsApp. */
export function paymentAddonLine(includePaymentGateway) {
  return includePaymentGateway
    ? `- Add-On: ${PAYMENT_ADDON.label} (+Rp 1.000.000)`
    : '- Add-On: Standard Checkout (Tanpa Gateway Otomatis)'
}
