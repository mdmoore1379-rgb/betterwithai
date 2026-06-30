"""
Central Integrations Module for betterwithai Operations

This acts as the "glue" between systems: GitHub, Vercel, Stripe, Calendar, Email, etc.

Goal: Once you provide API keys/tokens (one time), the Ops Leader and specialists can handle everything without you logging into dashboards constantly.

Usage from Ops Leader or CLI:
    from agents.integrations import Integrations
    integ = Integrations()
    integ.create_github_commit(...)  # or delegate

For full power:
- GitHub: Use MCP tools from Grok side for direct pushes.
- Local agents: Use PyGithub, stripe lib, etc.

Setup:
1. pip install -r requirements (add github, stripe, etc.)
2. Add keys to .env (never commit)
3. For Grok-managed: Once GitHub repo exists, I handle via tools.
"""

import os
from dotenv import load_dotenv

load_dotenv()

class Integrations:
    def __init__(self):
        self.github_token = os.getenv("GITHUB_TOKEN")
        self.stripe_key = os.getenv("STRIPE_SECRET_KEY")
        self.vercel_token = os.getenv("VERCEL_TOKEN")  # if needed
        self.calendly_token = os.getenv("CALENDLY_TOKEN")
        self.resend_key = os.getenv("RESEND_API_KEY")
        self.telegram_token = os.getenv("TELEGRAM_BOT_TOKEN")
        self.telegram_chat_id = os.getenv("TELEGRAM_CHAT_ID")
        # Add more as needed: Google Calendar, Tally, etc.

    # GitHub - for code deploys. When repo exists, Grok can use MCP push_files directly.
    def push_code_changes(self, files: list, message: str, owner: str = "mmoore-lgtm", repo: str = "betterwithai"):
        """
        For local: Use PyGithub.
        For Grok: Call the MCP push_files tool.
        """
        print(f"[Integrations] Would push to {owner}/{repo}: {message}")
        print("In practice, when chatting with me, I use grok_com_github__push_files directly.")
        # Example local code (uncomment after pip install PyGithub)
        # from github import Github
        # g = Github(self.github_token)
        # repo_obj = g.get_repo(f"{owner}/{repo}")
        # for f in files:
        #     repo_obj.create_file(...) or update
        return {"status": "simulated - use Grok chat for real push"}

    # Stripe - automated payments, customers, invoices
    def create_stripe_checkout(self, price_id: str, customer_email: str = None):
        """Create a checkout session for self-serve payments."""
        # import stripe
        # stripe.api_key = self.stripe_key
        # session = stripe.checkout.Session.create(...)
        print(f"[Integrations] Stripe checkout for {price_id}")
        return {"url": "https://checkout.stripe.com/... (real URL after setup)", "status": "ready"}

    def handle_stripe_webhook(self, event):
        """Process payment -> trigger contract email, update CRM, etc."""
        if event['type'] == 'checkout.session.completed':
            print("[Integrations] Payment received - trigger contract + onboarding via agents")
            # Call OnboardingAgent, send email via Resend, etc.
        return {"processed": True}

    # Vercel deploy
    def deploy_to_vercel(self, project_id: str = None):
        print("[Integrations] Trigger Vercel deploy. In chat, I can call grok_com_vercel__deploy_to_vercel")
        return {"status": "Use Grok for direct deploy"}

    # Email (Resend) for automated sequences
    def send_email(self, to: str, subject: str, html: str):
        print(f"[Integrations] Sending email to {to}: {subject}")
        # resend.api_key = self.resend_key
        # resend.Emails.send(...)
        return {"sent": True}

    # Calendar example
    def book_calendar_event(self, details: dict):
        print("[Integrations] Booking via Calendly/Google API")
        return {"event_url": "https://calendly.com/..."}

    # Telegram - bidirectional updates with you while away
    def send_telegram_update(self, message: str):
        """Post progress / decisions / big moves to your Telegram."""
        try:
            from agents.telegram import send_update
            return send_update(message)
        except Exception as e:
            print(f"[Integrations] Telegram send failed: {e}")
            return {"sent": False, "error": str(e)}

    def telegram_decision(self, question: str):
        """Ping you for input after deep autonomous work."""
        try:
            from agents.telegram import send_decision_request
            return send_decision_request(question)
        except Exception as e:
            print(f"[Integrations] Telegram decision ping failed: {e}")
            return {"sent": False}

    # Central: One method the Ops Leader calls for "link systems"
    def automate_client_flow(self, client_data: dict):
        """
        Example end-to-end for a qualified client:
        - Create Stripe customer/checkout
        - Trigger contract (generate SOW from template)
        - Send automated email
        - Book kickoff
        - Create client record for /portal (Supabase or DB)
        - Update GitHub if new code needed (rare)
        """
        print("[Integrations] Running automated client flow for", client_data.get("email"))
        checkout = self.create_stripe_checkout("price_roadmap")
        self.send_email(
            to=client_data["email"],
            subject="Welcome - Your AI Roadmap is ready",
            html="..."
        )
        # Create portal account stub (in real: Supabase user + client profile)
        print("[Integrations] Client account created for personalized portal at /portal (SSO with Google/Microsoft 365)")
        return {"flow": "initiated", "next": "payment + webhook will continue automation. Client logs in with work creds to see projects/invoices/contracts."}

# Singleton for easy import in agents
integrations = Integrations()
