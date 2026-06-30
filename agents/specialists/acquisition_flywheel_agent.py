"""
AcquisitionFlywheelAgent

The growth system that turns content + product into a self-reinforcing acquisition machine.

Core loops:
1. Content (ContentMachine) → attention → wizard starts
2. Wizard → purchase or strong lead magnet → email + retargeting
3. Happy client → case study + referral + public win → more content fuel
4. X + LinkedIn DM automation + community seeding (tasteful, high signal only)

Goal: 70%+ of new Roadmap customers come from organic + word of mouth by month 9.
This is how a tiny team (or solo founder + agents) hits 8 figures.
"""

from agents.base_agent import BaseAgent, Task, AgentResponse

class AcquisitionFlywheelAgent(BaseAgent):
    name = "AcquisitionFlywheelAgent"
    description = "Self-reinforcing acquisition loops: content → wizard → customer → proof → more content + referrals"

    def can_handle(self, task: Task) -> float:
        t = task.description.lower()
        if any(k in t for k in ["acquisition", "flywheel", "growth loop", "referral", "dm", "outreach", "viral loop", "customer acquisition"]):
            return 0.9
        return 0.2

    def execute(self, task: Task) -> AgentResponse:
        self.log(f"Flywheel task: {task.description}")

        return AgentResponse(
            success=True,
            result=self.design_flywheel(),
            notes="Implement the loops in code + content systems + portal sharing features.",
            next_actions=[
                "Add 'Share your roadmap win' button in portal that creates X-ready thread",
                "Build simple referral program (both get credit toward retainer)",
                "ContentMachine + this agent should run daily in background"
            ]
        )

    def design_flywheel(self) -> dict:
        return {
            "loop_1_content_to_wizard": "Every thread/Reel ends with direct link + emotional CTA to configurator. Track with UTM.",
            "loop_2_post_purchase_proof": "After successful Roadmap delivery, auto-generate shareable 'I just got my AI plan' graphic + suggested thread. Client posts → new eyes.",
            "loop_3_referral": "Give both referrer and referee $300 credit on any future work. Tracked in portal + Stripe.",
            "loop_4_community": "Private 'Better With AI Operators' group (Skool or Circle) for clients. They become your best marketers.",
            "metrics": {
                "wizard_start_to_paid": "target 14-18%",
                "organic_pct_of_new_customers": "target 65%+ by end of year 1"
            }
        }
