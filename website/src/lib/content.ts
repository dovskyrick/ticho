// Read-side data access for the public site, with placeholder fallbacks.
import { useEffect, useState } from 'react';
import { collection, doc, getDoc, getDocs } from 'firebase/firestore';
import { getDb } from './firebase';
import type { AboutContent, Gig, MusicLink } from './types';
import { defaultAbout, defaultGigs, defaultLinks } from '../data/defaults';

function useLoad<T>(fallback: T, loader: () => Promise<T | null>) {
  const [data, setData] = useState<T>(fallback);
  const [loading, setLoading] = useState(Boolean(getDb()));
  useEffect(() => {
    if (!getDb()) return;
    let alive = true;
    loader()
      .then(v => { if (alive && v !== null) setData(v); })
      .catch(err => console.warn('[content] using placeholders:', err))
      .finally(() => alive && setLoading(false));
    return () => { alive = false; };
  }, []);
  return { data, loading };
}

export async function fetchGigs(): Promise<Gig[] | null> {
  const db = getDb();
  if (!db) return null;
  const snap = await getDocs(collection(db, 'gigs'));
  return snap.docs.map(d => ({ id: d.id, ...(d.data() as Omit<Gig, 'id'>) }));
}

export async function fetchLinks(): Promise<MusicLink[] | null> {
  const db = getDb();
  if (!db) return null;
  const snap = await getDoc(doc(db, 'site', 'links'));
  return snap.exists() ? (snap.data().items as MusicLink[]) : null;
}

export async function fetchAbout(): Promise<AboutContent | null> {
  const db = getDb();
  if (!db) return null;
  const snap = await getDoc(doc(db, 'site', 'about'));
  return snap.exists() ? (snap.data() as AboutContent) : null;
}

// Public site: if Firestore has zero gigs we show placeholders only in demo mode.
export const useGigs = () => useLoad<Gig[]>(getDb() ? [] : defaultGigs, fetchGigs);
export const useLinks = () => useLoad<MusicLink[]>(defaultLinks, fetchLinks);
export const useAbout = () => useLoad<AboutContent>(defaultAbout, fetchAbout);
