import { PlanResponse } from "@/lib/types";
import { Badge } from "@/components/ui/badge";

type Row = PlanResponse["visaComparison"][number];

export function VisaComparisonTable({ options }: { options: Row[] }) {
  return (
    <div className="w-full overflow-x-auto">
      <table className="w-full text-sm text-left">
        <thead className="text-xs text-slate-500 uppercase bg-white/5 border-b border-white/5">
          <tr>
            <th className="px-6 py-4 font-medium tracking-wider">Visa Type</th>
            <th className="px-6 py-4 font-medium tracking-wider">Win Rate</th>
            <th className="px-6 py-4 font-medium tracking-wider">Timeline</th>
            <th className="px-6 py-4 font-medium tracking-wider">Risk Profile</th>
          </tr>
        </thead>
        <tbody className="divide-y divide-white/5">
          {options.map((v, i) => (
            <tr key={i} className="hover:bg-white/5 transition-colors group">
              <td className="px-6 py-4 font-medium text-white group-hover:text-cyan-400 transition-colors">
                  {v.visa}
              </td>
              <td className="px-6 py-4">
                  <div className="flex items-center gap-2">
                     <span className="text-white">{v.approvalProbability < 1 ? v.approvalProbability * 100 : v.approvalProbability}%</span>
                     <div className="w-16 h-1.5 bg-white/10 rounded-full overflow-hidden">
                        <div className="h-full bg-slate-400 group-hover:bg-cyan-500 transition-colors" style={{ width: `${v.approvalProbability}%`}} />
                     </div>
                  </div>
              </td>
              <td className="px-6 py-4 text-slate-400">{v.processingTime}</td>
              <td className="px-6 py-4">
                 <Badge variant="outline" className={`
                    ${v.riskLevel === "High" ? "border-red-500/30 text-red-400 bg-red-500/10" : 
                      v.riskLevel === "Medium" ? "border-yellow-500/30 text-yellow-400 bg-yellow-500/10" : 
                      "border-emerald-500/30 text-emerald-400 bg-emerald-500/10"}
                 `}>
                    {v.riskLevel}
                 </Badge>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
