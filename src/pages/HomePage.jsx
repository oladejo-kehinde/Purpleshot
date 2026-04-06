import { useState, useEffect } from "react";
import Lightbox from "../components/Lightbox";
import { WORK_ITEMS } from "../data/services";

const HERO_SLIDES = [
{src: "/assets/images/documentary/cultural-1.jpg", label: "Cultural "},
{src: "/assets/images/portraits/portrait-1.jpg", label: "Photography"},
{ src: "/assets/images/events/wedding002.jpg", label: "Wedding" },
{ src: "/assets/images/events/event-1.jpg", label: "Events" },
];

export default function HomePage({ nav }) {
  const [slide, setSlide] = useState(0);
  const [lb, setLb] = useState(null);

  useEffect(() => {
    const timer = setInterval(
      () => setSlide((s) => (s + 1) % HERO_SLIDES.length),
      4000,
    );
    return () => clearInterval(timer);
  }, []);

  return (
    <>
      {/* HERO */}
      <section className="hero">
        {HERO_SLIDES.map((s, i) => (
          <img
            key={i}
            className={`hero-slide ${slide === i ? "active" : ""}`}
            src={s.src}
            alt={s.label}
            style={{ objectPosition: s.position || "center center" }}
          />
        ))}
        <div className="hero-overlay" />
        <div className="hero-content">
          <h1>Frame the Authentic Story</h1>
          <p>Creative Capture Meets Technical Mastery</p>
          <div className="hero-btns">
            <button className="btn btn-primary" onClick={() => nav("contact")}>
              Book a Shoot
            </button>
            <button className="btn btn-outline" onClick={() => nav("rentals")}>
              Browse Rentals
            </button>
          </div>
        </div>
      </section>

      {/* OUR CRAFT */}
      <section className="craft-section">
        <h2 className="craft-heading">Our Craft</h2>
        <div className="craft-grid">
          <div className="craft-cell rentals-cell" onClick={() => nav("events")}>
            {/* add images here */}
            <img src="/assets/images/events/event-2.jpg" alt="Events" />
            <div className="craft-overlay">
              <span className="craft-name">Events</span>
              <span className="craft-sub">Every moment,unforgetable</span>
              <span className="craft-explore">EXPLORE →</span>
            </div>
          </div>
          <div className="craft-cell rentals-cell" onClick={() => nav("documentary")}>
            <img
              src="/assets/images/documentary/cultural-1.jpg"
              alt="Documentary"
            />
            <div className="craft-overlay">
              <span className="craft-name">Documentary</span>   
              <span className="craft-sub">Stories that breathe</span>
              <span className="craft-explore">EXPLORE →</span>
            </div>
          </div>
          <div className="craft-cell rentals-cell" onClick={() => nav("portraits")}>
            <img
              src="/assets/images/portraits/portrait-1.jpg"
              alt="Portraits"
            />
            <div className="craft-overlay">
              <span className="craft-name">Portraits</span>
              <span className="craft-sub">Your essence, captured</span>
              <span className="craft-explore">EXPLORE →</span>
            </div>
            
          </div>
          <div
            className="craft-cell rentals-cell"
            onClick={() => nav("rentals")}
          >
            <img src="/assets/images/rental-hero.jpg" alt="Rentals" />
            <div className="craft-overlay">
              <span className="craft-name">Rentals</span>
              <span className="craft-sub">Professional gear, ready</span>
              <span className="craft-explore">EXPLORE →</span>
            </div>
          </div>
        </div>
      </section>

      {/* SELECTED WORK */}
      <section className="selected-work">
        <h2>Selected Work</h2>
        <div className="work-grid">
          {WORK_ITEMS.map((item, i) => (
            <div className="work-cell" key={i} onClick={() => setLb(i)}>
              <img src={item.src} alt={item.label} />
            </div>
          ))}
        </div>
      </section>
      {lb !== null && (
        <Lightbox items={WORK_ITEMS} index={lb} onClose={() => setLb(null)} />
      )}

      {/* QUOTE */}
      <section className="quote-block">
        <p className="quote-text">
          "We capture honest, unfiltered moments with uncompromising technical
          precision."
        </p>
        <p className="quote-attr">— Purpleshot Studios</p>
      </section>

      {/* READY TO BEGIN */}
      <section className="cta-section">
        <h2>Ready to Begin?</h2>
        <div className="cta-btns">
          <button className="btn btn-primary" onClick={() => nav("contact")}>
            Inquire About a Project
          </button>
          <button className="btn btn-outline" onClick={() => nav("rentals")}>
            View Rental Inventory
          </button>
        </div>
      </section>
    </>
  );
}
