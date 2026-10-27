import { sportsTemplates } from './templates/sports'
import { fnbTemplates } from './templates/fnb'
import { retailTemplates } from './templates/retail'
import { serviceTemplates } from './templates/service'
import { variantTemplates } from './templates/variants'
import { CATEGORIES } from './categories'
import { metaFor } from './templateMeta'

export { CATEGORIES }

/**
 * Katalog 18 template — 4 kategori, masing-masing dengan varian kontras.
 * Varian baru diselipkan tepat setelah kategori induknya agar pasangan
 * "Neon Athletic vs Country Club", "Warm Dining vs Wabi-sabi", dst. berdampingan.
 */
export const TEMPLATES = [
  ...sportsTemplates,
  ...variantTemplates.sports,
  ...fnbTemplates,
  ...variantTemplates.fnb,
  ...retailTemplates,
  ...variantTemplates.retail,
  ...serviceTemplates,
  ...variantTemplates.service,
].map((template) => {
  const meta = metaFor(template)
  return {
    ...template,
    industry: meta.industry,
    variantStyle: meta.variantStyle,
    colorPalette: meta.colorPalette,
    layoutType: meta.layoutType,
    badgeLabel: meta.badgeLabel,
    skin: meta.skin,
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
    getCategoryLabel(template.category),
    template.tagline,
    template.bestFor,
    template.industry,
    template.variantStyle,
    template.layoutType,
    template.brand?.name,
    ...(template.bullets ?? []),
  ]
    .join(' ')
    .toLowerCase()
}

export const SEARCH_INDEX = Object.fromEntries(
  TEMPLATES.map((template) => [template.id, searchIndex(template)]),
)
