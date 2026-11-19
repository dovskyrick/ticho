import SectionHead from '../components/SectionHead';
import { useLinks } from '../lib/content';

export default function Music() {
  const { data } = useLinks();
  const links = data.filter(l => l.visible && l.url);
  return (
    <div className="music">
      <SectionHead label="Pick your platform" right={`${links.length} ports`} title="Listen" accent />
      <ol className="link-list">
        {links.map((l, i) => (
          <li key={l.id}>
            <a className="link-row" href={l.url} target="_blank" rel="noreferrer">
              <span className="link-num">{String(i + 1).padStart(2, '0')}</span>
              <span className="link-label">{l.label}</span>
              <span className="link-arrow" aria-hidden="true">↗</span>
            </a>
          </li>
        ))}
      </ol>
    </div>
  );
}
