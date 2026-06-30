"""
ProjectManagerAgent

For Project Managers. Attractive, easy tools for task management, timelines, team coordination, progress tracking.
"""

from agents.base_agent import BaseAgent, Task, AgentResponse

class ProjectManagerAgent(BaseAgent):
    name = "ProjectManagerAgent"
    description = "Make project management insanely easy and attractive for PMs. Dashboards, smart task allocation, progress, reporting."

    def __init__(self):
        super().__init__()

    def can_handle(self, task: Task) -> float:
        text = task.description.lower()
        keywords = ["pm", "project manager", "task", "timeline", "progress", "dashboard for pm", "allocate", "milestone"]
        score = sum(0.28 for kw in keywords if kw in text)
        return min(score + 0.55, 0.97)

    def execute(self, task: Task) -> AgentResponse:
        self.log(f"PM task: {task.description}")

        result = {
            "action": "PM_EASY_TOOLS",
            "for_party": "Project Managers",
            "attractive_features": [
                "Clean PM dashboard with all active projects, tasks, timelines at a glance.",
                "One-click task allocation to AI devs or team.",
                "Smart suggestions based on skills and availability.",
                "Beautiful progress visuals and exportable reports.",
                "Telegram alerts for blockers, easy reply to act.",
                "Integration with client portal views for transparency."
            ],
            "easy": "Log in, see what matters, delegate to agents, stay on top without stress."
        }

        return AgentResponse(
            success=True,
            result=result,
            notes="ProjectManagerAgent makes PM work attractive and low-friction.",
            next_actions=["PM tab in portal", "Task tools", "Role specific Telegram"]
        )
