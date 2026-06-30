"""
BenefitsGuideAgent

Provides crystal-clear, attractive information on insurance benefits, 401k, PTO, perks for team members.
No more digging through HR emails.
"""

from agents.base_agent import BaseAgent, Task, AgentResponse

class BenefitsGuideAgent(BaseAgent):
    name = "BenefitsGuideAgent"
    description = "Clear, beautiful guide to all benefits: health insurance, 401k, PTO, perks. Personalized eligibility and how to use them."

    def __init__(self):
        super().__init__()

    def can_handle(self, task: Task) -> float:
        text = task.description.lower()
        if any(k in text for k in ["benefit", "insurance", "401k", "pto", "health", "perks", "benefits package"]):
            return 0.95
        return 0.3

    def execute(self, task: Task) -> AgentResponse:
        result = {
            "action": "BENEFITS_CLARITY",
            "sections": [
                "Your Current Health Insurance Plan & Coverage",
                "Dental, Vision, Life Insurance Summary",
                "401k Match and Enrollment Status",
                "PTO Balance and Policy",
                "Other Perks (Wellness, Learning Budget, etc.)",
                "How to Make Changes or File Claims"
            ],
            "experience": "Simple cards with what matters to you. 'You are eligible for X. Here's how to use it.' Direct links to actions."
        }
        return AgentResponse(success=True, result=result, notes="Removes confusion around benefits.")
