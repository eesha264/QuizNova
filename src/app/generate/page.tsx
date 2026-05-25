"use client";

// Quiz generation page for creating a quiz and redirecting into the quiz flow.
import { useRouter } from "next/navigation";
import { useState } from "react";
import toast from "react-hot-toast";

import { LoadingSpinner } from "@/components/loading-spinner";
import { generateQuizRequest } from "@/services/quizService";
import type { QuizDifficulty } from "@/types/quiz";

export default function GeneratePage() {
  const router = useRouter();
  const [topic, setTopic] = useState("");
  const [difficulty, setDifficulty] = useState<QuizDifficulty>("medium");
  const [numberOfQuestions, setNumberOfQuestions] = useState(5);
  const [isLoading, setIsLoading] = useState(false);

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();

    if (!topic.trim()) {
      toast.error("Please enter a topic to generate a quiz.");
      return;
    }

    try {
      setIsLoading(true);

      const quizData = await generateQuizRequest({
        topic: topic.trim(),
        difficulty,
        numberOfQuestions,
      });

      localStorage.setItem("quizData", JSON.stringify(quizData));
      toast.success("Quiz generated successfully.");
      router.push("/quiz");
    } catch (error) {
      const message =
        error instanceof Error ? error.message : "Failed to generate quiz.";
      toast.error(message);
    } finally {
      setIsLoading(false);
    }
  }

  return (
    <main className="min-h-screen bg-black px-4 py-10 text-white sm:px-6 lg:px-8">
      <div className="mx-auto max-w-4xl space-y-6">
        <section className="rounded-[2rem] border border-white/10 bg-white/5 p-6 backdrop-blur-xl sm:p-8">
          <p className="text-sm uppercase tracking-[0.3em] text-purple-200/80">
            Generate
          </p>
          <h1 className="mt-3 text-3xl font-semibold tracking-tight sm:text-4xl">
            Create a new AI quiz
          </h1>
          <p className="mt-3 max-w-2xl text-sm leading-7 text-white/65 sm:text-base">
            This page is the starting point for quiz creation. Wire it up to the
            API route when you’re ready to make real requests.
          </p>
        </section>

        <section className="grid gap-6 md:grid-cols-[1.2fr_0.8fr]">
          <form
            onSubmit={handleSubmit}
            className="rounded-[2rem] border border-white/10 bg-white/5 p-6 backdrop-blur-xl sm:p-8"
          >
            <label className="block text-sm font-medium text-white/80">
              Topic or prompt
              <textarea
                value={topic}
                onChange={(event) => setTopic(event.target.value)}
                className="mt-3 min-h-44 w-full rounded-2xl border border-white/10 bg-black/40 p-4 text-sm text-white outline-none transition focus:border-purple-400/60"
                placeholder="Example: Advanced JavaScript fundamentals"
              />
            </label>

            <div className="mt-4 grid gap-4 sm:grid-cols-2">
              <label className="block text-sm font-medium text-white/80">
                Questions
                <select
                  value={numberOfQuestions}
                  onChange={(event) => setNumberOfQuestions(Number(event.target.value))}
                  className="mt-3 w-full rounded-2xl border border-white/10 bg-black/40 p-4 text-sm text-white outline-none transition focus:border-purple-400/60"
                >
                  <option value={5}>5</option>
                  <option value={10}>10</option>
                  <option value={15}>15</option>
                </select>
              </label>
              <label className="block text-sm font-medium text-white/80">
                Difficulty
                <select
                  value={difficulty}
                  onChange={(event) => setDifficulty(event.target.value as QuizDifficulty)}
                  className="mt-3 w-full rounded-2xl border border-white/10 bg-black/40 p-4 text-sm text-white outline-none transition focus:border-purple-400/60"
                >
                  <option value="easy">Easy</option>
                  <option value="medium">Medium</option>
                  <option value="hard">Hard</option>
                </select>
              </label>
            </div>

            <button
              type="submit"
              disabled={isLoading}
              className="mt-6 inline-flex items-center justify-center gap-3 rounded-full bg-white px-6 py-3 text-sm font-medium text-black transition hover:-translate-y-0.5 disabled:cursor-not-allowed disabled:opacity-70 disabled:hover:translate-y-0"
            >
              {isLoading ? <LoadingSpinner /> : null}
              {isLoading ? "Generating..." : "Generate Quiz"}
            </button>
          </form>

          <aside className="rounded-[2rem] border border-white/10 bg-white/5 p-6 backdrop-blur-xl sm:p-8">
            <p className="text-sm uppercase tracking-[0.3em] text-purple-200/80">
              Status
            </p>
            <h2 className="mt-3 text-2xl font-semibold tracking-tight">
              Ready to generate
            </h2>
            <div className="mt-6 flex items-center gap-3 rounded-2xl border border-white/10 bg-black/30 p-4">
              <LoadingSpinner />
              <div>
                <p className="text-sm font-medium">Ready to generate</p>
                <p className="text-sm text-white/55">
                  Enter a topic, choose settings, and generate your quiz.
                </p>
              </div>
            </div>
          </aside>
        </section>
      </div>
    </main>
  );
}