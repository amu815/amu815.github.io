import type { ReactNode } from "react";

export function Section({
  id,
  title,
  subtitle,
  children,
}: {
  id?: string;
  title: string;
  subtitle?: string;
  children: ReactNode;
}) {
  return (
    <section id={id} className="reveal scroll-mt-20 px-4 py-6 sm:py-8">
      <div className="mb-6 flex items-end justify-between gap-4">
        <div className="min-w-0">
          <h2 className="text-2xl font-bold tracking-tight sm:text-3xl">
            <span className="text-gradient-accent">#</span>{" "}
            <span className="bg-gradient-to-r from-foreground to-muted-strong bg-clip-text text-transparent">
              {title}
            </span>
          </h2>
          {subtitle && <p className="mt-1 text-sm text-muted">{subtitle}</p>}
          <div className="mt-3 h-px w-24 bg-gradient-to-r from-accent via-purple to-cyan" />
        </div>
        <div className="hidden h-px flex-1 bg-border sm:block" />
      </div>
      {children}
    </section>
  );
}
