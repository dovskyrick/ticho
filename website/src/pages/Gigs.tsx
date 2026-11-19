import GigCard from '../components/GigCard';
import SectionHead from '../components/SectionHead';
import { useGigs } from '../lib/content';
import { splitGigs } from '../lib/types';

export default function Gigs() {
  const { data, loading } = useGigs();
  const { upcoming, past } = splitGigs(data);
  const year = String(new Date().getFullYear());

  if (loading) return <p className="state thin">Loading gigs…</p>;

  return (
    <div className="gigs">
      <section className="gig-section upcoming">
        <SectionHead label="Next dates" right={year} title="Upcoming" accent />
        {upcoming.length
          ? <div className="poster-grid">{upcoming.map((g, i) => <GigCard key={g.id} gig={g} variant={i % 2 ? 'b' : 'a'} />)}</div>
          : <p className="state thin">No dates announced yet — the boat is out at sea.</p>}
      </section>

      <section className="gig-section past">
        <SectionHead label="Archive" right={`${past.length} nights`} title="History" />
        {past.length
          ? <div className="poster-grid wall">{past.map((g, i) => <GigCard key={g.id} gig={g} past variant={i % 2 ? 'a' : 'b'} />)}</div>
          : <p className="state thin">No past gigs yet.</p>}
      </section>
    </div>
  );
}
