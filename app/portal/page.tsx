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

export default function ClientPortal() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [userEmail, setUserEmail] = useState("");
  const [isInternal, setIsInternal] = useState(false); // Internal team vs client view
  const [isMasterSuperAdmin, setIsMasterSuperAdmin] = useState(false);
  const [activeTab, setActiveTab] = useState<'dashboard' | 'projects' | 'crm' | 'connectors' | 'invoices' | 'contracts'>('dashboard');
  const [clientData, setClientData] = useState(defaultClientData);
  const [showWelcome, setShowWelcome] = useState(false);
  const [actionMessage, setActionMessage] = useState<string | null>(null);
  const [impersonatedClient, setImpersonatedClient] = useState<string | null>(null); // For admins to view as client

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
        // Auto-hide the welcome banner after a bit
        setTimeout(() => setShowWelcome(false), 6200);
      }
    }
  }, []);

  // Real implementation later:
  // Supabase + Google/Microsoft Entra SSO. Payment webhooks update projects/invoices/contracts.
  const handleSSOLogin = (provider: 'google' | 'microsoft', role?: 'internal' | 'client') => {
    let mockEmail = provider === 'google' ? "client@acme.com" : "ops@acme-corp.com";
    
    // Master Super Admin logins
    const masterEmails = ["mdmoore1379@gmail.com", "michael@betterwithai.io"];
    if (role === 'internal' && provider === 'google') {
      // Simulate choosing one of the master emails
      mockEmail = masterEmails[0]; // Default to first, in real would come from Google
    }
    
    setUserEmail(mockEmail);
    const isMaster = masterEmails.includes(mockEmail.toLowerCase());
    setIsMasterSuperAdmin(isMaster);
    setIsInternal(isMaster || role === 'internal' || mockEmail.includes('ops@'));
    setIsAuthenticated(true);
    
    if (isMaster) {
      setActionMessage("Master Super Admin access granted. Full control over all clients, projects, goals, and connectors.");
      setTimeout(() => setActionMessage(null), 4000);
    }
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
              Sign in with Google (Client Demo)
            </button>
            <button 
              onClick={() => handleSSOLogin('microsoft')}
              className="w-full btn-secondary flex items-center justify-center gap-3 py-4 text-base"
            >
              Sign in with Microsoft 365 (Client Demo)
            </button>
            
            <div className="pt-3 border-t border-[#E5E5E3]">
              <div className="text-xs text-[#666] mb-2 font-semibold">MASTER SUPER ADMIN (Google SSO)</div>
              <button 
                onClick={() => { 
                  setUserEmail("mdmoore1379@gmail.com"); 
                  setIsAuthenticated(true); 
                  setIsMasterSuperAdmin(true); 
                  setIsInternal(true); 
                  setActionMessage("Welcome, Master Super Admin (mdmoore1379@gmail.com). Full system access enabled.");
                  setTimeout(() => setActionMessage(null), 3000);
                }}
                className="w-full border-2 border-[#0A66C2] text-[#0A66C2] hover:bg-[#0A66C2] hover:text-white py-3 text-sm rounded-full mb-2 font-medium"
              >
                Sign in as mdmoore1379@gmail.com (Google)
              </button>
              <button 
                onClick={() => { 
                  setUserEmail("michael@betterwithai.io"); 
                  setIsAuthenticated(true); 
                  setIsMasterSuperAdmin(true); 
                  setIsInternal(true); 
                  setActionMessage("Welcome, Master Super Admin (michael@betterwithai.io). Full system access enabled.");
                  setTimeout(() => setActionMessage(null), 3000);
                }}
                className="w-full border-2 border-[#0A66C2] text-[#0A66C2] hover:bg-[#0A66C2] hover:text-white py-3 text-sm rounded-full font-medium"
              >
                Sign in as michael@betterwithai.io (Google)
              </button>
              <p className="text-[10px] text-[#888] mt-1">In production these will trigger real Google OAuth with your accounts.</p>
            </div>
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
            {isMasterSuperAdmin && (
              <span className="px-2 py-0.5 bg-[#0A66C2] text-white text-[10px] font-bold rounded tracking-wider">MASTER SUPER ADMIN</span>
            )}
            {isInternal && !isMasterSuperAdmin && (
              <span className="px-2 py-0.5 bg-amber-600 text-white text-[10px] font-bold rounded">INTERNAL TEAM</span>
            )}
            <button onClick={() => { setIsAuthenticated(false); setIsMasterSuperAdmin(false); setIsInternal(false); setImpersonatedClient(null); }} className="text-[#0A66C2] hover:underline">Sign out</button>
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
        <div className="flex border-b border-white/10 mb-8 overflow-x-auto">
          {(['dashboard', 'projects', ...(isInternal ? ['crm', 'connectors'] as const : []), 'invoices', 'contracts'] as const).map(tab => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={`px-6 py-3 text-sm font-medium border-b-2 transition-colors whitespace-nowrap ${activeTab === tab ? 'border-[#0A66C2] text-[#0A66C2]' : 'border-transparent text-[#666] hover:text-[#111]'}`}
            >
              {tab === 'crm' ? 'CRM' : tab.charAt(0).toUpperCase() + tab.slice(1)}
            </button>
          ))}
        </div>

        {isInternal && (
          <div className="mb-4 text-xs px-3 py-1 bg-amber-100 text-amber-800 inline-block rounded">INTERNAL TEAM VIEW — Full CRM + Connectors + All Clients</div>
        )}

        {isMasterSuperAdmin && (
          <div className="mb-6 p-4 bg-[#0A66C2]/5 border border-[#0A66C2]/20 rounded-2xl text-sm">
            <div className="font-semibold text-[#0A66C2] mb-2">MASTER SUPER ADMIN CONTROLS</div>
            <div className="flex flex-wrap gap-3 items-center">
              <button 
                onClick={() => {
                  const pkg = window.prompt("Select package: Readiness ($7500 one-time), Coaching ($7500/mo), or Implementation ($7500/mo for 20 hrs + access)") || "Implementation";
                  const clientName = window.prompt("Client name?") || "New Client";
                  const newProject = {
                    id: `proj-${Date.now()}`,
                    title: window.prompt("Project title?") || `${pkg} for ${clientName}`,
                    packageType: pkg,
                    status: "In Progress",
                    progress: 5,
                    nextMilestone: "Kickoff scheduled",
                    documents: [],
                    tasks: [{ id: 'new1', title: 'Define scope & align to 3 key goals', status: 'todo' as const }],
                    packageScope: pkg === "Readiness" ? "One-time $7500: Assessment, 3 goals setup, PM/CRM project creation, connectors configured." : pkg === "Coaching" ? "$7500/mo: Sessions, knowledge access, goal tracking." : "$7500/mo: 20 implementation hours + full AI systems, agents, knowledge access. All tracked to goals."
                  };
                  setClientData(prev => ({
                    ...prev,
                    projects: [...prev.projects, newProject],
                    crmClients: [...prev.crmClients, { id: `c${Date.now()}`, name: clientName, email: `${clientName.toLowerCase().replace(/\s/g,'')}@example.com`, status: 'Active', deals: 1, lastActivity: new Date().toISOString().split('T')[0] }]
                  }));
                  setActiveTab('projects');
                }}
                className="px-4 py-1 bg-white border border-[#0A66C2] text-[#0A66C2] rounded-full text-xs font-medium hover:bg-[#0A66C2] hover:text-white"
              >
                + Create Project for Client (Productized Package)
              </button>
              <button 
                onClick={() => {
                  const goalId = window.prompt("Which goal to update? (g1, g2, or g3)") || 'g1';
                  const newProg = parseInt(window.prompt("New progress % (0-100)?") || "50");
                  setClientData(prev => ({
                    ...prev,
                    keyGoals: prev.keyGoals.map(g => g.id === goalId ? {...g, progress: Math.min(100, Math.max(0, newProg))} : g)
                  }));
                }}
                className="px-4 py-1 bg-white border border-[#0A66C2] text-[#0A66C2] rounded-full text-xs font-medium hover:bg-[#0A66C2] hover:text-white"
              >
                Update Goal Progress
              </button>
              <span className="text-xs text-[#666]">As Master you control all goals, projects, and connectors globally.</span>
            </div>
          </div>
        )}

        {/* Dashboard - 3 Key Company Goals (AI heavily enabled) */}
        {activeTab === 'dashboard' && (
          <div className="mb-12">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-2xl font-semibold">3 Key Company Goals</h2>
              <div className="text-xs px-3 py-1 bg-[#C6FF3A] text-[#0B0B0F] rounded font-bold">HEAVILY AI-ENABLED + TEAM SUPPORTED</div>
            </div>
            <p className="text-[#555] mb-6 max-w-2xl">All projects, coaching, implementation, and connectors funnel into these 3 goals. Progress tracked automatically via agents and meeting imports.</p>
            
            <div className="grid gap-6 md:grid-cols-3">
              {client.keyGoals.map(goal => (
                <div key={goal.id} className="card p-6">
                  <div className="text-sm text-[#0A66C2] mb-1">GOAL</div>
                  <h3 className="font-semibold text-lg leading-tight mb-4">{goal.title}</h3>
                  
                  <div className="mb-4">
                    <div className="flex justify-between text-xs mb-1"><span>Progress</span><span className="font-mono">{goal.progress}%</span></div>
                    <div className="h-2 bg-[#E5E5E3] rounded"><div className="h-2 bg-[#0A66C2] rounded" style={{width: `${goal.progress}%`}}></div></div>
                  </div>

                  <div className="text-sm">
                    <div className="text-[#666] mb-1 text-xs uppercase tracking-widest">AI + Team Support</div>
                    <p className="text-[#333]">{goal.aiSupport}</p>
                  </div>

                  <div className="mt-4 pt-4 border-t border-[#E5E5E3] text-xs text-[#0A66C2]">Tracked in PM • Updated via connectors • AI insights weekly</div>
                </div>
              ))}
            </div>

            <div className="mt-6 text-xs text-[#666]">These goals are defined during AI Readiness. All ongoing work (Coaching/Implementation) directly enables them. No more than 3 — focus is everything.</div>
          </div>
        )}

        {/* Projects Tab - Enhanced PM with package scopes and tasks */}
        {activeTab === 'projects' && (
          <div>
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-2xl font-semibold">Projects ({isInternal ? 'All Clients' : 'Your'})</h2>
              {isInternal && (
                <button 
                  onClick={() => {
                    const pkg = prompt("Package? (Readiness / Coaching / Implementation)") || "Implementation";
                    const newP = {
                      id: `proj-${Date.now()}`,
                      title: prompt("Project title?") || "New AI Project",
                      packageType: pkg,
                      status: "In Progress",
                      progress: 10,
                      nextMilestone: "Kickoff this week",
                      documents: [],
                      tasks: [{ id: 'nt1', title: 'Define scope & tie to 3 goals', status: 'todo' as const }],
                      packageScope: pkg === 'Readiness' ? 'One-time $7500: Assessment + 3 goals + PM setup' : pkg === 'Coaching' ? '$7500/mo: Sessions + goal tracking' : '$7500/mo: 20 hrs + full systems access'
                    };
                    setClientData(prev => ({ ...prev, projects: [...prev.projects, newP] }));
                  }}
                  className="btn-secondary text-sm"
                >
                  + New Project (Internal)
                </button>
              )}
            </div>
            <div className="grid gap-6 md:grid-cols-2">
              {client.projects.map(project => (
                <div key={project.id} className="card p-6">
                  <div className="flex justify-between items-start mb-3">
                    <div>
                      <div className="flex items-center gap-2">
                        <h3 className="font-semibold text-lg">{project.title}</h3>
                        <span className="text-xs px-2 py-0.5 bg-[#E5E5E3] rounded">{project.packageType}</span>
                      </div>
                      <span className={`inline-block mt-1 px-2 py-0.5 text-xs rounded font-medium ${project.status === 'Completed' ? 'bg-green-200 text-green-800' : 'bg-amber-200 text-amber-800'}`}>
                        {project.status}
                      </span>
                    </div>
                    <div className="text-right">
                      <div className="text-2xl font-bold">{project.progress}%</div>
                    </div>
                  </div>
                  
                  <div className="h-2 bg-[#E5E5E3] rounded mb-3">
                    <div className="h-2 bg-[#0A66C2] rounded" style={{width: `${project.progress}%`}}></div>
                  </div>

                  <p className="text-sm text-[#555] mb-3">{project.nextMilestone}</p>

                  <div className="mb-4">
                    <div className="text-xs uppercase tracking-widest text-[#666] mb-1">Scope / Package</div>
                    <div className="text-sm bg-[#F8F8F6] p-3 rounded text-[#333]">{(project as any).packageScope || 'See offer details'}</div>
                  </div>

                  {(project as any).tasks && (
                    <div className="mb-4">
                      <div className="text-xs text-[#666] mb-1">Tasks (PM)</div>
                      <ul className="text-sm space-y-1">
                        {(project as any).tasks.map((t: ProjectTask) => (
                          <li key={t.id} className="flex items-center gap-2">
                            <input type="checkbox" checked={t.status === 'done'} readOnly className="accent-[#0A66C2]" /> 
                            <span className={t.status === 'done' ? 'line-through text-[#888]' : ''}>{t.title}</span>
                            {t.hoursUsed && <span className="text-xs text-[#666]">({t.hoursUsed}h)</span>}
                          </li>
                        ))}
                      </ul>
                    </div>
                  )}

                  <div>
                    <div className="text-xs text-[#666] mb-2">Documents &amp; Artifacts</div>
                    <ul className="space-y-1 text-sm">
                      {project.documents.map((doc, i) => (
                        <li key={i} className="flex items-center gap-2">
                          <span>📄</span> 
                          <a href="#" className="hover:text-[#0A66C2]">{doc}</a>
                        </li>
                      ))}
                    </ul>
                  </div>

                  <button className="mt-6 w-full border border-[#0F0F0F] text-[#0F0F0F] hover:bg-[#F0F0EE] hover:border-[#0F0F0F] text-sm py-2.5 rounded-full font-medium">View Full Project + AI Insights</button>
                </div>
              ))}
            </div>

            <div className="mt-8 card p-6">
              <h3 className="font-semibold mb-2">Start a new project</h3>
              <p className="text-sm text-[#555] mb-4">Select package for clear scope tied to PM/CRM and the 3 key goals.</p>
              <div className="flex gap-3 flex-wrap">
                <Link href="/#wizard" className="btn-primary flex-1 justify-center">Start AI Readiness ($7,500 one-time)</Link>
                <Link href="/#wizard" className="btn-secondary flex-1 justify-center">Start Coaching or Implementation</Link>
              </div>
            </div>
          </div>
        )}

        {/* CRM Tab (Internal Team Only) */}
        {activeTab === 'crm' && isInternal && (
          <div>
            <h2 className="text-2xl font-semibold mb-6">CRM — Clients & Pipeline</h2>
            <div className="grid gap-4">
              {client.crmClients.map(c => (
                <div key={c.id} className="card p-5 flex justify-between items-center">
                  <div>
                    <div className="font-medium">{c.name} <span className="text-xs text-[#666]">({c.email})</span></div>
                    <div className="text-sm text-[#555]">Status: {c.status} • Deals: {c.deals} • Last: {c.lastActivity}</div>
                  </div>
                  <div className="flex gap-2">
                    <button onClick={() => setActionMessage(`Opened ${c.name} in full CRM view (mock)`)} className="btn-secondary text-sm">View Details</button>
                    <button onClick={() => {
                      const note = prompt("Log activity/note for CRM:");
                      if (note) setActionMessage(`Logged to ${c.name}: ${note}`);
                    }} className="text-sm px-4 border border-[#0F0F0F] rounded-full">Log Activity</button>
                  </div>
                </div>
              ))}
            </div>
            <p className="mt-4 text-xs text-[#666]">Full CRM: Deals pipeline, contacts, notes, linked projects. All tied to package billing and goal progress.</p>
          </div>
        )}

        {/* Connectors Tab (Internal + Client) */}
        {activeTab === 'connectors' && (
          <div>
            <h2 className="text-2xl font-semibold mb-6">Connectors — Auto-Import Everything</h2>
            <p className="mb-6 text-[#555]">Connect your meeting and note tools. Transcripts, action items, and decisions flow automatically into projects, CRM activity, and progress against the 3 key goals.</p>
            
            <div className="grid gap-4 md:grid-cols-3">
              {['Zoom', 'Google Meet', 'read.ai'].map(tool => (
                <div key={tool} className="card p-6">
                  <div className="font-semibold mb-2">{tool}</div>
                  <div className="text-sm text-[#555] mb-4">Meetings &amp; notes imported to project activity + CRM. AI summarizes against goals.</div>
                  <button 
                    onClick={() => {
                      const sample = { id: `act-${Date.now()}`, source: tool, date: new Date().toISOString().split('T')[0], summary: `Sample ${tool} call: Updated lead funnel goals, 2 action items logged to proj-001`, linkedProjectId: 'proj-001' };
                      setClientData(prev => ({ 
                        ...prev, 
                        activities: [...(prev.activities || []), sample],
                        keyGoals: prev.keyGoals.map((g, i) => i === 0 ? { ...g, progress: Math.min(100, g.progress + 3) } : g) // Simulate AI impact on goal 1
                      }));
                      setActionMessage(`${tool} connected & data imported. Goal progress updated via connector.`);
                      setTimeout(() => setActionMessage(null), 2500);
                    }}
                    className="btn-primary w-full text-sm"
                  >
                    Connect {tool}
                  </button>
                </div>
              ))}
            </div>

            <div className="mt-8">
              <h3 className="font-semibold mb-3">Recent Imported Activity</h3>
              <div className="space-y-3 text-sm">
                {(client as any).activities?.map((act: any, i: number) => (
                  <div key={i} className="card p-4 text-xs">
                    <div className="font-mono text-[#666]">{act.date} • {act.source}</div>
                    <div>{act.summary}</div>
                    {act.linkedProjectId && <div className="text-[#0A66C2]">Linked to project {act.linkedProjectId}</div>}
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* Invoices Tab */}
        {activeTab === 'invoices' && (
          <div>
            <h2 className="text-2xl font-semibold mb-6">Invoices &amp; Payments (tied to packages)</h2>
            <div className="space-y-4">
              {client.invoices.map(invoice => (
                <div key={invoice.id} className="card p-6 flex items-center justify-between">
                  <div>
                    <div className="font-medium">{invoice.description}</div>
                    <div className="text-sm text-[#666]">Due {invoice.due} • ${invoice.amount.toLocaleString()}</div>
                  </div>
                  <div className="flex items-center gap-4">
                    <span className={`px-3 py-1 text-xs rounded font-medium ${invoice.status === 'Paid' ? 'bg-green-200 text-green-800' : 'bg-red-200 text-red-800'}`}>
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
            <p className="mt-6 text-xs text-[#666]">Payments processed securely. Receipts and history available in your account. Scopes clear in linked projects.</p>
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
                    <span className={`px-3 py-1 text-xs rounded font-medium ${contract.status === 'Signed' ? 'bg-green-200 text-green-800' : 'bg-amber-200 text-amber-800'}`}>
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

        <div className="mt-12 text-center text-xs text-[#666]">
          All data syncs with our agent system and 3 key goals. Connectors (Zoom/Meet/read.ai) feed planning back here. Packages (Readiness $7500 one-time, Coaching $7500/mo, Implementation $7500/mo) have clear scopes tied to PM/CRM.
        </div>
      </div>
    </div>
  );
}
