/**
 * Dataset katalog template FRWeb — 25 template dengan file HTML statis mandiri.
 * Sumber file: `public/assets/template/[id].html` (di-copy dari paket desain),
 * thumbnail representatif: `public/assets/template/thumbs/[id].jpg` (screenshot nyata).
 */

const BASE = import.meta.env.BASE_URL || '/'

const assetUrl = (path) => `${BASE.replace(/\/+$/, '/')}${path.replace(/^\/+/, '')}`

const RAW_TEMPLATES = [
  // Sport & Club
  { id: 'padel-futsal-master', name: 'Padel & Futsal Master', category: 'sports', categoryLabel: 'Sport & Club', features: ['Booking lapangan real-time', 'DP QRIS', 'Invoice otomatis'], accentColor: '#10B981', badge: 'Populer', description: 'Solusi booking lapangan olahraga anti double-booking.' },
  { id: 'gym-studio-flow', name: 'Gym & Studio Flow', category: 'sports', categoryLabel: 'Sport & Club', features: ['Kuota kelas harian', 'Booking sesi', 'Membership tracker'], accentColor: '#06B6D4', description: 'Platform reservasi kelas gym & studio kebugaran.' },
  { id: 'spacerent-venue', name: 'SpaceRent Venue', category: 'sports', categoryLabel: 'Sport & Club', features: ['Sewa venue harian/half-day', 'E-contract', 'Add-on sound/proyektor'], accentColor: '#6366F1', description: 'Manajemen sewa ruangan pertemuan & hall acara.' },
  { id: 'padel-country-club', name: 'Padel Country Club', category: 'sports', categoryLabel: 'Sport & Club', features: ['Private court', 'Membership tier', 'Lounge reservation'], accentColor: '#F59E0B', description: 'Eksklusif country club & private padel court.' },

  // F&B
  { id: 'restodine-vip', name: 'RestoDine VIP', category: 'fnb', categoryLabel: 'F&B', features: ['Reservasi meja & VIP room', 'Deposit anti no-show', 'Auto WA notif'], accentColor: '#EF4444', badge: 'Favorit', description: 'Reservasi meja restoran dengan komitmen deposit.' },
  { id: 'cateringpro-box', name: 'CateringPro Box', category: 'fnb', categoryLabel: 'F&B', features: ['Kalkulator pax dinamis', 'Kustom lauk', 'Jadwal kirim'], accentColor: '#F97316', description: 'Kalkulator pemesanan paket catering event & harian.' },
  { id: 'directbumbu-frozendirect', name: 'DirectBumbu / FrozenDirect', category: 'fnb', categoryLabel: 'F&B', features: ['Toko D2C tanpa fee ojol', 'Ongkir otomatis', 'Checkout WA'], accentColor: '#14B8A6', description: 'Jual langsung makanan beku & bumbu siap saji.' },
  { id: 'fnb-wabisabi-omakase', name: 'Kaze Omakase', category: 'fnb', categoryLabel: 'F&B', features: ['Omakase counter 10 seat', 'Reservasi tenang', 'Pre-payment'], accentColor: '#78716C', description: 'Tampilan premium dining bernuansa Jepang modern.' },
  { id: 'quadra-coffee-shop', name: 'Quadra Coffee Shop', category: 'fnb', categoryLabel: 'F&B', features: ['Menu signature interaktif', 'Reservasi slow bar', 'Takeaway via WA'], accentColor: '#B45309', description: 'Showcase coffee shop artisan & order takeaway.' },

  // Online Store & Retail
  { id: 'customcraft-furniture', name: 'CustomCraft Furniture', category: 'retail', categoryLabel: 'Online Store', features: ['Galeri portofolio', 'Simulator ukuran bahan', 'Brief custom'], accentColor: '#84CC16', description: 'Katalog custom furniture & interior workshop.' },
  { id: 'materialhub-bangunan', name: 'MaterialHub Bangunan', category: 'retail', categoryLabel: 'Online Store', features: ['Katalog ribuan produk', 'Keranjang RFQ grosir', 'Harga partai'], accentColor: '#EAB308', description: 'Portal B2B bahan bangunan & request for quote.' },
  { id: 'florist-bloom-express', name: 'Florist Bloom Express', category: 'retail', categoryLabel: 'Online Store', features: ['Visualizer buket', 'Greeting card kustom', 'Pemilih jam antar'], accentColor: '#EC4899', description: 'Toko karangan bunga dengan pengiriman terjadwal.' },
  { id: 'grosirpangan-sembako', name: 'GrosirPangan Sembako', category: 'retail', categoryLabel: 'Online Store', features: ['Portal tier agen', 'Batas minimum order (MOQ)', 'Repeat order cepat'], accentColor: '#22C55E', description: 'Distribusi sembako partai besar & reseller.' },
  { id: 'ecom-cyber-spec', name: 'NeonSpec Store', category: 'retail', categoryLabel: 'Online Store', features: ['Spec grid ala datasheet', 'Filter teknis', 'Checkout cepat'], accentColor: '#06B6D4', description: 'Etalase gadget & komponen elektronik futuristik.' },
  { id: 'led-vista-indonesia', name: 'LED Vista Indonesia', category: 'retail', categoryLabel: 'Online Store', features: ['Katalog jual & sewa LED', 'Kalkulator pitch modul', 'Form RFQ proyek'], accentColor: '#3B82F6', description: 'Penyedia videotron, LED display indoor/outdoor.' },

  // Corporate, Services & Agency
  { id: 'konveksi-print-apparel', name: 'KonveksiPrint Apparel', category: 'service', categoryLabel: 'Corporate & Service', features: ['Kalkulator harga lusinan', 'Upload mock-up', 'Tracking produksi'], accentColor: '#8B5CF6', description: 'Vendor seragam & apparel dengan kalkulator otomatis.' },
  { id: 'autocare-detailing', name: 'AutoCare Detailing & Wash', category: 'service', categoryLabel: 'Corporate & Service', features: ['Booking servis berkala', 'Paket coating', 'Input plat nopol'], accentColor: '#3B82F6', description: 'Sistem booking antrean salon mobil & detailing.' },
  { id: 'petcare-clinic', name: 'PetCare Clinic', category: 'service', categoryLabel: 'Corporate & Service', features: ['Reservasi grooming', 'Kalender vet', 'Riwayat vaksin'], accentColor: '#10B981', description: 'Klinik hewan peliharaan, grooming & pet hotel.' },
  { id: 'rentalarmada-express', name: 'RentalArmada Express', category: 'service', categoryLabel: 'Corporate & Service', features: ['Ketersediaan armada', 'Kalkulator luar kota', 'Upload KTP/SIM'], accentColor: '#F59E0B', description: 'Sewa mobil harian & bulanan siap lepas kunci.' },
  { id: 'sinar-trans-express', name: 'Sinar Trans Express', category: 'service', categoryLabel: 'Corporate & Service', features: ['Cek tarif ongkir', 'Live tracking resi', 'Request pickup cargo'], accentColor: '#DC2626', description: 'Jasa ekspedisi kargo darat, laut, dan udara.' },
  { id: 'fortis-realty', name: 'Fortis Realty', category: 'service', categoryLabel: 'Corporate & Service', features: ['Listing properti premium', 'Simulasi KPR', 'Booking jadwal survei'], accentColor: '#0EA5E9', description: 'Kantor broker properti residensial & komersial.' },
  { id: 'agency-brutalist-atelier', name: 'Studio//Raw', category: 'service', categoryLabel: 'Corporate & Service', features: ['Brutalist grid', 'Case study tebal', 'Booking discovery call'], accentColor: '#E11D48', description: 'Desain agensi berkarakter berani & editorial.' },

  // Event & Hospitality
  { id: 'golden-vista-tour', name: 'Golden Vista Tour', category: 'events', categoryLabel: 'Event & Hospitality', features: ['Paket open/private trip', 'Itinerary interaktif', 'Booking kuota'], accentColor: '#FBBF24', description: 'Biro perjalanan wisata domestik & mancanegara.' },
  { id: 'fine-wo', name: 'Fine WO', category: 'events', categoryLabel: 'Event & Hospitality', features: ['Showcase tema nikah', 'Perbandingan paket wedding', 'Konsultasi tanggal'], accentColor: '#F472B6', description: 'Wedding planner & organizer hari bahagia.' },
  { id: 'ala-carte-eo', name: 'Ala Carte Event Organizer', category: 'events', categoryLabel: 'Event & Hospitality', features: ['Estimasi budget event', 'Portofolio gathering', 'Form brief acara'], accentColor: '#A855F7', description: 'Penyelenggara corporate event & festival musik.' },
]

export const TEMPLATE_CATALOG = RAW_TEMPLATES.map((item) => ({
  ...item,
  htmlPath: assetUrl(`assets/template/${item.id}.html`),
  liveUrl: assetUrl(`assets/template/${item.id}.html`),
  thumbnail: assetUrl(`assets/template/thumbs/${item.id}.jpg`),
}))

export const TEMPLATE_CATALOG_BY_ID = Object.fromEntries(
  TEMPLATE_CATALOG.map((item) => [item.id, item]),
)

export const catalogHtmlPath = (id) => assetUrl(`assets/template/${id}.html`)
export const catalogThumbPath = (id) => assetUrl(`assets/template/thumbs/${id}.jpg`)
export { assetUrl }
