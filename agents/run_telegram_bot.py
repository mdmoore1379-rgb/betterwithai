#!/usr/bin/env python3
"""
Better With AI — Telegram Ops Bot Runner

Long-polling bot that keeps the conversation alive while you're away.

Run this (in a separate terminal or tmux/screen while traveling):

    python agents/run_telegram_bot.py

It will:
- Post big updates from the agent army (via send_update in other scripts)
- Listen for your replies and directives
- Log everything to agents/telegram_inbox.jsonl so the MasterSuperAgent can consume it in cycles
- Handle special commands that trigger actions

You can also run it briefly, send commands, then kill it — the inbox persists.

Commands (just type in chat with the bot):
  /status
  /cycle
  /decide <your question or instruction>
  /spawn <new agent idea>
  /research <topic>
  /build <what to build on the site or in agents>
  /progress
  free text = treated as directive / feedback

After 2+ hours of deep work the agents will use send_decision_request() to ping you for input.
Reply and the next cycle will pick it up.

Press Ctrl+C to stop the listener.
"""

import os
import sys
import time
from datetime import datetime

# Make sure we can import siblings
sys.path.insert(0, os.path.dirname(os.path.dirname(os.path.abspath(__file__))))

from agents.telegram import TelegramClient, send_update, log_user_message, read_inbox
from agents.master_super_agent import MasterSuperAgent


def handle_command(text: str, client: TelegramClient) -> str:
    """Process a user message and return a short reply + side effects."""
    text = text.strip()
    lower = text.lower()

    if lower.startswith("/status"):
        master = MasterSuperAgent()
        s = master.status()
        return (
            f"**$100M Status**\n"
            f"Active agents: {', '.join(s['active_agents'])}\n"
            f"Coding superagents: {s['coding_superagents']}\n"
            f"Builds logged: {s['builds_completed']}\n"
            f"Vision: {s['vision']}\n\n"
            "MasterSuperAgent is running full speed while you're away."
        )

    if lower.startswith("/cycle"):
        print("[TelegramBot] Triggering MasterSuperAgent strategic cycle from Telegram...")
        master = MasterSuperAgent()
        result = master.run_strategic_cycle()
        return f"Strategic cycle executed. New agents + builds triggered. Result keys: {list(result.keys())}"

    if lower.startswith("/decide "):
        question = text[8:].strip()
        # Log it heavily so next agent run sees it as priority
        log_user_message({"message": {"text": f"[DECISION] {question}", "from": {"username": "user_via_bot"}}})
        return f"Decision directive logged: “{question}”. Master will factor this into the next cycle."

    if lower.startswith("/spawn "):
        idea = text[7:].strip()
        log_user_message({"message": {"text": f"[SPAWN] {idea}", "from": {"username": "user_via_bot"}}})
        # In real run the master will pick it up. We can also spawn immediately.
        master = MasterSuperAgent()
        name = master.spawn_new_agent(idea, "User-directed via Telegram while away")
        return f"Spawning new specialist: {name}. Logged for full execution in cycle."

    if lower.startswith("/research "):
        topic = text[10:].strip()
        log_user_message({"message": {"text": f"[RESEARCH] {topic}", "from": {"username": "user_via_bot"}}})
        return f"Research task logged: {topic}. X + web deep dive will run in next master cycle."

    if lower.startswith("/build "):
        what = text[7:].strip()
        log_user_message({"message": {"text": f"[BUILD] {what}", "from": {"username": "user_via_bot"}}})
        return f"Build priority logged: {what}. Coding super team will execute."

    if lower.startswith("/progress"):
        inbox = read_inbox()
        recent = inbox[-3:] if inbox else []
        return f"Recent user directives received: {len(inbox)} total. Last few: {[r.get('text','')[:60] for r in recent]}"

    # Default: treat as general directive
    log_user_message({"message": {"text": text, "from": {"username": "user_via_bot"}}})
    return (
        "Directive received and logged to inbox. "
        "MasterSuperAgent will incorporate it in the next strategic cycle.\n\n"
        "Send /status or /cycle anytime."
    )


def main():
    print("\n" + "=" * 70)
    print("BETTER WITH AI — TELEGRAM OPS LISTENER")
    print("Keeping the 100M build engine connected while you’re away.")
    print("=" * 70 + "\n")

    client = TelegramClient()
    if not client.token:
        print("ERROR: TELEGRAM_BOT_TOKEN not set in .env")
        print("Create bot with @BotFather, then add the token.")
        sys.exit(1)

    me = client.get_me()
    if me and me.get("ok"):
        bot_name = me["result"].get("username", "unknown")
        print(f"Connected as @{bot_name}")
    else:
        print("WARNING: Could not verify bot token. Continuing anyway...")

    if client.chat_id:
        print(f"Default chat/channel: {client.chat_id}")
        send_update("✅ Telegram ops listener is now LIVE. Agent army reporting for duty while you're at breakfast/meetings.\n\nI will post major updates after deep work blocks (~every 1-2h) and ask for decisions when needed. Reply anytime — I will continue autonomously.")
    else:
        print("No TELEGRAM_CHAT_ID set yet. Send any message to the bot and I will log your chat id from the first update.")

    print("\nPolling for messages... (Ctrl+C to stop)\n")

    try:
        while True:
            updates = client.get_updates(timeout=50)
            for u in updates:
                msg = u.get("message") or {}
                text = msg.get("text", "").strip()
                chat = msg.get("chat", {})
                from_user = msg.get("from", {})

                # If we don't have a chat_id yet, auto-adopt the first one that messages us
                if not client.chat_id:
                    client.chat_id = str(chat.get("id"))
                    print(f"Auto-captured chat_id: {client.chat_id} (save this to .env as TELEGRAM_CHAT_ID)")

                if not text:
                    continue

                print(f"\n[User via Telegram] {from_user.get('first_name','?')}: {text}")

                # Handle
                reply = handle_command(text, client)

                # Always acknowledge
                client.send_message(reply, chat_id=str(chat.get("id")))

                # Special: if user is giving a big directive, also broadcast a short ack to default chat
                if client.chat_id and str(chat.get("id")) != str(client.chat_id):
                    client.send_message(f"📥 New directive from you: {text[:100]}...\n\nLogged and queued for execution.", chat_id=client.chat_id)

            time.sleep(1)  # small idle between polls

    except KeyboardInterrupt:
        print("\n\nListener stopped. Inbox preserved at agents/telegram_inbox.jsonl")
        print("You can restart anytime. Agent work continues independently.")


if __name__ == "__main__":
    main()