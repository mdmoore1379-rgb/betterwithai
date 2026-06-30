"""
FinancialForecasterAgent

Builds and maintains the unit economics, cash flow, and scaling model for the $100M vision.

Pulls from RevenueEngine and real data (Stripe, portal activity).

Delivers:
- Live model (ARR, LTV, CAC, payback, margins at scale)
- Scenario planning (aggressive vs conservative)
- Hiring triggers and cash needs
- Pricing sensitivity

From X research: margins don't matter early, revenue first. But we still need the model for smart decisions.
"""

from agents.base_agent import BaseAgent, Task, AgentResponse

class FinancialForecasterAgent(BaseAgent):
    name = "FinancialForecasterAgent"
    description = "Unit economics, forecasts, and scaling math for $100M ARR with lean agent-powered ops."

    def can_handle(self, task: Task) -> float:
        t = task.description.lower()
        if any(k in t for k in ["finance", "model", "forecast", "unit economics", "cac", "ltv", "cash", "hiring trigger", "margin"]):
            return 0.85
        return 0.2

    def execute(self, task: Task) -> AgentResponse:
        return AgentResponse(
            success=True,
            result=self.build_base_model(),
            notes="Model assumes heavy agent leverage + productized delivery. Revenue first, optimize later.",
            next_actions=["Wire real Stripe + portal data into this for live dashboard", "Create hiring plan based on triggers"]
        )

    def build_base_model(self):
        return {
            "current_target": "$1.5M ARR by end of year 1 with ~80% gross margin on Roadmap (agent delivery)",
            "core_metrics": {
                "roadmap_price": 1497,
                "blended_ltv": 38000,
                "target_cac": "<1800",
                "payback_months": 3,
                "ltv_cac": "21x"
            },
            "year1": {"arr": 2400000, "customers": 380, "team": 2},
            "year2": {"arr": 9800000, "customers": 920, "team": 4},
            "hiring_triggers": "Add first CS at 200 active customers. First content person at $2M ARR. Sales for enterprise at $5M.",
            "scenarios": {
                "aggressive": "If ContentMachine + Acquisition hit 15% wizard->paid, hit $3M faster.",
                "conservative": "Slower content, focus on warm outbound + referrals."
            }
        }
