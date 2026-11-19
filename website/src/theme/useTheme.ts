import { useSyncExternalStore } from 'react';
import { ACTIVE_THEMES, DEFAULT_THEME } from './themes';

// Tiny global store so every component (toggle, duotone filters, …) shares one theme.
const KEY = 'ticho-theme';
const listeners = new Set<() => void>();

function readStored(): string {
  try {
    const v = localStorage.getItem(KEY);
    if (v && ACTIVE_THEMES.some(t => t.id === v)) return v;
  } catch { /* storage blocked */ }
  return DEFAULT_THEME;
}

let current = readStored();
document.documentElement.dataset.theme = current;

export function setTheme(id: string) {
  current = id;
  document.documentElement.dataset.theme = id;
  try { localStorage.setItem(KEY, id); } catch { /* ignore */ }
  listeners.forEach(l => l());
}

const subscribe = (l: () => void) => { listeners.add(l); return () => { listeners.delete(l); }; };

export function useTheme() {
  const theme = useSyncExternalStore(subscribe, () => current);
  const i = Math.max(0, ACTIVE_THEMES.findIndex(t => t.id === theme));
  const cur = ACTIVE_THEMES[i];
  const next = ACTIVE_THEMES[(i + 1) % ACTIVE_THEMES.length];
  return { theme, current: cur, next, setTheme, cycle: () => setTheme(next.id) };
}
