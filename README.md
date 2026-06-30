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

## Full-time business requirements (June 2026 update)

- **Legal foundation**: Terms of Service, Privacy Policy live on site. Professional MSA + SOW templates generated in `/contracts`.
- **Self-serve conversion**: Pricing section added with a productized AI Roadmap tier that can be purchased directly (Stripe placeholder ready). Goal is to minimize live sales calls for smaller engagements.
- **Payments & Agreements**: All work will require clear written agreements + online payment (Stripe Checkout preferred). Planning tier should be nearly frictionless.
- **Entity & Operations**: Form "Better With AI, LLC", set up business Stripe account, professional liability insurance recommended. Use the generated contracts as starting point (have an attorney review).

Replace the Stripe test links with real product links once created in the Stripe dashboard.

## Talk to me — I handle the rest

This is the core workflow you asked for:

1. You message me in natural language.
2. I make changes locally.
3. I commit + push to GitHub using the tools.
4. Hosting auto-deploys (Vercel or Cloudflare).

Once the GitHub repo is connected, I can do almost everything end-to-end.

## Operations Leader + Multi-Agent System

I've started building the agent team you described.

See `agents/` folder:

- `ops_leader.py` — The central brain
- Specialist agents for **Coding**, **Calendar**, **Accounting**, **Client management**
- `python agents/run_ops.py` to talk to the leader

The CodingAgent is designed to hand detailed specs to me (Grok) so I can implement + deploy.

We'll keep expanding this into a full autonomous operations team (proposals, onboarding, billing, research, etc.).

Run `python agents/run_ops.py` and try giving it tasks.
