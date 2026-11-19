# Themes

```
theme/
├── base.css          default tokens every theme overrides
├── types.ts          ThemeDef (id, label, description, swatch, fontsHref)
├── registry.ts       ← the list shown in the menu (order = menu order)
├── useTheme.ts       global store: applies <html data-theme>, saves choice, lazy-loads fonts
├── ThemeMenu.tsx     drop-up picker (bottom-right)
├── DuotoneFilters.tsx builds the photo duotone filters from --duo-* tokens
└── themes/
    ├── night/          index.ts (metadata) + theme.css (tokens & overrides)
    ├── day/
    ├── classic-dark/
    ├── classic-light/
    └── classic-shared.css   layout tweaks both classic themes share
```

## Add a theme
1. Copy `themes/night/` to `themes/<new-id>/`.
2. In `index.ts`: change `id`, `label`, `description`, `swatch` (+ `fontsHref` if it needs new fonts).
3. In `theme.css`: change the selector to `[data-theme="<new-id>"]` and the tokens.
   Need more than colours? Add scoped rules, e.g. `[data-theme="<new-id>"] .poster-top { … }`.
4. Import it in `registry.ts` and add it to `THEMES`.

Rule of thumb: **tokens first** (colours, fonts, radius, grain, duotone). Only write
scoped overrides when a theme changes *layout*, and keep them inside that theme's folder.
