"""
Recruiting Agent

Handles talent pipeline, screening, and hiring at scale.
Essential for building the team without Michael spending all time recruiting.
"""

from agents.base_agent import BaseAgent, Task, AgentResponse


class RecruitingAgent(BaseAgent):
    name = "RecruitingAgent"
    description = "Talent acquisition, screening, onboarding hires for the growing team"

    def __init__(self):
        super().__init__()

    def can_handle(self, task: Task) -> float:
        text = task.description.lower()
        keywords = ["hire", "recruit", "talent", "interview", "job", "team", "onboard employee", "candidate"]
        score = sum(0.3 for kw in keywords if kw in text)
        return min(score, 0.95)

    def execute(self, task: Task) -> AgentResponse:
        self.log(f"Recruiting request: {task.description}")

        result = {
            "action": "RECRUITING_WORKFLOW",
            "steps": [
                "1. Define role spec (JD, compensation band, success metrics).",
                "2. Source via LinkedIn, referrals, communities.",
                "3. Initial screen (agent + async video).",
                "4. Michael interview (only top candidates).",
                "5. Offer + agent-managed onboarding.",
                "6. 90-day check-in."
            ],
            "target_roles_2027": [
                "Delivery Consultant (AI projects)",
                "Ops Coordinator",
                "Content + Growth"
            ],
            "note": "Use agents to reduce time-to-hire. Build bench for 2028 scale."
        }

        return AgentResponse(
            success=True,
            result=result,
            notes="Integrate with job boards later. Track in simple ATS (Google Sheet → Lever).",
            next_actions=["Draft JD", "Post to channels", "Screen resumes", "Schedule interviews"]
        )
