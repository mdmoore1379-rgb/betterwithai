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
