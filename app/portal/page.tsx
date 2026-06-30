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
  const [showWelcome, setShowWelcome] = useState(false);
  const [actionMessage, setActionMessage] = useState<string | null>(null);

  // Clean single handler: Tesla-simple handoff from wizard
  // ?demoLogin=acme&newProject=true lands you authenticated + adds project
  useEffect(() => {
    if (typeof window === 'undefined') return;
    const params = new URLSearchParams(window.location.search);
    const login = params.get('demoLogin');
    const newProj = params.get('newProject');

    if (login) {
      const email = login === 'acme' ? 'client@acme.com' : 'ops@acme-corp.com';
      setUserEmail(email);
      setIsAuthenticated(true);

      if (newProj === 'true') {
        const newProject = {
          id: `proj-${Date.now()}`,
          title: "AI Project from Website Wizard",
          status: "In Progress",
          progress: 18,
          nextMilestone: "Kickoff scheduled by Ops Leader • Check back in portal",
          documents: ["Wizard Plan.pdf"]
        };
        setClientData(prev => ({
          ...prev,
          projects: [...prev.projects, newProject]
        }));
        setActiveTab('projects');
        setShowWelcome(true);
        // Auto-hide the welcome banner after a bit
        setTimeout(() => setShowWelcome(false), 6200);
      }
    }
  }, []);

  // Real implementation later:
  // Supabase + Google/Microsoft Entra SSO. Payment webhooks update projects/invoices/contracts.
  const handleSSOLogin = (provider: 'google' | 'microsoft') => {
    const mockEmail = provider === 'google' ? "client@acme.com" : "ops@acme-corp.com";
    setUserEmail(mockEmail);
    setIsAuthenticated(true);
    // No jarring alert — premium silent login like Tesla app
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
    setActionMessage("Contract signed successfully. Saved to your account.");
    setTimeout(() => setActionMessage(null), 3200);
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
    setActionMessage("Payment processed. Receipt sent to your email.");
    setTimeout(() => setActionMessage(null), 3200);
  };

  if (!isAuthenticated) {
    return (
      <div className="min-h-screen bg-white text-[#111] flex items-center justify-center p-6">
        <div className="max-w-md w-full card p-9 text-center">
          <div className="mx-auto mb-6 inline-flex h-12 w-12 items-center justify-center rounded-full bg-[#C6FF3A] text-[#0B0B0F] text-3xl">🧠</div>
          <h1 className="text-4xl font-bold tracking-[-1px] mb-3">Client Portal</h1>
          <p className="text-xl text-[#555] mb-9">Your AI command center.<br />Sign in with work to see everything live.</p>

          <div className="space-y-3">
            <button 
              onClick={() => handleSSOLogin('google')}
              className="w-full btn-primary flex items-center justify-center gap-3 py-4 text-base"
            >
              Sign in with Google
            </button>
            <button 
              onClick={() => handleSSOLogin('microsoft')}
              className="w-full btn-secondary flex items-center justify-center gap-3 py-4 text-base"
            >
              Sign in with Microsoft 365
            </button>
          </div>

          <p className="mt-9 text-sm text-[#666] leading-snug">
            Same login you use for work. Projects, contracts, invoices, status — all in one place. Tesla-simple.
          </p>
          <Link href="/" className="block mt-5 text-sm text-[#C6FF3A] hover:underline">← Back to betterwithai.io</Link>
        </div>
      </div>
    );
  }

  const client = clientData; // In real: fetch based on authenticated user

  return (
    <div className="min-h-screen bg-white text-[#111]">
      <div className="border-b border-[#E5E5E3] bg-white/95 backdrop-blur-md sticky top-0 z-50">
        <div className="max-w-6xl mx-auto px-6 py-4 flex items-center justify-between">
          <div>
            <span className="font-semibold">betterwithai</span>
            <span className="text-[#666] ml-2">Portal</span>
          </div>
          <div className="flex items-center gap-4 text-sm">
            <span className="text-[#666]">{userEmail}</span>
            <button onClick={() => setIsAuthenticated(false)} className="text-[#0A66C2] hover:underline">Sign out</button>
          </div>
        </div>
      </div>

      <div className="max-w-6xl mx-auto px-6 py-8">
        {/* Premium Tesla-like welcome + handoff banner */}
        {showWelcome && (
          <div className="mb-6 rounded-2xl border border-[#C6FF3A]/60 bg-[#C6FF3A]/10 px-6 py-4 text-[#C6FF3A] flex items-start gap-3">
            <span className="text-xl mt-0.5">🚀</span>
            <div>
              <div className="font-semibold text-[#111]">Welcome! Your new project from the wizard is live.</div>
              <div className="text-sm text-[#555]">Ops Leader has already queued kickoff. Everything here updates automatically as agents move.</div>
            </div>
          </div>
        )}

        {actionMessage && (
          <div className="mb-4 rounded-xl bg-[#F0F0EE] border border-[#E5E5E3] px-5 py-3 text-sm text-[#0A66C2]">
            {actionMessage}
          </div>
        )}

        <div className="mb-8">
          <div className="flex items-center gap-3 mb-2 flex-wrap">
            <h1 className="text-3xl font-bold">Welcome back, {client.name}</h1>
            <span className="px-3 py-1 bg-[#C6FF3A] text-[#0B0B0F] text-xs font-bold rounded">AI SYSTEMS ACTIVE</span>
          </div>
          <p className="text-[#555] max-w-xl">Your AI is running the work. Track projects, sign contracts, pay invoices. No email chains. No desk required.</p>
          
          {/* Tesla-style live status */}
          <div className="mt-4 p-5 bg-white/5 rounded-2xl border border-white/10 text-sm">
            <div className="uppercase tracking-[2px] text-[#C6FF3A] text-xs mb-1">LIVE FROM THE AGENT SYSTEM</div>
            <div className="font-semibold text-lg text-[#111]">Roadmap delivered • New wizard project queued • Agents handling delivery</div>
            <div className="mt-1 text-[#666]">Check in whenever. We&apos;ll ping you only when you&apos;re needed.</div>
          </div>
        </div>

        {/* Tabs */}
        <div className="flex border-b border-white/10 mb-8">
          {(['projects', 'invoices', 'contracts'] as const).map(tab => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={`px-6 py-3 text-sm font-medium border-b-2 transition-colors ${activeTab === tab ? 'border-[#0A66C2] text-[#0A66C2]' : 'border-transparent text-[#666] hover:text-[#111]'}`}
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
                      <span className={`inline-block mt-1 px-2 py-0.5 text-xs rounded font-medium ${project.status === 'Completed' ? 'bg-green-100 text-green-700' : 'bg-amber-100 text-amber-700'}`}>
                        {project.status}
                      </span>
                    </div>
                    <div className="text-right">
                      <div className="text-2xl font-bold">{project.progress}%</div>
                    </div>
                  </div>
                  
                  <div className="h-2 bg-[#E5E5E3] rounded mb-4">
                    <div className="h-2 bg-[#C6FF3A] rounded" style={{width: `${project.progress}%`}}></div>
                  </div>

                  <p className="text-sm text-[#555] mb-4">{project.nextMilestone}</p>

                  <div>
                    <div className="text-xs text-[#666] mb-2">Documents</div>
                    <ul className="space-y-1 text-sm">
                      {project.documents.map((doc, i) => (
                        <li key={i} className="flex items-center gap-2">
                          <span>📄</span> 
                          <a href="#" className="hover:text-[#0A66C2]">{doc}</a>
                        </li>
                      ))}
                    </ul>
                  </div>

                  <button className="mt-6 w-full border border-[#111] text-[#111] hover:bg-[#F8F8F6] text-sm py-2 rounded-full">View Full Project Details</button>
                </div>
              ))}
            </div>

            <div className="mt-8 card p-6">
              <h3 className="font-semibold mb-2">Start a new project</h3>
              <p className="text-sm text-[#555] mb-4">Use the website configurator for a new Roadmap or scope a bigger project.</p>
              <div className="flex gap-3">
                <Link href="/#wizard" className="btn-primary flex-1 justify-center">Configure new Roadmap</Link>
                <Link href="/#wizard" className="border border-[#111] hover:bg-[#F8F8F6] text-[#111] flex-1 justify-center text-sm py-3 rounded-full">Start another Roadmap</Link>
              </div>
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
                    <div className="text-sm text-[#666]">Due {invoice.due} • ${invoice.amount.toLocaleString()}</div>
                  </div>
                  <div className="flex items-center gap-4">
                    <span className={`px-3 py-1 text-xs rounded font-medium ${invoice.status === 'Paid' ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700'}`}>
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
                    <a href={invoice.link} className="text-sm text-[#0A66C2] hover:underline">View payment details →</a>
                  </div>
                </div>
              ))}
            </div>
            <p className="mt-6 text-xs text-[#666]">Payments processed securely. Receipts and history available in your account.</p>
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
                      <div className="text-sm text-[#666]">
                        {contract.status === 'Signed' ? `Signed on ${contract.signedDate}` : 'Pending your signature'}
                      </div>
                    </div>
                    <span className={`px-3 py-1 text-xs rounded font-medium ${contract.status === 'Signed' ? 'bg-green-100 text-green-700' : 'bg-amber-100 text-amber-700'}`}>
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
            <p className="mt-6 text-xs text-[#666]">Contracts powered by HelloSign / DocuSign. All signed documents stored securely and available here.</p>
          </div>
        )}

        <div className="mt-12 text-center text-sm text-[#666]">
          Questions? Email <a href="mailto:hello@betterwithai.io" className="text-[#C6FF3A]">hello@betterwithai.io</a> or message your dedicated agent.
          <br />This portal is powered by the same AI systems we deliver to you.
        </div>
      </div>
    </div>
  );
}
