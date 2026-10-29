# 🎯 Template: single shot

The building block for every other template. Fill in each line, then join them into one paragraph.

```text
SUBJECT:  [who/what, specific: age, build, clothing, material, colour]
ACTION:   [ONE action with a clear start and finish]
CAMERA:   [shot size] + [ONE move: static / slow push-in / pull back / pan / tracking / orbit / crane up / handheld]
PLACE:    [location], [time of day], [weather / atmosphere]
STYLE:    [photoreal / 35mm film / anime / claymation / 3D animation ...], [palette], [lens or depth of field]
LIGHT:    [key light source and quality], [mood]
SOUND:    [ambience]. [sound effect]. [Speaker] says: "[≤ 2.5 words per second of clip]"
```

## Example

> A wiry old lighthouse keeper in a yellow oilskin coat reaches up and flicks the brass switch off, and the
> great lamp's beam dies. Slow push-in from a medium shot to a close-up of his weathered face. The lamp room at
> the top of the tower, stormy dusk, rain streaming down the glass. 35mm film, muted teal and amber palette,
> light grain, shallow depth of field. Warm practical lamp light fading to a cold blue window glow. Rain lashes
> the windows and the wind howls. He mutters: "That's enough for tonight."

## Tool call

```json
{
  "project": "Lighthouse",
  "scenes": [{
    "prompt": "<the paragraph above>",
    "type": "video",
    "model": "Omni 1.1 Flash",
    "duration": 8,
    "resolution": "720p",
    "aspect_ratio": "16:9",
    "max_credits": 12
  }]
}
```

> **💡 Draft it as a still first:** Send the same prompt with `"type": "image"` (0 credits) to check the look, then use that image as `first_frame` for the video.
