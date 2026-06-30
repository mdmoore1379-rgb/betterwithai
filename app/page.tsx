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
    { label: "Pricing", href: "#pricing" },
    { label: "Stories", href: "#lifestyle" },
    { label: "Resources", href: "/resources" },
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
              className="btn-primary text-sm px-6"
            >
              Start the configurator
            </a>
            <a
              href="/portal"
              className="text-sm text-[#555555] hover:text-black"
            >
              Client portal
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
              <a href="#wizard" className="btn-primary mt-1 w-full justify-center">Configure your Roadmap</a>
              <a
                href="/portal"
                className="btn-secondary mt-2 w-full justify-center"
              >
                Client portal
              </a>
            </div>
          </div>
        )}
      </nav>

      {/* HERO — Modern. Aspirational. Immediate value. */}
      <section className="min-h-[92vh] flex items-center pt-12 border-b border-[#E5E5E3]">
        <div className="mx-auto max-w-4xl px-6 text-center">
          <div className="mb-4 text-sm tracking-[3px] text-[#0A66C2]">THE SELF-SERVE AI OPERATING SYSTEM</div>

          <h1 className="text-[56px] md:text-[72px] font-semibold tracking-[-3.5px] leading-[0.95] mb-6 text-balance">
            Buy back your time.<br />Run the life you actually want.
          </h1>

          <p className="max-w-xl mx-auto text-2xl text-[#444444] mb-10 leading-tight">
            While your AI handles clients, proposals, and delivery — you&apos;re with your family on the road, on the beach, or in the mountains.
          </p>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-3 mb-6">
            <a href="#wizard" className="btn-primary text-lg px-8 py-4">
              Build your Roadmap in 2 minutes
            </a>
            <a href="#how-it-works" className="btn-secondary text-lg px-8 py-4">
              See how it works
            </a>
          </div>

          <p className="text-xs tracking-[2px] text-[#888888]">
            NO CALLS. ONE CLICK TO BUY. INSTANT ACCESS IN THE PORTAL.
          </p>
        </div>
      </section>

      {/* THE CONFIGURATOR — This is the product */}
      <section id="wizard" className="section py-16 bg-white border-b border-[#E5E5E3]">
        <div className="mx-auto max-w-4xl px-6">
          <div className="text-center mb-10">
            <div className="text-xs tracking-[2px] text-[#0A66C2] mb-3">THE PRODUCT</div>
            <h2 className="text-5xl md:text-6xl font-semibold tracking-[-2.2px] mb-4">Build your AI Roadmap.<br />Buy it in minutes.</h2>
            <p className="text-xl text-[#444444] max-w-md mx-auto">Four questions. Clear plan. One click. Your systems go live instantly.</p>
          </div>

          <div className="max-w-3xl mx-auto">
            <PlanningWizard />
          </div>
        </div>
      </section>

      {/* PRICING — Simple. Premium. No bullshit. */}
      <section id="pricing" className="section py-20 bg-[#FAFAF8] border-b border-[#E5E5E3]">
        <div className="mx-auto max-w-5xl px-6">
          <div className="text-center mb-12">
            <h2 className="text-5xl font-semibold tracking-[-1.5px]">One product to start.<br />Real results, real fast.</h2>
          </div>

          <div className="max-w-3xl mx-auto">
            {offers.filter(o => o.stage !== 'future').slice(0,1).map((offer) => (
              <div key={offer.id} className="card p-10 border-2 border-[#0A66C2]">
                <div className="flex items-baseline justify-between mb-6">
                  <div>
                    <div className="text-sm tracking-[2px] text-[#0A66C2] mb-1">{offer.tier}</div>
                    <div className="text-4xl font-semibold tracking-tight">{offer.title}</div>
                  </div>
                  <div className="text-right">
                    <div className="text-5xl font-semibold tracking-[-1px]">{offer.price}</div>
                    {offer.period && <div className="text-sm text-[#555]">{offer.period}</div>}
                  </div>
                </div>

                <p className="text-lg text-[#333] mb-8 leading-relaxed">{offer.description}</p>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-3 mb-8 text-sm">
                  {offer.features.map((f,i) => (
                    <div key={i} className="flex items-start gap-2">→ {f}</div>
                  ))}
                </div>

                <a href={offer.ctaLink} target="_blank" rel="noopener noreferrer" className="btn-primary w-full justify-center text-lg py-4">
                  {offer.cta}
                </a>
              </div>
            ))}
          </div>

          <p className="text-center text-sm text-[#666] mt-8">Larger projects and retainers available after you start with the Roadmap.</p>
        </div>
      </section>

      {/* THE FREEDOM */}
      <section id="lifestyle" className="section py-20 border-b border-[#E5E5E3]">
        <div className="mx-auto max-w-3xl px-6 text-center">
          <div className="text-sm tracking-[2px] text-[#0A66C2] mb-4">WHAT THIS ACTUALLY BUYS YOU</div>
          <h2 className="text-5xl font-semibold tracking-[-1.5px] mb-6">The systems run the business.<br />You run your life.</h2>
          <p className="text-xl text-[#444444]">
            This is the engine that lets us travel with our kids while qualified clients get onboarded, projects get delivered, and revenue keeps coming in.
          </p>
          <div className="mt-8 text-sm text-[#0A66C2]">Real operators. Real freedom. Real results.</div>
        </div>
      </section>

      {/* HOW IT WORKS */}
      <section id="how-it-works" className="section py-16">
        <div className="mx-auto max-w-3xl px-6">
          <div className="text-center mb-10">
            <h3 className="text-3xl font-semibold tracking-tight">It really is this simple.</h3>
          </div>
          <div className="space-y-6 text-lg">
            <div className="flex gap-4"><span className="font-mono text-[#0A66C2] w-8">01</span> Answer four questions in the configurator.</div>
            <div className="flex gap-4"><span className="font-mono text-[#0A66C2] w-8">02</span> Pay once. Your full Roadmap and project go live instantly.</div>
            <div className="flex gap-4"><span className="font-mono text-[#0A66C2] w-8">03</span> Log into the portal with Google or Microsoft 365. Everything is there.</div>
          </div>
        </div>
      </section>



      {/* THE PORTAL */}
      <section className="border-t border-[#E5E5E3] py-16 bg-white">
        <div className="mx-auto max-w-xl px-6 text-center">
          <h3 className="text-4xl font-semibold tracking-tight mb-4">Everything in one calm place.</h3>
          <p className="text-xl text-[#444444] mb-8">Log in with the account you already use for work. Your projects, contracts, and status — all there.</p>
          <Link href="/portal" className="btn-primary">Open the portal</Link>
        </div>
      </section>

      {/* FOOTER */}
      <footer className="border-t border-[#E5E5E3] py-12 text-sm text-[#666]">
        <div className="mx-auto max-w-5xl px-6 flex flex-col md:flex-row justify-between gap-y-3 text-xs tracking-wider">
          <div>betterwithai</div>
          <div className="flex gap-x-6">
            <Link href="/resources">Resources</Link>
            <Link href="/terms">Terms</Link>
            <Link href="/privacy">Privacy</Link>
            <a href={BOOKING_URL} target="_blank" rel="noopener noreferrer">Bigger projects</a>
          </div>
          <div>© {new Date().getFullYear()}</div>
        </div>
      </footer>
    </div>
  );
}
