import { ChevronLeft, ChevronRight } from "lucide-react";
import { useEffect, useState } from "react";

const SLIDES = [
  { bg: "/banners/banner1.png", pos: "center center" },
  { bg: "/banners/banner2.png", pos: "center center" },
  { bg: "/banners/banner3.png", pos: "center center" },
];

export default function HeroBanner() {
  const [active, setActive] = useState(0);
  const [paused, setPaused] = useState(false);

  useEffect(() => {
    if (paused) return;
    const id = setInterval(() => setActive((i) => (i + 1) % SLIDES.length), 5500);
    return () => clearInterval(id);
  }, [active, paused]);

  const prev = () => setActive((i) => (i - 1 + SLIDES.length) % SLIDES.length);
  const next = () => setActive((i) => (i + 1) % SLIDES.length);

  return (
    <section
      className="hero"
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
    >
      {SLIDES.map((s, i) => (
        <div
          key={i}
          className={`hero-slide-bg${i === active ? " active" : ""}`}
          style={{ backgroundImage: `url(${s.bg})`, backgroundPosition: s.pos }}
        />
      ))}
      <div className="hero-overlay" />

      <button className="banner-prev" onClick={prev} aria-label="Previous slide">
        <ChevronLeft size={20} />
      </button>
      <button className="banner-next" onClick={next} aria-label="Next slide">
        <ChevronRight size={20} />
      </button>

      <div className="banner-dots">
        {SLIDES.map((_, i) => (
          <button
            key={i}
            className={i === active ? "active" : ""}
            onClick={() => setActive(i)}
            aria-label={`Slide ${i + 1}`}
          />
        ))}
      </div>

      <div className="banner-counter">
        <span>{String(active + 1).padStart(2, "0")}</span>
        <span>/</span>
        <span>{String(SLIDES.length).padStart(2, "0")}</span>
      </div>
    </section>
  );
}
