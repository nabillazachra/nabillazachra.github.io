"use client";

import { useEffect, useRef, useState } from "react";

type CountUpNumberProps = {
  value: number;
  suffix?: string;
  duration?: number;
};

export function CountUpNumber({
  value,
  suffix = "",
  duration = 1300,
}: CountUpNumberProps) {
  const ref = useRef<HTMLElement | null>(null);
  const frameRef = useRef<number | null>(null);
  const [displayValue, setDisplayValue] = useState(value);

  useEffect(() => {
    const node = ref.current;
    if (!node) return;

    const reduceMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)",
    ).matches;

    if (reduceMotion || !("IntersectionObserver" in window)) {
      setDisplayValue(value);
      return;
    }

    let hasRun = false;

    const observer = new IntersectionObserver(
      (entries) => {
        const entry = entries[0];
        if (!entry?.isIntersecting || hasRun) return;

        hasRun = true;
        observer.disconnect();

        const startedAt = performance.now();
        setDisplayValue(0);

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
      },
      { threshold: 0.45 },
    );

    observer.observe(node);

    return () => {
      observer.disconnect();
      if (frameRef.current !== null) {
        cancelAnimationFrame(frameRef.current);
      }
    };
  }, [duration, value]);

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
