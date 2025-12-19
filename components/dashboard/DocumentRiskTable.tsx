export function DocumentRiskTable({ docs }: any) {
  return (
    <div>
      <p className="font-medium mb-2">Document Risk Heatmap</p>
      {docs.map((d: any, i: number) => (
        <div key={i} className="flex justify-between text-sm">
          <span>{d.name}</span>
          <span
            className={
              d.risk === "High"
                ? "text-red-400"
                : d.risk === "Medium"
                ? "text-yellow-400"
                : "text-green-400"
            }
          >
            {d.risk}
          </span>
        </div>
      ))}
    </div>
  );
}
