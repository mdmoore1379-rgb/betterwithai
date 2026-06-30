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

interface ProjectTask {
  id: string;
  title: string;
  status: 'todo' | 'in-progress' | 'done';
  due?: string;
  hoursUsed?: number;
}

interface MeetingActivity {
  id: string;
  source: string; // Zoom, Google Meet, read.ai
  date: string;
  summary: string;
  linkedProjectId?: string;
}

const defaultClientData = {
  name: "Acme Corp",
  email: "client@acme.com",
  projects: [
    {
      id: "proj-001",
      title: "AI Lead Funnel & Qualification Agent",
      packageType: "Implementation",
      status: "In Progress",
      progress: 65,
      nextMilestone: "Review prototype - due Oct 15",
      documents: ["SOW-v2.pdf", "Initial Roadmap.pdf"],
      tasks: [
        { id: 't1', title: 'Define 3 key goals with AI enablement', status: 'done' as const, due: '2026-10-01' },
        { id: 't2', title: 'Connect Zoom + read.ai for meeting import', status: 'in-progress' as const, due: '2026-10-05' },
        { id: 't3', title: 'Build qualification agent MVP', status: 'todo' as const, due: '2026-10-20', hoursUsed: 8 }
      ] as ProjectTask[],
      packageScope: "20 hours/month + full access to AI systems, agents, knowledge base. All tracked against 3 company goals."
    },
    {
      id: "proj-002",
      title: "AI Roadmap - Q4 Operations",
      packageType: "Readiness",
      status: "Completed",
      progress: 100,
      nextMilestone: "N/A",
      documents: ["Final Roadmap.pdf", "Signed MSA.pdf"],
      tasks: [
        { id: 't4', title: 'Readiness assessment complete', status: 'done' as const },
        { id: 't5', title: 'Define 3 key AI goals', status: 'done' as const }
      ] as ProjectTask[],
      packageScope: "One-time $7500: Full assessment, 3 key goals, initial roadmap, project spun up in PM/CRM."
    }
  ],
  invoices: [
    {
      id: "inv-101",
      amount: 1497,
      description: "AI Roadmap - Acme Corp (Self-Serve Entry)",
      status: "Paid",
      due: "2026-09-01",
      link: "https://checkout.stripe.com/pay/..."
    },
    {
      id: "inv-102",
      amount: 7500,
      description: "AI Implementation - Lead Funnel (20 hrs/mo)",
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
      title: "Statement of Work - Lead Funnel Implementation",
      status: "Pending Signature",
      signedDate: null,
      signLink: "https://app.hellosign.com/sign/..."
    }
  ] as ClientContract[],
  // CRM for internal view
  crmClients: [
    { id: 'c1', name: 'Acme Corp', email: 'client@acme.com', status: 'Active', deals: 2, lastActivity: '2026-09-28' },
    { id: 'c2', name: 'Northstar Dermatology', email: 'ops@northstar.com', status: 'Prospect', deals: 1, lastActivity: '2026-09-20' }
  ],
  // Company-level 3 key goals (AI heavily enabled)
  keyGoals: [
    { id: 'g1', title: 'Automate lead qualification & funnel (AI Implementation + agents)', progress: 65, aiSupport: 'Lead agent deployed, meeting notes auto-imported from Zoom/read.ai' },
    { id: 'g2', title: 'Reduce manual operations by 40% via AI systems (Coaching + Readiness)', progress: 40, aiSupport: 'Roadmap goals defined, coaching tracking monthly progress' },
    { id: 'g3', title: 'Scale client delivery with self-serve + PM/CRM (all packages)', progress: 25, aiSupport: 'Portal + connectors live, project scopes tied to billing' }
  ],
  activities: [
    { id: 'a1', source: 'Zoom', date: '2026-09-28', summary: 'Kickoff call - defined 3 key goals for Acme lead funnel', linkedProjectId: 'proj-001' },
    { id: 'a2', source: 'read.ai', date: '2026-09-25', summary: 'Strategy session notes imported - coaching priorities updated', linkedProjectId: 'proj-001' }
  ] as MeetingActivity[]
};

// Lawyer Agent documents (checkbox style like bank disclosures)
const lawyerDocs = [
  { id: 'msa', label: 'Master Services Agreement (MSA)', desc: 'Governs all services, payments, IP ownership, confidentiality.' },
  { id: 'ai_policy', label: 'AI Usage & Data Policy', desc: 'How AI agents and tools use your data. Full confidentiality maintained.' },
  { id: 'liability', label: 'Limits of Liability & Disclaimers', desc: 'Caps and disclaimers for AI recommendations and outputs.' },
  { id: 'privacy', label: 'Privacy Policy & SSO Data', desc: 'Google/Microsoft login data handling in the portal.' },
];

export default function ClientPortal() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [userEmail, setUserEmail] = useState("");
  const [isInternal, setIsInternal] = useState(false);
  const [isMasterSuperAdmin, setIsMasterSuperAdmin] = useState(false);
  const [activeTab, setActiveTab] = useState<'dashboard' | 'projects' | 'crm' | 'connectors' | 'invoices' | 'contracts' | 'apply'>('dashboard');
  const [clientData, setClientData] = useState(defaultClientData);
  const [showWelcome, setShowWelcome] = useState(false);
  const [actionMessage, setActionMessage] = useState<string | null>(null);
  const [impersonatedClient, setImpersonatedClient] = useState<string | null>(null);

  // Lawyer Agent consent flow (new)
  const [showLawyerConsent, setShowLawyerConsent] = useState(false);
  const [consents, setConsents] = useState<Record<string, boolean>>({});
  const [consentTimestamp, setConsentTimestamp] = useState<string | null>(null);

  // Check if all required consents given
  const allConsented = lawyerDocs.every(d => consents[d.id]);

  // Mock applicant queue (pre-assessed by RecruitingAgent)
  const [applicants, setApplicants] = useState([
    { id: 'app1', name: 'Alex Rivera', role: 'AI PM', disc: 'High D/I', competence: '92%', status: 'Ready for interview', applied: '2026-06-28' },
    { id: 'app2', name: 'Sam Patel', role: 'AI Developer', disc: 'High C', competence: '87%', status: 'Queue', applied: '2026-06-29' },
  ]);

  useEffect(() => {
    if (typeof window === 'undefined') return;
    const params = new URLSearchParams(window.location.search);
    const login = params.get('demoLogin');
    const newProj = params.get('newProject');

    if (login) {
      const email = login === 'acme' ? 'client@acme.com' : 'ops@acme-corp.com';
      setUserEmail(email);
      setIsAuthenticated(true);

      const stored = localStorage.getItem('lawyerConsents_' + email);
      if (stored) {
        setConsents(JSON.parse(stored));
        setConsentTimestamp(localStorage.getItem('lawyerConsentTime_' + email));
      } else {
        setShowLawyerConsent(true);
      }

      if (newProj === 'true') {
        const newProject = {
          id: `proj-${Date.now()}`,
          title: "AI Project from Website Wizard",
          packageType: "Readiness",
          status: "In Progress",
          progress: 18,
          nextMilestone: "Kickoff scheduled by Ops Leader • Check back in portal",
          documents: ["Wizard Plan.pdf"],
          tasks: [] as ProjectTask[],
          packageScope: "Self-serve entry from website wizard. Initial project created in portal PM/CRM system with 3 key goals."
        };
        setClientData(prev => ({
          ...prev,
          projects: [...prev.projects, newProject]
        }));
        setActiveTab('projects');
        setShowWelcome(true);
        setTimeout(() => setShowWelcome(false), 6200);
      }
    }
  }, []);

  // NOTE: No real admin emails are ever exposed in the UI or client code.
  // Dev master testing is done via ?devmaster=1 (does not render any privileged emails).
  const handleSSOLogin = (provider: 'google' | 'microsoft') => {
    let mockEmail = provider === 'google' ? "client@acme.com" : "ops@acme-corp.com";
    
    const urlParams = (typeof window !== 'undefined') ? new URLSearchParams(window.location.search) : null;
    const isDevMaster = urlParams?.get('devmaster') === '1';
    
    if (isDevMaster) {
      mockEmail = 'dev-master@localhost'; // completely fake, never a real address
    }
    
    setUserEmail(mockEmail);
    setIsMasterSuperAdmin(isDevMaster);
    setIsInternal(isDevMaster || mockEmail.includes('ops@'));
    setIsAuthenticated(true);

    const stored = localStorage.getItem('lawyerConsents_' + mockEmail);
    if (stored) {
      setConsents(JSON.parse(stored));
      setConsentTimestamp(localStorage.getItem('lawyerConsentTime_' + mockEmail));
    } else {
      setShowLawyerConsent(true);
    }
    
    if (isDevMaster) {
      setActionMessage("Dev master mode active (via ?devmaster=1 only). This is not exposed publicly.");
      setTimeout(() => setActionMessage(null), 4000);
    }
  };

  const toggleConsent = (id: string) => {
    setConsents(prev => ({ ...prev, [id]: !prev[id] }));
  };

  const submitLawyerConsents = () => {
    if (!allConsented) return;
    const ts = new Date().toISOString();
    setConsentTimestamp(ts);
    localStorage.setItem('lawyerConsents_' + userEmail, JSON.stringify(consents));
    localStorage.setItem('lawyerConsentTime_' + userEmail, ts);
    setShowLawyerConsent(false);
    setActionMessage("✅ LawyerAgent: All disclosures agreed. Welcome to the portal. (MSA + AI Policy + Liability + Privacy recorded)");
    setTimeout(() => setActionMessage(null), 4500);
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

  // Lawyer Agent consent screen (presented on login)
  if (isAuthenticated && showLawyerConsent) {
    return (
      <div className="min-h-screen bg-white text-[#111] flex items-center justify-center p-6">
        <div className="max-w-2xl w-full">
          <div className="mb-6 text-center">
            <div className="inline-flex h-12 w-12 items-center justify-center rounded-full bg-[#0A66C2] text-white text-3xl mb-3">⚖️</div>
            <h1 className="text-3xl font-bold tracking-tight">LawyerAgent Review</h1>
            <p className="text-[#555] mt-2">Please review and check the boxes below (bank-style disclosures). All items required before accessing your projects, contracts, and AI systems.</p>
          </div>

          <div className="bg-white border border-[#E5E5E3] rounded-3xl p-8 space-y-4">
            {lawyerDocs.map(doc => (
              <label key={doc.id} className="flex gap-3 items-start p-4 border border-[#E5E5E3] rounded-2xl cursor-pointer hover:border-[#0A66C2]">
                <input
                  type="checkbox"
                  checked={!!consents[doc.id]}
                  onChange={() => toggleConsent(doc.id)}
                  className="mt-1 w-5 h-5 accent-[#0A66C2]"
                />
                <div>
                  <div className="font-semibold">{doc.label}</div>
                  <div className="text-sm text-[#666]">{doc.desc}</div>
                  <div className="text-[11px] text-[#888] mt-1">Download full: /contracts/ (MSA + SOW templates available)</div>
                </div>
              </label>
            ))}

            <button
              onClick={submitLawyerConsents}
              disabled={!allConsented}
              className="btn-primary w-full py-4 mt-4 disabled:opacity-40"
            >
              I have read and agree to all — Enter Portal
            </button>
            <p className="text-center text-xs text-[#666]">LawyerAgent • Timestamp will be recorded. This is required for every new engagement or team member.</p>
          </div>

          <div className="text-center mt-6">
            <Link href="/" className="text-sm text-[#C6FF3A] hover:underline">← Back to betterwithai.io</Link>
          </div>
        </div>
      </div>
    );
  }

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
              Sign in with Google (Client Demo)
            </button>
            <button 
              onClick={() => handleSSOLogin('microsoft')}
              className="w-full btn-secondary flex items-center justify-center gap-3 py-4 text-base"
            >
              Sign in with Microsoft 365 (Client Demo)
            </button>
            
            {/* 
              DEV ACCESS ONLY
              To test as master, append ?devmaster=1 to the URL.
              This does NOT display any real email addresses.
              Never ship with visible master login buttons containing real privileged accounts.
            */}
          </div>

          <p className="mt-9 text-sm text-[#666] leading-snug">
            Same login you use for work. Projects, contracts, invoices, status — all in one place. Tesla-simple.
          </p>
          <Link href="/" className="block mt-5 text-sm text-[#C6FF3A] hover:underline">← Back to betterwithai.io</Link>
        </div>
      </div>
    );
  }

  const client = clientData;

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
            {isMasterSuperAdmin && (
              <span className="px-2 py-0.5 bg-amber-600 text-white text-[10px] font-bold rounded tracking-wider">DEV MASTER</span>
            )}
            {isInternal && !isMasterSuperAdmin && (
              <span className="px-2 py-0.5 bg-amber-600 text-white text-[10px] font-bold rounded">INTERNAL TEAM</span>
            )}
            <button onClick={() => { setIsAuthenticated(false); setIsMasterSuperAdmin(false); setIsInternal(false); setImpersonatedClient(null); setShowLawyerConsent(false); setConsents({}); }} className="text-[#0A66C2] hover:underline">Sign out</button>
          </div>
        </div>
      </div>

      <div className="max-w-6xl mx-auto px-6 py-8">
        {consentTimestamp && (
          <div className="mb-4 text-xs text-[#666]">LawyerAgent consents recorded {new Date(consentTimestamp).toLocaleString()}</div>
        )}

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
          
          <div className="mt-4 p-5 bg-white/5 rounded-2xl border border-white/10 text-sm">
            <div className="uppercase tracking-[2px] text-[#C6FF3A] text-xs mb-1">LIVE FROM THE AGENT SYSTEM</div>
            <div className="font-semibold text-lg text-[#111]">Roadmap delivered • New wizard project queued • Agents handling delivery</div>
            <div className="mt-1 text-[#666]">Check in whenever. We&apos;ll ping you only when you&apos;re needed.</div>
          </div>
        </div>

        {/* Tabs */}
        <div className="flex border-b border-white/10 mb-8 overflow-x-auto">
          {(['dashboard', 'projects', ...(isInternal ? ['crm', 'connectors', 'apply'] as const : []), 'invoices', 'contracts'] as const).map(tab => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={`px-6 py-3 text-sm font-medium border-b-2 transition-colors whitespace-nowrap ${activeTab === tab ? 'border-[#0A66C2] text-[#0A66C2]' : 'border-transparent text-[#666] hover:text-[#111]'}`}
            >
              {tab === 'crm' ? 'CRM' : tab === 'apply' ? 'Join Team (Apply)' : tab.charAt(0).toUpperCase() + tab.slice(1)}
            </button>
          ))}
        </div>

        {isInternal && (
          <div className="mb-4 text-xs px-3 py-1 bg-amber-100 text-amber-800 inline-block rounded">DEV / INTERNAL VIEW</div>
        )}

        {isMasterSuperAdmin && (
          <div className="mb-6 p-4 bg-amber-50 border border-amber-200 rounded-2xl text-sm">
            <div className="font-semibold text-amber-700 mb-2">DEV MASTER MODE (only via ?devmaster=1)</div>
            <div className="text-xs text-[#666]">This UI is only reachable with the secret dev flag. Never exposed to normal visitors.</div>
          </div>
        )}

        {/* Dashboard */}
        {activeTab === 'dashboard' && (
          <div className="mb-12">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-2xl font-semibold">3 Key Company Goals</h2>
              <div className="text-xs px-3 py-1 bg-[#C6FF3A] text-[#111] rounded font-medium">LIVE AGENT TRACKED</div>
            </div>
            <div className="grid gap-4">
              {client.keyGoals.map(g => (
                <div key={g.id} className="border border-[#E5E5E3] rounded-2xl p-5">
                  <div className="flex justify-between mb-2">
                    <div className="font-semibold">{g.title}</div>
                    <div className="text-[#0A66C2] text-sm">{g.progress}%</div>
                  </div>
                  <div className="h-2 bg-[#F0F0EE] rounded mb-2">
                    <div className="h-2 bg-[#0A66C2] rounded" style={{width: g.progress + '%'}}></div>
                  </div>
                  <div className="text-sm text-[#666]">{g.aiSupport}</div>
                </div>
              ))}
            </div>
          </div>
        )}

        {activeTab === 'projects' && (
          <div className="space-y-6">
            {client.projects.map(p => (
              <div key={p.id} className="border border-[#E5E5E3] rounded-3xl p-6">
                <div className="flex items-start justify-between mb-4">
                  <div>
                    <div className="font-semibold text-xl">{p.title}</div>
                    <div className="text-sm text-[#666]">{p.packageType} • {p.packageScope}</div>
                  </div>
                  <div className="text-right">
                    <div className="text-sm font-medium">{p.status}</div>
                    <div className="text-xs text-[#0A66C2]">{p.progress}% complete</div>
                  </div>
                </div>

                <div className="mb-4">
                  <div className="h-2 bg-[#F0F0EE] rounded-full overflow-hidden"><div className="h-2 bg-[#0A66C2]" style={{width: p.progress+'%'}} /></div>
                </div>

                <div className="text-sm mb-2 text-[#666]">Next: {p.nextMilestone}</div>

                <div className="flex flex-wrap gap-2 mt-4">
                  {p.tasks.map(t => (
                    <span key={t.id} className={`text-xs px-3 py-1 rounded-full border ${t.status==='done' ? 'bg-green-50 border-green-200' : t.status==='in-progress' ? 'bg-amber-50 border-amber-200' : 'bg-white border-[#E5E5E3]'}`}>
                      {t.title} {t.status !== 'todo' && '• ' + t.status}
                    </span>
                  ))}
                </div>
              </div>
            ))}
          </div>
        )}

        {activeTab === 'contracts' && (
          <div>
            <div className="mb-4 text-sm text-[#666]">Managed by LawyerAgent. All agreements timestamped on login.</div>
            {client.contracts.map(c => (
              <div key={c.id} className="border border-[#E5E5E3] rounded-2xl p-5 mb-3 flex justify-between items-center">
                <div>
                  <div className="font-medium">{c.title}</div>
                  <div className="text-sm text-[#666]">{c.status}{c.signedDate ? ` • ${c.signedDate}` : ''}</div>
                </div>
                {c.status === 'Pending Signature' ? (
                  <button onClick={() => handleSignContract(c.id)} className="btn-primary px-5 py-2 text-sm">Sign with LawyerAgent</button>
                ) : <span className="text-green-600 text-sm">Signed ✓</span>}
              </div>
            ))}
          </div>
        )}

        {activeTab === 'apply' && isInternal && (
          <div>
            <div className="mb-3">
              <div className="font-semibold">AI PM / Developer Applicant Queue (RecruitingAgent)</div>
              <div className="text-xs text-[#666]">Pre-screened: DISC + competence assessments completed before reaching this queue.</div>
            </div>
            {applicants.map(a => (
              <div key={a.id} className="border border-[#E5E5E3] rounded-2xl p-4 mb-2 flex justify-between">
                <div>
                  <span className="font-medium">{a.name}</span> — {a.role}<br />
                  <span className="text-xs">DISC: {a.disc} • Competence: {a.competence}</span>
                </div>
                <div className="text-right text-sm">
                  {a.status} <span className="text-[#888]">• applied {a.applied}</span>
                  <div><button onClick={() => setActionMessage('Interview scheduled for ' + a.name + ' (simulated)')} className="text-xs underline">Schedule human interview</button></div>
                </div>
              </div>
            ))}
          </div>
        )}

        {activeTab === 'invoices' && (
          <div className="space-y-3">
            {client.invoices.map(inv => (
              <div key={inv.id} className="flex items-center justify-between border border-[#E5E5E3] rounded-2xl p-4">
                <div>{inv.description} • ${inv.amount}</div>
                <div>
                  {inv.status === 'Paid' ? <span className="text-green-600">Paid</span> : <button onClick={() => handlePayInvoice(inv.id)} className="btn-primary px-4 py-1 text-sm">Pay now</button>}
                </div>
              </div>
            ))}
          </div>
        )}

        {activeTab === 'crm' && isInternal && (
          <div>
            <div className="text-sm mb-2">Internal CRM (Dev view)</div>
            {client.crmClients.map(c => <div key={c.id} className="border p-3 mb-2 rounded">{c.name} — {c.status} — last {c.lastActivity}</div>)}
          </div>
        )}
      </div>
    </div>
  );
}
