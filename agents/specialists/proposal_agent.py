"""
Proposal Agent

Generates professional, customized proposals and SOWs based on discovery info.
Uses templates from /contracts and /playbook.
"""

from agents.base_agent import BaseAgent, Task, AgentResponse


class ProposalAgent(BaseAgent):
    name = "ProposalAgent"
    description = "Create customized proposals, scopes, and SOWs from client info and discovery calls"

    def __init__(self):
        super().__init__()

    def can_handle(self, task: Task) -> float:
        text = task.description.lower()
        keywords = ["proposal", "sow", "scope", "quote", "estimate", "pitch", "customize"]
        score = sum(0.3 for kw in keywords if kw in text)
        return min(score, 0.9)

    def execute(self, task: Task) -> AgentResponse:
        self.log(f"Generating proposal content for: {task.description}")

        # In reality, this would pull from client context, discovery notes, etc.
        proposal_outline = """
**Proposal Outline (AI-Generated from your request)**

Client: [Extract or ask for name/company]
Objective: [From task or discovery]
Recommended Solution: [e.g. AI Roadmap or specific Project]

Scope:
- [Bullet 1]
- [Bullet 2]

Investment: See pricing section or calculate
Timeline: 
- Kickoff: [Date]
- Draft: +X days
- Final: +Y days

Next Steps:
1. Review this proposal
2. Sign MSA + this SOW (use /contracts templates)
3. Pay deposit via Stripe link (AccountingAgent can generate)
4. Kickoff call scheduled (CalendarAgent)

Use the SOW template in contracts/BetterWithAI_Statement_of_Work_Template.docx
Customize with specifics from the discovery call.
"""

        return AgentResponse(
            success=True,
            result=proposal_outline,
            notes="This agent produces the structure. For full formatted doc, we can generate a .docx using the script pattern.",
            next_actions=[
                "Fill in client specifics",
                "Generate full .docx using templates",
                "Send to client via email or portal",
                "Link to payment"
            ]
        )
