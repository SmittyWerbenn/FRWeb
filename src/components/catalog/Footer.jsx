import { Mail, MapPin, MessageCircle, Phone } from '../../lib/icons'
import { BRAND, SALES_WHATSAPP, SALES_WHATSAPP_DISPLAY, WA_CONSULT } from '../../lib/format'
import { CATEGORIES, countByCategory } from '../../data'
import { scrollToSection } from '../../context/OrderContext'
import Logo from './Logo'

const displayPhone = SALES_WHATSAPP_DISPLAY

const ORDER_LINKS = [
  { label: '1. Pilih paket', target: 'paket' },
  { label: '2. Tentukan domain', target: 'domain' },
  { label: '3. Pilih desain & tema', target: 'katalog' },
  { label: '4. Ringkasan & checkout', target: 'ringkasan' },
]

export default function Footer() {
  return (
    <footer className="relative border-t border-slate-800/80 bg-[#04070d] px-4 pb-24 pt-12 sm:px-6 lg:px-8 lg:pb-8">
      <div className="mx-auto w-full max-w-7xl">
        <div className="grid gap-9 sm:grid-cols-2 lg:grid-cols-[1.4fr_1fr_1fr_1.1fr]">
          <div>
            <Logo />
            <p className="mt-4 max-w-xs text-[12.5px] leading-relaxed text-slate-400">
              FRWeb from FRCloud menyiapkan website resmi bisnis Anda dalam 30 menit: pilih paket,
              tentukan domain, pilih tema — langsung online.
            </p>
            <a
              href={WA_CONSULT}
              target="_blank"
              rel="noreferrer"
              className="mt-5 inline-flex items-center gap-2 rounded-lg border border-emerald-400/25 bg-emerald-400/10 px-3.5 py-2 text-[12px] font-semibold text-emerald-200 transition hover:bg-emerald-400/15"
            >
              <MessageCircle className="h-3.5 w-3.5" />
              Chat sales FRWeb
            </a>
          </div>

          <div>
            <h3 className="text-[11px] font-bold uppercase tracking-[0.18em] text-slate-500">Alur Order</h3>
            <ul className="mt-4 space-y-2.5">
              {ORDER_LINKS.map((item) => (
                <li key={item.target}>
                  <button
                    type="button"
                    onClick={() => scrollToSection(item.target)}
                    className="text-left text-[12.5px] text-slate-400 transition hover:text-white"
                  >
                    {item.label}
                  </button>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h3 className="text-[11px] font-bold uppercase tracking-[0.18em] text-slate-500">Kategori</h3>
            <ul className="mt-4 space-y-2.5">
              {CATEGORIES.filter((item) => item.id !== 'all').map((item) => (
                <li key={item.id}>
                  <button
                    type="button"
                    onClick={() => scrollToSection('katalog')}
                    className="flex w-full items-center justify-between gap-2 text-left text-[12.5px] text-slate-400 transition hover:text-white"
                  >
                    {item.label}
                    <span className="text-[10.5px] text-slate-600">{countByCategory(item.id)}</span>
                  </button>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h3 className="text-[11px] font-bold uppercase tracking-[0.18em] text-slate-500">Kontak</h3>
            <ul className="mt-4 space-y-3 text-[12.5px] text-slate-400">
              <li>
                <a
                  href={`https://wa.me/${SALES_WHATSAPP}`}
                  target="_blank"
                  rel="noreferrer"
                  className="flex items-center gap-2.5 transition hover:text-white"
                >
                  <Phone className="h-3.5 w-3.5 text-slate-500" />
                  {displayPhone}
                </a>
              </li>
              <li>
                <a href={`mailto:${BRAND.email}`} className="flex items-center gap-2.5 transition hover:text-white">
                  <Mail className="h-3.5 w-3.5 text-slate-500" />
                  {BRAND.email}
                </a>
              </li>
              <li className="flex items-start gap-2.5">
                <MapPin className="mt-0.5 h-3.5 w-3.5 shrink-0 text-slate-500" />
                <span>
                  {BRAND.city}
                  <br />
                  <span className="text-slate-500">Melayani seluruh Indonesia</span>
                </span>
              </li>
            </ul>
          </div>
        </div>

        <div className="mt-10 flex flex-col gap-3 border-t border-white/[0.07] pt-5 sm:flex-row sm:items-center sm:justify-between">
          <p className="text-[11px] text-slate-500">
            © {new Date().getFullYear()} {BRAND.name}. Seluruh hak cipta dilindungi.
          </p>
          <p className="text-[11px] text-slate-600">
            Nama brand, harga, dan ulasan di dalam preview template adalah contoh untuk keperluan demo.
          </p>
        </div>
      </div>
    </footer>
  )
}
