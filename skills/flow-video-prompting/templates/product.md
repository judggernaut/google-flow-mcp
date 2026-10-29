# 🛍️ Template: product shot / ad

The product must stay **identical**, so always attach a real product photo as `reference_images`.

```text
PRODUCT:   [exact name, material, colour, label text] → reference photo: [path]
HERO MOVE: [technique id: hero-rotation | levitation | liquid-splash | macro-bokeh | turntable | inner-glow | bloom]
SET:       [surface / backdrop], [props, 0–2 only]
LIGHT:     [rim light / soft box / golden hour], [palette matching the brand]
CLOSE:     [logo or end card: use transition template "logo-resolve" with the logo as last_frame]
FORMAT:    [16:9 web | 9:16 social | 1:1 feed (images only)]
```

## Example

> The exact matte black ceramic coffee mug from the reference image, with its small white logo, sits on a slab
> of dark slate. Wisps of steam rise from fresh coffee. Static close-up, the product sharp and centred.
> Premium studio look, deep shadows, a single warm rim light tracing the mug's edge. Quiet room tone and a soft
> pour sound.

```json
{
  "project": "MugAd",
  "scenes": [
    { "prompt": "<example>", "type": "image", "reference_images": ["/Users/you/Pictures/mug.jpg"], "technique": "img-hero-shot" },
    { "prompt": "<example>", "reference_images": ["/Users/you/Pictures/mug.jpg"], "technique": "hero-rotation", "model": "Omni 1.1 Flash", "duration": 6, "resolution": "720p", "max_credits": 10 }
  ]
}
```

Run `flow_techniques` with `category: "product"` for every product phrase and what each one needs.
