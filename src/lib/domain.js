export const TLD_OPTIONS = [
  { value: '.com', label: '.com', note: 'Paling dikenal global' },
  { value: '.id', label: '.id', note: 'Identitas Indonesia' },
  { value: '.co.id', label: '.co.id', note: 'Kredibel untuk PT / CV' },
  { value: '.net', label: '.net', note: 'Alternatif teknis' },
]

export const DEFAULT_TLD = '.com'

/**
 * Endpoint RDAP resmi registry. Query langsung ke registry berarti hasilnya
 * ketersediaan sebenarnya, bukan simulasi.
 */
const RDAP_ENDPOINTS = {
  '.com': 'https://rdap.verisign.com/com/v1/domain/',
  '.net': 'https://rdap.verisign.com/net/v1/domain/',
  '.id': 'https://rdap.pandi.id/rdap/domain/',
  '.co.id': 'https://rdap.pandi.id/rdap/domain/',
}

/** Brand besar yang pasti sudah dipakai — dipakai saat jaringan gagal. */
const RESERVED = new Set([
  'google',
  'facebook',
  'instagram',
  'youtube',
  'tiktok',
  'tokopedia',
  'shopee',
  'gojek',
  'grab',
  'bukalapak',
  'traveloka',
  'microsoft',
  'apple',
  'netflix',
  'amazon',
  'frcloud',
])

const CACHE_TTL = 5 * 60 * 1000
const TIMEOUT_MS = 7000
const cache = new Map()

const LABEL_PATTERN = /^[a-z0-9](?:[a-z0-9-]*[a-z0-9])?$/

/** Bersihkan input user: buang protocol, path, spasi, dan titik di akhir. */
export function sanitizeDomainInput(value) {
  let name = String(value || '')
    .toLowerCase()
    .trim()
    .replace(/^https?:\/\//, '')
    .replace(/^www\./, '')
    .split('/')[0]
    .split('?')[0]
    .replace(/\s+/g, '')

  if (name.endsWith('.')) name = name.slice(0, -1)
  return name
}

/** Pisahkan "namabisnis.co.id" menjadi { name: 'namabisnis', tld: '.co.id' }. */
export function splitDomain(input) {
  const cleaned = sanitizeDomainInput(input)
  const ordered = [...TLD_OPTIONS].sort((a, b) => b.value.length - a.value.length)
  const match = ordered.find((option) => cleaned.endsWith(option.value))
  if (!match) return { name: cleaned, tld: DEFAULT_TLD }
  return { name: cleaned.slice(0, -match.value.length), tld: match.value }
}

export function fullDomain(name, tld = DEFAULT_TLD) {
  const clean = sanitizeDomainInput(name)
  if (validateDomainName(clean).state !== 'valid') return ''
  return `${clean}${tld}`
}

/**
 * Validasi label domain (tanpa TLD).
 * @returns {{ state: 'empty'|'invalid'|'valid', message: string }}
 */
export function validateDomainName(name) {
  const clean = sanitizeDomainInput(name)

  if (!clean) {
    return { state: 'empty', message: 'Masukkan nama domain bisnis Anda dulu.' }
  }
  if (clean.length < 3) {
    return { state: 'invalid', message: 'Minimal 3 karakter, contoh: namabisnis.' }
  }
  if (clean.length > 40) {
    return { state: 'invalid', message: 'Maksimal 40 karakter agar mudah diingat.' }
  }
  if (clean.includes('.')) {
    return { state: 'invalid', message: 'Cukup nama depannya saja, TLD dipilih di samping.' }
  }
  if (!LABEL_PATTERN.test(clean)) {
    return {
      state: 'invalid',
      message: 'Hanya huruf, angka, dan tanda hubung (-) di tengah.',
    }
  }
  if (clean.includes('--')) {
    return { state: 'invalid', message: 'Tanda hubung ganda tidak diperbolehkan.' }
  }
  return { state: 'valid', message: '' }
}

function tldOf(domain) {
  const ordered = [...TLD_OPTIONS].sort((a, b) => b.value.length - a.value.length)
  return ordered.find((option) => domain.endsWith(option.value))?.value ?? ''
}

function readCache(key) {
  const hit = cache.get(key)
  if (!hit) return null
  if (hit.expires < Date.now()) {
    cache.delete(key)
    return null
  }
  return hit.state
}

function writeCache(key, state) {
  cache.set(key, { state, expires: Date.now() + CACHE_TTL })
}

/**
 * Query RDAP registry.
 * @returns {Promise<'available'|'taken'|'unknown'>}
 */
async function rdapLookup(domain, signal) {
  const tld = tldOf(domain)
  const endpoint = RDAP_ENDPOINTS[tld]
  if (!endpoint) return 'unknown'

  const cached = readCache(domain)
  if (cached) return cached

  const controller = new AbortController()
  const timer = setTimeout(() => controller.abort(), TIMEOUT_MS)
  const forwardAbort = () => controller.abort()
  signal?.addEventListener('abort', forwardAbort)

  let state = 'unknown'
  try {
    const response = await fetch(`${endpoint}${encodeURIComponent(domain)}`, {
      method: 'GET',
      mode: 'cors',
      cache: 'no-store',
      headers: { accept: 'application/rdap+json' },
      signal: controller.signal,
    })

    if (response.status === 404 || response.status === 410) {
      state = 'available'
    } else if (response.ok) {
      state = 'taken'
    }
  } catch {
    state = 'unknown'
  } finally {
    clearTimeout(timer)
    signal?.removeEventListener('abort', forwardAbort)
  }

  if (state !== 'unknown') writeCache(domain, state)
  return state
}

function slugVariants(name) {
  const clean = sanitizeDomainInput(name).replace(/-/g, '')
  if (!clean) return []
  return [`${clean}id`, `${clean}-official`, `get${clean}`, `${clean}hq`, `${clean}studio`]
}

/** Rekomendasi nama alternatif yang benar-benar masih kosong menurut registry. */
async function availableAlternatives(name, tld, signal) {
  const candidates = slugVariants(name)
    .filter((candidate) => !RESERVED.has(candidate))
    .map((candidate) => `${candidate}${tld}`)
    .slice(0, 5)

  const results = await Promise.all(
    candidates.map(async (domain) => ({ domain, state: await rdapLookup(domain, signal) })),
  )

  return results
    .filter((item) => item.state === 'available')
    .map((item) => item.domain)
    .slice(0, 3)
}

/**
 * Cek ketersediaan domain ke registry resmi (RDAP).
 * state: 'available' (bebas), 'taken' (sudah dipakai), 'unknown' (registry tidak terjangkau).
 * @returns {Promise<{ state: 'available'|'taken'|'unknown', suggestions: string[], domain: string }>}
 */
export async function checkDomainAvailability(name, tld = DEFAULT_TLD, options = {}) {
  const clean = sanitizeDomainInput(name)
  const validation = validateDomainName(clean)
  if (validation.state !== 'valid') {
    return { state: 'unknown', suggestions: [], domain: '' }
  }

  const domain = `${clean}${tld}`
  const { signal } = options
  const state = await rdapLookup(domain, signal)

  if (state === 'taken') {
    const suggestions = await availableAlternatives(clean, tld, signal)
    return { state: 'taken', suggestions, domain }
  }

  if (state === 'unknown' && RESERVED.has(clean)) {
    return { state: 'taken', suggestions: [], domain }
  }

  return { state, suggestions: [], domain }
}
