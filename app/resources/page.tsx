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
            <a href="https://calendly.com/michaeldmoore/30-virtual-call?back=1" target="_blank" className="btn-primary mt-8 inline-block">Book a Discovery Call</a>
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
