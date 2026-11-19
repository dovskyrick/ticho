# Blender Dances — Plan

Goal: take one selfie, cut the face out, stick it on an open-source 3D humanoid, play a free dance mocap clip on that body, and ship a single `.blend` file that opens in desktop Blender and plays on spacebar.

Reference photo: a close-up selfie in a black neoprene hood, with a beach, a green kite and dune grass behind. The face fills the frame, the lighting is strong frontal sun, and the hood already gives a clean dark edge around the face. Those are good conditions for cutting the face out.

---

## 1. Can Claude do this? (Feasibility)

| Piece | Status in the cloud session |
|---|---|
| Blender | No GUI, but **`bpy` (Blender as a Python module) is on PyPI**. Versions 5.1–5.3 are available for Python 3.13, so `pip install bpy` gives a full headless Blender: import FBX/BVH/glTF, build materials, keyframe, save `.blend`, render frames. |
| Background removal | `rembg` + **BiRefNet** (MIT weights) runs on CPU, at about 15 s per image. Fine for one photo. |
| Downloading assets | Public HTTPS works through the proxy. Assets behind a login (Mixamo, Adobe account) **cannot** be fetched by Claude. The user downloads those, or we use only sources that need no login. |
| GPU | None. Use Eevee/Workbench preview renders or a few test frames only. The real playback happens on the user's PC. |
| Output | A `.blend` with everything **packed** (File → External Data → Pack Resources), committed to the repo or sent as a file. |

**Verdict: yes, end-to-end is doable headless.** The risky part is taste: how good the face looks on the head. The plumbing is the easy part.

## 2. Difficulty rating

| Version | What you get | Difficulty (1–10) | Time estimate |
|---|---|---|---|
| **v0 "Paper mask"** | Cut-out face on a flat or slightly curved plane, parented to the head bone, on a mocap-driven mannequin | **3/10** | 1 session |
| **v1 "Wrapped face"** | Face photo projected (UV project from view) onto the front of the character's real head mesh, with skin tone matched | **5/10** | 1–2 sessions |
| **v2 "3D head"** | Image-to-3D head (FLAME fit via DECA/EMOCA or SMIRK, or a general image-to-3D model such as TRELLIS or Hunyuan3D) swapped onto the body's neck | **8/10** | Several sessions, a GPU helps a lot |
| **v3 "Music-driven"** | Dance generated from a chosen song (EDGE / Lodge-style models) instead of a canned clip | **8–9/10** | Research project |

Recommendation: **ship v0 first, then upgrade to v1.** A paper-mask face on a dancing body is funnier and reads better as promo content than an uncanny 3D head.

## 3. State of the art and the standard open sources (Nov 2026)

### 3a. Humanoid bodies

| Source | Format | License | Notes |
|---|---|---|---|
| **MPFB2 (MakeHuman plugin for Blender)** | Native Blender | Assets CC0, code GPL | Best fully open choice. Parametric body, ships rigs (default, game, Mixamo-compatible), can be scripted. |
| **Mixamo characters** (e.g. "Y Bot", "X Bot") | FBX | Free incl. commercial with an Adobe account; no redistribution of raw files | The de facto standard rig. Needs a login, so the user downloads it. |
| **Quaternius / Kenney low-poly characters** | glTF/FBX | CC0 | Stylised and cheap. Good for a toy look. |
| **SMPL / SMPL-X** | Python + FBX add-on | Non-commercial research | Research standard. Most dance datasets (AIST++, FineDance) come in SMPL. Fine for personal fun, not for paid ads. |
| **Rigify** (built into Blender) | Native | GPL (output free) | Use when we want to rig something ourselves. |
| Auto-riggers (AccuRIG, Cinevva) | FBX/GLB | Free tiers | Only needed if we build a custom body. |

**Pick: MPFB2 human with the Mixamo-compatible "game_engine"/"mixamo" skeleton.** It is open, scriptable, and its rig matches most mocap.

### 3b. Dance motion

| Source | Format | License | Notes |
|---|---|---|---|
| **Mixamo animations** ("Hip Hop Dancing", "Samba", "Silly Dancing", "Thriller Part 1"…) | FBX | Free with an Adobe account | Easiest and cleanest result. Login required, so the user downloads it. |
| **Bandai Namco Research Motion Dataset** | BVH (+ MIT Blender script) | CC BY-NC-ND 4.0 | About 3,000 moves including dance styles. Non-commercial only. |
| **AIST++** | SMPL params | CC BY 4.0 (annotations) | The academic dance standard: 10 genres, music-synced. Needs SMPL to retarget. |
| **FineDance / Motorica Dance** | SMPL / BVH | Research/non-commercial | High quality, many genres. |
| **CMU Mocap (BVH conversions)** | BVH | Free to use | A few dance-like clips. Old but widely used and permissive. |
| **G1 Moves (HF, 2026)** | BVH/FBX | Check the dataset card | 28 dance clips, markerless capture. Gated. |
| Generative: **EDGE, Lodge, MDM-family** | SMPL | Research | Music → dance. This is v3 territory. |

**Pick for v0:** a CMU BVH clip or a Bandai Namco dance BVH (no login, scriptable download). **Upgrade path:** the user grabs one Mixamo dance FBX and drops it in `assets/`.

### 3c. Face cut-out

| Tool | License | Notes |
|---|---|---|
| **BiRefNet** via `rembg` | MIT | Best open option for still images. |
| BEN v2 | MIT | Strong on hair. |
| BRIA RMBG-2.0 | CC BY-NC | Good quality, but non-commercial. Avoid for promo use. |
| SAM 2 / face landmarks (MediaPipe) | Apache/SAM license | Use for a *tight face-only* oval mask (without the hood) if needed. |

For this photo we want **face + hood** (the hood is a great comic outline). So: BiRefNet foreground mask → crop to the head → optionally feather the edges.

## 4. Pipeline (all scripted with `bpy`)

```
selfie.jpg
  └─ rembg (BiRefNet) ──> face_cutout.png  (RGBA, cropped to head, ~1024 px)

MPFB2 human (or Mixamo Y Bot)   dance.bvh / dance.fbx
        │                              │
        └──── import into bpy ─────────┘
                 │
          retarget (bone-name map, or Rokoko/"Expy"-style
          constraint-based copy rotations; bake to action)
                 │
          head attachment:
            v0: plane with face_cutout.png (alpha blend),
                slightly curved (Simple Deform bend), parented to
                head bone, offset in front of the face
            v1: UV project face onto head mesh front, mix with skin
                 │
          scene dressing: floor, 3-point light, camera on a slow
          orbit or tracking the hips, optional disco/kite colours
                 │
          pack resources → dance.blend
          (+ optional 10 s Eevee preview MP4 / GIF)
```

### Key scripting steps
1. `pip install bpy rembg[cpu]` in a venv (Python 3.13 matches bpy 5.x).
2. `rembg` with the `birefnet-general` model → RGBA PNG. Auto-crop to the alpha bounding box.
3. `bpy.ops.import_anim.bvh(...)` or `bpy.ops.import_scene.fbx(...)` for the motion. Import the character with glTF/FBX, or build it with MPFB2's API.
4. **Retarget.** If the rig and the mocap share names (Mixamo → Mixamo), just assign the action. Otherwise add Copy Rotation constraints per mapped bone plus Copy Location on the hips, then `nla.bake` and remove the constraints. Scale the root motion to the character's height.
5. **Face plane:** an image-texture material with alpha, blend mode *Alpha Hashed/Blended*, Backface Culling off. Parent it to the head bone (`parent_type='BONE'`). Add a bend modifier so it follows the head curve.
6. Hide the original head mesh's face region (or the whole head for the funnier "mask" look), or leave it as the back of the head.
7. Camera, lights, frame range = clip length, fps = clip fps. `bpy.ops.file.pack_all()`, then `save_as_mainfile("dance.blend")`.
8. Sanity render: 3–5 Workbench/Eevee frames to PNG, which Claude inspects visually.

## 5. Deliverables

- `promotional-content/blender-dances/scripts/` — `cutout_face.py`, `build_dance_scene.py` (re-runnable).
- `dance.blend` (packed). Commit it only if it stays small (< ~50 MB). Otherwise send it as a file or release asset.
- `preview.gif` / `preview.mp4` — short loop for socials.
- **Do not commit the raw selfie** to a public repo. Keep it local or in the session scratchpad, and commit only the final render if you want it public.

## 6. Risks and mitigations

| Risk | Mitigation |
|---|---|
| Retarget looks broken (twisted arms, sliding feet) | Start with a mocap/rig pair that already shares a skeleton (Mixamo→Mixamo, or MPFB2 "mixamo" rig + Mixamo FBX). Use BVH only with a tested bone map. |
| Face plane clips into the head or looks pasted | Push it forward a few mm, curve it, add a subtle rim light, and lean into the cartoon look. |
| License mix-ups for promo use | For anything posted commercially, use CC0/MIT/Mixamo assets only. Keep SMPL/AIST++/Bandai Namco to personal tests. |
| No GPU / slow renders | Don't render in the cloud. Ship the `.blend` and render locally. |
| Login-walled assets | The user downloads Mixamo files and drops them in `assets/`. The script auto-detects them. |
| Blender version mismatch | Build with bpy 5.x. The user should open it with Blender ≥ the same major version (older Blender may refuse newer files). |

## 7. Brainstorm: fun variations for Ticho promo

- **Kite-surfer dance:** hood on, a wetsuit-black material on the body, the green kite (low-poly) flying in the background.
- **Crowd:** duplicate the dancer 5× with time-offset actions → instant dancefloor (links nicely with *Blender Foolery*).
- **Beat sync:** read the song BPM and time-warp the action so steps land on the beat (simple NLA strip scale).
- **Style switcher:** the same face on 4 Mixamo dances in a 2×2 grid, as a loop for stories/reels.
- **Pirate flag cameo:** the flag from `blender-foolery.md` waving on a pole (cloth sim or a shape-key wave).
- **v2 later:** a proper 3D head from the selfie once we have GPU access.

## 8. Next steps

1. Confirm the target: v0 paper mask with a no-login BVH, **or** the user downloads 1 Mixamo character + 1 dance FBX first.
2. Claude installs `bpy` + `rembg`, cuts out the face, builds the scene, renders check-frames, and returns `dance.blend`.
3. The user opens it locally, presses spacebar, and gives feedback. Then iterate toward v1.
