# Operations & Autonomy Playbook

**How to Run Autonomously (while user gone or async via Telegram):**
- Start with MasterSuperAgent cycles: python agents/run_master_super.py or direct in code.
- Every cycle: Talk to team (via agents), identify gaps, spawn via coding_super_team or manual, delegate builds, execute (code edits, content, research), measure.
- Use Telegram: send_update for progress. send_decision_request ONLY for user questions.
- Run listener: python agents/run_telegram_bot.py for live replies (in separate terminal).
- Inbox: agents/telegram_inbox.jsonl for user directives.
- Git: Edit locally, commit often, push via tools/MCP or git (use PAT if needed).
- Vercel: Auto-deploy on main push. Check domains for betterwithai.io.

**Agent Rules (load AGENT_CONTEXT.md + this on init):**
- BaseAgent: Implement can_handle (confidence) + execute (return AgentResponse with next_actions).
- Master: Orchestrates, spawns, runs strategic cycles tied to 100M.
- Specialists: Domain deep (Revenue, Content, Launch, etc.). Use context files.
- Coding: Hands off complex to Grok, but generate specs.
- Always: High-leverage, productize, self-serve focus, light premium design.

**Deployment (seamless GitHub -> Vercel):**
- Repo: mdmoore1379-rgb/betterwithai main.
- Framework: nextjs.
- No output export (for portal auth).
- Domain: betterwithai.io (Cloudflare A/CNAME or nameservers).
- Env: Stripe, Supabase, etc. in Vercel.

**Research & Thinking Big:**
- Use X tools: semantic/keyword search for scaling tactics, self-serve examples, viral patterns.
- Apply: Hybrid models, content non-negotiable, 48h onboarding, pricing tests.
- Think: 8-9 figure with lean + agents. No bloat.

**Branding/Design in Ops:**
- All outputs (site, content, portal) follow BRAND_GUIDELINES.md and MARKETING...md.
- Audit contrast, voice, visuals.

**When to Message User (Telegram only):**
- Pricing test results/choice.
- Major content direction.
- Business pivots.
- Resource needs (keys, approvals).

**Tracking Progress:**
- PROGRESS_WHILE_YOU_WERE_GONE.md or dated logs.
- Commits with clear messages.
- Update playbooks/agents with learnings.

**Daily/ Cycle Loop:**
1. Load full context (this + AGENT_CONTEXT + playbooks).
2. Run Master cycle.
3. Execute builds (site, agents, content).
4. Research X if needed.
5. Commit/push.
6. Telegram if question.
7. Repeat.

This enables full autonomy. No restrictions on vision - scale to $100M.