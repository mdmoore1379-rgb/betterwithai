"""
ContentMachineSuperAgent

The autonomous content + distribution engine that makes betterwithai.io famous and fills the top of the funnel with zero paid ads.

Core philosophy (inspired by Holderness family raw/fun + high-authority AI consulting):
- Show the lifestyle freedom AI creates (travel, family, real life)
- Ruthless value: "here's exactly what to do"
- Short-form virality (X threads, Reels, TikTok, YouTube shorts)
- Long-form authority (deep newsletters, Notion playbooks, the Roadmap as lead magnet)
- Every piece ends with a clear next step into the self-serve wizard

It generates, schedules, and measures. Then feeds winning angles back to Growth + Acquisition agents.

This is how we hit $100M with almost no ad spend.
"""

from agents.base_agent import BaseAgent, Task, AgentResponse
from datetime import datetime
from typing import List, Dict

class ContentMachineSuperAgent(BaseAgent):
    name = "ContentMachineSuperAgent"
    description = "Viral content engine: X/threads/Reels/YouTube + lead magnets that drive self-serve signups at scale"

    def can_handle(self, task: Task) -> float:
        t = task.description.lower()
        if any(k in t for k in ["content", "thread", "tweet", "x post", "reel", "youtube", "social", "copy", "hook", "viral", "lead magnet"]):
            return 0.92
        return 0.25

    def execute(self, task: Task) -> AgentResponse:
        self.log(f"Creating content for: {task.description}")

        if "thread" in task.description.lower() or "x " in task.description.lower():
            threads = self.generate_x_threads(3)
            return AgentResponse(
                success=True,
                result=threads,
                notes="Ready to post. Add your voice + images of real life.",
                next_actions=["Post top thread", "Turn winner into Reel + newsletter"]
            )

        if "lead magnet" in task.description.lower() or "roadmap" in task.description.lower():
            magnet = self.create_lead_magnet_plan()
            return AgentResponse(success=True, result=magnet)

        # Default production run
        return AgentResponse(
            success=True,
            result=self.daily_content_batch(),
            notes="Full daily batch generated. High signal, low noise, direct path to wizard."
        )

    def generate_x_threads(self, count: int = 3) -> List[Dict]:
        threads = []
        ideas = [
            "The exact 7 questions we ask every client in the first 90 minutes that completely change how they think about AI",
            "We replaced 3 full-time strategy consultants with one AI system + one founder. Here's the exact playbook (and what it cost).",
            "Most AI projects fail for one stupid reason. It's not the tech. (Real examples from our last 9 clients)",
            "How we help families buy back 15-20 hours/week using AI (and still have the kids think dad is magic)"
        ]
        for i, idea in enumerate(ideas[:count]):
            threads.append({
                "title": idea[:70],
                "hook": f"🧵 {idea}",
                "structure": [
                    "Problem / painful story (lifestyle or business)",
                    "The counter-intuitive truth",
                    "Exact framework or 3-5 steps (tactical)",
                    "Real result or screenshot or quote",
                    "CTA: 'Want me to run this exact exercise for your business? Start the free configurator → betterwithai.io'"
                ],
                "cta": "Start the configurator at betterwithai.io (self-serve, no call required)"
            })
        return threads

    def daily_content_batch(self) -> Dict[str, Any]:
        return {
            "X_threads": 2,
            "shorts_reels": 1,
            "newsletter_section": "One brutal truth + one actionable move + one link to the wizard",
            "lead_magnet_tease": "New free AI Freedom Score calculator dropping this week (feeds the paid Roadmap)",
            "repurpose": "Winner thread → carousel on LinkedIn + 60s Reel with face + text overlay",
            "measurement": "Track wizard starts from each post. Kill anything under 2% CTR to configurator."
        }

    def create_lead_magnet_plan(self) -> Dict[str, Any]:
        return {
            "primary": "The 15-Minute AI Freedom Audit (Notion template + scoring)",
            "why_it_works": "Gives instant value + creates gap that only the $1497 Roadmap can close. Perfect for cold traffic from X/lifestyle content.",
            "delivery": "Typeform or Tally → email (Resend) → Notion + link to 'ready for the full thing? Start configurator'",
            "next": "Build the actual form + Notion template this week via CodingAgent"
        }
