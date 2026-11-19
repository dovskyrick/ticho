// Discreet theme switcher (bottom-right). Remove by deleting <ThemeToggle /> in App.tsx.
import { useTheme } from './useTheme';

export default function ThemeToggle() {
  const { current, next, cycle } = useTheme();
  return (
    <button className="theme-toggle" onClick={cycle} aria-label={`Switch to ${next.label} theme`} title={`Switch to ${next.label}`}>
      <span className="theme-dot" /> {current.label}
    </button>
  );
}
