# 🖼️ Template: stills with Nano Banana (free)

Stills cost 0 credits, so use them to lock the look before any paid video: keyframes, storyboard panels,
character turnarounds and edits.

```text
PURPOSE:   [what it's for: keyframe for shot 2 / thumbnail / storyboard panel / ad hero]
SHOT:      A [photorealistic | illustrated | 3D ...] [shot type] of [subject, hyper-specific]
SETTING:   in [place], [time], [weather]
LIGHT:     [light source, quality, colour]
CAMERA:    shot from [angle] with a [lens], [depth of field]
TEXT:      the words "[exact text]" in [font description], [placement] (optional; Nano Banana Pro is best at text)
ASPECT:    [match the video it will start: 16:9 | 9:16]
```

## Example: keyframe

> Keyframe for a short film. A photorealistic medium shot of a wiry old lighthouse keeper in a yellow oilskin
> coat, one hand on a brass switch, in the lamp room at the top of the tower at stormy dusk. Warm lamp light on
> his face, a cold blue glow from the rain-streaked windows. Shot at eye level with a 35mm lens, shallow depth of
> field, light film grain.

## Example: edit an existing still

> Using the provided image, change only his coat from yellow to deep red. Keep his face, pose, the lamp room and
> the lighting exactly the same.

## Tool call

```json
{
  "project": "Lighthouse",
  "scenes": [
    { "prompt": "<keyframe example>", "type": "image", "aspect_ratio": "16:9" },
    { "prompt": "<edit example>", "type": "image", "aspect_ratio": "16:9", "reference_previous": true }
  ]
}
```

For many stills at once, use `flow_agent_images` (up to 50 scenes in parallel), with `references` for the cast.

> **💡 Complex scenes:** give instructions step by step: *"First, a misty forest at dawn. Then, in the foreground, a mossy stone altar. Finally, a single glowing sword on the altar."*

> **💡 Positive phrasing:** write *"an empty, deserted street"*, not *"no cars"*.
