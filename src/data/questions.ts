export type Question = {
  id: number;
  question: string;
  choices: string[];
  correctAnswer: string;
};

export const questions: Question[] = [
  {
    id: 1,
    question: "What planet is known as the Red Planet?",
    choices: ["Mars", "Earth", "Venus", "Jupiter"],
    correctAnswer: "Mars",
  },
  {
    id: 2,
    question: "What is the largest ocean on Earth?",
    choices: ["Atlantic", "Indian", "Arctic", "Pacific"],
    correctAnswer: "Pacific",
  },
  {
    id: 3,
    question: "How many continents are there?",
    choices: ["5", "6", "7", "8"],
    correctAnswer: "7",
  },
  {
    id: 4,
    question: "What gas do plants absorb from the atmosphere?",
    choices: ["Oxygen", "Carbon Dioxide", "Nitrogen", "Hydrogen"],
    correctAnswer: "Carbon Dioxide",
  },
  {
    id: 5,
    question: "What is the hardest natural substance on Earth?",
    choices: ["Gold", "Iron", "Diamond", "Quartz"],
    correctAnswer: "Diamond",
  },
];
