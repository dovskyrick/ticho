import { useSyncExternalStore } from 'react';
import { DEFAULT_THEME, THEMES } from './registry';
import type { ThemeDef } from './types';

// Tiny global store so every component (menu, duotone filters, …) shares one theme.
const KEY = 'ticho-theme';
const listeners = new Set<() => void>();
const find = (id: string) => THEMES.find(t => t.id === id);

function readStored(): string {
  try {
    const v = localStorage.getItem(KEY);
    if (v && find(v)) return v;
  } catch { /* storage blocked */ }
  return DEFAULT_THEME;
}

// Load a theme's extra web fonts once, only when it's actually used.
function ensureFonts(t?: ThemeDef) {
  if (!t?.fontsHref || document.querySelector(`link[data-theme-fonts="${t.id}"]`)) return;
  const link = document.createElement('link');
  link.rel = 'stylesheet';
  link.href = t.fontsHref;
  link.dataset.themeFonts = t.id;
  document.head.appendChild(link);
}

function apply(id: string) {
  document.documentElement.dataset.theme = id;
  ensureFonts(find(id));
}

let current = readStored();
apply(current);

export function setTheme(id: string) {
  if (!find(id)) return;
  current = id;
  apply(id);
  try { localStorage.setItem(KEY, id); } catch { /* ignore */ }
  listeners.forEach(l => l());
}

const subscribe = (l: () => void) => { listeners.add(l); return () => { listeners.delete(l); }; };

export function useTheme() {
  const theme = useSyncExternalStore(subscribe, () => current);
  return { theme, current: find(theme) ?? THEMES[0], themes: THEMES, setTheme };
}
