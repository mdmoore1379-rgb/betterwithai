"""
Coding Specialist Agent

Handles website updates, new features, bug fixes for betterwithai.io and future tools.
When complex implementation is needed, it creates detailed specs that can be handed to Grok (or a coding sub-team).
"""

from agents.base_agent import BaseAgent, Task, AgentResponse


class CodingAgent(BaseAgent):
    name = "CodingAgent"
    description = "Website, app features, technical implementation, and code reviews"

    def __init__(self):
        super().__init__()

    def can_handle(self, task: Task) -> float:
        text = task.description.lower()
        keywords = ["website", "update", "code", "build", "fix", "feature", "page", "component", 
                    "deploy", "next.js", "framer", "tailwind", "add", "change", "refactor"]
        score = 0.0
        for kw in keywords:
            if kw in text:
                score += 0.25
        return min(score, 0.95)

    def execute(self, task: Task) -> AgentResponse:
        self.log(f"Received coding task: {task.description}")

        # In a real system this would:
        # 1. Analyze current codebase
        # 2. Create a detailed implementation plan
        # 3. Either make the changes (if simple) or generate a spec for Grok/human

        plan = f"""
**Coding Plan for:** {task.description}

1. Analyze relevant files in /Users/mmoore/betterwithai/app/
2. Implement the change following the existing style (Tailwind + Framer Motion + clean components)
3. Update any affected pages (pricing, hero, legal, etc.)
4. Test build with `npm run build`
5. Prepare commit message
6. (Grok will handle the actual file edits + push via GitHub tools)

This task is best executed by Grok using the available code editing and GitHub push tools.
"""

        return AgentResponse(
            success=True,
            result=plan,
            notes="Detailed implementation spec created. Ready for execution by Grok or developer.",
            next_actions=[
                "Grok: review the plan and implement changes in the betterwithai repo",
                "Run build and verify",
                "Use GitHub push_files to commit"
            ]
        )
