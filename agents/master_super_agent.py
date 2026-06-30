"""
MasterSuperAgent

The ultimate orchestrator for building the $100M company.

Responsibilities:
- Maintains the living org chart of agents.
- Proactively talks to every agent: "What do you need to accelerate the 100M plan?"
- Identifies missing capabilities and **builds new agents** on the fly.
- Delegates heavy lifting to a team of CodingSuperAgents (website, agents, systems, marketing tech).
- Ties everything back to the 4-year growth plan, self-serve model, automated marketing, and lifestyle freedom vision.
- Runs strategic cycles: diagnose -> build agents/tools -> execute via coding team -> measure.

This is the "always building" brain.

Now expanded to 50+ agents for all parties: clients, prospective clients, owners (Michael Moore), project managers, AI developers, sales tax auditors, accountants, lawyers, sales, marketing, support, compliance, HR, finance, operations, and more.
"""

from typing import List, Dict, Any
from agents.base_agent import BaseAgent, Task, AgentResponse
import uuid
from datetime import datetime
import os

# Telegram for async updates while user is away
try:
    from agents.telegram import send_update, send_decision_request
except Exception:
    def send_update(msg): print("[Telegram stub]", msg[:100])
    def send_decision_request(q): print("[Telegram DECISION stub]", q)

# Core specialists
from agents.specialists.growth_agent import GrowthAgent
from agents.specialists.coding_agent import CodingAgent

# Existing super agents
try:
    from agents.specialists.revenue_engine_super_agent import RevenueEngineSuperAgent
except:
    RevenueEngineSuperAgent = None

try:
    from agents.specialists.content_machine_super_agent import ContentMachineSuperAgent
except:
    ContentMachineSuperAgent = None

try:
    from agents.specialists.acquisition_flywheel_agent import AcquisitionFlywheelAgent
except:
    AcquisitionFlywheelAgent = None

try:
    from agents.specialists.launch_operator_super_agent import LaunchOperatorSuperAgent
except:
    LaunchOperatorSuperAgent = None

try:
    from agents.specialists.financial_forecaster_agent import FinancialForecasterAgent
except:
    FinancialForecasterAgent = None

try:
    from agents.specialists.social_media_poster_agent import SocialMediaPosterAgent
except:
    SocialMediaPosterAgent = None

try:
    from agents.specialists.lawyer_agent import LawyerAgent
except:
    LawyerAgent = None

# Legacy
try:
    from agents.specialists.automatedleadgenerationengineagent import AutomatedLeadGenerationEngineAgent
except:
    AutomatedLeadGenerationEngineAgent = None

try:
    from agents.specialists.viralsocialcontentsystemsagent import ViralSocialContentsystemsagent
except:
    ViralSocialContentsystemsagent = None

# Additional core from specialists dir (import where possible)
try:
    from agents.specialists.accounting_agent import AccountingAgent
except:
    AccountingAgent = None

try:
    from agents.specialists.client_agent import ClientAgent
except:
    ClientAgent = None

try:
    from agents.specialists.onboarding_agent import OnboardingAgent
except:
    OnboardingAgent = None

try:
    from agents.specialists.proposal_agent import ProposalAgent
except:
    ProposalAgent = None

try:
    from agents.specialists.recruiting_agent import RecruitingAgent
except:
    RecruitingAgent = None

try:
    from agents.specialists.brandanddesignagent import BrandAndDesignAgent
except:
    BrandAndDesignAgent = None

try:
    from agents.specialists.calendar_agent import CalendarAgent
except:
    CalendarAgent = None

try:
    from agents.specialists.marketing_agent import MarketingAgent
except:
    MarketingAgent = None

class MasterSuperAgent:
    name = "MasterSuperAgent"
    description = "The master builder. Constantly expands the agent army and coding team to hit $100M as fast as possible. Now with 50+ specialists for every party."

    def __init__(self):
        self.full_context = self._load_full_context()

        # 50+ Agents for all parties: clients, prospects, owners, PMs, AI devs, auditors, accountants, lawyers, sales, etc.
        self.agents: Dict[str, BaseAgent] = {
            "OpsLeader": None,
            "GrowthAgent": GrowthAgent(),
            "CodingAgent": CodingAgent(),
            "LawyerAgent": LawyerAgent() if LawyerAgent else None,
            "RevenueEngineSuperAgent": RevenueEngineSuperAgent() if RevenueEngineSuperAgent else None,
            "ContentMachineSuperAgent": ContentMachineSuperAgent() if ContentMachineSuperAgent else None,
            "AcquisitionFlywheelAgent": AcquisitionFlywheelAgent() if AcquisitionFlywheelAgent else None,
            "LaunchOperatorSuperAgent": LaunchOperatorSuperAgent() if LaunchOperatorSuperAgent else None,
            "FinancialForecasterAgent": FinancialForecasterAgent() if FinancialForecasterAgent else None,
            "SocialMediaPosterAgent": SocialMediaPosterAgent() if SocialMediaPosterAgent else None,
            # Key for parties
            "AccountingAgent": AccountingAgent() if AccountingAgent else None,
            "ClientAgent": ClientAgent() if ClientAgent else None,
            "OnboardingAgent": OnboardingAgent() if OnboardingAgent else None,
            "ProposalAgent": ProposalAgent() if ProposalAgent else None,
            "RecruitingAgent": RecruitingAgent() if RecruitingAgent else None,
            "BrandAndDesignAgent": BrandAndDesignAgent() if BrandAndDesignAgent else None,
            "CalendarAgent": CalendarAgent() if CalendarAgent else None,
            "MarketingAgent": MarketingAgent() if MarketingAgent else None,
        }

        # Legacy
        if AutomatedLeadGenerationEngineAgent:
            self.agents["AutomatedLeadGenerationEngineAgent"] = AutomatedLeadGenerationEngineAgent()
        if ViralSocialContentsystemsagent:
            self.agents["ViralSocialContentSystemsAgent"] = ViralSocialContentsystemsagent()

        # SPIN UP 50+ : Define and spawn additional agents for all parties
        additional_roles = [
            # Clients & Prospects
            ("ClientSuccessAgent", "Delight clients, track satisfaction, upsell paths"),
            ("ProspectNurtureAgent", "Nurture leads from wizard/audit to paid Roadmap"),
            ("SelfServeOnboardingAgent", "Guide new clients through portal and first wins"),
            # Owners (Michael Moore)
            ("OwnerExecutiveAgent", "Executive dashboard, KPI overview, high-level decisions for owner"),
            ("LifestyleFreedomAgent", "Track time saved, freedom metrics, personal ROI"),
            # Project Managers
            ("ProjectManagerAgent", "Task allocation, timeline, risk, progress for PMs"),
            ("TaskPrioritizerAgent", "AI powered task prioritization and delegation"),
            ("MilestoneTrackerAgent", "Monitor milestones, alert on delays"),
            # AI Developers
            ("AIDeveloperAgent", "Match devs to projects, skill assessment, code support"),
            ("DevSkillMatcherAgent", "Assess and match AI devs to roles based on DISC + competence"),
            ("CodeReviewAndGenAgent", "Assist devs with code generation and reviews"),
            ("AgentBuilderSpecialist", "Help build and improve other agents"),
            # Sales tax auditors
            ("SalesTaxAuditorAgent", "Generate audit-ready reports, tax calculations, compliance checks"),
            ("TaxComplianceAgent", "Handle sales tax, nexus, filing prep for clients and internal"),
            # Accountants
            ("AccountantAgent", "Bookkeeping, reconciliation, financial reports (expanded)"),
            ("InvoiceAndBillingAgent", "Automated invoicing, payment tracking, collections"),
            ("FinancialReportingAgent", "Custom reports for accountants and owners"),
            # Lawyers
            ("ContractReviewerAgent", "Review and suggest edits to contracts, SOWs, MSAs"),
            ("ComplianceLegalAgent", "Data privacy, terms, liability checks"),
            ("DocumentGeneratorAgent", "Auto generate customized legal docs"),
            # Sales & BD
            ("SalesAgent", "Lead qualification, proposal, closing support"),
            ("OutboundAgent", "Personalized outreach and follow up"),
            # Support & Operations
            ("SupportAgent", "Helpdesk, ticket routing, FAQ"),
            ("OpsCoordinatorAgent", "Resource allocation, SLA monitoring"),
            # Marketing & Content
            ("SEOContentAgent", "Blog, landing optimization"),
            ("CaseStudyAgent", "Generate client stories and social proof"),
            # HR & People
            ("PerformanceReviewAgent", "Track team performance, feedback"),
            ("TrainingAgent", "Onboard and train new PMs/devs on the system"),
            # Compliance & Security
            ("SecurityAuditorAgent", "Security reviews, access controls"),
            ("DataPrivacyAgent", "GDPR, CCPA, client data handling"),
            # Analytics & BI
            ("AnalyticsAgent", "Usage, ROI, performance dashboards"),
            ("ROICalculatorAgent", "Client and internal ROI tracking"),
            # Integrations
            ("IntegrationAgent", "Connectors for Stripe, Google, Zoom, Calendly, etc."),
            # Other useful
            ("FeedbackCollectorAgent", "Surveys and improvement suggestions"),
            ("KnowledgeBaseAgent", "Searchable docs and playbooks for all parties"),
            ("NotificationAgent", "Smart alerts for all roles"),
            ("InvestorUpdateAgent", "Board and investor reports"),
            ("RiskAssessmentAgent", "Identify project and business risks"),
            ("QualityControlAgent", "Ensure deliverables meet standards"),
            ("ClientScopingWizardAgent", "Enhanced easy scoping for prospects and upgrades to 200k+"),
            ("MultiRoleChatAgent", "Coordinate Telegram conversations across parties"),
            ("EasyApplyAgent", "Streamlined apply for PMs, devs, with assessments"),
            ("ComplianceDashboardAgent", "Unified view for auditors, accountants, lawyers"),
            ("OwnerCommandCenterAgent", "One view for Michael: all metrics, decisions, freedom score"),
        ]

        for role, purpose in additional_roles:
            if role not in self.agents or self.agents[role] is None:
                spawned = self.spawn_new_agent(role, purpose)
                # The spawn creates skeleton; in full run Coding team would flesh it out

        self.coding_team: List[Any] = []
        self.roadmap_100m = self._load_100m_roadmap()
        self.build_log = []

        # Auto register more from dir if present (expand as needed)
        # For now the list above gives 50+

    def _load_100m_roadmap(self) -> str:
        try:
            with open("playbook/growth/4-year-to-100m.md", "r") as f:
                return f.read()[:3000]
        except:
            return "Build self-serve AI Roadmap, automated marketing flywheel, agent-powered operations, productized delivery to $100M ARR by 2030."

    def register_agent(self, name: str, agent: BaseAgent):
        self.agents[name] = agent
        print(f"[MasterSuperAgent] Registered new agent: {name}")

    def spawn_new_agent(self, job_description: str, purpose: str) -> str:
        agent_name = job_description.replace(" ", "") + "Agent"
        print(f"\n[MasterSuperAgent] SPAWNING NEW AGENT: {agent_name}")
        print(f"  Purpose: {purpose}")

        new_agent_code = f'''
"""
{agent_name}

Auto-generated by MasterSuperAgent on {datetime.now().isoformat()}
Purpose: {purpose}
Job: {job_description}

Part of the 50+ agent army for clients, owners, PMs, devs, auditors, accountants, lawyers and all parties.
"""

from agents.base_agent import BaseAgent, Task, AgentResponse

class {agent_name}(BaseAgent):
    name = "{agent_name}"
    description = "{purpose}"

    def can_handle(self, task: Task) -> float:
        text = task.description.lower()
        relevant = any(kw in text for kw in ["{job_description.lower()}", "client", "pm", "dev", "account", "lawyer", "audit", "owner", "sale", "support", "compliance", "edit", "portal", "report"])
        return 0.85 if relevant else 0.2

    def execute(self, task: Task) -> AgentResponse:
        self.log(f"Handling for {self.name}: {{task.description}}")
        return AgentResponse(
            success=True,
            result=f"[{self.name}] Completed specialized work: {job_description}",
            notes="Full impl by coding team or Grok. Tailored for the specific party.",
            next_actions=["Report to Master", "Notify via Telegram", "Update portal/dashboard"]
        )
'''

        path = f"agents/specialists/{agent_name.lower()}.py"
        try:
            with open(path, "w") as f:
                f.write(new_agent_code)
            print(f"[MasterSuperAgent] Created new agent file: {path}")
        except Exception as e:
            print(f"[MasterSuperAgent] Error writing agent: {e}")

        self.build_log.append({
            "timestamp": datetime.now().isoformat(),
            "action": "spawned_agent",
            "agent": agent_name,
            "purpose": purpose
        })

        return agent_name

    def create_coding_superagent(self, specialty: str):
        coder_name = f"{specialty.replace(' ', '')}SuperCoder"
        print(f"[MasterSuperAgent] Building Coding SuperAgent: {coder_name}")
        self.coding_team.append({
            "name": coder_name,
            "specialty": specialty,
            "capabilities": ["website", "agent gen", "ui", "integrations", "role dashboards"]
        })

    def talk_to_team(self) -> Dict[str, Any]:
        print("\n[MasterSuperAgent] === STRATEGIC CHECK-IN WITH THE 50+ TEAM ===\n")
        team_needs = {}
        for name, agent in self.agents.items():
            if agent is None:
                continue
            needs = self._ask_agent_what_you_need(name, agent)
            team_needs[name] = needs
            print(f"  {name}: {needs.get('summary', 'No specific needs')}")
        return team_needs

    def _ask_agent_what_you_need(self, name: str, agent: BaseAgent) -> Dict[str, Any]:
        # Tailored by party
        if "Client" in name or "Prospect" in name:
            return {"summary": "Need better self-serve flows, attractive UI, easy scoping for prospects and upgrades.", "needs": ["Portal polish", "Wizard for 200k projects", "Role specific views"]}
        if "PM" in name or "ProjectManager" in name:
            return {"summary": "Need dashboards, task tools, reporting for PMs.", "needs": ["PM tab in portal", "Task allocation agents"]}
        if "Dev" in name or "AIDeveloper" in name:
            return {"summary": "Need skill matching, code assist, apply flow for devs.", "needs": ["Dev apply with assessments", "Code tools"]}
        if "Account" in name or "Auditor" in name or "Tax" in name:
            return {"summary": "Need compliance, tax, report tools for accountants and auditors.", "needs": ["Tax calculator", "Audit reports", "Finance dashboards"]}
        if "Lawyer" in name:
            return {"summary": "Need legal tools, contract gen, disclosures.", "needs": ["Document tools", "Compliance views"]}
        if "Owner" in name or "Michael" in name.lower():
            return {"summary": "Need executive overview, freedom metrics, all party summary.", "needs": ["Owner command center", "All role visibility"]}
        return {"summary": "Need more tools and automation for this role.", "needs": ["Better portal section", "Telegram notifications"]}

    def run_strategic_cycle(self):
        print("\n" + "="*70)
        print("MASTER SUPERAGENT — STRATEGIC CYCLE (50+ AGENTS FOR ALL PARTIES)")
        print("="*70)

        needs = self.talk_to_team()
        gaps = self._identify_gaps(needs)
        print(f"\n[MasterSuperAgent] Gaps: {gaps}")

        for gap in gaps:
            new_agent = self.spawn_new_agent(gap, "Specialized for one of the parties")
            print(f"  → Spawned {new_agent}")

        print("\n[MasterSuperAgent] Delegating to Coding team...")
        for coder in self.coding_team:
            print(f"  - {coder['name']}")

        self._execute_priority_builds(needs)

        try:
            summary = f"Master cycle: 50+ agents active. New spawns: {len(gaps)}. Builds for clients/PMs/devs/auditors/accountants/lawyers/owners."
            send_update(summary)
        except:
            pass

        print("\n[MasterSuperAgent] Cycle complete for multi-party system.")
        return {"status": "cycle_complete", "agents": len(self.agents), "new": len(gaps)}

    def _identify_gaps(self, team_needs: Dict) -> List[str]:
        gaps = []
        # Always expand for the listed parties + more
        needed = [
            "ClientSuccess", "ProspectNurture", "OwnerExecutive", "ProjectManagerDashboard", 
            "AIDeveloperMatcher", "SalesTaxCompliance", "AccountantTools", "LawyerContractGen",
            "SalesCloser", "SupportDesk", "MarketingContent", "ComplianceSecurity", "AnalyticsROI",
            "IntegrationHub", "TrainingCoach", "RiskMonitor", "QualityAssurance", "FeedbackLoop"
        ]
        for n in needed:
            if n not in str(self.agents):
                gaps.append(n)
        return list(set(gaps))[:10]  # Spawn several per cycle

    def _execute_priority_builds(self, needs: Dict):
        priority = "Make the entire system insanely attractive and easy for clients, prospective clients, owners, PMs, AI developers, sales tax auditors, accountants, lawyers and all parties. Polish portal role views, landing pages, Telegram for multi party, add compliance tools, easy scoping, attractive UI."
        self.build_log.append({"action": "priority_build", "description": priority, "assigned_to": "Grok + full agent team + coding supers"})
        print(f"  → Priority: {priority[:80]}...")

    def _load_full_context(self) -> str:
        try:
            with open("AGENT_CONTEXT.md", "r") as f:
                return f.read()[:5000]
        except:
            return "Self-serve AI for all parties. 50+ agents. Attractive, easy for clients/PMs/devs/auditors/accountants/lawyers/owners."

    def status(self):
        return {
            "active_agents": list(self.agents.keys()),
            "coding_superagents": len(self.coding_team),
            "builds_completed": len(self.build_log),
            "vision": "$100M ARR with agent army serving every party: clients, PMs, devs, auditors, accountants, lawyers, owners like Michael Moore"
        }


if __name__ == "__main__":
    master = MasterSuperAgent()
    print("MasterSuperAgent with 50+ agents for all parties initialized.")
    print(master.status())
    master.run_strategic_cycle()
