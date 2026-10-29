# 🎛️ Flow Studio

Flow Studio is a local control panel with the same features as the MCP tools, so you can use it without an AI
assistant.

```bash
npm run studio     # then open http://127.0.0.1:8787
```

Or double-click **Flow Studio.command** (Mac) or **Flow Studio.cmd** (Windows). If your assistant app is open,
its flow-mcp process is already serving the panel at the same address.

!!! info "Opening `studio/index.html` directly does nothing"
    The page needs the server behind it, and says so in red if you open it as a plain file.

## 🗂️ The tabs, in the order you'd use them

| Tab | What it's for |
|---|---|
| 🎭 **Cast** | Reusable characters: create them, edit them in place, or build one from a picture |
| 🖼️ **Frames** | Free stills, with *match previous frame* to keep a set on-model |
| 🎬 **Shots** | Paid clips with first and last frames, chaining, a live credit estimate, and a card that continues a finished clip |
| 🗣️ **Voice** | Free narration in Google's voices or your computer's own, a list of saved narrations, and the Google AI Studio key field |
| 🎨 **Restyle** | Change a clip you already have (`flow_edit`) |
| ✂️ **Cut** | Join any videos in the order you pick, then add narration and music and balance the clips' own sound |
| 💬 **Captions** | Spoken-word captions with a live preview on a real frame. Fix a misheard word and it keeps its timing |
| 📚 **Library** | Everything in your Flow project: download it again for free, or move it to Flow's Trash |

A progress monitor and a gallery of your saved work sit alongside the tabs. On a wide screen, each side scrolls
on its own.

## 🗑️ Two kinds of delete

Both labels say exactly what gets removed, and both can be undone:

- **Move to the Mac's Trash / Recycle Bin** removes a file from your computer.
- **Move to Flow's Trash** removes an item from your Flow project only. Files you've already downloaded stay.

## 🔒 Security

The panel and its API listen on `127.0.0.1` only. Every API call needs a random per-run token
(`~/.flow-mcp/token`, mode `0600`), and requests whose `Host` header isn't `127.0.0.1` or `localhost` are
refused, which blocks DNS-rebinding attacks.
