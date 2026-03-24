import { useState, useEffect } from "react";
import HomePage from "./pages/HomePage";
import RentalsPage from "./pages/RentalsPage";
import ServicePage from "./pages/ServicePage";
import AboutPage from "./pages/AboutPage";
import ContactPage from "./pages/ContactPage";
import Footer from "./components/Footer";
import "./styles/global.css";

const NAV_LINKS = [
  { id: "home", label: "Home" },
  { id: "events", label: "Events" },
  { id: "documentary", label: "Documentary" },
  { id: "portraits", label: "Portraits" },
  { id: "rentals", label: "Rentals" },
  { id: "about", label: "About" },
  { id: "contact", label: "Contact" },
];

export default function App() {
  const [page, setPage] = useState("home");
  const [menu, setMenu] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const nav = (pageId) => {
    setPage(pageId);
    setMenu(false);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <>
      {/* NAVBAR - TRANSPARENT BACKGROUND */}
      <nav className={`nav ${scrolled ? "scrolled" : ""}`}>
        <div
          className="logo"
          onClick={() => nav("home")}
          style={{
            cursor: "pointer",
            display: "flex",
            alignItems: "center",
            height: "50px",
          }}
        >
          <img
            src="/assets/images/logo-1.png"
            alt="Purpleshot Studios"
            style={{
              height: "20px",
              width: "auto",
              maxWidth: "200px",
              display: "block",
            }}
          />
        </div>

        {/* DESKTOP LINKS */}
        <ul className="nav-links">
          {NAV_LINKS.map((link) => (
            <li key={link.id}>
              <a
                href="#"
                className={page === link.id ? "active" : ""}
                onClick={(e) => {
                  e.preventDefault();
                  nav(link.id);
                }}
              >
                {link.label}
              </a>
            </li>
          ))}
        </ul>

        {/* HAMBURGER */}
        <button
          className="hamburger"
          onClick={() => setMenu((o) => !o)}
          aria-label="Menu"
        >
          <span />
          <span />
          <span />
        </button>
      </nav>

      {/* MOBILE MENU */}
      <div className={`mobile-menu ${menu ? "open" : ""}`}>
        {NAV_LINKS.map((link) => (
          <a
            key={link.id}
            href="#"
            className={page === link.id ? "active" : ""}
            onClick={(e) => {
              e.preventDefault();
              nav(link.id);
            }}
          >
            {link.label}
          </a>
        ))}
      </div>

      {/* PAGE CONTENT */}
      <main>
        {page === "home" && <HomePage nav={nav} />}
        {page === "rentals" && <RentalsPage />}
        {page === "events" && <ServicePage type="events" nav={nav} />}
        {page === "documentary" && (
          <ServicePage type="documentary" nav={nav} />
        )}
        {page === "portraits" && <ServicePage type="portraits" nav={nav} />}
        {page === "about" && <AboutPage />}
        {page === "contact" && <ContactPage />}
      </main>

      <Footer nav={nav} />
    </>
  );
}