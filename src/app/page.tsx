"use client";

import { useState } from "react";
import { AnimatePresence } from "framer-motion";
import StartScreen from "@/components/StartScreen";
import QuestionCard from "@/components/QuestionCard";
import ResultsScreen from "@/components/ResultsScreen";
import ScoreBar from "@/components/ScoreBar";
import { questions } from "@/data/questions";

type QuizState = "start" | "playing" | "finished";

export default function Home() {
  const [quizState, setQuizState] = useState<QuizState>("start");
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [score, setScore] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState<string | null>(null);
  const [isCorrect, setIsCorrect] = useState<boolean | null>(null);
  const [answeredCorrectlyFirst, setAnsweredCorrectlyFirst] = useState<boolean[]>([]);
  const [hasAttempted, setHasAttempted] = useState(false);

  const currentQuestion = questions[currentQuestionIndex];

  function handleStart() {
    setQuizState("playing");
    setCurrentQuestionIndex(0);
    setScore(0);
    setSelectedAnswer(null);
    setIsCorrect(null);
    setAnsweredCorrectlyFirst([]);
    setHasAttempted(false);
  }

  function handleSelectAnswer(answer: string) {
    if (isCorrect) return;

    setSelectedAnswer(answer);
    const correct = answer === currentQuestion.correctAnswer;
    setIsCorrect(correct);

    if (correct) {
      if (!hasAttempted) {
        setScore((prev) => prev + 1);
        setAnsweredCorrectlyFirst((prev) => [...prev, true]);
      } else {
        setAnsweredCorrectlyFirst((prev) => [...prev, false]);
      }
    } else {
      setHasAttempted(true);
      setTimeout(() => {
        setSelectedAnswer(null);
        setIsCorrect(null);
      }, 800);
    }
  }

  function handleNext() {
    if (currentQuestionIndex === questions.length - 1) {
      setQuizState("finished");
    } else {
      setCurrentQuestionIndex((prev) => prev + 1);
      setSelectedAnswer(null);
      setIsCorrect(null);
      setHasAttempted(false);
    }
  }

  return (
    <main className="min-h-screen flex items-center justify-center p-4 bg-background">
      <div className="w-full max-w-md">
        <AnimatePresence mode="wait">
          {quizState === "start" && (
            <StartScreen key="start" onStart={handleStart} />
          )}
          {quizState === "playing" && (
            <div key="playing">
              <ScoreBar
                currentQuestion={currentQuestionIndex}
                totalQuestions={questions.length}
                score={score}
              />
              <QuestionCard
                question={currentQuestion}
                selectedAnswer={selectedAnswer}
                isCorrect={isCorrect}
                onSelectAnswer={handleSelectAnswer}
                onNext={handleNext}
                isLastQuestion={currentQuestionIndex === questions.length - 1}
              />
            </div>
          )}
          {quizState === "finished" && (
            <ResultsScreen
              key="finished"
              score={score}
              answeredCorrectlyFirst={answeredCorrectlyFirst}
              onPlayAgain={handleStart}
            />
          )}
        </AnimatePresence>
      </div>
    </main>
  );
}
