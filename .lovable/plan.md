# Fix homepage phone image on smaller screens

## Problem
On tablet and phone widths (below 768px, like your screenshot), the phone photo is stretched to 140% and cropped to fill the background, so only the camera tops show and the phones look zoomed and cut off. Laptop widths are fine and stay unchanged.

## Fix
- Below 768px, stop using the phones as a cropped background behind the text.
- Show the full photo in its own band directly under "A quote first. Your decision next.", scaled to fit the width so all four phones are fully visible, with the soft light-grey hero background behind it.
- Keep a gentle fade at the edges so it blends with the hero, with no white box around it.
- Very small phones (under 360px) get the same treatment with a slightly shorter image.
- Desktop and laptop layout stays exactly as it is.

## Technical details
- In `src/index.css`, replace the `@media(max-width:767px) .home-hero ...` block (end of file): make `.hero-layout` a normal stacked grid, set `.hero-art` to `position:relative; inset:auto; width:100%`, and the image to `position:static; width:100%; height:auto; max-height:340px; object-fit:contain; object-position:center`.
- Remove the full-cover gradient overlay on mobile (keep a light bottom fade only).
- Also drop the conflicting `.hero-art > img { height:300px }` / `260px` overrides in the 767px and 359px blocks.
- Verify with Playwright screenshots at 320, 375, 430, 761 and 1280px widths.
