import {
  AutoCareServicePreview,
  CateringProPreview,
  MaterialStorePreview,
  PadelArenaPreview,
} from './previews/archetypes'

const PREVIEWS = {
  sports: PadelArenaPreview,
  fnb: CateringProPreview,
  retail: MaterialStorePreview,
  service: AutoCareServicePreview,
}

/**
 * Skin visual per template — memaksa karakter tipografi/tekstur yang berbeda
 * meskipun engine preview-nya sama. Detail aturan ada di `src/index.css`
 * (`.pv-skin-*`). `default` tidak menambah transformasi apa pun.
 */
const SKIN_CLASS = {
  neon: 'pv-skin-neon',
  athletic: 'pv-skin-athletic',
  luxury: 'pv-skin-luxury',
  wabi: 'pv-skin-wabi',
  grunge: 'pv-skin-grunge',
  brutalist: 'pv-skin-brutalist',
  editorial: 'pv-skin-editorial',
  cyber: 'pv-skin-cyber',
  glass: 'pv-skin-glass',
  warm: 'pv-skin-warm',
  default: '',
}

export default function PreviewRenderer({ template }) {
  const Preview = PREVIEWS[template.previewType] || PadelArenaPreview
  const { theme } = template
  const skin = SKIN_CLASS[template.skin] ?? ''

  return (
    <div
      className={`@container relative min-h-full font-sans antialiased ${skin}`}
      data-skin={template.skin || 'default'}
      style={{
        '--ink': theme.ink,
        '--accent': theme.accent,
        '--accent-2': theme.accent2,
        '--tint': theme.tint,
        '--soft': theme.soft,
        background: theme.soft,
        color: theme.ink,
      }}
    >
      <Preview key={template.id} template={template} />
    </div>
  )
}
