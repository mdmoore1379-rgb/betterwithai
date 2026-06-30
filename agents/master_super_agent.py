try:
    from agents.specialists.employee_clarity_agent import EmployeeClarityAgent
except:
    EmployeeClarityAgent = None

try:
    from agents.specialists.compensation_clarity_agent import CompensationClarityAgent
except:
    CompensationClarityAgent = None

try:
    from agents.specialists.benefits_guide_agent import BenefitsGuideAgent
except:
    BenefitsGuideAgent = None

try:
    from agents.specialists.personal_goals_agent import PersonalGoalsAgent
except:
    PersonalGoalsAgent = None

# ... later in the agents: dict ...
            "EmployeeClarityAgent": EmployeeClarityAgent() if EmployeeClarityAgent else None,
            "CompensationClarityAgent": CompensationClarityAgent() if CompensationClarityAgent else None,
            "BenefitsGuideAgent": BenefitsGuideAgent() if BenefitsGuideAgent else None,
            "PersonalGoalsAgent": PersonalGoalsAgent() if PersonalGoalsAgent else None,