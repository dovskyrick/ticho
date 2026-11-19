// ─── Theme registry ──────────────────────────────────────────────────────────
// One folder per theme in ./themes/<id>/ (index.ts = metadata, theme.css = look).
// To add a theme: copy a folder, change id/label/colours, import it below.
// To remove one from the menu: delete its line in THEMES (folder can stay).
// Ideas queued: lighthouse, tangerine, golden-hour, atlantic.
// ─────────────────────────────────────────────────────────────────────────────
import night from './themes/night';
import day from './themes/day';
import classicDark from './themes/classic-dark';
import classicLight from './themes/classic-light';
import type { ThemeDef } from './types';

export const THEMES: ThemeDef[] = [night, day, classicDark, classicLight];
export const DEFAULT_THEME = night.id;
