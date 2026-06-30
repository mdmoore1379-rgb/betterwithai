"""
PersonalGoalsAgent

Helps every team member see their personal goals, responsibilities, and the exact action items that will move their OTE and career forward.
"""

from agents.base_agent import BaseAgent, Task, AgentResponse

class PersonalGoalsAgent(BaseAgent):
    name = "PersonalGoalsAgent"
    description = "Personal goals, responsibilities and prioritized action items. Ties individual effort directly to OTE, bonuses and company goals."

    def __init__(self):
        super().__init__()

    def can_handle(self, task: Task) -> float:
        text = task.description.lower()
        if any(k in text for k in ["goal", "ote", "responsib", "action item", "my kpi", "hit my target", "personal plan"]):
            return 0.95
        return 0.3

    def execute(self, task: Task) -> AgentResponse:
        result = {
            "action": "PERSONAL_ACTION_PLAN",
            "sections": [
                "Your Top 3 Responsibilities This Quarter",
                "Personal Goals Aligned to Company OKRs",
                "Action Items That Directly Impact Your OTE",
                "Progress Tracking + What Moves the Needle Most",
                "Weekly Recommended Focus Areas"
            ],
            "experience": "A living personal dashboard. 'Do these 4 things this week and you're on track for 110% OTE.' Clear, motivating, no ambiguity."
        }
        return AgentResponse(success=True, result=result, notes="Gives every employee clarity and momentum.")
