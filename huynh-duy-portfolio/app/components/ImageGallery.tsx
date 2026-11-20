"use client";

import { useCallback, useEffect, useState } from "react";

interface ImageGalleryProps {
  images: readonly string[];
  alt: string;
  prevLabel: string;
  nextLabel: string;
}

const pad = (n: number) => String(n).padStart(2, "0");

export default function ImageGallery({
  images,
  alt,
  prevLabel,
  nextLabel,
}: ImageGalleryProps) {
  const [active, setActive] = useState(0);
  const count = images.length;

  const step = useCallback(
    (delta: number) => setActive((i) => (i + delta + count) % count),
    [count],
  );

  // Left / right arrow keys flip through the photos while the gallery is open.
  useEffect(() => {
    if (count < 2) return;
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "ArrowLeft") step(-1);
      if (event.key === "ArrowRight") step(1);
    };
    document.addEventListener("keydown", onKeyDown);
    return () => document.removeEventListener("keydown", onKeyDown);
  }, [count, step]);

  if (count === 0) return null;

  return (
    <div className="gallery">
      <div className="gallery-stage">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          className="gallery-main"
          src={images[active]}
          alt={`${alt} ${active + 1} / ${count}`}
        />

        {count > 1 && (
          <>
            <button
              type="button"
              className="gallery-nav gallery-prev"
              onClick={() => step(-1)}
              aria-label={prevLabel}
            >
              ‹
            </button>
            <button
              type="button"
              className="gallery-nav gallery-next"
              onClick={() => step(1)}
              aria-label={nextLabel}
            >
              ›
            </button>
            <span className="gallery-count">
              {pad(active + 1)} / {pad(count)}
            </span>
          </>
        )}
      </div>

      {count > 1 && (
        <div className="gallery-thumbs">
          {images.map((src, index) => (
            <button
              key={src}
              type="button"
              className={index === active ? "gallery-thumb is-active" : "gallery-thumb"}
              onClick={() => setActive(index)}
              aria-label={`${alt} ${index + 1}`}
              aria-current={index === active}
            >
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src={src} alt="" loading="lazy" />
            </button>
          ))}
        </div>
      )}
    </div>
  );
}
