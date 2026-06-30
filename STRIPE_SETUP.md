# Stripe Integration for Productized Offers

## Current Status
- Checkout route now uses real Stripe SDK (one-time or subscription).
- Webhook handler created for payment events.
- Offers are defined in app/data/offers.ts (Readiness one-time, Coaching/Implementation recurring).

## Setup Steps (one-time)

1. **Create Stripe Account**
   - Go to https://dashboard.stripe.com
   - Switch to Test mode first.

2. **Create Products & Prices**
   In Stripe Dashboard → Products:
   - Product 1: "AI Readiness Project"
     - Price: One-time $7,500
     - Copy the Price ID (e.g. price_1ABC...)
   - Product 2: "AI Coaching"
     - Price: Recurring $7,500 / month
     - Copy Price ID
   - Product 3: "AI Implementation"
     - Price: Recurring $7,500 / month
     - (Description can mention "20 hours + full access to systems, AI agents, knowledge base")
     - Copy Price ID

3. **Add to .env** (copy from .env.example)
   ```
   STRIPE_SECRET_KEY=sk_test_...
   STRIPE_PUBLISHABLE_KEY=pk_test_...
   STRIPE_WEBHOOK_SECRET=whsec_...
   STRIPE_PRICE_READINESS=price_...
   STRIPE_PRICE_COACHING=price_...
   STRIPE_PRICE_IMPLEMENTATION=price_...
   NEXT_PUBLIC_BASE_URL=https://betterwithai.io
   ```

4. **Add to Vercel**
   - Project Settings → Environment Variables
   - Add the above (both test and live when ready)

5. **Set up Webhook (Critical for automation)**
   - Stripe Dashboard → Developers → Webhooks → Add endpoint
   - URL: `https://betterwithai.io/api/webhooks/stripe` (use localhost with Stripe CLI for testing: `stripe listen --forward-to localhost:3000/api/webhooks/stripe`)
   - Events to listen for:
     - checkout.session.completed
     - invoice.payment_succeeded
     - invoice.payment_failed
     - customer.subscription.created
     - customer.subscription.updated
     - customer.subscription.deleted
   - Copy the "Signing secret" into STRIPE_WEBHOOK_SECRET

6. **Test Flow**
   - Use test cards: 4242 4242 4242 4242
   - After success, check your server logs for the webhook.
   - In production, success redirects to /portal?success=true&session_id=...

## What the Webhook Enables
- On successful payment: Create user record, create Project in PM/CRM, send welcome email, grant portal access.
- Invoice reminders: Stripe sends automatic reminders. We can enhance via webhooks + Resend.
- Status updates in portal (invoices, subscription status).
- Trigger agents (LaunchOperator, OnboardingAgent).

## Next Steps (after keys are live)
- Connect to real database (Supabase) instead of mocks.
- Store stripe_customer_id on users.
- Add "Manage Billing" button in portal that links to Stripe Customer Portal.
- Use Stripe's Invoice API or sync for the portal invoices tab.

## Common Gotchas
- For subscriptions, mode must be 'subscription'.
- Always verify webhooks with the secret.
- Use metadata to pass offerId + wizard answers.
- Test mode vs Live mode keys must match.

Once this is wired, the offers become truly productized and automated.