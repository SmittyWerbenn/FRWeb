export const TLD_OPTIONS = [
  { value: '.com', label: '.com', note: 'Paling dikenal global' },
  { value: '.id', label: '.id', note: 'Identitas Indonesia' },
  { value: '.co.id', label: '.co.id', note: 'Kredibel untuk PT / CV' },
  { value: '.net', label: '.net', note: 'Alternatif teknis' },
]

export const DEFAULT_TLD = '.com'

/** Domain yang jelas sudah dipakai brand besar — untuk simulasi ketersediaan. */
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

function hashString(value) {
  let hash = 0
  for (let i = 0; i < value.length; i += 1) {
    hash = (hash << 5) - hash + value.charCodeAt(i)
    hash |= 0
  }
  return Math.abs(hash)
}

/** Simulasi ketersediaan: deterministik, tanpa jaringan. */
export function isDomainTaken(name, tld = DEFAULT_TLD) {
  const clean = sanitizeDomainInput(name)
  if (!clean) return false
  if (RESERVED.has(clean)) return true
  return hashString(`${clean}${tld}`) % 7 === 0
}

export function suggestAlternatives(name, tld = DEFAULT_TLD) {
  const clean = sanitizeDomainInput(name).replace(/-/g, '')
  if (!clean) return []
  const candidates = [`${clean}id`, `${clean}-official`, `get${clean}`, `${clean}hq`]
  return candidates
    .filter((candidate) => !RESERVED.has(candidate))
    .filter((candidate) => !isDomainTaken(candidate, tld))
    .slice(0, 3)
    .map((candidate) => `${candidate}${tld}`)
}

/**
 * Cek domain dengan jeda kecil supaya terasa seperti query whois sungguhan.
 * @returns {Promise<{ state: 'available'|'taken', suggestions: string[] }>}
 */
export function checkDomainAvailability(name, tld = DEFAULT_TLD) {
  return new Promise((resolve) => {
    window.setTimeout(() => {
      const taken = isDomainTaken(name, tld)
      resolve({
        state: taken ? 'taken' : 'available',
        suggestions: taken ? suggestAlternatives(name, tld) : [],
      })
    }, 520)
  })
}
