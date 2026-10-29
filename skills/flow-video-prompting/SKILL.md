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
5. **Write the video prompts** with the formula below, one per shot.
6. **Pick the model and quote the cost** (table below). Tell the user the total **before** queueing anything paid.
   Set `max_credits` on every paid scene.
7. **Generate in ONE `flow_generate` call** so numbering and `chain_previous` work. Then call `flow_wait` until
   `finished` is `true`.
8. **Review, then fix.** Change one thing at a time between takes. To keep a clip but change it, use `flow_edit`.
   To carry on from its last frame, use `flow_continue`.

## ✍️ The prompt formula

Write in this order, as plain sentences, in English:

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
| Sound | "Rain lashes the glass. He mutters: \"That's enough for tonight.\"" | "with sound" |

## ✅ Rules that save credits

- **One clear action with a start and an end.** "Clicks the switch off" works. "Fiddles with a knot" makes the
  model loop aimless fidgeting for the whole clip. Keep the face in frame with the hands, not hands alone.
- **One camera move per shot.** Two moves fight each other. Use a `flow_techniques` id (`technique`) for a
  tested phrase.
- **Repeat the full description** of a recurring character or product in **every** scene. Flow has no memory
  between scenes. (Characters made with `flow_character` are locked automatically when referenced.)
- **Say what you want to see, not what you don't.** The composer has no negative-prompt field, and Google's
  guide advises against "no …" / "don't …". Write "an empty beach at dawn", not "no people".
- **Dialogue in quotes, with the speaker named.** It has to fit the clip. Speech runs about 2–2.5 words per
  second, so an 8 s shot holds about 15–20 words.
- **Describe sound in its own sentences.** Separate ambience, sound effects and dialogue.
- **Set `aspect_ratio` on every scene** for 9:16.
- **Specific beats generic.** Name the profession, the breed, the era, the material, the lens.

## 💳 Models & cost

Flow's own quote is read before every run and always wins. These were measured on a Pro plan, at x1:

| Model | Credits | Length | Use for |
|---|---|---|---|
| Nano Banana (newest) | **0** | still | Keyframes, characters, storyboards: always start here |
| Omni 1.1 Flash 360p | 4 / 5 / 6 / 7 | 4 / 6 / 8 / 10 s | Drafts, voice takes |
| Omni 1.1 Flash 720p | 7 / 10 / 12 / 15 | 4 / 6 / 8 / 10 s | **Default** for finished shots and frame-to-frame transitions |
| Veo 3.1 - Lite | 10 | fixed 8 s | Cheap Veo |
| Veo 3.1 - Fast | 20 | fixed 8 s | Better Veo motion |
| Veo 3.1 - Quality | 100 | fixed 8 s | Hero shots only. Raise `max_credits` explicitly and confirm with the user |
| `flow_edit` | ~20 | 4 s clip | Restyle an existing clip. Flow shows no quote |

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

## 🚫 Never

- Spend credits without telling the user the total first.
- Generate a clip again because a download failed. Use `flow_download`, which is free.
- Run a paid job again because the queue looks empty. Check `flow_assets` first, because Flow may still have
  made it.
