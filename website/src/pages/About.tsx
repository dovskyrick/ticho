import SectionHead from '../components/SectionHead';
import { useAbout } from '../lib/content';

export default function About() {
  const { data } = useAbout();
  const paras = data.story.split(/\n\s*\n/);
  return (
    <div className="about">
      <div className="about-text">
        <SectionHead label="The story" right="Ticho" title="The pirate who became a DJ" />
        {paras.map((p, i) => (
          <p key={i} className={i === paras.length - 1 ? 'about-punch' : ''}>{p}</p>
        ))}
      </div>
      <figure className="about-photo">
        <img src={data.imageUrl} alt="Ticho behind the decks" />
        <figcaption className="hairline-row">
          <span className="thin">Ticho</span><span className="thin">behind the decks</span>
        </figcaption>
      </figure>
    </div>
  );
}
