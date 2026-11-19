import { useAbout } from '../lib/content';

export default function About() {
  const { data } = useAbout();
  return (
    <div className="about">
      <div className="about-text">
        <h2>The Pirate Who Became a DJ</h2>
        {data.story.split(/\n\s*\n/).map((p, i) => <p key={i}>{p}</p>)}
      </div>
      <div className="about-photo">
        <img src={data.imageUrl} alt="Ticho, the DJ" />
      </div>
    </div>
  );
}
