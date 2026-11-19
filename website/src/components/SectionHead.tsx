// Hairline label row + huge heavy title, like the event posters.
export default function SectionHead({ label, right, title, accent }: {
  label: string; right?: string; title: string; accent?: boolean;
}) {
  return (
    <div className="section-head">
      <div className="hairline-row">
        <span className="thin">{label}</span>
        {right && <span className="thin">{right}</span>}
      </div>
      <h2 className={accent ? 'accent' : ''}>{title}</h2>
    </div>
  );
}
