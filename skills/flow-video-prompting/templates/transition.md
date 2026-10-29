# 🔀 Template: transition between two frames

Make **both** stills for free first, then animate between them.

```text
FIRST FRAME:  [image A: path or asset:]
LAST FRAME:   [image B: path or asset:] (the same image as A gives a seamless loop)
TECHNIQUE:    [whip-pan | into-the-screen | seamless-loop | before-after | match-cut | logo-resolve | particle-dissolve | axis-flip]
BRIDGE:       [one sentence on what physically changes between A and B]
CAMERA:       [static for before/after; let the technique drive the rest]
```

## Example: before / after

```json
{
  "project": "Renovation",
  "scenes": [{
    "prompt": "A dusty, empty attic transforms smoothly into a bright reading nook with a window seat, bookshelves and warm lamps.",
    "first_frame": "/Users/you/flow-mcp-out/Renovation/scene-01.png",
    "last_frame": "/Users/you/flow-mcp-out/Renovation/scene-02.png",
    "technique": "before-after",
    "model": "Omni 1.1 Flash", "duration": 6, "resolution": "720p", "max_credits": 10
  }]
}
```

References are dropped when frames are set. Put the identity in both stills instead.
