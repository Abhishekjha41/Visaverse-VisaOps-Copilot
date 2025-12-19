import { Card } from "@/components/ui/card";
import { AlertCircle, Clock, CheckCircle2 } from "lucide-react";

export function SmartTimeline({ steps }: any) {
  if (!steps?.length) return <div className="text-white/50 text-sm">No timeline generated.</div>;

  return (
    <div className="relative space-y-0 py-2">
      {/* Vertical Connecting Line */}
      <div className="absolute top-2 bottom-2 left-[19px] w-[2px] bg-white/10" />

      {steps.map((s: any, i: number) => (
        <div key={i} className="relative pl-12 pb-8 last:pb-0 group">
          
          {/* Timeline Dot */}
          <div className="absolute left-[10px] top-1 w-5 h-5 rounded-full bg-[#020617] border-2 border-slate-700 group-hover:border-cyan-500 group-hover:scale-110 transition-all z-10 flex items-center justify-center">
             <div className="w-1.5 h-1.5 rounded-full bg-slate-500 group-hover:bg-cyan-400 transition-colors" />
          </div>

          {/* Content Wrapper - Added w-full so it takes space */}
          <div className="flex flex-col gap-1 w-full min-w-0">
             <div className="flex justify-between items-start gap-4">
                 <h4 className="text-sm font-semibold text-white group-hover:text-cyan-400 transition-colors">
                    {s.title}
                 </h4>
                 
                 {/* Duration Badge */}
                 <span className="shrink-0 text-[10px] font-mono text-cyan-200/70 bg-cyan-900/20 border border-cyan-500/20 px-2 py-0.5 rounded">
                    {s.estimatedDuration}
                 </span>
             </div>
             
             <p className="text-xs text-slate-400 leading-relaxed max-w-[90%]">
                {s.description}
             </p>

             {s.delayRisk && (
                <div className="flex items-center gap-1.5 mt-1">
                   <AlertCircle className="w-3 h-3 text-yellow-500/80" /> 
                   <span className="text-[10px] text-yellow-500/80 font-medium">Risk: {s.delayRisk}</span>
                </div>
             )}
          </div>
        </div>
      ))}
    </div>
  );
}