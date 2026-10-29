# 🤝 Contributing

Thanks for helping out! 💜 This page covers the code layout, the house rules, how to test without spending
credits, and how to work on these docs.

## 🍴 Fork & upstream

This repo is a fork of [GTAI-1/flow-mcp](https://github.com/GTAI-1/flow-mcp). Fixes that apply to both
should go upstream as well. To pull in upstream changes:

```bash
git remote add upstream https://github.com/GTAI-1/flow-mcp.git   # once
git fetch upstream && git merge upstream/main
```

## 🛠️ Dev setup

```bash
git clone https://github.com/judggernaut/google-flow-mcp.git ~/flow-mcp
cd ~/flow-mcp
npm install
npm run build        # tsc → dist/
npm run login        # sign the dedicated Chrome profile into Google, once
```

## 🗺️ Code map

| File | Role |
|---|---|
| `src/index.ts` | MCP tool registrations, annotations, and the 45 s "patience" wrapper |
| `src/core.ts` | `LocalCore`: all tool logic and the **zod schemas** (one source for both MCP and HTTP) |
| `src/flow.ts` | The Flow UI driver: selectors, grid scanning, downloads, agent mode, characters |
| `src/queue.ts` | Paced, one-at-a-time job queue with retry rules |
| `src/chrome.ts` | Launches or attaches the dedicated Chrome over CDP and keeps Flow in English |
| `src/server.ts` / `src/remote.ts` | Local HTTP API + Flow Studio host / `RemoteCore` client for later processes |
| `src/assemble.ts`, `src/chain.ts` | FFmpeg cutting, mixing and last-frame extraction |
| `src/captions.ts` | whisper.cpp transcription and caption rendering |
| `src/gemini.ts` | Gemini TTS and key handling |
| `src/platform.ts` | Every OS difference (trash, unzip, open URL, speech) |
| `src/techniques.ts`, `src/playbook.ts` | Prompt presets and the guidance `flow_status` returns |
| `studio/index.html` | Flow Studio: one file, vanilla JS, mobile-first |
| `CLAUDE.md` | Agent instructions and the **Flow UI field notes**. Read them before touching `flow.ts` |

## 📏 House rules

1. 🔍 **Never guess a selector.** Map it from the live page (`ariaSnapshot`, DOM dump) before writing driver
   code, and record what you learned in `CLAUDE.md`.
2. 💳 **Anything that spends credits needs the account owner's OK.** Test with images (Nano Banana, 0 credits),
   which exercise the same pipeline.
3. 🔐 **Never enter Google credentials** or put keys in code, logs, issues or commits. Before pushing, scan for
   `AIza…` and `AQ…` style keys.
4. 🤖 **No bot-detection evasion.** Drive the real UI at a human pace.
5. 🧱 **New Flow capabilities go into the MCP**, not into a one-off script.
6. 📱 **Flow Studio stays mobile-first:** input text ≥ 16 px, tap targets ≥ 38 px, no horizontal scroll at 375 px.

## 🧪 Testing

There's no unit-test suite yet (see the [roadmap](roadmap.md)). Today:

```bash
npm run build                                   # type-check
node scripts/e2e.mjs <project> '<scenes json>'  # end-to-end through Flow (images are free)
```

**Test without disturbing a running session.** Start a second copy on a scratch port and home, so it never
overwrites the real token:

```bash
FLOW_MCP_PORT=8799 FLOW_MCP_HOME=/tmp/flow-scratch FLOW_MCP_OUTPUT=/tmp/flow-out node dist/index.js
```

!!! danger "Don't kill your assistant's flow-mcp process"
    Claude Desktop doesn't restart a killed MCP server, so the connector stays dead until you restart the app.
    Test on a scratch port instead.

Test hooks: `FLOW_MCP_SIMULATE_MISSING=n` and `FLOW_MCP_SIMULATE_FAILED=n` force scene *n* of an agent batch to
fail.

## 📚 Working on the docs

The site uses [MkDocs](https://www.mkdocs.org) with the [Material](https://squidfunk.github.io/mkdocs-material/)
theme, and deploys to GitHub Pages on every push to `main` that touches `docs/` or `mkdocs.yml`.

```bash
uvx --with mkdocs-material mkdocs serve      # live preview on http://127.0.0.1:8000
uvx --with mkdocs-material mkdocs build --strict
```

Style: plain words, short sentences, emojis in headings, and verified facts only. If a claim comes from a
live test, say when it was tested.

## ✅ Pull request checklist

- [ ] `npm run build` passes
- [ ] New or changed selectors were mapped live and noted in `CLAUDE.md`
- [ ] No credits spent without consent, and no keys or personal paths in the diff
- [ ] Docs updated (`docs/reference/tools.md` for tool changes)
