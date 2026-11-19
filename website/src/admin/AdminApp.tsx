import { useEffect, useState } from 'react';
import type { User } from 'firebase/auth';
import { isFirebaseConfigured } from '../lib/firebase';
import { useTheme } from '../theme/useTheme';
import { logout, watchUser } from './services';
import Login from './Login';
import GigsEditor from './GigsEditor';
import LinksEditor from './LinksEditor';
import AboutEditor from './AboutEditor';

type Section = 'gigs' | 'links' | 'about';

export default function AdminApp() {
  useTheme();
  const [user, setUser] = useState<User | null>(null);
  const [ready, setReady] = useState(!isFirebaseConfigured);
  const [section, setSection] = useState<Section>('gigs');

  useEffect(() => {
    if (!isFirebaseConfigured) return;
    return watchUser(u => { setUser(u); setReady(true); });
  }, []);

  if (!isFirebaseConfigured) {
    return (
      <div className="center">
        <div className="card">
          <h1>Back-office</h1>
          <p>Firebase isn't connected yet. Fill in <code>src/lib/firebase-config.ts</code> (see <code>website/docs/HIL-firebase-setup.md</code>).</p>
        </div>
      </div>
    );
  }
  if (!ready) return <div className="center"><p>Loading…</p></div>;
  if (!user) return <Login />;

  return (
    <div className="admin">
      <header className="admin-nav">
        <strong>TICHO · back-office</strong>
        <nav>
          {(['gigs', 'links', 'about'] as Section[]).map(s => (
            <button key={s} className={section === s ? 'active' : ''} onClick={() => setSection(s)}>
              {s === 'gigs' ? 'Gigs' : s === 'links' ? 'Music links' : 'About'}
            </button>
          ))}
        </nav>
        <div className="admin-user">
          <a href={import.meta.env.BASE_URL} target="_blank" rel="noreferrer">View site ↗</a>
          <button className="ghost" onClick={() => logout()}>Log out</button>
        </div>
      </header>
      <main className="admin-main">
        {section === 'gigs' && <GigsEditor />}
        {section === 'links' && <LinksEditor />}
        {section === 'about' && <AboutEditor />}
      </main>
    </div>
  );
}
