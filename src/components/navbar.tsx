// Shared navigation bar used across QuizNova AI screens.
export function Navbar() {
  return (
    <header className="flex items-center justify-between rounded-full border border-white/10 bg-white/5 px-5 py-3 backdrop-blur-xl">
      <div>
        <p className="text-sm font-semibold tracking-[0.25em] uppercase text-purple-200/80">
          QuizNova AI
        </p>
      </div>

      <nav className="hidden items-center gap-6 text-sm text-white/65 md:flex">
        <a href="#features" className="transition hover:text-white">
          Features
        </a>
        <a href="#about" className="transition hover:text-white">
          About
        </a>
        <a href="#history" className="transition hover:text-white">
          History
        </a>
      </nav>

      <a
        href="/generate"
        className="rounded-full bg-white px-4 py-2 text-sm font-medium text-black transition hover:-translate-y-0.5"
      >
        Generate Quiz
      </a>
    </header>
  );
}