/** Nomor sales FRWeb (format internasional tanpa +). */
export const SALES_WHATSAPP = '6285782846851'

export const BRAND = {
  name: 'FRWeb',
  parent: 'FRCloud',
  tagline: 'Website instan go-live 30 menit',
  domain: 'frcloud.cloud',
  url: 'https://frcloud.cloud',
  email: 'hello@frcloud.cloud',
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
 * Link checkout utama — format pesan sesuai brief:
 * "Halo tim FRWeb, saya ingin setup website go-live 30 menit."
 * + Detail Pesanan (Paket, Domain, Template).
 */
export function buildOrderLink({ planName, planPrice, domain, templateName }) {
  const priceLabel = planPrice ? ` (${formatIDR(planPrice)})` : ' (Custom — perlu penawaran)'
  const lines = [
    'Halo tim FRWeb, saya ingin setup website go-live 30 menit.',
    '',
    '*Detail Pesanan:*',
    `- Paket: ${planName || '-'}${priceLabel}`,
    `- Domain: ${domain || 'belum ditentukan'}`,
    `- Template: ${templateName || 'belum dipilih'}`,
    '',
    'Mohon dibantu proses aktivasi dan pembayarannya.',
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
