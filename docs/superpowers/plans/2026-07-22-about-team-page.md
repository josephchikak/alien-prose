# About/Team Page + Home Photo Swap Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Replace the team photo on the home page with a studio photo, and add a new `/about`
page that shows the team photo plus a short blurb, linked from the site navigation.

**Architecture:** This is a Next.js (App Router) marketing site with no test framework or
component library beyond Tailwind. There is no unit-test suite — verification is: (1) the
project builds/lints cleanly, and (2) the page is manually checked in a running dev server per
the project's own frontend-verification convention. Each task below ends with both checks.

**Tech Stack:** Next.js 16 (App Router, `next/image`, `next/link`), React 19, Tailwind CSS v4,
`font-outfit` (Google font already wired in `layout.js`).

## Global Constraints

- Visual style must match the existing site: black/white base, `#D00000` red accent, `#FFD700`
  gold primary (`bg-primary` utility already used elsewhere), `font-outfit`.
- No individual team member names, roles, or bios — none exist and none were requested.
- Do not touch the commented-out `frontPage2.jpg` reference in `src/app/page.js` (dead code,
  out of scope).
- Use `next/image` for all images (existing convention throughout the codebase).

---

### Task 1: Swap the home page photo

**Files:**
- Modify: `src/app/page.js:84-102` (the image + text block)

**Interfaces:**
- Produces: no exported interface — this is a leaf page component change.

- [ ] **Step 1: Change the image source and alt text**

In `src/app/page.js`, find this block (around line 84-93):

```jsx
      <div className="flex justify-start items-center flex-col xl:flex-row pt-2 sm:p-8 gap-8 w-[80vw] sm:border-b-[0.5px]  border-black ">
        <Image
          src="/assets/frontPage2.jpg"
          alt="street light photo"
          width={800}
          height={500}
          sizes=" (max-width: 640px) 100vw, (max-width: 768px) 80vw, (max-width: 1024px) 50vw, 40vw"
       
          className="object-cover"
        />
```

Replace the `Image` props so it reads:

```jsx
      <div className="flex justify-start items-center flex-col xl:flex-row pt-2 sm:p-8 gap-8 w-[80vw] sm:border-b-[0.5px]  border-black ">
        <Image
          src="/assets/console.jpg"
          alt="Alien Prose Studios production console"
          width={800}
          height={500}
          sizes=" (max-width: 640px) 100vw, (max-width: 768px) 80vw, (max-width: 1024px) 50vw, 40vw"
          className="object-cover"
        />
```

- [ ] **Step 2: Verify the asset path is correct**

Run: `ls -la /Users/JosephChikak/Developer/alien-prose/public/assets/console.jpg`
Expected: file exists (it does — confirmed during design research).

- [ ] **Step 3: Lint**

Run: `cd /Users/JosephChikak/Developer/alien-prose && npm run lint`
Expected: no new errors introduced by this change.

- [ ] **Step 4: Manual browser check**

Run: `cd /Users/JosephChikak/Developer/alien-prose && npm run dev`
Open `http://localhost:3000/` in a browser. Confirm the photo in the "Abuja creatives have the
talent..." section now shows the studio console image, not the team photo, and that the layout
is unchanged (image + text side-by-side on desktop, stacked on mobile).

- [ ] **Step 5: Commit**

```bash
git add src/app/page.js
git commit -m "Swap home page photo from team photo to studio console shot"
```

---

### Task 2: Create the `/about` page

**Files:**
- Create: `src/app/about/page.jsx`

**Interfaces:**
- Produces: default-exported React component at route `/about` (no props, no exported types —
  consumed only by Next.js routing).

- [ ] **Step 1: Write the page component**

Create `src/app/about/page.jsx`:

```jsx
import Image from "next/image";

export default function AboutPage() {
  return (
    <main className="w-screen min-h-screen flex flex-col items-center justify-start text-black font-outfit overflow-hidden">
      <section className="w-[90vw] sm:w-[80vw] min-h-[20vh] flex flex-col justify-start items-center p-8">
        <h1 className="text-5xl sm:text-8xl font-bold w-full text-center font-outfit">
          Our Team
        </h1>
      </section>

      <div className="flex justify-start items-center flex-col xl:flex-row pt-2 sm:p-8 gap-8 w-[80vw] sm:border-b-[0.5px] border-black">
        <Image
          src="/assets/frontPage2.jpg"
          alt="The Alien Prose Studios team"
          width={800}
          height={500}
          sizes="(max-width: 640px) 100vw, (max-width: 768px) 80vw, (max-width: 1024px) 50vw, 40vw"
          className="object-cover"
        />
        <div className="xl:w-[30vw] h-full flex flex-col gap-8 justify-center items-center">
          <p className="w-[80vw] pt-4 xl:w-[30vw] text-xl xl:text-4xl pb-8 font-light border-r-[0.5px] border-black px-5">
            We are the one stop shop for creativity in Abuja, producing
            top-notch audio-visual content for a diverse range of clients,
            while also empowering fellow content creators and creatives with
            access to equipment & studio spaces at a reasonable cost.
            <span className="font-black text-red-600"> This is the team behind it.</span>
          </p>
        </div>
      </div>
    </main>
  );
}
```

- [ ] **Step 2: Verify the asset path is correct**

Run: `ls -la /Users/JosephChikak/Developer/alien-prose/public/assets/frontPage2.jpg`
Expected: file exists (confirmed during design research).

- [ ] **Step 3: Lint**

Run: `cd /Users/JosephChikak/Developer/alien-prose && npm run lint`
Expected: no new errors.

- [ ] **Step 4: Manual browser check**

With `npm run dev` running, open `http://localhost:3000/about`. Confirm:
- The page renders with the "Our Team" heading
- The team photo displays
- The blurb text appears next to it, styled consistently with the home page's equivalent block
- Layout is responsive (image + text side-by-side on desktop, stacked on mobile)

- [ ] **Step 5: Commit**

```bash
git add src/app/about/page.jsx
git commit -m "Add /about page with team photo and studio blurb"
```

---

### Task 3: Wire "About" into navigation and footer

**Files:**
- Modify: `src/app/components/Navigation.jsx:33-46` (desktop menu)
- Modify: `src/app/components/Navigation.jsx:111-128` (mobile menu)
- Modify: `src/app/layout.js:73-88` (footer nav)

**Interfaces:**
- Consumes: `/about` route created in Task 2.
- Produces: no exported interface — these are leaf UI changes.

- [ ] **Step 1: Add the desktop nav link**

In `src/app/components/Navigation.jsx`, inside the desktop `<ul>` (around line 33-46), add a new
`<li>` before the closing `</ul>`:

```jsx
          <li className="cursor-pointer hover:bg-primary flex justify-center items-center  p-4 hover:text-black px-8">
            <Link href="/about">About</Link>
          </li>
```

So the full `<ul>` becomes:

```jsx
        <ul className="hidden md:flex gap-6 lg:gap-10 flex-row text-xs xl:text-sm justify-center items-center">
          <li className="cursor-pointer hover:bg-primary flex justify-center items-center  p-4 hover:text-black px-8">
            <Link href="/spaces">Rentals</Link>
          </li>
          <li className="cursor-pointer hover:bg-primary flex justify-center items-center   p-4 hover:text-black px-8">
            Creative Learning Academy
          </li>
          <li className="cursor-pointer hover:bg-primary flex justify-center items-center  p-4 hover:text-black px-8">
            <Link href="/alienProseLive">Alien Prose Live</Link>
          </li>
          <li className="cursor-pointer hover:bg-primary flex justify-center items-center  p-4 hover:text-black px-8">
            <Link href="/about">About</Link>
          </li>
        </ul>
```

- [ ] **Step 2: Add the mobile nav link**

In the same file, inside the mobile menu `<ul>` (around line 111-128), add a matching `<li>`
before the closing `</ul>`:

```jsx
        <ul className="flex flex-col p-6 space-y-4">
          <li className="cursor-pointer hover:bg-[#FFD700] hover:text-black p-4 rounded-xl transition-colors duration-200">
            <Link href="/spaces" onClick={closeMenu}>
              Production
            </Link>
          </li>
          <li className="cursor-pointer hover:bg-[#FFD700] hover:text-black p-4 rounded-xl transition-colors duration-200">
            <Link href="/spaces" onClick={closeMenu}>
              Rentals
            </Link>
          </li>
          <li className="cursor-pointer hover:bg-[#FFD700] hover:text-black p-4 rounded-xl transition-colors duration-200">
            <span onClick={closeMenu}>Creative Learning Academy</span>
          </li>
          <li className="cursor-pointer hover:bg-[#FFD700] hover:text-black p-4 rounded-xl transition-colors duration-200">
            <span onClick={closeMenu}>Alien Prose Live</span>
          </li>
          <li className="cursor-pointer hover:bg-[#FFD700] hover:text-black p-4 rounded-xl transition-colors duration-200">
            <Link href="/about" onClick={closeMenu}>
              About
            </Link>
          </li>
        </ul>
```

- [ ] **Step 3: Add the footer nav link**

In `src/app/layout.js`, inside the footer `<nav>`'s `<ul>` (around line 73-88), add a matching
`<li>` before the closing `</ul>`:

```jsx
            <nav className="h-full w-full flex text-primary items-center justify-start sm:justify-center">
              <ul className="flex flex-col p-6 space-y-4">
                <li className="cursor-pointer hover:bg-[#FFD700] hover:text-black p-4 rounded-xl transition-colors duration-200">
                  <Link href="/spaces">Production</Link>
                </li>
                <li className="cursor-pointer hover:bg-[#FFD700] hover:text-black p-4 rounded-xl transition-colors duration-200">
                  <Link href="/spaces">Rentals</Link>
                </li>
                <li className="cursor-pointer hover:bg-[#FFD700] hover:text-black p-4 rounded-xl transition-colors duration-200">
                  <span>Creative Learning Academy</span>
                </li>
                <li className="cursor-pointer hover:bg-[#FFD700] hover:text-black p-4 rounded-xl transition-colors duration-200">
                  <span>Alien Prose Live</span>
                </li>
                <li className="cursor-pointer hover:bg-[#FFD700] hover:text-black p-4 rounded-xl transition-colors duration-200">
                  <Link href="/about">About</Link>
                </li>
              </ul>
            </nav>
```

- [ ] **Step 4: Lint**

Run: `cd /Users/JosephChikak/Developer/alien-prose && npm run lint`
Expected: no new errors.

- [ ] **Step 5: Manual browser check**

With `npm run dev` running:
- On desktop width, confirm "About" appears in the top nav and clicking it navigates to `/about`.
- Shrink to mobile width, open the hamburger menu, confirm "About" appears and navigates
  correctly, and that the menu closes after clicking (via `closeMenu`).
- Scroll to the footer on any page, confirm "About" appears in the footer nav list and links to
  `/about`.

- [ ] **Step 6: Commit**

```bash
git add src/app/components/Navigation.jsx src/app/layout.js
git commit -m "Add About link to desktop, mobile, and footer navigation"
```

---

### Task 4: Full production build check

**Files:** none (verification-only task)

**Interfaces:** none.

- [ ] **Step 1: Run a full production build**

Run: `cd /Users/JosephChikak/Developer/alien-prose && npm run build`
Expected: build completes successfully, with `/about` listed as a generated route in the build
output.

- [ ] **Step 2: Final manual pass**

With `npm run dev` (or `npm run start` after the build), click through: home page → confirm
studio console photo shows, no team photo remains on `/`. Nav → About → confirm `/about` shows
the team photo and blurb. Footer → About → same.
