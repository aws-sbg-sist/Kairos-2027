import type { CheckpointEvaluation } from '@/types';

export function calculatePopulationZScores(scores: number[]): number[] {
  if (scores.length < 2) return scores.map(() => 0);

  const mean = scores.reduce((sum, score) => sum + score, 0) / scores.length;
  const variance = scores.reduce((sum, score) => sum + Math.pow(score - mean, 2), 0) / scores.length;
  const standardDeviation = Math.sqrt(variance);

  if (!Number.isFinite(standardDeviation) || standardDeviation <= 0.001) {
    return scores.map(() => 0);
  }

  return scores.map((score) => Number(((score - mean) / standardDeviation).toFixed(4)));
}

export function recalculateJudgeCheckpointScores(
  evaluations: CheckpointEvaluation[],
  judgeId: string,
  checkpointGate: CheckpointEvaluation['checkpointGate']
): void {
  const comparable = evaluations.filter(
    (evaluation) => evaluation.judgeId === judgeId && evaluation.checkpointGate === checkpointGate
  );
  const normalized = calculatePopulationZScores(comparable.map((evaluation) => evaluation.rawTotalScore));
  comparable.forEach((evaluation, index) => {
    evaluation.normalizedZScore = normalized[index];
  });
}
