"""
Calendar & Scheduling Specialist Agent

Manages Michael's calendar, books client calls, blocks focus time, syncs with discovery calls, etc.
"""

from agents.base_agent import BaseAgent, Task, AgentResponse
from datetime import datetime, timedelta


class CalendarAgent(BaseAgent):
    name = "CalendarAgent"
    description = "Calendar management, booking calls, time blocking, client scheduling"

    def __init__(self):
        super().__init__()
        # In production: connect to Google Calendar API or Cal.com API

    def can_handle(self, task: Task) -> float:
        text = task.description.lower()
        keywords = ["calendar", "schedule", "book", "call", "meeting", "availability", "time", "block", "reschedule"]
        score = 0.0
        for kw in keywords:
            if kw in text:
                score += 0.3
        return min(score, 0.95)

    def execute(self, task: Task) -> AgentResponse:
        self.log(f"Processing scheduling request: {task.description}")

        # Simulated intelligent response (replace with real API calls later)
        now = datetime.now()

        if "book" in task.description.lower() and "call" in task.description.lower():
            result = {
                "action": "PROPOSE_BOOKING",
                "suggested_times": [
                    (now + timedelta(days=2, hours=10)).strftime("%Y-%m-%d %I:%M %p"),
                    (now + timedelta(days=2, hours=14)).strftime("%Y-%m-%d %I:%M %p"),
                    (now + timedelta(days=3, hours=11)).strftime("%Y-%m-%d %I:%M %p"),
                ],
                "next_step": "Confirm preferred time with client or Michael, then create event + send Calendly or direct invite.",
                "link": "https://calendly.com/michaeldmoore/30-virtual-call"
            }
        else:
            result = {
                "action": "GENERAL",
                "message": "I can block time, find availability, or coordinate with the ClientAgent for discovery calls.",
                "recommendation": "Provide more details (client name, preferred days, duration)."
            }

        return AgentResponse(
            success=True,
            result=result,
            notes="Calendar actions will eventually use Google Calendar API or Cal.com webhooks.",
            next_actions=["Confirm time", "Create event", "Notify client + Michael"]
        )
