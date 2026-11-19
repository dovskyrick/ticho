export type Tab = 'gigs' | 'music' | 'about';

const ITEMS: { id: Tab; label: string }[] = [
  { id: 'gigs', label: 'Gigs' },
  { id: 'music', label: 'Music' },
  { id: 'about', label: 'About' },
];

export default function NavBar({ tab }: { tab: Tab }) {
  return (
    <header className="nav">
      <a href="#gigs" className="nav-logo">TICHO</a>
      <nav className="nav-links">
        {ITEMS.map(i => (
          <a key={i.id} href={`#${i.id}`} className={tab === i.id ? 'active' : ''}>{i.label}</a>
        ))}
      </nav>
    </header>
  );
}
