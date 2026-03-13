"use client";

import { motion } from "framer-motion";
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { questions } from "@/data/questions";

interface StartScreenProps {
  onStart: () => void;
}

export default function StartScreen({ onStart }: StartScreenProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      transition={{ duration: 0.3 }}
    >
      <Card>
        <CardHeader className="text-center">
          <CardTitle className="text-2xl font-bold">General Knowledge Quiz</CardTitle>
          <CardDescription className="text-base">
            Test your knowledge with {questions.length} fun questions about the world around us.
          </CardDescription>
        </CardHeader>
        <CardContent className="flex flex-col items-center gap-4">
          <p className="text-muted-foreground text-sm">
            {questions.length} questions &middot; Multiple choice &middot; Try until you get it right
          </p>
          <Button size="lg" className="w-full text-base py-5 cursor-pointer" onClick={onStart}>
            Start Quiz
          </Button>
        </CardContent>
      </Card>
    </motion.div>
  );
}
