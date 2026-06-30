"""
Recruiting Agent

Handles talent pipeline, screening, and hiring at scale.
Essential for building the team without Michael spending all time recruiting.

New: Automated pre-assessments (DISC + role competence) so humans only interview pre-qualified candidates in queue.
"""

from agents.base_agent import BaseAgent, Task, AgentResponse


class RecruitingAgent(BaseAgent):
    name = "RecruitingAgent"
    description = "Talent acquisition, screening, onboarding hires for the growing team. Pre-screens with DISC + competence assessments."

    def __init__(self):
        super().__init__()

    def can_handle(self, task: Task) -> float:
        text = task.description.lower()
        keywords = ["hire", "recruit", "talent", "interview", "job", "team", "onboard employee", "candidate", "apply", "pm", "developer"]
        score = sum(0.28 for kw in keywords if kw in text)
        return min(score, 0.97)

    def execute(self, task: Task) -> AgentResponse:
        self.log(f"Recruiting request: {task.description}")

        result = {
            "action": "RECRUITING_WORKFLOW",
            "steps": [
                "1. Define role spec (JD, compensation band, success metrics).",
                "2. Public apply form + automated DISC assessment (via form or Typeform link).",
                "3. Role-specific competence quiz (AI graded).",
                "4. Agent screens results; only top 10% reach human interview queue.",
                "5. Michael / lead interview (only pre-vetted).",
                "6. Offer + agent-managed onboarding + 90-day check-in."
            ],
            "target_roles_2027": [
                "Delivery Consultant (AI projects)",
                "AI Project Manager",
                "AI Developer / Agent Engineer",
                "Ops Coordinator",
                "Content + Growth"
            ],
            "assessment_automation": "DISC + competence tests completed BEFORE human sees application. Queue visible in portal for Master admins.",
            "note": "Use agents + simple forms to reduce time-to-hire dramatically. Build bench for 2028 scale."
        }

        return AgentResponse(
            success=True,
            result=result,
            notes="Assessments are self-serve. Link applicants to /apply or Google Form that posts to inbox. Master sees queue.",
            next_actions=["Draft JD", "Post apply link", "Review pre-assessed queue", "Schedule interviews only for qualified"]
        )
