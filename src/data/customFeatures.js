/** Estimasi pengerjaan untuk jalur Custom Design (ditampilkan di form & ringkasan). */
export const CUSTOM_TIMELINE = '3–7 hari kerja'

/** Batas karakter catatan brief supaya pesan WhatsApp tetap ringkas. */
export const CUSTOM_NOTES_MAX = 600

/**
 * Opsi fitur khusus untuk mode Custom Design.
 * `icon` mengacu ke peta ikon di src/lib/icons.jsx.
 */
export const CUSTOM_FEATURES = [
  {
    id: 'payment-gateway',
    label: 'Payment Gateway Khusus',
    desc: 'Midtrans / Xendit / QRIS dengan rekonsiliasi otomatis',
    icon: 'wallet',
  },
  {
    id: 'booking-multibranch',
    label: 'Sistem Booking Multi-Cabang',
    desc: 'Jadwal, kuota, dan harga berbeda per outlet',
    icon: 'calendar',
  },
  {
    id: 'pos-erp',
    label: 'Sinkronisasi POS / ERP',
    desc: 'Stok, harga, dan pesanan tersinkron dua arah',
    icon: 'database',
  },
  {
    id: 'multi-language',
    label: 'Multi-Bahasa',
    desc: 'Indonesia / English / Mandarin dengan konten terpisah',
    icon: 'globe',
  },
  {
    id: 'member-loyalty',
    label: 'Fitur Member / Loyalty',
    desc: 'Login member, poin, voucher, dan tier benefit',
    icon: 'users',
  },
  {
    id: 'admin-dashboard',
    label: 'Dashboard Admin & Role Akses',
    desc: 'Kelola konten, pesanan, dan laporan tanpa developer',
    icon: 'grid',
  },
  {
    id: 'api-integration',
    label: 'Integrasi API / Webhook',
    desc: 'Hubungkan CRM, ekspedisi, atau sistem internal',
    icon: 'repeat',
  },
  {
    id: 'custom-cms',
    label: 'CMS Kustom',
    desc: 'Alur editor konten yang mengikuti proses tim Anda',
    icon: 'pen',
  },
]

export const CUSTOM_FEATURE_IDS = CUSTOM_FEATURES.map((feature) => feature.id)

export function featureLabels(ids = []) {
  const set = new Set(ids)
  return CUSTOM_FEATURES.filter((feature) => set.has(feature.id)).map((feature) => feature.label)
}
