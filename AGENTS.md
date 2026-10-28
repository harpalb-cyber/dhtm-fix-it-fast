# Project rules
- Preserve React 18, Vite 5, React Router 6, Tailwind 3 and the connected repository; the customer redesign is an in-place update.
- Keep production service decisions in a typed launch configuration and distinct adapter functions; unavailable providers must resolve to honest contact fallbacks, never simulated records.
- Keep reference device taxonomy separate from approved services and use integer-pence quote logic; reference models are enquiry discovery, not promised service coverage.
- Store uploaded media as asset pointers and keep their provenance/licences; self-host the supplied font.
- Keep customer pages modular and shared navigation, page introductions and contact actions consistent.- Live prices/stock come from the owner's spreadsheet imported into the database (repair rows override the reference taxonomy; missing rows stay quote-only); the master sheet lives in the private `pricing` storage bucket. Why: owner edits one sheet and uploads it in chat.
- Customer enquiries are stored by browser inserts into an insert-only enquiries table via `src/lib/live-data.ts`; keep DB adapters out of `customer-services.ts` so bun tests run without env.
