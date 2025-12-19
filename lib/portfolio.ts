// lib/portfolio.ts
import type { PlanResponse } from "./types";

type RiskLevel = "Low" | "Medium" | "High";

export type PortfolioInsights = {
  simulatedCount: number;
  avgApproval: number;
  highRiskCount: number;
  mediumRiskCount: number;
  lowRiskCount: number;
  avgProcessingTime: string | null;
  topRisks: string[];
  globalActions: { action: string; impactPercent: number }[];
};

type ProfileWithPlan = {
  plan?: PlanResponse;
};

export function aggregatePortfolio(profiles: ProfileWithPlan[]): PortfolioInsights {
  const withPlan = profiles.filter((p) => p.plan);
  if (!withPlan.length) {
    return {
      simulatedCount: 0,
      avgApproval: 0,
      highRiskCount: 0,
      mediumRiskCount: 0,
      lowRiskCount: 0,
      avgProcessingTime: null,
      topRisks: [],
      globalActions: [],
    };
  }

  let approvalSum = 0;
  let highRisk = 0;
  let mediumRisk = 0;
  let lowRisk = 0;

  const processingTimes: string[] = [];
  const riskCounts = new Map<string, number>();
  const actionMap = new Map<string, number>();

  for (const p of withPlan) {
    const plan = p.plan!;
    const sim = plan.approvalSimulation;
    const strategy = plan.strategy;

    approvalSum += sim.approvalProbability;

    const riskLevel: RiskLevel = strategy.riskLevel;
    if (riskLevel === "High") highRisk++;
    else if (riskLevel === "Medium") mediumRisk++;
    else lowRisk++;

    for (const r of sim.topRejectionRisks || []) {
      riskCounts.set(r, (riskCounts.get(r) || 0) + 1);
    }

    for (const a of sim.fastestImprovements || []) {
      actionMap.set(a.action, (actionMap.get(a.action) || 0) + a.impactPercent);
    }

    if (plan.timeline?.length) {
      for (const step of plan.timeline) {
        if (step.estimatedDuration) processingTimes.push(step.estimatedDuration);
      }
    }
  }

  const sortedRisks = Array.from(riskCounts.entries())
    .sort((a, b) => b[1] - a[1])
    .slice(0, 5)
    .map(([risk]) => risk);

  const globalActions = Array.from(actionMap.entries())
    .map(([action, totalImpact]) => ({
      action,
      impactPercent: Math.min(40, Math.round(totalImpact)),
    }))
    .sort((a, b) => b.impactPercent - a.impactPercent)
    .slice(0, 5);

  const avgApproval = approvalSum / withPlan.length;

  let avgProcessingTime: string | null = null;
  if (processingTimes.length) {
    const sample = processingTimes[0];
    avgProcessingTime = sample;
  }

  return {
    simulatedCount: withPlan.length,
    avgApproval,
    highRiskCount: highRisk,
    mediumRiskCount: mediumRisk,
    lowRiskCount: lowRisk,
    avgProcessingTime,
    topRisks: sortedRisks,
    globalActions,
  };
}
