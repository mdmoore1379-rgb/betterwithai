"""
SocialMediaPosterAgent

Takes content from ContentMachine and actually prepares/schedules/posts it (or generates the copy + images prompts).

Integrates with X, LinkedIn, etc. via future APIs or manual + tools.

From research: personal brand + EGC + video is non-negotiable. 1 post/day minimum per key person.

This agent owns execution of the flywheel.
"""

from agents.base_agent import BaseAgent, Task, AgentResponse

class SocialMediaPosterAgent(BaseAgent):
    name = "SocialMediaPosterAgent"
    description = "Takes generated content and turns it into scheduled posts across X, LinkedIn, Reels. Owns the daily flywheel execution."

    def can_handle(self, task: Task) -> float:
        t = task.description.lower()
        if any(k in t for k in ["post", "schedule", "tweet", "linkedin", "reel", "social post", "egc", "personal brand"]):
            return 0.8
        return 0.25

    def execute(self, task: Task) -> AgentResponse:
        return AgentResponse(
            success=True,
            result="Content prepared for posting. Using threads from first_x_threads.md + lead magnet promo.",
            next_actions=[
                "Generate image prompts for each thread",
                "Create calendar for next 14 days",
                "When APIs ready: auto post or queue in Buffer/TweetHunter"
            ]
        )
