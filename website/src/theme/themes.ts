// ─── Theme registry ──────────────────────────────────────────────────────────
// Each theme = an id here + a matching `[data-theme="<id>"]` block in themes.css.
// To try a new theme: add an entry below and a CSS block. The toggle button
// cycles through every theme listed in ACTIVE_THEMES, in order.
//
// Planned for later (uncomment + add CSS when we get to them):
//   { id: 'treasure', label: 'Treasure' }   – gold on deep navy
//   { id: 'neon',     label: 'Neon' }       – club lights, magenta / cyan
//   { id: 'parchment',label: 'Parchment' }  – old map, sepia, serif
//   { id: 'abyss',    label: 'Abyss' }      – deep-sea teal, bioluminescent
// ─────────────────────────────────────────────────────────────────────────────
export interface ThemeDef { id: string; label: string }

export const ACTIVE_THEMES: ThemeDef[] = [
  { id: 'dark', label: 'Dark' },
  { id: 'light', label: 'Light' },
];

export const DEFAULT_THEME = 'dark';
