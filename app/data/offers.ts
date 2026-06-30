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
    id: 'roadmap',
    tier: '01 — ENTRY PRODUCT',
    title: 'AI Roadmap',
    price: '$2,497',
    period: 'one-time',
    description: 'Self-serve foundation. Audit your business, get a prioritized, ROI-ranked plan you can run or we can deliver. Signup, agree, and pay in minutes — fully automated.',
    features: [
      'Full operations + tech + marketing audit',
      'Prioritized roadmap with ROI estimates',
      '60-min review + Q&A call',
      'Written deliverable ready to execute',
      'Instant signup, auto contract + Stripe payment',
    ],
    cta: 'Configure & Buy Roadmap →',
    ctaLink: '#wizard',
    highlight: true,
    stage: 'core',
  },
  {
    id: 'projects',
    tier: '02 — IMPLEMENTATION',
    title: 'AI Projects',
    price: 'From $7,500',
    period: 'project-based',
    description: 'Done-for-you builds using standardized playbooks + delivery pods. Lead funnels, automations, agents, tools.',
    features: [
      'AI-powered funnels, workflows, internal tools',
      'Custom agents & integrations',
      'Full build, testing, training & handoff',
      '30-day support + optimization',
    ],
    cta: 'Scope a Project →',
    ctaLink: 'https://calendly.com/michaeldmoore/30-virtual-call?back=1',
    stage: 'core',
  },
  {
    id: 'retainer',
    tier: '03 — OPERATING SYSTEM',
    title: 'AI Retainer',
    price: '$3,500–$6,000',
    period: 'per month',
    description: 'Recurring partnership. Monthly strategy, execution, training. The "platform" layer for ongoing advantage.',
    features: [
      'Ongoing strategy + hands-on delivery',
      'New AI opportunities surfaced proactively',
      'Team enablement & training',
      'Priority support + continuous optimization',
    ],
    cta: 'Become a Partner →',
    ctaLink: 'https://calendly.com/michaeldmoore/30-virtual-call?back=1',
    stage: 'scale',
  },
  {
    id: 'platform',
    tier: '04 — SCALE PRODUCT (2028+)',
    title: 'betterwithai Platform',
    price: 'Coming 2028',
    description: 'Productized AI operating system. Self-serve tools, playbooks, agents for teams. High-margin recurring.',
    features: [
      'Internal AI tools & dashboards',
      'Standardized playbooks library',
      'Agent-powered automation',
      'Academy + certification access',
    ],
    cta: 'Join the Waitlist →',
    ctaLink: '#wizard',
    stage: 'future',
  },
];

export const coreBeliefPillars = [
  { icon: '⏱️', label: 'Less time', desc: 'hours of work done in minutes' },
  { icon: '💸', label: 'Less money', desc: 'leverage that used to cost a whole team' },
  { icon: '🔋', label: 'Less energy', desc: 'the busywork handled, so you\'re not running on empty' },
  { icon: '🎯', label: 'Way more focus', desc: 'your attention on the few things that actually matter' },
];
