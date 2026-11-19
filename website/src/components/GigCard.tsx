import type { Gig } from '../lib/types';
import { formatDate } from '../lib/types';

export default function GigCard({ gig, past }: { gig: Gig; past?: boolean }) {
  const body = (
    <>
      <img src={gig.imageUrl} alt={`${gig.title} at ${gig.venue}`} loading="lazy" />
      <div className="gig-info">
        <span className="gig-date">{formatDate(gig.date)}</span>
        <h3>{gig.title}</h3>
        <span className="gig-place">{gig.venue}{gig.city ? ` · ${gig.city}` : ''}</span>
      </div>
    </>
  );
  const cls = `gig-card${past ? ' past' : ''}`;
  return gig.link
    ? <a className={cls} href={gig.link} target="_blank" rel="noreferrer">{body}</a>
    : <div className={cls}>{body}</div>;
}
