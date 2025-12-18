"use client";

import * as React from "react";

type Slide = {
  title: string;
  description: string;
  badge?: string;
  cta?: { label: string; href: string };
};

type CarouselProps = {
  slides: Slide[];
};

export function Carousel({ slides }: CarouselProps) {
  const [index, setIndex] = React.useState(0);
  const go = (next: number) => {
    const len = slides.length;
    setIndex(((next % len) + len) % len);
  };

  return (
    <div className="carousel">
      <div
        className="carousel-track"
        style={{ transform: `translateX(-${index * 100}%)` }}
      >
        {slides.map((slide, i) => (
          <div className="carousel-slide" key={i}>
            <div>
              {slide.badge && <div className="pill primary">{slide.badge}</div>}
              <h3>{slide.title}</h3>
              <p className="lede">{slide.description}</p>
              {slide.cta && (
                <a className="op-btn solid" href={slide.cta.href}>
                  {slide.cta.label}
                </a>
              )}
            </div>
            <div
              style={{
                minHeight: 160,
                borderRadius: 12,
                background:
                  "linear-gradient(145deg, rgba(69,170,242,0.15), rgba(29,191,115,0.12))",
                border: "1px solid var(--border)",
              }}
            />
          </div>
        ))}
      </div>
      <div className="carousel-controls">
        <button className="op-btn ghost" onClick={() => go(index - 1)}>
          ←
        </button>
        <button className="op-btn ghost" onClick={() => go(index + 1)}>
          →
        </button>
      </div>
      <div className="carousel-dot-bar" role="tablist">
        {slides.map((_, i) => (
          <button
            key={i}
            className={`carousel-dot ${i === index ? "active" : ""}`}
            aria-label={`Slide ${i + 1}`}
            onClick={() => go(i)}
          />
        ))}
      </div>
    </div>
  );
}
