# Alwin Antony Babu — Portfolio

This is your Lovable-generated portfolio, reassembled from the full code export
and verified to install and build cleanly (client, SSR, and the Nitro server
bundle all pass).

**Stack:** TanStack Start (SSR) + Tailwind CSS v4 + Framer Motion + Lucide icons.
This is **not** a plain Vite React app — there's no `index.html`, `tailwind.config.js`,
or `postcss.config.js`. Tailwind v4 is wired up via `@import "tailwindcss"` inside
`src/styles.css`, and TanStack Start handles routing + SSR.

## Important: you do NOT need the 48 shadcn/ui components

Lovable's template scaffolds 48 shadcn/ui files by default, but **nothing in this
project actually imports any of them** (verified by searching the whole codebase).
So they were left out entirely — one less thing to install, and a much lighter
`node_modules`. If you add a new feature later that wants a shadcn component
(e.g. a `<Dialog>` or `<Select>`), you can add just that one with:

```bash
npx shadcn@latest add dialog
```

(swap `dialog` for whatever component you need — this pulls from the public
shadcn registry using the `components.json` already in this project).

## 1. Prerequisites

- **Node.js** v18+ — https://nodejs.org
- **VS Code** — https://code.visualstudio.com

```bash
node -v
npm -v
```

You do **not** need `bun` — `npm` works fine and is what this was verified with.
(If you do have bun installed, `bun install && bun dev` works too.)

## 2. Open in VS Code and run

1. Unzip the project folder.
2. VS Code → **File → Open Folder** → select `alwin-portfolio`.
3. Open the terminal: **Terminal → New Terminal**.

```bash
npm install
npm run dev
```

Open the printed local URL (typically `http://localhost:3000` or similar).

`src/routeTree.gen.ts` is **not** included — it's auto-generated the moment you
run `npm run dev` or `npm run build`, as long as `src/routes/__root.tsx` and
`src/routes/index.tsx` exist (they do). Don't create or edit that file by hand.

## 3. Project structure

```
alwin-portfolio/
├── package.json, tsconfig.json, vite.config.ts, eslint.config.js
├── components.json          # shadcn config, in case you add a component later
├── src/
│   ├── router.tsx              # TanStack Router setup
│   ├── server.ts                # SSR entry + error handling wrapper
│   ├── start.ts                  # TanStack Start middleware
│   ├── styles.css                 # Tailwind v4 + full design tokens (oklch colors)
│   ├── routes/
│   │   ├── __root.tsx               # App shell: <html>, <head>, meta tags, error/404 pages
│   │   └── index.tsx                 # Renders the Portfolio component at "/"
│   ├── components/portfolio/
│   │   └── Portfolio.tsx             # The entire site — hero, about, experience,
│   │                                   projects, skills, certs, education, contact
│   ├── lib/
│   │   ├── utils.ts                  # cn() className helper
│   │   ├── error-capture.ts          # SSR error capture helper
│   │   ├── error-page.ts             # Fallback error HTML
│   │   └── lovable-error-reporting.ts
│   └── hooks/
│       └── use-mobile.tsx            # Mobile breakpoint hook (currently unused by Portfolio.tsx)
```

## 4. Edit your content

Everything — experience, projects, skills, certifications, education, contact
info — lives as arrays/constants at the top of **`src/components/portfolio/Portfolio.tsx`**
(`EXPERIENCES`, `PROJECTS`, `SKILLS`, `CERTS`, `EDUCATION`). Edit those directly;
the JSX below just maps over them.

Your CV/resume: the navbar's "Download CV" button currently has no `href` for
a file — wire it to a real hosted PDF or Drive link.

## 5. Contact form

The form in `Portfolio.tsx` (`ContactForm` component) currently only shows a
"Message sent ✓" state in the browser — it doesn't actually deliver anywhere.
Wire it up with Formspree, EmailJS, or your own backend when you're ready.

## 6. Favicon

`public/` is currently empty (Lovable's original `favicon.ico` was a binary
file that couldn't be transferred through chat). Drop your own `favicon.ico`
into `public/` — it's already linked from `src/routes/__root.tsx`.

## 7. Build & deploy

```bash
npm run build      # outputs to .output/ (client + SSR + Nitro server bundle)
npm run preview    # preview the production build locally
```

This project's Nitro config defaults to a **Cloudflare** deployment target
(see the build output mentioning `cloudflare-module`). If you want to deploy
elsewhere (Vercel, Node server, etc.), you'll need to adjust the Nitro preset
in `vite.config.ts` — ask if you want help with that for a specific host.

## 8. Verified

This exact file set was installed (`npm install`) and built (`npm run build`)
successfully before being handed to you — client bundle, SSR bundle, and the
Nitro server bundle all compiled without errors.
