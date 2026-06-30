"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { Menu, X, ArrowRight } from "lucide-react";
import BrainMascot from "./components/BrainMascot";
import PlanningWizard from "./components/PlanningWizard";
import { offers, coreBeliefPillars } from "./data/offers";

const BOOKING_URL = "https://calendly.com/michaeldmoore/30-virtual-call?back=1";

export default function BetterWithAI() {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [mascotHeroState, setMascotHeroState] = useState<"frazzled" | "calm">("frazzled");

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 180) {
        setMascotHeroState("calm");
      } else {
        setMascotHeroState("frazzled");
      }
    };
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const navItems = [
    { label: "How it works", href: "#how-it-works" },
    { label: "Pricing", href: "#pricing" },
    { label: "For Everyone", href: "#for-everyone" },
    { label: "Resources", href: "/resources" },
  ];

  const scrollTo = (id: string) => {
    setMobileOpen(false);
    const el = document.getElementById(id.replace("#", ""));
    if (el) {
      el.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  };

  const parties = [
    { title: "Clients", desc: "Self-serve roadmap in minutes. Beautiful portal. Agents run everything.", cta: "Start configurator", href: "#wizard" },
    { title: "Prospective Clients", desc: "Free audit, easy scoping, instant value. See before you buy.", cta: "Free audit", href: "#wizard" },
    { title: "Owners (like Michael)", desc: "Executive command center. Freedom metrics. All parties in one view.", cta: "Owner view", href: "/portal" },
    { title: "Project Managers", desc: "Attractive dashboards, smart tasks, progress, team coordination.", cta: "PM tools", href: "/portal" },
    { title: "AI Developers", desc: "Easy apply with assessments. Matched projects. Code & agent tools.", cta: "Join as dev", href: "/portal" },
    { title: "Sales Tax Auditors", desc: "Compliance dashboards, tax calculators, audit-ready reports.", cta: "Auditor tools", href: "/portal" },
    { title: "Accountants", desc: "Beautiful finance tools, invoicing, reports, reconciliation.", cta: "Accountant portal", href: "/portal" },
    { title: "Lawyers", desc: "Contract generator, reviews, disclosures, compliance.", cta: "Legal tools", href: "/portal" },
    { title: "Sales & BD", desc: "Lead tools, proposals, nurturing, closing support.", cta: "Sales view", href: "/portal" },
    { title: "Support & Ops", desc: "Helpdesk, alerts, resource allocation, SLA tracking.", cta: "Ops tools", href: "/portal" },
    { title: "Marketing & Content", desc: "Content machine, SEO, case studies, social.", cta: "Content tools", href: "/resources" },
    { title: "Compliance & HR", desc: "Security, privacy, recruiting, performance, training.", cta: "Team tools", href: "/portal" },
  ];

  return (
    <div className="min-h-screen bg-white text-[#0F0F0F] selection:bg-[#0A66C2] selection:text-white">
      <nav className="fixed top-0 left-0 right-0 z-50 border-b border-[#E5E5E3] bg-white/95 backdrop-blur-md">
        <div className="mx-auto flex max-w-6xl items-center justify-between px-6 py-4">
          <a href="#" className="flex items-center gap-2.5 text-xl font-semibold tracking-[-0.6px]">
            <span className="inline-block w-6 h-[1px] bg-[#0F0F0F] relative">
              <span className="absolute -top-[3px] left-1/2 w-[5px] h-[5px] -translate-x-1/2 bg-[#0F0F0F] rounded-full"></span>
            </span>
            betterwithai
          </a>

          <div className="hidden items-center gap-8 text-sm font-medium md:flex">
            {navItems.map((item) => (
              <button
                key={item.label}
                onClick={() => scrollTo(item.href)}
                className="nav-link text-[#555] hover:text-[#0F0F0F]"
              >
                {item.label}
              </button>
            ))}
          </div>

          <div className="hidden items-center gap-3 md:flex">
            <a href="#wizard" className="btn-primary text-sm px-6">Start the configurator</a>
            <a href="/portal" className="text-sm text-[#555] hover:text-[#0F0F0F]">Client portal</a>
          </div>

          <button onClick={() => setMobileOpen(!mobileOpen)} className="md:hidden rounded-lg p-2 text-[#555] hover:bg-[#F8F8F6]" aria-label="Toggle menu">
            {mobileOpen ? <X size={20} /> : <Menu size={20} />}
          </button>
        </div>

        {mobileOpen && (
          <div className="md:hidden border-t border-[#E5E5E3] bg-white px-6 py-6">
            <div className="flex flex-col gap-4 text-lg">
              {navItems.map((item) => (
                <button key={item.label} onClick={() => scrollTo(item.href)} className="text-left py-1 text-[#555] active:text-[#0F0F0F]">
                  {item.label}
                </button>
              ))}
              <a href="#wizard" className="btn-primary mt-1 w-full justify-center">Start the configurator</a>
              <a href="/portal" className="btn-secondary mt-2 w-full justify-center">Client portal</a>
            </div>
          </div>
        )}
      </nav>

      <section className="min-h-[90vh] flex items-center pt-8 border-b border-[#E5E5E3]">
        <div className="mx-auto max-w-[860px] px-6 text-center">
          <div className="mb-3 text-sm tracking-[3px] text-[#0A66C2] font-medium">AI THAT ACTUALLY BUYS YOU FREEDOM</div>
          <h1 className="text-6xl md:text-[76px] font-semibold tracking-[-3.8px] leading-[.92] mb-6">
            The systems do the work.<br />You live the life.
          </h1>
          <p className="max-w-lg mx-auto text-2xl text-[#333333] mb-10">
            A modern self-serve AI operating system built for everyone. Clients, PMs, devs, auditors, accountants, lawyers, owners — all have beautiful, easy experiences.
          </p>
          <p className="text-sm text-[#0A66C2] mb-4">Starting at $1,497 • 3 concrete moves guaranteed or full refund</p>

          <div className="flex items-center justify-center gap-4">
            <a href="#wizard" className="btn-primary text-lg px-9 py-4">Start the configurator</a>
            <a href="/portal" className="btn-secondary text-lg px-8 py-4">See the portal</a>
          </div>

          <p className="mt-6 text-sm text-[#666]">Join 40+ operators and teams running their world while they actually live.</p>
        </div>
      </section>

      <section id="wizard" className="section py-20 bg-white border-b border-[#E5E5E3]">
        <div className="mx-auto max-w-3xl px-6">
          <div className="text-center mb-8">
            <div className="text-[#0A66C2] text-xs tracking-[3px] mb-2">THE PRODUCT</div>
            <h2 className="text-5xl font-semibold tracking-[-2px] mb-4">Build your AI Roadmap.<br />Buy it in minutes.</h2>
            <p className="text-xl text-[#444444]">A few quick questions. One click. Your systems go live instantly in the portal. Designed for every party that touches the business.</p>
          </div>
          <PlanningWizard />
        </div>
      </section>

      <section className="section py-16 bg-[#FAFAF8] border-b border-[#E5E5E3]">
        <div className="mx-auto max-w-3xl px-6 text-center">
          <div className="text-[#0A66C2] text-xs tracking-[3px] mb-2">FREE START</div>
          <h3 className="text-4xl font-semibold tracking-tight mb-3">Get the 15-Minute AI Freedom Audit</h3>
          <p className="text-lg text-[#444] mb-6">Instant score + prioritized 3 moves. No email wall. Then upgrade when ready. Attractive for prospects and clients alike.</p>
          <a href="#wizard" className="btn-primary">Start free audit → (then configurator)</a>
        </div>
      </section>

      <section id="pricing" className="section py-20 bg-white border-b border-[#E5E5E3]">
        <div className="mx-auto max-w-3xl px-6">
          <div className="text-center mb-10">
            <h2 className="text-4xl font-semibold tracking-tight mb-2">Start here. Everything else is easier after.</h2>
          </div>

          <div className="max-w-md mx-auto">
            {offers.filter(o => o.stage !== 'future').slice(0,1).map((offer) => (
              <div key={offer.id} className="border border-[#111] p-8 rounded-2xl">
                <div className="flex justify-between items-start mb-6">
                  <div>
                    <div className="uppercase text-xs tracking-[2px] text-[#0A66C2] mb-1">{offer.tier}</div>
                    <div className="text-3xl font-semibold tracking-tight">{offer.title}</div>
                  </div>
                  <div className="text-right text-4xl font-semibold tracking-[-1px]">{offer.price}</div>
                </div>
                <p className="text-[#333] mb-8 text-[15px] leading-relaxed">{offer.description}</p>
                <a href={offer.ctaLink} target="_blank" rel="noopener noreferrer" className="btn-primary w-full justify-center mb-6">{offer.cta}</a>
                <div className="text-xs text-[#666] space-y-1">{offer.features.slice(0,3).map((f,i) => <div key={i}>• {f}</div>)}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section id="for-everyone" className="section py-20 bg-white border-b border-[#E5E5E3]">
        <div className="mx-auto max-w-6xl px-6">
          <div className="text-center mb-12">
            <div className="text-[#0A66C2] text-xs tracking-[3px] mb-2">BUILT FOR EVERYONE</div>
            <h2 className="text-5xl font-semibold tracking-[-2px] mb-4">Insanely attractive and easy for every party.</h2>
            <p className="text-xl text-[#444]">Clients, owners, PMs, AI devs, auditors, accountants, lawyers, sales, support — and anyone else. Role-specific experiences, agents, and tools.</p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {parties.map((p, i) => (
              <div key={i} className="border border-[#E5E5E3] p-6 rounded-2xl hover:border-[#0A66C2] transition-all group">
                <div className="font-semibold text-xl mb-2 group-hover:text-[#0A66C2]">{p.title}</div>
                <p className="text-[#555] mb-4 text-[15px]">{p.desc}</p>
                <a href={p.href} className="inline-flex items-center text-sm text-[#0A66C2] hover:underline">
                  {p.cta} <ArrowRight className="ml-1 w-4 h-4" />
                </a>
              </div>
            ))}
          </div>

          <div className="text-center mt-10">
            <a href="/portal" className="btn-primary">Open the portal (role based after login)</a>
            <p className="mt-2 text-sm text-[#666]">Login with Google/Microsoft. See the view tailored to your role.</p>
          </div>
        </div>
      </section>

      <section id="lifestyle" className="section py-16 border-b border-[#E5E5E3]">
        <div className="mx-auto max-w-2xl px-6 text-center">
          <h2 className="text-4xl font-semibold tracking-tight mb-4">This is what the system actually buys.</h2>
          <p className="text-xl text-[#333]">Time with your family. Real adventures. The ability to check your phone from a beach instead of a desk. For everyone involved.</p>
        </div>
      </section>

      <section id="how-it-works" className="section py-16 bg-[#FAFAF8]">
        <div className="mx-auto max-w-2xl px-6">
          <div className="text-center mb-8">
            <h3 className="text-3xl font-semibold tracking-tight">Three steps. No theater. For all parties.</h3>
          </div>
          <div className="space-y-5 text-lg text-[#333]">
            <div>1. Answer four questions or apply with assessments.</div>
            <div>2. Pay once (or join the team queue).</div>
            <div>3. Your AI world is live. Beautiful role-specific views. Agents and Telegram keep it running while you live.</div>
          </div>
        </div>
      </section>

      <section className="border-t border-[#E5E5E3] py-16 bg-white">
        <div className="mx-auto max-w-md px-6 text-center">
          <h3 className="text-3xl font-semibold tracking-tight mb-4">Your AI, in one beautiful place.</h3>
          <p className="text-[#444] mb-6">Google or Microsoft 365 login. Role-specific portals, contracts, status, agent chat. No email chains. Attractive for every party.</p>
          <Link href="/portal" className="btn-primary">Open the portal</Link>
        </div>
      </section>

      <footer className="border-t border-[#E5E5E3] py-10 text-xs text-[#666]">
        <div className="mx-auto max-w-5xl px-6 flex justify-between">
          <div>betterwithai</div>
          <div className="flex gap-x-5">
            <Link href="/resources">Resources</Link>
            <Link href="/terms">Terms</Link>
            <Link href="/privacy">Privacy</Link>
          </div>
          <div>© {new Date().getFullYear()}</div>
        </div>
      </footer>
    </div>
  );
}
