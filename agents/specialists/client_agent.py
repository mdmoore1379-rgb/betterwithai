"""
Client / Account Management Specialist

Handles client relationships, onboarding, proposal generation, status tracking.
"""

from agents.base_agent import BaseAgent, Task, AgentResponse


class ClientAgent(BaseAgent):
    name = "ClientAgent"
    description = "Client onboarding, proposal generation, relationship management, status tracking"

    def __init__(self):
        super().__init__()

    def can_handle(self, task: Task) -> float:
        text = task.description.lower()
        keywords = ["client", "onboard", "proposal", "lead", "customer", "account", "send", "email", "welcome"]
        score = 0.0
        for kw in keywords:
            if kw in text:
                score += 0.27
        return min(score, 0.9)

    def execute(self, task: Task) -> AgentResponse:
        self.log(f"Client task: {task.description}")

        result = {
            "action": "CLIENT_WORKFLOW",
            "steps": [
                "1. Log the lead / client in the CRM (simple JSON or Supabase for now)",
                "2. Send welcome + relevant proposal / Roadmap link using templates from /contracts",
                "3. Schedule discovery call via CalendarAgent",
                "4. After purchase: trigger onboarding checklist"
            ],
            "templates_available": ["MSA", "SOW", "AI Roadmap description"]
        }

        return AgentResponse(
            success=True,
            result=result,
            notes="Can be extended with email sending (Resend / SendGrid) and a lightweight CRM.",
            next_actions=["Create client record", "Send documents", "Schedule kickoff"]
        )
