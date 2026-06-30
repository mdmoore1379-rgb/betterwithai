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
**Growth Plan (for $100M trajectory)**

Priorities 2027:
- Weekly content engine (LinkedIn, blog, YouTube) using brand voice.
- Leverage M3 Networks network for warm intros.
- Productized Roadmap as lead magnet (already on site).
- First 5 strategic partnerships (MSPs, consultants).

Systems to build:
- Content calendar managed via agent.
- Partnership outreach sequences.
- Analytics on what converts to Roadmap sales.

Next actions for Grok / team:
- Create content calendar template.
- Build landing page variants for different ICPs.
- Set up tracking (Google Analytics + CRM).
"""

        return AgentResponse(
            success=True,
            result=plan,
            notes="This agent designs the growth engine. Execution often involves Grok updating the site + content.",
            next_actions=["Build content calendar", "Outreach sequences", "A/B test site CTAs", "Track to Roadmap conversions"]
        )
