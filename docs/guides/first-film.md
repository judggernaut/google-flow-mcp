# 🎥 Your first film

Talk to your assistant in plain English. Nothing below costs a credit until step 4, and the assistant asks
before it spends anything.

| # | Ask | Cost |
|---|---|---|
| 1️⃣ | *"Check my Flow session."* This confirms you're signed in and shows your plan and credits. | 🆓 |
| 2️⃣ | *"Create a character called Pip, a small lamplighter in a flat cartoon style."* | 🆓 |
| 3️⃣ | *"Draw three stills with Pip: a dark rooftop, him lighting a lamp, the whole hillside glowing. Match each one to the last."* | 🆓 |
| 4️⃣ | *"Turn those into three 10-second shots, each starting where the last one ended, 720p, no more than 15 credits each."* | 💳 |
| 5️⃣ | *"Record this line with a warm documentary voice."* | 🆓 |
| 6️⃣ | *"Join the three shots under the narration, and don't freeze the last frame."* | 🆓 |
| 7️⃣ | *"Add bold captions."* | 🆓 |

The finished file lands in `~/flow-mcp-out/<project>/`.

!!! tip "Get the look right while it's free"
    Stills cost nothing, so get each frame looking right before you turn it into a clip. A clip that starts
    from a good still is much more likely to come out right first time.

## 🔗 Keeping shots continuous

| You want | Use |
|---|---|
| This clip starts on the previous clip's last frame | `chain_previous` |
| Animate between two stills you chose | `first_frame` + `last_frame` |
| Keep a character, product or place consistent | `reference_images` (files or `asset:<name>`) |
| A start frame **and** a character locked in together | `flow_continue` |

Flow's composer takes either frames or references, never both. `flow_continue` gets around that by going
through Flow's agent mode. It has two modes:

- **`exact`** (the default) opens on the real last frame, so the join is invisible. The character's likeness
  comes from that frame.
- **`likeness`** holds the attached character steady, but the opening frame only approximates the earlier
  shot.

## 🗣️ Narration

`flow_narrate` is free and takes text of any length:

- **`mac`** uses the voices built into your computer: macOS voices on a Mac, System.Speech on Windows. No key
  needed.
- **`gemini`** uses Google AI Studio text-to-speech, with the same voice family Flow has (Charon, Kore and
  more) plus a short `style` note. Get a free key from [Google AI Studio](https://aistudio.google.com/apikey)
  and paste it into **Flow Studio → Voice → Save key**, or set `GEMINI_API_KEY`.

!!! warning "Keep keys out of chats"
    Never paste an API key into a conversation with your assistant, because it stays in the chat history.
    The Studio key field checks the key with Google and stores it only on your computer
    (`~/.flow-mcp/gemini-key`, mode `0600`).

!!! note "Keep style notes short"
    A long delivery note makes the model ramble. In one test, a 45-word line with a 25-word style note came
    back as 674 seconds of audio. Use a few words, such as *"warm, unhurried"*.

## 💬 Captions

`flow_captions` burns word-timed captions into any video, wide or vertical. It works in about 100 languages, in
five styles (Bold pop, Highlight, Word by word, Clean, Boxed), at any height and size, and also writes an
`.srt`. It runs entirely on your computer with whisper.cpp, headless Chrome and FFmpeg. The speech model
downloads by itself the first time: 148 MB for English, 574 MB for any other language.

The best workflow: **transcribe first**, fix any misheard words, then make the video once.

## 🧯 If a clip doesn't download

The clip is safe in your Flow project and you've already paid for it. Ask your assistant to download it
(`flow_download`). That's free. **Never generate it again**, or you'll pay twice.
