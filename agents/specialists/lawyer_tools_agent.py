"""
LawyerToolsAgent

For lawyers. Attractive easy legal tools: contracts, disclosures, reviews, generation. Make legal work professional and simple.
"""

from agents.base_agent import BaseAgent, Task, AgentResponse

class LawyerToolsAgent(BaseAgent):
    name = "LawyerToolsAgent"
    description = "Insanely easy and attractive legal tools for lawyers. Contract gen, review, compliance, client agreements."

    def __init__(self):
        super().__init__()

    def can_handle(self, task: Task) -> float:
        text = task.description.lower()
        keywords = ["lawyer", "legal", "contract", "msa", "disclosure", "compliance", "review contract", "agreement"]
        score = sum(0.3 for kw in keywords if kw in text)
        return min(score + 0.6, 0.98)

    def execute(self, task: Task) -> AgentResponse:
        self.log(f"Lawyer task: {task.description}")

        result = {
            "action": "LAWYER_PROFESSIONAL_TOOLS",
            "for_party": "Lawyers",
            "features": [
                "Clean legal workspace with all active contracts and disclosures.",
                "One-click MSA, SOW, custom agreement generator with templates.",
                "Smart contract reviewer with suggestions.",
                "Automated checkbox disclosures flow for portal login.",
                "Compliance checker for data, liability, terms.",
                "Professional exports and client share links."
            ],
            "easy": "Log in, generate/review in minutes, everything looks premium and is easy for clients too."
        }

        return AgentResponse(
            success=True,
            result=result,
            notes="LawyerToolsAgent makes legal work attractive, fast, and client-friendly.",
            next_actions=["Legal tab in portal", "Contract tools", "Enhanced lawyer disclosures"]
        )
