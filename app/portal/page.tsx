        {/* Universal top clarity bar - always visible */}
        <div className="mb-6 p-4 bg-[#0A66C2] text-white rounded-2xl flex items-center justify-between text-sm">
          <div>
            <span className="font-semibold">Your personal clarity score:</span> 94/100 — You're in the top 8% of team members this month.
          </div>
          <button onClick={() => setActionMessage('Full personal clarity report opened')} className="bg-white text-[#0A66C2] px-4 py-1 rounded-full text-xs font-medium">View full clarity report</button>
        </div>

        {/* Team Member View - ultra clear */}
        {currentRole === 'team_member' && (
          <div className="space-y-8 max-w-4xl">
            <div>
              <div className="flex items-end gap-4 mb-2">
                <h2 className="text-4xl font-semibold tracking-tight">Hi Sarah. Here's exactly where you stand.</h2>
              </div>
              <p className="text-[#666]">No hunting. No confusion. Everything you need to know and do, right here.</p>
            </div>

            {/* Big OTE visual */}
            <div className="bg-white border-2 border-[#0A66C2] rounded-3xl p-8 text-center">
              <div className="text-sm uppercase tracking-[2px] text-[#0A66C2] mb-1">Your On-Target Earnings this quarter</div>
              <div className="text-7xl font-semibold tracking-[-3px] my-2">$41,250 <span className="text-3xl text-[#666]">/ $48,000</span></div>
              <div className="w-full bg-[#E5E5E3] h-4 rounded-full overflow-hidden mt-4">
                <div className="bg-[#0A66C2] h-4 rounded-full" style={{width: '86%'}}></div>
              </div>
              <div className="text-[#0A66C2] font-medium mt-2">86% to target — only 3 moves left this month</div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {/* Pay clarity */}
              <div className="border rounded-2xl p-6">
                <div className="font-semibold mb-3 text-xl">How you actually get paid</div>
                <div className="space-y-2 text-sm">
                  <div className="flex justify-between py-1 border-b"><span>Base</span><span className="font-mono">$10,000 / mo</span></div>
                  <div className="flex justify-between py-1 border-b"><span>Commission (8% of influenced revenue)</span><span className="font-mono">$6,800 so far</span></div>
                  <div className="flex justify-between py-1 border-b"><span>Quarterly OTE bonus (if 100%+ goals)</span><span className="font-mono">$5,000 potential</span></div>
                </div>
                <div className="mt-4 text-xs text-[#0A66C2]">Next payout: July 1st — estimated $16,400</div>
              </div>

              {/* Benefits */}
              <div className="border rounded-2xl p-6">
                <div className="font-semibold mb-3 text-xl">Your benefits (current)</div>
                <ul className="text-sm space-y-1.5">
                  <li>✓ Health + Dental (United) — $180/mo employee cost</li>
                  <li>✓ 401k 4% match (you are at 3%)</li>
                  <li>✓ Unlimited PTO (used 7 days YTD)</li>
                  <li>✓ $2k annual learning + wellness stipend (used $420)</li>
                </ul>
                <button className="mt-4 text-xs underline" onClick={() => setActionMessage('Benefits management opened')}>Change coverage or add dependent</button>
              </div>
            </div>

            {/* Responsibilities + Action items - the most important */}
            <div className="border-2 border-green-600 rounded-3xl p-6 bg-white">
              <div className="font-semibold text-xl mb-4">What you are responsible for + exactly what to do</div>
              
              <div className="mb-6">
                <div className="uppercase text-xs tracking-widest text-green-600 mb-1">Your 3 core responsibilities</div>
                <ol className="list-decimal list-inside text-sm space-y-0.5 pl-1">
                  <li>Deliver client AI projects on time and above expectation</li>
                  <li>Improve at least one internal agent or playbook per month</li>
                  <li>Support and mentor newer team members</li>
                </ol>
              </div>

              <div>
                <div className="uppercase text-xs tracking-widest text-green-600 mb-2">This week's 3 highest-impact action items (these move your OTE the most)</div>
                <div className="space-y-3">
                  {[ 
                    {title: "Finish Acme lead-qualification agent MVP and demo to client", ote: "+12% this quarter", done: false},
                    {title: "Document the new email agent pattern you built last week", ote: "+4% bonus trigger", done: false},
                    {title: "1:1 with new dev (Jordan) — share your scoping process", ote: "Mentorship goal", done: true}
                  ].map((item, i) => (
                    <div key={i} className={`flex items-start gap-3 p-3 rounded-xl border ${item.done ? 'bg-green-50 border-green-200 line-through opacity-60' : 'bg-white'}`}>
                      <input type="checkbox" checked={item.done} className="mt-1" onChange={() => setActionMessage('Action item marked complete. Agents notified.')} />
                      <div className="flex-1">
                        <div>{item.title}</div>
                        <div className="text-xs text-[#0A66C2]">{item.ote}</div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Keep strong client next-steps clarity */}
        {currentRole === 'client' && (
          <div className="mt-4 p-6 border border-[#0A66C2] rounded-2xl">
            <div className="font-semibold">What you need to do this week (we'll handle the rest)</div>
            <ul className="mt-3 text-sm space-y-1 list-disc list-inside">
              <li>Review and approve the lead qualification prototype (due Thursday)</li>
              <li>Connect your Zoom so meeting notes flow automatically</li>
            </ul>
            <div className="mt-2 text-xs text-[#666]">Doing these two things = we hit the next milestone on time.</div>
          </div>
        )}
