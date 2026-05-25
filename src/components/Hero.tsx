// Hero section component for the homepage scaffold.
export function Hero() {
  return (
    <section className="grid gap-10 py-16 lg:grid-cols-[1.2fr_0.8fr] lg:items-center lg:py-24">
      <div className="space-y-6">
        <p className="text-sm uppercase tracking-[0.3em] text-purple-200/80">
          AI Quiz Platform
        </p>
        <h1 className="max-w-3xl text-5xl font-semibold tracking-tight sm:text-6xl lg:text-7xl">
          Generate AI-powered quizzes instantly.
        </h1>
        <p className="max-w-2xl text-base leading-8 text-white/65 sm:text-lg">
          QuizNova AI gives you a polished foundation for building quiz
          generation, playback, and results experiences with Next.js and
          TypeScript.
        </p>
        <div className="flex flex-col gap-3 sm:flex-row">
          <a
            href="/generate"
            className="inline-flex items-center justify-center rounded-full bg-white px-6 py-3 text-sm font-medium text-black transition hover:-translate-y-0.5"
          >
            Get Started
          </a>
          <a
            href="/quiz"
            className="inline-flex items-center justify-center rounded-full border border-white/10 bg-white/5 px-6 py-3 text-sm font-medium text-white transition hover:border-white/20 hover:bg-white/10"
          >
            Explore Quiz
          </a>
        </div>
      </div>

      <div className="rounded-[2rem] border border-white/10 bg-white/5 p-6 backdrop-blur-xl">
        <div className="rounded-[1.5rem] border border-white/10 bg-black/40 p-5">
          <p className="text-sm uppercase tracking-[0.3em] text-purple-200/80">
            Starter preview
          </p>
          <div className="mt-4 space-y-3 text-sm text-white/70">
            <p>• Define a topic.</p>
            <p>• Generate quiz questions.</p>
            <p>• Review results instantly.</p>
          </div>
        </div>
      </div>
    </section>
  );
}