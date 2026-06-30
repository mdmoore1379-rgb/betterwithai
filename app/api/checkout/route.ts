import { NextRequest, NextResponse } from 'next/server';
import Stripe from 'stripe';

// Real Stripe integration for productized offers.
// Setup: Create products/prices in Stripe Dashboard as per .env.example
// Then set the STRIPE_PRICE_* env vars.

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY || '', {
  apiVersion: '2024-06-20', // or latest
});

const PRICE_MAP: Record<string, { id: string; mode: 'payment' | 'subscription' }> = {
  readiness: {
    id: process.env.STRIPE_PRICE_READINESS || '',
    mode: 'payment',
  },
  coaching: {
    id: process.env.STRIPE_PRICE_COACHING || '',
    mode: 'subscription',
  },
  implementation: {
    id: process.env.STRIPE_PRICE_IMPLEMENTATION || '',
    mode: 'subscription',
  },
  // legacy self-serve
  roadmap: {
    id: process.env.STRIPE_PRICE_READINESS || '', // fallback to readiness
    mode: 'payment',
  },
};

export async function POST(request: NextRequest) {
  try {
    const { offerId, email, answers } = await request.json();

    const priceConfig = PRICE_MAP[offerId] || PRICE_MAP.readiness;
    const priceId = priceConfig.id;

    if (!priceId) {
      return NextResponse.json(
        { error: 'No price ID configured for this offer. Set STRIPE_PRICE_* in .env' },
        { status: 400 }
      );
    }

    const session = await stripe.checkout.sessions.create({
      mode: priceConfig.mode,
      payment_method_types: ['card'],
      line_items: [
        {
          price: priceId,
          quantity: 1,
        },
      ],
      success_url: `${process.env.NEXT_PUBLIC_BASE_URL || 'http://localhost:3000'}/portal?success=true&session_id={CHECKOUT_SESSION_ID}`,
      cancel_url: `${process.env.NEXT_PUBLIC_BASE_URL || 'http://localhost:3000'}/#wizard`,
      customer_email: email,
      metadata: {
        offerId,
        answers: JSON.stringify(answers || {}),
      },
      // For subscriptions, allow promotion codes etc.
      allow_promotion_codes: true,
    });

    return NextResponse.json({ url: session.url });
  } catch (error: any) {
    console.error('Stripe checkout error:', error);
    return NextResponse.json(
      { error: error.message || 'Failed to create checkout session' },
      { status: 500 }
    );
  }
}
