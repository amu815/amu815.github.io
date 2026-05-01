"use client";

import { useEffect, useRef, useState, type ReactNode } from "react";

export function FadeScroll({
  children,
  maxHeight = "44rem",
}: {
  children: ReactNode;
  maxHeight?: string;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const [atTop, setAtTop] = useState(true);
  const [atBottom, setAtBottom] = useState(true);
  const [overflowing, setOverflowing] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const update = () => {
      const overflow = el.scrollHeight - el.clientHeight > 4;
      setOverflowing(overflow);
      setAtTop(el.scrollTop <= 4);
      setAtBottom(el.scrollTop + el.clientHeight >= el.scrollHeight - 4);
    };
    update();
    el.addEventListener("scroll", update, { passive: true });
    const ro = new ResizeObserver(update);
    ro.observe(el);
    for (const child of Array.from(el.children)) ro.observe(child);
    return () => {
      el.removeEventListener("scroll", update);
      ro.disconnect();
    };
  }, []);

  const topStop = atTop ? "0%" : "10%";
  const bottomStop = atBottom ? "100%" : "90%";
  const mask = overflowing
    ? `linear-gradient(to bottom, transparent 0%, #000 ${topStop}, #000 ${bottomStop}, transparent 100%)`
    : "none";

  return (
    <div className="relative">
      <div
        ref={ref}
        className="fade-scroll overflow-y-auto pr-1"
        style={{
          maxHeight,
          WebkitMaskImage: mask,
          maskImage: mask,
        }}
      >
        {children}
      </div>
      {overflowing && !atBottom && (
        <div
          aria-hidden
          className="pointer-events-none absolute inset-x-0 bottom-1 flex justify-center"
        >
          <span className="inline-flex animate-bounce items-center gap-1 rounded-full border border-border-strong bg-background/80 px-2 py-0.5 text-[10px] font-mono uppercase tracking-wider text-muted backdrop-blur">
            <svg viewBox="0 0 24 24" className="h-3 w-3" aria-hidden fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M6 9l6 6 6-6" />
            </svg>
            scroll
          </span>
        </div>
      )}
    </div>
  );
}
