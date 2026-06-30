#!/usr/bin/env python3
"""
One-time helper: Message your bot on Telegram first (@bwi_ops_bot),
then run this script. It will poll for the latest message, save your
CHAT_ID into .env, and send a confirmation message from the agent army.
"""

import os
import re
import requests
from dotenv import load_dotenv

load_dotenv()
TOKEN = os.getenv("TELEGRAM_BOT_TOKEN")
ENV_PATH = ".env"

if not TOKEN:
    print("No TELEGRAM_BOT_TOKEN in .env")
    exit(1)

def get_updates(offset=None):
    url = f"https://api.telegram.org/bot{TOKEN}/getUpdates"
    params = {"timeout": 10, "limit": 5}
    if offset:
        params["offset"] = offset
    r = requests.get(url, params=params, timeout=15)
    return r.json()

def save_chat_id(chat_id: str):
    with open(ENV_PATH, "r") as f:
        content = f.read()

    if "TELEGRAM_CHAT_ID=" in content:
        content = re.sub(
            r"TELEGRAM_CHAT_ID=.*",
            f"TELEGRAM_CHAT_ID={chat_id}",
            content
        )
    else:
        content += f"\nTELEGRAM_CHAT_ID={chat_id}\n"

    with open(ENV_PATH, "w") as f:
        f.write(content)

    print(f"Saved TELEGRAM_CHAT_ID={chat_id} to .env")

print("Bot username: @bwi_ops_bot")
print("STEP 1: Open Telegram right now and send ANY message to @bwi_ops_bot (e.g. /start or 'hello')")
print("STEP 2: Come back and press Enter here...")

input("Press Enter after you have messaged the bot...")

print("Polling for your message...")

data = get_updates()
updates = data.get("result", [])

if not updates:
    print("No messages found. Make sure you actually messaged @bwi_ops_bot.")
    exit(1)

# Get the most recent message
latest = updates[-1]
chat = latest.get("message", {}).get("chat", {})
chat_id = str(chat.get("id"))
first_name = chat.get("first_name", "you")

print(f"Found you: {first_name} (chat_id = {chat_id})")
save_chat_id(chat_id)

# Send confirmation
send_url = f"https://api.telegram.org/bot{TOKEN}/sendMessage"
payload = {
    "chat_id": chat_id,
    "text": "✅ Connected! The Better With AI agent army is now live in Telegram.\n\nYou can reply here anytime. I will post major updates and decision pings after deep work blocks.\n\nSend /status to see current progress.",
    "parse_mode": "Markdown"
}
requests.post(send_url, json=payload)
print("Confirmation message sent to you on Telegram!")

print("\nNow you can run: python agents/run_telegram_bot.py  (for continuous listening)")
print("Or just keep chatting here — the inbox will still capture messages if the listener isn't running.")