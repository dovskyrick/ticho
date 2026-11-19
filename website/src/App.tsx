import { useEffect, useState } from 'react';
import NavBar, { type Tab } from './components/NavBar';
import Ticker from './components/Ticker';
import Gigs from './pages/Gigs';
import Music from './pages/Music';
import About from './pages/About';
import ThemeMenu from './theme/ThemeMenu';
import DuotoneFilters from './theme/DuotoneFilters';
import { isFirebaseConfigured } from './lib/firebase';

// Hash routing (#gigs / #music / #about) — works on GitHub Pages without server rewrites.
const TABS: Tab[] = ['gigs', 'music', 'about'];
const fromHash = (): Tab => {
  const h = window.location.hash.replace(/^#\/?/, '') as Tab;
  return TABS.includes(h) ? h : 'gigs';
};

export default function App() {
  const [tab, setTab] = useState<Tab>(fromHash);

  useEffect(() => {
    const onHash = () => { setTab(fromHash()); window.scrollTo(0, 0); };
    window.addEventListener('hashchange', onHash);
    return () => window.removeEventListener('hashchange', onHash);
  }, []);

  return (
    <div className="app">
      <DuotoneFilters />
      <NavBar tab={tab} />
      <Ticker />
      <main className="main" key={tab}>
        {tab === 'gigs' && <Gigs />}
        {tab === 'music' && <Music />}
        {tab === 'about' && <About />}
      </main>
      <footer className="footer">
        <span className="thin">TICHO © {new Date().getFullYear()}</span>
        <span className="thin">✶ made by the sea ✶</span>
        {!isFirebaseConfigured && <span className="thin demo-badge">demo content</span>}
      </footer>
      <ThemeMenu />
    </div>
  );
}
