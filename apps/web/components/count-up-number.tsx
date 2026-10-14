"use client";

import { useEffect, useRef, useState } from "react";

type CountUpNumberProps = {
  value: number;
  suffix?: string;
  duration?: number;
  delay?: number;
};

export function CountUpNumber({
  value,
  suffix = "",
  duration = 1300,
  delay = 0,
}: CountUpNumberProps) {
  const ref = useRef<HTMLElement | null>(null);
  const frameRef = useRef<number | null>(null);
  const timeoutRef = useRef<number | null>(null);
  const [displayValue, setDisplayValue] = useState(value);

  useEffect(() => {
    const node = ref.current;
    if (!node) return;

    const reduceMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)",
    ).matches;

    if (reduceMotion || !("IntersectionObserver" in window)) {
      return;
    }

    let hasRun = false;

    const observer = new IntersectionObserver(
      (entries) => {
        const entry = entries[0];
        if (!entry?.isIntersecting || hasRun) return;

        hasRun = true;
        observer.disconnect();
        setDisplayValue(0);

        timeoutRef.current = window.setTimeout(() => {
          const startedAt = performance.now();

          const tick = (now: number) => {
            const progress = Math.min((now - startedAt) / duration, 1);
            const eased = 1 - Math.pow(1 - progress, 3);
            setDisplayValue(Math.round(value * eased));

            if (progress < 1) {
              frameRef.current = requestAnimationFrame(tick);
            } else {
              setDisplayValue(value);
            }
          };

          frameRef.current = requestAnimationFrame(tick);
        }, delay);
      },
      { threshold: 0.45 },
    );

    observer.observe(node);

    return () => {
      observer.disconnect();
      if (timeoutRef.current !== null) {
        window.clearTimeout(timeoutRef.current);
      }
      if (frameRef.current !== null) {
        cancelAnimationFrame(frameRef.current);
      }
    };
  }, [delay, duration, value]);

  return (
    <strong
      ref={ref}
      aria-label={`${value.toLocaleString("en-US")}${suffix}`}
    >
      {displayValue.toLocaleString("en-US")}
      {suffix}
    </strong>
  );
}
