# FRWeb — from FRCloud: Website Instan Go-Live 30 Menit

Landing + katalog template untuk layanan website instan FRWeb: pengunjung memilih paket,
menentukan domain, memilih tema sesuai industri, lalu checkout langsung ke
WhatsApp sales. Tidak ada backend — seluruh alur order berjalan di browser dan diteruskan
sebagai pesan WhatsApp yang sudah terformat.

- Domain produksi: **https://frel.cloud** (custom domain GitHub Pages)
- Alternatif subdomain: ubah `public/CNAME` + `BRAND` di `src/lib/format.js`
- Nomor sales & CS: **6285778185971**

## Stack

| Bagian | Teknologi |
| --- | --- |
| UI | React 19 + Vite 8 |
| Styling | Tailwind CSS 4 (`@tailwindcss/vite`) |
| Ikon | `lucide-react` (dipusatkan di `src/lib/icons.jsx`) |
| State order | React Context + `localStorage` (`frcloud:order:v1`) |
| Lint | oxlint (`npm run lint`) |
| Deploy | GitHub Actions → GitHub Pages (`https://smittywerbenn.github.io/FRWeb/`) |

## Fitur

1. **Hero + stepper 4 langkah** — headline "Go-Live Dalam 30 Menit…", stepper interaktif
   (Pilih Paket → Tentukan Domain → Pilih Desain → Deploy) yang bisa diklik untuk melompat ke form.
2. **Pemilihan paket** — 4 kartu radio-selection: Starter Rp 1.000.000, Growth Rp 2.500.000
   (BEST VALUE), Enterprise Rp 5.000.000, Custom Solution (WhatsApp). Harga & spesifikasi
   bersumber dari `src/data/plans.js`.
3. **Domain input + validator live** — TLD `.com`, `.id`, `.co.id`, `.net`, sanitasi input,
   deteksi TLD yang ikut diketik, simulasi ketersediaan (deterministik, tanpa jaringan),
   rekomendasi alternatif bila domain "terpakai".
4. **Katalog 25 template / 5 kategori** — tiap kategori punya varian visual berlawanan
   (Neon Athletic vs Luxury Country Club, Warm Dining vs Wabi-sabi, Brutalist Grid vs
   Glass Bento, Editorial vs Cyberpunk Spec Grid). Card menampilkan color dots, badge,
   layout type, dan thumbnail yang auto-scroll saat hover. Filter tab: Semua (25),
   Sport & Club (4), F&B (5), Corporate & Service (7), Online Store (6),
   Event & Hospitality (3) + pencarian.
   Tombol **Live Demo** membuka **halaman pratinjau penuh** di route tersendiri
   `/preview/<slug>` (iframe file template 100% viewport, tanpa modal & tanpa scroll-lock),
   lengkap dengan floating bar: kembali ke katalog, nama + kategori template,
   switcher Desktop/Tablet/Mobile, dan CTA WhatsApp prefilled.
   Tautan lama `?preview=slug&viewport=desktop|tablet|mobile` otomatis dialihkan ke URL bersih.
5. **Pilih Tema Ini** — mengunci tema ke ringkasan order, baik dari kartu katalog
   maupun dari halaman pratinjau (state order tetap tersimpan setelah kembali).
6. **Ringkasan order sticky** — paket + harga, domain, template, estimasi go-live 30 menit,
   status kelengkapan, tombol **Proses & Go-Live via WhatsApp**, plus sticky bar checkout di mobile.
7. **WhatsApp automation** — pesan checkout dibentuk `buildOrderLink()`:
   `Halo tim FRWeb, saya ingin setup website go-live 30 menit.` + `*Detail Pesanan:*`
   (Paket, Domain, Template) + permintaan aktivasi & pembayaran.
8. **SEO** — meta OG/Twitter, canonical, JSON-LD (Organization, WebSite, Service + OfferCatalog
   4 paket, ItemList 25 template, FAQPage), `robots.txt`, `sitemap.xml`.

## Struktur

```
src/
├── App.jsx                      # komposisi halaman + pemilih route
├── pages/
│   ├── PreviewPage.jsx          # route /preview/:slug — iframe fullscreen + floating bar
│   └── NotFoundPage.jsx         # 404 slug pratinjau / path tak dikenal
├── context/OrderContext.jsx     # state order (paket, domain, template, add-on) + persistensi
├── data/
│   ├── plans.js                 # 4 paket + harga + spesifikasi
│   ├── categories.js            # 5 kategori katalog
│   ├── index.js                 # agregasi 25 template + metadata + search index
│   ├── templateMeta.js          # variantStyle, colorPalette, layoutType, badgeLabel, skin
│   └── templates/               # data template per kategori (4 varian kontras di variants.js)
├── styles/theme.css             # skin preview (.pv-skin-*) + tilt frame hero
├── lib/
│   ├── format.js                # BRAND, format IDR, generator link WhatsApp
│   ├── router.js                # router path-based, scroll & filter restore, deep link lama
│   ├── domain.js                # sanitasi, validasi, simulasi ketersediaan domain
│   └── icons.jsx                # re-export ikon lucide
├── components/
│   ├── catalog/                 # Navbar, Hero, HeroBrowser, ValueStrip, CatalogSection,
│   │                            # TemplateCard, MiniMockup, ProcessSection, ValueSection,
│   │                            # FaqSection, CtaSection, Footer, Logo
│   ├── order/                   # Stepper, PricingSection, DomainSection, OrderSection
│   └── preview/                 # PreviewFloatingBar + renderer replika company profile
public/                          # CNAME, favicon, robots.txt, sitemap.xml
```

## Menjalankan

```bash
npm install
npm run dev      # http://localhost:5173
npm run lint     # oxlint src
npm run build    # hasil di dist/
npm run preview  # cek hasil build
```

## Konfigurasi cepat

- **Nomor WhatsApp / brand / domain:** `src/lib/format.js` (`SALES_WHATSAPP`, `BRAND`).
- **Harga & spesifikasi paket:** `src/data/plans.js`.
- **TLD & aturan validator:** `src/lib/domain.js` (`TLD_OPTIONS`, `isDomainTaken`).
- **Domain deploy:** `CNAME.example` (custom domain opsional), `index.html` (canonical/OG/JSON-LD),
  `public/robots.txt`, `public/sitemap.xml`.

## Deploy (GitHub Pages)

Live sekarang: **https://frel.cloud/** (custom domain)

1. Push ke branch `main` — workflow `.github/workflows/deploy.yml` menjalankan
   `npm ci → npm run lint → npm run build → deploy-pages`. Build memakai `base: '/'`
   karena domain disajikan dari root, dan `public/CNAME` berisi `frel.cloud`.
   Plugin `spaFallback` di `vite.config.js` menyalin `index.html` menjadi `dist/404.html`
   agar URL dalam seperti `/preview/padel-futsal-master` tetap memuat aplikasi di GitHub Pages.
2. Pages diaktifkan sekali dengan source **GitHub Actions**
   (`gh api -X POST repos/<user>/<repo>/pages -f build_type=workflow`).
3. DNS custom domain `frel.cloud`:
   - `A @ → 185.199.108.153, 185.199.109.153, 185.199.110.153, 185.199.111.153`
   - `CNAME www → <username>.github.io`
4. Aktifkan **Enforce HTTPS** setelah sertifikat terbit.

Catatan: repo ini juga bisa dibuka di `https://smittywerbenn.github.io/FRWeb/` hanya bila
`base` diubah ke `/FRWeb/` (mis. env `VITE_BASE=/FRWeb/` saat build). Jangan dicampur dengan
custom domain — aset akan 404 dan halaman tampil kosong (whitescreen).

## Catatan

- Pengecekan ketersediaan domain adalah **simulasi** (hash deterministik + daftar brand besar).
  Verifikasi final dilakukan tim sales saat aktivasi.
- Data brand, harga, dan ulasan di dalam preview template adalah contoh untuk keperluan demo.
- Order tersimpan di `localStorage` browser; tombol **Reset order** mengembalikan ke paket rekomendasi.
