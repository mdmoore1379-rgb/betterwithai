'use client';

import { useState } from 'react';
import Link from 'next/link';

// Mock authenticated client data - in real: fetched from Supabase or DB after SSO
// Personalized per user email from Microsoft 365 or Google

const mockClientData = {
  name: "Acme Corp",
  email: "client@acme.com",
  projects: [
    {
      id: "proj-001",
      title: "AI Lead Funnel & Qualification Agent",
      status: "In Progress",
      progress: 65,
      nextMilestone: "Review prototype - due Oct 15",
      documents: ["SOW-v2.pdf", "Initial Roadmap.pdf"]
    },
    {
      id: "proj-002",
      title: "AI Roadmap - Q4 Operations",
      status: "Completed",
      progress: 100,
      nextMilestone: "N/A",
      documents: ["Final Roadmap.pdf", "Signed MSA.pdf"]
    }
  ],
  invoices: [
    {
      id: "inv-101",
      amount: 2497,
      description: "AI Roadmap - Acme Corp",
      status: "Paid",
      due: "2026-09-01",
      link: "https://checkout.stripe.com/pay/..." // Real Stripe invoice link
    },
    {
      id: "inv-102",
      amount: 7500,
      description: "AI Projects - Lead Funnel Phase 1",
      status: "Due",
      due: "2026-10-10",
      link: "https://checkout.stripe.com/pay/..."
    }
  ],
  contracts: [
    {
      id: "con-001",
      title: "Master Services Agreement",
      status: "Signed",
      signedDate: "2026-08-15",
      download: "/contracts/signed-msa-acme.pdf"
    },
    {
      id: "con-002",
      title: "Statement of Work - Lead Funnel",
      status: "Pending Signature",
      signedDate: null,
      download: null,
      signLink: "https://app.hellosign.com/sign/..." // e.g. HelloSign/DocuSign link
    }
  ]
};

export default function ClientPortal() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [userEmail, setUserEmail] = useState("");
  const [activeTab, setActiveTab] = useState<'projects' | 'invoices' | 'contracts'>('projects');

  // In real app: Use Supabase Auth or NextAuth with Google/Microsoft providers
  // This is a demo that simulates SSO login
  const handleSSOLogin = (provider: 'google' | 'microsoft') => {
    // Simulate login - in production: redirect to OAuth
    const mockEmail = provider === 'google' ? "client@acme.com" : "ops@acme-corp.com";
    setUserEmail(mockEmail);
    setIsAuthenticated(true);
    // After real login, fetch personalized data from DB based on email
    alert(`Logged in via ${provider} as ${mockEmail}. In production this would use real SSO and load your data.`);
  };

  const handleSignContract = (contractId: string) => {
    alert(`Signing contract ${contractId} via e-sign provider (HelloSign/DocuSign). This would open the signing flow and update status via webhook.`);
    // Real: Call API to create envelope, redirect to sign URL
  };

  const handlePayInvoice = (invoiceId: string) => {
    alert(`Redirecting to Stripe checkout for ${invoiceId}. After payment, webhook updates status and triggers Ops Leader agent.`);
    // Real: Link to Stripe or open portal
  };

  if (!isAuthenticated) {
    return (
      <div className="min-h-screen bg-[#0B0B0F] text-white flex items-center justify-center p-6">
        <div className="max-w-md w-full card p-8 text-center">
          <h1 className="text-3xl font-bold mb-2">Client Portal</h1>
          <p className="text-white/70 mb-8">Sign in with your work account to access your personalized projects, contracts, and payments.</p>

          <div className="space-y-4">
            <button 
              onClick={() => handleSSOLogin('google')}
              className="w-full btn-primary flex items-center justify-center gap-2"
            >
              <span>🔵</span> Sign in with Google
            </button>
            <button 
              onClick={() => handleSSOLogin('microsoft')}
              className="w-full btn-secondary flex items-center justify-center gap-2"
            >
              <span>🪟</span> Sign in with Microsoft 365
            </button>
          </div>

          <p className="mt-8 text-xs text-white/50">
            Powered by the same systems that run our business. Your data is private to your organization.
          </p>
          <Link href="/" className="text-[#C6FF3A] text-sm mt-4 inline-block">← Back to public site</Link>
        </div>
      </div>
    );
  }

  const client = mockClientData; // In real: fetch based on authenticated user

  return (
    <div className="min-h-screen bg-[#0B0B0F] text-white">
      <div className="border-b border-white/10 bg-[#0B0B0F]/95 backdrop-blur-md sticky top-0 z-50">
        <div className="max-w-6xl mx-auto px-6 py-4 flex items-center justify-between">
          <div>
            <span className="font-semibold">betterwithai</span>
            <span className="text-white/50 ml-2">Client Portal</span>
          </div>
          <div className="flex items-center gap-4 text-sm">
            <span className="text-white/70">{userEmail}</span>
            <button onClick={() => setIsAuthenticated(false)} className="text-[#C6FF3A] hover:underline">Sign out</button>
          </div>
        </div>
      </div>

      <div className="max-w-6xl mx-auto px-6 py-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold">Welcome back, {client.name}</h1>
          <p className="text-white/70">Your AI projects and everything related — all in one place. Powered by the same agent systems we use internally.</p>
        </div>

        {/* Tabs */}
        <div className="flex border-b border-white/10 mb-8">
          {(['projects', 'invoices', 'contracts'] as const).map(tab => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={`px-6 py-3 text-sm font-medium border-b-2 transition-colors ${activeTab === tab ? 'border-[#C6FF3A] text-[#C6FF3A]' : 'border-transparent text-white/70 hover:text-white'}`}
            >
              {tab.charAt(0).toUpperCase() + tab.slice(1)}
            </button>
          ))}
        </div>

        {/* Projects Tab */}
        {activeTab === 'projects' && (
          <div>
            <h2 className="text-2xl font-semibold mb-6">Your Projects</h2>
            <div className="grid gap-6 md:grid-cols-2">
              {client.projects.map(project => (
                <div key={project.id} className="card p-6">
                  <div className="flex justify-between items-start mb-4">
                    <div>
                      <h3 className="font-semibold text-lg">{project.title}</h3>
                      <span className={`inline-block mt-1 px-2 py-0.5 text-xs rounded ${project.status === 'Completed' ? 'bg-green-500/20 text-green-400' : 'bg-yellow-500/20 text-yellow-400'}`}>
                        {project.status}
                      </span>
                    </div>
                    <div className="text-right">
                      <div className="text-2xl font-bold">{project.progress}%</div>
                    </div>
                  </div>
                  
                  <div className="h-2 bg-white/10 rounded mb-4">
                    <div className="h-2 bg-[#C6FF3A] rounded" style={{width: `${project.progress}%`}}></div>
                  </div>

                  <p className="text-sm text-white/80 mb-4">{project.nextMilestone}</p>

                  <div>
                    <div className="text-xs text-white/60 mb-2">Documents</div>
                    <ul className="space-y-1 text-sm">
                      {project.documents.map((doc, i) => (
                        <li key={i} className="flex items-center gap-2">
                          <span>📄</span> 
                          <a href="#" className="hover:text-[#C6FF3A]">{doc}</a>
                        </li>
                      ))}
                    </ul>
                  </div>

                  <button className="mt-6 w-full btn-secondary text-sm">View Full Project Details</button>
                </div>
              ))}
            </div>

            <div className="mt-8 card p-6">
              <h3 className="font-semibold mb-2">Signup for New Project</h3>
              <p className="text-sm text-white/70 mb-4">Ready for the next phase? Browse available project templates or start a custom one.</p>
              <Link href="#pricing" className="btn-primary">Explore Projects &amp; Signup</Link>
            </div>
          </div>
        )}

        {/* Invoices Tab */}
        {activeTab === 'invoices' && (
          <div>
            <h2 className="text-2xl font-semibold mb-6">Invoices &amp; Payments</h2>
            <div className="space-y-4">
              {client.invoices.map(invoice => (
                <div key={invoice.id} className="card p-6 flex items-center justify-between">
                  <div>
                    <div className="font-medium">{invoice.description}</div>
                    <div className="text-sm text-white/60">Due {invoice.due} • ${invoice.amount.toLocaleString()}</div>
                  </div>
                  <div className="flex items-center gap-4">
                    <span className={`px-3 py-1 text-xs rounded ${invoice.status === 'Paid' ? 'bg-green-500/20 text-green-400' : 'bg-red-500/20 text-red-400'}`}>
                      {invoice.status}
                    </span>
                    {invoice.status !== 'Paid' && (
                      <button 
                        onClick={() => handlePayInvoice(invoice.id)}
                        className="btn-primary text-sm px-5"
                      >
                        Pay Now
                      </button>
                    )}
                    <a href={invoice.link} className="text-sm text-[#C6FF3A] hover:underline">View in Stripe →</a>
                  </div>
                </div>
              ))}
            </div>
            <p className="mt-6 text-xs text-white/50">All payments processed securely via Stripe. Receipts and history available in your Stripe portal.</p>
          </div>
        )}

        {/* Contracts Tab */}
        {activeTab === 'contracts' && (
          <div>
            <h2 className="text-2xl font-semibold mb-6">Contracts &amp; Agreements</h2>
            <div className="space-y-4">
              {client.contracts.map(contract => (
                <div key={contract.id} className="card p-6">
                  <div className="flex justify-between items-start">
                    <div>
                      <div className="font-medium text-lg">{contract.title}</div>
                      <div className="text-sm text-white/60">
                        {contract.status === 'Signed' ? `Signed on ${contract.signedDate}` : 'Pending your signature'}
                      </div>
                    </div>
                    <span className={`px-3 py-1 text-xs rounded ${contract.status === 'Signed' ? 'bg-green-500/20 text-green-400' : 'bg-yellow-500/20 text-yellow-400'}`}>
                      {contract.status}
                    </span>
                  </div>

                  <div className="mt-4 flex gap-3">
                    {contract.download && (
                      <a href={contract.download} className="btn-secondary text-sm px-4">Download PDF</a>
                    )}
                    {contract.status === 'Pending Signature' && contract.signLink && (
                      <button 
                        onClick={() => handleSignContract(contract.id)}
                        className="btn-primary text-sm px-4"
                      >
                        Sign Electronically
                      </button>
                    )}
                  </div>
                </div>
              ))}
            </div>
            <p className="mt-6 text-xs text-white/50">Contracts powered by HelloSign / DocuSign. All signed documents stored securely and available here.</p>
          </div>
        )}

        <div className="mt-12 text-center text-sm text-white/60">
          Questions? Email <a href="mailto:hello@betterwithai.io" className="text-[#C6FF3A]">hello@betterwithai.io</a> or message your dedicated agent.
          <br />This portal is powered by the same AI systems we deliver to you.
        </div>
      </div>
    </div>
  );
}
