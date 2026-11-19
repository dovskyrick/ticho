import './theme.css';
import '../classic-shared.css';
import type { ThemeDef } from '../../types';

export default {
  id: 'classic-light',
  label: 'Classic Light',
  description: 'First draft · rust-red flag on paper',
  swatch: ['#f6f3ec', '#ffffff', '#b5371f', '#16151a'],
  fontsHref: 'https://fonts.googleapis.com/css2?family=Bebas+Neue&family=Inter:wght@400;500;700&display=swap',
} satisfies ThemeDef;
