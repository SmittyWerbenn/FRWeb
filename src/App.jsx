import { useEffect, useState } from 'react'
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
import PreviewPage from './pages/PreviewPage'
import NotFoundPage from './pages/NotFoundPage'
import { OrderProvider, useOrder } from './context/OrderContext'
import {
  consumeCatalogScroll,
  readCatalogFilter,
  useRoute,
  writeCatalogFilter,
} from './lib/router'

function Site() {
  const [category, setCategory] = useState(() => readCatalogFilter().category)
  const [query, setQuery] = useState(() => readCatalogFilter().query)
  const { selectTemplate, setDesignMode } = useOrder()

  // Filter dipertahankan saat pengguna masuk ke pratinjau lalu kembali.
  useEffect(() => {
    writeCatalogFilter({ category, query })
  }, [category, query])

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
    </div>
  )
}

/**
 * Pemilih halaman berbasis URL:
 *   `/`                 → katalog (landing + alur order)
 *   `/preview/:slug`    → pratinjau template layar penuh
 *   path lain           → halaman 404
 */
function Routes() {
  const route = useRoute()
  const isHome = route.name === 'home'

  // Kembali dari pratinjau: pulihkan posisi scroll katalog (atau lompat ke
  // anchor bila URL memang membawa hash, mis. `/#katalog`).
  useEffect(() => {
    if (!isHome) return undefined
    const saved = consumeCatalogScroll()
    const frame = window.requestAnimationFrame(() => {
      const hash = window.location.hash.replace('#', '')
      if (hash) {
        const node = document.getElementById(hash)
        if (node) {
          node.scrollIntoView({ block: 'start' })
          return
        }
      }
      if (saved !== null) window.scrollTo({ top: saved, behavior: 'instant' })
    })
    return () => window.cancelAnimationFrame(frame)
  }, [isHome])

  if (route.name === 'preview') return <PreviewPage slug={route.slug} />
  if (route.name === 'notfound') return <NotFoundPage />
  return <Site />
}

export default function App() {
  return (
    <OrderProvider>
      <Routes />
    </OrderProvider>
  )
}
