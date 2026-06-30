"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { Menu, X, ArrowRight } from "lucide-react";
import BrainMascot from "./components/BrainMascot";
import PlanningWizard from "./components/PlanningWizard";
import { offers, coreBeliefPillars } from "./data/offers";

const BOOKING_URL = "https://calendly.com/michaeldmoore/30-virtual-call?back=1"; // Only for bigger/custom work — Roadmap is fully self-serve

export default function BetterWithAI() {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [mascotHeroState, setMascotHeroState] = useState<"frazzled" | "calm">("frazzled");

  // Calm the hero mascot on scroll (as specified in brief)
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
    { label: "Lifestyle", href: "#lifestyle" },
    { label: "Pricing", href: "#pricing" },
    { label: "Resources", href: "/resources" },
    { label: "Portal", href: "/portal" },
  ];

  const scrollTo = (id: string) => {
    setMobileOpen(false);
    const el = document.getElementById(id.replace("#", ""));
    if (el) {
      el.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  };

  return (
    <div className="min-h-screen bg-[#0B0B0F] text-white selection:bg-[#C6FF3A] selection:text-[#0B0B0F]">
      {/* Sticky Nav - Premium, minimal */}
      <nav className="fixed top-0 left-0 right-0 z-50 border-b border-white/10 bg-[#0B0B0F]/95 backdrop-blur-md">
        <div className="mx-auto flex max-w-6xl items-center justify-between px-6 py-4">
          <a href="#" className="flex items-center gap-3 text-xl font-semibold tracking-[-0.5px]">
            <span className="inline-flex h-7 w-7 items-center justify-center rounded-full bg-[#C6FF3A] text-[#0B0B0F]">
              🧠
            </span>
            betterwithai
          </a>

          {/* Desktop nav */}
          <div className="hidden items-center gap-8 text-sm font-medium md:flex">
            {navItems.map((item) => (
              <button
                key={item.label}
                onClick={() => scrollTo(item.href)}
                className="nav-link text-white/90 hover:text-white"
              >
                {item.label}
              </button>
            ))}
          </div>

          <div className="hidden items-center gap-3 md:flex">
            <a
              href="#wizard"
              className="btn-secondary text-sm"
            >
              Configure Roadmap
            </a>
            <a
              href="/portal"
              className="btn-primary text-sm"
            >
              Open portal
            </a>
          </div>

          {/* Mobile menu button */}
          <button
            onClick={() => setMobileOpen(!mobileOpen)}
            className="md:hidden rounded-lg p-2 text-white/80 hover:bg-white/5"
            aria-label="Toggle menu"
          >
            {mobileOpen ? <X size={20} /> : <Menu size={20} />}
          </button>
        </div>

        {/* Mobile menu */}
        {mobileOpen && (
          <div className="md:hidden border-t border-white/10 bg-[#0B0B0F] px-6 py-6">
            <div className="flex flex-col gap-4 text-lg">
              {navItems.map((item) => (
                <button
                  key={item.label}
                  onClick={() => scrollTo(item.href)}
                  className="text-left py-1 text-white/90 active:text-white"
                >
                  {item.label}
                </button>
              ))}
              <a href="#wizard" className="btn-secondary mt-1 w-full justify-center">Configure Roadmap</a>
              <a
                href="/portal"
                className="btn-primary mt-2 w-full justify-center"
              >
                Open portal
              </a>
            </div>
          </div>
        )}
      </nav>

      {/* HERO — Minimal, powerful, confident */}
      <section className="relative min-h-[88vh] flex items-center pt-20">
        <div className="mx-auto max-w-5xl px-6 text-center">
          <div className="mb-10 flex justify-center">
            <BrainMascot state={mascotHeroState} size={200} />
          </div>

          <h1 className="text-7xl md:text-[84px] font-semibold tracking-[-4.2px] leading-[0.88] mb-8 text-balance">
            AI runs the business.<br />
            We live the life.
          </h1>

          <p className="max-w-xl mx-auto text-2xl text-[#A1A1AA] mb-12 leading-tight">
            The systems handle the work. We handle the adventure.
          </p>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-3">
            <a href="#wizard" className="btn-primary text-base px-9 py-4">
              Configure &amp; Buy Roadmap
            </a>
            <a href="/portal" className="btn-secondary text-base px-8 py-4">
              View portal
            </a>
          </div>

          <div className="mt-8 text-xs text-[#5A5A5F] tracking-[1.5px]">
            2 MINUTES • PAY SECURELY • INSTANT PORTAL ACCESS • NO CALL NEEDED
          </div>
        </div>
      </section>

      {/* THE WIZARD — The heart of the experience. Clean and focused. */}
      <section id="wizard" className="section border-t border-[#222225] py-20">
        <div className="mx-auto max-w-2xl px-6">
          <div className="text-center mb-12">
            <div className="text-xs tracking-[2px] text-[#C6FF3A] mb-3">FULLY SELF-SERVE — LIKE BUYING A TESLA</div>
            <h2 className="text-5xl md:text-6xl font-semibold tracking-[-2.8px] leading-none mb-5">
              Configure. Pay. Activated.<br />No call required.
            </h2>
            <p className="text-xl text-[#A1A1AA]">
              Four questions. Tailored plan. One click to buy.<br />Project live in the portal instantly. Tesla-simple.
            </p>
          </div>

          <PlanningWizard />
        </div>
      </section>

      {/* PRICING — Extremely clean and spacious */}
      <section id="pricing" className="section border-t border-[#222225] py-24">
        <div className="mx-auto max-w-4xl px-6">
          <div className="text-center mb-16">
            <div className="text-xs tracking-[2px] text-[#C6FF3A] mb-4">ROADMAP IS 100% SELF-SERVE</div>
            <h2 className="text-6xl font-semibold tracking-[-2.6px]">Buy it like a Tesla.<br />No call required.</h2>
          </div>

          <div className="grid md:grid-cols-3 gap-4">
            {offers.filter(o => o.stage !== 'future').map((offer, idx) => (
              <div key={offer.id} className={`card p-8 ${idx === 0 ? 'ring-1 ring-[#C6FF3A]/30' : ''}`}>
                <div className="uppercase text-[10px] tracking-[2px] text-[#C6FF3A] mb-3">{offer.tier}</div>
                <div className="text-[28px] font-semibold tracking-tight mb-1">{offer.title}</div>
                <div className="text-5xl font-semibold tracking-[-1.5px] mb-6 tabular-nums">{offer.price}</div>
                
                <p className="text-[#A1A1AA] mb-8 text-[15px] leading-relaxed">{offer.description}</p>

                <a href={offer.ctaLink} target="_blank" rel="noopener noreferrer" className="btn-primary w-full justify-center text-sm">
                  {offer.cta}
                </a>
              </div>
            ))}
          </div>

          <p className="text-center text-xs text-[#5A5A5F] mt-10 tracking-wide">
            ROADMAP IS 100% SELF-SERVE • PAY SECURELY • INSTANT PORTAL ACCESS
          </p>
        </div>
      </section>

      {/* LIFESTYLE — Powerful and quiet */}
      <section id="lifestyle" className="section border-t border-[#222225] py-24 bg-[#0A0A0C]">
        <div className="mx-auto max-w-3xl px-6 text-center">
          <div className="text-xs tracking-[2px] text-[#C6FF3A] mb-4">THE POINT</div>
          <h2 className="text-7xl md:text-[76px] font-semibold tracking-[-3.8px] leading-[0.9] mb-10">
            The systems do the work.<br />We do the living.
          </h2>
          <p className="text-2xl text-[#A1A1AA] max-w-lg mx-auto">
            We film our family from beaches, mountains, and cities while the agents close deals and deliver.
          </p>
        </div>
      </section>

      {/* THE FLOW — Minimal steps */}
      <section id="how-it-works" className="section py-20 border-t border-[#222225]">
        <div className="mx-auto max-w-3xl px-6">
          <div className="grid md:grid-cols-3 gap-x-12 gap-y-14 text-sm">
            {[
              { num: "01", title: "Configure", text: "Four questions in the wizard. Tailored plan generated instantly." },
              { num: "02", title: "Buy", text: "Pay securely. Contract auto-generated. No call, no back-and-forth." },
              { num: "03", title: "Portal", text: "Google/Microsoft SSO. Project live immediately. Tesla-simple." },
            ].map((item) => (
              <div key={item.num}>
                <div className="font-mono text-xs text-[#C6FF3A] mb-4 tracking-[1px]">{item.num}</div>
                <div className="text-xl font-semibold tracking-tight mb-3">{item.title}</div>
                <p className="text-[#A1A1AA] leading-relaxed">{item.text}</p>
              </div>
            ))}
          </div>
        </div>
      </section>



      {/* PORTAL — The command center. No call ever required for Roadmap. */}
      <section className="border-t border-[#222225] bg-[#0A0A0C] py-20">
        <div className="mx-auto max-w-xl px-6 text-center">
          <div className="text-xs tracking-[2px] text-[#C6FF3A] mb-3">YOUR PRIVATE HQ</div>
          <h3 className="text-5xl font-semibold tracking-[-1.8px] mb-6">Pay once. Project is live.</h3>
          <p className="text-[#A1A1AA] text-lg mb-10">
            Google or Microsoft 365 login. Projects, invoices, signed contracts — everything appears instantly. Tesla app for your business.
          </p>

          <Link href="/portal" className="btn-primary">Open the portal</Link>
          <p className="mt-4 text-xs text-[#5A5A5F]">Finish the wizard → Buy → You land logged in with your new project. Zero calls.</p>
        </div>
      </section>

      {/* FOOTER — Quiet */}
      <footer className="border-t border-[#222225] py-14 text-sm text-[#5A5A5F]">
        <div className="mx-auto max-w-5xl px-6 flex flex-col md:flex-row justify-between gap-y-4 text-xs tracking-wider">
          <div>betterwithai</div>
          <div className="flex gap-x-6">
            <Link href="/resources">Resources</Link>
            <Link href="/terms">Terms</Link>
            <Link href="/privacy">Privacy</Link>
            <a href={BOOKING_URL} target="_blank" rel="noopener noreferrer">Talk about bigger/custom work</a>
          </div>
          <div>© {new Date().getFullYear()}</div>
        </div>
      </footer>
    </div>
  );
}
