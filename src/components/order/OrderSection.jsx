import { ArrowRight, Check, Clock, CreditCard, Globe, Layers, MessageCircle, RotateCcw, ShieldCheck, Zap } from '../../lib/icons'
import { formatIDR } from '../../lib/format'
import { scrollToSection, useOrder } from '../../context/OrderContext'

const AFTER_CHECKOUT = [
  {
    title: 'Kirim detail order via WhatsApp',
    desc: 'Pesan otomatis berisi paket, domain, dan tema terkirim ke tim sales FRWeb.',
  },
  {
    title: 'Konfirmasi & pembayaran',
    desc: 'Invoice resmi dikirim, pembayaran via transfer atau QRIS, langsung diverifikasi.',
  },
  {
    title: 'Deploy & website aktif',
    desc: 'Website, SSL, dan tema dipasang otomatis. Website online dalam ± 30 menit.',
  },
]

function SummaryRow({ icon: Icon, label, value, action, tone = 'default' }) {
  return (
    <div className="flex items-start gap-3 border-b border-white/[0.06] py-3 last:border-0">
      <span className="mt-0.5 grid h-7 w-7 shrink-0 place-items-center rounded-lg bg-white/[0.05] text-slate-400">
        <Icon className="h-3.5 w-3.5" />
      </span>
      <div className="min-w-0 flex-1">
        <p className="text-[10px] uppercase tracking-wider text-slate-500">{label}</p>
        <p className={`mt-0.5 truncate text-[12.5px] font-semibold ${tone === 'muted' ? 'text-slate-500' : 'text-white'}`}>
          {value}
        </p>
      </div>
      {action}
    </div>
  )
}

export default function OrderSection() {
  const {
    plan,
    template,
    domain,
    domainCheck,
    isTemplateReady,
    checkoutReady,
    waOrderLink,
    resetOrder,
    clearTemplate,
  } = useOrder()

  const isCustom = plan.price === null
  const totalLabel = isCustom ? 'Custom' : formatIDR(plan.price)

  const checklist = [
    {
      id: 'paket',
      target: 'paket',
      icon: CreditCard,
      label: 'Paket',
      value: `${plan.name}${isCustom ? '' : ` — ${formatIDR(plan.price)}`}`,
      done: true,
    },
    {
      id: 'domain',
      target: 'domain',
      icon: Globe,
      label: 'Nama domain',
      value: domainCheck.state === 'valid' && domain ? domain : 'Belum dipilih',
      done: domainCheck.state === 'valid',
    },
    {
      id: 'template',
      target: 'katalog',
      icon: Layers,
      label: 'Desain & tema',
      value: template ? template.name : 'Belum dipilih',
      done: isTemplateReady,
    },
  ]

  return (
    <section id="ringkasan" className="relative scroll-mt-20 px-4 py-14 sm:px-6 lg:px-8 lg:py-20">
      <div className="mx-auto w-full max-w-7xl">
        <div className="max-w-2xl">
          <span className="text-[11px] font-bold uppercase tracking-[0.22em] text-indigo-400">Langkah 4</span>
          <h2 className="mt-2.5 text-[26px] font-extrabold leading-tight tracking-tight text-white sm:text-[34px]">
            Ringkasan pesanan &amp; go-live 30 menit
          </h2>
          <p className="mt-3 text-[14px] leading-relaxed text-slate-400">
            Periksa kembali pilihan Anda. Satu klik akan mengirim detail order ke WhatsApp tim
            FRWeb, lalu website Anda disiapkan dan aktif dalam ± 30 menit.
          </p>
        </div>

        <div className="mt-8 grid gap-5 lg:grid-cols-[1fr_0.85fr] lg:items-start">
          <div className="space-y-4">
            <div className="rounded-2xl border border-slate-800/80 bg-[#0b1120] p-4 sm:p-5">
              <div className="flex items-center justify-between">
                <h3 className="text-[13px] font-bold text-white">Kelengkapan order</h3>
                <span className="rounded-full border border-slate-800/80 bg-white/[0.03] px-2 py-0.5 text-[10px] font-semibold text-slate-400">
                  {checklist.filter((item) => item.done).length} / 3 siap
                </span>
              </div>

              <div className="mt-3 divide-y divide-white/[0.06]">
                {checklist.map((item) => {
                  const Icon = item.icon
                  return (
                    <div key={item.id} className="flex items-center gap-3 py-3">
                      <span
                        className={`grid h-8 w-8 shrink-0 place-items-center rounded-lg ${
                          item.done ? 'bg-emerald-400/12 text-emerald-300' : 'bg-white/[0.05] text-slate-500'
                        }`}
                      >
                        {item.done ? <Check className="h-4 w-4" strokeWidth={3} /> : <Icon className="h-4 w-4" />}
                      </span>
                      <div className="min-w-0 flex-1">
                        <p className="text-[12.5px] font-semibold text-white">{item.label}</p>
                        <p className={`truncate text-[11.5px] ${item.done ? 'text-slate-300' : 'text-slate-500'}`}>
                          {item.value}
                        </p>
                      </div>
                      <button
                        type="button"
                        onClick={() => scrollToSection(item.target)}
                        className="shrink-0 rounded-lg border border-slate-800/80 px-2.5 py-1.5 text-[10.5px] font-semibold text-slate-300 transition hover:border-white/25 hover:bg-white/5"
                      >
                        {item.done ? 'Ubah' : 'Isi'}
                      </button>
                    </div>
                  )
                })}
              </div>
            </div>

            <div className="rounded-2xl border border-slate-800/80 bg-[#0b1120] p-4 sm:p-5">
              <h3 className="flex items-center gap-1.5 text-[13px] font-bold text-white">
                <Zap className="h-3.5 w-3.5 text-amber-300" />
                Setelah checkout
              </h3>
              <ol className="mt-3 space-y-3">
                {AFTER_CHECKOUT.map((step, index) => (
                  <li key={step.title} className="flex gap-3">
                    <span className="grid h-6 w-6 shrink-0 place-items-center rounded-full bg-indigo-400/12 font-mono text-[10px] font-bold text-indigo-300">
                      {index + 1}
                    </span>
                    <div>
                      <p className="text-[12px] font-semibold text-white">{step.title}</p>
                      <p className="mt-0.5 text-[11.5px] leading-relaxed text-slate-400">{step.desc}</p>
                    </div>
                  </li>
                ))}
              </ol>
            </div>

            <div className="flex items-start gap-2.5 rounded-xl border border-emerald-400/20 bg-emerald-400/[0.05] px-3.5 py-3 text-[11.5px] leading-relaxed text-emerald-100/80">
              <ShieldCheck className="mt-0.5 h-4 w-4 shrink-0 text-emerald-300" />
              Garansi revisi konten 7 hari dan uang kembali jika website tidak bisa online dalam
              24 jam setelah pembayaran.
            </div>
          </div>

          <div className="lg:sticky lg:top-24">
            <div className="overflow-hidden rounded-2xl border border-slate-800/80 bg-[#0b1120] shadow-2xl shadow-black/40">
              <div className="flex items-center justify-between border-b border-slate-800/80 bg-gradient-to-r from-indigo-500/10 via-transparent to-emerald-400/10 px-4 py-3">
                <h3 className="text-[13px] font-bold text-white">Detail Pesanan</h3>
                <span className="inline-flex items-center gap-1 rounded-full bg-emerald-400/12 px-2 py-0.5 text-[10px] font-bold text-emerald-300">
                  <Clock className="h-2.5 w-2.5" />
                  ± 30 menit
                </span>
              </div>

              <div className="px-4 py-1">
                <SummaryRow
                  icon={CreditCard}
                  label="Paket"
                  value={`${plan.name}${isCustom ? ' — hubungi kami' : ` (${formatIDR(plan.price)})`}`}
                  action={
                    <button
                      type="button"
                      onClick={() => scrollToSection('paket')}
                      className="text-[10.5px] font-semibold text-slate-400 hover:text-white"
                    >
                      Ubah
                    </button>
                  }
                />
                <SummaryRow
                  icon={Globe}
                  label="Domain"
                  value={domain || 'Belum dipilih'}
                  tone={domain ? 'default' : 'muted'}
                  action={
                    <button
                      type="button"
                      onClick={() => scrollToSection('domain')}
                      className="text-[10.5px] font-semibold text-slate-400 hover:text-white"
                    >
                      Ubah
                    </button>
                  }
                />
                <SummaryRow
                  icon={Layers}
                  label="Template"
                  value={template ? template.name : 'Belum dipilih'}
                  tone={template ? 'default' : 'muted'}
                  action={
                    template ? (
                      <button
                        type="button"
                        onClick={clearTemplate}
                        className="text-[10.5px] font-semibold text-slate-400 hover:text-white"
                      >
                        Hapus
                      </button>
                    ) : (
                      <button
                        type="button"
                        onClick={() => scrollToSection('katalog')}
                        className="text-[10.5px] font-semibold text-slate-400 hover:text-white"
                      >
                        Pilih
                      </button>
                    )
                  }
                />
                <SummaryRow icon={Clock} label="Estimasi go-live" value="30 menit setelah pembayaran" />
              </div>

              <div className="border-t border-slate-800/80 px-4 py-3">
                <div className="flex items-end justify-between">
                  <div>
                    <p className="text-[10px] uppercase tracking-wider text-slate-500">Total setup</p>
                    <p className="mt-0.5 text-[20px] font-extrabold leading-none text-white">{totalLabel}</p>
                  </div>
                  <p className="text-right text-[10px] leading-snug text-slate-500">
                    sekali bayar
                    <br />
                    tanpa biaya tersembunyi
                  </p>
                </div>

                {checkoutReady ? (
                  <a
                    href={waOrderLink}
                    target="_blank"
                    rel="noreferrer"
                    className="mt-3.5 inline-flex w-full items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-emerald-400 to-teal-300 px-4 py-3.5 text-[13px] font-bold text-[#04140f] shadow-lg shadow-emerald-500/25 transition hover:brightness-110"
                  >
                    <MessageCircle className="h-4 w-4" />
                    Proses &amp; Go-Live via WhatsApp
                  </a>
                ) : (
                  <div className="mt-3.5">
                    <button
                      type="button"
                      disabled
                      className="inline-flex w-full cursor-not-allowed items-center justify-center gap-2 rounded-xl border border-slate-800/80 bg-white/[0.04] px-4 py-3.5 text-[13px] font-bold text-slate-500"
                    >
                      <MessageCircle className="h-4 w-4" />
                      Proses &amp; Go-Live via WhatsApp
                    </button>
                    <p className="mt-2 text-center text-[10.5px] text-amber-200/80">
                      Lengkapi {domainCheck.state !== 'valid' ? 'domain' : ''}
                      {domainCheck.state !== 'valid' && !isTemplateReady ? ' & ' : ''}
                      {!isTemplateReady ? 'pilihan tema' : ''} untuk checkout.
                    </p>
                  </div>
                )}

                <div className="mt-2.5 flex items-center justify-between">
                  <button
                    type="button"
                    onClick={resetOrder}
                    className="inline-flex items-center gap-1 text-[10.5px] font-medium text-slate-500 transition hover:text-slate-300"
                  >
                    <RotateCcw className="h-3 w-3" />
                    Reset order
                  </button>
                  <span className="text-[10px] text-slate-500">Tanpa kartu kredit</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="fixed inset-x-0 bottom-0 z-30 border-t border-slate-800/80 bg-[#080c14]/95 px-3 py-2.5 backdrop-blur-xl lg:hidden">
        <div className="mx-auto flex max-w-3xl items-center gap-3">
          <div className="min-w-0 flex-1">
            <p className="text-[9.5px] uppercase tracking-wider text-slate-500">Total · ± 30 menit</p>
            <p className="truncate text-[14px] font-extrabold text-white">{totalLabel}</p>
          </div>
          {checkoutReady ? (
            <a
              href={waOrderLink}
              target="_blank"
              rel="noreferrer"
              className="inline-flex shrink-0 items-center gap-1.5 rounded-lg bg-gradient-to-r from-emerald-400 to-teal-300 px-3.5 py-2.5 text-[11.5px] font-bold text-[#04140f]"
            >
              <MessageCircle className="h-3.5 w-3.5" />
              Go-Live
            </a>
          ) : (
            <button
              type="button"
              onClick={() => scrollToSection(domainCheck.state === 'valid' ? 'katalog' : 'domain')}
              className="inline-flex shrink-0 items-center gap-1.5 rounded-lg bg-gradient-to-r from-indigo-400 to-violet-300 px-3.5 py-2.5 text-[11.5px] font-bold text-[#04121f]"
            >
              Lengkapi order
              <ArrowRight className="h-3.5 w-3.5" />
            </button>
          )}
        </div>
      </div>
    </section>
  )
}
