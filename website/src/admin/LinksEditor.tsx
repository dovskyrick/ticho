import { useEffect, useState } from 'react';
import { fetchLinks } from '../lib/content';
import { defaultLinks } from '../data/defaults';
import type { MusicLink } from '../lib/types';
import { saveLinks } from './services';

export default function LinksEditor() {
  const [links, setLinks] = useState<MusicLink[]>(defaultLinks);
  const [busy, setBusy] = useState(false);
  const [msg, setMsg] = useState<string | null>(null);

  useEffect(() => { fetchLinks().then(l => l && setLinks(l)); }, []);

  const set = (i: number, patch: Partial<MusicLink>) =>
    setLinks(ls => ls.map((l, j) => (j === i ? { ...l, ...patch } : l)));
  const move = (i: number, d: -1 | 1) => setLinks(ls => {
    const j = i + d; if (j < 0 || j >= ls.length) return ls;
    const c = [...ls]; [c[i], c[j]] = [c[j], c[i]]; return c;
  });

  async function save() {
    setBusy(true); setMsg(null);
    try { await saveLinks(links); setMsg('Saved ✓'); }
    catch (e) { console.error(e); setMsg('Save failed.'); }
    finally { setBusy(false); }
  }

  return (
    <section>
      <div className="row-between">
        <h2>Music links</h2>
        <button onClick={save} disabled={busy}>{busy ? 'Saving…' : 'Save links'}</button>
      </div>
      <p className="muted">Paste your profile URLs. Untick “show” to hide a button. Arrows change the order.</p>
      {msg && <p className="notice">{msg}</p>}
      <ul className="link-rows">
        {links.map((l, i) => (
          <li key={l.id} className="card">
            <div className="link-row-head">
              <strong>{l.label}</strong>
              <label className="check"><input type="checkbox" checked={l.visible} onChange={e => set(i, { visible: e.target.checked })} /> show</label>
              <span className="arrows">
                <button className="ghost" onClick={() => move(i, -1)} disabled={i === 0}>↑</button>
                <button className="ghost" onClick={() => move(i, 1)} disabled={i === links.length - 1}>↓</button>
              </span>
            </div>
            <input type="url" value={l.url} placeholder="https://…" onChange={e => set(i, { url: e.target.value })} />
          </li>
        ))}
      </ul>
    </section>
  );
}
