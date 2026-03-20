
"use client";
import { useState } from "react";
import Navbar from "@/components/Navbar";
import ProposalForm from "@/components/ProposalForm";
import AnalysisResult from "@/components/AnalysisResult";

export default function Home() {
  const [result, setResult] = useState<any>(null);
  const [loading, setLoading] = useState(false);
  const [category, setCategory] = useState("Governance");

  return (
    <main className="min-h-screen bg-[#070a13] text-white">
      <Navbar />

      <div className="max-w-3xl mx-auto px-6 pt-28 pb-20">
        {/* Hero */}
        <div className="text-center mb-12">
          <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-sky-400/8 border border-sky-400/20 mb-6">
            <span className="w-1.5 h-1.5 rounded-full bg-sky-400 shadow-[0_0_8px_#38bdf8]" />
            <span className="text-xs font-mono text-sky-400 tracking-widest uppercase">Coordination Intelligence</span>
          </div>
          <h1 className="text-4xl md:text-5xl font-bold tracking-tight mb-4 bg-gradient-to-br from-white via-white to-slate-400 bg-clip-text text-transparent">
            Governance clarity for<br />collaborative systems
          </h1>
          <p className="text-slate-500 text-base leading-relaxed max-w-lg mx-auto">
            Paste any proposal and get structured decision intelligence — summaries, risks, benefits, and a clear recommendation.
          </p>
        </div>

        {/* Form */}
        <ProposalForm
          onResult={(data) => { setResult(data); }}
          onLoading={setLoading}
          loading={loading}
        />

        {/* Loading skeleton */}
        {loading && (
          <div className="mt-6 space-y-4 animate-pulse">
            {[...Array(3)].map((_, i) => (
              <div key={i} className="h-32 rounded-xl bg-white/[0.03] border border-white/5" />
            ))}
          </div>
        )}

        {/* Results */}
        {result && !loading && (
          <AnalysisResult data={result} category={category} />
        )}

        {/* Footer */}
        <div className="mt-20 pt-6 border-t border-white/5 flex justify-between items-center flex-wrap gap-3">
          <span className="font-bold text-white">Civ<span className="text-sky-400">AI</span></span>
          <span className="text-xs font-mono text-slate-600">Built for PL_Genesis: Frontiers of Collaboration</span>
        </div>
      </div>
    </main>
  );
}