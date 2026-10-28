export const CATEGORIES = [
  { id: 'all', label: 'Semua', short: 'Semua' },
  { id: 'sports', label: 'Sport & Club', short: 'Sport & Club' },
  { id: 'fnb', label: 'F&B', short: 'F&B' },
  { id: 'retail', label: 'Online Store', short: 'Online Store' },
  { id: 'service', label: 'Corporate & Service', short: 'Corporate & Service' },
  { id: 'events', label: 'Event & Hospitality', short: 'Event & Hospitality' },
]

export const categoryLabel = (id) =>
  CATEGORIES.find((category) => category.id === id)?.label ?? 'Semua'

export const rupiah = (value) =>
  new Intl.NumberFormat('id-ID', {
    style: 'currency',
    currency: 'IDR',
    maximumFractionDigits: 0,
  }).format(Number(value) || 0)
