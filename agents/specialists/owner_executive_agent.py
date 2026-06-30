"""
OwnerExecutiveAgent

For owners like Michael Moore. Provides command center view of everything: clients, PMs, devs, auditors, accountants, lawyers, metrics, freedom score.
Makes it insanely easy to run the business while living the life.
"""

from agents.base_agent import BaseAgent, Task, AgentResponse

class OwnerExecutiveAgent(BaseAgent):
    name = "OwnerExecutiveAgent"
    description = "Executive command center for owners. All party visibility, KPIs, freedom metrics, quick decisions. Attractive dashboard for Michael Moore and similar owners."

    def __init__(self):
        super().__init__()

    def can_handle(self, task: Task) -> float:
        text = task.description.lower()
        keywords = ["owner", "michael", "executive", "kpi", "freedom", "overview", "dashboard", "all parties", "metrics"]
        score = sum(0.3 for kw in keywords if kw in text)
        return min(score + 0.6, 0.98)

    def execute(self, task: Task) -> AgentResponse:
        self.log(f"Owner task: {task.description}")

        result = {
            "action": "OWNER_EXECUTIVE_COMMAND_CENTER",
            "for_party": "Owners like Michael Moore",
            "features": [
                "Beautiful executive dashboard with all parties at a glance (clients, PMs, devs, finance, legal, auditors).",
                "Freedom score: time saved, lifestyle metrics, personal ROI.",
                "One click to drill into any role's view or portal.",
                "Alert center for decisions, risks, opportunities.",
                "Quick actions: approve projects, review reports, chat with agents via Telegram.",
                "Attractive visualizations, exportable reports."
            ],
            "easy_for_owner": "Log in, see everything, act fast or delegate to agents. System runs itself."
        }

        return AgentResponse(
            success=True,
            result=result,
            notes="OwnerExecutiveAgent makes running the business insanely attractive and low effort for the owner.",
            next_actions=["Build owner tab in portal", "Add freedom metrics widgets", "Telegram owner summaries"]
        )
