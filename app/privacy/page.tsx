import Link from 'next/link';

export default function PrivacyPolicy() {
  return (
    <div className="min-h-screen bg-white text-[#111]">
      <div className="mx-auto max-w-3xl px-6 py-12">
        <Link href="/" className="text-[#C6FF3A] hover:underline text-sm">← Back to betterwithai</Link>

        <h1 className="mt-8 text-4xl font-bold tracking-tight">Privacy Policy</h1>
        <p className="mt-2 text-[#666]">Last updated: {new Date().toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })}</p>

        <div className="prose mt-10 max-w-none text-[#333]">
          <p>
            Better With AI, LLC (“betterwithai”, “we”, “us”) respects your privacy. This Privacy Policy explains how we collect, use, and protect information when you visit betterwithai.io or engage our services.
          </p>

          <h2>Information We Collect</h2>
          <ul>
            <li><strong>Contact &amp; Business Information:</strong> Name, email, company, phone, and details about your business that you voluntarily provide (via forms, calls, emails, or during consulting).</li>
            <li><strong>Usage Data:</strong> Pages visited, referring site, device/browser info (via standard analytics).</li>
            <li><strong>Project Data:</strong> Documents, data, processes, and other information you share with us so we can perform consulting work.</li>
          </ul>

          <h2>How We Use Information</h2>
          <ul>
            <li>To deliver AI planning, projects, and consulting services.</li>
            <li>To communicate with you about your engagement.</li>
            <li>To improve our services and website.</li>
            <li>To comply with legal obligations.</li>
          </ul>

          <h2>Sharing of Information</h2>
          <p>
            We do not sell your personal information. We may share information with:
          </p>
          <ul>
            <li>Service providers who help us operate the business (e.g., payment processors like Stripe, email tools, calendar tools) under confidentiality obligations.</li>
            <li>Legal authorities if required by law.</li>
            <li>Subcontractors or delivery team members who need the information to perform work for you (bound by confidentiality).</li>
          </ul>

          <h2>AI Tools &amp; Third-Party Services</h2>
          <p>
            We may use third-party AI tools (e.g., models from OpenAI, Anthropic, or others) to help generate recommendations and deliverables. When we do, we take reasonable steps to avoid sending unnecessary personal or confidential client data. You should assume that any data you share with us could be processed by AI systems. Do not share highly sensitive data (SSNs, full payment card data, etc.) unless specifically arranged with additional safeguards.
          </p>

          <h2>Data Security</h2>
          <p>
            We use reasonable technical and organizational measures to protect your information. However, no system is 100% secure.
          </p>

          <h2>Data Retention</h2>
          <p>
            We keep information for as long as necessary to provide the services, comply with legal requirements, and resolve disputes.
          </p>

          <h2>Your Rights</h2>
          <p>
            Depending on your location, you may have rights to access, correct, delete, or restrict processing of your personal information. Contact us to make a request.
          </p>

          <h2>Children</h2>
          <p>
            Our services are not directed to children under 18.
          </p>

          <h2>Changes to This Policy</h2>
          <p>
            We may update this policy. The current version is always available at betterwithai.io/privacy.
          </p>

          <h2>Contact</h2>
          <p>
            hello@betterwithai.io
          </p>
        </div>

        <div className="mt-16 border-t border-[#E5E5E3] pt-6 text-xs text-[#666]">
          This is a template. Have a qualified attorney review all legal documents for your specific situation and jurisdiction.
        </div>
      </div>
    </div>
  );
}
