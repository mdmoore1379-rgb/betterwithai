"""
SalesTaxAuditorAgent

For sales tax auditors and compliance. Easy attractive tools for audits, calculations, reports. Make compliance painless and professional for all.
"""

from agents.base_agent import BaseAgent, Task, AgentResponse

class SalesTaxAuditorAgent(BaseAgent):
    name = "SalesTaxAuditorAgent"
    description = "Attractive, easy tools for sales tax auditors and compliance teams. Reports, calculators, audit prep."

    def __init__(self):
        super().__init__()

    def can_handle(self, task: Task) -> float:
        text = task.description.lower()
        keywords = ["auditor", "sales tax", "tax", "audit", "compliance", "report for auditor", "nexus", "filing"]
        score = sum(0.32 for kw in keywords if kw in text)
        return min(score + 0.6, 0.98)

    def execute(self, task: Task) -> AgentResponse:
        self.log(f"Auditor task: {task.description}")

        result = {
            "action": "AUDITOR_COMPLIANCE_TOOLS",
            "for_party": "Sales Tax Auditors & Compliance",
            "attractive_features": [
                "Clean audit dashboard with all client tax data.",
                "One-click sales tax calculator and estimator.",
                "Auto-generated audit-ready reports and filings.",
                "Nexus and multi-state compliance checker.",
                "Beautiful exports for clients and internal use.",
                "Integration with accounting and client portal."
            ],
            "easy": "Log in, run reports, stay compliant without the headache. Attractive professional interface."
        }

        return AgentResponse(
            success=True,
            result=result,
            notes="SalesTaxAuditorAgent makes tax and audit work attractive and simple.",
            next_actions=["Auditor view in portal", "Tax tools UI", "Compliance reports"]
        )
