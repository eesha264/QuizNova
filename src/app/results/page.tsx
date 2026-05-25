"use client";

// Results page that reads the saved quiz result from localStorage.
import { useEffect, useState } from "react";

import type { QuizResult } from "@/types/quiz";

const QUIZ_RESULT_STORAGE_KEY = "quizResult";

export default function ResultsPage() {
  const [result, setResult] = useState<QuizResult | null>(null);

  useEffect(() => {
    const storedResult = localStorage.getItem(QUIZ_RESULT_STORAGE_KEY);

    if (!storedResult) {
      setResult(null);
      return;
    }

    try {
      const parsedResult = JSON.parse(storedResult) as QuizResult;
      setResult(parsedResult);
    } catch {
      setResult(null);
    }
  }, []);

  return (
    <main className="min-h-screen bg-black px-4 py-10 text-white sm:px-6 lg:px-8">
      <div className="mx-auto max-w-5xl space-y-6">
        <section className="rounded-[2rem] border border-white/10 bg-white/5 p-6 backdrop-blur-xl sm:p-8">
          <p className="text-sm uppercase tracking-[0.3em] text-purple-200/80">
            Results
          </p>
          <h1 className="mt-3 text-3xl font-semibold tracking-tight sm:text-4xl">
            Quiz performance summary
          </h1>
        </section>

        {result ? (
          <>
            <section className="grid gap-4 md:grid-cols-3">
              <div className="rounded-[1.75rem] border border-white/10 bg-white/5 p-6 backdrop-blur-xl">
                <p className="text-sm text-white/60">Score</p>
                <p className="mt-3 text-4xl font-semibold">{result.score}%</p>
              </div>
              <div className="rounded-[1.75rem] border border-white/10 bg-white/5 p-6 backdrop-blur-xl">
                <p className="text-sm text-white/60">Correct</p>
                <p className="mt-3 text-4xl font-semibold">
                  {result.correctCount} / {result.totalQuestions}
                </p>
              </div>
              <div className="rounded-[1.75rem] border border-white/10 bg-white/5 p-6 backdrop-blur-xl">
                <p className="text-sm text-white/60">Completed</p>
                <p className="mt-3 text-xl font-semibold">{new Date(result.completedAt).toLocaleString()}</p>
              </div>
            </section>

            <section className="rounded-[2rem] border border-white/10 bg-white/5 p-6 backdrop-blur-xl sm:p-8">
              <p className="text-sm uppercase tracking-[0.3em] text-purple-200/80">
                Answer review
              </p>
              <div className="mt-6 space-y-4">
                {result.answers.map((answer, index) => (
                  <div
                    key={`${index}-${answer.question}`}
                    className="rounded-[1.5rem] border border-white/10 bg-black/30 p-5"
                  >
                    <p className="text-sm uppercase tracking-[0.25em] text-white/45">
                      Question {index + 1}
                    </p>
                    <p className="mt-2 text-lg font-medium">{answer.question}</p>
                    <div className="mt-3 space-y-2 text-sm text-white/70">
                      <p>Selected: {answer.selectedAnswer ?? "No answer"}</p>
                      <p>Correct: {answer.correctAnswer}</p>
                      <p className={answer.isCorrect ? "text-emerald-300" : "text-red-300"}>
                        {answer.isCorrect ? "Correct" : "Incorrect"}
                      </p>
                      <p className="text-white/55">{answer.explanation}</p>
                    </div>
                  </div>
                ))}
              </div>
            </section>
          </>
        ) : (
          <div className="rounded-[1.75rem] border border-white/10 bg-white/5 p-6 text-white/65 backdrop-blur-xl">
            No saved quiz results found. Complete a quiz first.
          </div>
        )}
      </div>
    </main>
  );
}