"""
ClientSuccessAgent

Makes the system insanely attractive and easy for clients and prospective clients.
Handles onboarding, satisfaction tracking, easy scoping, portal guidance, upsells to 200k projects.
"""

from agents.base_agent import BaseAgent, Task, AgentResponse

class ClientSuccessAgent(BaseAgent):
    name = "ClientSuccessAgent"
    description = "Delight clients and prospects. Easy self-serve, onboarding, support, upsells. Make the system attractive and frictionless for clients and Michael\'s prospects."

    def __init__(self):
        super().__init__()

    def can_handle(self, task: Task) -> float:
        text = task.description.lower()
        keywords = ["client", "prospect", "onboard", "portal", "scoping", "satisfaction", "upsell", "wizard", "roadmap", "easy for client"]
        score = sum(0.25 for kw in keywords if kw in text)
        return min(score + 0.5, 0.99)

    def execute(self, task: Task) -> AgentResponse:
        self.log(f"Client/Prospect task: {task.description}")

        result = {
            "action": "CLIENT_SUCCESS_FLOW",
            "for_party": "Clients & Prospective Clients",
            "steps": [
                "1. Instant attractive wizard for scoping (self-serve, 4 questions, instant preview).",
                "2. Seamless portal login with lawyer disclosures (checkboxes).",
                "3. Personalized dashboard: projects, contracts, progress, agent chat.",
                "4. Easy upgrade paths to 200k+ projects.",
                "5. Satisfaction tracking, quick support via Telegram or portal.",
                "6. ROI reports and freedom metrics shown beautifully."
            ],
            "attractive_features": [
                "Modern light premium UI", 
                "One-click scoping for prospects",
                "Role-specific quick actions",
                "Telegram bridge for away-from-desk access"
            ],
            "note": "Everything designed to be insanely easy and attractive so clients love it and prospects convert fast."
        }

        return AgentResponse(
            success=True,
            result=result,
            notes="ClientSuccessAgent ensures clients and prospects have the best experience.",
            next_actions=["Polish portal client view", "Enhance wizard", "Add prospect nurture flows", "Notify via Telegram"]
        )
