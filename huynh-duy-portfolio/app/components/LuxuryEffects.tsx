"use client";

import { useEffect } from "react";

/** Elements that fade up as they scroll into view. */
const REVEAL_SELECTOR = [
  ".section-kicker",
  ".about-grid",
  ".section-heading",
  ".skill-card",
  ".language-line",
  ".timeline-item",
  ".achievement",
  ".project-card",
  ".contact-section > *",
  ".contact-links > *",
].join(",");

/** Elements that gently lean toward the cursor. */
const MAGNETIC_SELECTOR = ".text-link, .lang-switch";

/**
 * Adds the finishing motion layer: scroll progress, reveal-on-scroll,
 * a soft light that follows the cursor, card spotlight, magnetic buttons
 * and a slow parallax. It renders nothing and only touches the DOM through
 * classes and CSS variables, so the page works the same without it.
 */
export default function LuxuryEffects() {
  useEffect(() => {
    const root = document.documentElement;
    const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const finePointer = window.matchMedia("(hover: hover) and (pointer: fine)").matches;
    const cleanups: Array<() => void> = [];

    /* ---- scroll progress + parallax ---- */
    let ticking = false;
    const onScroll = () => {
      if (ticking) return;
      ticking = true;
      requestAnimationFrame(() => {
        const max = root.scrollHeight - window.innerHeight;
        root.style.setProperty("--progress", max > 0 ? String(window.scrollY / max) : "0");
        if (!reduceMotion) {
          root.style.setProperty("--py", String(Math.min(window.scrollY, 900) * 0.06));
        }
        ticking = false;
      });
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);
    cleanups.push(() => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
    });

    /* ---- reveal on scroll ---- */
    if (!reduceMotion && "IntersectionObserver" in window) {
      const timers: number[] = [];
      const observer = new IntersectionObserver(
        (entries) => {
          for (const entry of entries) {
            if (!entry.isIntersecting) continue;
            const el = entry.target as HTMLElement;
            el.classList.add("is-visible");
            observer.unobserve(el);
            // Hand the element back to its normal styles once the animation is done.
            timers.push(
              window.setTimeout(() => el.classList.remove("reveal", "is-visible"), 1600),
            );
          }
        },
        { threshold: 0.12, rootMargin: "0px 0px -6% 0px" },
      );

      document.querySelectorAll<HTMLElement>(REVEAL_SELECTOR).forEach((el) => {
        // Anything already on screen is left alone, so nothing flashes at load.
        if (el.getBoundingClientRect().top < window.innerHeight * 0.92) return;
        const siblings = Array.from(el.parentElement?.children ?? []).filter((child) =>
          child.matches(REVEAL_SELECTOR),
        );
        el.style.setProperty("--delay", `${Math.max(siblings.indexOf(el), 0) * 90}ms`);
        el.classList.add("reveal");
        observer.observe(el);
      });

      cleanups.push(() => {
        observer.disconnect();
        timers.forEach((id) => window.clearTimeout(id));
      });
    }

    /* ---- cursor light, card spotlight, magnetic buttons ---- */
    if (finePointer && !reduceMotion) {
      const glow = document.createElement("div");
      glow.className = "cursor-glow";
      glow.setAttribute("aria-hidden", "true");
      document.body.appendChild(glow);

      let frame = 0;
      let x = 0;
      let y = 0;
      let lastSpark = 0;
      let alive = 0;

      /** A tiny star that drifts away from the cursor and fades out. */
      const spawnSpark = (px: number, py: number) => {
        if (alive > 22) return;
        const spark = document.createElement("i");
        spark.className = "spark";
        spark.setAttribute("aria-hidden", "true");
        spark.style.setProperty("--sx", `${px}px`);
        spark.style.setProperty("--sy", `${py}px`);
        spark.style.setProperty("--dx", `${(Math.random() - 0.5) * 46}px`);
        spark.style.setProperty("--dy", `${14 + Math.random() * 30}px`);
        spark.style.width = spark.style.height = `${8 + Math.random() * 8}px`;
        alive += 1;
        spark.addEventListener(
          "animationend",
          () => {
            spark.remove();
            alive -= 1;
          },
          { once: true },
        );
        document.body.appendChild(spark);
      };

      const onMove = (event: PointerEvent) => {
        x = event.clientX;
        y = event.clientY;
        glow.classList.add("is-on");

        const now = performance.now();
        if (now - lastSpark > 70) {
          lastSpark = now;
          spawnSpark(event.clientX, event.clientY);
        }
        if (!frame) {
          frame = requestAnimationFrame(() => {
            glow.style.transform = `translate3d(${x}px, ${y}px, 0)`;
            frame = 0;
          });
        }

        const target = event.target as HTMLElement | null;
        const card = target?.closest<HTMLElement>(".project-card, .skill-card");
        if (card) {
          const rect = card.getBoundingClientRect();
          card.style.setProperty("--mx", `${event.clientX - rect.left}px`);
          card.style.setProperty("--my", `${event.clientY - rect.top}px`);
        }
      };
      const onLeave = () => glow.classList.remove("is-on");
      document.addEventListener("pointermove", onMove, { passive: true });
      root.addEventListener("pointerleave", onLeave);

      const magnets = Array.from(document.querySelectorAll<HTMLElement>(MAGNETIC_SELECTOR));
      const magnetCleanups = magnets.map((el) => {
        const move = (event: PointerEvent) => {
          const rect = el.getBoundingClientRect();
          const dx = event.clientX - (rect.left + rect.width / 2);
          const dy = event.clientY - (rect.top + rect.height / 2);
          el.style.setProperty("--tx", `${dx * 0.22}px`);
          el.style.setProperty("--ty", `${dy * 0.3}px`);
        };
        const reset = () => {
          el.style.removeProperty("--tx");
          el.style.removeProperty("--ty");
        };
        el.addEventListener("pointermove", move);
        el.addEventListener("pointerleave", reset);
        return () => {
          el.removeEventListener("pointermove", move);
          el.removeEventListener("pointerleave", reset);
        };
      });

      cleanups.push(() => {
        document.removeEventListener("pointermove", onMove);
        root.removeEventListener("pointerleave", onLeave);
        if (frame) cancelAnimationFrame(frame);
        glow.remove();
        document.querySelectorAll(".spark").forEach((node) => node.remove());
        magnetCleanups.forEach((fn) => fn());
      });
    }

    /* ---- twinkling stars scattered across the page ---- */
    if (!reduceMotion) {
      const field = document.createElement("div");
      field.className = "sparkle-field";
      field.setAttribute("aria-hidden", "true");
      const count = window.innerWidth < 680 ? 10 : 22;
      for (let i = 0; i < count; i += 1) {
        const star = document.createElement("i");
        star.className = "sparkle";
        const size = 8 + Math.random() * 16;
        star.style.left = `${Math.random() * 100}%`;
        star.style.top = `${Math.random() * 100}%`;
        star.style.width = star.style.height = `${size}px`;
        star.style.animationDelay = `${(Math.random() * 6).toFixed(2)}s`;
        star.style.animationDuration = `${(3 + Math.random() * 4).toFixed(2)}s`;
        field.appendChild(star);
      }
      document.body.appendChild(field);
      cleanups.push(() => field.remove());
    }

    return () => cleanups.forEach((fn) => fn());
  }, []);

  return null;
}
