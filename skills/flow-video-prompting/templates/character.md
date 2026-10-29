# 🎭 Template: reusable character

A character is drawn once (free) and reused as `asset:<name>`. Its description is quoted word for word in every
scene that references it, so make it complete and visual.

```text
NAME:         [short, unique in this project]
LOOK:         [species/age/build], [face & hair], [clothing items WITH colours], [one signature prop or detail]
STYLE:        [flat cartoon / Pixar-like 3D / photoreal / claymation], kept identical to the film's LOOK
PORTRAIT:     full body, neutral pose, plain background, exactly one figure
PERSONALITY:  [2–3 traits, used by Flow's agent]
VOICE:        [stock Flow voice, e.g. Achird (male, friendly), Aoede (female, breezy), Charon (male, informative)]
VOICE LINE:   "In a [quality] voice with a [accent] accent" (paste it into every scene where they speak)
```

## Example

```json
{
  "name": "Pip",
  "describe": "A small lamplighter boy of about ten with a round face, rosy cheeks and messy copper hair, wearing a navy wool coat with brass buttons, a mustard scarf and brown boots, carrying a long brass lamplighter's pole. Flat cartoon style with clean outlines and soft muted colours. Full body, neutral standing pose, plain warm-grey background, exactly one figure.",
  "aspect_ratio": "3:4",
  "personality": "Curious, brave, a little clumsy.",
  "voice": "Achird"
}
```

Describe the parts that never change in detail: build and age, face shape, eye colour, hair, clothes with their colours, and any defining marks. To change the look later, use `flow_character_edit` with the full new `look`. Characters are per project.
