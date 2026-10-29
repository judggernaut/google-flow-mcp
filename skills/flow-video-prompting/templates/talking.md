# 🗣️ Template: someone speaking to camera

```text
SPEAKER:   [character / avatar name] → asset:[name], or a portrait as first_frame
FRAMING:   static medium close-up, eye level, looking into the lens
SETTING:   [simple background], [light]
LINE:      [exact words, after a colon, NO quotation marks]  → max words = clip seconds × 2.5
VOICE:     "In a [quality] voice with a [accent] accent" (repeat it word for word in every clip of this speaker)
DELIVERY:  [tone in 2–4 words: warm and unhurried / urgent / deadpan]
SOUND:     [quiet room tone], nothing competing with the voice
```

## Example (8 s, about 18 words)

> A cheerful woman in her thirties with short curly hair and a mustard sweater sits at a sunny kitchen table and
> looks into the camera. Static medium close-up, eye level. Soft morning window light, shallow depth of field.
> Ambient noise: quiet kitchen room tone. In a warm, bright voice with a standard American accent, she says: I
> tried every planner out there. This is the first one I actually kept using.

```json
{
  "project": "Testimonial",
  "scenes": [{
    "prompt": "<example>",
    "first_frame": "/Users/you/flow-mcp-out/Testimonial/portrait.png",
    "technique": "talking-avatar",
    "model": "Omni 1.1 Flash", "duration": 8, "resolution": "720p", "max_credits": 12
  }]
}
```

> **💡 Starting from a portrait:** the portrait already fixes the face and the set, so the prompt can be motion and voice only: *"She looks into the camera and smiles. Static medium close-up. In a warm, bright voice with a standard American accent, she says: …"*

> **💡 Longer lines:** Split long lines across shots joined with `chain_previous`. Or record the narration with `flow_narrate` (free, any length) over silent shots, and join them with `flow_assemble`.
