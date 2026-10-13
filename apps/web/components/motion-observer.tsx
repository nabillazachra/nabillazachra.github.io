"use client";

import { useLayoutEffect } from "react";

export function MotionObserver() {
  useLayoutEffect(() => {
    const root = document.documentElement;
    const nodes = Array.from(
      document.querySelectorAll<HTMLElement>("[data-reveal]"),
    );

    const isInitiallyVisible = (node: HTMLElement) => {
      const rect = node.getBoundingClientRect();
      const viewportHeight =
        window.innerHeight || document.documentElement.clientHeight;

      return rect.bottom > -24 && rect.top < viewportHeight * 1.08;
    };

    nodes.forEach((node) => {
      if (isInitiallyVisible(node)) {
        node.classList.add("is-visible", "is-initial");
      } else {
        node.classList.add("reveal-pending");
      }
    });

    root.classList.add("motion-ready");

    if (!("IntersectionObserver" in window)) {
      nodes.forEach((node) => {
        node.classList.remove("reveal-pending");
        node.classList.add("is-visible");
      });
      return;
    }

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (!entry.isIntersecting) return;

          const node = entry.target as HTMLElement;
          node.classList.remove("reveal-pending");
          node.classList.add("is-visible");
          observer.unobserve(node);
        });
      },
      {
        rootMargin: "12% 0px 12% 0px",
        threshold: 0.02,
      },
    );

    nodes.forEach((node) => {
      if (node.classList.contains("reveal-pending")) {
        observer.observe(node);
      }
    });

    return () => observer.disconnect();
  }, []);

  return null;
}
