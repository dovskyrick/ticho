import { useEffect, useState } from 'react';
import NavBar, { type Tab } from './components/NavBar';
import Gigs from './pages/Gigs';
import Music from './pages/Music';
import About from './pages/About';
import ThemeToggle from './theme/ThemeToggle';
import { useTheme } from './theme/useTheme';
import { isFirebaseConfigured } from './lib/firebase';

// Hash routing (#gigs / #music / #about) — works on GitHub Pages without server rewrites.
const TABS: Tab[] = ['gigs', 'music', 'about'];
const fromHash = (): Tab => {
  const h = window.location.hash.replace(/^#\/?/, '') as Tab;
  return TABS.includes(h) ? h : 'gigs';
};

export default function App() {
  useTheme(); // apply stored theme on load
  const [tab, setTab] = useState<Tab>(fromHash);

  useEffect(() => {
    const onHash = () => { setTab(fromHash()); window.scrollTo(0, 0); };
    window.addEventListener('hashchange', onHash);
    return () => window.removeEventListener('hashchange', onHash);
  }, []);

  return (
    <div className="app">
      <NavBar tab={tab} />
      <main className="main">
        {tab === 'gigs' && <Gigs />}
        {tab === 'music' && <Music />}
        {tab === 'about' && <About />}
      </main>
      <footer className="footer">
        <span>© {new Date().getFullYear()} Ticho</span>
        {!isFirebaseConfigured && <span className="demo-badge">demo content</span>}
      </footer>
      <ThemeToggle />
    </div>
  );
}
