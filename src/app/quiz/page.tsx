"use client";

// Quiz playback page that hydrates generated quiz data from localStorage.
import { AnimatePresence, motion } from "framer-motion";
import { useEffect, useMemo, useState } from "react";
import { useRouter } from "next/navigation";

import type { GeneratedQuizItem, QuizResult } from "@/types/quiz";

const QUESTION_TIME_LIMIT = 20;
const QUIZ_RESULT_STORAGE_KEY = "quizResult";

export default function QuizPage() {
  const router = useRouter();
  const [quizData, setQuizData] = useState<GeneratedQuizItem[] | null>(null);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [selectedAnswers, setSelectedAnswers] = useState<Record<number, string>>(
    {},
  );
  const [secondsRemaining, setSecondsRemaining] = useState(QUESTION_TIME_LIMIT);
  const [isSubmitted, setIsSubmitted] = useState(false);

  useEffect(() => {
    const storedQuiz = localStorage.getItem("quizData");

    if (!storedQuiz) {
      setQuizData([]);
      return;
    }

    try {
      const parsedQuiz = JSON.parse(storedQuiz) as GeneratedQuizItem[];
      setQuizData(Array.isArray(parsedQuiz) ? parsedQuiz : []);
    } catch {
      setQuizData([]);
    }
  }, []);

  useEffect(() => {
    if (!quizData || quizData.length === 0 || isSubmitted) {
      return;
    }

    setSecondsRemaining(QUESTION_TIME_LIMIT);

    const intervalId = window.setInterval(() => {
      setSecondsRemaining((previous) => {
        if (previous <= 1) {
          window.clearInterval(intervalId);
          handleNextQuestion();
          return QUESTION_TIME_LIMIT;
        }

        return previous - 1;
      });
    }, 1000);

    return () => window.clearInterval(intervalId);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [currentQuestionIndex, quizData, isSubmitted]);

  const currentQuestion = useMemo(
    () => quizData?.[currentQuestionIndex] ?? null,
    [quizData, currentQuestionIndex],
  );

  function handleOptionSelect(option: string) {
    setSelectedAnswers((previous) => ({
      ...previous,
      [currentQuestionIndex]: option,
    }));
  }

  function finishQuiz(finalAnswers: Record<number, string>) {
    if (!quizData) {
      return;
    }

    const answerRecords = quizData.map((question, index) => {
      const selectedAnswer = finalAnswers[index] ?? null;
      const isCorrect = selectedAnswer === question.correctAnswer;

      return {
        question: question.question,
        selectedAnswer,
        correctAnswer: question.correctAnswer,
        isCorrect,
        explanation: question.explanation,
      };
    });

    const correctCount = answerRecords.filter((answer) => answer.isCorrect).length;
    const totalQuestions = quizData.length;
    const score = totalQuestions > 0 ? Math.round((correctCount / totalQuestions) * 100) : 0;

    const result: QuizResult = {
      score,
      totalQuestions,
      correctCount,
      answers: answerRecords,
      completedAt: new Date().toISOString(),
    };

    localStorage.setItem(QUIZ_RESULT_STORAGE_KEY, JSON.stringify(result));
    setIsSubmitted(true);
    router.push("/results");
  }

  function handleNextQuestion() {
    if (!quizData) {
      return;
    }

    const isLastQuestion = currentQuestionIndex >= quizData.length - 1;

    if (isLastQuestion) {
      finishQuiz(selectedAnswers);
      return;
    }

    setCurrentQuestionIndex((previous) => previous + 1);
  }

  return (
    <main className="min-h-screen bg-black px-4 py-10 text-white sm:px-6 lg:px-8">
      <div className="mx-auto max-w-4xl space-y-6">
        <section className="rounded-[2rem] border border-white/10 bg-white/5 p-6 backdrop-blur-xl sm:p-8">
          <p className="text-sm uppercase tracking-[0.3em] text-purple-200/80">
            Quiz session
          </p>
          <h1 className="mt-3 text-3xl font-semibold tracking-tight sm:text-4xl">
            Generated quiz preview
          </h1>
        </section>

        {quizData === null ? (
          <div className="rounded-[1.75rem] border border-white/10 bg-white/5 p-6 text-white/65 backdrop-blur-xl">
            Loading your quiz...
          </div>
        ) : quizData.length === 0 ? (
          <div className="rounded-[1.75rem] border border-white/10 bg-white/5 p-6 text-white/65 backdrop-blur-xl">
            No saved quiz data found. Generate a quiz first.
          </div>
        ) : (
          <div className="grid gap-6">
            <section className="rounded-[2rem] border border-white/10 bg-white/5 p-6 backdrop-blur-xl sm:p-8">
              <div className="flex items-center justify-between gap-4 text-sm text-white/65">
                <span>
                  Question {currentQuestionIndex + 1} of {quizData.length}
                </span>
                <span>Time left: {secondsRemaining}s</span>
              </div>

              <div className="mt-4 h-2 w-full overflow-hidden rounded-full bg-white/10">
                <motion.div
                  className="h-full rounded-full bg-gradient-to-r from-violet-500 via-fuchsia-500 to-purple-400"
                  initial={false}
                  animate={{
                    width: `${((currentQuestionIndex + 1) / quizData.length) * 100}%`,
                  }}
                  transition={{ duration: 0.35, ease: "easeOut" }}
                />
              </div>

              <AnimatePresence mode="wait">
                {currentQuestion ? (
                  <motion.div
                    key={currentQuestionIndex}
                    initial={{ opacity: 0, y: 18 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -18 }}
                    transition={{ duration: 0.35, ease: "easeOut" }}
                    className="mt-8 space-y-6"
                  >
                    <div>
                      <p className="text-sm uppercase tracking-[0.3em] text-purple-200/80">
                        Question
                      </p>
                      <h2 className="mt-3 text-2xl font-semibold tracking-tight sm:text-3xl">
                        {currentQuestion.question}
                      </h2>
                    </div>

                    <div className="grid gap-3">
                      {currentQuestion.options.map((option) => {
                        const isSelected =
                          selectedAnswers[currentQuestionIndex] === option;

                        return (
                          <button
                            key={option}
                            type="button"
                            onClick={() => handleOptionSelect(option)}
                            className={`rounded-2xl border px-4 py-4 text-left text-sm transition-all duration-200 ${
                              isSelected
                                ? "border-purple-400/70 bg-purple-500/20 text-white shadow-[0_0_30px_rgba(168,85,247,0.15)]"
                                : "border-white/10 bg-black/30 text-white/80 hover:border-white/20 hover:bg-white/10"
                            }`}
                          >
                            {option}
                          </button>
                        );
                      })}
                    </div>

                    <div className="flex items-center justify-end">
                      <button
                        type="button"
                        onClick={handleNextQuestion}
                        className="inline-flex items-center justify-center rounded-full bg-white px-6 py-3 text-sm font-medium text-black transition hover:-translate-y-0.5"
                      >
                        {currentQuestionIndex === quizData.length - 1
                          ? "Finish Quiz"
                          : "Next Question"}
                      </button>
                    </div>
                  </motion.div>
                ) : null}
              </AnimatePresence>
            </section>

            <section className="rounded-[1.75rem] border border-white/10 bg-white/5 p-6 backdrop-blur-xl">
              <p className="text-sm text-white/60">Selected answers</p>
              <div className="mt-3 space-y-2 text-sm text-white/70">
                {quizData.map((question, index) => (
                  <p key={`${index}-${question.question}`}>
                    {index + 1}. {selectedAnswers[index] ?? "Not answered yet"}
                  </p>
                ))}
              </div>
            </section>
          </div>
        )}
      </div>
    </main>
  );
}