import { ArrowRight, Check, Clock, CreditCard, Globe, Layers, MessageCircle, QrCode, RotateCcw, ShieldCheck, Sparkles, Zap } from '../../lib/icons'
import { formatIDR } from '../../lib/format'
import { CUSTOM_TIMELINE, featureLabels } from '../../data/customFeatures'
import { PAYMENT_ADDON } from '../../data/paymentAddon'
import { scrollToSection, useOrder } from '../../context/OrderContext'
import PaymentGatewayToggle from './PaymentGatewayToggle'

const TEMPLATE_TIMELINE = [
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

const CUSTOM_TIMELINE_STEPS = [
  {
    title: 'Kirim brief via WhatsApp',
    desc: 'Pesan otomatis berisi paket, domain, referensi web, dan fitur khusus yang Anda centang.',
  },
  {
    title: 'Konsultasi & penawaran',
    desc: 'Tim FRWeb mempelajari brief, lalu mengirim estimasi biaya, ruang lingkup, dan timeline final.',
  },
  {
    title: 'Desain, development & go-live',
    desc: `Pengerjaan ${CUSTOM_TIMELINE} setelah brief disetujui — termasuk desain, development fitur, QA, dan revisi.`,
  },
]

function SummaryRow({ icon: Icon, label, value, action, tone = 'default' }) {
  return (
    <div className="flex items-start gap-3 border-b border-[#E5E7EB] py-3 last:border-0">
      <span className="mt-0.5 grid h-7 w-7 shrink-0 place-items-center rounded-lg bg-[#F3F4F6] text-[#6B7280]">
        <Icon className="h-3.5 w-3.5" />
      </span>
      <div className="min-w-0 flex-1">
        <p className="text-[10px] uppercase tracking-wider text-[#6B7280]">{label}</p>
        <p className={`mt-0.5 truncate text-[12.5px] font-semibold ${tone === 'muted' ? 'text-[#6B7280]' : 'text-[#0B1F3F]'}`}>
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
    designMode,
    customBrief,
    isTemplateReady,
    isCustomDesignReady,
    checkoutReady,
    waOrderLink,
    resetOrder,
    clearTemplate,
    includePaymentGateway,
    addonPrice,
    orderTotal,
  } = useOrder()

  const isCustom = plan.price === null
  const isCustomMode = designMode === 'custom'
  const totalLabel = isCustom ? 'Custom' : formatIDR(orderTotal)
  const planSubtotalLabel = isCustom ? 'Penawaran terpisah' : formatIDR(plan.price)

  const designValue = isCustomMode
    ? customBrief.features.length > 0
      ? `Custom design — ${customBrief.features.length} fitur khusus`
      : customBrief.reference
        ? 'Custom design — brief terisi sebagian'
        : 'Custom design — brief belum diisi'
    : template
      ? template.name
      : 'Belum dipilih'

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
      id: 'desain',
      target: 'katalog',
      icon: isCustomMode ? Sparkles : Layers,
      label: 'Desain',
      value: designValue,
      done: isCustomMode ? isCustomDesignReady : isTemplateReady,
    },
  ]

  return (
    <section id="ringkasan" className="relative scroll-mt-20 px-4 py-14 sm:px-6 lg:px-8 lg:py-20">
      <div className="mx-auto w-full max-w-7xl">
        <div className="max-w-2xl">
          <span className="text-[11px] font-bold uppercase tracking-[0.22em] text-[#0B1F3F]">Langkah 4</span>
          <h2 className="mt-2.5 text-[26px] font-extrabold leading-tight tracking-tight text-[#0B1F3F] sm:text-[34px]">
            {isCustomMode ? 'Ringkasan brief & rencana pengerjaan' : 'Ringkasan pesanan & go-live 30 menit'}
          </h2>
          <p className="mt-3 text-[14px] leading-relaxed text-[#6B7280]">
            {isCustomMode
              ? 'Periksa kembali brief desain Anda. Satu klik akan mengirim detail kebutuhan ke WhatsApp tim FRWeb untuk dihitung estimasi biaya dan timeline-nya.'
              : 'Periksa kembali pilihan Anda. Satu klik akan mengirim detail order ke WhatsApp tim FRWeb, lalu website Anda disiapkan dan aktif dalam ± 30 menit.'}
          </p>
        </div>

        <div className="mt-8 grid gap-5 lg:grid-cols-[minmax(0,1fr)_minmax(0,0.85fr)] lg:items-start">
          <div className="min-w-0 space-y-4">
            <div className="rounded-2xl border border-[#E5E7EB] bg-white p-4 sm:p-5">
              <div className="flex items-center justify-between">
                <h3 className="text-[13px] font-bold text-[#0B1F3F]">Kelengkapan order</h3>
                <span className="rounded-full border border-[#E5E7EB] bg-[#F9FAFB] px-2 py-0.5 text-[10px] font-semibold text-[#6B7280]">
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
                          item.done ? 'bg-[#F3F4F6] text-[#0B1F3F]' : 'bg-[#F3F4F6] text-[#6B7280]'
                        }`}
                      >
                        {item.done ? <Check className="h-4 w-4" strokeWidth={3} /> : <Icon className="h-4 w-4" />}
                      </span>
                      <div className="min-w-0 flex-1">
                        <p className="text-[12.5px] font-semibold text-[#0B1F3F]">{item.label}</p>
                        <p className={`truncate text-[11.5px] ${item.done ? 'text-[#4B5563]' : 'text-[#6B7280]'}`}>
                          {item.value}
                        </p>
                      </div>
                      <button
                        type="button"
                        onClick={() => scrollToSection(item.target)}
                        className="shrink-0 rounded-lg border border-[#E5E7EB] px-2.5 py-1.5 text-[10.5px] font-semibold text-[#4B5563] transition hover:border-[#E5E7EB] hover:bg-[#F3F4F6]"
                      >
                        {item.done ? 'Ubah' : 'Isi'}
                      </button>
                    </div>
                  )
                })}
              </div>
            </div>

            <div className="rounded-2xl border border-[#E5E7EB] bg-white p-4 sm:p-5">
              <h3 className="flex items-center gap-1.5 text-[13px] font-bold text-[#0B1F3F]">
                <Zap className="h-3.5 w-3.5 text-[#0B1F3F]" />
                Setelah checkout
              </h3>
              <ol className="mt-3 space-y-3">
                {(isCustomMode ? CUSTOM_TIMELINE_STEPS : TEMPLATE_TIMELINE).map((step, index) => (
                  <li key={step.title} className="flex gap-3">
                    <span className="grid h-6 w-6 shrink-0 place-items-center rounded-full bg-[#F3F4F6] font-mono text-[10px] font-bold text-[#0B1F3F]">
                      {index + 1}
                    </span>
                    <div>
                      <p className="text-[12px] font-semibold text-[#0B1F3F]">{step.title}</p>
                      <p className="mt-0.5 text-[11.5px] leading-relaxed text-[#6B7280]">{step.desc}</p>
                    </div>
                  </li>
                ))}
              </ol>
            </div>

            <div className="flex items-start gap-2.5 rounded-xl border border-[#D1D5DB] bg-[#F3F4F6] px-3.5 py-3 text-[11.5px] leading-relaxed text-[#0B1F3F]">
              <ShieldCheck className="mt-0.5 h-4 w-4 shrink-0 text-[#0B1F3F]" />
              {isCustomMode
                ? 'Garansi revisi desain 2× dan revisi konten 7 hari setelah website live. Timeline final dikonfirmasi setelah brief disetujui.'
                : 'Garansi revisi konten 7 hari dan uang kembali jika website tidak bisa online dalam 24 jam setelah pembayaran.'}
            </div>
          </div>

          <div className="min-w-0 lg:sticky lg:top-24">
            <div className="overflow-hidden rounded-2xl border border-[#E5E7EB] bg-white shadow-[0_8px_30px_-16px_rgba(11,31,63,0.2)]">
              <div className="flex items-center justify-between border-b border-[#E5E7EB] bg-[#F9FAFB] px-4 py-3">
                <h3 className="text-[13px] font-bold text-[#0B1F3F]">Detail Pesanan</h3>
                <span
                  className={`inline-flex items-center gap-1 rounded-full px-2 py-0.5 text-[10px] font-bold ${
                    isCustomMode
                      ? 'bg-[#F3F4F6] text-[#0B1F3F]'
                      : 'bg-[#F3F4F6] text-[#0B1F3F]'
                  }`}
                >
                  <Clock className="h-2.5 w-2.5" />
                  {isCustomMode ? CUSTOM_TIMELINE : '± 30 menit'}
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
                      className="text-[10.5px] font-semibold text-[#6B7280] hover:text-[#0B1F3F]"
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
                      className="text-[10.5px] font-semibold text-[#6B7280] hover:text-[#0B1F3F]"
                    >
                      Ubah
                    </button>
                  }
                />
                {isCustomMode ? (
                  <>
                    <SummaryRow
                      icon={Sparkles}
                      label="Mode desain"
                      value="Custom Design Request (bukan template)"
                    />
                    <SummaryRow
                      icon={Globe}
                      label="Referensi web"
                      value={customBrief.reference.trim() || 'Belum diisi'}
                      tone={customBrief.reference.trim() ? 'default' : 'muted'}
                      action={
                        <button
                          type="button"
                          onClick={() => scrollToSection('katalog')}
                          className="text-[10.5px] font-semibold text-[#6B7280] hover:text-[#0B1F3F]"
                        >
                          {customBrief.reference.trim() ? 'Ubah' : 'Isi'}
                        </button>
                      }
                    />
                    <SummaryRow
                      icon={Layers}
                      label="Fitur khusus"
                      value={
                        customBrief.features.length > 0
                          ? `${customBrief.features.length} fitur dipilih`
                          : 'Belum dipilih'
                      }
                      tone={customBrief.features.length > 0 ? 'default' : 'muted'}
                      action={
                        <button
                          type="button"
                          onClick={() => scrollToSection('katalog')}
                          className="text-[10.5px] font-semibold text-[#6B7280] hover:text-[#0B1F3F]"
                        >
                          {customBrief.features.length > 0 ? 'Ubah' : 'Pilih'}
                        </button>
                      }
                    />
                    {customBrief.features.length > 0 && (
                      <div className="flex flex-wrap gap-1 border-b border-[#E5E7EB] py-2.5 pl-10">
                        {featureLabels(customBrief.features).map((label) => (
                          <span
                            key={label}
                            className="rounded-md border border-[#D1D5DB] bg-[#F3F4F6] px-1.5 py-0.5 text-[10px] font-medium text-[#0B1F3F]"
                          >
                            {label}
                          </span>
                        ))}
                      </div>
                    )}
                    <SummaryRow
                      icon={MessageCircle}
                      label="Catatan brief"
                      value={customBrief.notes.trim() ? customBrief.notes.trim() : 'Tidak ada catatan tambahan'}
                      tone={customBrief.notes.trim() ? 'default' : 'muted'}
                    />
                  </>
                ) : (
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
                          className="text-[10.5px] font-semibold text-[#6B7280] hover:text-[#0B1F3F]"
                        >
                          Hapus
                        </button>
                      ) : (
                        <button
                          type="button"
                          onClick={() => scrollToSection('katalog')}
                          className="text-[10.5px] font-semibold text-[#6B7280] hover:text-[#0B1F3F]"
                        >
                          Pilih
                        </button>
                      )
                    }
                  />
                )}
                <SummaryRow
                  icon={QrCode}
                  label="Add-On Pembayaran"
                  value={
                    includePaymentGateway
                      ? `Payment Gateway & QRIS Otomatis (+${formatIDR(PAYMENT_ADDON.price)})`
                      : 'Standard checkout WhatsApp (gratis)'
                  }
                  tone={includePaymentGateway ? 'default' : 'muted'}
                  action={
                    <button
                      type="button"
                      onClick={() => scrollToSection('addon-pembayaran')}
                      className="text-[10.5px] font-semibold text-[#6B7280] hover:text-[#0B1F3F]"
                    >
                      {includePaymentGateway ? 'Ubah' : 'Tambah'}
                    </button>
                  }
                />
                <SummaryRow
                  icon={Clock}
                  label={isCustomMode ? 'Estimasi pengerjaan' : 'Estimasi go-live'}
                  value={
                    isCustomMode
                      ? `${CUSTOM_TIMELINE} setelah brief disetujui`
                      : '30 menit setelah pembayaran'
                  }
                />
              </div>

              <div className="border-t border-[#E5E7EB] px-4 py-3">
                <div className="space-y-1.5 pb-3 text-[11.5px]">
                  <div className="flex items-center justify-between gap-2">
                    <span className="text-[#6B7280]">Paket {plan.name}</span>
                    <span className="font-semibold text-[#374151]">{planSubtotalLabel}</span>
                  </div>
                  {includePaymentGateway ? (
                    <div className="flex items-center justify-between gap-2">
                      <span className="text-[#6B7280]">
                        Add-on Payment Gateway &amp; QRIS <span className="text-[#9CA3AF]">(one-time)</span>
                      </span>
                      <span className="font-semibold text-[#0B1F3F]">+{formatIDR(addonPrice)}</span>
                    </div>
                  ) : (
                    <div className="flex items-start justify-between gap-2">
                      <span className="text-[#6B7280]">Checkout WhatsApp manual</span>
                      <span className="shrink-0 font-semibold text-[#6B7280]">Gratis</span>
                    </div>
                  )}
                </div>

                <PaymentGatewayToggle compact className="mb-3" />

                <div className="flex items-end justify-between">
                  <div>
                    <p className="text-[10px] uppercase tracking-wider text-[#6B7280]">Total setup</p>
                    <p
                      data-order-total
                      className="mt-0.5 text-[20px] font-extrabold leading-none text-[#0B1F3F]"
                    >
                      {totalLabel}
                    </p>
                  </div>
                  <p className="text-right text-[10px] leading-snug text-[#6B7280]">
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
                    className="mt-3.5 inline-flex w-full items-center justify-center gap-2 rounded-xl bg-[#0B1F3F] px-4 py-3.5 text-[13px] font-bold text-white  transition hover:bg-[#17315F]"
                  >
                    <MessageCircle className="h-4 w-4" />
                    {isCustomMode ? 'Kirim Brief via WhatsApp' : 'Proses & Go-Live via WhatsApp'}
                  </a>
                ) : (
                  <div className="mt-3.5">
                    <button
                      type="button"
                      disabled
                      className="inline-flex w-full cursor-not-allowed items-center justify-center gap-2 rounded-xl border border-[#E5E7EB] bg-[#F9FAFB] px-4 py-3.5 text-[13px] font-bold text-[#6B7280]"
                    >
                      <MessageCircle className="h-4 w-4" />
                      {isCustomMode ? 'Kirim Brief via WhatsApp' : 'Proses & Go-Live via WhatsApp'}
                    </button>
                    <p className="mt-2 text-center text-[10.5px] text-[#0B1F3F]">
                      Lengkapi{' '}
                      {[
                        domainCheck.state !== 'valid' ? 'domain' : null,
                        isCustomMode
                          ? isCustomDesignReady
                            ? null
                            : 'brief desain'
                          : isTemplateReady
                            ? null
                            : 'pilihan template',
                      ]
                        .filter(Boolean)
                        .join(' & ')}{' '}
                      untuk checkout.
                    </p>
                  </div>
                )}

                <div className="mt-2.5 flex items-center justify-between">
                  <button
                    type="button"
                    onClick={resetOrder}
                    className="inline-flex items-center gap-1 text-[10.5px] font-medium text-[#6B7280] transition hover:text-[#4B5563]"
                  >
                    <RotateCcw className="h-3 w-3" />
                    Reset order
                  </button>
                  <span className="text-[10px] text-[#6B7280]">Tanpa kartu kredit</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="fixed inset-x-0 bottom-0 z-30 border-t border-[#E5E7EB] bg-[#F9FAFB]/95 px-3 py-2.5 backdrop-blur-xl lg:hidden">
        <div className="mx-auto flex max-w-3xl items-center gap-3">
          <div className="min-w-0 flex-1">
            <p className="text-[9.5px] uppercase tracking-wider text-[#6B7280]">
              Total · {isCustomMode ? CUSTOM_TIMELINE : '± 30 menit'}
              {includePaymentGateway && <span className="text-[#0B1F3F]"> · incl. add-on QRIS</span>}
            </p>
            <p className="truncate text-[14px] font-extrabold text-[#0B1F3F]">{totalLabel}</p>
          </div>
          {checkoutReady ? (
            <a
              href={waOrderLink}
              target="_blank"
              rel="noreferrer"
              className="inline-flex shrink-0 items-center gap-1.5 rounded-lg bg-[#0B1F3F] px-3.5 py-2.5 text-[11.5px] font-bold text-white"
            >
              <MessageCircle className="h-3.5 w-3.5" />
              {isCustomMode ? 'Kirim brief' : 'Go-Live'}
            </a>
          ) : (
            <button
              type="button"
              onClick={() => scrollToSection(domainCheck.state === 'valid' ? 'katalog' : 'domain')}
              className="inline-flex shrink-0 items-center gap-1.5 rounded-lg bg-[#0B1F3F] px-3.5 py-2.5 text-[11.5px] font-bold text-white"
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
