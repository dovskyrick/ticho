# Ticho website

One Vite + React + TypeScript project, **two pages in one build**:

| URL | Source | Who |
|---|---|---|
| `/ticho/` | `index.html` → `src/main.tsx` | public |
| `/ticho/admin/` | `admin/index.html` → `src/admin/` | Ticho (login required) |

## How it fits together

```
GitHub Pages (static HTML/JS, built by .github/workflows/deploy-website.yml)
        │  reads (anyone)                    │  writes (logged-in admins only)
        ▼                                    ▼
  Firestore: gigs/*, site/links, site/about     Firebase Storage: gigs/*, about/*
        ▲ enforced by firestore.rules / storage.rules (UID allow-list)
```

- **Auth:** Firebase Email/Password. Accounts are created by hand in the Firebase console; only UIDs listed in the rules files can write. No passwords live in this repo — a password file in a static site would be readable by anyone.
- **Demo mode:** while `src/lib/firebase-config.ts` is empty, the site shows placeholder content from `src/data/defaults.ts`.
- **Gigs:** upcoming vs. history is decided by date automatically (`splitGigs` in `src/lib/types.ts`).
- **Images:** the back-office shrinks uploads to max 1600 px JPEG before upload.

## Themes & look
KEFI-collective poster style: duotone photos (SVG filters built from the theme's `--duo-*` colours in `src/theme/DuotoneFilters.tsx`), heavy uppercase Montserrat names, thin caps labels on hairlines, grain overlay, scrolling ticker (`src/components/Ticker.tsx`, removable). Themes: **night** (default, red/blue + yellow) and **day** (sand, orange/cobalt).

- Tokens (colors, fonts, radius) per theme: `src/theme/themes.css` (`[data-theme="…"]` blocks).
- Registry the toggle cycles through: `src/theme/themes.ts` (4 future themes sketched in comments).
- Toggle button: `src/theme/ThemeToggle.tsx`; remove by deleting `<ThemeToggle />` in `src/App.tsx`.

## Dev
```bash
npm install
npm run dev          # http://localhost:5173  and  http://localhost:5173/admin/
npm run build
```

Setup checklist for Firebase + Pages: [`docs/HIL-firebase-setup.md`](docs/HIL-firebase-setup.md).
