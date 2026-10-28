/** Estimasi go-live yang dijanjikan ke klien (menit). */
export const GO_LIVE_MINUTES = 30

/**
 * Paket layanan FRWeb.
 * price = null artinya "hubungi WhatsApp" (kustom).
 */
export const PLANS = [
  {
    id: 'starter',
    name: 'Starter',
    price: 1000000,
    priceSuffix: '/ setup awal',
    tagline: 'Website profil bisnis siap tayang',
    bestFor: 'Company profile standar, portofolio jasa lokal, landing page UMKM.',
    accent: '#38bdf8',
    recommended: false,
    specs: [
      'Website company profile siap tayang',
      'Free SSL otomatis (HTTPS aktif)',
      'Setup domain + perpanjangan 1 tahun',
      'Form kontak langsung ke WhatsApp',
      'Halaman cepat & responsif di semua perangkat',
    ],
    notIncluded: ['Database terisolasi', 'Add-on QRIS/gateway otomatis (opsional)', 'Auto-backup harian'],
  },
  {
    id: 'growth',
    name: 'Growth / Performance',
    price: 2500000,
    priceSuffix: '/ setup awal',
    tagline: 'Paling laris untuk bisnis yang mulai ramai',
    bestFor: 'Website dengan trafik ramai, booking slot jam, toko online dinamis, transaksi harian.',
    accent: '#34d399',
    recommended: true,
    badge: 'BEST VALUE',
    specs: [
      'Performa dioptimalkan untuk trafik promo & campaign',
      'Caching cepat + asset CDN',
      'Database terisolasi & aman',
      'Integrasi auto WhatsApp (konfirmasi transfer/QRIS manual)',
      'Proteksi anti-downtime saat trafik promo',
      'Free SSL, setup domain 1 tahun, backup mingguan',
    ],
    notIncluded: [],
  },
  {
    id: 'enterprise',
    name: 'Enterprise',
    price: 5000000,
    priceSuffix: '/ setup awal',
    tagline: 'Untuk operasional multi-cabang tanpa lag',
    bestFor: 'Portal grosir, multi-cabang, reservasi ribuan user harian, traffic tinggi.',
    accent: '#a78bfa',
    recommended: false,
    specs: [
      'Arsitektur siap trafik tinggi & multi-cabang',
      'Antrean transaksi terpisah agar tetap responsif',
      'Auto-backup harian + retensi 30 hari',
      'SLA uptime prioritas 99,9%',
      'Proteksi DDoS & bot tingkat lanjut',
      'Pendampingan teknis khusus (channel prioritas)',
    ],
    notIncluded: [],
  },
  {
    id: 'custom',
    name: 'Custom Solution',
    price: null,
    priceSuffix: '',
    tagline: 'Arsitektur khusus sesuai proses bisnis',
    bestFor: 'Multi-tenant API, ERP/POS kustom, integrasi sistem backend perusahaan.',
    accent: '#fbbf24',
    recommended: false,
    specs: [
      'Arsitektur & scope dirancang bersama tim Anda',
      'Multi-tenant API dan SSO opsional',
      'Integrasi ERP / POS / sistem internal',
      'Kontrak SLA & NDA sesuai kebutuhan',
      'Tim implementasi khusus + dokumentasi',
    ],
    notIncluded: [],
  },
]

export const PLANS_BY_ID = Object.fromEntries(PLANS.map((plan) => [plan.id, plan]))

export const DEFAULT_PLAN_ID = 'growth'

export function getPlan(id) {
  return PLANS_BY_ID[id] ?? PLANS_BY_ID[DEFAULT_PLAN_ID]
}
