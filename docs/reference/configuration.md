# ⚙️ Configuration

flow-mcp works with no configuration at all. These environment variables are for advanced setups and testing.
Set them in your MCP app's `"env"` block or in your shell.

## 🌍 Environment variables

| Variable | Default | Purpose |
|---|---|---|
| `FLOW_MCP_HOME` | `~/.flow-mcp` | State folder: Chrome profile, token, key, models, caches |
| `FLOW_MCP_OUTPUT` | `~/flow-mcp-out` | Where finished files are written |
| `FLOW_MCP_PORT` | `8787` | Port for the local HTTP API and Flow Studio |
| `FLOW_MCP_CDP_PORT` | `9333` | Chrome DevTools Protocol port of the dedicated Chrome |
| `FLOW_MCP_CHROME` | auto-detected | Path to the Chrome executable |
| `FLOW_MCP_PAUSE_MIN_S` / `FLOW_MCP_PAUSE_MAX_S` | `25` / `70` | Random pause between generations |
| `FLOW_MCP_PATIENCE_MS` | `45000` | How long a tool call runs before it returns a `task_id` |
| `GEMINI_API_KEY` | – | Google AI Studio key for `gemini` narration. Overrides the saved key file |
| `FLOW_MCP_GEMINI_TTS` | `gemini-2.5-flash-preview-tts` | Gemini TTS model |
| `FLOW_MCP_FFMPEG` / `FLOW_MCP_FFPROBE` | `ffmpeg` / `ffprobe` | FFmpeg binaries |
| `FLOW_MCP_SAY` | `say` | macOS speech binary |
| `FLOW_MCP_WHISPER` | `whisper-cli` | whisper.cpp binary |
| `FLOW_MCP_WHISPER_MODEL` | auto | Use this model file instead of downloading one |
| `FLOW_MCP_MODEL_BASE` | Hugging Face `ggerganov/whisper.cpp` | Mirror to download speech models from |
| `FLOW_MCP_DEBUG` | off | Print timed driver steps on stderr |
| `FLOW_MCP_SIMULATE_MISSING` / `FLOW_MCP_SIMULATE_FAILED` | `0` | **Test hooks:** pretend scene *n* failed in an agent batch |

## 📁 Files on disk

| Path | Contents |
|---|---|
| `~/.flow-mcp/chrome-profile/` | The dedicated, signed-in Chrome profile (kept separate from your everyday Chrome) |
| `~/.flow-mcp/token` | Random per-run token for the local API (`0600`) |
| `~/.flow-mcp/gemini-key` | Your Google AI Studio key, if you saved one (`0600`) |
| `~/.flow-mcp/characters.json` | Stored character looks, quoted in each scene's character lock |
| `~/.flow-mcp/downloads/` | Where Chrome saves files before they're renamed into place |
| `~/.flow-mcp/uploads/` | Files uploaded through Flow Studio (up to 200 MB each) |
| `~/.flow-mcp/models/` | whisper.cpp speech models |
| `~/.flow-mcp/captions/` | Cached transcripts and caption previews |
| `~/flow-mcp-out/<project>/` | Your stills, clips, narration and cuts. `_cast/` holds character portraits |
