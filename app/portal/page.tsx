  const roles = [
    { key: 'client' as const, label: 'Client / Prospect', icon: '👤' },
    { key: 'team_member' as const, label: 'Team Member (Employee)', icon: '👷' },
    { key: 'owner' as const, label: 'Owner (Michael)', icon: '👑' },
    { key: 'pm' as const, label: 'Project Manager', icon: '📋' },
    { key: 'dev' as const, label: 'AI Developer', icon: '💻' },
    { key: 'auditor' as const, label: 'Sales Tax Auditor', icon: '🔍' },
    { key: 'accountant' as const, label: 'Accountant', icon: '📊' },
    { key: 'lawyer' as const, label: 'Lawyer', icon: '⚖️' },
    { key: 'internal' as const, label: 'Internal / Support', icon: '🛠️' },
  ];

  // ... inside the main return, after role header ...

        {/* Team Member / Employee Clarity View - Core request */}
        {(currentRole === 'team_member' || currentRole === 'pm' || currentRole === 'dev') && (
          <div className="space-y-8">
            <div className="bg-white border border-[#E5E5E3] rounded-3xl p-8">
              <div className="flex items-center justify-between mb-6">
                <div>
                  <div className="text-[#0A66C2] text-xs tracking-[2px] font-semibold">YOUR EMPLOYMENT AT A GLANCE</div>
                  <h2 className="text-3xl font-semibold tracking-tight">Everything you need to know. Zero confusion.</h2>
                </div>
                <div className="text-right">
                  <div className="text-2xl font-semibold text-green-600">On track for 112% OTE</div>
                  <div className="text-sm text-[#666]">This quarter</div>
                </div>
              </div>

              <div className="grid md:grid-cols-2 gap-6">
                {/* How You Get Paid */}
                <div className="border border-[#E5E5E3] rounded-2xl p-6">
                  <div className="font-semibold text-xl mb-4 flex items-center gap-2">💰 How You Get Paid</div>
                  <div className="space-y-3 text-sm">
                    <div className="flex justify-between"><span>Base Salary</span><span className="font-medium">$120,000 / yr</span></div>
                    <div className="flex justify-between"><span>OTE (On-Target Earnings)</span><span className="font-medium">$165,000 / yr</span></div>
                    <div className="flex justify-between"><span>Current Progress to OTE</span><span className="font-medium text-green-600">68%</span></div>
                    <div className="pt-2 border-t">
                      <div className="text-xs text-[#666] mb-1">Breakdown</div>
                      <div className="text-xs">• Base: $10k/month<br/>• Commission: 8% on revenue you influence<br/>• Quarterly Bonus: up to 15% if goals hit</div>
                    </div>
                  </div>
                  <button onClick={() => setActionMessage('Compensation simulator opened (mock)')} className="mt-4 text-sm text-[#0A66C2] hover:underline">Simulate this month’s payout →</button>
                </div>

                {/* Benefits */}
                <div className="border border-[#E5E5E3] rounded-2xl p-6">
                  <div className="font-semibold text-xl mb-4 flex items-center gap-2">🏥 Your Benefits</div>
                  <div className="space-y-2 text-sm">
                    <div>• Health: UnitedHealthcare PPO (you pay $180/mo)</div>
                    <div>• Dental + Vision: Included</div>
                    <div>• 401k: 4% match (you’re at 3% contribution)</div>
                    <div>• Unlimited PTO (use it)</div>
                    <div>• $2,000 annual learning & wellness budget</div>
                  </div>
                  <button onClick={() => setActionMessage('Benefits portal link would open here')} className="mt-4 text-sm text-[#0A66C2] hover:underline">Manage benefits or enroll dependents →</button>
                </div>

                {/* Responsibilities */}
                <div className="border border-[#E5E5E3] rounded-2xl p-6">
                  <div className="font-semibold text-xl mb-4 flex items-center gap-2">🎯 What You’re Responsible For</div>
                  <div className="text-sm space-y-1">
                    <div>1. Deliver high-quality AI implementations on time</div>
                    <div>2. Maintain 90%+ client satisfaction on your projects</div>
                    <div>3. Help improve internal agents and playbooks</div>
                    <div>4. Mentor 1 junior dev per quarter</div>
                  </div>
                </div>

                {/* Action Items to hit goals + OTE */}
                <div className="border border-[#E5E5E3] rounded-2xl p-6 bg-[#FAFAF8]">
                  <div className="font-semibold text-xl mb-4 flex items-center gap-2">✅ Action Items That Move Your OTE</div>
                  <div className="space-y-3 text-sm">
                    <div className="flex items-start gap-3">
                      <input type="checkbox" className="mt-1" />
                      <div>
                        <div className="font-medium">Finish Lead Funnel MVP for Acme (this week)</div>
                        <div className="text-[#666] text-xs">Directly impacts 18% of your Q3 OTE</div>
                      </div>
                    </div>
                    <div className="flex items-start gap-3">
                      <input type="checkbox" className="mt-1" />
                      <div>
                        <div className="font-medium">Ship 2 agent improvements documented</div>
                        <div className="text-[#666] text-xs">Unlocks $4,200 quarterly bonus</div>
                      </div>
                    </div>
                    <div className="flex items-start gap-3">
                      <input type="checkbox" className="mt-1" />
                      <div>
                        <div className="font-medium">Update your project progress in portal by Friday</div>
                        <div className="text-[#666] text-xs">Required for commission calculation</div>
                      </div>
                    </div>
                  </div>
                  <div className="mt-4 text-xs text-green-600 font-medium">Hit these 3 → You’re at 94% OTE this month</div>
                </div>
              </div>

              <div className="mt-6 text-xs text-[#666]">This view is generated live by EmployeeClarityAgent + CompensationClarityAgent + PersonalGoalsAgent. Updates automatically.</div>
            </div>
          </div>
        )}

        {/* Client Clarity reinforcement */}
        {currentRole === 'client' && (
          <div className="mt-8">
            <div className="border border-[#E5E5E3] rounded-2xl p-6 bg-white">
              <div className="font-semibold mb-2">What you’re paying for + what you need to do next</div>
              <div className="text-sm text-[#666]">Clarity is everything. Here’s exactly where your investment is going and the 2-3 moves that will have the biggest impact this month.</div>
              <div className="mt-4 grid grid-cols-1 md:grid-cols-3 gap-4 text-sm">
                <div className="p-3 bg-[#FAFAF8] rounded">AI Lead Qualification Agent — 42% complete</div>
                <div className="p-3 bg-[#FAFAF8] rounded">Your next action: Review prototype by Thursday</div>
                <div className="p-3 bg-[#FAFAF8] rounded">Expected ROI this quarter: +$47k</div>
              </div>
            </div>
          </div>
        )}

        {/* Keep other role sections as before, or simplify */}

        {/* ... existing role sections for owner/pm/dev etc can stay or be reduced ... */}
