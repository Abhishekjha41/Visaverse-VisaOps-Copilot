import { Card } from "@/components/ui/card";
import type { ApprovalSimulation } from "@/lib/types";
import { AlertTriangle, CheckCircle2, ShieldCheck } from "lucide-react";

export function ApprovalSimulator({ data }: { data: ApprovalSimulation }) {
  return (
    <div className="h-full flex flex-col justify-center space-y-6">
      
      {/* Probability Section */}
      <div className="space-y-3">
        <div className="flex justify-between items-end">
            <span className="text-sm font-medium text-slate-300 flex items-center gap-2">
                <ShieldCheck className="w-4 h-4 text-cyan-400" />
                Approval Probability
            </span>
            <span className="text-2xl font-bold text-white">{data.approvalProbability}%</span>
        </div>
        
        {/* Custom Progress Bar */}
        <div className="relative w-full h-3 bg-white/5 rounded-full overflow-hidden border border-white/5">
          <div
            className="h-full rounded-full bg-gradient-to-r from-cyan-500 to-emerald-500 shadow-[0_0_15px_rgba(16,185,129,0.6)] transition-all duration-1000 ease-out"
            style={{ width: `${data.approvalProbability}%` }}
          />
        </div>
        <p className="text-xs text-right text-slate-500">
          AI Confidence: <span className="text-slate-300">{data.confidenceLabel}</span>
        </p>
      </div>

      {/* Rejection Risks */}
      {data.topRejectionRisks.length > 0 && (
          <div className="bg-red-500/5 border border-red-500/10 rounded-xl p-4">
            <p className="text-xs font-bold text-red-400 uppercase tracking-wider mb-3 flex items-center gap-2">
                <AlertTriangle className="w-3 h-3" />
                Risk Factors Detected
            </p>
            <ul className="space-y-2">
              {data.topRejectionRisks.map((r, i) => (
                <li key={i} className="flex items-start gap-2 text-xs md:text-sm text-slate-300">
                   <div className="w-1.5 h-1.5 rounded-full bg-red-500 mt-1.5 shrink-0" />
                   {r}
                </li>
              ))}
            </ul>
          </div>
      )}
    </div>
  );
}