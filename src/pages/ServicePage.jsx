import { useState } from "react";
import Lightbox from "../components/Lightbox";
import { SERVICE_DATA } from "../data/services";

export default function ServicePage({ type, nav }) {
  const data = SERVICE_DATA[type];
  const [activeTab, setActiveTab] = useState("ALL");
  const [lb, setLb] = useState(null);

  // filter photos by active tab
  const filtered =
    activeTab === "ALL"
      ? data.photos
      : data.photos.filter((p) => p.cat === activeTab);

  return (
    <div className="spage">
      {/* HERO */}
      <div className="spage-hero">
        <img src={data.hero} alt={type} />
        <div className="spage-hero-content">
          <h1>{type.charAt(0).toUpperCase() + type.slice(1)}</h1>
          <p>{data.subtitle}</p>
        </div>
      </div>

      {/* DESCRIPTION */}
      <div className="spage-desc">
        <p>{data.desc}</p>
      </div>

      {/* PORTFOLIO */}
      <div className="spage-portfolio">
        <h2>Portfolio</h2>
        <ul className="spage-tabs">
          {data.tabs.map((t) => (
            <li
              key={t}
              className={`spage-tab ${activeTab === t ? "active" : ""}`}
              onClick={() => setActiveTab(t)}
            >
              {t}
            </li>
          ))}
        </ul>
        <div className="spage-grid">
          {filtered.map((p, i) => (
            <div className="spage-cell" key={i} onClick={() => setLb(i)}>
              <img src={p.src} alt={p.cat} />
            </div>
          ))}
        </div>
      </div>

      {/* INVESTMENT */}
      <div className="spage-investment">
        <h2>Investment</h2>
        <p>{data.investment}</p>
        <button className="btn btn-primary" onClick={() => nav("contact")}>
          Get Pricing
        </button>
      </div>

      {/* QUOTE */}
      <div className="spage-quote">
        <blockquote>"{data.quote}"</blockquote>
        <cite>{data.quoteAttr}</cite>
      </div>

      {/* LIGHTBOX */}
      {lb !== null && (
        <Lightbox
          items={filtered.map((p) => ({ src: p.src, label: p.cat }))}
          index={lb}
          onClose={() => setLb(null)}
        />
      )}
    </div>
  );
}
