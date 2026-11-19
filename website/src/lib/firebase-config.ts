// ─────────────────────────────────────────────────────────────────────────────
// Paste the Ticho Firebase web config here (docs/HIL-firebase-setup.md, step 3).
// These values are NOT secret — Firebase web configs are public by design.
// Security comes from firestore.rules / storage.rules, not from hiding this.
//
// While apiKey is empty the site runs in "demo mode" with placeholder content
// from src/data/defaults.ts, and the back-office shows a "not connected" notice.
// ─────────────────────────────────────────────────────────────────────────────
export const firebaseConfig = {
  apiKey: '',
  authDomain: '',
  projectId: '',
  storageBucket: '',
  messagingSenderId: '',
  appId: '',
};
