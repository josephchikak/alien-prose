# About/Team Page + Home Photo Swap — Design

## Problem

The home page currently uses `frontPage2.jpg` (a photo of the Alien Prose team) as a generic
studio image in the "one stop shop for creativity" section. There's no dedicated place on the
site to showcase the team, and the home page image should instead show the studio/equipment.

## Changes

### 1. Home page image swap
In `src/app/page.js`, the live `<Image>` at line 86 (currently `src="/assets/frontPage2.jpg"`,
alt "street light photo") is replaced with `src="/assets/console.jpg"`, with an alt text
describing the studio console. The commented-out block above it referencing the same file is
left untouched (dead code, out of scope).

### 2. New `/about` page
New route: `src/app/about/page.jsx`, following the existing simple page pattern used by
`src/app/spaces/page.jsx` (a plain functional component, no extra abstraction needed since this
content isn't reused elsewhere).

Content, single column/section layout consistent with the home page's visual style
(font-outfit, black/white base, `#D00000` red accent, `#FFD700` gold primary):
- Hero-style heading (e.g. "Our Team")
- The team photo (`frontPage2.jpg`) via `next/image`, prominent placement
- A short blurb about Alien Prose Studios, adapted from existing brand copy already on the
  home page (the "one stop shop for creativity in Abuja..." line)
- No individual member names, roles, or bios — none exist yet, and none were requested

### 3. Navigation wiring
Add an "About" link to `/about` in three places:
- Desktop menu in `src/app/components/Navigation.jsx` (alongside Rentals, CLA, Alien Prose Live)
- Mobile menu in the same file
- Footer nav in `src/app/layout.js`

## Out of scope
- Individual team member bios/names (no data available)
- Redesigning the footer or nav beyond adding the one link
- Touching the commented-out/dead `frontPage2.jpg` reference in `page.js`
