# Menu clean-up, sell-page photo upload, training page theming

## 1. Mobile menu
- Remove the "Explore DHT / Littleover, Derby" heading and subtitle (keep them hidden for screen readers only, as the menu needs an accessible title).
- Restyle the panel in DHT theme: DHT logo at the top, bold link list with blue hover/active state and arrow, "Sell your device" and "Find my repair" buttons at the bottom, plus the WhatsApp button.

## 2. Sell your device — photo upload
- Add a "Photos of your device (optional)" section to the sell form: drag-and-drop or tap to choose, up to 6 images (JPG/PNG/WebP/HEIC, max 10MB each), thumbnail previews with remove buttons.
- On submit, photos upload to a private storage area and are linked to the enquiry, so the shop can view them alongside the details.
- Customers cannot see or list anyone else's photos; they can only upload.

## 3. Training page theming
- Replace the all-white sections with the site's alternating look: light blue-grey tinted bands, a dark charcoal/blue band (like the homepage "how it works" section) for the course modules or process, white cards with borders sitting on tinted backgrounds.
- Remove the CSS overrides that currently force every training section to white.

## Technical details
- Header.tsx: SheetTitle/SheetDescription wrapped in `sr-only`; new `.menu-panel` styles using tokens.
- Storage: create private `enquiry-photos` bucket (10MB limit); RLS on storage.objects allowing anon/authenticated INSERT only into that bucket, no SELECT.
- Migration: add `photo_paths text[] default '{}'` to `enquiries` (max 6 enforced by check constraint).
- live-data.ts: `uploadEnquiryPhotos(files)` uploads to `sell/<uuid>/<n>.<ext>` and returns paths; `submitEnquiry` accepts `photo_paths`. Client-side type/size validation in customer-services.ts with a bun test.
- index.css: drop lines forcing `.training-page .section-pad` to `#fff`/`#f5f7fb`; use `--muted`/`--secondary` tokens and a `.process-band`-style dark section in Training.tsx.
