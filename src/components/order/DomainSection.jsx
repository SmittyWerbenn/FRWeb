import { useEffect, useState } from 'react'
import { ArrowRight, Check, Globe, Loader2, ShieldCheck, Sparkles, X } from '../../lib/icons'
import {
  TLD_OPTIONS,
  checkDomainAvailability,
  fullDomain,
  sanitizeDomainInput,
  validateDomainName,
} from '../../lib/domain'
import { scrollToSection, useOrder } from '../../context/OrderContext'

const INCLUDED = [
  'Free SSL / HTTPS otomatis',
  'DNS pointing & propagasi dipantau',
  'Redirect www dan root domain',
  'Perpanjangan tahun pertama sudah termasuk',
]

export default function DomainSection() {
  const { order, setDomainName, setTld } = useOrder()
  const [status, setStatus] = useState({ state: 'idle', message: '', suggestions: [] })

  useEffect(() => {
    const clean = sanitizeDomainInput(order.domainName)
    if (!clean) {
      setStatus({ state: 'idle', message: '', suggestions: [] })
      return undefined
    }

    const validation = validateDomainName(clean)
    if (validation.state === 'invalid') {
      setStatus({ state: 'invalid', message: validation.message, suggestions: [] })
      return undefined
    }

    let cancelled = false
    const controller = new AbortController()
    setStatus({ state: 'checking', message: '', suggestions: [] })

    const timer = window.setTimeout(() => {
      checkDomainAvailability(clean, order.tld, { signal: controller.signal }).then((result) => {
        if (cancelled) return
        const domain = result.domain || fullDomain(clean, order.tld)
        setStatus({
          state: result.state,
          message:
            result.state === 'available'
              ? `${domain} tersedia — bisa langsung disambungkan saat setup.`
              : result.state === 'taken'
                ? `${domain} tidak tersedia — sudah ada yang menggunakan. Pilih rekomendasi di bawah atau ubah namanya.`
                : `Belum bisa memastikan ${domain} sekarang (registry tidak merespons). Coba lagi sebentar lagi atau lanjutkan — tim kami verifikasi manual.`,
          suggestions: result.suggestions,
        })
      })
    }, 400)

    return () => {
      cancelled = true
      controller.abort()
      window.clearTimeout(timer)
    }
  }, [order.domainName, order.tld])

  const handleChange = (event) => {
    const raw = event.target.value.toLowerCase().slice(0, 64)
    const matchesTld = [...TLD_OPTIONS]
      .sort((a, b) => b.value.length - a.value.length)
      .find((option) => raw.endsWith(option.value) && raw.length > option.value.length)

    if (matchesTld) {
      setTld(matchesTld.value)
      setDomainName(raw.slice(0, -matchesTld.value.length))
      return
    }
    setDomainName(raw)
  }

  const preview = fullDomain(order.domainName, order.tld)

  const statusStyles = {
    idle: 'border-[#E5E7EB] bg-[#F9FAFB] text-[#6B7280]',
    invalid: 'border-rose-400/40 bg-rose-400/[0.07] text-rose-600',
    checking: 'border-[#0B1F3F] bg-[#F3F4F6] text-[#0B1F3F]',
    available: 'border-[#0B1F3F] bg-[#F3F4F6] text-[#0B1F3F]',
    taken: 'border-rose-400/45 bg-rose-400/[0.08] text-rose-600',
    unknown: 'border-[#0B1F3F] bg-[#F3F4F6] text-[#0B1F3F]',
  }

  const StatusIcon =
    status.state === 'available'
      ? Check
      : status.state === 'invalid' || status.state === 'taken'
        ? X
        : status.state === 'checking'
          ? Loader2
          : Globe

  return (
    <section id="domain" className="relative scroll-mt-20 px-4 py-14 sm:px-6 lg:px-8 lg:py-20">
      <div className="mx-auto grid w-full max-w-7xl gap-8 lg:grid-cols-[1.1fr_0.9fr] lg:items-start">
        <div>
          <span className="text-[11px] font-bold uppercase tracking-[0.22em] text-[#0B1F3F]">Langkah 2</span>
          <h2 className="mt-2.5 text-[26px] font-extrabold leading-tight tracking-tight text-[#0B1F3F] sm:text-[34px]">
            Tentukan nama domain bisnis Anda
          </h2>
          <p className="mt-3 max-w-xl text-[14px] leading-relaxed text-[#6B7280]">
            Tulis nama brand tanpa ekstensi, lalu pilih TLD-nya. Sistem langsung mengecek
            ketersediaan dan menyiapkan penyambungan domain saat proses go-live.
          </p>

          <div className="mt-6 rounded-2xl border border-[#E5E7EB] bg-white p-4 sm:p-5">
            <label htmlFor="domain-name" className="text-[11.5px] font-semibold text-[#4B5563]">
              Nama domain impian
            </label>

            <div className="mt-2 flex flex-col gap-2 sm:flex-row">
              <div className="relative flex-1">
                <Globe className="pointer-events-none absolute left-3.5 top-1/2 h-4 w-4 -translate-y-1/2 text-[#6B7280]" />
                <input
                  id="domain-name"
                  value={order.domainName}
                  onChange={handleChange}
                  placeholder="namabisnis"
                  autoComplete="off"
                  spellCheck={false}
                  aria-describedby="domain-status"
                  className="w-full rounded-xl border border-[#E5E7EB] bg-[#F9FAFB] py-3 pl-10 pr-3 text-[14px] font-semibold text-[#0B1F3F] placeholder:font-normal placeholder:text-[#6B7280] focus:border-[#0B1F3F] focus:bg-white focus:outline-none focus:ring-2 focus:ring-[#0B1F3F]/10"
                />
              </div>

              <div className="flex items-center gap-1 rounded-xl border border-[#E5E7EB] bg-[#F9FAFB] p-1">
                {TLD_OPTIONS.map((option) => {
                  const active = option.value === order.tld
                  return (
                    <button
                      key={option.value}
                      type="button"
                      onClick={() => setTld(option.value)}
                      aria-pressed={active}
                      title={option.note}
                      className={`rounded-lg px-2.5 py-2 text-[12px] font-bold transition ${
                        active
                          ? 'bg-white text-[#0B1F3F] shadow-sm'
                          : 'text-[#6B7280] hover:bg-[#F3F4F6] hover:text-[#0B1F3F]'
                      }`}
                    >
                      {option.label}
                    </button>
                  )
                })}
              </div>
            </div>

            <div className="mt-2 flex items-start justify-between gap-3">
              <p className="text-[11px] text-[#6B7280]">
                Ekstensi:{' '}
                <span className="font-semibold text-[#4B5563]">
                  {TLD_OPTIONS.find((option) => option.value === order.tld)?.note ?? '—'}
                </span>
              </p>
              <p className="truncate text-[11.5px] font-semibold text-[#4B5563]">
                {preview || 'namabisnis.com'}
              </p>
            </div>

            <div
              id="domain-status"
              aria-live="polite"
              className={`mt-3 flex items-start gap-2.5 rounded-xl border px-3 py-2.5 text-[12px] leading-snug transition ${statusStyles[status.state]}`}
            >
              <StatusIcon className={`mt-0.5 h-3.5 w-3.5 shrink-0 ${status.state === 'checking' ? 'animate-spin' : ''}`} />
              <span>
                {status.state === 'idle' && 'Mulai ketik nama domain untuk cek ketersediaan otomatis.'}
                {status.state === 'invalid' && status.message}
                {status.state === 'checking' && 'Mengecek langsung ke registry domain (RDAP)…'}
                {status.state === 'available' && status.message}
                {status.state === 'taken' && status.message}
                {status.state === 'unknown' && status.message}
              </span>
            </div>

            {status.state === 'taken' && status.suggestions.length > 0 && (
              <div className="mt-3">
                <p className="text-[10.5px] font-semibold uppercase tracking-wider text-[#6B7280]">
                  Rekomendasi tersedia
                </p>
                <div className="mt-2 flex flex-wrap gap-2">
                  {status.suggestions.map((suggestion) => (
                    <button
                      key={suggestion}
                      type="button"
                      onClick={() => {
                        const detected = [...TLD_OPTIONS]
                          .sort((a, b) => b.value.length - a.value.length)
                          .find((option) => suggestion.endsWith(option.value))
                        if (!detected) return
                        setTld(detected.value)
                        setDomainName(suggestion.slice(0, -detected.value.length))
                      }}
                      className="rounded-lg border border-[#D1D5DB] bg-[#F3F4F6] px-2.5 py-1.5 text-[11.5px] font-semibold text-[#0B1F3F] transition hover:bg-[#F3F4F6]"
                    >
                      {suggestion}
                    </button>
                  ))}
                </div>
              </div>
            )}

            <button
              type="button"
              onClick={() => scrollToSection('katalog')}
              disabled={status.state !== 'available' && status.state !== 'unknown'}
              className={`mt-4 inline-flex w-full items-center justify-center gap-2 rounded-xl px-4 py-3 text-[13px] font-bold transition ${
                status.state === 'available' || status.state === 'unknown'
                  ? 'bg-[#0B1F3F] text-white  hover:bg-[#17315F]'
                  : 'cursor-not-allowed border border-[#E5E7EB] bg-[#F9FAFB] text-[#6B7280]'
              }`}
            >
              Lanjut: Pilih Desain & Tema
              <ArrowRight className="h-4 w-4" />
            </button>
            <p className="mt-2 text-center text-[10.5px] text-[#6B7280]">
              Ketersediaan dicek real-time ke registry resmi (.com/.net: Verisign, .id/.co.id: PANDI).
              Verifikasi final tetap dilakukan tim kami saat aktivasi.
            </p>
          </div>
        </div>

        <div className="rounded-2xl border border-[#E5E7EB] bg-white p-5">
          <div className="flex items-center gap-2">
            <span className="grid h-9 w-9 place-items-center rounded-xl bg-[#F3F4F6] text-[#0B1F3F] ring-1 ring-inset ring-[#D1D5DB]">
              <ShieldCheck className="h-4 w-4" />
            </span>
            <div>
              <h3 className="text-[13.5px] font-bold text-[#0B1F3F]">Sudah termasuk dalam semua paket</h3>
              <p className="text-[11px] text-[#6B7280]">Tanpa biaya tambahan di muka</p>
            </div>
          </div>

          <ul className="mt-4 space-y-2.5">
            {INCLUDED.map((item) => (
              <li key={item} className="flex items-start gap-2 text-[12px] leading-snug text-[#4B5563]">
                <Check className="mt-0.5 h-3.5 w-3.5 shrink-0 text-[#0B1F3F]" strokeWidth={3} />
                {item}
              </li>
            ))}
          </ul>

          <div className="mt-5 rounded-xl border border-[#E5E7EB] bg-[#F9FAFB] p-3.5">
            <p className="flex items-center gap-1.5 text-[11px] font-bold text-[#0B1F3F]">
              <Sparkles className="h-3.5 w-3.5" />
              Sudah punya domain sendiri?
            </p>
            <p className="mt-1.5 text-[11.5px] leading-relaxed text-[#6B7280]">
              Tidak masalah. Cukup siapkan akses DNS-nya, tim kami yang melakukan pointing ke
              website FRWeb tanpa downtime.
            </p>
          </div>

          <div className="mt-4 border-t border-[#E5E7EB] pt-3.5">
            <p className="text-[10.5px] uppercase tracking-wider text-[#6B7280]">Domain terpilih</p>
            <p className="mt-1 truncate font-mono text-[13px] font-semibold text-[#0B1F3F]">
              {preview || '—'}
            </p>
          </div>
        </div>
      </div>
    </section>
  )
}
