// components/layout/Header.tsx
import { Badge } from "@/components/ui/badge";
import { Sparkles } from "lucide-react";

export function Header() {
  return (
    <header className="sticky top-0 z-50 w-full border-b border-white/5 bg-[#020617]/60 backdrop-blur-xl supports-[backdrop-filter]:bg-[#020617]/60">
      <div className="absolute bottom-0 left-0 h-[1px] w-full bg-gradient-to-r from-transparent via-cyan-500/50 to-transparent" />
      <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
        <div className="flex items-center gap-3">
          {/* Logo Icon */}
          <div className="h-8 w-8 rounded-lg bg-gradient-to-br from-indigo-500 to-purple-600 flex items-center justify-center shadow-lg shadow-indigo-500/20">
            <Sparkles className="h-4 w-4 text-white fill-white/20" />
          </div>
          
          <div>
            <h1 className="text-xl font-bold tracking-tight text-white">
              VisaVerse <span className="font-light text-white/40">| VisaOps Copilot</span>
            </h1>
          </div>
        </div>

        <div className="hidden md:flex items-center gap-4">
           <span className="text-xs text-slate-400">
             
           </span>
           <Badge variant="outline" className="border-indigo-500/30 bg-indigo-500/10 text-indigo-300 text-[10px] uppercase tracking-wider px-3 py-1">
             AI-Powered Global Mobility Strategy
           </Badge>
        </div>
      </div>
    </header>
  );
}