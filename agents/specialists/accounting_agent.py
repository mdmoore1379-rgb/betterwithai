"""
Accounting / Finance Specialist Agent for betterwithai

Handles:
- Invoicing
- Stripe payments tracking
- Client accounts / retainers
- Simple P&L reporting
- Payment link generation
"""

from agents.base_agent import BaseAgent, Task, AgentResponse


class AccountingAgent(BaseAgent):
    name = "AccountingAgent"
    description = "Invoicing, payments (Stripe), client financial tracking, retainers"

    def __init__(self):
        super().__init__()

    def can_handle(self, task: Task) -> float:
        text = task.description.lower()
        keywords = ["invoice", "payment", "stripe", "bill", "pay", "retainer", "price", "cost", "accounting", "money", "charge"]
        score = 0.0
        for kw in keywords:
            if kw in text:
                score += 0.28
        return min(score, 0.92)

    def execute(self, task: Task) -> AgentResponse:
        self.log(f"Accounting request: {task.description}")

        if "invoice" in task.description.lower():
            result = {
                "action": "CREATE_INVOICE",
                "details": "I would generate a Stripe invoice or use the MSA + SOW to create one.",
                "recommendation": "Use the /contracts templates. I can help generate the invoice data.",
                "stripe_note": "Once Stripe is connected, I can create payment links automatically."
            }
        elif "price" in task.description.lower() or "pricing" in task.description.lower():
            result = {
                "action": "PRICING_REVIEW",
                "current_offers": {
                    "AI Roadmap": "$2,497 one-time (self-serve)",
                    "Projects": "From $7,500",
                    "Retainer": "$3,500–$6,000 / month"
                },
                "note": "Ready to update once you confirm final numbers."
            }
        else:
            result = {
                "action": "GENERAL",
                "message": "I track payments, generate invoices, and monitor retainer status."
            }

        return AgentResponse(
            success=True,
            result=result,
            notes="Will integrate with Stripe API and a simple client ledger (Supabase or local JSON for starters).",
            next_actions=["Connect Stripe", "Generate payment link", "Record transaction"]
        )
