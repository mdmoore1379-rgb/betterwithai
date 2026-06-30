# betterwithai.io

Bold, funny, mascot-driven AI consulting marketing site.

Built as a **static Next.js site** so it can be edited conversationally and deployed directly from the terminal / via Git.

## What this is

A single-page landing site matching the detailed build brief (see `CLAUDE.md` or the original handover doc).

- Custom cartoon AI Brain mascot (animated with Framer Motion)
- Strong brand voice: irreverent but serious about results
- Three clear offers: AI Planning → AI Projects → AI Consulting
- All CTAs point to the existing Calendly link

## Local development

```bash
npm install
npm run dev
```

Open http://localhost:3000

## Build (static)

```bash
npm run build
# output is in the `out/` folder
```

## Deploy workflow (the important part)

**Goal:** You talk to me (Grok). I edit locally. I push the changes to Git + trigger a deploy to the cloud host.

### Recommended setup (GitHub + Vercel)

1. Create a GitHub repo called `betterwithai` (public or private).
2. Connect it as a project on Vercel (import repo → framework Next.js → Build command `npm run build`, Output directory `out`).
3. Every push to `main` will auto-deploy.

Alternative (direct):
- `npx vercel` (first time) or use the Vercel integration tools here.

### Cloudflare Pages (as specified in brief)

```bash
# one-time
npm i -D wrangler

# after build
npx wrangler pages deploy out --project-name=betterwithai
```

Add custom domain `betterwithai.io` in the Cloudflare Pages dashboard.

## Project structure

- `app/page.tsx` — the full landing page
- `app/components/BrainMascot.tsx` — the animated mascot (swappable for real art later)
- Static export enabled (`output: 'export'`)

## Next steps / open items (from brief)

- Confirm exact pricing per tier (currently "Book a call for pricing")
- Real mascot illustration (placeholder animated SVG is ready to be replaced)
- Add social proof / testimonials when available
- Booking link confirmation (currently using existing Calendly)

## Talk to me

Just tell me what to change. I'll edit the code, commit, and push the update to the host. That's the whole point of this setup.
