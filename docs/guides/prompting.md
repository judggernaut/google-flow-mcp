# 🎓 Prompting skill & templates

Good prompts save credits. flow-mcp ships a **video prompting skill**: a shot-planning workflow, a prompt
formula, rules learned the hard way, model costs, and eight fill-in templates with worked examples. Your
assistant gets it in one of three ways, depending on the app:

| How | Works in | What to do |
|---|---|---|
| 🧰 **`flow_prompt_guide` tool** | Every MCP app | Nothing. The assistant calls it before planning a video |
| 💬 **`plan_video` prompt** | Apps that show MCP prompts (e.g. Claude Desktop, VS Code) | Pick *plan_video* from the prompt / slash menu and describe your idea |
| 🧠 **Agent Skill** | Claude Code, GitHub Copilot CLI, Codex | Install it once (below). It loads automatically when you ask for a video |

All three read the same files in [`skills/flow-video-prompting/`](https://github.com/judggernaut/google-flow-mcp/tree/main/skills/flow-video-prompting), so they always agree.

## 📥 Install the skill

A symlink keeps it up to date every time you `git pull`:

=== "Claude Code"

    ```bash
    mkdir -p ~/.claude/skills
    ln -s ~/flow-mcp/skills/flow-video-prompting ~/.claude/skills/flow-video-prompting
    ```

=== "Copilot CLI · Codex"

    Both read `~/.agents/skills` (Copilot also reads `~/.copilot/skills`):

    ```bash
    mkdir -p ~/.agents/skills
    ln -s ~/flow-mcp/skills/flow-video-prompting ~/.agents/skills/flow-video-prompting
    ```

=== "Windows"

    ```powershell
    New-Item -ItemType Junction -Path "$HOME\.agents\skills\flow-video-prompting" -Target "$HOME\flow-mcp\skills\flow-video-prompting"
    ```

    Use `$HOME\.claude\skills\...` as the path for Claude Code.

Then ask something like *"Plan a 30-second ad for my coffee mug"*, or call it by name: `/flow-video-prompting`
in Claude Code and Copilot, `$flow-video-prompting` in Codex.

## ✍️ The formula in 10 seconds

> **Subject + action** → **shot size + camera move** → **location + time** → **style** → **lighting** →
> **sound & dialogue**

- 🎯 **One shot, one camera move, one action that starts and finishes.**
- 🧍 Repeat the full character description in every scene, or use `asset:<character>`.
- 🖼️ Make the stills first (free), then animate them.
- 🙅 Say what you want to see, not what you don't (*"an empty beach"*, not *"no people"*).
- 🗣️ Dialogue goes after a colon, **without quotation marks** (quotes can show up as on-screen text). Keep it to about 2.5 words per second of clip.
- 🖼️ Starting from an image? Describe **motion only**.
- 🧩 Say how each reference is used: *"Using the provided images of…"*.
- 💳 Quote the credit total before anything paid.

The [full guide](https://github.com/judggernaut/google-flow-mcp/blob/main/skills/flow-video-prompting/SKILL.md) has the
model cost table and continuity options. It follows Google's own
[Veo / Omni Flash prompt guide](https://cloud.google.com/vertex-ai/generative-ai/docs/video/video-gen-prompt-guide),
[best practices](https://cloud.google.com/vertex-ai/generative-ai/docs/video/best-practice),
the [Veo 3.1 guide](https://cloud.google.com/blog/products/ai-machine-learning/ultimate-prompting-guide-for-veo-3-1),
the [Nano Banana guide](https://ai.google.dev/gemini-api/docs/image-generation#prompt-guide) and
[Flow's help](https://support.google.com/flow/answer/16352836), plus lessons from real runs.

## 🧩 Templates

=== "🎯 Shot"

    --8<-- "skills/flow-video-prompting/templates/shot.md"

=== "🎞️ Film"

    --8<-- "skills/flow-video-prompting/templates/film.md"

=== "🛍️ Product"

    --8<-- "skills/flow-video-prompting/templates/product.md"

=== "🗣️ Talking"

    --8<-- "skills/flow-video-prompting/templates/talking.md"

=== "📱 Reel"

    --8<-- "skills/flow-video-prompting/templates/reel.md"

=== "🔀 Transition"

    --8<-- "skills/flow-video-prompting/templates/transition.md"

=== "🎭 Character"

    --8<-- "skills/flow-video-prompting/templates/character.md"

=== "🖼️ Still"

    --8<-- "skills/flow-video-prompting/templates/still.md"
