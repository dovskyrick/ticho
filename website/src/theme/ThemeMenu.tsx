// Discreet theme picker, bottom-right; the list opens upwards.
// Remove from the site by deleting <ThemeMenu /> in App.tsx.
import { useEffect, useRef, useState } from 'react';
import { useTheme } from './useTheme';
import './ThemeMenu.css';

export default function ThemeMenu() {
  const { current, themes, setTheme } = useTheme();
  const [open, setOpen] = useState(false);
  const root = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!open) return;
    const onDown = (e: PointerEvent) => { if (!root.current?.contains(e.target as Node)) setOpen(false); };
    const onKey = (e: KeyboardEvent) => { if (e.key === 'Escape') setOpen(false); };
    document.addEventListener('pointerdown', onDown);
    document.addEventListener('keydown', onKey);
    return () => { document.removeEventListener('pointerdown', onDown); document.removeEventListener('keydown', onKey); };
  }, [open]);

  return (
    <div className="theme-menu" ref={root}>
      {open && (
        <ul className="theme-list" role="listbox" aria-label="Theme">
          {themes.map(t => (
            <li key={t.id}>
              <button
                role="option"
                aria-selected={t.id === current.id}
                className={t.id === current.id ? 'selected' : ''}
                onClick={() => { setTheme(t.id); setOpen(false); }}
              >
                <Swatch colors={t.swatch} />
                <span className="theme-text">
                  <span className="theme-label">{t.label}</span>
                  {t.description && <span className="theme-desc">{t.description}</span>}
                </span>
                {t.id === current.id && <span className="theme-check" aria-hidden="true">✓</span>}
              </button>
            </li>
          ))}
        </ul>
      )}
      <button
        className="theme-trigger"
        aria-haspopup="listbox"
        aria-expanded={open}
        onClick={() => setOpen(o => !o)}
      >
        <Swatch colors={current.swatch} small /> {current.label} <span aria-hidden="true">{open ? '▾' : '▴'}</span>
      </button>
    </div>
  );
}

function Swatch({ colors, small }: { colors: string[]; small?: boolean }) {
  return (
    <span className={`swatch${small ? ' small' : ''}`} aria-hidden="true">
      {colors.map((c, i) => <i key={i} style={{ background: c }} />)}
    </span>
  );
}
