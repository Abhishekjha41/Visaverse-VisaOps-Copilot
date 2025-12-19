import { Card } from "@/components/ui/card";
import type { MobilityScore } from "@/lib/types";
import { GaugeCircle, Info } from "lucide-react";

export function MobilityScoreCard({ score, explanation }: MobilityScore) {
  // Determine color based on score
  const scoreColor = score > 75 ? "text-emerald-400" : score > 50 ? "text-yellow-400" : "text-red-400";
  const progressColor = score > 75 ? "#34d399" : score > 50 ? "#facc15" : "#f87171";

  return (
    <Card className="relative h-full p-6 bg-[#09090b]/40 border border-white/10 overflow-hidden group">
      {/* Background Gradient Blob */}
      <div className="absolute -top-10 -right-10 w-32 h-32 bg-indigo-500/10 rounded-full blur-[50px] group-hover:bg-indigo-500/20 transition-all" />

      <div className="relative z-10 flex flex-col justify-between h-full">
        <div className="flex items-center gap-2 mb-4">
          <div className="p-2 bg-white/5 rounded-lg">
             <GaugeCircle className="w-5 h-5 text-indigo-400" />
          </div>
          <span className="text-sm font-medium text-slate-300">VisaVerse Score™</span>
        </div>

        <div className="flex items-end gap-2">
            <h1 className={`text-6xl font-bold tracking-tighter ${scoreColor} drop-shadow-[0_0_15px_rgba(0,0,0,0.5)]`}>
                {score}
            </h1>
            <span className="text-xl text-slate-500 mb-2">/100</span>
        </div>

        <div className="mt-4 pt-4 border-t border-white/5">
            <div className="flex gap-2 items-start">
                <Info className="w-4 h-4 text-slate-500 mt-0.5 shrink-0" />
                <p className="text-xs text-slate-400 leading-relaxed">{explanation}</p>
            </div>
        </div>
      </div>
    </Card>
  );
}