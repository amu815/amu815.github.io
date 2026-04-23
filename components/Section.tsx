import type { ReactNode } from "react";

export function Section({
  id,
  title,
  children,
}: {
  id?: string;
  title: string;
  children: ReactNode;
}) {
  return (
    <section id={id} className="border-t border-border/60 px-4 py-8">
      <h2 className="mb-6 text-2xl font-bold tracking-tight">
        <span className="text-accent">#</span> {title}
      </h2>
      {children}
    </section>
  );
}
