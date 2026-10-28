import { CUSTOM_TIMELINE, featureLabels } from '../data/customFeatures'
import { PAYMENT_ADDON, paymentAddonLine } from '../data/paymentAddon'

/** Nomor sales & customer service FRWeb (format internasional tanpa +). */
export const SALES_WHATSAPP = '6285778185971'

/** "+62 857-7818-5971" — diturunkan dari SALES_WHATSAPP agar tampilan tak pernah beda. */
export const SALES_WHATSAPP_DISPLAY = SALES_WHATSAPP.replace(
  /^62(\d{3})(\d{4})(\d+)$/,
  '+62 $1-$2-$3',
)

export const BRAND = {
  name: 'FRWeb',
  parent: 'FRCloud',
  tagline: 'Website instan go-live 30 menit',
  domain: 'frel.cloud',
  url: 'https://frel.cloud',
  email: 'hello@frel.cloud',
  city: 'Tangerang, Banten',
}

export function formatIDR(value) {
  const number = Number(value) || 0
  return new Intl.NumberFormat('id-ID', {
    style: 'currency',
    currency: 'IDR',
    maximumFractionDigits: 0,
  }).format(number)
}

export function formatNumber(value) {
  return new Intl.NumberFormat('id-ID').format(Number(value) || 0)
}

/** "Rp 2,5 jt" — dipakai di kartu agar ringkas. */
export function formatCompactIDR(value) {
  const number = Number(value) || 0
  if (number >= 1_000_000_000) {
    return `Rp ${(number / 1_000_000_000).toFixed(1).replace('.', ',').replace(',0', '')} M`
  }
  if (number >= 1_000_000) {
    return `Rp ${(number / 1_000_000).toFixed(1).replace('.', ',').replace(',0', '')} jt`
  }
  if (number >= 1_000) {
    return `Rp ${Math.round(number / 1_000)} rb`
  }
  return formatIDR(number)
}

/**
 * Link WhatsApp untuk bertanya soal satu template.
 */
export function buildWhatsAppLink(templateName, { extra } = {}) {
  const base = `Halo tim FRWeb, saya tertarik dengan template website *${templateName}* untuk usaha saya. Bisa dibantu detailnya?`
  const text = extra ? `${base}\n\n${extra}` : base
  return `https://wa.me/${SALES_WHATSAPP}?text=${encodeURIComponent(text)}`
}

/**
 * Link checkout jalur template — website go-live 30 menit.
 * Menyertakan baris add-on Payment Gateway/QRIS dan estimasi total final
 * agar tim sales tidak perlu menghitung ulang saat menerima pesan.
 */
export function buildOrderLink({
  planName,
  planPrice,
  domain,
  templateName,
  includePaymentGateway = false,
  totalPrice = null,
}) {
  const priceLabel = planPrice ? ` (${formatIDR(planPrice)})` : ' (Custom — perlu penawaran)'
  const totalLabel =
    totalPrice || planPrice
      ? formatIDR(totalPrice ?? planPrice)
      : 'Custom — menunggu penawaran'
  const lines = [
    'Halo tim FRWeb, saya ingin setup website go-live.',
    '',
    '*Detail Pesanan:*',
    `- Paket: ${planName || '-'}${priceLabel}`,
    `- Domain: ${domain || 'belum ditentukan'}`,
    '- Mode Desain: Template Katalog (Go-Live 30 Menit)',
    `- Template/Desain: ${templateName || 'belum dipilih'}`,
    paymentAddonLine(includePaymentGateway),
    `- *Estimasi Total:* ${totalLabel}`,
    '',
    'Mohon dibantu tahap aktivasi dan pembayarannya.',
  ]
  return `https://wa.me/${SALES_WHATSAPP}?text=${encodeURIComponent(lines.join('\n'))}`
}

/**
 * Link checkout jalur Custom Design — format pesan mengikuti brief:
 * referensi web, fitur khusus yang dicentang, dan catatan bisnis.
 */
export function buildCustomOrderLink({
  planName,
  planPrice,
  domain,
  reference,
  features,
  notes,
  includePaymentGateway = false,
}) {
  const priceLabel = planPrice ? ` (${formatIDR(planPrice)})` : ' (Custom — perlu penawaran)'
  const featureList = featureLabels(features ?? [])
  const totalLabel = planPrice
    ? formatIDR(planPrice + (includePaymentGateway ? PAYMENT_ADDON.price : 0))
    : 'Custom — menunggu penawaran setelah brief disetujui'
  const lines = [
    'Halo tim FRWeb, saya tertarik setup website dengan *Custom Design*.',
    '',
    '*Detail Kebutuhan:*',
    `- Paket: ${planName || '-'}${priceLabel}`,
    `- Domain: ${domain || 'belum ditentukan'}`,
    '- Mode Desain: Custom Design (Bukan Template)',
    `- Referensi Web: ${(reference || '').trim() || '-'}`,
    `- Fitur Khusus: ${featureList.length > 0 ? featureList.join(', ') : 'belum ada — akan didiskusikan'}`,
    `- Catatan: ${(notes || '').trim() || '-'}`,
    paymentAddonLine(includePaymentGateway),
    `- *Estimasi Total:* ${totalLabel}`,
    `- Estimasi Pengerjaan: ${CUSTOM_TIMELINE} setelah brief disetujui`,
    '',
    'Bisa dibantu estimasi timeline dan tahap selanjutnya?',
  ]
  return `https://wa.me/${SALES_WHATSAPP}?text=${encodeURIComponent(lines.join('\n'))}`
}

export function buildConsultLink() {
  const text = 'Halo tim FRWeb, saya ingin konsultasi website kustom untuk usaha saya. Bisa dibantu?'
  return `https://wa.me/${SALES_WHATSAPP}?text=${encodeURIComponent(text)}`
}

/** Tautan WhatsApp siap pakai untuk CTA "Konsultasi Kustom". */
export const WA_CONSULT = buildConsultLink()

/** Tanggal ISO lokal (bukan UTC) — aman untuk label hari. */
export function localISO(date = new Date()) {
  const offset = date.getTimezoneOffset() * 60_000
  return new Date(date.getTime() - offset).toISOString().slice(0, 10)
}

export function addDays(date, days) {
  const next = new Date(date)
  next.setDate(next.getDate() + days)
  return next
}

export function shortDayLabel(date) {
  return new Intl.DateTimeFormat('id-ID', { weekday: 'short' }).format(date)
}

export function dayNumber(date) {
  return new Intl.DateTimeFormat('id-ID', { day: '2-digit' }).format(date)
}

export function monthLabel(date) {
  return new Intl.DateTimeFormat('id-ID', { month: 'short' }).format(date)
}

export function fullDateLabel(value) {
  if (!value) return ''
  const date = new Date(`${value}T00:00:00`)
  return new Intl.DateTimeFormat('id-ID', {
    weekday: 'long',
    day: 'numeric',
    month: 'long',
    year: 'numeric',
  }).format(date)
}
