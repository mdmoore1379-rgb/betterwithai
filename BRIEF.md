# betterwithai.io — Build Brief for Grok

**Owner:** Michael Moore (CEO, M3 Networks) — mmoore@m3networks.com
**Goal:** Rebuild the AI-consulting marketing site `betterwithai.io` as a **custom-coded, bold, funny, mascot-driven** site that Grok can edit locally and deploy directly to **Cloudflare** from the terminal.

**Current state:** The site is already a **static site hosted on Cloudflare** (Cloudflare Pages). This is a rebuild/replacement of the existing static site in the same Cloudflare hosting — NOT a migration off another platform. First, inspect the existing Cloudflare project and any existing repo/source so you redeploy to the same project and domain in place.

This document is self-contained. It contains everything you (Grok) need: the positioning, the brand voice, the full page copy, the tech stack, the mascot direction, and the exact deploy steps. Build the site, redeploy to the existing Cloudflare project, and make terminal-driven updates the normal workflow.

---

## 1. The business in one paragraph

betterwithai is an **AI consulting practice**. The core insight: *everyone is hearing about AI and has no idea what to actually do with it.* betterwithai is the **bridge from "overwhelmed by AI hype" → "here's exactly what to do, built and handled."** Michael is the visionary/face of the company; a delivery team plans and executes the work (the "wedding planner" model — see below). The offer is structured as a ladder of three solutions: **AI Planning → AI Projects → AI Consulting.**

---

## 2. Positioning & core messages (use these everywhere)

- **The gap (the hook):** "Everyone's talking about AI. Nobody tells you what to *do* with it."
- **The promise (the bridge):** We look at *your* business and say: here's where AI fits, here's what to build first, here's what it's worth — then we build it.
- **The belief (the manifesto):** AI is the ultimate business superpower for **making better choices** — hitting your goals with **less time, less money, less energy, and way more focus.**
- **The reality (objection handler):** Clients say "just tell me the solution." But you can't plan a wedding without the bride, the date, the budget, and a hundred choices. AI is the same — the right solution depends on inputs only you can give. That's why we start with **Planning.**
- **The structure (the team):** Led by Michael's vision; delivered by a real team that plans and executes every detail. "You bring the vision. We plan and deliver the whole thing."

---

## 3. Brand voice & tone (CRITICAL — this is the whole differentiator)

**Inspiration:** Liquid Death's irreverence + Dr. Squatch's bold humor + ADHD-meme relatability — pointed at the chaos of AI hype. Think: the brand that makes a scary, overwhelming topic feel safe and fun.

**The governing principle:**
> **We take the work dead seriously. We just don't take *ourselves* seriously.**
> AI is heavy and overwhelming; humor lowers the wall so people can actually learn. The jokes make the topic approachable — they are not decoration.

**Tone dial:**
| Crank it up 🔊 | Keep it sacred 🤫 |
|---|---|
| Roast the hype, the jargon, the 50-tool overwhelm | The client's RESULTS — always real, always serious |
| Self-aware, a little swagger, ADHD-brain relatable | The client's MONEY — never a punchline |
| Short punchy lines; ONE feeling per screen | The client's INTELLIGENCE — mock the topic, never the customer |

**Do:**
- "You don't need 50 tools and a prompt course. You need one team that says: here's what to do."
- "AI is loud. We make it make sense."
- Short lines. Big confidence. Plain English.

**Don't:**
- Corporate fog ("leverage synergistic AI-driven solutions to optimize…").
- Crude or mean. Bold, not gross. Funny, not at the customer's expense.

**ADHD design rule (applies to layout, not just copy):** One clear idea and one obvious action per screen/section. Generous spacing. Big readable type. Never a wall of text or a multi-choice maze. Michael and most of the audience are ADHD — overwhelm is the enemy, clarity converts.

---

## 4. The mascot — "the AI Brain"

A simple animated cartoon **brain character** (same energy as ADHD-meme cartoons) that embodies the customer's transformation:

- **Before betterwithai:** sweaty, wide-eyed, frazzled — doomscrolling AI tips at 3am, overwhelmed. 🤯
- **After betterwithai:** the same brain, relaxed, sunglasses on, calm and focused. 😎🎯

Use it as a **recurring character** through the site and (later) social. It should appear in the hero (frazzled → calming down on scroll/interaction) and reappear at the closing CTA (fully chill).

**Implementation:** Final art should be a real illustrated character (commission an illustrator or generate with an image tool, then refine). For the first build, implement an **animated placeholder**: an SVG/emoji-based brain with Framer Motion (subtle shake/sweat when "frazzled," settling into a calm bob with sunglasses when "handled"). Make the component swappable so real art can drop in later. Respect `prefers-reduced-motion`.

---

## 5. Visual direction

- **Energy:** bold, high-contrast, playful, confident. Closer to a DTC brand (Liquid Death/Squatch) than a corporate consultancy. But still trustworthy enough to sell a $5k–$10k engagement.
- **Palette suggestion (adjust to taste):** near-black background (`#0B0B0F`), crisp white text, one electric accent — acid/electric green (`#C6FF3A` or similar) for CTAs and highlights, plus a secondary pop color. High contrast, lots of negative space.
- **Type:** big chunky display sans for headlines (e.g., Clash Display, Satoshi, or similar), clean readable sans for body (e.g., Inter). Headlines are large and punchy.
- **Buttons/CTAs:** big, obvious, slightly playful. Primary CTA text: "Book a Discovery Call →".
- **Motion:** tasteful Framer Motion — scroll reveals, the mascot animation, hover micro-interactions. Don't overdo it; one delightful moment per section.

---

## 6. Site structure & FULL COPY (single landing page, in this order)

> Implement as a single long-scroll landing page with anchor nav. Copy below is ready to use; tighten as needed but keep the voice.

### Nav (sticky)
- Left: **betterwithai** wordmark (lowercase, with the brain mascot icon).
- Links: **Solutions · How it works · About · FAQ**
- Right: button **Book a Discovery Call →**

### Section 1 — Hero
- **Eyebrow:** AI consulting for people who are over the hype.
- **Headline:** Everyone's talking about AI. Nobody tells you what to *do* with it.
- **Subhead:** You don't need 50 tools, a prompt course, or another 3am doom-scroll through AI Twitter. You need one team to look at your business and go: *"Here's what to do. We'll build it. Done."*
- **Primary CTA:** Book a Discovery Call → *(subtext: free, and refreshingly hype-free)*
- **Secondary CTA:** See how we bridge the gap ↓
- **Visual:** the frazzled AI Brain mascot (calms down as you scroll/hover).

### Section 2 — The belief (manifesto)
- **Heading:** AI is the ultimate business superpower.
- **Body:** Running a business is really just one thing — making choices. The best businesses just make better choices, faster. That's what AI unlocks: the superpower to hit your goals with —
- **Four pillars (icon + label):**
  - ⏱️ **Less time** — hours of work done in minutes
  - 💸 **Less money** — leverage that used to cost a whole team
  - 🔋 **Less energy** — the busywork handled, so you're not running on empty
  - 🎯 **Way more focus** — your attention on the few things that actually matter
- **Kicker:** We're not here to sell you "AI." We're here to hand you that superpower — aimed exactly where it moves *your* business forward.

### Section 3 — The bridge (3 solutions)
- **Heading:** Three ways we take you from overwhelmed → handled.
- **Intro line:** Wherever you are, there's a step across the bridge.
- **Three cards:**

  **1. AI Planning — "Just tell me what to do."**
  For businesses that know AI matters but have no idea where to start. We audit your operations, marketing, and tools, then hand you a **prioritized roadmap** of the highest-ROI AI opportunities — ranked by effort vs. payoff. You get a clear plan you can run with us or on your own.
  *CTA: Get your AI roadmap →*

  **2. AI Projects — "Now build it for me."**
  For businesses ready to implement. Done-for-you builds: AI-powered lead funnels, workflow & ops automation, custom internal tools, chatbots & agents, and integrations. We build it, make it work, and hand it off — a real system that saves hours or books more clients.
  *CTA: Scope a project →*

  **3. AI Consulting — "Keep me ahead."**
  For businesses that want a partner as AI keeps evolving. Monthly advisory, hands-on optimization, and team training — a guide who keeps you ahead instead of scrambling to catch up. A toolset that compounds in value every month.
  *CTA: Become a partner →*

### Section 4 — "Just tell me the solution" (the wedding truth)
- **Heading:** "Just tell me the solution."
- **Body:** We hear it all the time — and we get it. You want the answer, not homework. But here's the truth: **nobody can plan a wedding without the bride, the date, the budget, and a hundred small choices.** Hand a planner none of that and you don't get a wedding — you get a guess. AI is exactly the same.
- **Mapping (two-column table):**
  | The wedding needs… | …your AI plan needs |
  |---|---|
  | 🤵👰 The couple | Your business, your goals, what success actually looks like |
  | 📅 The date | Your timeline — what's urgent vs. what can wait |
  | 💰 The budget | What you're ready to invest, so we right-size the solution |
  | ✅ The choices | The calls only you can make — priorities, tools, brand voice, trade-offs |
- **Close:** That's exactly what **AI Planning** is for. We do the heavy lifting — but we ask the right questions first, so what we build fits *your* business instead of a generic template. No wasted spend, no guessing, no "AI for the sake of AI."

### Section 5 — How we work (process)
- **Heading:** How it works (no homework, we promise).
- **4 steps:**
  1. **Discovery call** — a free, hype-free conversation about your business and where you're stuck.
  2. **The plan** — we map the highest-impact AI opportunities and what each is worth.
  3. **We build** — our team plans and delivers every detail. You set direction; we handle the rest.
  4. **We keep you ahead** — optimize, train, and evolve as AI does.

### Section 6 — Who we are (led by vision, delivered by a team)
- **Heading:** Led by vision. Delivered by a team.
- **Body:** Most AI "experts" are one person juggling a dozen clients. We work differently. **Michael Moore** leads betterwithai as the visionary — the one who sits with you, understands your business, and maps where AI actually moves the needle. That's the relationship you keep. Behind that vision is a **full delivery team** that plans and executes every detail — like a wedding planner and crew. You set the direction; we handle the invitations, the timeline, the coordination, the day-of execution. **You bring the vision. We plan and deliver the whole thing.**

### Section 7 — FAQ (objection handling)
- **Q: How much does this cost?** A: Planning starts small and productized; Projects are scoped to what you need; Consulting is a monthly partnership. We'll give you real numbers on the discovery call — no mystery, no pressure. *(Michael: confirm exact figures — see §9.)*
- **Q: Will this actually work for my business?** A: That's literally what the Planning step answers. If AI isn't worth it for you, we'll tell you — we'd rather lose a sale than sell you hype.
- **Q: Do I need to be technical?** A: No. That's the entire point. You bring the vision; we handle the tech.
- **Q: How long until I see results?** A: Planning is fast (days to a couple of weeks). Projects depend on scope, but we move quick and you'll know the timeline up front.
- **Q: Is this just ChatGPT stuff I could do myself?** A: You *could* — the same way you *could* plan your own wedding. Most people would rather hand it to a team that does it every day and gets it right.

### Section 8 — Closing CTA
- **Heading:** Stop guessing. Start using the superpower.
- **Subhead:** One free call. We'll tell you exactly where AI fits your business — no buzzwords, no homework.
- **Primary CTA:** Book a Discovery Call →
- **Visual:** the AI Brain mascot, fully chill (sunglasses, relaxed). 😎

### Footer
- Wordmark + tagline: "Serious about your results. Not serious about ourselves."
- Contact: **hello@betterwithai.io**
- Minimal links (Solutions, How it works, About, FAQ, Book a call). Copyright betterwithai.

---

## 7. Tech stack

- **Framework:** Next.js (App Router) with **static export** (`output: 'export'`) — produces a static site that deploys cleanly to Cloudflare Pages. (Alternatively Astro if you prefer, but Next + React makes the Framer Motion mascot easiest.)
- **Styling:** Tailwind CSS.
- **Animation:** Framer Motion (mascot + scroll reveals). Honor `prefers-reduced-motion`.
- **Fonts:** self-host or use next/font (Clash Display / Satoshi for display, Inter for body).
- **Structure:** component per section (`Hero`, `Manifesto`, `Solutions`, `WeddingTruth`, `Process`, `About`, `Faq`, `ClosingCta`, `Footer`), composed on one page. Keep the mascot a standalone swappable component.
- **Accessibility & SEO:** semantic HTML, alt text, meta tags + OpenGraph, fast load, mobile-first responsive.

---

## 8. Hosting & deploy — Cloudflare Pages (terminal-driven)

Goal: Grok edits locally and deploys to Cloudflare directly. Two viable flows — set up **both** if possible (Git for auto-deploy, Wrangler for instant manual pushes).

**Prerequisites Michael needs to provide:**
- Cloudflare account login (the `betterwithai.io` domain should be added as a zone in Cloudflare; if it's registered elsewhere, point its nameservers to Cloudflare).
- A **Cloudflare API token** with `Cloudflare Pages: Edit` permission (for Wrangler CLI deploys). Store as `CLOUDFLARE_API_TOKEN`; also note the **Account ID**.

**Setup steps:**
1. `npm create next-app` (or scaffold manually), build the site per this brief.
2. Set `output: 'export'` in `next.config.js`; build with `next build` → static output in `out/`.
3. Install Wrangler: `npm i -D wrangler`.
4. Use the **existing** Cloudflare Pages project for `betterwithai.io` (list with `npx wrangler pages project list`). Only create one if none exists: `npx wrangler pages project create betterwithai`.
5. Deploy from terminal: `npx wrangler pages deploy out --project-name=betterwithai`.
6. **Custom domain:** in Cloudflare dashboard → Pages → betterwithai project → Custom domains → add `betterwithai.io` and `www.betterwithai.io`. Cloudflare auto-issues SSL. (DNS is automatic if the zone is on Cloudflare.)
7. **Optional Git auto-deploy:** push the repo to GitHub, connect it in Cloudflare Pages (build command `next build`, output dir `out`). Then every `git push` redeploys automatically.

**Normal update workflow after setup:** edit code → `next build` → `npx wrangler pages deploy out` (or just `git push` if Git integration is on). That's the "make terminal updates, Grok does the rest locally and in the cloud" loop.

---

## 9. Decisions still open for Michael (don't block the build — use placeholders, flag clearly)

1. **Pricing/CTAs per tier.** Prior GHL offer was **$5,000 one-time setup + $5,000/mo retainer** for funnels — keep that as the flagship under **AI Projects** if still accurate. Decide entry price for **AI Planning** (recommend a low, productized "AI Roadmap" price to get people in the door) and the **AI Consulting** monthly retainer. Until confirmed, show "Book a call for pricing."
2. **Booking backend.** The site is static, so the "Book a Discovery Call" CTA should point at an external scheduler. Check how the current static site handles booking and reuse that link if it works; otherwise embed/link **Cal.com** (open-source, free) or **Calendly**. Until confirmed, wire the CTA to whatever booking link Michael provides.
3. **Mascot art.** Placeholder animated brain ships first; commission/generate real character art to swap in.
4. **Social proof.** Site currently has none. As soon as testimonials/case studies/results exist, add a proof section (recommended just under the hero or after Solutions) — it's the biggest trust gap for a high-ticket offer.

---

## 10. Definition of done (first release)

- Single responsive landing page, all sections in §6, in the brand voice of §3.
- Animated mascot component (placeholder OK), reduced-motion safe.
- Live on `betterwithai.io` via Cloudflare Pages with working SSL.
- Booking CTA wired to a real scheduling link.
- Terminal deploy workflow working (`wrangler pages deploy` and/or Git auto-deploy).
- Lighthouse: fast, accessible, mobile-friendly.
