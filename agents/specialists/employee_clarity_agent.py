"""
EmployeeClarityAgent

Solves one of the biggest failures in companies:
- "How do I actually get paid?"
- "What are my insurance benefits?"
- "What exactly am I responsible for?"
- "What action items move me toward my goals and OTE?"

Makes the system insanely clear and motivating for every team member (AI Developers, Project Managers, etc.).
"""

from agents.base_agent import BaseAgent, Task, AgentResponse

class EmployeeClarityAgent(BaseAgent):
    name = "EmployeeClarityAgent"
    description = "Gives every team member perfect clarity on pay, benefits, responsibilities, goals, and exact action items to hit OTE. Prevents confusion and builds motivation."

    def __init__(self):
        super().__init__()

    def can_handle(self, task: Task) -> float:
        text = task.description.lower()
        keywords = ["employee", "team member", "how do i get paid", "ote", "benefits", "insurance", "my responsibilities", "my goals", "action items", "compensation", "pay", "clarity for dev", "clarity for pm"]
        score = sum(0.35 for kw in keywords if kw in text)
        return min(score + 0.55, 0.99)

    def execute(self, task: Task) -> AgentResponse:
        self.log(f"Employee clarity request: {task.description}")

        result = {
            "action": "EMPLOYEE_CLARITY_DASHBOARD",
            "for_party": "Team Members (PMs, AI Developers, etc.)",
            "sections": [
                {
                    "title": "How You Get Paid",
                    "content": "Base + OTE breakdown. Commission structure. Bonus triggers. Payment schedule. Next payout date and amount forecast.",
                    "action_items": ["View full compensation breakdown", "Simulate this month's payout based on current progress"]
                },
                {
                    "title": "Your Benefits",
                    "content": "Health insurance details, 401k match, PTO policy, other perks. What you're eligible for and how to use them.",
                    "action_items": ["See current benefits enrollment", "Request change or add dependent"]
                },
                {
                    "title": "What You're Responsible For",
                    "content": "Clear role definition. Key deliverables. Success metrics. What the company counts on you for.",
                    "action_items": ["View your role charter", "See current projects tied to your responsibilities"]
                },
                {
                    "title": "Action Items to Hit Your Goals & OTE",
                    "content": "Personalized list of high-impact actions this week/month. Tied directly to your OTE and company goals. Prioritized by impact.",
                    "action_items": ["See today's top 3 actions", "Update progress on goals", "Ask AI for help on any item"]
                }
            ],
            "experience": "Log into the portal → switch to your role → instant, beautiful, zero-confusion clarity. No digging through emails or Slack. Everything in one place, updated by agents in real time.",
            "note": "This is the antidote to the worst employee experience. Clarity creates motion and retention."
        }

        return AgentResponse(
            success=True,
            result=result,
            notes="EmployeeClarityAgent exists to eliminate confusion for every person who works in or with the system.",
            next_actions=[
                "Build dedicated Team Member tab in portal",
                "Connect to recruiting flow so new hires get instant clarity",
                "Add Telegram 'Clarity Check' command",
                "Personalize OTE progress in real time"
            ]
        )
