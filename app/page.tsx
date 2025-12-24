"use client";

import { useState, useEffect, memo } from "react";
import { Shell } from "@/components/layout/Shell";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { CopilotForm } from "@/components/copilot/CopilotForm";
import { CopilotResult } from "@/components/copilot/CopilotResult";
import { motion } from "framer-motion";
import dynamic from "next/dynamic";
import { SparklesIcon } from "lucide-react";
import Link from "next/link";

// --- GLOBE IMPORT ---
const World = dynamic(() => import("@/components/ui/globe").then((m) => m.World), {
  ssr: false,
  loading: () => <div className="h-full w-full bg-transparent" />,
});

// --- CONFIGURATION ---
const globeConfig = {
  pointSize: 2,
  globeColor: "#020617",
  showAtmosphere: true,
  atmosphereColor: "#818cf8",
  atmosphereAltitude: 0.15,
  emissive: "#020617",
  emissiveIntensity: 0.5,
  shininess: 1,
  polygonColor: "rgba(255,255,255,0.7)",
  ambientLight: "#60a5fa",
  directionalLeftLight: "#ffffff",
  directionalTopLight: "#ffffff",
  pointLight: "#ffffff",
  arcTime: 1200,
  arcLength: 0.9,
  rings: 1,
  maxRings: 3,
  initialPosition: { lat: 22.3193, lng: 114.1694 },
  autoRotate: true,
  autoRotateSpeed: 0.6,
};

const colors = ["#22d3ee", "#818cf8", "#c084fc"];

const sampleArcs = [
    { order: 1, startLat: -19.885592, startLng: -43.951191, endLat: -22.9068, endLng: -43.1729, arcAlt: 0.1, color: colors[0] },
    { order: 1, startLat: 28.6139, startLng: 77.209, endLat: 3.139, endLng: 101.6869, arcAlt: 0.2, color: colors[1] },
    { order: 1, startLat: -19.885592, startLng: -43.951191, endLat: -1.303396, endLng: 36.852443, arcAlt: 0.5, color: colors[2] },
    { order: 2, startLat: 1.3521, startLng: 103.8198, endLat: 35.6762, endLng: 139.6503, arcAlt: 0.2, color: colors[0] },
    { order: 2, startLat: 51.5072, startLng: -0.1276, endLat: 3.139, endLng: 101.6869, arcAlt: 0.3, color: colors[1] },
    { order: 2, startLat: -15.785493, startLng: -47.909029, endLat: 36.162809, endLng: -115.119411, arcAlt: 0.3, color: colors[2] },
    { order: 3, startLat: -33.8688, startLng: 151.2093, endLat: 22.3193, endLng: 114.1694, arcAlt: 0.3, color: colors[0] },
    { order: 3, startLat: 21.3099, startLng: -157.8581, endLat: 40.7128, endLng: -74.006, arcAlt: 0.3, color: colors[1] },
    { order: 3, startLat: -6.2088, startLng: 106.8456, endLat: 51.5072, endLng: -0.1276, arcAlt: 0.3, color: colors[2] },
    { order: 4, startLat: 11.986597, startLng: 8.571831, endLat: -15.595412, endLng: -56.05918, arcAlt: 0.5, color: colors[0] },
    { order: 4, startLat: -34.6037, startLng: -58.3816, endLat: 22.3193, endLng: 114.1694, arcAlt: 0.7, color: colors[1] },
    { order: 4, startLat: 51.5072, startLng: -0.1276, endLat: 48.8566, endLng: -2.3522, arcAlt: 0.1, color: colors[2] },
    { order: 5, startLat: 14.5995, startLng: 120.9842, endLat: 51.5072, endLng: -0.1276, arcAlt: 0.3, color: colors[0] },
    { order: 5, startLat: 1.3521, startLng: 103.8198, endLat: -33.8688, endLng: 151.2093, arcAlt: 0.2, color: colors[1] },
    { order: 5, startLat: 34.0522, startLng: -118.2437, endLat: 48.8566, endLng: -2.3522, arcAlt: 0.2, color: colors[2] },
    { order: 6, startLat: -15.432563, startLng: 28.315853, endLat: 1.094136, endLng: -63.34546, arcAlt: 0.7, color: colors[0] },
    { order: 6, startLat: 37.5665, startLng: 126.978, endLat: 35.6762, endLng: 139.6503, arcAlt: 0.1, color: colors[1] },
    { order: 6, startLat: 22.3193, startLng: 114.1694, endLat: 51.5072, endLng: -0.1276, arcAlt: 0.3, color: colors[2] },
    { order: 7, startLat: -19.885592, startLng: -43.951191, endLat: -15.595412, endLng: -56.05918, arcAlt: 0.1, color: colors[0] },
    { order: 7, startLat: 48.8566, startLng: -2.3522, endLat: 52.52, endLng: 13.405, arcAlt: 0.1, color: colors[1] },
    { order: 7, startLat: 52.52, startLng: 13.405, endLat: 34.0522, endLng: -118.2437, arcAlt: 0.2, color: colors[2] },
    { order: 8, startLat: -8.833221, startLng: 13.264837, endLat: -33.936138, endLng: 18.436529, arcAlt: 0.2, color: colors[0] },
    { order: 8, startLat: 49.2827, startLng: -123.1207, endLat: 52.3676, endLng: 4.9041, arcAlt: 0.2, color: colors[1] },
    { order: 8, startLat: 1.3521, startLng: 103.8198, endLat: 40.7128, endLng: -74.006, arcAlt: 0.5, color: colors[2] },
    { order: 9, startLat: 51.5072, startLng: -0.1276, endLat: 34.0522, endLng: -118.2437, arcAlt: 0.2, color: colors[0] },
    { order: 9, startLat: 22.3193, startLng: 114.1694, endLat: -22.9068, endLng: -43.1729, arcAlt: 0.7, color: colors[1] },
    { order: 9, startLat: 1.3521, startLng: 103.8198, endLat: -34.6037, endLng: -58.3816, arcAlt: 0.5, color: colors[2] },
    { order: 10, startLat: -22.9068, startLng: -43.1729, endLat: 28.6139, endLng: 77.209, arcAlt: 0.7, color: colors[0] },
    { order: 10, startLat: 34.0522, startLng: -118.2437, endLat: 31.2304, endLng: 121.4737, arcAlt: 0.3, color: colors[1] },
    { order: 10, startLat: -6.2088, startLng: 106.8456, endLat: 52.3676, endLng: 4.9041, arcAlt: 0.3, color: colors[2] },
    { order: 11, startLat: 41.9028, startLng: 12.4964, endLat: 34.0522, endLng: -118.2437, arcAlt: 0.2, color: colors[0] },
    { order: 11, startLat: -6.2088, startLng: 106.8456, endLat: 31.2304, endLng: 121.4737, arcAlt: 0.2, color: colors[1] },
    { order: 11, startLat: 22.3193, startLng: 114.1694, endLat: 1.3521, endLng: 103.8198, arcAlt: 0.2, color: colors[2] },
    { order: 12, startLat: 34.0522, startLng: -118.2437, endLat: 37.7749, endLng: -122.4194, arcAlt: 0.1, color: colors[0] },
    { order: 12, startLat: 35.6762, startLng: 139.6503, endLat: 22.3193, endLng: 114.1694, arcAlt: 0.2, color: colors[1] },
    { order: 12, startLat: 22.3193, startLng: 114.1694, endLat: 34.0522, endLng: -118.2437, arcAlt: 0.3, color: colors[2] },
    { order: 13, startLat: 52.52, startLng: 13.405, endLat: 22.3193, endLng: 114.1694, arcAlt: 0.3, color: colors[0] },
    { order: 13, startLat: 11.986597, startLng: 8.571831, endLat: 35.6762, endLng: 139.6503, arcAlt: 0.3, color: colors[1] },
    { order: 13, startLat: -22.9068, startLng: -43.1729, endLat: -34.6037, endLng: -58.3816, arcAlt: 0.1, color: colors[2] },
    { order: 14, startLat: -33.936138, startLng: 18.436529, endLat: 21.395643, endLng: 39.883798, arcAlt: 0.3, color: colors[0] },
];

// --- FIX 1: MEMOIZED GLOBE COMPONENT ---
// Keeps the globe from re-rendering when parent state changes
const MemoizedGlobe = memo(function GlobeWrapper() {
  return (
    <div className="absolute inset-0 mask-image-gradient-b">
      <World data={sampleArcs} globeConfig={globeConfig} />
    </div>
  );
});

export default function Page() {
  const [result, setResult] = useState<any | null>(null);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  return (
    // --- FIX 2: FORCE SCROLLBAR ---
    // 'overflow-y-scroll' forces the scrollbar to be visible even if content is short.
    // This prevents the page width from jumping (and resizing the globe) when content gets longer.
    <Shell className="bg-[#020617] relative min-h-screen overflow-y-scroll overflow-x-hidden">
      
      {/* BACKGROUND EFFECTS */}
      <div className="fixed inset-0 z-0 pointer-events-none">
        <div className="absolute top-[-10%] left-[-10%] w-[500px] h-[500px] bg-purple-600/20 rounded-full blur-[120px]" />
        <div className="absolute top-[20%] right-[-10%] w-[400px] h-[400px] bg-cyan-500/10 rounded-full blur-[100px]" />
        <div className="absolute bottom-[-10%] left-[20%] w-[600px] h-[600px] bg-indigo-600/10 rounded-full blur-[120px]" />
      </div>

      <div className="relative z-10 space-y-16 px-4 md:px-0 max-w-7xl mx-auto">
        
        {/* --- HERO SECTION --- */}
        <section className="grid lg:grid-cols-2 gap-12 items-center min-h-[80vh]">
          
          {/* Left Content */}
          <motion.div 
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            className="space-y-8 relative z-20"
          >
            {/* Pill Badge */}
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/5 border border-white/10 backdrop-blur-md shadow-lg shadow-purple-500/10">
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-cyan-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-cyan-500"></span>
              </span>
              <span className="text-xs font-medium text-cyan-100 tracking-wide uppercase">
                Hackathon Edition v1.0
              </span>
            </div>

            <div className="space-y-4">
              <h1 className="text-5xl md:text-7xl font-extrabold tracking-tight leading-[1.1] text-white">
                Visa Ops, <br />
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 via-indigo-400 to-purple-500 animate-gradient-x">
                  Reimagined.
                </span>
              </h1>
              <p className="text-lg md:text-xl text-slate-400 max-w-xl leading-relaxed">
                Stop googling visa requirements. <strong className="text-white">VisaVerse Copilot</strong> uses AI to calculate your approval odds, generate document checklists, and build your personalized roadmap.
              </p>
            </div>

            <div className="flex flex-wrap gap-4 pt-2">
              <Button
                size="lg"
                className="h-14 px-8 rounded-2xl bg-white text-black font-bold hover:bg-cyan-50 transition-all hover:scale-105 hover:shadow-[0_0_40px_-10px_rgba(255,255,255,0.5)]"
                onClick={() => {
                  const el = document.getElementById("copilot-form");
                  el?.scrollIntoView({ behavior: "smooth", block: "start" });
                }}
              >
                Launch Copilot
                <SparklesIcon className="w-5 h-5 ml-2 text-purple-600" />
              </Button>
              
              <Link href="https://www.youtube.com/watch?v=bXEbQe4g2i0" target="_blank" rel="noopener noreferrer">
                <Button
                  variant="outline"
                  size="lg"
                  className="h-14 px-8 rounded-2xl border-white/10 bg-white/5 text-white hover:text-white hover:bg-white/10 backdrop-blur-sm"
                >
                  Watch Demo
                </Button>
              </Link>
            </div>

            <div className="flex items-center gap-6 pt-6 border-t border-white/5">
                <div>
                    <h3 className="text-2xl font-bold text-white">98%</h3>
                    <p className="text-xs text-slate-500 uppercase tracking-wider">Accuracy</p>
                </div>
                <div className="w-px h-8 bg-white/10" />
                <div>
                    <h3 className="text-2xl font-bold text-white">20+</h3>
                    <p className="text-xs text-slate-500 uppercase tracking-wider">Countries</p>
                </div>
            </div>
          </motion.div>

          {/* Right Globe - FIXED HEIGHT CONTAINER */}
          <div className="relative h-[600px] w-full flex items-center justify-center lg:justify-end perspective-[1000px]">
             <div className="absolute inset-0 bg-gradient-to-r from-blue-500/20 to-purple-500/20 blur-[80px] rounded-full transform scale-75 z-0" />
             
             {/* --- FIX 3: SIMPLIFIED ANIMATION & MEMOIZATION --- */}
             {/* Removed 'scale' animation to prevent initial resize glitch */}
             <motion.div 
               initial={{ opacity: 0 }}
               animate={{ opacity: 1 }}
               transition={{ duration: 1.5, ease: "easeOut" }}
               className="relative z-10 w-full h-full max-w-[800px]"
             >
                {/* Use the Memoized Component */}
                <MemoizedGlobe />
             </motion.div>
          </div>
        </section>


        {/* --- FORM SECTION --- */}
        <section id="copilot-form" className="relative pt-10 pb-20">
            <div className="text-center mb-12 space-y-4">
                <Badge variant="outline" className="border-indigo-500/50 text-indigo-300 bg-indigo-500/10 px-4 py-1">
                    AI POWERED ANALYSIS
                </Badge>
                <h2 className="text-3xl md:text-5xl font-bold text-white">
                    Your Personal Visa Strategist
                </h2>
                <p className="text-slate-400 max-w-2xl mx-auto">
                    Fill in your details below. Our AI analyzes thousands of immigration policies to give you a clear path forward.
                </p>
            </div>

            <motion.div 
                initial={{ y: 50, opacity: 0 }}
                whileInView={{ y: 0, opacity: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.7 }}
                className="max-w-5xl mx-auto"
            >
                <div className="relative group rounded-3xl p-[1px] bg-gradient-to-r from-transparent via-white/20 to-transparent">
                    <div className="absolute -inset-1 bg-gradient-to-r from-indigo-500 via-purple-500 to-cyan-500 rounded-3xl blur opacity-20 group-hover:opacity-40 transition duration-1000"></div>
                    
                    <div className="relative bg-[#09090b]/90 backdrop-blur-xl rounded-3xl border border-white/10 p-6 md:p-10 shadow-2xl overflow-hidden">
                        <div className="absolute inset-0 bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-[size:24px_24px] pointer-events-none"></div>

                        <Tabs defaultValue="form" className="relative z-10 w-full">
                            <TabsList className="grid w-full grid-cols-2 bg-black/40 border border-white/10 p-1.5 h-auto rounded-xl mb-8">
                                <TabsTrigger 
                                    value="form"
                                    className="text-white/60 text-md py-3 rounded-lg data-[state=active]:bg-indigo-600 data-[state=active]:text-white data-[state=active]:shadow-lg data-[state=active]:shadow-indigo-500/25 transition-all"
                                >
                                    1. Traveller Details
                                </TabsTrigger>
                                <TabsTrigger 
                                    value="plan" 
                                    disabled={!result}
                                    className="text-white/60 text-md py-3 rounded-lg data-[state=active]:bg-cyan-600 data-[state=active]:text-white transition-all disabled:opacity-50"
                                >
                                    2. AI Roadmap
                                </TabsTrigger>
                            </TabsList>

                            <TabsContent value="form" className="mt-0 focus-visible:ring-0">
                                <div className="bg-white/5 rounded-2xl p-2 md:p-6 border border-white/5">
                                    <CopilotForm onComplete={setResult} />
                                </div>
                            </TabsContent>

                            <TabsContent value="plan" className="mt-0 focus-visible:ring-0">
                                <div className="bg-gradient-to-b from-indigo-950/30 to-black rounded-2xl p-2 md:p-6 border border-indigo-500/20">
                                    {result && <CopilotResult plan={result} />}
                                </div>
                            </TabsContent>
                        </Tabs>
                    </div>
                </div>
            </motion.div>
        </section>

      </div>
    </Shell>
  );
}
