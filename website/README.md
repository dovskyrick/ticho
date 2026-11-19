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
Default look follows the KEFI-collective posters (duotone photos, heavy Montserrat, hairline labels, grain, ticker).
Picker: bottom-right drop-up menu (`src/theme/ThemeMenu.tsx`); remove by deleting `<ThemeMenu />` in `src/App.tsx`.
Each theme lives in its own folder under `src/theme/themes/` — see [`src/theme/README.md`](src/theme/README.md) to add one.
Current: **Night** (default), **Day**, **Classic Dark**, **Classic Light** (the two first-draft looks).

## Dev
```bash
npm install
npm run dev          # http://localhost:5173  and  http://localhost:5173/admin/
npm run build
```

Setup checklist for Firebase + Pages: [`docs/HIL-firebase-setup.md`](docs/HIL-firebase-setup.md).
