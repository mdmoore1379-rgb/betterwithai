"""
Base class for all specialist agents in the betterwithai Operations system.
"""

from abc import ABC, abstractmethod
from typing import Dict, Any, List
from dataclasses import dataclass

@dataclass
class Task:
    id: str
    description: str
    context: Dict[str, Any]
    priority: int = 5  # 1-10

@dataclass
class AgentResponse:
    success: bool
    result: Any
    notes: str = ""
    next_actions: List[str] = None

class BaseAgent(ABC):
    name: str = "base"
    description: str = "Base specialist agent"

    def __init__(self):
        self.tools = {}
        self.context = self._load_agent_context()

    def _load_agent_context(self) -> Dict[str, str]:
        """Load core context files so agent has clarity, purpose, direction, branding without external help."""
        context = {}
        files_to_load = [
            "AGENT_CONTEXT.md",
            "BRAND_GUIDELINES.md",
            "MARKETING_AND_CONTENT_STYLE.md",
            "SELF_SERVE_PRODUCT_SPEC.md",
            "OPS_AND_AUTONOMY_PLAYBOOK.md",
            "BUSINESS_VISION_AND_MILESTONES.md",
            "playbook/growth/4-year-to-100m.md",
        ]
        for f in files_to_load:
            try:
                with open(f, "r") as fh:
                    context[f] = fh.read()[:4000]  # truncate for token safety
            except:
                context[f] = f"[Context file {f} not found - using defaults from vision]"
        return context

    @abstractmethod
    def can_handle(self, task: Task) -> float:
        """Return confidence score 0.0 - 1.0 for handling this task."""
        pass

    @abstractmethod
    def execute(self, task: Task) -> AgentResponse:
        """Execute the task and return result."""
        pass

    def log(self, message: str):
        print(f"[{self.name}] {message}")

    def register_tool(self, name: str, func):
        self.tools[name] = func
