        {/* Team Member View - the ultimate clarity experience */}
        {currentRole === 'team_member' && (
          <div className="space-y-8">
            <div className="text-center">
              <div className="inline-flex items-center gap-2 px-4 py-1 rounded-full bg-green-100 text-green-700 text-sm font-medium mb-2">
                YOUR PERSONAL OPERATING SYSTEM
              </div>
              <h1 className="text-4xl font-semibold tracking-tight">Hi. Here's exactly what you need to know and do.</h1>
              <p className="text-[#666] mt-2 max-w-md mx-auto">No hunting. No guessing. One place for your money, benefits, responsibilities, and the moves that actually matter to your OTE and career.</p>
            </div>

            {/* Hero OTE + Progress */}
            <div className="bg-white border border-[#0A66C2] rounded-3xl p-8 text-center">
              <div className="text-[#0A66C2] text-xs tracking-[2px] font-semibold mb-1">THIS QUARTER'S ON-TARGET EARNINGS</div>
              <div className="flex items-baseline justify-center gap-3">
                <span className="text-7xl font-semibold tracking-[-4px]">$41,250</span>
                <span className="text-3xl text-[#666]">/ $48,000</span>
              </div>
              <div className="mt-3 text-[#0A66C2] font-medium">86% to target — only 3 high-impact moves left</div>
              <div className="mt-4 h-3 bg-[#E5E5E3] rounded-full overflow-hidden max-w-xs mx-auto">
                <div className="h-3 bg-[#0A66C2] rounded-full" style={{width: '86%'}}></div>
              </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {/* Pay */}
              <div className="border rounded-2xl p-6">
                <div className="font-semibold text-xl mb-4">How you actually get paid</div>
                <div className="space-y-2 text-sm">
                  <div className="flex justify-between"><span>Base</span><span className="font-medium">$10,000 / month</span></div>
                  <div className="flex justify-between"><span>Commission</span><span className="font-medium">8% of revenue you influence</span></div>
                  <div className="flex justify-between"><span>Quarterly OTE bonus</span><span className="font-medium">up to $5,000 if goals hit</span></div>
                </div>
                <div className="mt-4 pt-4 border-t text-xs text-[#0A66C2]">Next payout estimate: July 1 — ~$16,400</div>
              </div>

              {/* Benefits */}
              <div className="border rounded-2xl p-6">
                <div className="font-semibold text-xl mb-4">Your benefits right now</div>
                <div className="text-sm space-y-1.5">
                  <div>Health + Dental (United) — you pay $180/mo</div>
                  <div>401k: 4% match (you’re currently at 3%)</div>
                  <div>Unlimited PTO — you’ve used 7 days this year</div>
                  <div>$2,000 annual learning & wellness budget</div>
                </div>
                <button onClick={() => setActionMessage('Benefits portal would open here')} className="mt-4 text-sm text-[#0A66C2] hover:underline">Change or add dependent →</button>
              </div>
            </div>

            {/* Responsibilities + Action Items */}
            <div className="border-2 border-[#0A66C2] rounded-3xl p-6">
              <div className="font-semibold text-xl mb-1">What you’re responsible for</div>
              <div className="text-sm text-[#666] mb-4">These are the things that actually move your OTE and your career here.</div>

              <div className="mb-6">
                <div className="uppercase tracking-widest text-xs text-[#0A66C2] mb-2">Core responsibilities</div>
                <div className="text-sm space-y-1">
                  <div>• Deliver client projects on time and above expectation</div>
                  <div>• Ship at least one meaningful agent or playbook improvement per month</div>
                  <div>• Mentor and support newer team members</div>
                </div>
              </div>

              <div>
                <div className="uppercase tracking-widest text-xs text-[#0A66C2] mb-2">This week’s highest-impact action items</div>
                <div className="space-y-2">
                  {[
                    {text: "Finish Acme lead-qualification MVP and run client demo", impact: "+12% to Q3 OTE"},
                    {text: "Document the new agent pattern you just built", impact: "Unlocks quarterly bonus"},
                    {text: "Schedule 1:1 with Jordan and share your scoping process", impact: "Mentorship goal"}
                  ].map((a, i) => (
                    <div key={i} className="flex items-start gap-3 p-3 bg-white border rounded-2xl">
                      <input type="checkbox" className="mt-1" onChange={() => setActionMessage('Action marked complete. Agents and your manager notified.')} />
                      <div className="flex-1 text-sm">
                        <div>{a.text}</div>
                        <div className="text-[#0A66C2] text-xs font-medium">{a.impact}</div>
                      </div>
                    </div>
                  ))}
                </div>
                <div className="mt-4 text-xs text-green-600 font-medium">Complete the top two → you’ll be at 94% OTE pace this month</div>
              </div>
            </div>

            <div className="text-center">
              <button onClick={() => setActionMessage('Fresh action plan generated by PersonalGoalsAgent + CompensationClarityAgent')} className="btn-primary px-8">
                Generate fresh action plan for next week
              </button>
              <div className="text-[10px] text-[#666] mt-1">Runs the clarity agents live. Updates your personal dashboard.</div>
            </div>
          </div>
        )}
