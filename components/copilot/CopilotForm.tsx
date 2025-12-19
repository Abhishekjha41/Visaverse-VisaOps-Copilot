"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectItem,
} from "@/components/ui/select";
import { generatePlan } from "@/lib/api";
import { PersonaSelector } from "@/components/onboarding/PersonaSelector";
import { motion, AnimatePresence } from "framer-motion"; 
import { ArrowRight, CheckCircle2, Loader2 } from "lucide-react";

type Persona = "student" | "remote" | "professional" | "founder";

interface CopilotFormProps {
  onComplete: (plan: any) => void;
}

// ✅ FIX: Component ko function ke bahar define kiya hai
const GlassInput = (props: any) => (
    <Input 
        {...props} 
        className="bg-black/20 border-white/10 text-white placeholder:text-white/20 focus:border-cyan-500/50 focus:ring-cyan-500/20 transition-all duration-300"
    />
);

export function CopilotForm({ onComplete }: CopilotFormProps) {
  const [step, setStep] = useState(1);
  const [loading, setLoading] = useState(false);

  // Form States
  const [persona, setPersona] = useState<Persona>("professional");
  const [fullName, setFullName] = useState("");
  const [age, setAge] = useState("");
  const [role, setRole] = useState("");
  const [originCountry, setOriginCountry] = useState("");
  const [destinationCountry, setDestinationCountry] = useState("");
  const [purpose, setPurpose] = useState<"study" | "work" | "tourist" | "remote">("work");
  const [incomeBracket, setIncomeBracket] = useState<"low" | "medium" | "high">("medium");
  const [yearsExperience, setYearsExperience] = useState("");
  const [languages, setLanguages] = useState("");
  const [travellingWithFamily, setTravellingWithFamily] = useState<"yes" | "no">("no");
  const [notes, setNotes] = useState("");

  const canNext1 = fullName.trim() && originCountry.trim() && destinationCountry.trim() && role.trim();

  async function onSubmit() {
    setLoading(true);
    try {
      const payload = {
        persona, name: fullName, role, age: age ? Number(age) : undefined,
        originCountry, destinationCountry, purpose, incomeBracket,
        yearsExperience: yearsExperience ? Number(yearsExperience) : undefined,
        travellingWithFamily: travellingWithFamily === "yes",
        languages: languages.split(",").map((l) => l.trim()).filter(Boolean),
        notes,
      };
      const plan = await generatePlan(payload);
      onComplete(plan);
      setStep(3); 
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="space-y-8">
      
      {/* Step Progress Bar */}
      <div className="relative">
        <div className="absolute top-1/4  left-0 w-full h-0.5 bg-white/15 -z-10 rounded-full" />
        <div 
            className="absolute top-1/4 left-0 h-0.5 bg-gradient-to-r from-indigo-500 to-cyan-500 -z-10 rounded-full transition-all duration-500" 
            style={{ width: step === 1 ? '0%' : step === 2 ? '50%' : '100%' }}
        />
        <div className="flex justify-between items-center text-xs font-medium">
             {[
                { num: 1, label: "Profile" },
                { num: 2, label: "Context" },
                { num: 3, label: "Analysis" }
             ].map((s) => (
                <div key={s.num} className="flex flex-col items-center gap-2   px-2 z-10">
                    <div className={`h-8 w-8 rounded-full flex items-center justify-center border transition-all duration-300 ${
                        step >= s.num 
                        ? "bg-cyan-500 border-cyan-500 text-black shadow-[0_0_15px_rgba(6,182,212,0.5)]" 
                        : "bg-black border-white/10 text-white/40"
                    }`}>
                        {step > s.num ? <CheckCircle2 className="w-5 h-5" /> : s.num}
                    </div>
                    <span className={`${step >= s.num ? "text-cyan-400" : "text-white/30"}`}>{s.label}</span>
                </div>
             ))}
        </div>
      </div>

      <AnimatePresence mode="wait">
        {step === 1 && (
          <motion.div 
            key="step1"
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: 20 }}
            className="space-y-6"
          >
            <div className="grid md:grid-cols-2 gap-5">
              <div className="space-y-2">
                <label className="text-xs uppercase tracking-wider text-slate-400 font-semibold">Full Name / Alias</label>
                <GlassInput placeholder="e.g. Alex Chen" value={fullName} onChange={(e: any) => setFullName(e.target.value)} />
              </div>
              <div className="space-y-2">
                <label className="text-xs uppercase tracking-wider text-slate-400 font-semibold">Current Role</label>
                <GlassInput placeholder="e.g. Product Designer" value={role} onChange={(e: any) => setRole(e.target.value)} />
              </div>
            </div>

            <div className="grid md:grid-cols-2 gap-5">
              <div className="space-y-2">
                <label className="text-xs uppercase tracking-wider text-slate-400 font-semibold">Origin (Passport)</label>
                <GlassInput placeholder="e.g. India" value={originCountry} onChange={(e: any) => setOriginCountry(e.target.value)} />
              </div>
              <div className="space-y-2">
                <label className="text-xs uppercase tracking-wider text-slate-400 font-semibold">Destination</label>
                <GlassInput placeholder="e.g. Germany" value={destinationCountry} onChange={(e: any) => setDestinationCountry(e.target.value)} />
              </div>
            </div>

            <div className="space-y-2">
              <label className="text-xs uppercase tracking-wider text-slate-400 font-semibold">Select Persona</label>
              <PersonaSelector value={persona} onChange={setPersona} />
            </div>

            <div className="flex justify-end pt-4">
              <Button 
                disabled={!canNext1} 
                onClick={() => setStep(2)} 
                className="bg-white text-black hover:bg-cyan-50 transition-all px-8 py-6 rounded-xl font-bold"
              >
                Next Step <ArrowRight className="w-4 h-4 ml-2" />
              </Button>
            </div>
          </motion.div>
        )}

        {step === 2 && (
          <motion.div 
            key="step2"
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: 20 }}
            className="space-y-6"
          >
            <div className="grid md:grid-cols-3 gap-5">
                <div className="space-y-2">
                    <label className="text-xs uppercase tracking-wider text-slate-400 font-semibold">Age</label>
                    <GlassInput type="number" min={18} value={age} onChange={(e: any) => setAge(e.target.value)} />
                </div>
                <div className="space-y-2">
                    <label className="text-xs uppercase tracking-wider text-slate-400 font-semibold">Experience (Yrs)</label>
                    <GlassInput type="number" min={0} value={yearsExperience} onChange={(e: any) => setYearsExperience(e.target.value)} />
                </div>
                <div className="space-y-2">
                    <label className="text-xs uppercase tracking-wider text-slate-400 font-semibold">Income Level</label>
                    <Select value={incomeBracket} onValueChange={(v: any) => setIncomeBracket(v)}>
                        <SelectTrigger className="bg-black/20 border-white/10 text-white h-10">
                            <SelectValue placeholder="Select" />
                        </SelectTrigger>
                        <SelectContent className="bg-[#09090b] border-white/10 text-white">
                            <SelectItem value="low">Entry Level</SelectItem>
                            <SelectItem value="medium">Mid Level</SelectItem>
                            <SelectItem value="high">High Earner</SelectItem>
                        </SelectContent>
                    </Select>
                </div>
            </div>

            <div className="grid md:grid-cols-2 gap-5">
               <div className="space-y-2">
                    <label className="text-xs uppercase tracking-wider text-slate-400 font-semibold">Purpose</label>
                    <Select value={purpose} onValueChange={(v: any) => setPurpose(v)}>
                        <SelectTrigger className="bg-black/20 border-white/10 text-white h-10">
                            <SelectValue />
                        </SelectTrigger>
                        <SelectContent className="bg-[#09090b] border-white/10 text-white">
                            <SelectItem value="work">Work / Employment</SelectItem>
                            <SelectItem value="study">Study</SelectItem>
                            <SelectItem value="remote">Digital Nomad</SelectItem>
                            <SelectItem value="tourist">Tourism</SelectItem>
                        </SelectContent>
                    </Select>
               </div>
               <div className="space-y-2">
                    <label className="text-xs uppercase tracking-wider text-slate-400 font-semibold">Family?</label>
                    <Select value={travellingWithFamily} onValueChange={(v: any) => setTravellingWithFamily(v)}>
                        <SelectTrigger className="bg-black/20 border-white/10 text-white h-10">
                            <SelectValue />
                        </SelectTrigger>
                        <SelectContent className="bg-[#09090b] border-white/10 text-white">
                            <SelectItem value="no">Solo</SelectItem>
                            <SelectItem value="yes">With Family</SelectItem>
                        </SelectContent>
                    </Select>
               </div>
            </div>

            <div className="space-y-2">
                <label className="text-xs uppercase tracking-wider text-slate-400 font-semibold">Languages</label>
                <GlassInput placeholder="e.g. English, German (B1)" value={languages} onChange={(e: any) => setLanguages(e.target.value)} />
            </div>

            <div className="space-y-2">
                <label className="text-xs uppercase tracking-wider text-slate-400 font-semibold">Extra Context</label>
                <Textarea 
                    className="bg-black/20 border-white/10 text-white placeholder:text-white/20 min-h-[100px] focus:border-cyan-500/50"
                    placeholder="Tell us about job offers, scholarships, or specific concerns..."
                    value={notes} 
                    onChange={(e) => setNotes(e.target.value)} 
                />
            </div>

            <div className="flex justify-between items-center pt-4 border-t border-white/5">
              <Button variant="ghost" onClick={() => setStep(1)} className="text-white hover:text-cyan-400 hover:bg-transparent">
                Back
              </Button>
              <Button 
                onClick={onSubmit} 
                disabled={loading}
                className="bg-gradient-to-r from-indigo-600 to-cyan-600 hover:from-indigo-500 hover:to-cyan-500 text-white px-8 py-6 rounded-xl font-bold shadow-lg shadow-cyan-500/20"
              >
                {loading ? <><Loader2 className="w-4 h-4 mr-2 animate-spin"/> Processing...</> : "Generate Visa Plan"}
              </Button>
            </div>
          </motion.div>
        )}
        
        {step === 3 && (
            <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                className="text-center py-10"
            >
                <div className="h-16 w-16 bg-green-500/10 rounded-full flex items-center justify-center mx-auto mb-4 border border-green-500/20">
                    <CheckCircle2 className="w-8 h-8 text-green-500" />
                </div>
                <h3 className="text-2xl font-bold text-white mb-2">Strategy Generated!</h3>
                <p className="text-slate-400">Your custom roadmap is ready in the <span className="text-cyan-400 font-bold">AI Roadmap</span> tab above.</p>
            </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}