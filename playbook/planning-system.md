# The Website as the Skilled Wedding Planner System

**Core Idea (from user):** For AI projects, it's like planning a wedding. You need either:
- A highly skilled person who can plan and discuss plans in depth, OR
- A **system starting with the website** that can do a lot of it.

We chose the system approach to scale.

## How the Website + Agents Handle the Planning

1. **Website Starts It All** (the interactive Planning Wizard)
   - Client answers key questions (industry, size, pains, timeline).
   - System (client-side + backend logic via agents) generates initial prioritized plan + "discussion points" a skilled planner would raise.
   - This replaces the first 2-3 meetings of traditional consulting.

2. **Qualifies & Routes Automatically**
   - Roadmap path = self-serve for those who want the full system output.
   - Bigger needs = auto hands off to ProposalAgent + human with full context already captured.

3. **Agents Act as the Skilled Planner**
   - ProposalAgent: Produces customized proposals with the hard questions already answered.
   - GrowthAgent: Ensures marketing attracts people who value this level of planning.
   - Onboarding/ClientAgent: Continues the "discussion" post-purchase.
   - Ops Leader: Orchestrates the whole thing like an experienced head planner.

4. **Escalation Path**
   - Website + agents handle 70-80% of the planning and discussion.
   - Human (Michael + delivery team) steps in for the vision alignment and final decisions — with all the prep work already done.

## Why This Scales to $100M

Traditional model: Every client needs lots of Michael-time for planning discussions → linear growth.

Our model: The website is the always-available skilled planner. Agents multiply it. Humans focus on high-value moments.

This is why the site is the **core** — it does the heavy planning lift from the first interaction.

See also:
- `components/PlanningWizard.tsx` on the live site
- ProposalAgent for the skilled output
- 4-year growth plan for how this evolves into the Platform
