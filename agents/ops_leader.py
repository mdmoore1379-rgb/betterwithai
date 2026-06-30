"""
Operations Leader Agent for betterwithai.

This is the central brain that receives high-level requests from Michael
and intelligently delegates to a team of specialist agents.

It can handle:
- Coding & website updates (delegates to CodingAgent)
- Client accounts & billing (AccountingAgent)
- Calendar & scheduling (CalendarAgent)
- Client onboarding & account management
- Research, proposals, marketing, etc.
"""

from typing import List, Dict, Any
from agents.base_agent import BaseAgent, Task, AgentResponse
import uuid
from datetime import datetime

# Import specialists (will be created)
from agents.specialists.coding_agent import CodingAgent
from agents.specialists.calendar_agent import CalendarAgent
from agents.specialists.accounting_agent import AccountingAgent
from agents.specialists.client_agent import ClientAgent


class OpsLeader:
    """
    The Operations Leader.

    Usage:
        leader = OpsLeader()
        result = leader.handle("Book a discovery call with Acme Corp for next week and send them the AI Roadmap proposal")
    """

    def __init__(self):
        self.name = "OpsLeader"
        self.specialists: List[BaseAgent] = [
            CodingAgent(),
            CalendarAgent(),
            AccountingAgent(),
            ClientAgent(),
            # More can be added: MarketingAgent, ResearchAgent, ProposalAgent, etc.
        ]
        self.task_history = []

    def handle(self, user_request: str, context: Dict[str, Any] = None) -> Dict[str, Any]:
        """
        Main entry point. The user (or you) talks to the leader in natural language.
        """
        context = context or {}
        task = Task(
            id=str(uuid.uuid4())[:8],
            description=user_request,
            context=context,
            priority=5
        )

        print(f"\n[OpsLeader] Received task: {user_request}")
        print(f"[OpsLeader] Analyzing and routing...\n")

        # Step 1: Find best specialist(s)
        scores = []
        for agent in self.specialists:
            confidence = agent.can_handle(task)
            scores.append((agent, confidence))

        # Sort by confidence
        scores.sort(key=lambda x: x[1], reverse=True)
        best_agent, best_score = scores[0]

        print(f"[OpsLeader] Best match: {best_agent.name} (confidence: {best_score:.2f})")

        # Step 2: Execute (or decompose into sub-tasks)
        if best_score < 0.4:
            # Complex task — decompose
            return self._decompose_and_delegate(task, scores)
        else:
            response = best_agent.execute(task)
            self._record_task(task, response, best_agent.name)
            return {
                "task_id": task.id,
                "delegated_to": best_agent.name,
                "success": response.success,
                "result": response.result,
                "notes": response.notes,
            }

    def _decompose_and_delegate(self, task: Task, scores: List[tuple]) -> Dict[str, Any]:
        """For complex requests, break into multiple sub-tasks and run in parallel-ish."""
        print("[OpsLeader] Task is complex. Decomposing into sub-tasks...\n")

        sub_results = []

        # Simple decomposition strategy (can be made much smarter later)
        if "calendar" in task.description.lower() or "schedule" in task.description.lower() or "book" in task.description.lower():
            cal_agent = next((a for a, _ in scores if a.name == "CalendarAgent"), None)
            if cal_agent:
                sub_results.append(cal_agent.execute(task))

        if any(kw in task.description.lower() for kw in ["code", "website", "update", "build", "fix"]):
            coding_agent = next((a for a, _ in scores if a.name == "CodingAgent"), None)
            if coding_agent:
                sub_results.append(coding_agent.execute(task))

        if any(kw in task.description.lower() for kw in ["client", "account", "billing", "invoice", "payment"]):
            acct_agent = next((a for a, _ in scores if a.name == "AccountingAgent"), None)
            if acct_agent:
                sub_results.append(acct_agent.execute(task))

        # Default: let the top agent try
        if not sub_results:
            top_agent = scores[0][0]
            sub_results.append(top_agent.execute(task))

        return {
            "task_id": task.id,
            "mode": "decomposed",
            "results": [
                {"agent": type(r).__name__ if hasattr(r, '__name__') else "result", "success": r.success, "result": r.result}
                for r in sub_results
            ]
        }

    def _record_task(self, task: Task, response: AgentResponse, agent_name: str):
        self.task_history.append({
            "timestamp": datetime.now().isoformat(),
            "task": task.description,
            "agent": agent_name,
            "success": response.success
        })

    def status_report(self) -> str:
        """Quick status for Michael."""
        return f"OpsLeader running with {len(self.specialists)} specialists. {len(self.task_history)} tasks handled today."


# Quick demo / CLI usage
if __name__ == "__main__":
    leader = OpsLeader()
    print("=== betterwithai Operations Leader ===")
    print(leader.status_report())
    print("\nExample commands:")
    print("  leader.handle('Update the website hero to say something about self-serve AI Roadmaps')")
    print("  leader.handle('Book a call with John from Acme next Tuesday at 2pm')")
    print("  leader.handle('Send invoice for the AI Roadmap to client@company.com')")
