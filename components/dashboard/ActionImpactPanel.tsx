import { Zap, TrendingUp } from "lucide-react";

export function ActionImpactPanel({
  actions,
}: {
  actions: { action: string; impactPercent: number }[];
}) {
  if (!actions?.length) return null;
  return (
    <div className="p-6 h-full flex flex-col">
       <div className="mb-4 flex items-center gap-2">
           <div className="p-1.5 bg-green-500/10 rounded-md">
                <TrendingUp className="w-4 h-4 text-green-400" />
           </div>
           <p className="font-semibold text-white">Quick Wins</p>
       </div>
       
       <div className="space-y-3 flex-1 overflow-y-auto pr-2">
        {actions.map((a, i) => (
          <div key={i} className="flex items-center justify-between p-3 rounded-xl bg-white/5 border border-white/5 hover:border-green-500/30 transition-all group">
            <span className="text-xs md:text-sm text-slate-300 group-hover:text-white leading-tight">
                {a.action}
            </span>
            <span className="flex items-center gap-1 text-xs font-bold text-green-400 bg-green-500/10 px-2 py-1 rounded-lg ml-3 whitespace-nowrap">
              <Zap className="w-3 h-3 fill-green-400" />
              +{a.impactPercent}%
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}