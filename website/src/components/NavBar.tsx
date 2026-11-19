export type Tab = 'gigs' | 'music' | 'about';

const ITEMS: { id: Tab; label: string }[] = [
  { id: 'gigs', label: 'Gigs' },
  { id: 'music', label: 'Music' },
  { id: 'about', label: 'About' },
];

export default function NavBar({ tab }: { tab: Tab }) {
  return (
    <header className="nav">
      <a href="#gigs" className="nav-logo" aria-label="Ticho — home">
        TICHO<span className="logo-bars" aria-hidden="true"><i /><i /><i /></span>
      </a>
      <nav className="nav-links">
        {ITEMS.map(i => (
          <a key={i.id} href={`#${i.id}`} className={tab === i.id ? 'active' : ''}>{i.label}</a>
        ))}
      </nav>
    </header>
  );
}
