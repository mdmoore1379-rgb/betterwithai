"""
Growth Agent

Owns lead generation, content, partnerships, and marketing at scale.
Critical for hitting $100M — focuses on systems that compound (content flywheel, partnerships).
"""

from agents.base_agent import BaseAgent, Task, AgentResponse


class GrowthAgent(BaseAgent):
    name = "GrowthAgent"
    description = "Lead gen, content marketing, partnerships, demand generation for hyper-growth"

    def __init__(self):
        super().__init__()

    def can_handle(self, task: Task) -> float:
        text = task.description.lower()
        keywords = ["marketing", "content", "lead", "partnership", "growth", "campaign", "seo", "social", "webinar", "flywheel"]
        score = sum(0.25 for kw in keywords if kw in text)
        return min(score, 0.9)

    def execute(self, task: Task) -> AgentResponse:
        self.log(f"Growth task: {task.description}")

        plan = """
**Automated Marketing & Client Acquisition Plan (for $100M trajectory)**

Core Goal: 80%+ automated marketing that attracts **quality** clients (serious operators ready for $5k+ engagements, not tire-kickers). Funnel: Content/SEO/Partnerships → Qualify (Roadmap as filter) → Signup (self-serve) → Auto Contract + Pay (Stripe + agreements) → Onboard.

**Socials Vibe: Holderness Family Style (YouTube-first family adventures)**
- Raw, funny, relatable family travel vlogs mixed with "AI did the work while we were gone" moments.
- Parodies, sing-alongs about escaping the desk, spontaneous adventures, kids reacting to "the AI just closed another client."
- Key hook: "As simple as ordering my Tesla. Answer 4 questions on the site → one click to pay → my AI is live in the portal. The agents handle everything while we're traveling."
- Authentic: Show the real freedom (beach calls, mountain planning sessions, family chaos) while the website + agent system runs client acquisition, proposals, delivery.
- Platforms: YouTube (long-form vlogs + shorts), Instagram Reels/TikTok (quick wins + travel), LinkedIn (case studies with personality).
- Content pillars:
  - Family travel + "the system worked while we played"
  - Behind-the-scenes AI/agent magic (Tesla-simple, no desk required)
  - Client wins shown in fun ways
  - Honest "how we built freedom" stories
- Automation: GrowthAgent generates scripts, captions, thumbnail ideas, posting schedule. You film on the road. Grok helps edit/deploy to site or schedule.

**Automation Layers (agent-driven + tools):**
- **Content Engine**: Ops Leader triggers GrowthAgent weekly for LinkedIn, site blog posts (static MDX or simple), YouTube scripts in Holderness vibe. Brand voice locked in (bold, funny, no corporate fog). SEO for "AI consulting for [ICP]" + lifestyle keywords.
- **Lead Magnets**: Free "AI Audit Checklist" or "Roadmap Teaser" form (embed Tally.so on site). Auto-deliver PDF + book call link. Qualifies by asking revenue/pain points.
- **Email Sequences**: Automated nurture (Resend or ConvertKit). 5-email series: Welcome → Case study → "Why most AI fails" (qualify) → Roadmap offer → Testimonial.
- **Partnerships**: Outreach sequences to MSPs/consultants (warm from M3). Agent drafts, you approve, auto-followup.
- **Qualification**: Site copy + form filters for quality (e.g., "For businesses with $2M+ revenue struggling with AI hype").
- **Signup to Pay**: Roadmap = direct Stripe Checkout (one-click). Larger = form → auto-proposal (ProposalAgent) → Stripe link + MSA/SOW e-sign (HelloSign/PandaDoc integration).
- **Tracking & Optimization**: Google Analytics + simple CRM. GrowthAgent reviews conversion weekly, suggests A/B tests on site (Grok deploys).

**2027 Targets (automated)**:
- 70% of Roadmap leads from organic/content/partnerships.
- <10% sales calls needed for qualified buyers.
- CAC < $500 via automation.

Next actions for Grok / team:
- Embed lead form on site (Tally).
- Draft first email sequence (use playbook templates).
- Build content calendar.
- Set up Zapier/Make for form → email → CRM.
- Update site CTAs for "Qualify & Signup in <5 min".
- Generate sample YouTube scripts in the family travel + freedom vibe.
"""

        return AgentResponse(
            success=True,
            result=plan,
            notes="This agent designs the growth engine. Execution often involves Grok updating the site + content.",
            next_actions=["Build content calendar", "Outreach sequences", "A/B test site CTAs", "Track to Roadmap conversions"]
        )
