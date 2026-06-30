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
              className="btn-primary text-sm"
            >
              Configure your Roadmap
            </a>
            <a
              href="/portal"
              className="btn-secondary text-sm"
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

      {/* HERO — Bold. Minimal. Aspirational. */}
      <section className="min-h-[90vh] flex items-center pt-16 border-b border-white/10">
        <div className="mx-auto max-w-5xl px-6 text-center">
          <div className="mb-6 flex justify-center">
            <BrainMascot state={mascotHeroState} size={160} />
          </div>

          <h1 className="text-7xl md:text-[88px] font-semibold tracking-[-5.5px] leading-[0.9] mb-5">
            AI runs the business.<br />
            <span className="text-[#C6FF3A]">We run the world.</span>
          </h1>

          <p className="max-w-lg mx-auto text-2xl text-[#A1A1AA] mb-10">
            The systems handle the work so we don&apos;t have to.
          </p>

          <div className="flex items-center justify-center gap-3">
            <a href="#wizard" className="btn-primary text-lg px-8 py-3.5">
              Configure your Roadmap
            </a>
            <a href="/portal" className="btn-secondary text-lg px-7 py-3.5">
              See the portal
            </a>
          </div>
        </div>
      </section>

      {/* THE CONFIGURATOR */}
      <section id="wizard" className="section border-t border-white/10 py-20">
        <div className="mx-auto max-w-4xl px-6">
          <div className="mb-8 text-center">
            <div className="text-[#C6FF3A] text-xs tracking-[3px] mb-2">THE EXPERIENCE</div>
            <h2 className="text-6xl font-semibold tracking-[-2.5px]">Tell us what you need.<br />We&apos;ll handle the rest.</h2>
          </div>

          <PlanningWizard />
        </div>
      </section>

      {/* PRICING — Clean, confident, premium */}
      <section id="pricing" className="section border-t border-[#222225] py-24">
        <div className="mx-auto max-w-5xl px-6">
          <div className="text-center mb-14">
            <h2 className="text-5xl font-semibold tracking-[-2px] mb-3">Choose your level of freedom.</h2>
            <p className="text-[#A1A1AA] text-xl">Start with the Roadmap. Everything else builds from there.</p>
          </div>

          <div className="grid md:grid-cols-3 gap-4">
            {offers.filter(o => o.stage !== 'future').map((offer, idx) => (
              <div key={offer.id} className={`card p-9 ${idx === 0 ? 'ring-1 ring-[#C6FF3A]/40' : ''}`}>
                <div className="text-xs tracking-[2px] text-[#C6FF3A] mb-2">{offer.tier}</div>
                <div className="text-3xl font-semibold tracking-[-0.5px] mb-1">{offer.title}</div>
                <div className="text-6xl font-semibold tracking-[-2px] mb-8 tabular-nums">{offer.price}</div>
                
                <p className="text-[#A1A1AA] mb-8 leading-relaxed text-[15px]">{offer.description}</p>

                <a href={offer.ctaLink} target="_blank" rel="noopener noreferrer" className="btn-primary w-full justify-center">
                  {offer.cta}
                </a>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* LIFESTYLE — The real reason */}
      <section id="lifestyle" className="section border-t border-[#222225] py-24 bg-[#0A0A0C]">
        <div className="mx-auto max-w-3xl px-6 text-center">
          <div className="text-xs tracking-[2px] text-[#C6FF3A] mb-4">THE REASON WE EXIST</div>
          <h2 className="text-6xl md:text-[68px] font-semibold tracking-[-3px] leading-none mb-8">
            The systems do the work.<br />We live the life we want.
          </h2>
          <p className="text-xl text-[#A1A1AA]">
            We film our family from Patagonia, the Alps, and beaches while the agents close deals, deliver projects, and keep everything running.
          </p>
        </div>
      </section>

      {/* HOW IT WORKS — Simple, confident */}
      <section id="how-it-works" className="section py-20 border-t border-[#222225]">
        <div className="mx-auto max-w-4xl px-6">
          <div className="text-center mb-12">
            <h3 className="text-4xl font-semibold tracking-[-1px]">Three steps. No friction.</h3>
          </div>
          <div className="grid md:grid-cols-3 gap-x-10 gap-y-12">
            {[
              { num: "01", title: "Configure", text: "Answer four questions. The configurator generates your initial plan in minutes." },
              { num: "02", title: "Buy", text: "Pay securely. Your contract is generated and the project is created instantly." },
              { num: "03", title: "Portal", text: "Log in with Google or Microsoft 365. Your command center is ready." },
            ].map((item) => (
              <div key={item.num} className="border-l-2 border-[#C6FF3A]/40 pl-6">
                <div className="font-mono text-xs text-[#C6FF3A] mb-2 tracking-[1px]">{item.num}</div>
                <div className="text-2xl font-semibold tracking-tight mb-2">{item.title}</div>
                <p className="text-[#A1A1AA]">{item.text}</p>
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
          <p className="mt-4 text-xs text-[#5A5A5F]">Configure → Buy → Your project is live immediately.</p>
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
