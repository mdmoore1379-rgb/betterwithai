import Link from 'next/link';

export default function TermsOfService() {
  return (
    <div className="min-h-screen bg-white text-[#111]">
      <div className="mx-auto max-w-3xl px-6 py-12">
        <Link href="/" className="text-[#C6FF3A] hover:underline text-sm">← Back to betterwithai</Link>

        <h1 className="mt-8 text-4xl font-bold tracking-tight">Terms of Service</h1>
        <p className="mt-2 text-[#666]">Last updated: {new Date().toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })}</p>

        <div className="prose mt-10 max-w-none text-[#333]">
          <p>
            These Terms of Service (“Terms”) govern your use of the website betterwithai.io and the AI consulting services provided by Better With AI, LLC (“betterwithai”, “we”, “us”, or “our”).
          </p>

          <h2>1. Services</h2>
          <p>
            betterwithai provides AI consulting, planning, project implementation, and ongoing advisory services. Specific deliverables, timelines, and fees for each engagement are outlined in a separate Statement of Work (SOW), proposal, or service agreement agreed upon before work begins.
          </p>

          <h2>2. No Guarantees</h2>
          <p>
            AI tools and recommendations involve inherent uncertainty. We do not guarantee specific business results, revenue increases, cost savings, or performance outcomes. Results depend on many factors outside our control, including your execution, market conditions, and data quality. We provide our best professional judgment based on the information you share.
          </p>

          <h2>3. Your Responsibilities</h2>
          <ul>
            <li>You are responsible for providing accurate and complete information about your business.</li>
            <li>You are responsible for reviewing all AI-generated outputs, recommendations, and deliverables before using them.</li>
            <li>You must comply with all applicable laws when implementing anything we deliver.</li>
          </ul>

          <h2>4. Intellectual Property</h2>
          <p>
            Upon full payment, you own the final deliverables created specifically for you. We retain all rights to our methodologies, frameworks, templates, prompts, tools, and any pre-existing intellectual property. You receive a non-exclusive license to use those general methods in your business.
          </p>

          <h2>5. Payment &amp; Cancellation</h2>
          <p>
            Fees are as agreed in the applicable SOW or checkout. For fixed-price Planning packages, payment is due upfront unless otherwise stated. For projects and retainers, payment terms will be specified in the agreement (typically 50% to start, 50% on delivery or monthly).
          </p>
          <p>
            Cancellations: Fixed packages are non-refundable after work has begun. Retainers require 30 days written notice.
          </p>

          <h2>6. Limitation of Liability</h2>
          <p>
            To the maximum extent permitted by law, our total liability arising out of or related to any engagement shall not exceed the total fees paid by you to us in the 12 months preceding the claim. We are not liable for indirect, incidental, special, consequential, or punitive damages, including lost profits or data, regardless of the cause.
          </p>

          <h2>7. AI-Specific Disclaimers</h2>
          <p>
            AI systems can produce inaccurate, biased, or incomplete outputs (“hallucinations”). You must independently verify all outputs. We are not responsible for decisions made or actions taken based on AI-generated content.
          </p>

          <h2>8. Confidentiality</h2>
          <p>
            We will keep confidential all non-public information you share with us. We will not disclose it to third parties except as necessary to perform the services or as required by law.
          </p>

          <h2>9. Governing Law</h2>
          <p>
            These Terms are governed by the laws of the State of Texas, without regard to conflict of law principles. Any disputes shall be resolved in the state or federal courts located in Tarrant County, Texas.
          </p>

          <h2>10. Changes</h2>
          <p>
            We may update these Terms from time to time. The current version will always be posted here with the effective date.
          </p>

          <h2>Contact</h2>
          <p>
            Questions? Email <a href="mailto:hello@betterwithai.io" className="text-[#C6FF3A]">hello@betterwithai.io</a>.
          </p>
        </div>

        <div className="mt-16 border-t border-[#E5E5E3] pt-6 text-xs text-[#666]">
          This is a template. Have a qualified attorney review all legal documents for your specific situation and jurisdiction.
        </div>
      </div>
    </div>
  );
}
