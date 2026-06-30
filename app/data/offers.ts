// Centralized offerings data for betterwithai
// This makes the website the core, strategic hub: update here to evolve products
// without major site rewrites. Supports the $100M growth plan (productization path).

export interface Offer {
  id: string;
  tier: string;
  title: string;
  price: string;
  period?: string;
  description: string;
  features: string[];
  cta: string;
  ctaLink: string;
  highlight?: boolean;
  stage: 'core' | 'scale' | 'future'; // Aligns with growth phases
}

export const offers: Offer[] = [
  {
    id: 'readiness',
    tier: '01 — AI READINESS',
    title: 'AI Readiness Project',
    price: '$7,500',
    period: 'one-time',
    description: 'One-time deep assessment. We define your 3 key AI-enabled company goals, build initial roadmap, assess readiness, and spin up your project in the PM system. Clear scope, immediate portal access.',
    features: [
      'Full readiness assessment + 3 key goals definition',
      'Prioritized 90-day roadmap with AI support plan',
      'Project created in internal PM + client view',
      'CRM setup with initial contacts/deals',
      'Connectors configured for Zoom/Google Meet/read.ai',
      'Kickoff with internal team + scope lock'
    ],
    cta: 'Start AI Readiness →',
    ctaLink: '#wizard',
    highlight: true,
    stage: 'core',
  },
  {
    id: 'coaching',
    tier: '02 — AI COACHING',
    title: 'AI Coaching',
    price: '$7,500',
    period: 'per month',
    description: 'Ongoing strategic coaching. Monthly sessions (imported via connectors), goal tracking, access to our knowledge base and AI systems. Tied directly to your projects in the PM/CRM.',
    features: [
      '4 coaching sessions/mo logged from Zoom/Meet',
      'Ongoing refinement of 3 key company goals',
      'Full access to AI tools, playbooks, knowledge base',
      'Priority in project management queue',
      'CRM activity tracking + monthly reviews',
      'AI-assisted recommendations from our agents'
    ],
    cta: 'Start Coaching →',
    ctaLink: '#wizard',
    stage: 'scale',
  },
  {
    id: 'implementation',
    tier: '03 — AI IMPLEMENTATION',
    title: 'AI Implementation',
    price: '$7,500',
    period: 'per month',
    description: 'Hands-on delivery. 20 hours/month of AI implementation work by our team + full access to systems, custom AI agents, knowledge base, and project management. All tracked in one interface.',
    features: [
      '20 implementation hours per month (tracked in PM)',
      'Dedicated project(s) in client + internal view',
      'Full access to our AI agents, tools, and knowledge',
      'Connectors: auto-import meetings/notes from Zoom/Meet/read.ai into CRM/activity',
      'Progress against 3 key goals with AI insights',
      'CRM pipeline, tasks, and reporting included'
    ],
    cta: 'Start Implementation →',
    ctaLink: '#wizard',
    stage: 'core',
  },
  {
    id: 'roadmap',
    tier: 'ENTRY — SELF-SERVE',
    title: 'AI Roadmap (Self-Serve)',
    price: '$1,497',
    period: 'one-time',
    description: 'Entry point. Quick self-serve audit and roadmap to identify the 3 key goals. Upgrade to Readiness or Implementation for full PM + CRM + team execution.',
    features: [
      '4-question wizard + personalized roadmap',
      '3 key AI goals identified',
      'Instant portal access',
      'Upgrade path to full packages'
    ],
    cta: 'Start Free Configurator →',
    ctaLink: '#wizard',
    stage: 'core',
  },
];

export const coreBeliefPillars = [
  { icon: '⏱️', label: 'Less time', desc: 'hours of work done in minutes' },
  { icon: '💸', label: 'Less money', desc: 'leverage that used to cost a whole team' },
  { icon: '🔋', label: 'Less energy', desc: 'the busywork handled, so you\'re not running on empty' },
  { icon: '🎯', label: 'Way more focus', desc: 'your attention on the few things that actually matter' },
];
