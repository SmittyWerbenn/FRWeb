import SportsComproPreview from './SportsComproPreview'
import FnbComproPreview from './FnbComproPreview'
import RetailComproPreview from './RetailComproPreview'
import ServiceComproPreview from './ServiceComproPreview'

/**
 * Empat design archetype halaman company profile.
 * Tiap archetype memakai engine layout + widget interaktif yang berbeda;
 * variasi antar template dalam archetype yang sama ditangani skin (.pv-skin-*).
 */

/** A. Sport & Arena — hero dark, calendar slot, booking court. */
export function PadelArenaPreview(props) {
  return <SportsComproPreview {...props} />
}

/** B. F&B & Dining — split hero editorial, menu/pax widget, reservasi. */
export function CateringProPreview(props) {
  return <FnbComproPreview {...props} />
}

/** C. Toko Fisik & Grosir — grid katalog, filter, RFQ. */
export function MaterialStorePreview(props) {
  return <RetailComproPreview {...props} />
}

/** D. Jasa & Custom Service — hero mesh, stepper paket, form booking. */
export function AutoCareServicePreview(props) {
  return <ServiceComproPreview {...props} />
}
