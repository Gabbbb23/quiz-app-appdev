"use client";

import { motion, AnimatePresence } from "framer-motion";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Alert, AlertTitle } from "@/components/ui/alert";
import { type Question } from "@/data/questions";

interface QuestionCardProps {
  question: Question;
  selectedAnswer: string | null;
  isCorrect: boolean | null;
  onSelectAnswer: (answer: string) => void;
  onNext: () => void;
  isLastQuestion: boolean;
}

export default function QuestionCard({
  question,
  selectedAnswer,
  isCorrect,
  onSelectAnswer,
  onNext,
  isLastQuestion,
}: QuestionCardProps) {
  return (
    <motion.div
      key={question.id}
      initial={{ opacity: 0, x: 30 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: -30 }}
      transition={{ duration: 0.3 }}
    >
      <Card>
        <CardHeader>
          <CardTitle className="text-lg">{question.question}</CardTitle>
        </CardHeader>
        <CardContent className="flex flex-col gap-3">
          {question.choices.map((choice) => {
            let variant: "outline" | "default" | "destructive" = "outline";
            let extraClass = "cursor-pointer";

            if (selectedAnswer === choice) {
              if (isCorrect) {
                variant = "default";
                extraClass = "bg-green-600 text-white border-green-600 hover:bg-green-600 cursor-default";
              } else {
                variant = "destructive";
                extraClass = "cursor-default";
              }
            }

            if (isCorrect && selectedAnswer !== choice) {
              extraClass = "opacity-50 cursor-default";
            }

            return (
              <Button
                key={choice}
                variant={variant}
                size="lg"
                className={`w-full justify-start text-left py-5 text-base ${extraClass}`}
                onClick={() => onSelectAnswer(choice)}
                disabled={isCorrect === true}
              >
                {choice}
              </Button>
            );
          })}

          <AnimatePresence>
            {isCorrect !== null && (
              <motion.div
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: "auto" }}
                exit={{ opacity: 0, height: 0 }}
                transition={{ duration: 0.2 }}
              >
                {isCorrect ? (
                  <Alert className="border-green-200 bg-green-50 text-green-800">
                    <AlertTitle>Correct!</AlertTitle>
                  </Alert>
                ) : (
                  <Alert variant="destructive">
                    <AlertTitle>Incorrect. Try again.</AlertTitle>
                  </Alert>
                )}
              </motion.div>
            )}
          </AnimatePresence>

          {isCorrect && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.3 }}
            >
              <Button
                size="lg"
                className="w-full py-5 text-base cursor-pointer"
                onClick={onNext}
              >
                {isLastQuestion ? "See Results" : "Next"}
              </Button>
            </motion.div>
          )}
        </CardContent>
      </Card>
    </motion.div>
  );
}
