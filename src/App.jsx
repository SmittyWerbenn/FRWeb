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
import Reveal from './components/Reveal'
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
    <div className="relative min-h-screen bg-[#F5F8FD] text-[#0B1F3F] antialiased">
      <div className="relative z-10">
        <Navbar />
        <main>
          <Hero />
          <ValueStrip />
          <Reveal>
            <PricingSection />
          </Reveal>
          <Reveal>
            <DomainSection />
          </Reveal>
          <DesignModeSection
            category={category}
            onCategoryChange={setCategory}
            query={query}
            onQueryChange={setQuery}
            onSelect={(template) => selectTemplate(template.id)}
            onRequestCustom={() => setDesignMode('custom')}
          />
          <Reveal>
            <OrderSection />
          </Reveal>
          <Reveal>
            <ProcessSection />
          </Reveal>
          <Reveal>
            <ValueSection />
          </Reveal>
          <Reveal>
            <FaqSection />
          </Reveal>
          <Reveal>
            <CtaSection />
          </Reveal>
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

  // Kembali dari pratinjau: pulihkan posisi scroll katalog persis di tempat
  // terakhir user berada. Bila tidak ada posisi tersimpan (mis. halaman dibuka
  // langsung dari tautan luar), baru lompat ke anchor di URL.
  useEffect(() => {
    if (!isHome) return undefined
    const saved = consumeCatalogScroll()
    const frame = window.requestAnimationFrame(() => {
      if (saved !== null) {
        // Hash pada URL akan memicu lompatan anchor oleh browser setelah ini,
        // jadi buang dulu agar posisi hasil restore tidak tertimpa.
        if (window.location.hash) {
          window.history.replaceState(window.history.state, '', window.location.pathname + window.location.search)
        }
        window.scrollTo({ top: saved, behavior: 'instant' })
        return
      }
      const hash = window.location.hash.replace('#', '')
      if (!hash) return
      const node = document.getElementById(hash)
      if (node) node.scrollIntoView({ block: 'start' })
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
