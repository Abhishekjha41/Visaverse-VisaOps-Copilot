import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { MobilityScoreCard } from "@/components/dashboard/MobilityScoreCard";
import { ApprovalSimulator } from "@/components/dashboard/ApprovalSimulator";
import { StrategyCard } from "@/components/strategy/StrategyCard";
import { SmartTimeline } from "@/components/timeline/SmartTimeline"; // Make sure new code is here
import { VisaComparisonTable } from "@/components/dashboard/VisaComparisonTable";
import { ActionImpactPanel } from "@/components/dashboard/ActionImpactPanel";
import { DocumentChecker } from "@/components/copilot/DocumentChecker"; // Import new component
import type { PlanResponse } from "@/lib/types";
import { ScanSearch } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

// Helper component for section headers
const SectionHeader = ({ title, subtitle }: { title: string; subtitle: string }) => (
    <div className="mb-4 space-y-1 ">
        <h3 className="text-lg font-bold text-white flex items-center gap-2">
            <span className="w-1 h-5 bg-cyan-500 rounded-full" />
            {title}
        </h3>
        <p className="text-xs text-slate-400 ml-3">{subtitle}</p>
    </div>
);

export function CopilotResult({ plan }: { plan: PlanResponse }) {
  const [showDocCheck, setShowDocCheck] = useState(false);

  return (
    <div className="space-y-8 animate-in fade-in slide-in-from-bottom-5 duration-700 pb-10">
      
      {/* 1. TOP STATS GRID */}
      <div className="grid lg:grid-cols-12 gap-6">
        <div className="lg:col-span-5 flex flex-col h-full">
            <MobilityScoreCard
                score={plan.mobilityScore.score}
                explanation={plan.mobilityScore.explanation}
            />
        </div>
        <div className="lg:col-span-7 h-full">
            <Card className="h-full p-6 bg-[#09090b]/60 backdrop-blur-md border border-white/10 rounded-2xl shadow-xl">
                <ApprovalSimulator data={plan.approvalSimulation} />
            </Card>
        </div>
      </div>

      {/* 2. STRATEGY & ACTIONS */}
      <div className="grid lg:grid-cols-2 gap-6">
        <div className="space-y-4">
             <SectionHeader title="Core Strategy" subtitle="Based on current immigration policies" />
             <StrategyCard strategy={plan.strategy} />
        </div>
        <div className="space-y-4">
             <SectionHeader title="Impact Actions" subtitle="Steps to increase your approval odds" />
             <Card className="h-full p-0 bg-[#09090b]/60 border border-white/10 rounded-2xl overflow-hidden">
                <ActionImpactPanel actions={plan.approvalSimulation.fastestImprovements} />
             </Card>
        </div>
      </div>

      {/* 3. VISA COMPARISON */}
      <div className="mt-20">
        <SectionHeader title="Route Options" subtitle="AI comparison of best matching visa pathways" />
        <Card className="bg-[#09090b]/60 border border-white/10 rounded-2xl overflow-hidden shadow-lg shadow-indigo-500/5">
            <VisaComparisonTable options={plan.visaComparison} />
        </Card>
      </div>

      {/* 4. TIMELINE (Fixed) */}
      <section>
        <SectionHeader title="Execution Timeline" subtitle="Estimated processing & preparation time" />
        <div className="bg-[#09090b]/40 border border-white/5 rounded-2xl p-6">
            <SmartTimeline steps={plan.timeline} />
        </div>
      </section>

      {/* 5. RELOCATION TIPS */}
      {plan.relocationTips?.length > 0 && (
        <section>
          <SectionHeader title="First 30 Days" subtitle="Essential tasks upon arrival" />
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
             {plan.relocationTips.map((tip, i) => (
                <Card key={i} className="p-4 bg-white/5 border-white/10 hover:bg-white/10 transition-colors">
                    <div className="flex gap-3">
                        <span className="text-cyan-500 font-bold font-mono text-xl">0{i+1}</span>
                        <p className="text-sm text-slate-300 leading-relaxed">{tip}</p>
                    </div>
                </Card>
             ))}
          </div>
        </section>
      )}

      {/* 6. DOCUMENT CHECKER CALL TO ACTION */}
      <div className="pt-8 border-t border-white/10 flex flex-col items-center justify-center space-y-4">
          {!showDocCheck ? (
              <div className="text-center space-y-4">
                  <p className="text-slate-400">Want to verify your specific documents against this plan?</p>
                  <Button 
                    size="lg"
                    onClick={() => setShowDocCheck(true)}
                    className="bg-white text-black hover:bg-cyan-50 font-bold px-8 py-6 rounded-full shadow-[0_0_20px_rgba(255,255,255,0.3)] transition-all hover:scale-105"
                  >
                     <ScanSearch className="w-5 h-5 mr-2" />
                     Check My Documents
                  </Button>
              </div>
          ) : (
             <motion.div 
                initial={{ opacity: 0, height: 0 }} 
                animate={{ opacity: 1, height: "auto" }}
                className="w-full max-w-4xl"
             >
                <div className="flex justify-between items-center mb-4">
                    <SectionHeader title="Document Verification" subtitle="AI Scan for errors and missing info" />
                    <Button variant="ghost" size="sm" onClick={() => setShowDocCheck(false)} className="text-slate-500 hover:text-white">Close</Button>
                </div>
                <DocumentChecker />
             </motion.div>
          )}
      </div>

    </div>
  );
}