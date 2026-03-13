"use client";

import { motion } from "framer-motion";
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { questions } from "@/data/questions";

interface ResultsScreenProps {
  score: number;
  answeredCorrectlyFirst: boolean[];
  onPlayAgain: () => void;
}

export default function ResultsScreen({ score, answeredCorrectlyFirst, onPlayAgain }: ResultsScreenProps) {
  const total = questions.length;
  const percentage = (score / total) * 100;

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      transition={{ duration: 0.3 }}
    >
      <Card>
        <CardHeader className="text-center">
          <CardTitle className="text-2xl font-bold">
            {percentage >= 80 && (
              <motion.span
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ delay: 0.3, type: "spring" }}
                className="inline-block mr-2"
              >
                🎉
              </motion.span>
            )}
            Quiz Complete!
            {percentage >= 80 && (
              <motion.span
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ delay: 0.5, type: "spring" }}
                className="inline-block ml-2"
              >
                🎉
              </motion.span>
            )}
          </CardTitle>
          <CardDescription className="text-base">
            You got <span className="font-semibold text-foreground">{score}</span> out of{" "}
            <span className="font-semibold text-foreground">{total}</span> correct!
          </CardDescription>
        </CardHeader>
        <CardContent className="flex flex-col gap-4">
          <div className="flex flex-col gap-2">
            {questions.map((q, index) => (
              <motion.div
                key={q.id}
                initial={{ opacity: 0, x: -10 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: index * 0.1 }}
                className="flex items-start gap-3 rounded-lg border p-3"
              >
                <Badge
                  variant={answeredCorrectlyFirst[index] ? "default" : "destructive"}
                  className={
                    answeredCorrectlyFirst[index]
                      ? "bg-green-600 text-white mt-0.5 shrink-0"
                      : "mt-0.5 shrink-0"
                  }
                >
                  {answeredCorrectlyFirst[index] ? "Correct" : "Missed"}
                </Badge>
                <div className="flex flex-col gap-0.5">
                  <span className="text-sm font-medium">{q.question}</span>
                  <span className="text-xs text-muted-foreground">
                    Answer: {q.correctAnswer}
                  </span>
                </div>
              </motion.div>
            ))}
          </div>

          <Button size="lg" className="w-full py-5 text-base cursor-pointer" onClick={onPlayAgain}>
            Play Again
          </Button>
        </CardContent>
      </Card>
    </motion.div>
  );
}
