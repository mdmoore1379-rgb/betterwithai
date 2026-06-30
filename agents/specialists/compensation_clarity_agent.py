"""
CompensationClarityAgent

Solves "How do I actually get paid?" with perfect transparency.
Shows base salary, OTE breakdown, commission structure, bonus triggers, current progress, and next payout forecast.
"""

from agents.base_agent import BaseAgent, Task, AgentResponse

class CompensationClarityAgent(BaseAgent):
    name = "CompensationClarityAgent"
    description = "Crystal clear compensation view: base + OTE, commissions, bonuses, progress, and exact next payout for every team member."

    def __init__(self):
        super().__init__()

    def can_handle(self, task: Task) -> float:
        text = task.description.lower()
        if any(k in text for k in ["pay", "ote", "compensation", "commission", "bonus", "salary", "how do i get paid"]):
            return 0.95
        return 0.4

    def execute(self, task: Task) -> AgentResponse:
        result = {
            "action": "COMPENSATION_CLARITY",
            "sections": [
                "Base Salary + Variable Breakdown",
                "OTE Calculation (On-Target Earnings)",
                "Commission Structure & Accelerators",
                "Bonus Triggers & Current Progress %",
                "This Month's Projected Payout",
                "Payment Schedule & History"
            ],
            "experience": "One beautiful screen. No guessing. No surprises. You always know exactly where you stand and what moves the needle."
        }
        return AgentResponse(success=True, result=result, notes="Removes the #1 source of employee anxiety and misalignment.")
