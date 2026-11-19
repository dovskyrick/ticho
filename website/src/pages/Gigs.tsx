import GigCard from '../components/GigCard';
import { useGigs } from '../lib/content';
import { splitGigs } from '../lib/types';

export default function Gigs() {
  const { data, loading } = useGigs();
  const { upcoming, past } = splitGigs(data);

  if (loading) return <p className="state">Loading gigs…</p>;

  return (
    <div className="gigs">
      <section className="gig-section upcoming">
        <div className="section-head">
          <h2>Upcoming</h2>
          <span className="section-sub">Next ports of call</span>
        </div>
        {upcoming.length
          ? <div className="gig-grid">{upcoming.map(g => <GigCard key={g.id} gig={g} />)}</div>
          : <p className="state">No dates announced yet — the ship is at sea.</p>}
      </section>

      <div className="divider" aria-hidden="true"><span>☠</span></div>

      <section className="gig-section past">
        <div className="section-head">
          <h2>History</h2>
          <span className="section-sub">Ships already plundered</span>
        </div>
        {past.length
          ? <div className="gig-grid wall">{past.map(g => <GigCard key={g.id} gig={g} past />)}</div>
          : <p className="state">No past gigs yet.</p>}
      </section>
    </div>
  );
}
