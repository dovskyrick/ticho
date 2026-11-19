export interface Gig {
  id: string;
  title: string;      // event / party name
  venue: string;
  city: string;
  date: string;       // YYYY-MM-DD — decides "upcoming" vs "past" automatically
  imageUrl: string;
  imagePath?: string; // path in Firebase Storage (so we can delete it)
  link?: string;      // tickets / event page
}

export interface MusicLink {
  id: string;
  label: string;
  url: string;
  visible: boolean;
}

export interface AboutContent {
  story: string;      // paragraphs separated by blank lines
  imageUrl: string;
  imagePath?: string;
}

export function todayISO(): string {
  const d = new Date();
  const pad = (n: number) => String(n).padStart(2, '0');
  return `${d.getFullYear()}-${pad(d.getMonth() + 1)}-${pad(d.getDate())}`;
}

export function splitGigs(gigs: Gig[]) {
  const today = todayISO();
  const upcoming = gigs.filter(g => g.date >= today).sort((a, b) => a.date.localeCompare(b.date));
  const past = gigs.filter(g => g.date < today).sort((a, b) => b.date.localeCompare(a.date));
  return { upcoming, past };
}

export function formatDate(iso: string): string {
  const d = new Date(iso + 'T12:00:00');
  if (Number.isNaN(d.getTime())) return iso;
  return d.toLocaleDateString('en-GB', { day: '2-digit', month: 'short', year: 'numeric' });
}

// Poster-style bits: "14.06", "SATURDAY"
export function shortDate(iso: string, withYear = false): string {
  const [y, m, d] = iso.split('-');
  return withYear ? `${d}.${m}.${y?.slice(2)}` : `${d}.${m}`;
}
export function weekday(iso: string): string {
  const d = new Date(iso + 'T12:00:00');
  return Number.isNaN(d.getTime()) ? '' : d.toLocaleDateString('en-GB', { weekday: 'long' }).toUpperCase();
}
