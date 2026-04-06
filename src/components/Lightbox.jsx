import { useCallback, useState, useEffect } from "react";

export default function Lightbox({ items, index, onClose }) {
  const [currentIndex, setCurrentIndex] = useState(index);

  const prev = useCallback(() =>
    setCurrentIndex((n) => (n - 1 + items.length) % items.length), [items.length]);
  const next = useCallback(() => setCurrentIndex((n) => (n + 1) % items.length), [items.length]);

  const item = items[currentIndex];

  useEffect(() => {
    const onKey = (e) => {
      if (e.key === "ArrowLeft") prev();
      if (e.key === "ArrowRight") next();
      if (e.key === "Escape") onClose();
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [prev, next, onClose]);

  return (
    <div
      className="lb-overlay"
      role="dialog"
      aria-modal="true"
      aria-label="Image lightbox"
      onClick={(e) => e.target === e.currentTarget && onClose()}
    >
      <button className="lb-close" onClick={onClose}>
        ✕
      </button>
      <button className="lb-arrow left" onClick={prev}>
        &#8249;
      </button>
      <div className="lb-inner">
        <div className="lb-img-wrap">
          <img className="lb-img" src={item.src} alt={item.label} />
        </div>
        <div className="lb-meta">
          <div className="lb-meta-label">{item.label}</div>
          <div className="lb-meta-count">
            {currentIndex + 1} / {items.length}
          </div>
        </div>
      </div>
      <button className="lb-arrow right" onClick={next}>
        &#8250;
      </button>
    </div>
  );
}
