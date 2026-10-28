import { sportsTemplates } from './templates/sports'
import { fnbTemplates } from './templates/fnb'
import { retailTemplates } from './templates/retail'
import { serviceTemplates } from './templates/service'
import { variantTemplates } from './templates/variants'
import { CATEGORIES } from './categories'
import { metaFor, TEMPLATE_META } from './templateMeta'
import { TEMPLATE_CATALOG, TEMPLATE_CATALOG_BY_ID } from './templateCatalog'

export { CATEGORIES, TEMPLATE_CATALOG, TEMPLATE_CATALOG_BY_ID }

const SKIN_FALLBACK = 'default'

/**
 * Konten visual (theme, brand, konten section) yang dipakai renderer React
 * di hero & halaman order. Katalog 25 template menjadi sumber kebenaran untuk
 * nama, kategori, fitur, dan file HTML live preview.
 */
const RICH_TEMPLATES = [
  ...sportsTemplates,
  ...variantTemplates.sports,
  ...fnbTemplates,
  ...variantTemplates.fnb,
  ...retailTemplates,
  ...variantTemplates.retail,
  ...serviceTemplates,
  ...variantTemplates.service,
]

const RICH_BY_ID = Object.fromEntries(RICH_TEMPLATES.map((template) => [template.id, template]))

const initials = (name) =>
  name
    .replace(/[^A-Za-z ]/g, ' ')
    .split(/\s+/)
    .filter(Boolean)
    .slice(0, 2)
    .map((word) => word[0].toUpperCase())
    .join('')

const fallbackTheme = (item) => ({
  accent: item.accentColor,
  accent2: `${item.accentColor}CC`,
  ink: '#0B1120',
  tint: '#F1F5F9',
})

/**
 * Katalog final 25 template. Urutan mengikuti `TEMPLATE_CATALOG` (per kategori),
 * tiap entri digabung dengan konten visual bila tersedia.
 */
export const TEMPLATES = TEMPLATE_CATALOG.map((item) => {
  const rich = RICH_BY_ID[item.id]
  const meta = TEMPLATE_META[item.id] ?? (rich ? metaFor(rich) : {})
  const theme = rich?.theme ?? fallbackTheme(item)

  return {
    ...(rich ?? {}),
    ...item,
    tagline: rich?.tagline ?? item.description,
    bullets: item.features,
    bestFor: rich?.bestFor ?? item.categoryLabel,
    theme,
    brand: rich?.brand ?? { mark: initials(item.name), name: item.name },
    previewType: rich?.previewType ?? 'retail',
    skin: meta.skin ?? SKIN_FALLBACK,
    industry: meta.industry ?? item.categoryLabel,
    variantStyle: meta.variantStyle ?? item.categoryLabel,
    colorPalette: meta.colorPalette ?? [theme.ink, item.accentColor, theme.accent2, theme.tint],
    layoutType: meta.layoutType ?? 'Landing page + form konversi',
    badgeLabel: item.badge ?? meta.badgeLabel ?? null,
    description: item.description,
    features: item.features,
  }
})

export const TEMPLATES_BY_ID = Object.fromEntries(
  TEMPLATES.map((template) => [template.id, template]),
)

export const CATEGORY_BY_ID = Object.fromEntries(
  CATEGORIES.map((category) => [category.id, category]),
)

export function getCategoryLabel(id) {
  return CATEGORY_BY_ID[id]?.label ?? 'Kategori'
}

export function countByCategory(id) {
  if (id === 'all') return TEMPLATES.length
  return TEMPLATES.filter((template) => template.category === id).length
}

/** Teks yang ikut dicari oleh search bar katalog. */
export function searchIndex(template) {
  return [
    template.name,
    template.categoryLabel,
    getCategoryLabel(template.category),
    template.tagline,
    template.description,
    template.bestFor,
    template.industry,
    template.variantStyle,
    template.layoutType,
    template.badge,
    template.brand?.name,
    ...(template.features ?? []),
    ...(template.bullets ?? []),
  ]
    .join(' ')
    .toLowerCase()
}

export const SEARCH_INDEX = Object.fromEntries(
  TEMPLATES.map((template) => [template.id, searchIndex(template)]),
)
