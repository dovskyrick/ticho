import { useLinks } from '../lib/content';

export default function Music() {
  const { data } = useLinks();
  const links = data.filter(l => l.visible && l.url);
  return (
    <div className="music">
      <h2 className="music-title">Listen</h2>
      <p className="section-sub">Pick your port</p>
      <ul className="link-list">
        {links.map(l => (
          <li key={l.id}>
            <a className="link-btn" href={l.url} target="_blank" rel="noreferrer">{l.label}</a>
          </li>
        ))}
      </ul>
    </div>
  );
}
