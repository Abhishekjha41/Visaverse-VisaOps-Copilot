"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Card } from "@/components/ui/card";
import { Loader2, FileText, Check, XCircle, AlertTriangle } from "lucide-react";
import { runDocumentCheck } from "@/lib/api"; // Ensure this is exported from api.ts

export function DocumentChecker() {
  const [text, setText] = useState("");
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState<any>(null);

  const handleCheck = async () => {
    if (!text.trim()) return;
    setLoading(true);
    try {
      // API call to your backend
      const res = await runDocumentCheck({ text });
      setResult(res);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <Card className="p-6 bg-[#09090b]/80 border border-indigo-500/30 shadow-2xl space-y-6">
      <div className="space-y-2">
        <h3 className="text-lg font-bold text-white flex items-center gap-2">
           <FileText className="w-5 h-5 text-indigo-400" />
           AI Document Screener
        </h3>
        <p className="text-sm text-slate-400">
           Paste your Offer Letter, CV, or SOP text below. Copilot will scan for red flags.
        </p>
      </div>

      <div className="space-y-4">
        <Textarea 
          placeholder="Paste document text here..." 
          className="min-h-[150px] bg-black/40 border-white/10 text-white placeholder:text-white/20 focus:border-indigo-500/50"
          value={text}
          onChange={(e) => setText(e.target.value)}
        />
        
        <div className="flex justify-end">
            <Button 
                onClick={handleCheck} 
                disabled={loading || !text}
                className="bg-indigo-600 hover:bg-indigo-500 text-white"
            >
                {loading ? <><Loader2 className="w-4 h-4 mr-2 animate-spin"/> Scanning...</> : "Analyze Document"}
            </Button>
        </div>
      </div>

      {result && (
        <div className="animate-in fade-in slide-in-from-top-4 space-y-4 pt-4 border-t border-white/10">
            <div className="grid grid-cols-3 gap-4">
                <div className="p-3 rounded-lg bg-white/5 border border-white/10 text-center">
                    <span className="block text-xs text-slate-400">Match Score</span>
                    <span className={`text-xl font-bold ${result.score > 70 ? 'text-green-400' : 'text-yellow-400'}`}>
                        {result.score}/100
                    </span>
                </div>
                <div className="col-span-2 p-3 rounded-lg bg-white/5 border border-white/10 flex items-center">
                     <p className="text-sm text-slate-300">{result.summary}</p>
                </div>
            </div>

            <div className="space-y-2">
                <p className="text-xs font-bold text-slate-500 uppercase">Issues Detected</p>
                {result.issues?.length === 0 ? (
                    <div className="text-green-400 text-sm flex items-center gap-2">
                        <Check className="w-4 h-4" /> No major issues found.
                    </div>
                ) : (
                    <ul className="space-y-2">
                        {result.issues?.map((issue: string, i: number) => (
                            <li key={i} className="flex items-start gap-2 text-sm text-red-300 bg-red-500/5 p-2 rounded">
                                <XCircle className="w-4 h-4 shrink-0 mt-0.5" />
                                {issue}
                            </li>
                        ))}
                    </ul>
                )}
            </div>

            {result.suggestions?.length > 0 && (
                <div className="space-y-2">
                     <p className="text-xs font-bold text-slate-500 uppercase">Suggestions</p>
                     <ul className="space-y-1">
                        {result.suggestions.map((s: string, i: number) => (
                             <li key={i} className="flex items-start gap-2 text-sm text-slate-300">
                                <AlertTriangle className="w-3 h-3 shrink-0 mt-1 text-yellow-500" />
                                {s}
                             </li>
                        ))}
                     </ul>
                </div>
            )}
        </div>
      )}
    </Card>
  );
}