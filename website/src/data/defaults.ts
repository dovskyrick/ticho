import type { AboutContent, Gig, MusicLink } from '../lib/types';

// Placeholder content used (a) in demo mode before Firebase is connected and
// (b) as a fallback when Firestore has nothing yet. Images live in /public/placeholders.
const ph = (name: string) => `${import.meta.env.BASE_URL}placeholders/${name}.svg`;

function offset(days: number): string {
  const d = new Date();
  d.setDate(d.getDate() + days);
  return d.toISOString().slice(0, 10);
}

export const defaultGigs: Gig[] = [
  { id: 'demo-1', title: 'Jolly Roger Sessions', venue: 'The Harbour Club', city: 'Lisbon', date: offset(12), imageUrl: ph('gig-upcoming-1') },
  { id: 'demo-2', title: 'Low Tide Rave', venue: 'Warehouse 9', city: 'Porto', date: offset(34), imageUrl: ph('gig-upcoming-2') },
  { id: 'demo-3', title: 'Sunset on Deck', venue: 'Rooftop Bar', city: 'Lisbon', date: offset(-20), imageUrl: ph('gig-past-1') },
  { id: 'demo-4', title: 'Treasure Hunt Vol. 2', venue: 'Lux Frágil', city: 'Lisbon', date: offset(-61), imageUrl: ph('gig-past-2') },
  { id: 'demo-5', title: 'Mutiny Night', venue: 'Club Kraken', city: 'Coimbra', date: offset(-120), imageUrl: ph('gig-past-3') },
  { id: 'demo-6', title: 'Shipwreck Afterparty', venue: 'Beach Shack', city: 'Ericeira', date: offset(-200), imageUrl: ph('gig-past-4') },
];

// Order here = order of the buttons on the Music page.
export const defaultLinks: MusicLink[] = [
  { id: 'bandcamp', label: 'Bandcamp', url: 'https://bandcamp.com', visible: true },
  { id: 'youtube', label: 'YouTube', url: 'https://youtube.com', visible: true },
  { id: 'spotify', label: 'Spotify', url: 'https://open.spotify.com', visible: true },
  { id: 'apple-music', label: 'Apple Music', url: 'https://music.apple.com', visible: true },
  { id: 'soundcloud', label: 'SoundCloud', url: 'https://soundcloud.com', visible: true },
  { id: 'instagram', label: 'Instagram', url: 'https://instagram.com', visible: true },
];

export const defaultAbout: AboutContent = {
  imageUrl: ph('about-dj'),
  story: `Ticho was born on the deck of a ship that never stayed in one port for long. He spent his youth raiding merchant vessels, collecting gold, maps and — strangely — crates of vinyl records nobody else wanted.

One stormy night, with the cannons silent and the crew restless, he dragged a battered turntable onto the deck and dropped the needle. The crew stopped arguing. Then they started dancing. By sunrise, even the prisoners were asking for one more track.

That was the night Ticho traded his cutlass for a crossfader. He sailed into the clubs of the coast with a new kind of plunder: basslines stolen from the deep, rhythms carried on the trade winds, and a flag that still flies over every booth he plays.

The treasure was never the gold. It was the dancefloor.`,
};
