// Quiz question card component for rendering generated quiz questions and answers.
type QuizCardProps = {
  number: number;
  question: string;
  options: string[];
  correctAnswer?: string;
  explanation?: string;
};

export function QuizCard({
  number,
  question,
  options,
  correctAnswer,
  explanation,
}: QuizCardProps) {
  return (
    <article className="rounded-[1.75rem] border border-white/10 bg-white/5 p-6 backdrop-blur-xl sm:p-7">
      <p className="text-sm uppercase tracking-[0.3em] text-purple-200/80">
        Question {number}
      </p>
      <h3 className="mt-3 text-xl font-semibold tracking-tight sm:text-2xl">
        {question}
      </h3>
      <div className="mt-5 grid gap-3 sm:grid-cols-2">
        {options.map((option) => (
          <button
            key={option}
            className="rounded-2xl border border-white/10 bg-black/30 px-4 py-3 text-left text-sm text-white/80 transition hover:border-white/20 hover:bg-white/10"
          >
            {option}
          </button>
        ))}
      </div>

      {correctAnswer ? (
        <p className="mt-5 text-sm text-emerald-300">
          Correct answer: {correctAnswer}
        </p>
      ) : null}

      {explanation ? (
        <p className="mt-2 text-sm leading-6 text-white/60">{explanation}</p>
      ) : null}
    </article>
  );
}