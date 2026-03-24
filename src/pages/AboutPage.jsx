export default function AboutPage() {
  return (
    <div className="about-page">
      <div className="about-split">
        <div className="about-img">
          <img
            src="/assets/images/about/about-1.jpg"
            alt="About Us"
            style={{ width: "100%", height: "100%", objectFit: "cover" }}
          />
        </div>
        <div className="about-content">
          <h1>About Us</h1>
          <div className="about-divider" />
          <p>
            We are a photography studio dedicated to capturing authentic moments
            with technical precision and artistic vision. Based in Nigeria, we
            serve clients across events, documentary, and portrait photography.
          </p>
          <p>
            Our team combines years of experience with a passion for
            storytelling — every frame is intentional, every image tells a
            complete story.
          </p>
          <p>
            Beyond photography, our equipment rental service gives fellow
            creatives access to professional-grade gear at accessible prices.
          </p>
          <button
            className="btn btn-primary"
            style={{ marginTop: "1.5rem", alignSelf: "flex-start" }}
          >
            Book a Shoot
          </button>
        </div>
      </div>
    </div>
  );
}
