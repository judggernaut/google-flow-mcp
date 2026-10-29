<div align="center">

# 🎬 flow-mcp

**Make Google Flow videos and images by just asking your AI assistant.**

Runs on your computer · uses your Flow credits, not the paid API · no extension, no cloud, no sign-up

[📚 Docs](https://judggernaut.github.io/google-flow-mcp/) ·
[🚀 Getting started](https://judggernaut.github.io/google-flow-mcp/getting-started/) ·
[🧰 Tools](https://judggernaut.github.io/google-flow-mcp/reference/tools/) ·
[🗺️ Roadmap](https://judggernaut.github.io/google-flow-mcp/project/roadmap/)

</div>

> [!NOTE]
> 🍴 **This is a fork** of [GTAI-1/flow-mcp](https://github.com/GTAI-1/flow-mcp). All credit for the original work goes there. This fork tidies the docs and builds on top.

## ⚡ TL;DR

flow-mcp is a local [MCP](https://modelcontextprotocol.io) server. It opens its own Chrome window, uses the Google account you signed in with, and presses [Google Flow](https://flow.google.com)'s real buttons for you. Claude, Codex, Copilot, Cursor and other MCP apps can then make **stills, video clips, characters, narration, captions and finished cuts** when you ask in plain English. Flow Studio, a local control panel, does the same without an assistant.

```text
🤖 Your AI app ──MCP/stdio──▶ 🎬 flow-mcp ──CDP──▶ 🌐 Chrome (own profile) ──▶ ✨ Google Flow
```

- 🆓 Stills are free. Clips use Flow's own credits (every account gets 50 free a day) and have a spending cap.
- 🔒 Everything runs on `127.0.0.1`. The tool never sees or types your password.
- 🐢 It works at a human pace: one job at a time, with pauses between jobs. It does nothing to evade bot detection.

## 📋 Requirements

| | |
|---|---|
| 💻 **macOS or Windows 10/11** | Tested on macOS. Windows is supported but hasn't been tried on a real PC yet |
| 🟢 **Node.js 22+** | `node --version` |
| 🌐 **Google Chrome** | Any recent version |
| 👤 **A Google account** | Free. A Google AI plan adds credits and 1080p |
| 🎞️ **FFmpeg** *(optional)* | For cutting, music and narration: `brew install ffmpeg` / `winget install Gyan.FFmpeg` |
| 🗣️ **whisper.cpp** *(optional)* | For captions: `brew install whisper-cpp` |

Keep the computer awake while a job runs. It drives a real Chrome window, so it can't run headless.

## 🚀 Install

```bash
git clone https://github.com/judggernaut/google-flow-mcp.git ~/flow-mcp
cd ~/flow-mcp
npm install && npm run build
npm run login   # sign into Google by hand, open a Flow project, leave the window open
```

> [!WARNING]
> **Mac:** don't put the folder in `~/Desktop`, `~/Documents` or `~/Downloads`. macOS can refuse to start it from there (`EPERM`).
> **Windows:** keep it out of folders that OneDrive syncs.

### 🔌 Connect your assistant

```bash
# Claude Code
claude mcp add --scope user flow -- node ~/flow-mcp/dist/index.js

# Codex
codex mcp add flow -- node ~/flow-mcp/dist/index.js
```

For **Claude Desktop, Copilot CLI, Cursor, Antigravity** and other apps that take an `mcpServers` JSON config (VS Code uses `servers`, see the guide):

```json
{ "mcpServers": { "flow": { "command": "node", "args": ["/absolute/path/to/flow-mcp/dist/index.js"] } } }
```

Restart the app and ask: ***"Check my Flow session."*** 🎉 You should get your plan and credit balance back. Per-app details are in [Connect your assistant](https://judggernaut.github.io/google-flow-mcp/guides/connect/).

### 🎓 Prompting skill

Your assistant gets a video prompting guide and seven templates (shot, film, product, talking, reel,
transition, character) through the `flow_prompt_guide` tool automatically. For Claude Code, Copilot or Codex,
you can also install it as an Agent Skill:

```bash
mkdir -p ~/.agents/skills ~/.claude/skills
ln -s ~/flow-mcp/skills/flow-video-prompting ~/.agents/skills/   # Copilot CLI, Codex
ln -s ~/flow-mcp/skills/flow-video-prompting ~/.claude/skills/   # Claude Code
```

See [Prompting skill & templates](https://judggernaut.github.io/google-flow-mcp/guides/prompting/).

### 🎛️ Or use the control panel

```bash
npm run studio   # then open http://127.0.0.1:8787
```

Or double-click **Flow Studio.command** (Mac) or **Flow Studio.cmd** (Windows).

### 🔄 Update

```bash
cd ~/flow-mcp && git pull && npm install && npm run build
```

Then fully quit and reopen your assistant app.

## 🧹 Uninstall

1. **Disconnect it from your assistant:** `claude mcp remove --scope user flow` or `codex mcp remove flow`, or delete the `"flow"` entry from your app's MCP config.
2. **Remove the skill links**, if you added them: `rm -f ~/.agents/skills/flow-video-prompting ~/.claude/skills/flow-video-prompting`
3. **Delete the program:** `rm -rf ~/flow-mcp`
4. **Delete its data** (the signed-in Chrome profile, the panel token, a saved Gemini key, speech models): `rm -rf ~/.flow-mcp`
5. *(Optional)* Your films are in `~/flow-mcp-out`. Delete that folder only if you don't want them.

On Windows, delete the same folders under `%USERPROFILE%`. Nothing is installed system-wide. Uninstall FFmpeg and whisper.cpp with your package manager if you no longer need them.

## 🤝 Contributing

Contributions are welcome! 💜

```bash
npm install && npm run build      # type-check + compile to dist/
node scripts/e2e.mjs <project> '[{"prompt":"a red fox in snow","type":"image"}]'   # end-to-end, images are free
```

House rules, in short:

- 🔍 **Never guess a selector.** Map it from the live page (`ariaSnapshot`, DOM dump) before writing driver code.
- 💳 **Ask before spending credits.** Test with images (0 credits). They use the same pipeline.
- 🔐 **Never handle Google credentials** or API keys in code, chats or commits.
- 🤖 **No bot-detection evasion.** Drive the real UI at a human pace.

Read the [contributing guide](https://judggernaut.github.io/google-flow-mcp/project/contributing/) for architecture, testing without touching your live session, and the docs site. Have an idea? Check the [roadmap](https://judggernaut.github.io/google-flow-mcp/project/roadmap/) and open an issue.

## ⚠️ Disclaimer

flow-mcp automates Flow's web interface. It can break whenever Google changes that interface, and automated use may be against Google's terms of service. Use it on your own account, at your own risk. It isn't affiliated with or endorsed by Google.
