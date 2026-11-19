// What every theme module exports. See theme/README.md for how to add one.
export interface ThemeDef {
  id: string;            // used as  <html data-theme="id">  and in CSS selectors
  label: string;         // shown in the theme menu
  description?: string;  // small hint under the label
  swatch: string[];      // 2–4 colours for the menu preview dots
  fontsHref?: string;    // Google Fonts URL, loaded only when the theme is picked
}
