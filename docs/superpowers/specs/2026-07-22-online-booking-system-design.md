# Online Booking System — Design

**Date:** 2026-07-22
**Status:** Approved for planning

## 1. Problem & Context

Alien Prose Studios (Abuja) currently drives all rentals and studio sessions through a "Rent Now" button that links out to a static Google Form (see [Spaces.jsx](../../../src/app/components/Spaces.jsx)). There is no real-time availability, no online payment, and no structured record of bookings — everything after form submission is manual.

This project replaces that with an in-app booking system covering three bookable things: **studio spaces**, **studio sessions** (time in a space), and **equipment/gear rental** — combinable into a single checkout.

The marketing site currently runs on Next.js 16 (App Router) with Contentful as the CMS for content (slides, page sections, images). That content layer is untouched by this project.

## 2. Goals

- Clients can browse spaces/equipment, see real availability, and book online without creating an account.
- A single cart can mix spaces, session time, and equipment across different time ranges, checked out together.
- Payment happens online via Paystack at time of booking.
- Staff review and approve/reject every paid booking before it's final, with automatic refund on rejection.
- Staff manage inventory (spaces, equipment, rates) and review bookings through an admin UI, without needing developer involvement.
- No double-booking: two clients can never successfully pay for the same slot.

## 3. Non-Goals (out of scope for v1)

- Self-service cancellation by clients (staff handle cancellations/refunds manually via the Paystack dashboard).
- Assigning specific staff/engineers to sessions (a session books studio time only).
- Client accounts or login.
- WhatsApp/SMS notifications (email only for v1).
- Discounts, coupons, or recurring bookings.
- Migrating existing Contentful content into the new system.

## 4. Architecture

Two systems, cleanly split by responsibility:

- **Contentful (unchanged)** — hero slides, page sections, marketing copy/images. Nothing here changes.
- **Payload CMS + Neon Postgres (new)** — booking-related data only: Spaces, Equipment, Bookings, and Staff Users. Payload 3 mounts directly into this Next.js app at `/admin`, so it's one deploy, one repo, no separate service to host or auth against.

New application pieces:

- A `/book` flow (browse → cart → checkout) implemented with Next.js route handlers for cart/checkout/availability logic.
- **Paystack** integration for payment (hosted checkout redirect + webhook for confirmation + refund API on rejection).
- **Resend** for transactional email (booking received, confirmed, rejected), using simple React Email templates.
- A guest booking-status page at `/bookings/[token]` so clients can check status without an account.

### Why split Contentful and Payload

Contentful already holds working marketing content and staff are used to it; there's no reason to touch it. Payload is scoped narrowly to the transactional data a CMS like Contentful isn't built for (availability, time-based holds, payment state), and its auto-generated admin UI removes the need to hand-build an admin dashboard.

## 5. Data Model (Payload collections)

**Spaces**
- `name`, `hourlyRate`, `capacity`
- `contentfulRef` (optional string ID linking back to the matching Contentful entry, so the booking UI can pull photos/description from Contentful without duplicating them)
- `active` (boolean — hide from booking without deleting)

**Equipment**
- `name`, `hourlyRate`, `quantity` (stock count), `contentfulRef`, `active`

**Bookings**
- `guestName`, `guestEmail`, `guestPhone`
- `items[]` — array of: `{ itemType: 'space' | 'equipment', item: relationship, startTime, endTime, computedPrice }`
- `status`: `pending_payment` → `pending_approval` → `confirmed` | `rejected` | `rejected_refund_failed`
- `paystackReference`, `totalAmount`
- `accessToken` (random string, used in the guest status-page URL)
- `holdExpiresAt` (only meaningful while `pending_payment`)

**Staff Users** — Payload's built-in auth collection. One shared account for v1; supports adding more later without a schema change.

### Note on "sessions"

A studio session is not a separate item type — it's modeled as a `Space` booking for a specific time range (§Goals: "studio time only," no staff/engineer assignment). The `itemType` enum only needs `space` and `equipment`.

### Why item-level time ranges

The unified-cart requirement means one booking can combine a space and multiple equipment items across different time ranges (e.g. studio 2–5pm + a mic rented for 3 days). Each `items[]` entry carries its own `startTime`/`endTime` and price rather than the booking having one shared time range.

## 6. Booking, Payment & Approval Flow

1. **Browse & cart** — client picks spaces/equipment, date, and start/end time per item. Adding to cart runs an availability check (§7) so unavailable slots can't be added.
2. **Checkout** — guest enters name, email, phone. On submit, the server re-validates availability for every cart item (race protection) and creates a `Booking` with status `pending_payment`, holding a **15-minute soft lock** (`holdExpiresAt`) on those slots.
3. **Payment** — client is redirected to Paystack's hosted checkout for the total.
4. **Webhook** — Paystack calls our webhook on successful payment; we verify the signature, set status to `pending_approval`, store `paystackReference`. If the client abandons payment, the hold simply expires at `holdExpiresAt` and the slots free up — checked lazily on the next availability query, no cron job needed for v1.
5. **Staff review** — staff see `pending_approval` bookings in the Payload admin and set status to `confirmed` or `rejected`.
   - `confirmed` → a Payload `afterChange` hook sends the confirmation email.
   - `rejected` → the same hook calls the Paystack refund API, then sends a rejection email noting the refund. If the refund call fails, status becomes `rejected_refund_failed` instead, so staff see it needs manual follow-up in the Paystack dashboard rather than silently failing.
6. **Guest status page** (`/bookings/[token]`) — linked from every email, lets the client check current status without logging in.

## 7. Availability & Concurrency

A slot is **busy** for a given space/equipment item if any booking overlapping that time range has status `pending_approval`, `confirmed`, or `pending_payment` with `holdExpiresAt` still in the future. `rejected`, `rejected_refund_failed`, and expired `pending_payment` bookings never block.

This check runs in two places:
- When rendering available slots in the browse UI (best-effort, for display).
- Server-side, again, at checkout submission — authoritative. If two clients race for the same slot, the second to submit gets an "already taken" error before ever reaching Paystack, preventing a duplicate charge.

## 8. Error Handling

- **Payment failure/abandonment** — booking stays `pending_payment`, expires via `holdExpiresAt`, nothing charged, no email sent.
- **Refund failure** — booking flagged `rejected_refund_failed` for manual staff follow-up rather than failing silently.
- **Checkout race** — handled by the authoritative server-side re-check in step 2 of §6.
- **Duplicate submission** — checkout is idempotent per booking hold; resubmitting the same pending booking does not create a duplicate charge or duplicate booking record.

## 9. Testing

- Unit tests for the availability/overlap logic — the highest-risk area (slot-boundary edge cases, overlapping ranges, expired-hold handling).
- Integration test for the full happy path: cart → checkout → mocked Paystack webhook → status transitions → email hook firing.
- Manual pass against Paystack test mode for the real checkout redirect before launch.

## 10. Open Implementation Details (decided by default, flagged for visibility)

- Email provider: **Resend** with React Email templates — simple API, fits the Next.js stack. Can be swapped if preferred.
- Payment gateway: **Paystack** (confirmed).
- Database: **Neon Postgres**, accessed through Payload's Postgres adapter (confirmed).
