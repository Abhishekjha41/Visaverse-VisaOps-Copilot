export function RiskMeter({ score, level }: any) {
  const color =
    level === "Low" ? "bg-green-500" :
    level === "Medium" ? "bg-yellow-500" :
    "bg-red-500";

  return (
    <div className="space-y-2">
      <p className="text-sm text-white/70">Eligibility Confidence</p>
      <div className="w-full bg-white/10 rounded-full h-3">
        <div
          className={`${color} h-3 rounded-full`}
          style={{ width: `${score}%` }}
        />
      </div>
      <p className="text-xs text-white/60">
        {score}% • Risk Level: {level}
      </p>
    </div>
  );
}
