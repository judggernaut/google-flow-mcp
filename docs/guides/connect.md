# 🔌 Connect your assistant

flow-mcp is a **stdio** MCP server. Every app launches it the same way, with `node <folder>/dist/index.js`.
Only the config file differs between apps.

!!! tip "Use the full path"
    Replace `/absolute/path/to/flow-mcp` with the real folder, for example `/Users/you/flow-mcp` or
    `C:\\Users\\you\\flow-mcp` (on Windows, double the backslashes inside JSON). If the app can't find `node`, put
    the output of `which node` (Mac) or `where node` (Windows) in `"command"`.

=== "Claude Code"

    ```bash
    claude mcp add --scope user flow -- node /absolute/path/to/flow-mcp/dist/index.js
    ```

    `--scope user` makes it available in every folder. The default (`local`) only works in the folder you ran
    it from.

=== "Claude Desktop"

    **Settings → Developer → Edit Config** opens `claude_desktop_config.json`
    (Mac: `~/Library/Application Support/Claude/`, Windows: `%APPDATA%\Claude\`):

    ```json
    { "mcpServers": { "flow": { "command": "node", "args": ["/absolute/path/to/flow-mcp/dist/index.js"] } } }
    ```

    If the file already has an `"mcpServers"` section, add `"flow"` inside it. Then **quit Claude completely**
    (Cmd+Q, or tray icon → Quit on Windows) and reopen it.

=== "GitHub Copilot CLI"

    Run `/mcp add` inside `copilot`, or add this to `~/.copilot/mcp-config.json`:

    ```json
    {
      "mcpServers": {
        "flow": {
          "type": "local",
          "command": "node",
          "args": ["/absolute/path/to/flow-mcp/dist/index.js"],
          "tools": ["*"]
        }
      }
    }
    ```

=== "VS Code (Copilot Chat)"

    **MCP: Add Server** from the command palette, or `.vscode/mcp.json` / your user `mcp.json`.
    Note that VS Code uses a `servers` key, not `mcpServers`:

    ```json
    { "servers": { "flow": { "type": "stdio", "command": "node", "args": ["/absolute/path/to/flow-mcp/dist/index.js"] } } }
    ```

=== "Codex"

    ```bash
    codex mcp add flow -- node /absolute/path/to/flow-mcp/dist/index.js
    ```

    Or add this to `~/.codex/config.toml` (`%USERPROFILE%\.codex\config.toml` on Windows):

    ```toml
    [mcp_servers.flow]
    command = "node"
    args = ["/absolute/path/to/flow-mcp/dist/index.js"]
    ```

=== "Antigravity"

    Open the agent panel's **… → Manage MCP Servers → View raw config** (`~/.gemini/antigravity/mcp_config.json`)
    and add the entry next to any servers that are already there:

    ```json
    { "mcpServers": { "flow": { "command": "node", "args": ["/absolute/path/to/flow-mcp/dist/index.js"] } } }
    ```

=== "Cursor & others"

    Most apps accept the same `mcpServers` JSON. Cursor reads `~/.cursor/mcp.json`.

## ✅ Check it works

Restart the app and ask: ***"Check my Flow session."*** You should get your plan and credit balance back.
After that, just ask in plain English. You never need to type tool names.

## ⏱️ The 60-second limit

Most MCP apps give up on a single tool call after about 60 seconds. Any flow-mcp call that runs longer than
about 45 seconds (creating a character, a 1080p download, waiting on a video) returns `still_working` and a
`task_id` and keeps going in the background. `flow_wait` collects the result, so no timeout setting is needed.

## 👯 Running several apps at once

That's safe. The first process to start owns the Chrome tab and the job queue on `127.0.0.1:8787`. Every other
process (another app, or Flow Studio) becomes a client and forwards its calls to the owner, so they never
generate twice or disagree about what's running.

## 🚫 What can't connect

ChatGPT in the browser and the ChatGPT app can only reach MCP servers on the internet. flow-mcp has to run on
your own computer, because it drives the Chrome window there.

!!! info "Tested with"
    Built and tested with Claude. Codex, Copilot, Antigravity and Cursor use the same protocol and should work
    too. Please [open an issue](https://github.com/judggernaut/google-flow-mcp/issues) if one doesn't.
