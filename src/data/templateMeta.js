/**
 * Metadata diferensiasi visual per template.
 *
 * Dipisah dari data konten agar katalog 18 template tetap modular:
 * - variantStyle : nama gaya visual yang tampil di card + filter pembaca
 * - colorPalette : 4 hex yang dipakai untuk color dots di card
 * - layoutType   : ringkasan struktur layout (hero, grid, dsb.)
 * - badgeLabel   : label kecil di sudut card
 * - skin         : kelas skin untuk live preview (lihat index.css `.pv-skin-*`)
 */
export const TEMPLATE_META = {
  /* ── Sport & Club ─────────────────────────────────────────────────────── */
  'padel-futsal-master': {
    industry: 'Padel & futsal',
    variantStyle: 'Neon Athletic & Energetic',
    colorPalette: ['#052A20', '#C8FF3D', '#10B981', '#ECFBEF'],
    layoutType: 'Split hero + live slot grid',
    badgeLabel: 'Best Seller',
    skin: 'neon',
  },
  'gym-studio-flow': {
    industry: 'Gym & studio',
    variantStyle: 'Soft Athletic Editorial',
    colorPalette: ['#0C0C12', '#A3E635', '#6366F1', '#F4F4F5'],
    layoutType: 'Editorial hero + class timetable',
    badgeLabel: 'Recommended',
    skin: 'athletic',
  },
  'spacerent-venue': {
    industry: 'Venue & sewa tempat',
    variantStyle: 'Warm Event Classic',
    colorPalette: ['#2C1810', '#D9A05B', '#7C3AED', '#FAF3E7'],
    layoutType: 'Gallery hero + availability table',
    badgeLabel: 'Favorit',
    skin: 'warm',
  },
  'padel-country-club': {
    industry: 'Private padel club',
    variantStyle: 'Luxury Country Club',
    colorPalette: ['#10281F', '#D4AF37', '#0F3D2E', '#FAF6EA'],
    layoutType: 'Serif editorial + membership tier list',
    badgeLabel: 'Varian Baru',
    skin: 'luxury',
  },

  /* ── F&B ──────────────────────────────────────────────────────────────── */
  'restodine-vip': {
    industry: 'Restoran & fine dining',
    variantStyle: 'Warm Contemporary Dining',
    colorPalette: ['#2A1708', '#E9A23B', '#C2410C', '#FDF4E7'],
    layoutType: 'Image-led hero + reservation widget',
    badgeLabel: 'Best Seller',
    skin: 'warm',
  },
  'cateringpro-box': {
    industry: 'Catering & event',
    variantStyle: 'Street Industrial Grunge',
    colorPalette: ['#1A1A1A', '#F97316', '#78716C', '#F5F5F4'],
    layoutType: 'Dense package grid + calculator',
    badgeLabel: 'Recommended',
    skin: 'grunge',
  },
  'directbumbu-frozendirect': {
    industry: 'Frozen food D2C',
    variantStyle: 'Bold D2C Commerce',
    colorPalette: ['#3B0764', '#F59E0B', '#EC4899', '#FDF2F8'],
    layoutType: 'Product grid + cart drawer',
    badgeLabel: 'Favorit',
    skin: 'default',
  },
  'fnb-wabisabi-omakase': {
    industry: 'Omakase & kappo',
    variantStyle: 'Japanese Minimalist Wabi-sabi',
    colorPalette: ['#26231C', '#8C9A72', '#7A5C42', '#F6F2E7'],
    layoutType: 'Serif minimal + counter reservation',
    badgeLabel: 'Varian Baru',
    skin: 'wabi',
  },

  /* ── Online Store ─────────────────────────────────────────────────────── */
  'customcraft-furniture': {
    industry: 'Furniture custom',
    variantStyle: 'Clean High-Fashion Editorial',
    colorPalette: ['#2B2118', '#B08968', '#8C6A4A', '#F7F4EF'],
    layoutType: 'Gallery editorial + size simulator',
    badgeLabel: 'Recommended',
    skin: 'editorial',
  },
  'materialhub-bangunan': {
    industry: 'Material bangunan',
    variantStyle: 'Cyberpunk Tech Spec Grid',
    colorPalette: ['#0F172A', '#38BDF8', '#A855F7', '#E2E8F0'],
    layoutType: 'Spec grid + bulk RFQ table',
    badgeLabel: 'Premium',
    skin: 'cyber',
  },
  'florist-bloom-express': {
    industry: 'Florist & gift',
    variantStyle: 'Soft Editorial Bloom',
    colorPalette: ['#3F1D2B', '#F472B6', '#FBBF24', '#FFF1F2'],
    layoutType: 'Airy hero + same-day product grid',
    badgeLabel: 'Favorit',
    skin: 'editorial',
  },
  'grosirpangan-sembako': {
    industry: 'Grosir sembako',
    variantStyle: 'Utilitarian High-Density',
    colorPalette: ['#1C1917', '#22C55E', '#EAB308', '#FAFAF9'],
    layoutType: 'Dense price table + RFQ',
    badgeLabel: 'Best Seller',
    skin: 'default',
  },
  'ecom-cyber-spec': {
    industry: 'Gadget & komponen',
    variantStyle: 'Cyberpunk Tech Spec Grid',
    colorPalette: ['#0A0F1F', '#22D3EE', '#C026D3', '#F1F5F9'],
    layoutType: 'Datasheet grid + filter teknis',
    badgeLabel: 'Varian Baru',
    skin: 'cyber',
  },

  /* ── Corporate & Agency ───────────────────────────────────────────────── */
  'konveksi-print-apparel': {
    industry: 'Konveksi & sablon',
    variantStyle: 'Practical Commerce Warm',
    colorPalette: ['#241407', '#F97316', '#EA580C', '#FAF6F2'],
    layoutType: 'Tier calculator + production tracker',
    badgeLabel: 'Best Seller',
    skin: 'default',
  },
  'autocare-detailing': {
    industry: 'Auto detailing',
    variantStyle: 'Gloss Dark Automotive',
    colorPalette: ['#0B1220', '#0EA5E9', '#F43F5E', '#F1F5F9'],
    layoutType: 'Dark hero + service package cards',
    badgeLabel: 'Premium',
    skin: 'cyber',
  },
  'petcare-clinic': {
    industry: 'Klinik hewan',
    variantStyle: 'Soft Glassmorphic Bento',
    colorPalette: ['#134E4A', '#5EEAD4', '#60A5FA', '#F0FDFA'],
    layoutType: 'Bento grid + appointment booking',
    badgeLabel: 'Favorit',
    skin: 'glass',
  },
  'rentalarmada-express': {
    industry: 'Rental armada',
    variantStyle: 'Corporate Fleet Clean',
    colorPalette: ['#0C1D3A', '#3B82F6', '#F59E0B', '#EFF6FF'],
    layoutType: 'Fleet table + instant quote',
    badgeLabel: 'Recommended',
    skin: 'default',
  },
  'agency-brutalist-atelier': {
    industry: 'Creative agency',
    variantStyle: 'High-Contrast Brutalist Grid',
    colorPalette: ['#0B0B0B', '#FF4D00', '#0B0B0B', '#FFFFFF'],
    layoutType: 'Brutalist grid + discovery call booking',
    badgeLabel: 'Varian Baru',
    skin: 'brutalist',
  },
}

/** Fallback aman untuk template yang belum punya entri meta. */
export function metaFor(template) {
  return (
    TEMPLATE_META[template.id] ?? {
      industry: template.bestFor,
      variantStyle: 'Signature Classic',
      colorPalette: [
        template.theme.ink,
        template.theme.accent,
        template.theme.accent2,
        template.theme.tint,
      ],
      layoutType: 'Company profile lengkap',
      badgeLabel: template.badge || 'Template',
      skin: 'default',
    }
  )
}
