'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';

// Mock authenticated client data - in real: fetched from Supabase or DB after SSO
// Personalized per user email from Microsoft 365 or Google

interface ClientContract {
  id: string;
  title: string;
  status: string;
  signedDate: string | null;
  download?: string;
  signLink?: string;
}

const defaultClientData = {
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
      link: "https://checkout.stripe.com/pay/..."
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
      signLink: "https://app.hellosign.com/sign/..."
    }
  ] as ClientContract[]
};

export default function ClientPortal() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [userEmail, setUserEmail] = useState("");
  const [activeTab, setActiveTab] = useState<'projects' | 'invoices' | 'contracts'>('projects');
  const [clientData, setClientData] = useState(defaultClientData);

  // Demo: handle ?demoLogin=acme&newProject=true from wizard for seamless Tesla-simple flow
  useEffect(() => {
    if (typeof window === 'undefined') return;
    const params = new URLSearchParams(window.location.search);
    const login = params.get('demoLogin');
    const newProj = params.get('newProject');

    if (login) {
      const email = login === 'acme' ? 'client@acme.com' : 'ops@acme-corp.com';
      setUserEmail(email);
      setIsAuthenticated(true);
    }

    if (newProj === 'true') {
      setClientData(prev => ({
        ...prev,
        projects: [
          ...prev.projects,
          {
            id: `proj-${Date.now()}`,
            title: "AI Project from Website Wizard",
            status: "In Progress",
            progress: 15,
            nextMilestone: "Kickoff scheduled via agent system",
            documents: ["Wizard Plan.pdf"]
          }
        ]
      }));
      setActiveTab('projects');
    }
  }, []);

  // Demo: support wizard "Order Now" flow for Tesla-simple experience
  // e.g. coming from /portal?demoLogin=acme&newProject=true
  useEffect(() => {
    if (typeof window === 'undefined') return;
    const params = new URLSearchParams(window.location.search);
    const login = params.get('demoLogin');
    const newProj = params.get('newProject');

    if (login) {
      const email = login === 'acme' ? 'client@acme.com' : 'ops@acme-corp.com';
      setUserEmail(email);
      setIsAuthenticated(true);
    }

    if (newProj === 'true') {
      setClientData(prev => ({
        ...prev,
        projects: [
          ...prev.projects,
          {
            id: `proj-${Date.now()}`,
            title: "AI Project from Website Wizard",
            status: "In Progress",
            progress: 15,
            nextMilestone: "Kickoff scheduled via agent system",
            documents: ["Wizard Plan.pdf"]
          }
        ]
      }));
      setActiveTab('projects');
    }
  }, []);

  // Real implementation:
  // - Use @supabase/ssr or Auth.js (next-auth) with Google and Microsoft Entra ID providers.
  // - After Stripe webhook or signup, create/link user in Supabase.
  // - Fetch personalized data (projects, invoices, contract status) filtered by auth user email/org_id.
  // - For e-sign: Integrate HelloSign/DocuSign API. Status updates via webhook into DB.
  // - Deploy as full Next.js on Vercel (dynamic, not pure static export).
  // This page is a working demo of the personalized experience.
  const handleSSOLogin = (provider: 'google' | 'microsoft') => {
    // Simulate login - in production: redirect to OAuth
    const mockEmail = provider === 'google' ? "client@acme.com" : "ops@acme-corp.com";
    setUserEmail(mockEmail);
    setIsAuthenticated(true);
    // After real login, fetch personalized data from DB based on email
    // For demo, we use the default data but could load different clients
    alert(`Logged in via ${provider} as ${mockEmail}. In production this would use real SSO and load your data.`);
  };

  const handleSignContract = (contractId: string) => {
    setClientData(prev => ({
      ...prev,
      contracts: prev.contracts.map((c: ClientContract) => 
        c.id === contractId 
          ? { ...c, status: "Signed", signedDate: new Date().toISOString().split('T')[0], signLink: undefined } 
          : c
      )
    }));
    // In real: Call e-sign API, then webhook updates DB and UI
  };

  const handlePayInvoice = (invoiceId: string) => {
    setClientData(prev => ({
      ...prev,
      invoices: prev.invoices.map(i => 
        i.id === invoiceId 
          ? { ...i, status: "Paid" } 
          : i
      )
    }));
    // In real: Redirect to Stripe, webhook on success updates status + triggers agent
    alert('Payment successful (simulated). In real flow this would redirect to Stripe Checkout.');
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
            Sign in with the same Google or Microsoft account you use for work. Your private AI command center — as seamless as the Tesla app.
          </p>
          <Link href="/" className="text-[#C6FF3A] text-sm mt-4 inline-block">← Back to public site</Link>
        </div>
      </div>
    );
  }

  const client = clientData; // In real: fetch based on authenticated user

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
          <div className="flex items-center gap-3 mb-2">
            <h1 className="text-3xl font-bold">Welcome back, {client.name}</h1>
            <span className="px-3 py-1 bg-[#C6FF3A] text-[#0B0B0F] text-xs font-bold rounded">AI SYSTEMS ACTIVE</span>
          </div>
          <p className="text-white/70">Your AI is running the work. Track everything here — exactly like the Tesla app, but for your business.</p>
          
          {/* Tesla-style live status */}
          <div className="mt-4 p-4 bg-white/5 rounded-lg border border-white/10">
            <div className="text-sm text-[#C6FF3A] mb-1">LIVE STATUS</div>
            <div className="font-semibold">Roadmap delivered • 2 projects running • Agents handling daily ops</div>
            <div className="text-xs text-white/60 mt-1">No desk required. Everything automated via the website + agent team.</div>
          </div>
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
