# Self-Serve Product Specification (Wizard -> Stripe -> Portal)

**Core Flow (Tesla-Simple):**
1. Landing/Hero: Emotional hook ("Buy back your time") + "Start the configurator".
2. Wizard (PlanningWizard.tsx): 4 steps max.
   - Industry/business area (text).
   - Size/revenue.
   - Biggest pain (multi).
   - Timeline.
   - Generates personalized plan preview.
3. Post-Plan: Email capture + "Complete purchase $1,497" (Stripe).
4. Checkout: Stripe (test/prod via /api/checkout). Prefill email. Success -> portal.
5. Portal (SSO Google/Microsoft): Projects, invoices, contracts, progress, agents interaction.

**Offers (from offers.ts + RevenueEngine):**
- AI Roadmap: $1,497 one-time. Full audit + prioritized 90-day plan + guarantee (3 moves or refund).
- AI Projects/Sprint: From $7,500.
- Retainer: $12,500/mo.

**Technical:**
- Next.js 16 App Router (no static export for auth).
- Vercel hosting.
- Stripe: Checkout sessions, webhooks for onboarding trigger.
- Auth: Supabase or similar for Google/Microsoft SSO.
- Data: Portal shows personalized from wizard answers + payment.
- Metadata: https://betterwithai.io

**Guarantee & Onboarding (48h critical):**
- Instant access post-purchase.
- Generated plan + checklist.
- Automated emails (launch_sequence.md).
- Portal tasks for first win.
- LaunchOperator owns this.

**Wizard Improvements (autonomous):**
- Tie plan gen to Revenue model.
- A/B pricing copy.
- Lead magnet integration (free audit path).

**Portal Features (current + future):**
- Tabs: Projects, Invoices, Contracts.
- Progress tracking.
- Agent chat stubs.
- SSO ready.

Update app/page.tsx, PlanningWizard, offers.ts, /portal, /api/checkout as needed. High contrast UI always.