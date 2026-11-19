// ─────────────────────────────────────────────────────────────────────────────
// Paste the Ticho Firebase web config here (docs/HIL-firebase-setup.md, step 3).
// These values are NOT secret — Firebase web configs are public by design.
// Security comes from firestore.rules / storage.rules, not from hiding this.
//
// While apiKey is empty the site runs in "demo mode" with placeholder content
// from src/data/defaults.ts, and the back-office shows a "not connected" notice.
// ─────────────────────────────────────────────────────────────────────────────
export const firebaseConfig = {
  apiKey: 'AIzaSyAIRyJYhHntC91Bt31QzvhS-YcfKY49nMk',
  authDomain: 'ticho-29792.firebaseapp.com',
  projectId: 'ticho-29792',
  storageBucket: 'ticho-29792.firebasestorage.app',
  messagingSenderId: '559286329162',
  appId: '1:559286329162:web:ea755cc2857c24cf57ebb3',
};
