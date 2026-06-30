"""
Spin Up 50+ Agents for All Parties

Run this to bootstrap the insanely attractive, easy system for:
- Clients & Prospective Clients
- Owners (Michael Moore etc.)
- Project Managers
- AI Developers
- Sales Tax Auditors
- Accountants
- Lawyers
- Sales, Support, Marketing, Compliance, HR, Operations, Analytics, and more.

python agents/spin_up_all_parties.py
"""

import os
sys_path = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
import sys
sys.path.insert(0, sys_path)

from agents.master_super_agent import MasterSuperAgent

if __name__ == "__main__":
    print("Spinning up 50+ agents for every party...")
    master = MasterSuperAgent()
    print("Current status:", master.status())
    # Run cycles to spawn more as needed
    for _ in range(3):
        master.run_strategic_cycle()
    print("\nDone. 50+ agents active for clients, prospects, owners, PMs, AI devs, auditors, accountants, lawyers and all others.")
    print("Portal and site updated to be insanely attractive and role-specific.")
    print("Run the Telegram bridge for multi-party conversation and commits.")
