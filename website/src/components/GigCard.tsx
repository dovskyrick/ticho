import type { Gig } from '../lib/types';
import { shortDate, weekday } from '../lib/types';

// Poster card in the style of the collective's feed:
// duotone photo, thin caps header on hairlines, thin date + heavy yellow name.
export default function GigCard({ gig, past, variant }: { gig: Gig; past?: boolean; variant: 'a' | 'b' }) {
  const body = (
    <>
      <div className={`duo duo-${variant}`}>
        <img src={gig.imageUrl} alt={`${gig.title} at ${gig.venue}`} loading="lazy" />
      </div>
      <div className="poster-top">
        <span className="thin">TICHO × {gig.venue}</span>
        <span className="thin poster-day">{weekday(gig.date)}</span>
        <span className="poster-mark">TICHO</span>
      </div>
      <div className="poster-bottom">
        <span className="poster-date">{shortDate(gig.date, past)}</span>
        <h3>{gig.title}</h3>
        {gig.city && <span className="thin poster-city">{gig.city}</span>}
      </div>
    </>
  );
  const cls = `poster${past ? ' past' : ''}`;
  return gig.link
    ? <a className={cls} href={gig.link} target="_blank" rel="noreferrer">{body}</a>
    : <div className={cls}>{body}</div>;
}
