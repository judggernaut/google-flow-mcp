---
name: flow-video-prompting
description: Plan and write Google Flow video and image prompts (Veo 3.1, Omni Flash, Nano Banana) and turn them into flow-mcp calls. Use when someone wants a video, clip, film, ad, reel, storyboard or keyframes made with Flow, or asks how to prompt for video. Includes fill-in templates.
license: Same as the flow-mcp repository
---

# 🎬 Prompting Google Flow for video

Use this skill to turn an idea into Flow prompts that work on the first take, then into `flow-mcp` tool calls.
Flow's video models charge credits per take. Stills are free. Good planning saves credits.

## 🧭 Workflow

1. **Get the brief.** Ask only for what's missing: what it's for, the length, the aspect ratio (16:9, or 9:16
   for social), the look, who or what appears, any spoken lines, and the credit budget. If the user already
   gave enough, don't ask.
2. **Break it into shots.** Each scene is **one continuous shot** with **one camera move** and **one action
   that starts and finishes**. A 30 s film is three or four 8–10 s shots.
3. **Lock the cast.** For anyone or anything that recurs, create a character (`flow_character`) or keep a
   reference image. Then use `asset:<name>` in `reference_images`.
4. **Make keyframes first (free).** Draw each shot's opening still as an image. Use `flow_agent_images` for many
   at once, and `reference_previous: true` to keep a set on-model. Show the stills and get a yes.
5. **Write the video prompts** with the formula below, one per shot. A shot that starts from a keyframe gets a
   **motion-only** prompt (see *Starting from an image*).
6. **Pick the model and quote the cost** (table below). Tell the user the total **before** queueing anything paid.
   Set `max_credits` on every paid scene.
7. **Generate in ONE `flow_generate` call** so numbering and `chain_previous` work. Then call `flow_wait` until
   `finished` is `true`.
8. **Review, then fix.** Look at the result before the next shot: does it match the prompt, the character and
   the brand? Change one thing at a time between takes. To keep a clip but change it, use `flow_edit`. To carry
   on from its last frame, use `flow_continue`.

## ✍️ The prompt formula

Write in this order, as clear, specific sentences in English (not a list of keywords):

> **Subject + action** → **shot size + camera move** → **location + time** → **visual style** → **lighting** →
> **sound & dialogue** (in separate sentences)

| Part | Good | Weak |
|---|---|---|
| Subject | "a wiry old lighthouse keeper in a yellow oilskin coat" | "a man" |
| Action | "flicks the brass switch off, and the beam dies" | "works on the lamp" |
| Camera | "slow push-in from a medium shot to a close-up" | "cinematic camera" |
| Place & time | "lamp room at the top of the tower, stormy dusk" | "a lighthouse" |
| Style | "35mm film, muted teal and amber palette, light grain" | "beautiful, 4k" |
| Light | "warm practical lamp light, cold blue window fill" | "nice lighting" |
| Sound | "Ambient noise: rain lashing the glass. SFX: a heavy switch clunks. He mutters: That's enough for tonight." | "with sound" |

Google's Veo 3.1 guide puts the camera first (*cinematography → subject → action → context → style*). Either
order works, as long as every part is there.

## ✅ Rules that save credits

- **One clear action with a start and an end.** "Clicks the switch off" works. "Fiddles with a knot" makes the
  model loop aimless fidgeting for the whole clip. Keep the face in frame with the hands, not hands alone.
- **One camera move per shot.** Two moves fight each other. Use a `flow_techniques` id (`technique`) for a
  tested phrase.
- **Repeat the full description** of a recurring character or product, word for word, in **every** text-only
  or ingredients scene. Flow has no memory between scenes. (Characters made with `flow_character` are locked
  automatically when referenced.) Scenes that start from an image are the exception: see below.
- **Say what you want to see, not what you don't.** The composer has no negative-prompt field, and Google's
  guide advises against "no …" / "don't …". Write "an empty beach at dawn", not "no people".
- **Dialogue after a colon, without quotation marks:** `The old man says: That's enough for tonight.` Google
  advises this because quotation marks can make the model draw the words as on-screen text. Name the speaker
  and keep the line to the clip: speech runs about 2–2.5 words per second, so an 8 s shot holds about 15–20
  words. Speech is less likely when the line doesn't fit.
- **Give recurring speakers a fixed voice description** and repeat it word for word, for example *"In a crisp,
  thoughtful voice with a standard American accent, Clara says: …"*.
- **Describe sound in its own sentences**, labelled: `Ambient noise: …`, `SFX: …`, then the dialogue.
- **Set `aspect_ratio` on every scene** for 9:16.
- **Specific beats generic.** Name the profession, the breed, the era, the material, the lens.

## 🖼️ Starting from an image

With `first_frame`, `chain_previous` or `flow_continue`, the image already fixes the subject, the scene and the style.

- **Prompt for motion only.** Re-describing what's in the image confuses the model. Describe camera motion,
  subject animation and environmental change.
- **Refer to people generically:** "the woman", "he", "the subject".
- **Camera motion is the most reliable** ("slow dolly in on the subject"). Subject animation suits subtle,
  lifelike actions ("her hair and coat flutter in the wind"). Environmental animation brings the background
  alive ("fog rolls in across the field").
- **The start image sets the ceiling.** Use a sharp, well-composed still at the clip's aspect ratio.
- With `first_frame` + `last_frame`, describe the **transition** between the two frames.

## 🧩 Ingredients (`reference_images`)

- **Say how each reference is used:** *"Using the provided images of the detective and the office, a medium
  shot of the detective behind his desk…"*, or *"The woman, whose torso is the lava lamp, walks down the foggy
  street."*
- **Use clean references:** subjects and products on a plain background. Keep extra people out of location and
  style references, and give every reference the same look.
- **Don't contradict the references.** The text should complement what's attached, not fight it.
- Veo 3.1 Lite and Fast take ingredients at **8 s only**. **Veo 3.1 Quality takes none.** Omni Flash takes them
  at any length.

## 🍌 Stills with Nano Banana (free)

- **Describe a scene, don't list keywords.** *"A photorealistic close-up of [subject] in [setting], [light],
  shot from [angle] with a [lens]."*
- **Say what it's for:** "a hero still for a premium skincare ad" beats "a still of a bottle".
- **Break complex scenes into steps:** "First a misty forest at dawn. Then, in the foreground, a mossy stone
  altar. Finally, a glowing sword on the altar."
- **Text in an image:** put the exact words in quotes and describe the font and layout. Nano Banana Pro is the
  strongest at text.
- **Edits:** *"Using the provided image, change only the blue sofa to a brown leather chesterfield. Keep
  everything else exactly the same."* To protect a face or logo, describe it in detail in the edit.
- **Keyframes for video:** match the clip's aspect ratio, and keep each still to a single moment the clip can
  start from. Use `reference_previous` or `references` to keep a set on-model.

## ⏱️ Advanced: several shots in one clip (Veo 3.1)

Google documents **timestamp prompting** for Veo 3.1, which puts cuts inside a single 8 s generation:

```text
[00:00-00:02] Medium shot from behind a young explorer as she pushes aside a jungle vine.
[00:02-00:04] Reverse shot of her face, filled with awe. SFX: rustling leaves, distant bird calls.
[00:04-00:06] Tracking shot as she steps into the clearing and touches a carved stone wall.
[00:06-00:08] Wide crane shot revealing her small in a vast, forgotten temple.
```

It breaks the one-shot rule on purpose, so use it only when you want quick cuts inside one clip. Otherwise one
shot per scene is more reliable.

## 💳 Models & cost

Flow's own quote is read before every run and always wins. Costs were measured on a Pro plan, at x1. Lengths
and features are from [Flow's model page](https://support.google.com/flow/answer/16352836) (October 2026):

| Model | Credits | Length | Use for |
|---|---|---|---|
| Nano Banana (newest) | **0** | still | Keyframes, characters, storyboards: always start here |
| Omni 1.1 Flash 360p | 4 / 5 / 6 / 7 | 4 / 6 / 8 / 10 s | Drafts, voice takes. Half the price of 720p. Pro and Ultra can upscale to 720p for 0 credits in Flow |
| Omni 1.1 Flash 720p | 7 / 10 / 12 / 15 | 4 / 6 / 8 / 10 s | **Default** for finished shots and frame-to-frame transitions |
| Veo 3.1 - Lite | 10 (8 s) | 4 / 6 / 8 s · ingredients 8 s | Cheap Veo. The only model that can **extend** Veo clips (in Flow) |
| Veo 3.1 - Fast | 20 (8 s) | 4 / 6 / 8 s · ingredients 8 s | Better Veo motion |
| Veo 3.1 - Quality | 100 (8 s) | 4 / 6 / 8 s · **no ingredients** | Hero shots only. Raise `max_credits` explicitly and confirm with the user |
| `flow_edit` | ~20 | 4 s clip | Restyle an existing clip (Omni only). Flow shows no quote |

## 🔗 Continuity: pick one per shot

| Goal | Use | Note |
|---|---|---|
| One unbroken take across clips | `chain_previous: true` | Starts on the previous scene's last frame |
| Move between two chosen stills | `first_frame` + `last_frame` | Make both stills for free first |
| Same person or product, free framing | `reference_images` (≤ 3) | Files or `asset:<name>` |
| Start frame **and** character together | `flow_continue` | `mode: exact` (invisible join, the default) or `likeness` |

Frames and references can't be combined in the composer. When frames are set, references are dropped.
File paths in tool calls must be **absolute** (`/Users/you/...`); `~` isn't expanded. Anything already in the
Flow project can be used as `asset:<title>` instead.

## 🧩 Templates

Fill in the matching template from `templates/`, then turn it into the tool call shown at its end:

| Template | For |
|---|---|
| [`templates/shot.md`](templates/shot.md) | Any single shot. The building block |
| [`templates/film.md`](templates/film.md) | A multi-shot story or short film → one `flow_generate` call |
| [`templates/product.md`](templates/product.md) | Product hero, ad or social promo |
| [`templates/talking.md`](templates/talking.md) | A character or avatar speaking to camera |
| [`templates/reel.md`](templates/reel.md) | 9:16 Reels / Shorts / TikTok with captions |
| [`templates/transition.md`](templates/transition.md) | Morphs, loops, before/after, logo reveal (first + last frame) |
| [`templates/character.md`](templates/character.md) | A reusable character for `flow_character` |
| [`templates/still.md`](templates/still.md) | Nano Banana keyframes, storyboard panels and image edits (free) |

## 🚫 Never

- Spend credits without telling the user the total first.
- Generate a clip again because a download failed. Use `flow_download`, which is free.
- Run a paid job again because the queue looks empty. Check `flow_assets` first, because Flow may still have
  made it.

## 📚 Sources

- Google: [Video generation prompt guide](https://cloud.google.com/vertex-ai/generative-ai/docs/video/video-gen-prompt-guide)
  and [best practices](https://cloud.google.com/vertex-ai/generative-ai/docs/video/best-practice) (Veo & Gemini Omni)
- Google Cloud blog: [Ultimate prompting guide for Veo 3.1](https://cloud.google.com/blog/products/ai-machine-learning/ultimate-prompting-guide-for-veo-3-1)
- Gemini API: [Nano Banana prompting guide](https://ai.google.dev/gemini-api/docs/image-generation#prompt-guide)
- Flow Help: [Create videos](https://support.google.com/flow/answer/16353334) and
  [models & supported features](https://support.google.com/flow/answer/16352836)
- flow-mcp's own runs (costs, the one-action rule, agent-mode lessons): `CLAUDE.md`
