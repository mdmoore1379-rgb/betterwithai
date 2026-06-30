import Link from 'next/link';

export default function Resources() {
  return (
    <div className="min-h-screen bg-[#0B0B0F] text-white">
      <div className="mx-auto max-w-4xl px-6 py-12">
        <Link href="/" className="text-[#C6FF3A] hover:underline text-sm">← Back to betterwithai</Link>

        <h1 className="mt-8 text-4xl font-bold tracking-tight">Resources &amp; How We Work</h1>
        <p className="mt-2 text-xl text-white/70">Everything you need to get started and get results with betterwithai.</p>

        <div className="mt-12 grid gap-8 md:grid-cols-2">
          {/* For Clients */}
          <div className="card p-8">
            <h2 className="text-2xl font-semibold text-[#C6FF3A]">For New Clients</h2>
            <ul className="mt-6 space-y-4 text-white/90">
              <li>
                <strong>AI Roadmap (Self-Serve)</strong><br />
                Buy directly → fill intake → get roadmap + review call. 
                <Link href="#pricing" className="text-[#C6FF3A] underline ml-1">Start here →</Link>
              </li>
              <li>
                <strong>Master Services Agreement</strong><br />
                <Link href="/terms" className="text-[#C6FF3A] underline">Read the terms</Link>
              </li>
              <li>
                <strong>Sample Statement of Work</strong><br />
                See the structure we use for projects.
              </li>
              <li>
                <strong>Intake &amp; Kickoff</strong><br />
                Expect a welcome email + form within 24h of purchase.
              </li>
            </ul>
            <Link href="/#wizard" className="btn-primary mt-8 inline-block">Buy Roadmap (self-serve)</Link>
          </div>

          {/* Strategic Hub — Core to $100M Strategy */}
          <div className="card p-8">
            <h2 className="text-2xl font-semibold">The Site is the Core Strategy Hub</h2>
            <p className="mt-2 text-white/70">This website isn&apos;t a brochure. It&apos;s the enduring front-end of our operating system, growth plan, and product ladder — designed so we evolve offers (Roadmap → Platform → Academy) without starting over.</p>
            <ul className="mt-6 space-y-3 text-sm">
              <li>→ <strong>Ops Leader Agent</strong>: python agents/run_ops.py (grows with the business)</li>
              <li>→ Full Playbook + $100M Plan: <code>playbook/README.md</code> + <code>growth/4-year-to-100m.md</code></li>
              <li>→ Contracts &amp; Templates: <code>/contracts</code> + <code>playbook/</code></li>
              <li>→ Self-serve Pricing &amp; Resources: All client journeys start here</li>
              <li>→ Agent-powered everything: Growth, recruiting, delivery, finance</li>
            </ul>
            <p className="mt-6 text-xs text-white/50">One founder + this system + Grok = scalable production to $100M. Talk to me, I update the site and deploy.</p>

            <div className="mt-6">
              <h3 className="font-semibold text-sm">Socials (Holderness Family Vibe)</h3>
              <p className="text-xs text-white/70">YouTube/Instagram/TikTok: Family travel + AI systems crushing work so we can actually live. The website is the engine; socials show the lifestyle. GrowthAgent generates the content ideas/scripts.</p>
              <p className="text-[10px] mt-1">Links coming live — filmed from wherever we are.</p>
            </div>

            <div className="mt-6">
              <h3 className="font-semibold text-sm">Client Portal (SSO with Google / Microsoft 365)</h3>
              <p className="text-xs text-white/70">After signup or project start, clients log in with work Google or Microsoft 365 credentials. Personalized view of projects, invoices, contracts (with e-sign), and status. No more email chains — everything in one place, specific to their org.</p>
              <Link href="/portal" className="text-[#C6FF3A] text-xs underline">Visit portal →</Link>
            </div>

            <div className="mt-8 border-t border-white/10 pt-6">
              <h3 className="font-semibold text-sm mb-2">Automation Stack (Marketing → Signup → Contract → Pay)</h3>
              <ul className="text-xs space-y-1 text-white/70">
                <li>• Forms: Tally.so (embed, auto-deliver lead magnets + trigger sequences)</li>
                <li>• Email Nurture: Resend (auto sequences from GrowthAgent)</li>
                <li>• Payments &amp; Contracts: Secure checkout + e-sign (auto links post-purchase)</li>
                <li>• Orchestration: Ops Leader + Zapier/Make (form → CRM → email → contract)</li>
                <li>• CRM: Airtable/Supabase (agent-managed, simple at first)</li>
              </ul>
              <p className="text-[10px] mt-2 text-[#C6FF3A]">Fully automated funnel for quality clients. Roadmap = 5-min signup, auto contract &amp; pay.</p>
            </div>

            <Link href="/resources" className="btn-primary mt-4 inline-block text-sm">Dive into the full hub →</Link>
          </div>
        </div>

        <div className="mt-12 text-center text-white/60">
          Questions? Email <a href="mailto:hello@betterwithai.io" className="text-[#C6FF3A]">hello@betterwithai.io</a>
        </div>
      </div>
    </div>
  );
}
