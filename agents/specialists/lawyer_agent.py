"""
LawyerAgent

Presents legal documents, disclosures, policies for user agreement (MSA, AI Policy, Liability Limits, etc).
Used on portal login / project start to mimic bank-style checkbox disclosures.
Integrates with contracts/ and portal UI.
"""

from agents.base_agent import BaseAgent, Task, AgentResponse


class LawyerAgent(BaseAgent):
    name = "LawyerAgent"
    description = "Legal document presenter and consent gatekeeper. Handles MSA, policies, liability, terms for clients and team."

    def __init__(self):
        super().__init__()

    def can_handle(self, task: Task) -> float:
        text = task.description.lower()
        keywords = ["legal", "msa", "agreement", "disclosure", "consent", "policy", "liability", "contract", "sign", "lawyer", "terms"]
        score = sum(0.25 for kw in keywords if kw in text)
        return min(score + 0.4, 0.98)

    def execute(self, task: Task) -> AgentResponse:
        self.log(f"Legal request: {task.description}")

        docs = [
            {"id": "msa", "title": "Master Services Agreement (MSA)", "summary": "Standard terms for all engagements, payment, IP, confidentiality."},
            {"id": "ai_policy", "title": "AI Usage & Data Policy", "summary": "How we use AI tools, data handling, client confidentiality with agents."},
            {"id": "liability", "title": "Limits of Liability", "summary": "Caps on liability, disclaimers for AI outputs and recommendations."},
            {"id": "privacy", "title": "Privacy Policy", "summary": "Data collection, SSO, portal storage."},
            {"id": "sow_template", "title": "Statement of Work Template", "summary": "Per-project scope, deliverables, timelines."},
        ]

        result = {
            "action": "PRESENT_DISCLOSURES",
            "documents": docs,
            "instructions": "Present all documents with clear checkboxes. Require all checked before proceeding to project/portal. Record consent timestamp + user id.",
            "note": "In production integrate HelloSign/DocuSign or built-in e-sign. For now demo checkboxes gate the UI."
        }

        return AgentResponse(
            success=True,
            result=result,
            notes="LawyerAgent ensures clean legal foundation for all clients and team members. Automates what used to be manual disclosures.",
            next_actions=["Present docs in portal login flow", "Log signed consents", "Generate signed PDFs if needed"]
        )
