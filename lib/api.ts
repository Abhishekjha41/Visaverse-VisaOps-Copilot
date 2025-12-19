// lib/api.ts
import type { PlanResponse, DocumentCheckResponse } from "./types";

const API_BASE = process.env.NEXT_PUBLIC_API_BASE || "http://localhost:3001";

export async function generatePlan(payload: any): Promise<PlanResponse> {
  const res = await fetch(`${API_BASE}/api/plan`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(payload),
  });
  if (!res.ok) {
    throw new Error("Failed to generate plan");
  }
  return res.json();
}

export async function runDocumentCheck(payload: {
  text: string;
}): Promise<DocumentCheckResponse> {
  const res = await fetch(`${API_BASE}/api/document-check`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(payload),
  });
  if (!res.ok) {
    throw new Error("Document check failed");
  }
  return res.json();
}
