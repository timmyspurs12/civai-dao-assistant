"use client";
import { useState } from "react";

const CATEGORIES = ["Governance", "Funding", "Community", "Product", "Research"];

const SAMPLE = `Title: Community Grants Program for Open-Source Contributors

This proposal requests 500,000 USDC from the ecosystem treasury to fund a 6-month grants program targeting open-source developers contributing to core infrastructure. Grants will range from $5,000 to $50,000 per recipient.

Motivation: Our protocol depends on community-maintained tooling. Contributor retention has dropped 18% this year. A structured grants program will incentivize sustained participation.

Budget: Direct grants 420k, Operations 40k, Tooling 40k.
Success Metrics: 20+ funded contributors, 10+ new integrations, 30% retention improvement.`;

type Props = {
  onResult: (data: any) => void;
  onLoading: (v: boolean) => void;
  loading: boolean;
};

export default function ProposalForm({ onResult, onLoading, loading }: Props) {
  const [text, setText] = useState("");
  const [category, setCategory] = useState("Governance");
  const [error, setError] = useState("");

  const analyze = async () => {
    if (text.trim().length < 50) {
      setError("Please paste a proposal with at least 50 characters.");
      return;
    }
    setError("");
    onLoading(true);
    try {
      const res = await fetch("/api/analyze", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ proposalText: text, category }),
      });
      const data = await res.json();
      onResult(data);
    } catch {
      setError("Analysis failed. Please try again.");
    } finally {
      onLoading(false);
    }
  };

  return (
    <div className="bg-white/[0.03] border border-sky-400/10 rounded-xl p-6 backdrop-blur-sm">
      <div className="flex items-center justify-between mb-4">
        <div>
          <h2 className="font-semibold text-white">Paste Proposal Text</h2>
          <p className="text-xs text-slate-500 mt-0.5">Governance docs, grant requests, community plans</p>
        </div>
        <button
          onClick={() => setText(SAMPLE)}
          className="text-xs px-3 py-1.5 rounded-md border border-violet-400/30 bg-violet-400/5 text-violet-400 hover:bg-violet-400/10 transition-colors"
        >
          Load Sample ↗
        </button>
      </div>

      <textarea
        value={text}
        onChange={(e) => setText(e.target.value)}
        placeholder="Paste your proposal here..."
        className="w-full min-h-[200px] bg-[#070a13]/60 border border-white/5 rounded-lg p-4 text-slate-300 text-sm leading-relaxed resize-y focus:outline-none focus:border-sky-400/30 transition-colors"
      />

      <div className="flex items-center justify-between mt-4 flex-wrap gap-3">
        <div className="flex items-center gap-3">
          <select
            value={category}
            onChange={(e) => setCategory(e.target.value)}
            className="bg-[#070a13] border border-white/10 rounded-md px-3 py-2 text-slate-400 text-xs font-mono focus:outline-none"
          >
            {CATEGORIES.map((c) => <option key={c}>{c}</option>)}
          </select>
          <span className="text-xs text-slate-600 font-mono">{text.length} chars</span>
        </div>

        <button
          onClick={analyze}
          disabled={loading || !text.trim()}
          className="px-6 py-2 rounded-lg bg-gradient-to-r from-sky-500 to-indigo-500 text-white text-sm font-semibold disabled:opacity-40 disabled:cursor-not-allowed hover:opacity-90 transition-opacity"
        >
          {loading ? "Analyzing..." : "Analyze Proposal →"}
        </button>
      </div>

      {error && (
        <p className="mt-3 text-xs text-red-400 font-mono bg-red-400/5 border border-red-400/20 rounded-md px-3 py-2">
          {error}
        </p>
      )}
    </div>
  );
}