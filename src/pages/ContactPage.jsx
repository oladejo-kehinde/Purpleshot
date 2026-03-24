import { useState, useEffect } from "react";
import emailjs from "@emailjs/browser";

export default function ContactPage() {
  const [sent, setSent] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [form, setForm] = useState({
    name: "",
    email: "",
    phone: "",
    service: "",
    message: "",
  });

  // Initialize EmailJS once
  useEffect(() => {
    emailjs.init(import.meta.env.VITE_EMAILJS_PUBLIC_KEY);
  }, []);

  // Update form state
  const updateForm = (key, value) =>
    setForm((prev) => ({ ...prev, [key]: value }));

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    try {
      await emailjs.send(
        import.meta.env.VITE_EMAILJS_SERVICE_ID,
        import.meta.env.VITE_EMAILJS_TEMPLATE_ID,
        {
          name: form.name,                      
          email: form.email,                  
          message: form.message,                
          title: form.service,                  
          phone: form.phone,                    
          time: new Date().toLocaleString(),   
        }
      );
      setSent(true);
      // Reset form after success
      setForm({
        name: "",
        email: "",
        phone: "",
        service: "",
        message: "",
      });
    } catch (err) {
      console.error(err);
      setError("Failed to send message. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="contact-wrap" style={{ paddingTop: "5rem" }}>
      <h1>Contact Us</h1>
      <div className="c-divider" />
      <div className="contact-grid2">
        <div className="contact-info">
          <h3>Let's work together</h3>
          <p>
            Ready to book a shoot or inquire about equipment? Reach out and
            we'll respond within 24 hours.
          </p>
          <br />
          <p>📍 Port Harcourt, Rivers</p>
          <p>📧 ngekedas9@gmail.com</p>
          <p>📞 08108912215</p>
          <p>📞 07051268601</p>
          <br />
          <p style={{ color: "var(--muted)", fontSize: "0.82rem" }}>
            Mon – Sat: 24hrs response time
          </p>
        </div>
        <div>
          {sent ? (
            <div style={{ textAlign: "center", padding: "3rem 0" }}>
              <div style={{ fontSize: "3rem", marginBottom: "1rem" }}>✅</div>
              <h3 style={{ color: "var(--green)" }}>Message Sent!</h3>
              <p style={{ color: "var(--muted)", marginTop: "0.5rem" }}>
                We'll be in touch shortly.
              </p>
            </div>
          ) : (
            <form onSubmit={handleSubmit}>
              <div className="cf-group">
                <label>Name *</label>
                <input
                  required
                  placeholder="Your name"
                  value={form.name}
                  onChange={(e) => updateForm("name", e.target.value)}
                />
              </div>
              <div className="cf-group">
                <label>Email *</label>
                <input
                  required
                  type="email"
                  placeholder="you@email.com"
                  value={form.email}
                  onChange={(e) => updateForm("email", e.target.value)}
                />
              </div>
              <div className="cf-group">
                <label>Phone</label>
                <input
                  placeholder="08012345678"
                  value={form.phone}
                  onChange={(e) => updateForm("phone", e.target.value)}
                />
              </div>
              <div className="cf-group">
                <label>Service</label>
                <select
                  value={form.service}
                  onChange={(e) => updateForm("service", e.target.value)}
                >
                  <option value="">Select a service</option>
                  <option>Events Photography</option>
                  <option>Documentary</option>
                  <option>Portraits</option>
                  <option>Equipment Rental</option>
                  <option>Other</option>
                </select>
              </div>
              <div className="cf-group">
                <label>Message *</label>
                <textarea
                  required
                  placeholder="Tell us about your project..."
                  value={form.message}
                  onChange={(e) => updateForm("message", e.target.value)}
                />
              </div>
              {error && (
                <div
                  style={{
                    color: "#e74c3c",
                    marginBottom: "1rem",
                    fontSize: "0.9rem",
                  }}
                >
                  {error}
                </div>
              )}
              <button
                type="submit"
                className="btn btn-primary"
                style={{ width: "100%" }}
                disabled={loading}
              >
                {loading ? "Sending..." : "Send Message"}
              </button>
            </form>
          )}
        </div>
      </div>
    </div>
  );
}