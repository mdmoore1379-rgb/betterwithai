"""
AIDeveloperAgent

For AI developers. Easy apply with pre-assessments, skill matching, project assignment, code and agent building tools.
Make working here insanely attractive.
"""

from agents.base_agent import BaseAgent, Task, AgentResponse

class AIDeveloperAgent(BaseAgent):
    name = "AIDeveloperAgent"
    description = "Attractive experience for AI developers: apply flow, matching, dev tools, growth. Pre-assessed DISC + competence."

    def __init__(self):
        super().__init__()

    def can_handle(self, task: Task) -> float:
        text = task.description.lower()
        keywords = ["dev", "developer", "ai dev", "apply for dev", "code", "agent build", "skill match", "project for dev"]
        score = sum(0.3 for kw in keywords if kw in text)
        return min(score + 0.6, 0.98)

    def execute(self, task: Task) -> AgentResponse:
        self.log(f"AI Dev task: {task.description}")

        result = {
            "action": "AI_DEV_ATTRACTIVE_EXPERIENCE",
            "for_party": "AI Developers",
            "features": [
                "Easy apply with built-in DISC + competence assessment (automated pre-screen).",
                "Smart matching to projects based on skills and availability.",
                "Beautiful dev dashboard: assigned work, agent tools, progress.",
                "Code assist, agent scaffolding, integration help from Coding super team.",
                "Growth path: training, reviews, promotions via system.",
                "Telegram for quick updates and questions while mobile."
            ],
            "easy_and_attractive": "Apply in minutes, get matched fast, work on cool AI stuff with great tools and visibility."
        }

        return AgentResponse(
            success=True,
            result=result,
            notes="AIDeveloperAgent makes it great for devs to join and thrive.",
            next_actions=["Enhance apply queue in portal", "Dev tools section", "Skill assessment automation"]
        )
