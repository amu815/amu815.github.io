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
    <section
      id={id}
      className={`portfolio-section reveal ${
        id === "contact" ? "section-contact" : ""
      }`}
    >
      <header className="section-heading">
        <span className="section-number" aria-hidden />
        <h2>{title}</h2>
        {subtitle && <p className="section-subtitle">{subtitle}</p>}
      </header>
      <div className="section-content">{children}</div>
    </section>
  );
}
