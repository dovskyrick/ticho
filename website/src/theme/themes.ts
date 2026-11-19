// ─── Theme registry ──────────────────────────────────────────────────────────
// Each theme = an id here + a matching `[data-theme="<id>"]` block in themes.css.
// The toggle button cycles through ACTIVE_THEMES in order.
// Look & feel: KEFI-collective poster style — duotone photos, heavy uppercase
// names, thin caps labels on hairlines, coastal afternoon-to-night energy.
//
// Planned for later (uncomment + add a CSS block when we get to them):
//   { id: 'lighthouse', label: 'Lighthouse' } – teal sky, white + red stripes
//   { id: 'tangerine',  label: 'Tangerine' }  – orange/cobalt duotone, cream text
//   { id: 'golden',     label: 'Golden Hour' }– warm amber/peach, soft grain
//   { id: 'atlantic',   label: 'Atlantic' }   – deep sea green, foam white
// ─────────────────────────────────────────────────────────────────────────────
export interface ThemeDef { id: string; label: string }

export const ACTIVE_THEMES: ThemeDef[] = [
  { id: 'night', label: 'Night' },   // dark: after sunset, red/blue duotone
  { id: 'day', label: 'Day' },       // light: sun & sand, orange/blue duotone
];

export const DEFAULT_THEME = 'night';
