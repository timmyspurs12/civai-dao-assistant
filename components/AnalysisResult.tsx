type Props = { data: any; category: string };

const rec_config: Record<string, { border: string; text: string }> = {
  Support: { border: "border-emerald-400/30", text: "text-emerald-400" },
  Neutral: { border: "border-amber-400/30", text: "text-amber-400" },
  Oppose: { border: "border-red-400/30", text: "text-red-400" },
};

export default function AnalysisResult({ data, category }: Props) {
  const rec = rec_config[data.recommendation] ?? rec_config["Neutral"];

  const benefits = Array.isArray(data.benefits) ? data.benefits : [];
  const risks = Array.isArray(data.risks) ? data.risks : [];
  const nextSteps = Array.isArray(data.nextSteps) ? data.nextSteps : [];

  return (
    <div className="mt-6 space-y-4">
      <div className="flex items-center gap-2 flex-wrap">
        <span className="text-xs font-mono px-3 py-1 rounded-full bg-emerald-400/10 border border-emerald-400/25 text-emerald-400">Analysis Complete</span>
        <span className="text-xs font-mono px-3 py-1 rounded-full bg-violet-400/10 border border-violet-400/25 text-violet-400">{category}</span>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {/* Summary */}
        <div className="md:col-span-2 bg-white/[0.03] border border-sky-400/10 rounded-xl p-5">
          <h3 className="text-xs font-mono uppercase tracking-widest text-sky-400 mb-3">◎ Executive Summary</h3>
          <p className="text-slate-300 text-sm leading-relaxed">{data.summary}</p>
        </div>

        {/* Benefits */}
        <div className="bg-white/[0.03] border border-emerald-400/10 rounded-xl p-5">
          <h3 className="text-xs font-mono uppercase tracking-widest text-emerald-400 mb-3">↑ Key Benefits</h3>
          <ul className="space-y-2">
            {benefits.map((b: string, i: number) => (
              <li key={i} className="flex gap-3 text-sm text-slate-300">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 mt-2 shrink-0" />
                {b}
              </li>
            ))}
          </ul>
        </div>

        {/* Risks */}
        <div className="bg-white/[0.03] border border-red-400/10 rounded-xl p-5">
          <h3 className="text-xs font-mono uppercase tracking-widest text-red-400 mb-3">⚠ Potential Risks</h3>
          <ul className="space-y-2">
            {risks.map((r: string, i: number) => (
              <li key={i} className="flex gap-3 text-sm text-slate-300">
                <span className="w-1.5 h-1.5 rounded-full bg-red-400 mt-2 shrink-0" />
                {r}
              </li>
            ))}
          </ul>
        </div>

        {/* Stakeholder */}
        <div className="bg-white/[0.03] border border-violet-400/10 rounded-xl p-5">
          <h3 className="text-xs font-mono uppercase tracking-widest text-violet-400 mb-3">⬡ Stakeholder Impact</h3>
          <p className="text-slate-300 text-sm leading-relaxed">{data.stakeholderImpact}</p>
        </div>

        {/* Recommendation */}
        <div className={`bg-white/[0.03] border ${rec.border} rounded-xl p-5`}>
          <h3 className="text-xs font-mono uppercase tracking-widest text-slate-400 mb-3">◈ Recommendation</h3>
          <div className={`text-2xl font-bold mb-2 ${rec.text}`}>{data.recommendation?.toUpperCase()}</div>
          <p className="text-slate-400 text-sm leading-relaxed">{data.reasoning}</p>
        </div>

        {/* Next Steps */}
        <div className="md:col-span-2 bg-white/[0.03] border border-violet-400/10 rounded-xl p-5">
          <h3 className="text-xs font-mono uppercase tracking-widest text-violet-400 mb-3">→ Next Steps</h3>
          <div className="space-y-2">
            {nextSteps.map((s: string, i: number) => (
              <div key={i} className="flex gap-3 text-sm text-slate-300">
                <span className="w-5 h-5 rounded bg-sky-400/10 border border-sky-400/25 text-sky-400 text-xs font-mono flex items-center justify-center shrink-0 mt-0.5">
                  {i + 1}
                </span>
                {s}
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}