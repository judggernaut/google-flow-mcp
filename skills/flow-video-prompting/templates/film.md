# 🎞️ Template: short film (multi-shot)

Plan the whole piece first, make free keyframes, then send **one** `flow_generate` call.

```text
TITLE:      [working title]
LOGLINE:    [one sentence: who wants what, and what happens]
LENGTH:     [total seconds] = [n] shots × [4/6/8/10] s
ASPECT:     [16:9 | 9:16]
LOOK:       [style, palette, lens, film stock, repeated word for word in every shot]
CAST:       [name]: [full visual description] → asset:[name] (make it with flow_character)
BUDGET:     [max credits in total] → [per shot]

SHOT 1 [establish]: [subject + action] | [camera] | [place/time] | [sound/line]
SHOT 2 [develop]:   ... | continuity: [chain_previous | first/last frame | reference]
SHOT 3 [turn]:      ...
SHOT 4 [payoff]:    ...
```

## Example: "The Lamplighter" (30 s, 3 shots, Omni 720p 10 s = 15 credits each)

| # | Shot | Continuity |
|---|---|---|
| 1 | Pip, a small lamplighter in a flat cartoon style, climbs onto a dark rooftop at dusk carrying a long brass pole. Slow lateral tracking shot. | keyframe as `first_frame` |
| 2 | Pip reaches up and lights a street lamp, which bursts into warm light. Static medium shot. | `chain_previous` |
| 3 | The whole hillside of lamps flickers on one by one as Pip watches. Slow pull-back reveal to a wide shot. | `chain_previous` |

## Steps

1. `flow_character` → Pip (free).
2. `flow_agent_images` → three keyframes with `references: [{ "image": "asset:Pip", "name": "Pip" }]` (free). Get a yes.
3. Tell the user the total: 3 × 15 = 45 credits.
4. `flow_generate`. Every shot here starts from an image (a keyframe, or the previous clip's last frame), so
   each prompt describes **motion only** and doesn't repeat the LOOK:

```json
{
  "project": "Lamplighter",
  "scenes": [
    { "prompt": "He climbs onto the rooftop, the brass pole over his shoulder. Slow lateral tracking shot. Ambient noise: wind, a distant dog.", "first_frame": "/Users/you/flow-mcp-out/Lamplighter/scene-01.png", "model": "Omni 1.1 Flash", "duration": 10, "resolution": "720p", "max_credits": 15 },
    { "prompt": "He reaches up and lights the street lamp, which bursts into warm light. Static medium shot. SFX: a soft whoosh of flame.", "chain_previous": true, "model": "Omni 1.1 Flash", "duration": 10, "resolution": "720p", "max_credits": 15 },
    { "prompt": "Lamps across the hillside flicker on one by one as he watches. Slow pull-back to a wide shot. Gentle music swells.", "chain_previous": true, "model": "Omni 1.1 Flash", "duration": 10, "resolution": "720p", "max_credits": 15 }
  ]
}
```

For shots made from text alone (no `first_frame`), write the full prompt: shot + CAST description + LOOK, word for word every time.

5. `flow_narrate` (free) → `flow_assemble` with `voiceover` and `hold_last_frame: false` → `flow_captions` (optional).
