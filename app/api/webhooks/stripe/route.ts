import { NextRequest, NextResponse } from 'next/server';
import Stripe from 'stripe';

// Webhook handler for Stripe events.
// This powers automation: unlock portal, create projects, send reminders, update CRM, trigger agents.

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY || '', {
  apiVersion: '2024-06-20',
});

const webhookSecret = process.env.STRIPE_WEBHOOK_SECRET || '';

export async function POST(request: NextRequest) {
  const body = await request.text();
  const sig = request.headers.get('stripe-signature') || '';

  let event: Stripe.Event;

  try {
    event = stripe.webhooks.constructEvent(body, sig, webhookSecret);
  } catch (err: any) {
    console.error('Webhook signature verification failed:', err.message);
    return NextResponse.json({ error: 'Invalid signature' }, { status: 400 });
  }

  try {
    switch (event.type) {
      case 'checkout.session.completed': {
        const session = event.data.object as Stripe.Checkout.Session;
        const offerId = session.metadata?.offerId || 'unknown';
        const customerEmail = session.customer_email || session.customer_details?.email;
        const customerId = session.customer as string;

        console.log(`[Stripe] Checkout completed for ${customerEmail} - offer: ${offerId}`);

        // TODO: Replace with real DB (Supabase)
        // 1. Create or update user/customer record with stripe_customer_id
        // 2. Create project record based on offerId
        // 3. Grant portal access (update user record or session)
        // 4. Trigger OnboardingAgent / LaunchOperator via your agent system
        // 5. Send welcome email via Resend

        // Example: You could call your agent system here
        // await triggerAgent('onboarding', { email: customerEmail, offerId, customerId });

        // For now: log and return success. Later wire to Supabase + agents.
        break;
      }

      case 'invoice.payment_succeeded': {
        const invoice = event.data.object as Stripe.Invoice;
        const customerEmail = invoice.customer_email;
        const subscriptionId = invoice.subscription as string;

        console.log(`[Stripe] Payment succeeded for ${customerEmail} (sub: ${subscriptionId})`);

        // Update project status to "active"
        // Send confirmation email
        // Update CRM in portal
        break;
      }

      case 'invoice.payment_failed': {
        const invoice = event.data.object as Stripe.Invoice;
        const customerEmail = invoice.customer_email;

        console.log(`[Stripe] Payment failed for ${customerEmail}`);

        // Send reminder email (or let Stripe handle via Billing settings)
        // Update project/CRM status to "past due"
        // Possibly trigger agent to send follow-up
        break;
      }

      case 'customer.subscription.created':
      case 'customer.subscription.updated': {
        const subscription = event.data.object as Stripe.Subscription;
        console.log(`[Stripe] Subscription ${event.type}: ${subscription.id}`);
        // Sync subscription status to your DB/portal
        break;
      }

      default:
        console.log(`[Stripe] Unhandled event type: ${event.type}`);
    }

    return NextResponse.json({ received: true });
  } catch (error: any) {
    console.error('Webhook handler error:', error);
    return NextResponse.json({ error: 'Webhook handler failed' }, { status: 500 });
  }
}

// Disable body parsing for raw signature verification
export const config = {
  api: {
    bodyParser: false,
  },
};
