// Shared quiz domain types used by pages, services, and API routes.
export type QuizDifficulty = "easy" | "medium" | "hard";

export type QuizGenerationRequest = {
  topic: string;
  numberOfQuestions?: number;
  difficulty?: QuizDifficulty;
};

export type GeneratedQuizItem = {
  question: string;
  options: string[];
  correctAnswer: string;
  explanation: string;
};

export type QuizAnswerRecord = {
  question: string;
  selectedAnswer: string | null;
  correctAnswer: string;
  isCorrect: boolean;
  explanation: string;
};

export type QuizResult = {
  score: number;
  totalQuestions: number;
  correctCount: number;
  answers: QuizAnswerRecord[];
  completedAt: string;
};

export type QuizOption = {
  label: string;
  isCorrect?: boolean;
};

export type QuizQuestion = {
  id: string;
  prompt: string;
  options: QuizOption[];
  explanation?: string;
  correctOptionIndex?: number;
};

export type Quiz = {
  id: string;
  title: string;
  topic: string;
  difficulty: QuizDifficulty;
  generatedBy: "mock" | "gemini";
  createdAt: string;
  questions: QuizQuestion[];
};
