# Blender Dances — Summary

## Feasibility
Yes. Blender runs headless here as the `bpy` Python module (v5.x on PyPI), so Claude can import models and mocap, build materials, keyframe, pack textures and save a `.blend`. There is no GPU, so renders stay small. Login-walled assets such as Mixamo need the user to download them.

## Difficulty
v0 "paper mask" is about 3/10: the cut-out face on a curved plane follows the head bone of a dancing body. v1 projects the face onto the real head (5/10). v2 builds a true 3D head from the photo (8/10). v3 generates the dance from music (9/10).

## Humanoid Models
MPFB2 (MakeHuman for Blender) is the best fully open choice: CC0 assets, scriptable, with Mixamo-compatible rigs. Mixamo's Y/X Bot are the industry default, but they need an Adobe login. Quaternius/Kenney give CC0 low-poly bodies. SMPL-X is the research standard but non-commercial.

## Dance Motion
Mixamo dances are the cleanest plug-and-play option, free with an Adobe account. CMU BVH clips need no login. Bandai Namco's 3,000-move set and AIST++/FineDance are the academic dance standards, mostly non-commercial. EDGE- and Lodge-style models generate dance from music, which is the advanced route.

## Face Cut-out
`rembg` running BiRefNet (MIT) is the best open background remover and is fine on CPU for one photo. Keep the black neoprene hood: it gives a clean, funny outline. Avoid BRIA RMBG-2.0 for promo use because of its non-commercial licence. MediaPipe landmarks can tighten the mask.

## Pipeline
Cut out the face, then import the body and the dance, and retarget by bone-name mapping and baking. Parent a curved, alpha-textured face plane to the head bone. Add a floor, lights and an orbiting camera. Pack resources, save `dance.blend`, and render a few check-frames to verify the result.

## Risks
Mismatched skeletons twist the limbs, so pair the rig and the mocap carefully. Face planes can clip, so offset and curve them. Mixing in non-commercial assets endangers promo use. Newer `.blend` files may not open in older Blender. Never commit the raw selfie to a public repository.

## Fun Variations
Dress the dancer as a kitesurfer with a green kite behind, or clone a crowd with time-offset dances. Sync steps to a song's BPM, make a 2×2 grid of styles for reels, or add the pirate flag from Blender Foolery waving in the background.

## Next Steps
Choose between a quick no-login v0 and better Mixamo assets that the user downloads. Claude then installs the tools, cuts out the face, builds and verifies the scene, and returns `dance.blend`. The user opens it locally, presses play and gives feedback, and we iterate toward the wrapped-face v1.
