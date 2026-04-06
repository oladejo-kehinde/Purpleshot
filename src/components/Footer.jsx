export default function Footer({ nav }) {
  return (
    <footer className="footer">
      <div className="footer-top">
        <div className="footer-brand">
          <img
            src="/assets/images/logo-1.png"
            alt="Purpleshot Studios"
            style={{
              height: "30px",
              width: "auto",
              marginBottom: "1rem",
              display: "block",
            }}
          />
          <p
            style={{
              color: "var(--muted)",
              fontSize: "0.87rem",
              lineHeight: "1.7",
              maxWidth: "280px",
            }}
          >
            Creative Capture Meets Technical Mastery. Professional photography
            and equipment rental services.
          </p>
        </div>
        <div className="footer-col">
          <h4>Services</h4>
          <ul>
            <li>
              <a
                href="#"
                onClick={(e) => {
                  e.preventDefault();
                  nav("events");
                }}
              >
                Events
              </a>
            </li>
            <li>
              <a
                href="#"
                onClick={(e) => {
                  e.preventDefault();
                  nav("documentary");
                }}
              >
                Documentary
              </a>
            </li>
            <li>
              <a
                href="#"
                onClick={(e) => {
                  e.preventDefault();
                  nav("portraits");
                }}
              >
                Portraits
              </a>
            </li>
            <li>
              <a
                href="#"
                onClick={(e) => {
                  e.preventDefault();
                  nav("rentals");
                }}
              >
                Equipment Rental
              </a>
            </li>
          </ul>
        </div>
        <div className="footer-col">
          <h4>Connect</h4>
          <ul>
            <li>
              <a
                href="#"
                onClick={(e) => {
                  e.preventDefault();
                  nav("contact");
                }}
              >
                Book a Shoot
              </a>
            </li>
            <li>
              <a
                href="#"
                onClick={(e) => {
                  e.preventDefault();
                  nav("about");
                }}
              >
                About Us
              </a>
            </li>
            <li>
              <a href="#">Instagram</a>
            </li>
            <li>
              <a href="#">Pinterest</a>
            </li>
          </ul>
        </div>
      </div>
      <div className="footer-bottom">
        © {new Date().getFullYear()} Purpleshot Studios. All rights reserved.
      </div>
    </footer>
  );
}
