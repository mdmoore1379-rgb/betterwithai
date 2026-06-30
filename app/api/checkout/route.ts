import { NextRequest, NextResponse } from 'next/server';

// Real Stripe integration for the self-serve wizard.
// After you create prices in Stripe dashboard, paste the price IDs here (or load from env).

const PRICE_MAP: Record<string, string> = {
  roadmap: process.env.STRIPE_PRICE_ROADMAP || 'price_1497_roadmap_test',
  sprint: process.env.STRIPE_PRICE_SPRINT || 'price_7497_sprint_test',
};

export async function POST(request: NextRequest) {
  const { offerId, email, answers } = await request.json();

  const priceId = PRICE_MAP[offerId] || PRICE_MAP.roadmap;

  // In real prod: 
  // import Stripe from 'stripe';
  // const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!);
  // const session = await stripe.checkout.sessions.create({
  //   mode: 'payment',
  //   line_items: [{ price: priceId, quantity: 1 }],
  //   success_url: `${process.env.NEXT_PUBLIC_BASE_URL}/portal?success=true&session_id={CHECKOUT_SESSION_ID}`,
  //   cancel_url: `${process.env.NEXT_PUBLIC_BASE_URL}/#wizard`,
  //   customer_email: email,
  //   metadata: { offerId, answers: JSON.stringify(answers || {}) },
  // });
  // return NextResponse.json({ url: session.url });

  // For now (works immediately): return a Stripe test payment link style
  // User: go to Stripe dashboard → Products → create price → copy the buy.stripe.com/test_ link
  const testCheckoutUrl = `https://buy.stripe.com/test_14k8wN2iL5iQ9cQ000?prefilled_email=${encodeURIComponent(email || '')}`;

  return NextResponse.json({
    url: testCheckoutUrl,
    note: "Replace with real Stripe Checkout Session URL once prices are live. Payment success should redirect to /portal and trigger onboarding agents.",
    simulated: true,
  });
}
