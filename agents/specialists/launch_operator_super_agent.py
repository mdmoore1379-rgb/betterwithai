"""
LaunchOperatorSuperAgent

Owns the full go-to-market launch of the self-serve AI Roadmap product and subsequent offers.

Key from research:
- Hybrid: self-serve entry + warm outbound + content for bigger deals.
- Fast pricing tests.
- Lead magnets + wizard as top of funnel.
- Personal brand + EGC for visibility.
- 48h onboarding as retention predictor.

Responsibilities:
- Plan and execute phased launches (soft launch, public, scale).
- Create launch assets: emails, landing updates, social calendar.
- Set up tracking for wizard starts, conversion, LTV.
- Coordinate with ContentMachine and AcquisitionFlywheel.
- Design the "first 48 hours" onboarding experience in portal.
"""

from agents.base_agent import BaseAgent, Task, AgentResponse
from datetime import datetime

class LaunchOperatorSuperAgent(BaseAgent):
    name = "LaunchOperatorSuperAgent"
    description = "Full launch and GTM for productized self-serve offers. Hybrid model: self-serve + content + warm outbound."

    def can_handle(self, task: Task) -> float:
        t = task.description.lower()
        if any(k in t for k in ["launch", "gtm", "go to market", "onboarding", "48 hour", "first 48", "soft launch", "public launch"]):
            return 0.9
        return 0.3

    def execute(self, task: Task) -> AgentResponse:
        self.log(f"Launch task: {task.description}")
        return AgentResponse(
            success=True,
            result=self.create_launch_plan(),
            notes="Phased launch plan ready. 48h onboarding is the #1 retention lever per research.",
            next_actions=[
                "Build the actual 48-hour onboarding flow in /portal",
                "Create first 7-day email sequence (use playbook/templates)",
                "Set up conversion tracking (wizard start -> purchase -> portal activity)"
            ]
        )

    def create_launch_plan(self):
        return {
            "phase_1_soft": "Internal + small list. $1497 Roadmap live. Collect 10-20 customers fast. Test pricing and wizard.",
            "phase_2_public": "ContentMachine blast + AcquisitionFlywheel. Announce on X + LinkedIn personal brands. Warm outbound to wizard abandoners.",
            "phase_3_scale": "Add Meta/Google ads on winning angles. Layer in light sales for $7k+ sprints. SEO/AEO push.",
            "onboarding_48h": {
                "hour_0": "Instant access to portal + generated plan PDF + welcome video from founder.",
                "hour_2": "AI-generated next actions checklist in portal.",
                "day_1": "Automated email: 'Your first win in 7 days' + template.",
                "day_2": "Check-in: 'Did you execute step 1? Reply or book 15min if stuck.' (but prefer self-serve)",
                "metrics": "48h activation rate (first action taken) >70% target."
            },
            "pricing_test": "Start at $1497. Test $997 vs $1997 via wizard variants in 2 weeks.",
            "tracking": "UTM on all content, Stripe + Supabase events for full funnel."
        }
