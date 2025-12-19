import { Card } from "@/components/ui/card";

const personas = [
  { id: "student", label: "Student 🎓" },
  { id: "remote", label: "Remote Worker 💻" },
  { id: "professional", label: "Skilled Professional 🧑‍💼" },
  { id: "founder", label: "Startup Founder 🚀" },
];

export function PersonaSelector({ value, onChange }: any) {
  return (
    <div className="grid md:grid-cols-4 gap-4">
      {personas.map(p => (
        <Card
          key={p.id}
          onClick={() => onChange(p.id)}
          className={`cursor-pointer p-4 text-center transition border ${
            value === p.id ? "border-indigo-400 text-white/80 bg-indigo-500/10" : "border-white/10"
          }`}
        >
          <p className="font-medium">{p.label}</p>
        </Card>
      ))}
    </div>
  );
}
