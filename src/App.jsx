import { useState } from 'react'
import Navbar from './components/catalog/Navbar'
import Hero from './components/catalog/Hero'
import ValueStrip from './components/catalog/ValueStrip'
import PricingSection from './components/order/PricingSection'
import DomainSection from './components/order/DomainSection'
import DesignModeSection from './components/order/DesignModeSection'
import OrderSection from './components/order/OrderSection'
import ValueSection from './components/catalog/ValueSection'
import ProcessSection from './components/catalog/ProcessSection'
import FaqSection from './components/catalog/FaqSection'
import CtaSection from './components/catalog/CtaSection'
import Footer from './components/catalog/Footer'
import PreviewModal from './components/preview/PreviewModal'
import { OrderProvider, scrollToSection, useOrder } from './context/OrderContext'

function Site() {
  const [category, setCategory] = useState('all')
  const [query, setQuery] = useState('')
  const {
    previewTemplate,
    previewViewport,
    openPreview,
    closePreview,
    setPreviewViewport,
    selectTemplate,
    setDesignMode,
  } = useOrder()

  const handleSelectFromPreview = (template) => {
    selectTemplate(template.id)
    closePreview()
    window.setTimeout(() => scrollToSection('ringkasan'), 120)
  }

  return (
    <div className="relative min-h-screen bg-[#080c14] text-slate-100 antialiased">
      <div className="pointer-events-none fixed inset-0 z-0">
        <div className="absolute inset-0 bg-grid opacity-[0.22]" />
        <div className="absolute -top-40 left-1/2 h-[520px] w-[820px] -translate-x-1/2 rounded-full bg-indigo-600/15 blur-[130px]" />
        <div className="absolute top-[38%] -left-40 h-[420px] w-[420px] rounded-full bg-violet-600/12 blur-[120px]" />
        <div className="absolute bottom-0 right-0 h-[420px] w-[520px] rounded-full bg-emerald-400/8 blur-[130px]" />
      </div>

      <div className="relative z-10">
        <Navbar />
        <main>
          <Hero />
          <ValueStrip />
          <PricingSection />
          <DomainSection />
          <DesignModeSection
            category={category}
            onCategoryChange={setCategory}
            query={query}
            onQueryChange={setQuery}
            onPreview={openPreview}
            onSelect={(template) => selectTemplate(template.id)}
            onRequestCustom={() => setDesignMode('custom')}
          />
          <OrderSection />
          <ProcessSection />
          <ValueSection />
          <FaqSection />
          <CtaSection />
        </main>
        <Footer />
      </div>

      {previewTemplate && (
        <PreviewModal
          template={previewTemplate}
          viewport={previewViewport}
          onViewportChange={setPreviewViewport}
          onClose={closePreview}
          onSelect={handleSelectFromPreview}
        />
      )}
    </div>
  )
}

export default function App() {
  return (
    <OrderProvider>
      <Site />
    </OrderProvider>
  )
}
