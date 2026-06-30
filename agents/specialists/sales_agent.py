"""
SalesAgent

For sales and business development. Attractive lead tools, proposals, nurturing. Easy for the team and prospects.
"""

from agents.base_agent import BaseAgent, Task, AgentResponse

class SalesAgent(BaseAgent):
    name = "SalesAgent"
    description = "Attractive sales experience. Lead qualification, beautiful proposals, nurturing, closing support."

    def __init__(self):
        super().__init__()

    def can_handle(self, task: Task) -> float:
        text = task.description.lower()
        keywords = ["sale", "lead", "proposal", "bd", "close", "nurture", "outreach"]
        score = sum(0.28 for kw in keywords if kw in text)
        return min(score + 0.55, 0.96)

    def execute(self, task: Task) -> AgentResponse:
        self.log(f"Sales task: {task.description}")

        result = {
            "action": "SALES_ATTRACTIVE_FLOW",
            "for_party": "Sales & BD Teams",
            "features": [
                "Lead qualification wizard tied to the client scoping.",
                "Gorgeous proposal generator with AI content.",
                "Nurture sequences and Telegram follow ups.",
                "Close tracking and easy handoff to PMs/devs.",
                "Prospect attractive experience from first contact."
            ]
        }

        return AgentResponse(success=True, result=result, notes="SalesAgent makes selling and being sold to attractive and easy.", next_actions=["Sales view", "Proposal polish"])
    }
