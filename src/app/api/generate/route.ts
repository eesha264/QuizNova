// API route for generating quiz content from the server.
import { NextResponse } from "next/server";

import { generateQuiz } from "@/lib/gemini";
import type { QuizGenerationRequest } from "@/types/quiz";

export async function POST(request: Request) {
  try {
    const body = (await request.json().catch(() => null)) as
      | Partial<QuizGenerationRequest>
      | null;

    if (!process.env.GEMINI_API_KEY) {
      return NextResponse.json(
        {
          error: "Gemini API key is missing.",
          message: "Set GEMINI_API_KEY in your environment before generating a quiz.",
        },
        { status: 503 },
      );
    }

    const quiz = await generateQuiz({
      topic: body?.topic?.trim() || "General Knowledge",
      numberOfQuestions: body?.numberOfQuestions ?? 5,
      difficulty: body?.difficulty ?? "medium",
    });

    return NextResponse.json(quiz);
  } catch (error) {
    const message = error instanceof Error ? error.message : "Unknown error";

    const status = message.includes("Gemini") ? 502 : 500;

    return NextResponse.json(
      { error: "Failed to generate quiz", message },
      { status },
    );
  }
}