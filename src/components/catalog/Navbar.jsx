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
        scrolled ? 'border-[#E5E7EB] bg-[#F9FAFB]/85 backdrop-blur-xl' : 'border-transparent bg-[#F9FAFB]'
      }`}
    >
      <div className="mx-auto flex h-16 w-full max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
        <Logo tone="light" onNavigate={() => setOpen(false)} />

        <nav className="hidden items-center gap-1 md:flex">
          {LINKS.map((link) => (
            <button
              key={link.target}
              type="button"
              onClick={() => go(link.target)}
              className="rounded-lg px-3.5 py-2 text-[13px] font-medium text-[#4B5563] transition hover:bg-[#F3F4F6] hover:text-[#18181B]"
            >
              {link.label}
            </button>
          ))}
        </nav>

        <div className="flex items-center gap-2">
          <span className="hidden items-center gap-1.5 rounded-full border border-[#E5E7EB] bg-[#F3F4F6] px-2.5 py-1.5 text-[11px] font-medium text-[#374151] lg:inline-flex">
            <span className="h-1.5 w-1.5 rounded-full bg-[#6B7280]" />
            {plan.name}
          </span>
          <button
            type="button"
            onClick={() => go('ringkasan')}
            className="hidden items-center gap-1.5 rounded-full border border-[#E5E7EB] px-3.5 py-2 text-[13px] font-semibold text-[#18181B] transition hover:bg-[#F3F4F6] sm:inline-flex"
          >
            Ringkasan
            <ArrowUpRight className="h-3.5 w-3.5" />
          </button>
          <a
            href={WA_CONSULT}
            target="_blank"
            rel="noreferrer"
            className="inline-flex items-center gap-2 rounded-full bg-[#18181B] px-3.5 py-2 text-[13px] font-semibold text-white transition hover:bg-[#27272A] sm:px-4"
          >
            <MessageCircle className="h-4 w-4" />
            <span className="hidden xs:inline">Chat Sales</span>
          </a>
          <button
            type="button"
            aria-label={open ? 'Tutup menu' : 'Buka menu'}
            aria-expanded={open}
            onClick={() => setOpen((value) => !value)}
            className="grid h-9 w-9 place-items-center rounded-lg border border-[#E5E7EB] text-[#374151] md:hidden"
          >
            {open ? <X className="h-4 w-4" /> : <Menu className="h-4 w-4" />}
          </button>
        </div>
      </div>

      {open && (
        <div className="border-t border-[#E5E7EB] bg-[#F9FAFB]/95 px-4 pb-4 pt-2 backdrop-blur-xl md:hidden">
          {LINKS.map((link) => (
            <button
              key={link.target}
              type="button"
              onClick={() => go(link.target)}
              className="block w-full rounded-lg px-3 py-2.5 text-left text-sm font-medium text-[#4B5563] hover:bg-[#F3F4F6] hover:text-[#18181B]"
            >
              {link.label}
            </button>
          ))}
          <button
            type="button"
            onClick={() => go('ringkasan')}
            className="mt-2 w-full rounded-lg border border-[#E5E7EB] px-3 py-2.5 text-left text-sm font-semibold text-[#18181B]"
          >
            Lihat ringkasan order
          </button>
        </div>
      )}
    </header>
  )
}
