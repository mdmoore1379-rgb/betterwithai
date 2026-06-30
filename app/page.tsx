"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { Menu, X, ArrowRight } from "lucide-react";
import BrainMascot from "./components/BrainMascot";
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
    { label: "Resources", href: "/resources" },
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
      {/* Sticky Nav */}
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
              href={BOOKING_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="btn-primary text-sm"
            >
              Book a Discovery Call <ArrowRight className="ml-1.5 h-4 w-4" />
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

      {/* HERO */}
      <section className="pt-20 pb-12 md:pt-24 md:pb-16">
        <div className="mx-auto max-w-5xl px-6 text-center">
          <div className="mb-4 inline-block rounded-full bg-white/10 px-4 py-1 text-xs font-semibold tracking-[2px] text-[#C6FF3A]">
            AI CONSULTING FOR PEOPLE WHO ARE OVER THE HYPE
          </div>

          <h1 className="mx-auto max-w-4xl text-5xl font-bold leading-[1.05] tracking-[-2.5px] md:text-7xl">
            Everyone&apos;s talking about AI.<br />
            Nobody tells you what to <span className="accent">do</span> with it.
          </h1>

          <p className="mx-auto mt-6 max-w-2xl text-xl text-white/80 md:text-2xl">
            You don&apos;t need 50 tools, a prompt course, or another 3am doom-scroll through AI Twitter.
            You need one team to look at your business and go: <span className="text-white font-medium">&ldquo;Here&apos;s what to do. We&apos;ll build it. Done.&rdquo;</span>
          </p>

          <div className="mt-10 flex flex-col items-center justify-center gap-4 sm:flex-row">
            <a href={BOOKING_URL} target="_blank" rel="noopener noreferrer" className="btn-primary text-base">
              Book a Discovery Call <span className="ml-1 text-xs opacity-75">→</span>
            </a>
            <button
              onClick={() => scrollTo("#solutions")}
              className="btn-secondary text-base"
            >
              See how we bridge the gap ↓
            </button>
          </div>
          <p className="mt-3 text-xs text-white/50">Free. Refreshingly hype-free.</p>

          {/* Hero mascot - interactive: hover or click to calm down */}
          <div 
            className="mt-8 flex justify-center cursor-pointer"
            onMouseEnter={() => setMascotHeroState("calm")}
            onMouseLeave={() => setMascotHeroState("frazzled")}
            onClick={() => setMascotHeroState(mascotHeroState === "frazzled" ? "calm" : "frazzled")}
            title="Hover or tap to calm the brain"
          >
            <BrainMascot state={mascotHeroState} size={240} />
          </div>
          <p className="mt-1 text-[11px] text-white/40">hover or tap the brain</p>
        </div>
      </section>

      {/* THE BELIEF / MANIFESTO */}
      <section className="border-t border-white/10 bg-[#121217] py-16 md:py-20">
        <div className="mx-auto max-w-4xl px-6 text-center">
          <h2 className="text-4xl md:text-5xl font-bold tracking-[-1.5px]">
            AI is the ultimate business superpower.
          </h2>
          <p className="mx-auto mt-6 max-w-3xl text-xl text-white/80">
            Running a business is really just one thing — making choices. The best businesses just make better choices, faster.
            That&apos;s what AI unlocks: the superpower to hit your goals with —
          </p>

          <div className="mt-10 grid grid-cols-2 gap-4 md:grid-cols-4">
            {coreBeliefPillars.map((item, i) => (
              <div key={i} className="card p-6 text-left">
                <div className="text-3xl mb-3">{item.icon}</div>
                <div className="text-lg font-semibold">{item.label}</div>
                <div className="mt-1 text-sm text-white/70">{item.desc}</div>
              </div>
            ))}
          </div>

          <p className="mt-10 text-lg text-white/80">
            We&apos;re not here to sell you &ldquo;AI.&rdquo; We&apos;re here to hand you that superpower — aimed exactly where it moves <span className="text-white">your</span> business forward.
          </p>
        </div>
      </section>

      {/* SOLUTIONS / THE BRIDGE */}
      <section id="solutions" className="section mx-auto max-w-6xl px-6 py-16 md:py-24">
        <div className="text-center">
          <div className="text-[#C6FF3A] text-xs font-mono tracking-[3px] mb-3">THE BRIDGE</div>
          <h2 className="text-4xl md:text-6xl font-bold tracking-[-1.8px]">Three ways we take you from overwhelmed → handled.</h2>
          <p className="mt-4 text-xl text-white/70">Wherever you are, there&apos;s a step across the bridge.</p>
        </div>

        <div className="mt-12 grid gap-6 md:grid-cols-3">
          {/* Planning */}
          <div className="card p-8 flex flex-col">
            <div className="text-[#C6FF3A] text-sm font-semibold tracking-widest">01 — START HERE</div>
            <h3 className="mt-3 text-2xl font-semibold">AI Planning<br />“Just tell me what to do.”</h3>
            <p className="mt-4 text-white/80 flex-1">
              For businesses that know AI matters but have no idea where to start. We audit your operations, marketing, and tools, then hand you a <span className="text-white">prioritized roadmap</span> of the highest-ROI AI opportunities — ranked by effort vs. payoff. You get a clear plan you can run with us or on your own.
            </p>
            <a href={BOOKING_URL} target="_blank" rel="noopener noreferrer" className="btn-primary mt-8 w-full justify-center">
              Get your AI roadmap →
            </a>
          </div>

          {/* Projects */}
          <div className="card p-8 flex flex-col border-[#C6FF3A]/40">
            <div className="text-[#C6FF3A] text-sm font-semibold tracking-widest">02 — BUILD IT</div>
            <h3 className="mt-3 text-2xl font-semibold">AI Projects<br />“Now build it for me.”</h3>
            <p className="mt-4 text-white/80 flex-1">
              For businesses ready to implement. Done-for-you builds: AI-powered lead funnels, workflow &amp; ops automation, custom internal tools, chatbots &amp; agents, and integrations. We build it, make it work, and hand it off — a real system that saves hours or books more clients.
            </p>
            <a href={BOOKING_URL} target="_blank" rel="noopener noreferrer" className="btn-primary mt-8 w-full justify-center">
              Scope a project →
            </a>
            <div className="mt-2 text-center text-xs text-white/50">Most popular entry point for teams ready to ship</div>
          </div>

          {/* Consulting */}
          <div className="card p-8 flex flex-col">
            <div className="text-[#C6FF3A] text-sm font-semibold tracking-widest">03 — STAY AHEAD</div>
            <h3 className="mt-3 text-2xl font-semibold">AI Consulting<br />“Keep me ahead.”</h3>
            <p className="mt-4 text-white/80 flex-1">
              For businesses that want a partner as AI keeps evolving. Monthly advisory, hands-on optimization, and team training — a guide who keeps you ahead instead of scrambling to catch up. A toolset that compounds in value every month.
            </p>
            <a href={BOOKING_URL} target="_blank" rel="noopener noreferrer" className="btn-primary mt-8 w-full justify-center">
              Become a partner →
            </a>
          </div>
        </div>
      </section>

      {/* PRICING & SELF-SERVE PATHS — Strategic Core of Growth Plan */}
      <section id="pricing" className="section mx-auto max-w-6xl px-6 py-16 md:py-20 border-t border-white/10">
        <div className="text-center max-w-2xl mx-auto">
          <div className="text-[#C6FF3A] text-xs font-mono tracking-[3px] mb-2">PRODUCTIZED LADDER. SCALES WITH YOU.</div>
          <h2 className="text-4xl md:text-5xl font-bold tracking-[-1.5px]">Clear offers designed for 4-year growth to $100M.</h2>
          <p className="mt-4 text-xl text-white/70">
            We productize the "how" so you get results fast now — and the system compounds as your business grows. Roadmap is the self-serve entry. Everything evolves from there.
          </p>
        </div>

        <div className="mt-12 grid gap-6 md:grid-cols-3 lg:grid-cols-4">
          {offers.map((offer) => (
            <div 
              key={offer.id} 
              className={`card p-8 flex flex-col ${offer.highlight ? 'border-2 border-[#C6FF3A]' : ''} ${offer.stage === 'future' ? 'opacity-75' : ''}`}
            >
              <div className="uppercase text-xs tracking-[2px] text-[#C6FF3A]">{offer.tier}</div>
              <h3 className="mt-4 text-2xl font-semibold">{offer.title}</h3>
              <div className="mt-2 text-4xl font-bold">{offer.price}</div>
              {offer.period && <div className="text-sm text-white/60">{offer.period}</div>}

              <p className="mt-4 text-white/80 text-sm flex-1">{offer.description}</p>

              <ul className="mt-4 space-y-2 text-sm text-white/85">
                {offer.features.map((f, i) => (
                  <li key={i}>• {f}</li>
                ))}
              </ul>

              <a 
                href={offer.ctaLink} 
                target="_blank" 
                rel="noopener noreferrer"
                className="btn-primary mt-8 w-full justify-center text-center"
              >
                {offer.cta}
              </a>
              {offer.stage === 'future' && (
                <p className="mt-3 text-center text-[10px] text-white/50">Part of the 2028+ platform layer in our growth plan.</p>
              )}
            </div>
          ))}
        </div>

        <div className="mt-10 text-center text-sm text-white/60 max-w-md mx-auto">
          All engagements include a clear written agreement (see our <Link href="/terms" className="underline">Master Services Agreement</Link> and sample SOW). 
          Payment is handled securely online via Stripe. The site + our agent systems are built as the core of how we scale to $100M — no constant redesigns needed.
        </div>
      </section>

      {/* OUR SYSTEMS — The Core Differentiator (strategic hub for $100M scale) */}
      <section className="section mx-auto max-w-5xl px-6 py-16 md:py-24 border-t border-white/10 bg-[#121217]">
        <div className="text-center">
          <div className="text-[#C6FF3A] text-xs font-mono tracking-[3px] mb-2">BUILT TO SCALE</div>
          <h2 className="text-4xl md:text-5xl font-bold tracking-[-1.5px]">We don&apos;t just advise. We run on the same systems we deliver.</h2>
          <p className="mt-4 max-w-2xl mx-auto text-xl text-white/70">
            The website is the front door. Behind it is an agent-powered operating system (Ops Leader + specialists for growth, recruiting, delivery, finance) + living playbook. This is how we productize at scale and hit $100M without chaos.
          </p>
        </div>

        <div className="mt-12 grid gap-6 md:grid-cols-3">
          <div className="card p-8">
            <h3 className="text-xl font-semibold">Ops Leader + Agent Team</h3>
            <p className="mt-3 text-white/80">Natural language delegation to specialists for coding, client work, scheduling, proposals, growth, and recruiting. Grok handles execution and deploys.</p>
            <Link href="/resources" className="text-[#C6FF3A] mt-4 inline-block text-sm">Explore the system →</Link>
          </div>
          <div className="card p-8">
            <h3 className="text-xl font-semibold">Living Playbook &amp; Templates</h3>
            <p className="mt-3 text-white/80">Full operating manual: growth plan to $100M, checklists, proposal templates, onboarding flows. Everything versioned and improved continuously.</p>
            <Link href="/resources" className="text-[#C6FF3A] mt-4 inline-block text-sm">See the playbook →</Link>
          </div>
          <div className="card p-8">
            <h3 className="text-xl font-semibold">Productized Delivery</h3>
            <p className="mt-3 text-white/80">Standardized playbooks + pods mean high leverage. Same quality at 10x volume. Roadmap today, Platform + Academy tomorrow.</p>
            <Link href="#pricing" className="text-[#C6FF3A] mt-4 inline-block text-sm">See the ladder →</Link>
          </div>
        </div>

        <p className="mt-8 text-center text-sm text-white/60 max-w-lg mx-auto">
          This isn&apos;t a consulting firm that happens to use AI. It&apos;s a scaled system that happens to consult on AI. The site is the enduring core — we evolve offers and content here without starting over.
        </p>
      </section>

      {/* THE WEDDING TRUTH — OBJECTION HANDLER */}
      <section className="border-y border-white/10 bg-[#121217] py-16 md:py-20">
        <div className="mx-auto max-w-4xl px-6">
          <h2 className="text-center text-4xl md:text-5xl font-bold tracking-[-1px]">
            “Just tell me the solution.”
          </h2>
          <div className="mx-auto mt-6 max-w-3xl text-lg text-white/80">
            We hear it all the time — and we get it. You want the answer, not homework. But here&apos;s the truth:
            <span className="text-white font-medium"> nobody can plan a wedding without the bride, the date, the budget, and a hundred small choices.</span> Hand a planner none of that and you don&apos;t get a wedding — you get a guess. AI is exactly the same.
          </div>

          <div className="mt-10 overflow-hidden rounded-2xl border border-white/10">
            <table className="w-full text-left">
              <thead>
                <tr className="border-b border-white/10 bg-white/5 text-xs font-mono tracking-widest text-white/60">
                  <th className="p-5 font-normal">The wedding needs…</th>
                  <th className="p-5 font-normal">…your AI plan needs</th>
                </tr>
              </thead>
              <tbody className="text-base divide-y divide-white/10">
                <tr>
                  <td className="p-5">🤵👰 The couple</td>
                  <td className="p-5 text-white">Your business, your goals, what success actually looks like</td>
                </tr>
                <tr>
                  <td className="p-5">📅 The date</td>
                  <td className="p-5 text-white">Your timeline — what&apos;s urgent vs. what can wait</td>
                </tr>
                <tr>
                  <td className="p-5">💰 The budget</td>
                  <td className="p-5 text-white">What you&apos;re ready to invest, so we right-size the solution</td>
                </tr>
                <tr>
                  <td className="p-5">✅ The choices</td>
                  <td className="p-5 text-white">The calls only you can make — priorities, tools, brand voice, trade-offs</td>
                </tr>
              </tbody>
            </table>
          </div>

          <p className="mt-8 text-center text-lg text-white/80">
            That&apos;s exactly what <span className="text-white font-semibold">AI Planning</span> is for. We do the heavy lifting — but we ask the right questions first, so what we build fits <span className="text-[#C6FF3A]">your</span> business instead of a generic template. No wasted spend, no guessing, no “AI for the sake of AI.”
          </p>
        </div>
      </section>

      {/* HOW IT WORKS */}
      <section id="how-it-works" className="section mx-auto max-w-5xl px-6 py-16 md:py-24">
        <div className="text-center">
          <div className="text-[#C6FF3A] text-xs font-mono tracking-[3px] mb-2">THE PROCESS</div>
          <h2 className="text-4xl md:text-5xl font-bold tracking-[-1.5px]">How it works (no homework, we promise).</h2>
        </div>

        <div className="mt-12 grid gap-px bg-white/10 md:grid-cols-4">
          {[
            { num: "01", title: "Discovery call", body: "A free, hype-free conversation about your business and where you&apos;re stuck." },
            { num: "02", title: "The plan", body: "We map the highest-impact AI opportunities and what each is worth." },
            { num: "03", title: "We build", body: "Our team + agent systems plan and deliver every detail at scale. You set direction; we handle the rest." },
            { num: "04", title: "We keep you ahead", body: "Optimize, train, evolve, and scale as AI and your business do." },
          ].map((step, idx) => (
            <div key={idx} className="bg-[#0B0B0F] p-8">
              <div className="font-mono text-sm text-[#C6FF3A]">{step.num}</div>
              <div className="mt-3 text-2xl font-semibold">{step.title}</div>
              <p className="mt-3 text-white/75 leading-relaxed">{step.body}</p>
            </div>
          ))}
        </div>
      </section>

      {/* ABOUT — LED BY VISION, DELIVERED BY A TEAM */}
      <section id="about" className="section border-t border-white/10 bg-[#121217] py-16 md:py-24">
        <div className="mx-auto max-w-4xl px-6 text-center">
          <h2 className="text-4xl md:text-5xl font-bold tracking-[-1.2px]">Led by vision. Delivered by a team.</h2>
          <div className="mt-6 mx-auto max-w-2xl text-xl text-white/80">
            Most AI “experts” are one person juggling a dozen clients. We work differently.
          </div>

          <div className="mt-10 mx-auto max-w-3xl text-lg leading-relaxed text-white/80 text-left md:text-center">
            <strong className="text-white">Michael Moore</strong> leads betterwithai as the visionary — the one who sits with you, understands your business, and maps where AI actually moves the needle. That&apos;s the relationship you keep.
            <br /><br />
            Behind that vision is a <strong className="text-white">growing team + agent-powered operating system</strong> (visible right here on this site) that plans and executes at scale — like a wedding planner and crew. The website is the core strategic asset: it productizes our approach, houses the playbook, and powers client journeys to $100M without constant redesigns. You set the direction; we handle the rest.
          </div>

          <div className="mt-9 inline-block rounded-full bg-white/5 px-5 py-2 text-sm border border-white/10">
            You bring the vision. We plan and deliver the whole thing.
          </div>

          {/* Calm mascot at bottom of about */}
          <div className="mt-12 flex justify-center">
            <BrainMascot state="calm" size={180} />
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section id="faq" className="section mx-auto max-w-3xl px-6 py-16 md:py-20">
        <div className="text-center mb-10">
          <div className="text-[#C6FF3A] uppercase tracking-[3px] text-xs mb-2 font-mono">QUESTIONS</div>
          <h2 className="text-4xl font-bold tracking-tight">Frequently asked questions</h2>
        </div>

        <div className="space-y-6">
          {[
            ["How much does this cost?", "Planning starts small and productized; Projects are scoped to what you need; Consulting is a monthly partnership. We&apos;ll give you real numbers on the discovery call — no mystery, no pressure."],
            ["Will this actually work for my business?", "That&apos;s literally what the Planning step answers. If AI isn&apos;t worth it for you, we&apos;ll tell you — we&apos;d rather lose a sale than sell you hype."],
            ["Do I need to be technical?", "No. That&apos;s the entire point. You bring the vision; we handle the tech."],
            ["How long until I see results?", "Planning is fast (days to a couple of weeks). Projects depend on scope, but we move quick and you&apos;ll know the timeline up front."],
            ["Is this just ChatGPT stuff I could do myself?", "You *could* — the same way you *could* plan your own wedding. Most people would rather hand it to a team that does it every day and gets it right."],
          ].map(([q, a], i) => (
            <div key={i} className="border-b border-white/10 pb-6">
              <div className="font-semibold text-lg">{q}</div>
              <div className="mt-2 text-white/75">{a}</div>
            </div>
          ))}
        </div>
      </section>

      {/* CLOSING CTA */}
      <section className="border-t border-white/10 bg-[#121217] py-16 md:py-20 text-center">
        <div className="mx-auto max-w-3xl px-6">
          <div className="flex justify-center mb-6">
            <BrainMascot state="calm" size={140} />
          </div>

          <h2 className="text-4xl md:text-5xl font-bold tracking-[-1.5px]">Stop guessing. Start using the superpower.</h2>
          <p className="mt-4 text-xl text-white/80">One free call. We&apos;ll tell you exactly where AI fits your business — no buzzwords, no homework.</p>

          <a 
            href={BOOKING_URL} 
            target="_blank" 
            rel="noopener noreferrer" 
            className="btn-primary mt-8 inline-flex text-lg"
          >
            Book a Discovery Call <ArrowRight className="ml-2" />
          </a>
          <p className="mt-3 text-xs text-white/50">Free 30-minute call • No pressure</p>
        </div>
      </section>

      {/* FOOTER */}
      <footer className="border-t border-white/10 py-10 text-sm text-white/60">
        <div className="mx-auto max-w-6xl px-6 flex flex-col md:flex-row md:items-center gap-y-4 justify-between">
          <div className="flex items-center gap-2">
            <span>betterwithai</span>
            <span className="text-white/30">•</span>
            <span>Serious about your results. Not serious about ourselves.</span>
          </div>

          <div className="flex flex-wrap gap-x-6 gap-y-1">
            <button onClick={() => scrollTo("#solutions")} className="hover:text-white">Solutions</button>
            <button onClick={() => scrollTo("#how-it-works")} className="hover:text-white">How it works</button>
            <Link href="/resources" className="hover:text-white">Resources</Link>
            <button onClick={() => scrollTo("#about")} className="hover:text-white">About</button>
            <button onClick={() => scrollTo("#faq")} className="hover:text-white">FAQ</button>
            <a href={BOOKING_URL} target="_blank" rel="noopener noreferrer" className="hover:text-white">Book a call</a>
          </div>

          <div className="flex flex-wrap gap-x-4 text-xs">
            <Link href="/terms" className="hover:text-white">Terms</Link>
            <Link href="/privacy" className="hover:text-white">Privacy</Link>
            <Link href="/resources" className="hover:text-white">Resources</Link>
            <a href="mailto:hello@betterwithai.io" className="hover:text-white">hello@betterwithai.io</a>
          </div>

          <div>© {new Date().getFullYear()} Better With AI, LLC. All rights reserved.</div>
        </div>
      </footer>
    </div>
  );
}
