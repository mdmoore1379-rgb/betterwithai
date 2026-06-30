#!/usr/bin/env python3
"""
Better With AI — Telegram Ops Bot Runner (Responsive Conversation Mode)

Run persistently (tmux/screen) for best experience:
    python agents/run_telegram_bot.py

This bot is now a full conversational bridge to Grok and the agent army:
- You chat naturally on Telegram like you're talking to me (Grok).
- Messages are relayed instantly with context.
- The bot acks, asks for clarification if needed, and queues tasks.
- When Grok/agents make changes or commits, updates are pushed back into the same Telegram chat.
- Supports multi-turn conversations ("yes, also update the footer", "commit it", etc.)

Improvements:
- Conversation context kept for current session
- Natural language intent detection for edits, commits, pushes
- Immediate relay + live feedback
- High priority for code change requests
- Follow-up support (reply to previous)
- After changes, use send_update from here or agents to push results/commits back

Commands still work but free chat is primary now.

The bot logs structured tasks to agents/telegram_inbox.jsonl (with context) so this Grok session or MasterSuperAgent can consume and act (edit code, commit via tools, etc.).

Grok (this CLI) reads recent messages and can respond by making the changes directly.
"""

import os
import sys
import time
import json
from datetime import datetime
from collections import defaultdict

sys.path.insert(0, os.path.dirname(os.path.dirname(os.path.abspath(__file__))))

from agents.telegram import TelegramClient, send_update, log_user_message, read_inbox
from agents.master_super_agent import MasterSuperAgent

# Simple in-memory conversation context per chat (last few turns)
CONVO_CONTEXT = defaultdict(list)  # chat_id -> [(role, text), ...]
MAX_CONTEXT = 6


def add_to_context(chat_id: str, role: str, text: str):
    CONVO_CONTEXT[chat_id].append((role, text))
    if len(CONVO_CONTEXT[chat_id]) > MAX_CONTEXT:
        CONVO_CONTEXT[chat_id].pop(0)


def get_context(chat_id: str) -> str:
    if not CONVO_CONTEXT.get(chat_id):
        return ""
    lines = []
    for role, txt in CONVO_CONTEXT[chat_id]:
        lines.append(f"{role}: {txt}")
    return "\n".join(lines)


def classify_intent(text: str) -> str:
    lower = text.lower()
    if any(k in lower for k in ["commit", "push", "git commit", "deploy"]):
        return "commit"
    if any(k in lower for k in ["edit", "change", "fix", "update", "modify", "add", "remove", "make the"]):
        return "edit"
    if any(k in lower for k in ["what", "status", "how", "show", "tell me"]):
        return "info"
    if any(k in lower for k in ["yes", "do it", "go ahead", "confirm", "ok"]):
        return "confirm"
    if any(k in lower for k in ["no", "cancel", "stop", "wait"]):
        return "cancel"
    return "task"


def handle_command(text: str, client: TelegramClient, chat_id: str) -> str:
    text = text.strip()
    lower = text.lower()
    context = get_context(chat_id)

    if lower.startswith("/help") or lower == "/start":
        return (
            "**BetterWithAI Telegram ↔ Grok Bridge** (full conversation mode)\n\n"
            "Just chat naturally. Examples:\n"
            "- fix the portal login so no real admin emails show\n"
            "- commit and push the changes\n"
            "- update the telegram bot to support multi-turn better\n"
            "- what's the status of the site?\n"
            "- yes do it and also add a comment\n\n"
            "I'll relay to Grok + agents with full context, get it done, and push results/commits back here.\n"
            "Commands like /status still work for quick checks."
        )

    if lower.startswith("/status"):
        master = MasterSuperAgent()
        s = master.status()
        return f"**Status**\nActive agents: {', '.join(s.get('active_agents', []))}\nBuilds: {s.get('builds_completed', 0)}\n\nSay anything for changes. Context: {len(context.splitlines())} turns."

    if lower.startswith("/cycle"):
        master = MasterSuperAgent()
        master.run_strategic_cycle()
        return "Cycle run. Check for updates here soon."

    intent = classify_intent(text)

    # Always log the full message + recent context for Grok
    log_entry = {
        "message": {
            "text": text,
            "from": {"username": "user_via_bot", "chat_id": chat_id},
            "intent": intent,
            "context": context[-500:] if context else ""
        }
    }
    log_user_message(log_entry)

    if intent == "commit":
        add_to_context(chat_id, "user", text)
        return (
            "✅ Commit/push request received with context.\n"
            "Relayed to Grok. I'll make the changes here and push back the commit link + summary to this chat.\n"
            "Anything to include in the commit message?"
        )

    if intent == "edit" or intent == "task":
        add_to_context(chat_id, "user", text)
        # For edit tasks, make it very clear for this Grok session
        full_task = f"TELEGRAM TASK ({intent}): {text}\nRecent context:\n{context}"
        # Re-log with full for visibility
        log_user_message({"message": {"text": full_task, "from": {"username": "user_via_bot", "chat_id": chat_id}, "intent": "high_priority_edit"}})
        return (
            f"✅ Got it — {text}\n"
            "Full request + conversation context relayed to Grok (this session).\n"
            "Grok will edit the code, commit, and push results back here.\n"
            "Reply with more details, 'yes', or 'change X to Y' to refine."
        )

    if intent == "confirm":
        add_to_context(chat_id, "user", text)
        log_user_message({"message": {"text": f"[CONFIRM] {text} (previous context: {context[-200:]}) ", "from": {"username": "user_via_bot"}}})
        return "✅ Confirmed. Proceeding with the previous request. Grok will act and report back."

    if intent == "cancel":
        CONVO_CONTEXT[chat_id].clear()
        return "❌ Cancelled previous request. Conversation context cleared. What next?"

    if intent == "info":
        add_to_context(chat_id, "user", text)
        master = MasterSuperAgent()
        s = master.status()
        return f"Current: {s}. Recent Telegram context: {len(context.splitlines())} turns. Ask anything or give a change request."

    # Default: full conversational relay
    add_to_context(chat_id, "user", text)
    log_user_message({"message": {"text": f"[CONVERSATION] {text}\nContext:\n{context}", "from": {"username": "user_via_bot", "chat_id": chat_id}}})

    return (
        "✅ Understood. Conversation pushed to Grok + agents with full context.\n"
        "Grok can act immediately (edits/commits) from this CLI. Results and commit links will be posted back here.\n"
        "Keep the conversation going — reply with refinements, questions, or new requests."
    )


def main():
    print("\n" + "=" * 70)
    print("BETTER WITH AI — TELEGRAM ↔ GROK CONVERSATIONAL BRIDGE")
    print("Chat naturally. Directives + commits flow to Grok. Results pushed back.")
    print("=" * 70 + "\n")

    client = TelegramClient()
    if not client.token:
        print("ERROR: Set TELEGRAM_BOT_TOKEN in .env")
        sys.exit(1)

    me = client.get_me()
    if me and me.get("ok"):
        print(f"Connected as @{me['result'].get('username')}")
    if client.chat_id:
        print(f"Chat: {client.chat_id}")
        send_update("✅ Telegram ↔ Grok bridge is LIVE.\nTalk to me here like in the CLI. I'll relay changes, make edits/commits via Grok, and push results + commit links back into this chat.")
    else:
        print("Send any message to capture chat ID.")

    print("\nListening for natural conversation. Ctrl+C to stop.\n")

    last_error = 0
    try:
        while True:
            try:
                updates = client.get_updates(timeout=20)
                for u in updates:
                    msg = u.get("message") or {}
                    text = (msg.get("text") or "").strip()
                    chat = msg.get("chat", {})
                    cid = str(chat.get("id"))
                    from_user = msg.get("from", {})

                    if not client.chat_id:
                        client.chat_id = cid
                        print(f"Chat ID captured: {client.chat_id}")

                    if not text:
                        continue

                    print(f"\n[Telegram] {from_user.get('first_name','?')}: {text}")

                    # Add user message to local context before handling
                    add_to_context(cid, "user", text)

                    reply = handle_command(text, client, cid)

                    client.send_message(reply, chat_id=cid)
                    add_to_context(cid, "bot", reply)

                    # Mirror to default chat if different
                    if client.chat_id and cid != str(client.chat_id):
                        client.send_message(f"📥 From chat: {text[:60]}...\nReply: {reply[:80]}...", chat_id=client.chat_id)

                time.sleep(0.3)
            except Exception as e:
                if time.time() - last_error > 8:
                    print(f"[Telegram error] {e}")
                    last_error = time.time()
                time.sleep(1.5)
    except KeyboardInterrupt:
        print("\nStopped. Inbox + context preserved.")


if __name__ == "__main__":
    main()
