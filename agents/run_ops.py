#!/usr/bin/env python3
"""
Simple CLI for talking to the betterwithai Operations Leader.

Usage:
    python agents/run_ops.py

Then type natural language commands like:
    - Update the pricing on the website to $2,997 for the Roadmap
    - Book a 30 min call with Sarah from Northstar next Thursday afternoon
    - Generate an invoice for the AI Roadmap for client@acme.com
"""

import sys
from agents.ops_leader import OpsLeader

def main():
    print("=== betterwithai Operations Leader ===")
    print("Type your request in plain English. Type 'quit' or 'exit' to leave.\n")
    print("Systems (GitHub, Stripe, email, calendar, etc.) are linked via the integrations layer.")
    print("Provide keys in .env once. After that, talk here or to me (Grok) for updates/deploys.\n")

    leader = OpsLeader()
    print(leader.status_report())
    print("\n")

    while True:
        try:
            user_input = input("You → ").strip()
            if user_input.lower() in ("quit", "exit", "q"):
                print("Ops Leader signing off. Have a great day, Michael.")
                break
            if not user_input:
                continue

            result = leader.handle(user_input)
            print("\n[OpsLeader Result]")
            print(result)
            print("\n" + "-" * 60 + "\n")

        except KeyboardInterrupt:
            print("\n\nGoodbye.")
            break
        except Exception as e:
            print(f"Error: {e}")

if __name__ == "__main__":
    main()
