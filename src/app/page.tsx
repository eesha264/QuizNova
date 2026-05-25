// Home page for the QuizNova AI App Router scaffold.
import { ArrowRight, Sparkles } from "lucide-react";
import type { ReactNode } from "react";

import { FeatureCard } from "@/components/feature-card";
import { Hero } from "@/components/Hero";
import { Navbar } from "@/components/navbar";

type Feature = {
  title: string;
  description: string;
  icon: ReactNode;
};

const features: Feature[] = [
  {
    title: "AI Quiz Generation",
    description:
      "Turn prompts, notes, or study material into ready-to-run quizzes.",
    icon: <Sparkles className="h-5 w-5" />,
  },
  {
    title: "Instant Results",
    description:
      "Show answers and feedback right away so the experience stays fast.",
    icon: <ArrowRight className="h-5 w-5" />,
  },
  {
    title: "Smart Performance Analysis",
    description:
      "Highlight strengths, weak spots, and progress trends automatically.",
    icon: <Sparkles className="h-5 w-5" />,
  },
];

export default function HomePage() {
  return (
    <main className="min-h-screen bg-[radial-gradient(circle_at_top,_rgba(168,85,247,0.16),_transparent_35%),linear-gradient(180deg,_#050505_0%,_#09090b_45%,_#020202_100%)] text-white">
      <div className="mx-auto flex w-full max-w-7xl flex-col px-4 pb-20 sm:px-6 lg:px-8">
        <Navbar />
        <Hero />

        <section id="features" className="grid gap-5 py-10 md:grid-cols-3">
          {features.map((feature) => (
            <FeatureCard
              key={feature.title}
              title={feature.title}
              description={feature.description}
              icon={feature.icon}
            />
          ))}
        </section>

        <section className="grid gap-6 rounded-[2rem] border border-white/10 bg-white/5 p-6 backdrop-blur-xl md:grid-cols-2 md:p-8">
          <div>
            <p className="text-sm uppercase tracking-[0.3em] text-purple-200/80">
              About
            </p>
            <h2 className="mt-3 text-3xl font-semibold tracking-tight sm:text-4xl">
              A scalable foundation for AI quiz generation.
            </h2>
            <p className="mt-4 max-w-xl text-sm leading-7 text-white/65 sm:text-base">
              This scaffold gives you the core routes, shared components, API
              handler, types, and service layer needed to grow QuizNova AI into
              a production app.
            </p>
          </div>

          <div className="rounded-[1.5rem] border border-white/10 bg-black/40 p-5">
            <p className="text-sm uppercase tracking-[0.3em] text-purple-200/80">
              Starter Flow
            </p>
            <div className="mt-4 space-y-3 text-sm text-white/70">
              <p>1. Generate a quiz from a topic or prompt.</p>
              <p>2. Present the quiz with clean interactive cards.</p>
              <p>3. Show results and performance insights.</p>
            </div>
          </div>
        </section>
      </div>
    </main>
  );
}