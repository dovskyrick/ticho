// Renders SVG filters #duo-a / #duo-b using the current theme's --duo-* CSS colours.
// Photos get the KEFI-feed look via `filter: url(#duo-a)` (see styles.css).
import { useLayoutEffect, useState } from 'react';
import { useTheme } from './useTheme';

type Pair = [string, string];

function hexToRgb(hex: string): [number, number, number] {
  const h = hex.trim().replace('#', '');
  const n = parseInt(h.length === 3 ? h.split('').map(c => c + c).join('') : h, 16);
  return [(n >> 16) & 255, (n >> 8) & 255, n & 255].map(v => +(v / 255).toFixed(3)) as [number, number, number];
}

function Filter({ id, pair }: { id: string; pair: Pair }) {
  const [d, l] = pair.map(hexToRgb);
  const t = (i: number) => `${d[i]} ${l[i]}`;
  return (
    <filter id={id} colorInterpolationFilters="sRGB">
      <feColorMatrix type="matrix" values=".3 .59 .11 0 0  .3 .59 .11 0 0  .3 .59 .11 0 0  0 0 0 1 0" />
      <feComponentTransfer>{/* a bit of contrast so it reads like print */}
        <feFuncR type="linear" slope="1.25" intercept="-0.1" />
        <feFuncG type="linear" slope="1.25" intercept="-0.1" />
        <feFuncB type="linear" slope="1.25" intercept="-0.1" />
      </feComponentTransfer>
      <feComponentTransfer>
        <feFuncR type="table" tableValues={t(0)} />
        <feFuncG type="table" tableValues={t(1)} />
        <feFuncB type="table" tableValues={t(2)} />
      </feComponentTransfer>
    </filter>
  );
}

export default function DuotoneFilters() {
  const { theme } = useTheme();
  const [pairs, setPairs] = useState<{ a: Pair; b: Pair } | null>(null);

  useLayoutEffect(() => {
    const s = getComputedStyle(document.documentElement);
    const v = (n: string) => s.getPropertyValue(n) || '#000';
    setPairs({ a: [v('--duo-a-dark'), v('--duo-a-light')], b: [v('--duo-b-dark'), v('--duo-b-light')] });
  }, [theme]);

  if (!pairs) return null;
  return (
    <svg width="0" height="0" style={{ position: 'absolute' }} aria-hidden="true">
      <Filter id="duo-a" pair={pairs.a} />
      <Filter id="duo-b" pair={pairs.b} />
    </svg>
  );
}
