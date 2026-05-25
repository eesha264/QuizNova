// Client-side service helpers for talking to the quiz generation API.
import type { GeneratedQuizItem, QuizGenerationRequest } from "@/types/quiz";

export async function generateQuizRequest(
  request: QuizGenerationRequest,
): Promise<GeneratedQuizItem[]> {
  const response = await fetch("/api/generate", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(request),
  });

  if (!response.ok) {
    const payload = (await response.json().catch(() => null)) as
      | { message?: string; error?: string }
      | null;

    throw new Error(
      payload?.message || payload?.error || "Failed to generate quiz",
    );
  }

  return (await response.json()) as GeneratedQuizItem[];
}