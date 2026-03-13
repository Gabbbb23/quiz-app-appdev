"use client";

import { Progress } from "@/components/ui/progress";
import { Badge } from "@/components/ui/badge";

interface ScoreBarProps {
  currentQuestion: number;
  totalQuestions: number;
  score: number;
}

export default function ScoreBar({ currentQuestion, totalQuestions, score }: ScoreBarProps) {
  const progressValue = ((currentQuestion + 1) / totalQuestions) * 100;

  return (
    <div className="flex flex-col gap-3 mb-4">
      <div className="flex items-center justify-between">
        <span className="text-sm text-muted-foreground">
          Question {currentQuestion + 1} of {totalQuestions}
        </span>
        <Badge variant="secondary" className="text-sm">
          Score: {score}/{totalQuestions}
        </Badge>
      </div>
      <Progress value={progressValue} />
    </div>
  );
}
