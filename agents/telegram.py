"""
Telegram Bridge for Better With AI $100M Operations

Bidirectional communication with Telegram so the agent army can:
- Send real-time updates and "decision needed" pings after deep work blocks.
- Receive your replies/commands and feed them into MasterSuperAgent / Ops cycles.
- Allow you to drive from phone while away.

Setup (one time, ~3 minutes):
1. Open Telegram → search @BotFather → /newbot
2. Give it a name (e.g. "BetterWithAI Ops") and username (e.g. betterwithai_ops_bot)
3. Copy the token it gives you.
4. Start a chat with your new bot and send /start
5. (Optional) Add the bot to a private channel as admin if you want channel broadcasts.
6. Add to .env:
   TELEGRAM_BOT_TOKEN=123456:ABC-DEF...
   TELEGRAM_CHAT_ID=your_chat_id   (run the helper below or check @userinfobot or the first update)
7. pip install requests python-dotenv (if not present)

Usage from code or CLI:
    from agents.telegram import send_update, start_bot_polling
    send_update("Master cycle complete. 3 new agents spawned. Key decision: pricing?")

Run standalone listener (recommended for you while away):
    python agents/run_telegram_bot.py

Commands you can send the bot:
  /status          - quick vision + progress snapshot
  /decide <text>   - "decide on roadmap pricing at $1497 or $2997?"
  /spawn <idea>    - spawn a new specialist agent
  /research <q>    - trigger X + web research
  /build <what>    - direct build priority (site, stripe, etc.)
  /cycle           - run a full MasterSuperAgent strategic cycle
  anything else    - treated as direct directive / feedback for the agents

The bot writes your messages to agents/telegram_inbox.jsonl so future agent runs can consume them.
"""

import os
import json
import time
import requests
from datetime import datetime
from dotenv import load_dotenv
from typing import Optional, List, Dict, Any

load_dotenv()

TELEGRAM_API = "https://api.telegram.org/bot{token}"

INBOX_PATH = "agents/telegram_inbox.jsonl"
LAST_UPDATE_FILE = "agents/.telegram_last_update_id"


class TelegramClient:
    def __init__(self, token: Optional[str] = None, chat_id: Optional[str] = None):
        self.token = token or os.getenv("TELEGRAM_BOT_TOKEN")
        self.chat_id = chat_id or os.getenv("TELEGRAM_CHAT_ID")
        if not self.token:
            print("[Telegram] WARNING: No TELEGRAM_BOT_TOKEN found. Set in .env")
        self.last_update_id = self._load_last_update_id()

    def _get_url(self, method: str) -> str:
        return TELEGRAM_API.format(token=self.token) + f"/{method}"

    def send_message(self, text: str, chat_id: Optional[str] = None, parse_mode: str = "Markdown") -> bool:
        """Send a message. Markdown supported."""
        target = chat_id or self.chat_id
        if not self.token or not target:
            print(f"[Telegram] Cannot send (missing token or chat_id). Message would have been:\n{text[:200]}...")
            return False

        url = self._get_url("sendMessage")
        payload = {
            "chat_id": target,
            "text": text[:4096],  # Telegram limit
            "parse_mode": parse_mode,
            "disable_web_page_preview": True,
        }
        try:
            r = requests.post(url, json=payload, timeout=15)
            if r.ok:
                print(f"[Telegram] Sent update ({len(text)} chars) to {target}")
                return True
            else:
                print(f"[Telegram] Send failed: {r.status_code} {r.text[:200]}")
                return False
        except Exception as e:
            print(f"[Telegram] Send error: {e}")
            return False

    def get_updates(self, timeout: int = 60) -> List[Dict[str, Any]]:
        """Long poll for new messages."""
        if not self.token:
            return []
        url = self._get_url("getUpdates")
        params = {
            "timeout": timeout,
            "offset": self.last_update_id + 1 if self.last_update_id else None,
            "allowed_updates": ["message"],
        }
        try:
            r = requests.get(url, params=params, timeout=timeout + 5)
            if not r.ok:
                return []
            data = r.json()
            updates = data.get("result", [])
            if updates:
                self.last_update_id = max(u["update_id"] for u in updates)
                self._save_last_update_id()
            return updates
        except Exception as e:
            print(f"[Telegram] getUpdates error: {e}")
            return []

    def _load_last_update_id(self) -> int:
        try:
            with open(LAST_UPDATE_FILE, "r") as f:
                return int(f.read().strip())
        except:
            return 0

    def _save_last_update_id(self):
        try:
            os.makedirs(os.path.dirname(LAST_UPDATE_FILE), exist_ok=True)
            with open(LAST_UPDATE_FILE, "w") as f:
                f.write(str(self.last_update_id))
        except:
            pass

    def get_me(self):
        """Verify token works."""
        if not self.token:
            return None
        try:
            r = requests.get(self._get_url("getMe"), timeout=10)
            return r.json() if r.ok else None
        except:
            return None


# Global easy-access client
_client = None

def get_client() -> TelegramClient:
    global _client
    if _client is None:
        _client = TelegramClient()
    return _client


def send_update(message: str, chat_id: Optional[str] = None) -> bool:
    """Main function other agents / master use to push updates."""
    client = get_client()
    timestamp = datetime.now().strftime("%Y-%m-%d %H:%M")
    formatted = f"🤖 *BetterWithAI Ops Update* ({timestamp})\n\n{message}"
    return client.send_message(formatted, chat_id=chat_id)


def log_user_message(update: Dict[str, Any]):
    """Persist user messages so MasterSuperAgent / Ops can read them later."""
    try:
        os.makedirs("agents", exist_ok=True)
        msg = update.get("message", {})
        text = msg.get("text", "")
        user = msg.get("from", {})
        entry = {
            "timestamp": datetime.now().isoformat(),
            "user_id": user.get("id"),
            "username": user.get("username"),
            "first_name": user.get("first_name"),
            "text": text,
            "raw_update_id": update.get("update_id"),
        }
        with open(INBOX_PATH, "a") as f:
            f.write(json.dumps(entry) + "\n")
        print(f"[Telegram] Logged user message: {text[:80]}...")
    except Exception as e:
        print(f"[Telegram] Inbox log error: {e}")


def read_inbox() -> List[Dict]:
    """Agents read this to consume your directives."""
    items = []
    try:
        with open(INBOX_PATH, "r") as f:
            for line in f:
                if line.strip():
                    items.append(json.loads(line))
    except FileNotFoundError:
        pass
    return items


def clear_inbox():
    try:
        open(INBOX_PATH, "w").close()
    except:
        pass


def send_decision_request(question: str):
    """Special helper for after deep work blocks."""
    msg = (
        f"⚡ *DECISION NEEDED* ⚡\n\n"
        f"{question}\n\n"
        f"Reply with your choice or new directive. I will continue autonomously from there."
    )
    send_update(msg)


# Quick helper for one-off sends from terminal
if __name__ == "__main__":
    import sys
    client = get_client()
    if len(sys.argv) > 1:
        text = " ".join(sys.argv[1:])
        client.send_message(text)
    else:
        me = client.get_me()
        print("Telegram client ready.")
        print("Bot info:", me)
        print("Chat ID configured:", client.chat_id)
        print("Use: python -m agents.telegram 'your message here'")