# 🆘 Troubleshooting

| 😵 Symptom | 💡 Fix |
|---|---|
| Mac: `EPERM: operation not permitted` on start | The folder is in `~/Desktop`, `~/Documents` or `~/Downloads`, which macOS protects. Move it to `~/flow-mcp` and update the path in your app's config |
| *"Not signed in"* or *"no project open"* | Run `npm run login`, sign in, open a Flow project and leave the window open |
| The tool doesn't show up in your assistant | Fully quit and reopen the app. Check that the path is absolute and that `npm run build` ran. If `node` isn't found, put the full path from `which node` / `where node` in `"command"` |
| A clip was made but no file arrived | It's still in Flow. `flow_download` brings it back for free. **Never generate it again** |
| A paid job vanished from the queue | Check Flow's grid (`flow_assets`) before running anything again. An empty queue doesn't prove nothing ran |
| Everything times out | The Chrome window was closed or the computer slept. Run `npm run login` again |
| `Request timed out` in your app | Long calls return a `task_id` after about 45 s. Ask your assistant to wait for it (`flow_wait`) |
| The panel says *"Not connected"* | Nothing is serving port 8787. Start `npm run studio` or open your assistant app |
| Downloads fail while Studio and a test both run | Two processes attached to the same Chrome can interfere with each other. Stop one first |
| The 1080p upscale never arrives | Flow renders it on demand and sometimes never delivers it. Download the 720p original and upscale it locally with FFmpeg |
| Install fails with *403 Forbidden* | Your network blocks some downloads, which is common on work and school networks. Try a home connection |
| Out of credits | Free credits refill daily. Stills are always free |

## 🐞 Debug logging

Set `FLOW_MCP_DEBUG=1` to print each driver step, with timings, on stderr.

## 🐛 Still stuck?

[Open an issue](https://github.com/judggernaut/google-flow-mcp/issues/new) with your OS, Node version, the
tool you called, and the error text. **Remove any keys, tokens or personal paths first.**
