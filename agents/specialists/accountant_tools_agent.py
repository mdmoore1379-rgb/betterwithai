"""
AccountantToolsAgent

For accountants. Attractive easy tools for bookkeeping, reports, billing, reconciliation. Make finance work beautiful and effortless.
"""

from agents.base_agent import BaseAgent, Task, AgentResponse

class AccountantToolsAgent(BaseAgent):
    name = "AccountantToolsAgent"
    description = "Insanely attractive and easy tools for accountants. Reports, invoicing, reconciliation, client finance views."

    def __init__(self):
        super().__init__()

    def can_handle(self, task: Task) -> float:
        text = task.description.lower()
        keywords = ["accountant", "finance", "bookkeeping", "report", "invoice", "reconcile", "billing", "tax prep"]
        score = sum(0.3 for kw in keywords if kw in text)
        return min(score + 0.6, 0.97)

    def execute(self, task: Task) -> AgentResponse:
        self.log(f"Accountant task: {task.description}")

        result = {
            "action": "ACCOUNTANT_BEAUTIFUL_TOOLS",
            "for_party": "Accountants",
            "features": [
                "Gorgeous finance dashboard for all clients.",
                "Auto invoicing, payment tracking, smart billing.",
                "One button reconciliation and report generation.",
                "Client facing beautiful financial summaries.",
                "Tax prep stubs and estimates.",
                "Exports that look professional and are easy to use."
            ],
            "easy": "Everything at your fingertips, automated where possible, attractive UI that makes finance fun."
        }

        return AgentResponse(
            success=True,
            result=result,
            notes="AccountantToolsAgent makes accounting attractive and simple for the team and clients.",
            next_actions=["Finance tab in portal", "Billing automation", "Accountant reports"]
        )
