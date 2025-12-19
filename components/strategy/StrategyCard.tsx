import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Sparkles, GitBranch, ArrowRight } from "lucide-react";

export function StrategyCard({ strategy }: any) {
  return (
    <Card className="h-full p-0 overflow-hidden bg-[#09090b]/40 border border-white/10 group">
        {/* Header Gradient */}
        <div className="h-1 bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500" />
        
        <div className="p-6 space-y-6">
            {/* Primary Path */}
            <div className="space-y-3">
                <div className="flex items-center justify-between">
                    <span className="text-xs font-bold text-indigo-400 uppercase tracking-widest flex items-center gap-2">
                        <Sparkles className="w-3 h-3" /> Recommended Route
                    </span>
                    <Badge className="bg-indigo-500/20 text-indigo-300 border-indigo-500/30 hover:bg-indigo-500/30">Top Choice</Badge>
                </div>
                <div className="p-4 rounded-xl bg-gradient-to-br from-indigo-500/10 to-purple-500/5 border border-indigo-500/20">
                    <p className="text-xl md:text-2xl font-bold text-white">
                        {strategy.primaryPath}
                    </p>
                </div>
            </div>

            {/* Backup Paths */}
            {strategy.backupPaths?.length > 0 && (
                <div className="space-y-3">
                    <span className="text-xs font-bold text-slate-500 uppercase tracking-widest flex items-center gap-2">
                        <GitBranch className="w-3 h-3" /> Alternatives
                    </span>
                    <ul className="space-y-2">
                        {strategy.backupPaths.map((b: string, i: number) => (
                            <li key={i} className="flex items-center gap-3 text-sm text-slate-400 group/item hover:text-white transition-colors">
                                <ArrowRight className="w-3 h-3 text-slate-600 group-hover/item:text-cyan-400" />
                                {b}
                            </li>
                        ))}
                    </ul>
                </div>
            )}
        </div>
    </Card>
  );
}