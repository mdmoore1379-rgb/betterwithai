# betterwithai Operations Agents

This is the multi-agent operations system for the betterwithai business.

## Philosophy

One central **Operations Leader** that receives natural language tasks from Michael and intelligently delegates to specialist agents.

This allows scaling operations without hiring a bunch of people early on.

## Current Specialists

- **CodingAgent** — Website changes, new features, technical work (hands off to Grok for actual implementation + commits)
- **CalendarAgent** — Scheduling calls, time blocking
- **AccountingAgent** — Stripe, invoicing, retainers, pricing
- **ClientAgent** — Onboarding, proposals, relationship tracking
- **ProposalAgent** — Customized proposals and SOWs
- **OnboardingAgent** — Post-sale welcome, intake, kickoff prep
- **GrowthAgent** — Lead gen, content, partnerships for $100M scale
- **RecruitingAgent** — Talent pipeline and hiring at scale

## How to use

```bash
cd betterwithai
python agents/run_ops.py
```

Then talk to it naturally:

```
Update the hero to emphasize the self-serve AI Roadmap
Book a discovery call with the CEO of Northstar Dermatology for next week
Create a payment link for the $2497 Roadmap
```

## Future Expansion

We can easily add more agents:
- DeliveryScaleAgent (project pods at scale)
- FinanceScaleAgent (forecasting, unit economics at $100M)
- ProductAgent (building the platform/tools)
- ResearchAgent (AI trends, competitive intel)
- MarketingAgent (paid + advanced content)

## Integration with Grok

When the CodingAgent or other agents need real changes made to code, infrastructure, or deployments, they generate a clear spec. 

You then tell me (Grok) the request, and I handle the code changes + GitHub commits + deployment.

This is the "chat with me, I take care of everything" loop.

## Hosting / Deployment Goal

The vision is:
- GitHub as source of truth
- Vercel (or Cloudflare) for auto deploys on push
- I use the available tools (push_files, deploy) to handle all updates from our conversations
```

## Next

- Connect real APIs (Google Calendar, Stripe, email)
- Add memory / client CRM (Supabase or simple JSON)
- Web interface for the leader
- Integration with the betterwithai.io site itself (client portal later)
