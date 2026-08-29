# SKILL — Visual Parity / Reference-Driven UI for Codex

## Purpose

Use this skill whenever the task is to **recreate, refactor or visually match an existing UI from a screenshot, mockup, Stitch/Claude/Figma export, or other visual reference**.

The primary objective is **visual parity**.

A successful build, passing tests, valid HTML/CSS, or “looks close enough” are **NOT** sufficient reasons to finish the task.

> **Do not declare the task complete until the rendered implementation is visually very close to the supplied reference.**

The reference image is the visual source of truth unless the user explicitly says otherwise.

---

# 1. Core rule

When a visual reference exists:

1. Inspect the reference carefully.
2. Inspect the actual rendered implementation.
3. Compare them.
4. Identify visible differences.
5. Modify the implementation.
6. Render again.
7. Compare again.
8. Repeat until the result is visually close.

Do **not** stop after the first implementation pass.

Do **not** validate solely from source code.

Do **not** assume that because CSS values seem reasonable the result is correct.

The browser render is what matters.

---

# 2. Definition of done

The task is considered complete only when all of the following are true:

- The overall composition closely matches the reference.
- Main blocks have comparable width, height and spacing.
- Typography hierarchy is visually equivalent.
- Alignment is correct.
- Borders and radii look equivalent.
- Background tones are equivalent.
- Cards have the intended depth.
- Shadows/glows are visually equivalent.
- Images use equivalent crop, position and proportion.
- Buttons and controls have equivalent scale and visual weight.
- Responsive layouts remain coherent.
- Existing functionality still works.
- Existing required texts and data have not been modified unless explicitly requested.
- There are no obvious visual regressions elsewhere.

A normal user looking at both screenshots side by side should immediately perceive them as the **same design system and nearly the same composition**, not merely “similar”.

Target: **roughly 90–95% perceptual parity or better** where technically reasonable.

Pixel-perfect parity is not required when browser rendering, fonts, dynamic data or image crops make exact equality impossible, but visible structural differences must be corrected.

---

# 3. Never finish because only technical validation passed

These are necessary but **not sufficient**:

```text
npm run build ✅
tests ✅
lint ✅
git diff --check ✅
```

A task with perfect tests but poor visual parity is **unfinished**.

The order must be:

```text
implementation
↓
browser render
↓
visual comparison
↓
iteration
↓
technical validation
↓
final visual inspection
↓
done
```

Never:

```text
implementation
↓
build passes
↓
done
```

---

# 4. Mandatory browser inspection

Whenever possible, launch the application locally and inspect the real rendered page.

For Angular projects, typically:

```bash
npm start
```

or:

```bash
ng serve
```

Then inspect:

```text
http://localhost:4200
```

Use the browser available in the environment.

If Playwright is available, use it.

If Playwright is not available and installing it is safe for the project, it may be added as a development-only tool for local visual validation.

Do not introduce runtime production dependencies merely for inspection.

---

# 5. Mandatory screenshot loop

For reference-driven tasks, perform a repeatable visual loop.

At minimum:

```text
1. Render current implementation.
2. Capture screenshot.
3. Compare with reference.
4. List the largest visible mismatches.
5. Fix the largest mismatch first.
6. Capture again.
7. Repeat.
```

Do this until the large and medium visual differences are gone.

Do not spend time polishing tiny details while major proportions remain wrong.

---

# 6. Comparison priority

Compare in this order.

## Level 1 — Macro layout

Fix these first:

- page width;
- container max-width;
- section heights;
- major column ratios;
- hero proportions;
- card dimensions;
- large whitespace;
- section order;
- image-to-copy ratio.

A wrong macro layout invalidates smaller cosmetic adjustments.

## Level 2 — Alignment and spacing

Inspect:

- vertical rhythm;
- gaps;
- padding;
- margins;
- left edges;
- baseline alignment;
- button spacing;
- card internal spacing.

Avoid arbitrary one-off pixel patches when a layout rule can solve the issue.

Prefer fixing the parent layout rather than individually nudging many children.

## Level 3 — Typography

Inspect:

- font family;
- font size;
- weight;
- line-height;
- letter-spacing;
- line wrapping;
- maximum text width;
- color/opacity;
- capitalization.

Text wrapping matters.

If the reference heading occupies 3 lines and the implementation occupies 2 or 4, investigate width, font size, line-height and font metrics.

Do not change the actual wording to force wrapping unless the user explicitly permits text changes.

## Level 4 — Surfaces

Inspect:

- background colors;
- card fill;
- gradients;
- border colors;
- border opacity;
- radius;
- separation between nested surfaces.

Avoid “card inside glowing card inside glowing card” unless the reference actually does this.

Maintain visual hierarchy.

## Level 5 — Depth and lighting

Inspect:

- box shadows;
- blur;
- glow;
- ambient light;
- inset highlights;
- local contrast.

Effects must be judged from the screenshot, not just CSS values.

A `box-shadow` existing in the stylesheet does not mean the glow is visually present.

## Level 6 — Imagery

Inspect:

- aspect ratio;
- object-fit;
- object-position;
- crop;
- border radius;
- image scale;
- overlay;
- tint;
- shadow.

Use the same existing assets requested by the user whenever possible.

Do not silently substitute reference imagery with unrelated assets.

## Level 7 — Micro details

Only after the previous levels are correct:

- icon size;
- one-pixel borders;
- subtle opacity;
- tiny radius differences;
- small separator spacing;
- hover polish.

---

# 7. Reference is stronger than assumptions

Do not “improve” a supplied reference unless the user asks for design changes.

If the reference contains:

- a subtle glow, reproduce a subtle glow;
- no shadow, do not add a dramatic shadow;
- large whitespace, preserve it;
- an asymmetric layout, preserve it;
- unusual proportions, preserve them.

Do not replace the design with a generic SaaS, dashboard, glassmorphism, bento grid, neumorphism or AI-looking style because it seems more fashionable.

---

# 8. Preserve content and behavior by default

Unless the prompt explicitly asks otherwise, do **not** modify:

- text;
- headings;
- labels;
- rescue stories;
- prices;
- product names;
- carousel data;
- carousel behavior;
- routes;
- API contracts;
- checkout logic;
- cart behavior;
- stock logic;
- Mercado Pago integration;
- backend contracts;
- accessibility semantics;
- existing business rules.

Visual refactoring must remain visual.

If a structural code refactor is required to reproduce the visual design, preserve observable behavior.

---

# 9. Special rule for Gatarsis

For the Gatarsis project, preserve its existing identity.

Core visual character:

- warm animal-rescue tone;
- purple/lilac as primary identity;
- dark mode should feel deep, elegant and emotionally warm;
- light mode should remain clean and soft;
- cards should not look like generic admin dashboard panels;
- decorative motifs may include subtle hearts/paws when present in the intended design;
- Mercado Pago CTA remains visually recognizable;
- content about rescue cases must remain the emotional focus.

Avoid making Gatarsis look like:

- crypto UI;
- gaming dashboard;
- cyberpunk interface;
- generic AI landing page;
- enterprise SaaS admin;
- glassmorphism demo.

---

# 10. Dark mode neon rule

When the reference contains violet neon/ambient borders, interpret them as **light emitted around the edge**, not simply a purple outline.

Bad:

```css
border: 1px solid #a855f7;
```

This usually reads only as an outline.

Better conceptual structure:

```css
border: 1px solid rgba(190, 130, 255, .45);

box-shadow:
  0 0 5px rgba(190, 120, 255, .24),
  0 0 14px rgba(175, 95, 255, .16),
  0 0 28px rgba(145, 65, 230, .08);
```

Exact values must be tuned visually.

The desired perception is:

```text
thin edge
→ local light
→ soft violet halo
→ gradual disappearance into page background
```

The halo should remain visible at normal screenshot scale.

It should not look like a nightclub sign.

---

# 11. Neon hierarchy

Not every nested element gets the same glow.

Use approximately:

### Level A — Primary surfaces
Visible ambient glow.

Examples:

- major feature card;
- donation/debt card;
- primary editorial panel.

### Level B — Secondary cards
Much weaker glow or only a soft border.

### Level C — Internal controls
Usually no external glow.

Examples:

- input fields;
- alias panel;
- nested panels;
- small metadata containers.

Use hierarchy instead of repeating the same visual effect everywhere.

---

# 12. Avoid clipped glows

Whenever an effect appears much weaker than the reference, inspect parent overflow.

Check for:

```css
overflow: hidden;
overflow: clip;
```

If the glow must extend outside while internal content needs clipping, separate responsibilities:

```html
<div class="card-shell">
  <div class="card-surface">
    ...
  </div>
</div>
```

Conceptually:

```text
card-shell
  → overflow visible
  → external glow

card-surface
  → border radius
  → overflow hidden
  → actual content
```

---

# 13. Hover must not replace base appearance

If a reference shows the visual effect permanently, the base state must show it permanently.

Hover may only introduce a very small enhancement.

For example:

```text
base = 100%
hover = 105–110%
```

Never:

```text
base = no effect
hover = full effect
```

unless the reference explicitly demonstrates that behavior.

---

# 14. Responsive inspection

At minimum inspect:

- desktop;
- mobile.

Suggested widths:

```text
1440px or similar desktop
390px–430px mobile
```

If the supplied reference represents a specific viewport, inspect that viewport first.

The design does not need to be geometrically identical across breakpoints, but hierarchy and visual character must survive.

Check:

- wrapping;
- card stacking;
- horizontal overflow;
- image crop;
- CTA accessibility;
- nav behavior;
- text readability.

---

# 15. Do not invent visual evidence

Never say:

> “It now matches the reference.”

unless you actually inspected the rendered result after the latest changes.

Never say:

> “Pixel-perfect.”

unless a real comparison supports that claim.

Use accurate language:

```text
I inspected the rendered implementation against the supplied reference.
The major structural and stylistic differences have been corrected.
```

---

# 16. Visual discrepancy report

Before finishing, internally assess:

```text
LAYOUT
[ ] overall proportions
[ ] max-width
[ ] section heights
[ ] column ratios

SPACING
[ ] section gaps
[ ] card padding
[ ] alignment
[ ] whitespace

TYPOGRAPHY
[ ] heading scale
[ ] wrapping
[ ] body width
[ ] line-height
[ ] weights

SURFACES
[ ] background
[ ] card fill
[ ] borders
[ ] radius

LIGHTING
[ ] shadow
[ ] glow
[ ] ambient depth
[ ] clipping

IMAGES
[ ] crop
[ ] position
[ ] dimensions
[ ] radius

CONTROLS
[ ] buttons
[ ] inputs
[ ] icons
[ ] states

RESPONSIVE
[ ] desktop
[ ] mobile
```

If a conspicuous mismatch remains, the task is not done.

---

# 17. Severity model for mismatches

Classify differences.

## Critical
Must fix before completion.

Examples:

- wrong layout;
- missing section;
- different component structure;
- wrong hero composition;
- major image mismatch;
- mobile broken;
- text changed unexpectedly.

## Major
Must normally fix before completion.

Examples:

- wrong card proportions;
- noticeably wrong typography;
- missing glow;
- excessive shadow;
- incorrect spacing;
- visibly different colors.

## Minor
May remain when rendering limitations make them impractical.

Examples:

- tiny antialiasing differences;
- 1–2 px font rasterization differences;
- slight browser-native rendering differences.

Do not complete while Critical or obvious Major mismatches remain.

---

# 18. Iteration strategy

Each iteration should focus on the largest visible discrepancy.

Example:

```text
Iteration 1:
Hero too tall → fix section height.

Iteration 2:
Image too small → fix column ratio and image size.

Iteration 3:
Heading wraps incorrectly → fix width/font metrics.

Iteration 4:
Card looks flat → tune surface + shadow.

Iteration 5:
Neon looks like purple border → tune ambient glow.

Iteration 6:
Mobile overflow → adjust breakpoint.
```

Avoid making 40 unrelated changes at once without inspecting them.

Small controlled iterations produce better visual convergence.

---

# 19. Use screenshots as evidence, not decoration

If automation allows screenshots, use them to judge progress.

A screenshot is not merely proof that the page loaded.

Inspect it for:

- hierarchy;
- balance;
- density;
- negative space;
- alignment;
- visual weight;
- consistency with the supplied reference.

---

# 20. Existing tests must remain green

After visual parity is reached, run the project's relevant validation.

For Angular:

```bash
npm run build
npm test
```

and any project-specific checks already present.

If a visual change breaks logic, fix the regression without discarding the visual goal.

---

# 21. Never over-refactor during a visual task

Do not rewrite architecture just because the CSS is imperfect.

Prefer the smallest maintainable implementation that achieves the reference.

Allowed when useful:

- extracting reusable visual tokens;
- CSS variables;
- utility classes;
- shared card classes;
- separating glow shell/content surface;
- responsive layout cleanup.

Avoid unrelated refactors.

---

# 22. Final completion gate

Before responding that the task is complete, answer all of these internally:

```text
Did I inspect the actual rendered page after the LAST code change?
Did I compare it directly with the reference?
Are there any obvious structural differences left?
Are there any obvious spacing differences left?
Does the typography feel equivalent?
Does the lighting/shadow/glow actually appear in the screenshot?
Are nested cards respecting hierarchy?
Did I inspect mobile?
Did I preserve the user's text and functional behavior?
Did the build/tests pass?
```

If the answer to any important question is **no**, continue working.

---

# 23. Forbidden completion patterns

Do not terminate a reference-driven UI task with only:

```text
Implemented.
Build passes.
Tests pass.
```

Do not consider the task complete simply because:

- the CSS compiles;
- the classes exist;
- the correct token names were created;
- Playwright found the elements;
- no console errors appeared.

Visual tasks end after **visual validation**.

---

# 24. Final response format

When finished, report briefly:

```text
- What was visually corrected.
- Which viewports were inspected.
- Whether the reference was compared against the final render.
- Build/test result.
- Any small remaining unavoidable discrepancy, if one exists.
```

Do not claim perfection when there are visible differences.

---

# Golden rule

> **CODE IS NOT THE OUTPUT. THE RENDERED INTERFACE IS THE OUTPUT.**

For visual-reference tasks, keep iterating until the browser result is nearly the same as the reference.
