# 🧰 MCP tools

flow-mcp exposes **20 tools** over stdio (`@modelcontextprotocol/sdk`, `McpServer` + `StdioServerTransport`).
You rarely call them by name. Your assistant picks them from what you ask. Every tool carries MCP
[annotations](https://modelcontextprotocol.io/specification/2025-06-18/server/tools#tool-annotations)
(`readOnlyHint`, `destructiveHint`, `idempotentHint`, `openWorldHint`).

Legend: 🆓 free · 💳 spends Flow credits · 🖥️ runs only on your computer

## 📡 Session & queue

| Tool | Cost | What it does | Key inputs |
|---|:-:|---|---|
| `flow_status` | 🆓 | Sign-in, open project, plan, credits left, queue, pacing, slow calls, and the prompt playbook | `detailed` (default `true`) |
| `flow_wait` | 🆓 | Waits for jobs or slow-call task ids and returns file paths. Answers within about 40 s, so call again until `finished` | `job_ids?`, `timeout_seconds` 5–900 (default 40) |
| `flow_cancel` | 🆓 | Cancels a job that hasn't started yet | `job_id` |
| `flow_retry` | 💳? | Queues failed jobs again with the same settings and file names. For a finished image batch, retries only the failed scenes | `job_ids?` |

## 🎨 Generate

| Tool | Cost | What it does | Key inputs |
|---|:-:|---|---|
| `flow_generate` | 🆓 images · 💳 video | Queues 1–100 scenes. Reads Flow's own quote first and skips any scene over `max_credits` | see below |
| `flow_agent_images` | 🆓 | Fast batch of 1–50 stills through Flow's Agent mode, rendered in parallel and matched back to scene order. Dropped scenes are requested from the agent again, then run one by one | `project`, `scenes[]`, `aspect_ratio`, `references[]` (≤10 `{image,name}`), `scene_references[][]` |
| `flow_edit` | 💳 ~20 | Video-to-video edit of a clip in the project (relight, change weather, remove objects). Flow shows no quote first | `project`, `asset`, `prompt`, `acknowledge_cost: true` |
| `flow_continue` | 💳 | Starts a clip on the last frame of an existing one, through agent mode | `project`, `from_asset`, `prompt`, `mode` `exact`\|`likeness`, `attach[]` ≤3, `aspect_ratio` `16:9`\|`9:16`, `acknowledge_cost: true`, `force?` |
| `flow_techniques` | 🆓 | 39 film-technique presets to pass as a scene's `technique` | `category?` `camera`\|`product`\|`transition`\|`image` |

### `flow_generate` scene fields

| Field | Type / values | Default |
|---|---|---|
| `prompt` | string | required |
| `type` | `video` \| `image` | `video` |
| `model` | Flow model family name, e.g. `Veo 3.1 - Fast`, `Omni 1.1 Flash`, `Nano Banana Pro` | Flow's current. Images use the newest non-Lite Nano Banana |
| `aspect_ratio` | `16:9` `9:16` `1:1` `4:3` `3:4` (the last three are image only) | Flow's current |
| `duration` | `4` `6` `8` `10` seconds (Omni only, Veo 3.1 is always 8 s) | Flow's current |
| `resolution` | `360p` \| `720p` (Omni only) | Flow's current |
| `variants` | 1–4 | 1 |
| `max_credits` | number ≥ 0 | `25` |
| `first_frame` / `last_frame` | file path or `asset:<title>` | – |
| `reference_images` | up to 3 file paths or `asset:<name>` | – |
| `chain_previous` | start on the previous scene's last frame | `false` |
| `reference_previous` | adds the previous scene's finished image as a reference, to keep a set of stills on-model | `false` |
| `technique` | id from `flow_techniques` | – |
| `retries` | 0–3, Flow's own free Retry button on a failed tile | `1` |
| `download_quality` | `original` \| `upscaled` | `original` |

!!! warning "Frames and references don't mix"
    Flow's composer accepts either frames or references. When frames are set, references are dropped and the
    job note says so. Use `flow_continue` to get both.

## 🎭 Characters

| Tool | Cost | What it does | Key inputs |
|---|:-:|---|---|
| `flow_character` | 🆓 | Creates a reusable character from a description (Flow draws the portrait) or an image, with a personality and a stock voice | `name`, `describe?` or `image?`, `aspect_ratio`, `personality?`, `voice?` |
| `flow_character_edit` | 🆓 | Restyles a character in place and saves the new portrait. Every scene that references it picks up the change | `name`, `change?`, `look?` (full new description) |
| `flow_characters` | 🆓 | Lists the project's characters | – |

## 📚 Library

| Tool | Cost | What it does | Key inputs |
|---|:-:|---|---|
| `flow_assets` | 🆓 | Lists images, videos and scenes in the Flow project (use them as `asset:<title>`) | `kind?` `image`\|`video`\|`scene` |
| `flow_download` | 🆓 | Downloads 1–30 existing items again, including the 1080p / 2K upscale. A scene comes down as one stitched MP4 | `project`, `assets[]`, `quality` |
| `flow_trash` | 🆓 | Moves one item to **Flow's** Trash, where it can be restored. Matches the exact title only, refuses if two items share it, and never deletes permanently | `name` |

## 🔊 Sound, captions & cut 🖥️

| Tool | Cost | What it does | Key inputs |
|---|:-:|---|---|
| `flow_narrate` | 🆓 | Narration audio of any length: `gemini` (Google AI Studio TTS) or `mac` (your computer's voices) | `project`, `engine`, `text` ≤400, `voice` (default `Charon`), `style?` ≤200 |
| `flow_voices` | 🆓 | Lists the available narrator voices and whether a Gemini key is set up | – |
| `flow_transcribe` | 🆓 | Word-level transcript with start and end times for any audio or video (whisper.cpp) | `video`, `language` (default `auto`), `words` |
| `flow_captions` | 🆓 | Burns captions into a video and writes an `.srt` | `video`, `style` `bold`\|`highlight`\|`reveal`\|`clean`\|`boxed`, `position`, `size`, `letters`, `color`, `lead`, `names[]`, `text?`, `language` |
| `flow_assemble` | 🆓 | Joins clips into one MP4 with music, voiceover or per-line `voice_lines`, and separate volume controls | `project`, `clips[]?`, `music?`, `music_volume` (0.25), `clip_volume` (1), `voiceover?`, `voice_lines[]?`, `hold_last_frame` |

## 🛡️ Guardrails built into every tool

- **One generation at a time**, with a random 25–70 s pause between jobs (`FLOW_MCP_PAUSE_MIN_S` / `_MAX_S`).
- **Price check:** before each run, Flow's quote is compared with `max_credits`. Tools with no quote require
  `acknowledge_cost: true`.
- **No automatic retry on timeouts**, because a timed-out job may already have spent credits.
- **Double-spend guard:** `flow_continue` refuses to run if a continuation of the same source already looks
  recent, unless you pass `force: true`.
- **Output** goes to `~/flow-mcp-out/<project>/scene-NN.ext`. Numbering continues from the files already in
  the folder, so earlier takes aren't overwritten.
