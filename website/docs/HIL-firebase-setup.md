# HIL — Firebase + hosting setup (human-in-the-loop)

Things only you can click. Tick them off in order; tell Claude when a step needs code changes.

## 1. [ ] Enable GitHub Pages
Repo **ticho → Settings → Pages → Build and deployment → Source: "GitHub Actions"**. Then re-run the "Deploy website" workflow in the Actions tab. Site appears at `dovskyrick.github.io/ticho/`.

## 2. [ ] Create Firestore database
Firebase Console → your Ticho project → **Build → Firestore Database → Create database**. Production mode, region close to Portugal (e.g. `europe-west1`). Rules get replaced in step 6 anyway.

## 3. [x] Register web app + copy config
**Project settings → General → Your apps → Add app → Web (</>)**. Name it "ticho-web", skip hosting. Copy the `firebaseConfig` object and paste it to Claude (it's public, not secret).

## 4. [ ] Create Storage bucket
**Build → Storage → Get started**. Production mode, same region as Firestore. Blaze plan is required for new buckets — you have it. Set a budget alert (Billing) at ~€5 for peace of mind.

## 5. [ ] Enable Email/Password login + create users
**Build → Authentication → Sign-in method → Email/Password → Enable** (leave "passwordless" off). **Users → Add user**: one for Ticho, one for you. Use a strong password (password manager).

## 6. [ ] Lock down who can edit (UIDs)
In **Authentication → Users**, copy both **User UID** values. Give them to Claude, who puts them into `firestore.rules` and `storage.rules`. UIDs aren't secret; they're just IDs.

## 7. [ ] Publish the security rules
Easiest: paste `website/firestore.rules` into **Firestore → Rules → Publish**, and `website/storage.rules` into **Storage → Rules → Publish**. Or CLI: `firebase deploy --only firestore:rules,storage` from `website/`.

## 8. [ ] Authorize the GitHub Pages domain
**Authentication → Settings → Authorized domains → Add domain**: `dovskyrick.github.io`. Without this, login on the live back-office fails with an "unauthorized domain" error. `localhost` should already be listed.

## 9. [ ] Smoke test
Open `…/ticho/admin/`, log in as Ticho, add one gig with a photo, edit music links, save About. Open the public site: content shows, "demo content" badge disappears.

## 10. [ ] Hand over to Ticho
Send him: back-office URL, his email + password (via Signal/WhatsApp, not email), and "upcoming vs past is automatic by date". He never needs GitHub. Ask him to change his password later if you like.

## Later / optional
- Custom domain (e.g. `ticho.com`): GitHub Pages custom domain, set `BASE_PATH` to `/`, add domain to Firebase authorized domains.
- Password reset: Firebase **Users → ⋮ → Reset password** sends him a reset email.
