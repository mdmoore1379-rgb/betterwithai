"""
Marketing Agent

Specializes in attention, virality, and lead generation for the website and overall marketing.
Focus: Modern, high-converting, shareable, premium-yet-approachable design and copy that attracts quality clients and supports $100M scale.
Understands psychology of stopping the scroll, emotional hooks, social proof, simplicity (Tesla-like), and lifestyle storytelling (Holderness family vibe without the cartoonish elements).
"""

from agents.base_agent import BaseAgent, Task, AgentResponse
from typing import Dict, Any

class MarketingAgent(BaseAgent):
    name = "MarketingAgent"
    description = "Website marketing audit, attention/virality/lead gen strategy, copy, design recommendations for high-growth self-serve business"

    def __init__(self):
        super().__init__()

    def can_handle(self, task: Task) -> float:
        text = task.description.lower()
        keywords = ["marketing", "website", "design", "copy", "hero", "viral", "attention", "leads", "conversion", "scroll", "hook", "social proof", "modern", "premium", "aesthetic", "ux", "landing"]
        score = sum(0.2 for kw in keywords if kw in text)
        return min(1.0, score + 0.1)

    def execute(self, task: Task) -> AgentResponse:
        self.log(f"Marketing audit task: {task.description}")

        # Context about current site can be passed in task.context or we simulate based on known state
        site_summary = task.context.get("site_summary", "Current site uses dark theme (#0B0B0F), bright acid green accent, cartoonish brain mascot, multi-item nav, hero with 'AI runs the business. We run the world.', prominent 'Book a Call' CTA, wizard section, pricing cards, lifestyle mentions. Feels dated, cluttered, not premium or modern.")

        critique_and_recommendations = f"""
**MarketingAgent Website Audit & Recommendations**

**Current Site Summary (from context):**
{site_summary}

**Critique (why it doesn't get attention, go viral, or convert well for $100M self-serve AI consulting):**

1. **Visual First Impression (Attention Killer)**
   - Dark theme + bright green + cartoon mascot feels 2018-2021 "AI startup" or meme-y, not modern premium.
   - Mascot is too cute/childish for high-ticket B2B buyers ($2M+ revenue operators). It triggers "fun side project" not "serious system that buys me freedom."
   - No scroll-stopping hero visual (real photography of freedom lifestyle would crush a cartoon brain).
   - Cluttered nav with too many items (How it works, Lifestyle, Pricing, Resources) + "Client Portal" + "Configure" + "Book a Call". Decision fatigue on arrival.

2. **Hook & Headline (Virality & Attention)**
   - Headline is okay but generic. "We run the world" sounds boastful without proof or specific emotion.
   - No immediate "I want that" for the ICP (overwhelmed operators who want freedom like the Holderness family).
   - Missing strong, specific, benefit-driven hook in first 5 seconds. No "while you were scrolling, your AI just onboarded a client" energy.

3. **Lead Generation & Self-Serve Friction**
   - Still has "Book a Call" as prominent button — kills the Tesla-self-serve promise.
   - Wizard is buried or not hero. It should be the main event, not after hero.
   - No immediate low-friction lead magnet or "see the magic" moment.
   - Lifestyle copy is text-heavy instead of visual + emotional (travel photos + "this is what the system bought us").

4. **Modern Premium Feel (100M Company Signal)**
   - Style feels dated: heavy borders, old-school card design, bright neon green, cartoon elements.
   - Modern high-converting sites (Linear, Stripe, modern DTC, high-end consulting) use: clean sans, generous whitespace, subtle gradients or photography, confident minimal copy, trust signals (logos, results, testimonials), fast visual hierarchy.
   - No social proof, no "as seen in" or client logos, no "join X operators who bought their time back".
   - Copy mixes "bold funny" with corporate ("Configure your Roadmap") inconsistently.

5. **Virality & Shareability**
   - Nothing inherently shareable on the page (no "send this to your co-founder" , no lifestyle visuals that make people tag friends/family, no "this is how we escaped the desk" hook).
   - Holderness vibe is mentioned but not executed visually on site (family photos, raw travel, "AI handled 3 clients while we were off-grid").

**Specific Recommendations (prioritized for attention → virality → leads):**

**Immediate High-Impact Changes (do these first):**
- Switch to light/modern premium aesthetic: Clean white/off-white + sophisticated dark accents or soft gradients. Think modern luxury tech (not black + neon green).
- Kill or de-emphasize the mascot entirely on hero. Use real high-quality lifestyle photography/illustration of freedom (family travel, beach "office", mountain views) with the AI "magic" overlay. Mascot can live small in footer or resources if kept.
- Make the wizard/configurator the absolute hero of the page. Hero section should end with or flow directly into "Build your Roadmap in 90 seconds" with the configurator front and center.
- Remove "Book a Call" from primary navigation and hero. Primary CTA: "Configure your Roadmap" (big, obvious). Secondary: "See how it works" or "View client stories".
- Simplify nav to 4 items max: Pricing | How it works | Stories | Portal (or Resources).
- Hero copy rewrite for hook + emotion:
  - Big: "Buy back your time."
  - Sub: "While your AI runs the business, you run the world with your family."
  - Tiny: "2-minute configurator. One click to buy. Live in your portal instantly."

**Design & Modern Feel:**
- Use generous whitespace, large confident typography (modern sans like Inter/Satoshi or similar).
- Make everything feel fast, light, premium. Subtle micro-interactions, beautiful loading states for wizard.
- Add real social proof immediately: "Join 40+ operators who bought their freedom back this month" + 1-2 short testimonials with photos if possible.
- For virality: Add a "Share this with your co-founder" floating or in hero. Make lifestyle section visual-first (grid of travel + "AI closed $47k while we were here").

**Lead Gen Optimization:**
- The wizard must be dead-simple, delightful, and immediately rewarding (instant nice-looking plan preview).
- After wizard, clear "Get your full Roadmap for $2,497" with no friction.
- Add a secondary lead magnet above the fold or right after hero: "Free 1-page AI Freedom Audit" that feeds into the wizard or email list.
- Strong, benefit-driven CTAs everywhere. No explaining processors. "Pay once. Your AI is live."

**Virality Levers:**
- Tie directly to the social strategy: Site should feel like the "engine" that makes the fun family content possible.
- Hero or lifestyle section should have embed or link to recent video ("Watch how the system ran the business while we were in [place]").
- Make the "Tesla-simple" claim visual and demonstrable (animated flow or quick demo).

**Next Steps I Recommend (as your MarketingAgent):**
1. Redesign hero + move wizard to top.
2. New visual direction (light/modern, photography-heavy).
3. Rewrite all copy for emotional hooks + simplicity.
4. Add immediate social proof and lead magnet.
5. Make the configurator the star visual element.

This will dramatically increase scroll-stop rate, shareability (lifestyle + "I just did this in 2 minutes"), and qualified self-serve conversions.

Ready to execute any of these. Just say the word.
"""

        return AgentResponse(
            success=True,
            result=critique_and_recommendations,
            notes="This is a focused marketing audit of the website itself for attention, virality, and lead gen. Execution will involve design/copy/code changes.",
            next_actions=[
                "Redesign hero with modern visuals and strong hook",
                "Elevate the wizard/configurator to hero status",
                "Update visual system (colors, typography, spacing)",
                "Add social proof and simplify CTAs",
                "Rewrite copy for emotion + simplicity"
            ]
        )
