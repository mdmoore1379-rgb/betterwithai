"""
Telegram Bridge for Better With AI $100M Operations

Full conversational bridge between Telegram and Grok (this CLI) + the agent army:

- Chat *naturally* with the bot on your phone (multi-turn conversations supported).
- Your messages (with recent context) are relayed instantly to Grok/agents via structured inbox.
- Grok can edit code, make changes, commit & push directly from here.
- Results, commit links, and updates are pushed back into the *same* Telegram chat.
- High-priority handling for edit/commit/push requests.

This replaces the old command-only mode. Free text is the primary interface now.

Setup (one time):
1. @BotFather → /newbot
2. Add TELEGRAM_BOT_TOKEN and TELEGRAM_CHAT_ID to .env
3. pip install requests python-dotenv

Run the listener:
    python agents/run_telegram_bot.py   (keep running in tmux/screen)

Example conversation on Telegram:
  You: fix the portal so real admin emails are not shown on login
  Bot: ✅ Got it. Full request + context relayed to Grok. Grok will edit...
  (You work here or Grok acts)
  Bot: (later) ✅ Committed: https://github.com/...  Changes pushed.

See agents/run_telegram_bot.py for the full conversational handler.

The bot still supports classic commands (/status, /build, etc.) as shortcuts.
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
    """Main function other agents / master use to push updates (and commit results) back to Telegram."""
    client = get_client()
    timestamp = datetime.now().strftime("%Y-%m-%d %H:%M")
    formatted = f"🤖 *BetterWithAI Ops Update* ({timestamp})\n\n{message}"
    return client.send_message(formatted, chat_id=chat_id)


def log_user_message(update: Dict[str, Any]):
    """Persist user messages (with context) so Grok / MasterSuperAgent can read and act."""
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
            "context": msg.get("context", ""),
            "intent": msg.get("intent", ""),
            "raw_update_id": update.get("update_id"),
        }
        with open(INBOX_PATH, "a") as f:
            f.write(json.dumps(entry) + "\n")
        print(f"[Telegram] Logged user message: {text[:80]}...")
    except Exception as e:
        print(f"[Telegram] Inbox log error: {e}")


def read_inbox() -> List[Dict]:
    """Agents / Grok read this to consume your directives (now with conversation context)."""
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