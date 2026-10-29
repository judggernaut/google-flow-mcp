# 🗺️ Roadmap & analysis

This is a full review of flow-mcp as of **October 2026**: what it uses today, where it's fragile, and what we
could add next. It builds on the [APIs & architecture](../reference/apis.md) breakdown. Ideas are ranked by
**value ÷ effort**. Have one to add? [Open an issue](https://github.com/judggernaut/google-flow-mcp/issues).

Legend: 🟢 small · 🟡 medium · 🔴 large · ⭐ recommended next

---

## 1. 🧹 Repo health (do these first)

| | Item | Why | Effort |
|---|---|---|:-:|
| ⭐ | **License** | Neither this fork nor upstream has a `LICENSE` file. `package.json` says ISC, but without a license file nobody is clearly allowed to reuse or redistribute the code. Ask [GTAI-1/flow-mcp](https://github.com/GTAI-1/flow-mcp) to add one, then mirror it here | 🟢 |
| ⭐ | **CI build** | No workflow runs `tsc` on pull requests today. Add `npm ci && npm run build` on push and PR | 🟢 |
| ⭐ | **Unit tests for pure logic** | `npm test` is a placeholder. The riskiest logic is pure and easy to test offline: scene matching (`matchScenes`), file sniffing (`extensionOf`), ZIP take naming, `freshMedia` filtering, caption `namesIn` / `alignText`, assemble's `defaultClips`. Use `node:test`, which needs no new dependency | 🟡 |
| | **Lint + format** | Biome or ESLint + Prettier, run in CI | 🟢 |
| | **Dependabot + `SECURITY.md` + issue templates** | Keeps dependencies and action pins current, and gives people a private way to report vulnerabilities | 🟢 |
| | **Releases + CHANGELOG** | Tag versions so people can pin one and roll back. `package.json` is still `0.1.0` | 🟢 |
| | **Install with `npx`** | `bin: flow-mcp` already exists. Publishing to npm would make setup `npx -y flow-mcp` with no clone and no build | 🟡 |

## 2. 🤖 Use more of the MCP protocol

flow-mcp uses **tools** and one **prompt** (`plan_video`) today ([details](../reference/apis.md#1-mcp-what-flow-mcp-exposes)). Several of its
workarounds now have standard replacements in the protocol:

| | Feature | What it replaces / enables | Effort |
|---|---|---|:-:|
| ⭐ | **Progress notifications** (`notifications/progress`) | Report each job's "NN%" and steps such as "uploading frame" as they happen, instead of polling `flow_status` | 🟢 |
| ⭐ | **Elicitation** ([spec](https://modelcontextprotocol.io/specification/2025-06-18/client/elicitation)) | A real "This will spend about 12 credits. Continue?" prompt in the client, instead of the model setting `acknowledge_cost: true` itself. Keep the argument as a fallback for clients without elicitation | 🟡 |
| ⭐ | **Tasks** ([spec 2025-11-25](https://modelcontextprotocol.io/specification/2025-11-25)) | The protocol's own long-running-call mechanism. It replaces the custom `still_working` / `task_id` / `flow_wait` pattern where clients support it | 🟡 |
| | **Structured output** (`outputSchema` + `structuredContent`) | Typed results (files, credits, job ids) that clients and scripts can rely on | 🟢 |
| | **Resources** | `flow://assets`, `flow://characters`, `flow://jobs/{id}`, and finished files as resource links, so clients can browse and attach them | 🟡 |
| ✅ | **Prompts** | `plan_video` shipped, built from the prompting skill. Next: `/continue-shot` and `/caption-video` recipes | 🟢 |
| | **Sampling** | Ask the *client's* model to improve a prompt or plan a shot list. That would deliver Studio's unbuilt "improve prompt" with no API key or extra cost | 🟡 |
| | **Logging notifications** | Send `FLOW_MCP_DEBUG` steps to the client log instead of stderr | 🟢 |
| | **MCP Apps (UI resources)** | Show Flow Studio's previews (captions, gallery) inline in chat clients that support them | 🔴 |

## 3. ✨ Flow features not automated yet

Each of these must be **mapped live before any code is written** (see the house rules). Sources are the
field notes in `CLAUDE.md`.

| | Feature | Notes | Effort |
|---|---|---|:-:|
| ⭐ | **Image → video from the tile menu (`Animate`)** | Already used inside `flow_continue`, but not available as its own tool | 🟢 |
| | **Native scenes** (`Add to scene`, `New scene`, scene timeline `Add clip`) | Stitching inside Flow instead of with local FFmpeg, so the scene can be shared from Flow. Scene *download* already works | 🟡 |
| | **Edit-view timeline** (trim, reorder, `Save frame` at any time) | `Save frame` exists today, but only for the last frame | 🟡 |
| | **Restore from Trash** | `flow_trash` only moves items to Trash. A matching restore would make it fully reversible | 🟢 |
| | **Rename / favourite / copy** | Tile-menu items that are already reachable | 🟢 |
| | **Avatars & custom voices** | The `Me` avatar is used in `flow_continue`. Custom voice creation is deliberately skipped today | 🟡 |
| | **Tools section** (left nav) | Not mapped yet | 🟡 |
| | **Agent-mode video batches** | Agent mode renders stills in parallel. Doing the same for clips would need a cost model, because agent mode shows no quote | 🔴 |
| | **4K download** | Disabled on the Pro plan. Needs an Ultra account to map | 🟢 |

## 4. 🛡️ Reliability & architecture

| | Item | Why | Effort |
|---|---|---|:-:|
| ⭐ | **Selector health check (`flow_doctor`)** | flow-mcp depends on about 45 English accessible names. A read-only check that opens the grid and composer and reports which names are missing would catch a Flow redesign in seconds, not on someone's paid clip | 🟡 |
| ⭐ | **Selector registry** | Move every accessible name and CSS selector from `flow.ts` into one typed table. That makes the health check, the docs and fixes after a Flow update a single edit | 🟡 |
| | **Read Flow's own responses passively** | Listening to the page's network responses (`page.on("response")`) could give exact media ids, job status and credit balance without scraping the DOM. It's still read-only and still drives the real UI, but it has to be mapped live first, and the endpoints are undocumented and can change | 🟡 |
| | **Split `flow.ts`** (1,800 lines) | Separate grid, download, composer, agent, characters and edit modules make it easier to review and test | 🟡 |
| | **Fewer silent `.catch(() => {})`** | Many UI steps swallow errors. That's deliberate for best-effort steps, but it hides the first real failure. Log them under `FLOW_MCP_DEBUG` | 🟢 |
| | **Media route hardening** | `/media` checks containment with `path.resolve` but not `realpath`, so a symlink inside the output folder could point outside it. Byte ranges aren't validated (reversed ranges). The token can travel in the query string | 🟢 |
| | **Windows verification** | Every Windows branch is written but none has run on a real PC. A CI smoke test on `windows-latest` (build, `platform.ts` helpers) plus one manual run would settle it | 🟡 |

## 5. 🎞️ Local post-production (free, no credits)

| | Feature | Notes | Effort |
|---|---|---|:-:|
| ⭐ | **Vertical reels & shorts** | From the [parking lot](parking-lot.md): centre crop and blurred fill are plain FFmpeg; following the subject needs local detection | 🟡 |
| | **Multi-speaker narration** | Gemini TTS can voice a dialogue between two speakers in one request, for interviews and back-and-forth scenes | 🟢 |
| | **Take QA with video understanding** | Have a vision model (the client's model through sampling, or Gemini) check that a clip matches its prompt and flag drifted characters before you download or cut it | 🟡 |
| | **Loudness and colour match across clips** | Match colour between shots with FFmpeg before the cut, alongside the existing `loudnorm` on audio | 🟡 |
| | **Local 1080p fallback** | When Flow's upscale doesn't deliver, upscale the 720p original with `scale=1920:1080:flags=lanczos` automatically | 🟢 |

## 6. 📚 Docs site

- Built with **MkDocs + Material** and deployed by `.github/workflows/docs.yml`.
- Material for MkDocs reaches **end of life on 5 May 2027**, and its successor
  [Zensical](https://zensical.org) reads the same `mkdocs.yml`. This site already builds with
  `uvx zensical build` and no issues, so switching later is a one-line change in CI.

---

## ⭐ Suggested order

1. License (talk to upstream) · CI build · unit tests for pure logic
2. Progress notifications · structured output · more prompts
3. Selector registry → `flow_doctor`
4. Elicitation for credit consent · Tasks for long calls
5. Vertical reels · `Animate` tool · restore from Trash
6. Passive response reading · native scenes · sampling-based prompt improvement
