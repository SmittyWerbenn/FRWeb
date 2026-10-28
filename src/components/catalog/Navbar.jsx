import { useEffect, useState } from 'react'
import { ArrowUpRight, Menu, MessageCircle, X } from '../../lib/icons'
import { WA_CONSULT } from '../../lib/format'
import { scrollToSection, useOrder } from '../../context/OrderContext'
import Logo from './Logo'

const LINKS = [
  { label: 'Paket', target: 'paket' },
  { label: 'Domain', target: 'domain' },
  { label: 'Desain', target: 'katalog' },
  { label: 'Cara Kerja', target: 'cara-kerja' },
  { label: 'FAQ', target: 'faq' },
]

export default function Navbar() {
  const [open, setOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)
  const { plan } = useOrder()

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 12)
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  const go = (target) => {
    setOpen(false)
    scrollToSection(target)
  }

  return (
    <header
      className={`sticky top-0 z-40 border-b transition-all duration-300 ${
        scrolled ? 'border-slate-800/80 bg-[#080c14]/85 backdrop-blur-xl' : 'border-transparent bg-transparent'
      }`}
    >
      <div className="mx-auto flex h-16 w-full max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
        <Logo onNavigate={() => setOpen(false)} />

        <nav className="hidden items-center gap-1 md:flex">
          {LINKS.map((link) => (
            <button
              key={link.target}
              type="button"
              onClick={() => go(link.target)}
              className="rounded-lg px-3.5 py-2 text-[13px] font-medium text-slate-400 transition hover:bg-white/5 hover:text-white"
            >
              {link.label}
            </button>
          ))}
        </nav>

        <div className="flex items-center gap-2">
          <span className="hidden items-center gap-1.5 rounded-lg border border-slate-800/80 bg-white/[0.03] px-2.5 py-1.5 text-[11px] font-semibold text-slate-300 lg:inline-flex">
            <span className="h-1.5 w-1.5 rounded-full bg-emerald-400" />
            {plan.name}
          </span>
          <button
            type="button"
            onClick={() => go('ringkasan')}
            className="hidden items-center gap-1.5 rounded-xl border border-slate-800/80 px-3.5 py-2 text-[13px] font-semibold text-slate-200 transition hover:border-white/25 hover:bg-white/5 sm:inline-flex"
          >
            Ringkasan
            <ArrowUpRight className="h-3.5 w-3.5" />
          </button>
          <a
            href={WA_CONSULT}
            target="_blank"
            rel="noreferrer"
            className="inline-flex items-center gap-2 rounded-xl bg-gradient-to-r from-indigo-400 to-violet-300 px-3.5 py-2 text-[13px] font-bold text-[#04121f] shadow-lg shadow-indigo-500/20 transition hover:brightness-110 sm:px-4"
          >
            <MessageCircle className="h-4 w-4" />
            <span className="hidden xs:inline">Chat Sales</span>
          </a>
          <button
            type="button"
            aria-label={open ? 'Tutup menu' : 'Buka menu'}
            aria-expanded={open}
            onClick={() => setOpen((value) => !value)}
            className="grid h-9 w-9 place-items-center rounded-lg border border-slate-800/80 text-slate-300 md:hidden"
          >
            {open ? <X className="h-4 w-4" /> : <Menu className="h-4 w-4" />}
          </button>
        </div>
      </div>

      {open && (
        <div className="border-t border-slate-800/80 bg-[#070b14]/95 px-4 pb-4 pt-2 backdrop-blur-xl md:hidden">
          {LINKS.map((link) => (
            <button
              key={link.target}
              type="button"
              onClick={() => go(link.target)}
              className="block w-full rounded-lg px-3 py-2.5 text-left text-sm font-medium text-slate-300 hover:bg-white/5 hover:text-white"
            >
              {link.label}
            </button>
          ))}
          <button
            type="button"
            onClick={() => go('ringkasan')}
            className="mt-2 w-full rounded-lg border border-slate-800/80 px-3 py-2.5 text-left text-sm font-semibold text-slate-200"
          >
            Lihat ringkasan order
          </button>
        </div>
      )}
    </header>
  )
}
