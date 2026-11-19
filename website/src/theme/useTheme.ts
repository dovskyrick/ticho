import { useCallback, useEffect, useState } from 'react';
import { ACTIVE_THEMES, DEFAULT_THEME } from './themes';

const KEY = 'ticho-theme';

function readStored(): string {
  try {
    const v = localStorage.getItem(KEY);
    if (v && ACTIVE_THEMES.some(t => t.id === v)) return v;
  } catch { /* storage blocked */ }
  return DEFAULT_THEME;
}

export function useTheme() {
  const [theme, setTheme] = useState<string>(readStored);

  useEffect(() => {
    document.documentElement.dataset.theme = theme;
    try { localStorage.setItem(KEY, theme); } catch { /* ignore */ }
  }, [theme]);

  const cycle = useCallback(() => {
    setTheme(cur => {
      const i = ACTIVE_THEMES.findIndex(t => t.id === cur);
      return ACTIVE_THEMES[(i + 1) % ACTIVE_THEMES.length].id;
    });
  }, []);

  const current = ACTIVE_THEMES.find(t => t.id === theme) ?? ACTIVE_THEMES[0];
  const next = ACTIVE_THEMES[(ACTIVE_THEMES.indexOf(current) + 1) % ACTIVE_THEMES.length];
  return { theme, current, next, setTheme, cycle };
}
