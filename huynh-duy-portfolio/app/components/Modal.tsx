"use client";

import { useEffect, useId, useRef, type ReactNode } from "react";

interface ModalProps {
  kicker: string;
  title: string;
  meta: readonly string[];
  closeLabel: string;
  onClose: () => void;
  children: ReactNode;
}

const FOCUSABLE = 'a[href], button:not([disabled]), [tabindex]:not([tabindex="-1"])';

/**
 * Accessible dialog: closes on Escape or backdrop click, locks page scroll,
 * keeps keyboard focus inside, and returns focus to the opener on close.
 */
export default function Modal({
  kicker,
  title,
  meta,
  closeLabel,
  onClose,
  children,
}: ModalProps) {
  const titleId = useId();
  const dialogRef = useRef<HTMLDivElement>(null);
  const closeRef = useRef<HTMLButtonElement>(null);
  const onCloseRef = useRef(onClose);

  useEffect(() => {
    onCloseRef.current = onClose;
  });

  useEffect(() => {
    const opener = document.activeElement as HTMLElement | null;
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    closeRef.current?.focus();

    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        onCloseRef.current();
        return;
      }
      if (event.key !== "Tab" || !dialogRef.current) return;

      const items = dialogRef.current.querySelectorAll<HTMLElement>(FOCUSABLE);
      if (items.length === 0) return;
      const first = items[0];
      const last = items[items.length - 1];

      if (event.shiftKey && document.activeElement === first) {
        event.preventDefault();
        last.focus();
      } else if (!event.shiftKey && document.activeElement === last) {
        event.preventDefault();
        first.focus();
      }
    };

    document.addEventListener("keydown", onKeyDown);
    return () => {
      document.removeEventListener("keydown", onKeyDown);
      document.body.style.overflow = previousOverflow;
      opener?.focus?.();
    };
  }, []);

  return (
    <div
      className="project-modal-backdrop"
      onClick={(event) => {
        if (event.target === event.currentTarget) onClose();
      }}
    >
      <div
        className="project-modal"
        role="dialog"
        aria-modal="true"
        aria-labelledby={titleId}
        ref={dialogRef}
      >
        <button
          type="button"
          className="project-modal-close"
          onClick={onClose}
          aria-label={closeLabel}
          ref={closeRef}
        >
          ×
        </button>

        <div className="project-modal-kicker">{kicker}</div>
        <h2 id={titleId}>{title}</h2>

        <div className="project-modal-meta">
          {meta.map((item) => (
            <span key={item}>{item}</span>
          ))}
        </div>

        {children}
      </div>
    </div>
  );
}
