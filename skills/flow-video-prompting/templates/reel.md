# 📱 Template: vertical reel / short (9:16)

```text
HOOK (0–2 s):  [the most striking image or question, first]
BEATS:         [2–4 shots, 4–6 s each, one action each]
ASPECT:        9:16 on EVERY scene
SUBJECT:       centred, framed for a tall screen (full body or medium shot)
TEXT ROOM:     keep the [bottom | top] third calm for captions
SOUND:         [voiceover line or music mood]
END:           [call to action / loopable last frame (seamless-loop technique)]
```

## Example

```json
{
  "project": "SnowFox",
  "scenes": [
    { "prompt": "A red fox leaps headfirst into deep fresh snow and vanishes. Static low-angle shot. Bright winter morning, sparkling snow, crisp photoreal look. A soft crunch of snow.", "aspect_ratio": "9:16", "model": "Omni 1.1 Flash", "duration": 4, "resolution": "720p", "max_credits": 7 },
    { "prompt": "The red fox bursts back out of the snow holding a vole, snow cascading off its fur. Slow push-in. Same bright winter morning, crisp photoreal look.", "aspect_ratio": "9:16", "chain_previous": true, "model": "Omni 1.1 Flash", "duration": 6, "resolution": "720p", "max_credits": 10 }
  ]
}
```

Then call `flow_narrate` → `flow_assemble`. For `flow_captions`, transcribe first, check the words with the user,
then burn the captions once (style `bold`, position `middle` or a number, so they clear the app's UI).
