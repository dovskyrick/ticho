// Scrolling strip under the nav. Remove by deleting <Ticker /> in App.tsx.
const WORDS = ['TICHO', 'DJ', 'FROM THE COAST', 'SUN DOWN · BASS UP', 'OPEN AIR', 'SEE YOU ON THE DANCEFLOOR'];

export default function Ticker() {
  const line = WORDS.map(w => <span key={w}>{w}<i>✶</i></span>);
  return (
    <div className="ticker" aria-hidden="true">
      <div className="ticker-track">{line}{line}{line}{line}</div>
    </div>
  );
}
