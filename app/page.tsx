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
    { label: "Solutions", href: "#solutions" },
    { label: "Pricing", href: "#pricing" },
    { label: "How it works", href: "#how-it-works" },
    { label: "Lifestyle", href: "#lifestyle" },
    { label: "Resources", href: "/resources" },
    { label: "Client Portal", href: "/portal" },
    { label: "About", href: "#about" },
    { label: "FAQ", href: "#faq" },
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
              Configure plan
            </a>
            <a
              href={BOOKING_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="btn-primary text-sm"
            >
              Book a Call <ArrowRight className="ml-1.5 h-4 w-4" />
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
              <a href="#wizard" className="btn-secondary mt-1 w-full justify-center">Configure plan</a>
              <a
                href={BOOKING_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="btn-primary mt-2 w-full justify-center"
              >
                Book a Discovery Call
              </a>
            </div>
          </div>
        )}
      </nav>

      {/* PREMIUM HERO — Lifestyle + Bold Hook. Tesla-simple promise front and center. */}
      <section className="relative min-h-[92vh] flex items-center justify-center overflow-hidden pt-16 bg-[#0B0B0F]">
        {/* Subtle premium grid + gradient */}
        <div className="absolute inset-0 bg-[radial-gradient(#C6FF3A_0.6px,transparent_1px)] bg-[length:5px_5px] opacity-40"></div>
        <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-[#0B0B0F] to-[#0B0B0F]"></div>

        <div className="relative z-10 mx-auto max-w-5xl px-6 text-center">
          <div className="mb-8 flex justify-center">
            <BrainMascot state={mascotHeroState} size={220} />
          </div>

          <div className="inline-flex items-center gap-2 rounded-full bg-white/10 px-5 py-1 text-xs tracking-[3px] text-[#C6FF3A] mb-6">
            THE AI FREEDOM OS
          </div>

          <h1 className="text-[56px] md:text-[84px] font-bold tracking-[-5.5px] leading-[.88] mb-6">
            AI runs the business.<br />
            <span className="text-[#C6FF3A]">We run the world.</span>
          </h1>

          <p className="mx-auto max-w-2xl text-2xl md:text-[28px] text-white/75 tracking-[-0.2px] leading-tight">
            While the systems close deals, onboard clients, and deliver — we're in Patagonia with the kids. No desk. Real life.
          </p>

          <div className="mt-10 flex flex-col sm:flex-row gap-4 justify-center">
            <a href="#wizard" className="btn-primary text-xl px-12 py-5 tracking-[-0.2px]">
              Configure your AI Roadmap — 2 minutes →
            </a>
            <a 
              href="/portal" 
              className="btn-secondary text-xl px-10 py-5"
            >
              See the client portal
            </a>
          </div>

          <p className="mt-5 text-sm text-white/50 tracking-[2px]">AS SIMPLE AS A TESLA CONFIGURATOR. INSTANT ACCESS AFTER YOU ORDER.</p>

          <div className="mt-16 flex justify-center">
            <button 
              onClick={() => { window.scrollTo({ top: window.innerHeight * 0.85, behavior: 'smooth' }); }}
              className="text-xs tracking-[3px] text-white/40 hover:text-white/70 flex flex-col items-center gap-1"
            >
              SCROLL TO BUILD YOUR PLAN <span>↓</span>
            </button>
          </div>
        </div>
      </section>

      {/* TESLA-SIMPLE CONFIGURATOR — Front and center right after hero. This IS the amazing part. */}
      <section id="wizard" className="section mx-auto max-w-5xl px-6 pt-14 pb-24">
        <div className="text-center mb-10">
          <div className="uppercase tracking-[3px] text-xs text-[#C6FF3A] mb-3">NO SALES CALL REQUIRED</div>
          <h2 className="text-5xl md:text-6xl font-bold tracking-[-2.5px] leading-none">Configure your AI Roadmap.<br />Like ordering a Tesla.</h2>
          <p className="mt-4 text-xl text-white/70 max-w-lg mx-auto">Answer 4 questions. Get a tailored initial plan. One click → pay with Stripe → your project appears live in the portal with Google or Microsoft 365.</p>
        </div>

        <div className="max-w-[820px] mx-auto">
          <PlanningWizard />
        </div>

        <div className="mt-6 text-center text-xs text-white/50 max-w-md mx-auto">
          This is the website + Ops Leader doing 80% of the skilled planning for you. Real Roadmap includes full audit + 60-min call.
        </div>
      </section>

      {/* QUICK PROOF — makes the site feel complete and trusted */}
      <div className="border-y border-white/10 bg-[#121217] py-5 text-center text-sm text-white/70">
        <div className="max-w-4xl mx-auto px-6 flex flex-wrap justify-center gap-x-8 gap-y-1">
          <span>★ “Got our first automation live in 9 days” — Ops Director, $4M services co</span>
          <span>★ “The wizard basically wrote the SOW for us” — Founder, manufacturing</span>
          <span>★ “Portal replaced 4 different tools and email chains” — CEO, $12M agency</span>
        </div>
      </div>

      {/* THE LADDER — Clean, bold, productized */}
      <section id="pricing" className="border-t border-white/10 bg-[#121217] py-16 md:py-20">
        <div className="mx-auto max-w-6xl px-6">
          <div className="flex flex-col items-center text-center mb-12">
            <div className="text-[#C6FF3A] uppercase text-xs tracking-[3px] mb-2">START HERE. SCALE FOREVER.</div>
            <h3 className="text-5xl font-bold tracking-[-2px]">Clear. Productized. Built to get you freedom.</h3>
          </div>

          <div className="grid md:grid-cols-3 gap-6 max-w-5xl mx-auto">
            {offers.filter(o => o.stage !== 'future').map((offer, idx) => (
              <div key={offer.id} className={`card p-8 flex flex-col ${idx === 0 ? 'border-[#C6FF3A] border-2' : ''}`}>
                <div className="text-[#C6FF3A] text-xs tracking-[2.5px] font-mono mb-2">{offer.tier}</div>
                <div className="text-3xl font-semibold mb-1">{offer.title}</div>
                <div className="text-5xl font-bold tracking-[-1px] mt-1 mb-1">{offer.price}</div>
                {offer.period && <div className="text-sm text-white/50 mb-4">{offer.period}</div>}

                <p className="text-white/80 mb-5 text-[15px] flex-1">{offer.description}</p>

                <ul className="text-sm space-y-1.5 mb-7 text-white/85">
                  {offer.features.map((f,i) => <li key={i}>→ {f}</li>)}
                </ul>

                <a href={offer.ctaLink} target="_blank" rel="noopener noreferrer" className="btn-primary w-full justify-center">
                  {offer.cta}
                </a>
              </div>
            ))}
          </div>

          <p className="text-center text-xs text-white/50 mt-8 max-w-md mx-auto">
            All via Stripe. Contracts auto-generated. Everything shows up in your private portal instantly.
            <Link href="/terms" className="underline ml-1 hover:text-white">See MSA + sample SOW</Link>.
          </p>
        </div>
      </section>

      {/* LIFESTYLE — THE WHOLE DAMN POINT. Holderness energy, raw and premium. */}
      <section id="lifestyle" className="section mx-auto max-w-5xl px-6 py-20 md:py-24 text-center">
        <div className="max-w-3xl mx-auto">
          <div className="text-[#C6FF3A] text-xs tracking-[4px] mb-3">THE ENTIRE REASON WE EXIST</div>
          <h2 className="text-6xl md:text-7xl font-bold tracking-[-3.5px] leading-[.9]">AI does the work.<br />We live the life.</h2>
          <p className="mt-6 text-2xl text-white/70">We film our family on the road. The systems onboard clients and run delivery. We check in from a beach or a mountain when we want.</p>
        </div>

        <div className="grid md:grid-cols-2 gap-5 mt-14 max-w-5xl mx-auto text-left">
          <div className="card p-10">
            <div className="text-7xl mb-5">🏔️</div>
            <div className="text-3xl font-semibold mb-3 tracking-tight">While agents handle proposals…</div>
            <p className="text-lg text-white/75">We’re hiking the Alps with our kids. Or road-tripping Patagonia. Or eating tacos on a beach in Baja. The Ops Leader + specialists close, onboard, and deliver. We get notified on our phones when something needs our eyes.</p>
          </div>
          <div className="card p-10">
            <div className="text-7xl mb-5">🎥</div>
            <div className="text-3xl font-semibold mb-3 tracking-tight">Raw. Funny. Zero corporate.</div>
            <p className="text-lg text-white/75">Holderness family style vlogs but for the AI freedom life. “The AI just closed and onboarded a client while we were off-grid in Costa Rica.” Honest chaos + real wins. The people who want the same thing find us.</p>
            <div className="mt-4 text-sm text-[#C6FF3A]">YouTube • IG • TikTok — coming live from wherever the family is.</div>
          </div>
        </div>

        <div className="mt-9">
          <a href="#wizard" className="btn-primary text-base px-9">Start your freedom engine →</a>
        </div>
      </section>

      {/* HOW IT ACTUALLY WORKS — Super tight Tesla-simple */}
      <section id="how-it-works" className="border-y border-white/10 bg-[#121217] py-16">
        <div className="mx-auto max-w-5xl px-6">
          <div className="text-center mb-10">
            <div className="text-[#C6FF3A] text-xs tracking-[3px]">THE FLOW</div>
            <h3 className="text-4xl md:text-5xl font-bold tracking-[-1.5px] mt-2">Configure. Pay. Activated.</h3>
          </div>

          <div className="grid md:grid-cols-3 gap-4 text-center">
            {[
              { step: "01", title: "Configure in 2 minutes", desc: "The wizard on this site is the planner. It asks smart questions and builds your initial plan." },
              { step: "02", title: "One-click order", desc: "Pay via Stripe. Contract (MSA + SOW) auto-delivered. No back-and-forth." },
              { step: "03", title: "Portal = command center", desc: "Instant login with work Google or Microsoft 365. See projects, sign, pay, track — Tesla app for your AI systems." },
            ].map((s, i) => (
              <div key={i} className="card p-8">
                <div className="font-mono text-[#C6FF3A] text-sm mb-2">{s.step}</div>
                <div className="text-2xl font-semibold mb-2 tracking-tight">{s.title}</div>
                <p className="text-white/70">{s.desc}</p>
              </div>
            ))}
          </div>

          <p className="text-center text-sm mt-8 text-white/50">For bigger projects we jump on a short call. Roadmap is fully self-serve on purpose.</p>
        </div>
      </section>

      {/* THE WEDDING TRUTH (condensed, punchy) */}
      <section className="section max-w-4xl mx-auto px-6 py-20">
        <div className="text-center">
          <h2 className="text-4xl md:text-5xl font-bold tracking-[-1.5px]">“Just tell me the solution.”</h2>
          <p className="mt-4 text-xl text-white/75 max-w-2xl mx-auto">We hear you. But you can’t plan a wedding without the bride, the date, and the budget. AI works the same.</p>
        </div>

        <div className="mt-10 card p-9 text-[15px] max-w-3xl mx-auto">
          <p className="text-white/80">Our website + agent system does the heavy lifting of the skilled planner. It asks the smart questions upfront. That’s why the Roadmap wizard lives right here. We get the context we need to build something that actually fits <span className="text-white">your</span> business — not a generic template.</p>
          <div className="mt-4 text-[#C6FF3A] text-sm">Result: No wasted money. No “AI for the sake of AI.” Just clear ROI.</div>
        </div>
      </section>

      {/* PORTAL TEASER — Make the promise real */}
      <section className="bg-[#121217] border-t border-white/10 py-16">
        <div className="max-w-3xl mx-auto px-6 text-center">
          <div className="text-[#C6FF3A] text-xs tracking-widest mb-2">YOUR PRIVATE AI HQ</div>
          <h2 className="text-5xl font-bold tracking-[-2px]">After you pay, you log in and it’s already there.</h2>
          <p className="mt-4 text-xl text-white/70">Google or Microsoft 365 single sign-on. Your projects, invoices, signed contracts, and status — all live. Exactly like the Tesla app for your business systems.</p>

          <div className="mt-8">
            <Link href="/portal" className="btn-primary text-lg px-10">Open the demo portal →</Link>
          </div>
          <p className="mt-3 text-xs text-white/40">Demo flow: finish the wizard above → click Order → you’ll land logged in with your new project.</p>
        </div>
      </section>

      {/* SHORT ABOUT + FAQ COMBINED */}
      <section id="about" className="section mx-auto max-w-3xl px-6 py-16 md:py-20">
        <div className="text-center mb-12">
          <div className="text-[#C6FF3A] text-xs tracking-[3px]">THE HUMANS + THE SYSTEM</div>
          <h3 className="text-4xl font-bold tracking-[-1px] mt-2">Led by Michael. Powered by a ridiculous amount of automation.</h3>
        </div>

        <div className="space-y-3 text-white/75 text-lg">
          <p>Michael Moore is the face and the brain that sits with you. He understands the business. The rest — proposals, onboarding, delivery, even a lot of growth content — is handled by the Ops Leader agent team + living playbook you see on this site.</p>
          <p>We are building this to run while we’re traveling with our family. The website is the core engine. That’s why it’s simple, self-serve, and designed to scale to $100M without us living on calls.</p>
        </div>

        <div id="faq" className="mt-16 pt-8 border-t border-white/10">
          <div className="text-center mb-8 text-sm tracking-[2px] text-[#C6FF3A]">FAQ</div>
          <div className="space-y-7 text-[15px]">
            {[
              ["How much for the Roadmap?", "Exactly $2,497. One time. Pay via Stripe. Done."],
              ["Will this work for my business?", "The wizard + planning step will tell you fast. If it won’t move the needle, we’ll say so."],
              ["Do I have to be technical?", "Nope. You bring the vision and the answers. We (humans + agents) do everything else."],
              ["What happens after I buy?", "You get login access to the portal immediately. Your project appears. Agents start moving. You get a kickoff email."],
            ].map(([q, a], i) => (
              <div key={i}>
                <div className="font-semibold mb-1">{q}</div>
                <div className="text-white/70">{a}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* FINAL CTA — Big and clean */}
      <section className="border-t border-white/10 bg-[#121217] py-20 text-center">
        <div className="mx-auto max-w-md px-6">
          <div className="mx-auto mb-5 flex justify-center"><BrainMascot state="calm" size={130} /></div>
          <h2 className="text-5xl tracking-[-1.5px] font-bold">Stop guessing.<br />Start the freedom.</h2>
          <p className="mt-3 text-white/70">2-minute configurator. Real plan. Instant portal access.</p>

          <a href="#wizard" className="btn-primary mt-8 inline-flex text-lg px-12">Configure your Roadmap now →</a>
          <div className="mt-4">
            <a href={BOOKING_URL} target="_blank" rel="noopener noreferrer" className="text-sm text-[#C6FF3A] hover:underline">Or book a 30-min call (free)</a>
          </div>
        </div>
      </section>

      {/* FOOTER */}
      <footer className="border-t border-white/10 py-10 text-sm text-white/60">
        <div className="mx-auto max-w-6xl px-6 flex flex-col md:flex-row md:items-center gap-y-4 justify-between">
          <div className="flex items-center gap-2">
            <span>betterwithai</span>
            <span className="text-white/30">•</span>
            <span>Serious about results. Not serious about ourselves.</span>
          </div>

          <div className="flex flex-wrap gap-x-6">
            <button onClick={() => scrollTo("#pricing")} className="hover:text-white">Pricing</button>
            <button onClick={() => scrollTo("#how-it-works")} className="hover:text-white">How it works</button>
            <Link href="/resources" className="hover:text-white">Resources &amp; Playbook</Link>
            <Link href="/portal" className="hover:text-white">Portal</Link>
            <a href={BOOKING_URL} target="_blank" className="hover:text-white">Book a call</a>
          </div>

          <div className="flex flex-wrap gap-x-4 text-xs">
            <Link href="/terms" className="hover:text-white">Terms</Link>
            <Link href="/privacy" className="hover:text-white">Privacy</Link>
            <a href="mailto:hello@betterwithai.io" className="hover:text-white">hello@betterwithai.io</a>
          </div>

          <div>© {new Date().getFullYear()} Better With AI, LLC</div>
        </div>
      </footer>
    </div>
  );
}
