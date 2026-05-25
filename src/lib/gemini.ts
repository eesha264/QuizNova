// Server-side helper for generating quiz content with Gemini.
import { GoogleGenerativeAI } from "@google/generative-ai";

import type { GeneratedQuizItem, QuizDifficulty, QuizGenerationRequest } from "@/types/quiz";

const DEFAULT_QUESTION_COUNT = 5;
const MODEL_NAME = "gemini-1.5-flash";
const FALLBACK_MODEL_NAMES = [
  "gemini-2.5-flash",
  "gemini-flash-latest",
  "gemini-1.5-flash-latest",
  "gemini-2.0-flash",
];

function buildQuizPrompt(request: QuizGenerationRequest) {
  const questionCount = request.numberOfQuestions ?? DEFAULT_QUESTION_COUNT;
  const difficulty = request.difficulty ?? "medium";

  return [
    `Generate exactly ${questionCount} quiz questions about: ${request.topic}.`,
    `Difficulty: ${difficulty}.`,
    "Return only valid JSON as an array.",
    'Each item must use this schema: {"question":"string","options":["string"],"correctAnswer":"string","explanation":"string"}.',
    "Rules:",
    "- The options array must contain 4 distinct options.",
    "- correctAnswer must exactly match one of the options.",
    "- explanation must be short and helpful.",
    "- Do not include markdown, code fences, or extra commentary.",
  ].join("\n");
}

function isGeneratedQuizItem(value: unknown): value is GeneratedQuizItem {
  if (!value || typeof value !== "object") {
    return false;
  }

  const item = value as Record<string, unknown>;

  return (
    typeof item.question === "string" &&
    Array.isArray(item.options) &&
    item.options.every((option) => typeof option === "string") &&
    typeof item.correctAnswer === "string" &&
    typeof item.explanation === "string" &&
    item.options.includes(item.correctAnswer)
  );
}

function parseQuizArray(rawText: string): GeneratedQuizItem[] {
  const parsed = JSON.parse(rawText) as unknown;

  if (!Array.isArray(parsed)) {
    throw new Error("Gemini response was not a JSON array");
  }

  const quiz = parsed.filter(isGeneratedQuizItem);

  if (quiz.length === 0) {
    throw new Error("Gemini response did not contain valid quiz items");
  }

  return quiz;
}

export async function generateQuiz(
  request: QuizGenerationRequest,
): Promise<GeneratedQuizItem[]> {
  const apiKey = process.env.GEMINI_API_KEY;

  if (!apiKey) {
    throw new Error("GEMINI_API_KEY is not configured");
  }

  const genAI = new GoogleGenerativeAI(apiKey);

  const modelNames = [MODEL_NAME, ...FALLBACK_MODEL_NAMES];

  let lastError: unknown;

  for (const modelName of modelNames) {
    try {
      const model = genAI.getGenerativeModel({ model: modelName });
      const result = await model.generateContent({
        contents: [{ role: "user", parts: [{ text: buildQuizPrompt(request) }] }],
        generationConfig: {
          temperature: 0.7,
          responseMimeType: "application/json",
        },
      });

      const rawText = result.response.text().trim();

      if (!rawText) {
        throw new Error("Gemini returned an empty response");
      }

      return parseQuizArray(rawText);
    } catch (error) {
      lastError = error;
    }
  }

  throw new Error(
    lastError instanceof Error
      ? `Gemini generation failed: ${lastError.message}`
      : "Gemini generation failed",
  );
}

export type { QuizDifficulty };
