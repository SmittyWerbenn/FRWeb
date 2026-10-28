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
    idle: 'border-slate-800/80 bg-white/[0.04] text-slate-400',
    invalid: 'border-rose-400/40 bg-rose-400/[0.07] text-rose-200',
    checking: 'border-indigo-400/40 bg-indigo-400/[0.07] text-indigo-200',
    available: 'border-emerald-400/45 bg-emerald-400/[0.08] text-emerald-200',
    taken: 'border-rose-400/45 bg-rose-400/[0.08] text-rose-200',
    unknown: 'border-amber-400/40 bg-amber-400/[0.07] text-amber-200',
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
          <span className="text-[11px] font-bold uppercase tracking-[0.22em] text-indigo-400">Langkah 2</span>
          <h2 className="mt-2.5 text-[26px] font-extrabold leading-tight tracking-tight text-white sm:text-[34px]">
            Tentukan nama domain bisnis Anda
          </h2>
          <p className="mt-3 max-w-xl text-[14px] leading-relaxed text-slate-400">
            Tulis nama brand tanpa ekstensi, lalu pilih TLD-nya. Sistem langsung mengecek
            ketersediaan dan menyiapkan penyambungan domain saat proses go-live.
          </p>

          <div className="mt-6 rounded-2xl border border-slate-800/80 bg-[#0b1120] p-4 sm:p-5">
            <label htmlFor="domain-name" className="text-[11.5px] font-semibold text-slate-300">
              Nama domain impian
            </label>

            <div className="mt-2 flex flex-col gap-2 sm:flex-row">
              <div className="relative flex-1">
                <Globe className="pointer-events-none absolute left-3.5 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-500" />
                <input
                  id="domain-name"
                  value={order.domainName}
                  onChange={handleChange}
                  placeholder="namabisnis"
                  autoComplete="off"
                  spellCheck={false}
                  aria-describedby="domain-status"
                  className="w-full rounded-xl border border-slate-800/80 bg-white/[0.04] py-3 pl-10 pr-3 text-[14px] font-semibold text-white placeholder:font-normal placeholder:text-slate-500 focus:border-indigo-400/60 focus:bg-white/[0.06] focus:outline-none focus:ring-2 focus:ring-indigo-400/20"
                />
              </div>

              <div className="flex items-center gap-1 rounded-xl border border-slate-800/80 bg-white/[0.03] p-1">
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
                          ? 'bg-white text-[#08111f] shadow-sm'
                          : 'text-slate-400 hover:bg-white/5 hover:text-white'
                      }`}
                    >
                      {option.label}
                    </button>
                  )
                })}
              </div>
            </div>

            <div className="mt-2 flex items-start justify-between gap-3">
              <p className="text-[11px] text-slate-500">
                Ekstensi:{' '}
                <span className="font-semibold text-slate-300">
                  {TLD_OPTIONS.find((option) => option.value === order.tld)?.note ?? '—'}
                </span>
              </p>
              <p className="truncate text-[11.5px] font-semibold text-slate-300">
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
                <p className="text-[10.5px] font-semibold uppercase tracking-wider text-slate-500">
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
                      className="rounded-lg border border-indigo-400/30 bg-indigo-400/10 px-2.5 py-1.5 text-[11.5px] font-semibold text-indigo-200 transition hover:bg-indigo-400/15"
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
                  ? 'bg-gradient-to-r from-indigo-400 to-violet-300 text-[#04121f] shadow-lg shadow-indigo-500/20 hover:brightness-110'
                  : 'cursor-not-allowed border border-slate-800/80 bg-white/[0.03] text-slate-500'
              }`}
            >
              Lanjut: Pilih Desain & Tema
              <ArrowRight className="h-4 w-4" />
            </button>
            <p className="mt-2 text-center text-[10.5px] text-slate-500">
              Ketersediaan dicek real-time ke registry resmi (.com/.net: Verisign, .id/.co.id: PANDI).
              Verifikasi final tetap dilakukan tim kami saat aktivasi.
            </p>
          </div>
        </div>

        <div className="rounded-2xl border border-slate-800/80 bg-[#0b1120] p-5">
          <div className="flex items-center gap-2">
            <span className="grid h-9 w-9 place-items-center rounded-xl bg-emerald-400/12 text-emerald-300 ring-1 ring-inset ring-emerald-400/25">
              <ShieldCheck className="h-4 w-4" />
            </span>
            <div>
              <h3 className="text-[13.5px] font-bold text-white">Sudah termasuk dalam semua paket</h3>
              <p className="text-[11px] text-slate-500">Tanpa biaya tambahan di muka</p>
            </div>
          </div>

          <ul className="mt-4 space-y-2.5">
            {INCLUDED.map((item) => (
              <li key={item} className="flex items-start gap-2 text-[12px] leading-snug text-slate-300">
                <Check className="mt-0.5 h-3.5 w-3.5 shrink-0 text-emerald-300" strokeWidth={3} />
                {item}
              </li>
            ))}
          </ul>

          <div className="mt-5 rounded-xl border border-white/[0.07] bg-white/[0.02] p-3.5">
            <p className="flex items-center gap-1.5 text-[11px] font-bold text-indigo-300">
              <Sparkles className="h-3.5 w-3.5" />
              Sudah punya domain sendiri?
            </p>
            <p className="mt-1.5 text-[11.5px] leading-relaxed text-slate-400">
              Tidak masalah. Cukup siapkan akses DNS-nya, tim kami yang melakukan pointing ke
              website FRWeb tanpa downtime.
            </p>
          </div>

          <div className="mt-4 border-t border-white/[0.07] pt-3.5">
            <p className="text-[10.5px] uppercase tracking-wider text-slate-500">Domain terpilih</p>
            <p className="mt-1 truncate font-mono text-[13px] font-semibold text-white">
              {preview || '—'}
            </p>
          </div>
        </div>
      </div>
    </section>
  )
}
