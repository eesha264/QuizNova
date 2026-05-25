// Feature card component for showing product capabilities.
import type { ReactNode } from "react";

type FeatureCardProps = {
  title: string;
  description: string;
  icon: ReactNode;
};

export function FeatureCard({ title, description, icon }: FeatureCardProps) {
  return (
    <article className="rounded-[1.75rem] border border-white/10 bg-white/5 p-6 backdrop-blur-xl transition hover:-translate-y-1 hover:border-white/20 hover:bg-white/10">
      <div className="flex h-12 w-12 items-center justify-center rounded-2xl border border-white/10 bg-black/30 text-white">
        {icon}
      </div>
      <h3 className="mt-5 text-xl font-semibold tracking-tight">{title}</h3>
      <p className="mt-3 text-sm leading-7 text-white/65">{description}</p>
    </article>
  );
}