"""
Onboarding Agent

Handles post-sale client onboarding: welcome, data collection, kickoff prep, access setup.
"""

from agents.base_agent import BaseAgent, Task, AgentResponse


class OnboardingAgent(BaseAgent):
    name = "OnboardingAgent"
    description = "Post-purchase client onboarding, welcome sequences, kickoff preparation, data gathering"

    def __init__(self):
        super().__init__()

    def can_handle(self, task: Task) -> float:
        text = task.description.lower()
        keywords = ["onboard", "welcome", "kickoff", "setup", "intake", "access", "first", "start"]
        score = sum(0.28 for kw in keywords if kw in text)
        return min(score, 0.85)

    def execute(self, task: Task) -> AgentResponse:
        self.log("Running onboarding flow")

        checklist = """
**Standard Onboarding Checklist for betterwithai Clients**

1. Welcome email + thank you + access to client portal/resources (template ready)
2. Intake form: Business goals, current tools, key stakeholders, data access needs
3. Calendar booking for kickoff call (via CalendarAgent)
4. Share relevant templates / previous examples (if appropriate)
5. Set up shared workspace (Notion/Google Drive/whatever client prefers)
6. Confirm payment received (AccountingAgent)
7. Send signed MSA + SOW confirmation
8. Schedule first milestone check-in

For AI Roadmap clients (self-serve):
- Immediate: Link to intake form + Calendly for review call
- 48h: Send customized roadmap kickoff brief

This agent can trigger email sequences and track completion.
"""

        return AgentResponse(
            success=True,
            result=checklist,
            notes="Automate with email tool (Resend) + simple status tracker in future.",
            next_actions=["Send welcome", "Collect intake", "Book kickoff", "Create project folder"]
        )
