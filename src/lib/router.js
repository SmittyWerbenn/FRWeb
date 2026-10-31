/**
 * Router tipis berbasis History API untuk FRWeb.
 *
 * Kenapa tidak pakai library: aplikasi hanya punya dua jenis halaman
 * (katalog di `/` dan pratinjau penuh di `/preview/:slug`), jadi satu
 * parser path + satu store eksternal sudah cukup tanpa menambah bundle.
 *
 * URL bersih (`/preview/padel-futsal-master`) di GitHub Pages dilayani
 * lewat `404.html` yang di-copy dari `index.html` saat build
 * (lihat plugin `spaFallback` di vite.config.js).
 */
import { useSyncExternalStore } from 'react'

const RAW_BASE = import.meta.env.BASE_URL || '/'

/** Base path tanpa trailing slash. `''` untuk root, `/FRWeb` untuk project site. */
export const BASE_PATH = RAW_BASE.replace(/\/+$/, '')

/** Path katalog (selalu berakhiran slash). */
export const HOME_PATH = `${BASE_PATH}/`

/** Anchor katalog di halaman utama. */
export const CATALOG_HASH = 'katalog'

const PREVIEW_PATTERN = /^\/preview\/([^/]+)\/?$/
const SCROLL_KEY = 'frweb:catalog-scroll'
const RETURN_FLAG = 'frweb:preview-return'
const FILTER_KEY = 'frweb:catalog-filter'
const NAVIGATE_EVENT = 'frweb:navigate'

const HOME_ROUTE = Object.freeze({ name: 'home' })
const SERVER_ROUTE = Object.freeze({ name: 'home' })

function safeDecode(value) {
  try {
    return decodeURIComponent(value)
  } catch {
    return value
  }
}

/** Buang base path dari pathname browser. */
export function stripBase(pathname) {
  const path = pathname || '/'
  if (!BASE_PATH) return path
  if (path === BASE_PATH) return '/'
  if (path.startsWith(`${BASE_PATH}/`)) return path.slice(BASE_PATH.length) || '/'
  return path
}

/** URL pratinjau penuh untuk satu template. */
export function previewPath(slug) {
  return `${BASE_PATH}/preview/${encodeURIComponent(slug)}`
}

/** URL katalog + anchor. */
export function catalogHref() {
  return `${HOME_PATH}#${CATALOG_HASH}`
}

/** Terjemahkan pathname menjadi objek route. */
export function parseRoute(pathname) {
  const fallback = typeof window === 'undefined' ? '/' : window.location.pathname
  const path = stripBase(pathname ?? fallback)
  const match = path.match(PREVIEW_PATTERN)
  if (match) return { name: 'preview', slug: safeDecode(match[1]) }
  if (path === '/' || path === '/index.html') return HOME_ROUTE
  return { name: 'notfound' }
}

const listeners = new Set()
let cachedHref = ''
let cachedRoute = HOME_ROUTE

function getSnapshot() {
  if (typeof window === 'undefined') return HOME_ROUTE
  const href = `${window.location.pathname}${window.location.search}`
  if (href !== cachedHref) {
    cachedHref = href
    cachedRoute = parseRoute()
  }
  return cachedRoute
}

function getServerSnapshot() {
  return SERVER_ROUTE
}

function emit() {
  for (const listener of listeners) listener()
}

function subscribe(listener) {
  if (typeof window === 'undefined') return () => {}
  listeners.add(listener)
  if (listeners.size === 1) {
    window.addEventListener('popstate', emit)
    window.addEventListener(NAVIGATE_EVENT, emit)
    // Scroll dikelola sendiri supaya posisi katalog bisa dipulihkan persis
    // setelah kembali dari halaman pratinjau.
    if ('scrollRestoration' in window.history) window.history.scrollRestoration = 'manual'
  }
  return () => {
    listeners.delete(listener)
    if (listeners.size === 0) {
      window.removeEventListener('popstate', emit)
      window.removeEventListener(NAVIGATE_EVENT, emit)
    }
  }
}

/** Hook route aktif. */
export function useRoute() {
  return useSyncExternalStore(subscribe, getSnapshot, getServerSnapshot)
}

/** Navigasi client-side (tanpa reload) lalu beri tahu seluruh subscriber. */
export function navigate(to, { replace = false } = {}) {
  if (typeof window === 'undefined') return
  const target = new URL(to, window.location.origin)
  if (replace) window.history.replaceState({ frweb: true }, '', target)
  else window.history.pushState({ frweb: true }, '', target)
  emit()
}

function rememberScroll() {
  try {
    window.sessionStorage.setItem(SCROLL_KEY, String(window.scrollY))
    window.sessionStorage.setItem(RETURN_FLAG, '1')
  } catch {
    /* mode privat — posisi scroll diabaikan */
  }
}

/** Buka halaman pratinjau penuh (dipakai kartu katalog, hero, dan CTA). */
export function openPreviewRoute(slug) {
  if (typeof window === 'undefined' || !slug) return
  rememberScroll()
  navigate(previewPath(slug))
  window.scrollTo({ top: 0, left: 0, behavior: 'auto' })
}

/**
 * Props siap pakai untuk `<a>`: URL bersih tetap ada di `href` (middle-click,
 * new tab, SEO), tapi klik kiri biasa ditangani router tanpa reload.
 */
export function previewLinkProps(slug) {
  return {
    href: previewPath(slug),
    onClick(event) {
      if (event.defaultPrevented) return
      if (event.button !== 0) return
      if (event.metaKey || event.ctrlKey || event.shiftKey || event.altKey) return
      event.preventDefault()
      openPreviewRoute(slug)
    },
  }
}

/**
 * Keluar dari halaman pratinjau: `history.back()` bila pengguna datang dari
 * katalog (filter + posisi scroll kembali utuh), atau navigasi eksplisit ke
 * `/#katalog` bila halaman dibuka dari link luar / tab baru.
 */
export function leavePreview() {
  if (typeof window === 'undefined') return
  let cameFromCatalog = false
  try {
    cameFromCatalog = window.sessionStorage.getItem(RETURN_FLAG) === '1'
    window.sessionStorage.removeItem(RETURN_FLAG)
  } catch {
    /* abaikan */
  }

  if (cameFromCatalog && window.history.length > 1) {
    window.history.back()
    return
  }
  navigate(`${HOME_PATH}#${CATALOG_HASH}`)
}

/**
 * Kompatibilitas tautan lama: `/?preview=slug` dulu membuka modal,
 * sekarang dialihkan ke route pratinjau penuh dengan URL bersih.
 */
export function redirectLegacyPreview() {
  if (typeof window === 'undefined') return
  const params = new URLSearchParams(window.location.search)
  const slug = params.get('preview')
  if (!slug) return
  // `viewport` lama dibuang: simulator desktop/tablet/mobile sudah tidak ada.
  window.history.replaceState({ frweb: true }, '', previewPath(slug))
}

/** Ambil (sekali pakai) posisi scroll katalog yang tersimpan. */
export function consumeCatalogScroll() {
  if (typeof window === 'undefined') return null
  try {
    const raw = window.sessionStorage.getItem(SCROLL_KEY)
    window.sessionStorage.removeItem(SCROLL_KEY)
    if (!raw) return null
    const value = Number(raw)
    return Number.isFinite(value) && value > 0 ? value : null
  } catch {
    return null
  }
}

/** Filter katalog terakhir (kategori + query) agar tidak hilang saat kembali. */
export function readCatalogFilter() {
  if (typeof window === 'undefined') return { category: 'all', query: '' }
  try {
    const raw = window.sessionStorage.getItem(FILTER_KEY)
    if (!raw) return { category: 'all', query: '' }
    const parsed = JSON.parse(raw)
    return {
      category: typeof parsed.category === 'string' ? parsed.category : 'all',
      query: typeof parsed.query === 'string' ? parsed.query : '',
    }
  } catch {
    return { category: 'all', query: '' }
  }
}

export function writeCatalogFilter(filter) {
  if (typeof window === 'undefined') return
  try {
    window.sessionStorage.setItem(FILTER_KEY, JSON.stringify(filter))
  } catch {
    /* abaikan */
  }
}
