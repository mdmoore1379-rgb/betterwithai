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

          {/* For Michael / Ops */}
          <div className="card p-8">
            <h2 className="text-2xl font-semibold">Internal Operating System</h2>
            <p className="mt-2 text-white/70">Tools &amp; processes Michael uses to deliver at a high level with minimal overhead.</p>
            <ul className="mt-6 space-y-3 text-sm">
              <li>→ <strong>Ops Leader Agent</strong>: python agents/run_ops.py</li>
              <li>→ Full Playbook: <code>playbook/README.md</code></li>
              <li>→ Contracts: <code>/contracts</code> (MSA + SOW templates)</li>
              <li>→ Client checklists &amp; email templates: <code>playbook/</code></li>
              <li>→ Pricing &amp; self-serve flows on this site</li>
            </ul>
            <p className="mt-6 text-xs text-white/50">Everything is designed so one person can run this business extremely well.</p>
          </div>
        </div>

        <div className="mt-12 text-center text-white/60">
          Questions? Email <a href="mailto:hello@betterwithai.io" className="text-[#C6FF3A]">hello@betterwithai.io</a>
        </div>
      </div>
    </div>
  );
}
