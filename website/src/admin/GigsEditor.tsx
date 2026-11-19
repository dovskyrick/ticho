import { useEffect, useState, type FormEvent } from 'react';
import { fetchGigs } from '../lib/content';
import { formatDate, splitGigs, type Gig } from '../lib/types';
import { createGig, deleteGig, removeImage, updateGig, uploadImage } from './services';

type Draft = Omit<Gig, 'id'> & { id?: string };
const empty: Draft = { title: '', venue: '', city: '', date: '', imageUrl: '', link: '' };

export default function GigsEditor() {
  const [gigs, setGigs] = useState<Gig[]>([]);
  const [loading, setLoading] = useState(true);
  const [draft, setDraft] = useState<Draft | null>(null);
  const [file, setFile] = useState<File | null>(null);
  const [busy, setBusy] = useState(false);
  const [msg, setMsg] = useState<string | null>(null);

  const reload = () => fetchGigs().then(g => setGigs(g ?? [])).finally(() => setLoading(false));
  useEffect(() => { reload(); }, []);

  function open(g?: Gig) { setDraft(g ? { ...g } : { ...empty }); setFile(null); setMsg(null); }

  async function save(e: FormEvent) {
    e.preventDefault();
    if (!draft) return;
    if (!draft.imageUrl && !file) { setMsg('Please choose a photo.'); return; }
    setBusy(true); setMsg(null);
    try {
      const data: Draft = { ...draft };
      if (file) {
        const old = draft.imagePath;
        Object.assign(data, await uploadImage('gigs', file));
        if (draft.id) await removeImage(old);
      }
      if (data.id) await updateGig(data.id, data);
      else { const { id: _i, ...rest } = data; void _i; await createGig(rest); }
      setDraft(null);
      await reload();
      setMsg('Saved ✓');
    } catch (err) {
      console.error(err); setMsg('Save failed — check your connection and try again.');
    } finally { setBusy(false); }
  }

  async function remove(g: Gig) {
    if (!confirm(`Delete "${g.title}" (${formatDate(g.date)})? This can't be undone.`)) return;
    setBusy(true);
    try { await deleteGig(g); await reload(); setMsg('Deleted.'); }
    catch (err) { console.error(err); setMsg('Delete failed.'); }
    finally { setBusy(false); }
  }

  const { upcoming, past } = splitGigs(gigs);
  const preview = file ? URL.createObjectURL(file) : draft?.imageUrl;

  return (
    <section>
      <div className="row-between">
        <h2>Gigs</h2>
        <button onClick={() => open()} disabled={busy}>+ Add gig</button>
      </div>
      <p className="muted">Gigs with a date from today onwards appear under <b>Upcoming</b>; older ones move to <b>History</b> automatically.</p>
      {msg && <p className="notice">{msg}</p>}

      {draft && (
        <form className="card editor" onSubmit={save}>
          <h3>{draft.id ? 'Edit gig' : 'New gig'}</h3>
          <div className="editor-grid">
            <div className="photo-pick">
              {preview ? <img src={preview} alt="" /> : <div className="photo-empty">No photo</div>}
              <label className="file-btn">
                {preview ? 'Change photo' : 'Choose photo'}
                <input type="file" accept="image/*" hidden onChange={e => setFile(e.target.files?.[0] ?? null)} />
              </label>
            </div>
            <div className="fields">
              <label>Event name<input value={draft.title} onChange={e => setDraft({ ...draft, title: e.target.value })} required /></label>
              <label>Date<input type="date" value={draft.date} onChange={e => setDraft({ ...draft, date: e.target.value })} required /></label>
              <label>Venue<input value={draft.venue} onChange={e => setDraft({ ...draft, venue: e.target.value })} required /></label>
              <label>City<input value={draft.city} onChange={e => setDraft({ ...draft, city: e.target.value })} /></label>
              <label>Tickets / event link (optional)<input type="url" placeholder="https://…" value={draft.link ?? ''} onChange={e => setDraft({ ...draft, link: e.target.value })} /></label>
            </div>
          </div>
          <div className="row-end">
            <button type="button" className="ghost" onClick={() => setDraft(null)} disabled={busy}>Cancel</button>
            <button type="submit" disabled={busy}>{busy ? 'Saving…' : 'Save'}</button>
          </div>
        </form>
      )}

      {loading ? <p className="muted">Loading…</p> : (
        <>
          <GigList title={`Upcoming (${upcoming.length})`} gigs={upcoming} onEdit={open} onDelete={remove} busy={busy} />
          <GigList title={`History (${past.length})`} gigs={past} onEdit={open} onDelete={remove} busy={busy} />
        </>
      )}
    </section>
  );
}

function GigList({ title, gigs, onEdit, onDelete, busy }: {
  title: string; gigs: Gig[]; onEdit: (g: Gig) => void; onDelete: (g: Gig) => void; busy: boolean;
}) {
  return (
    <>
      <h3 className="list-title">{title}</h3>
      {gigs.length === 0 && <p className="muted">None.</p>}
      <ul className="item-list">
        {gigs.map(g => (
          <li key={g.id}>
            <img src={g.imageUrl} alt="" />
            <div className="item-text">
              <strong>{g.title}</strong>
              <span className="muted">{formatDate(g.date)} · {g.venue}{g.city ? `, ${g.city}` : ''}</span>
            </div>
            <button className="ghost" onClick={() => onEdit(g)} disabled={busy}>Edit</button>
            <button className="danger" onClick={() => onDelete(g)} disabled={busy}>Delete</button>
          </li>
        ))}
      </ul>
    </>
  );
}
