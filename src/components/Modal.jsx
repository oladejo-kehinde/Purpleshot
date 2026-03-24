import { useState } from "react";
import emailjs from "@emailjs/browser";
import { formatCurrency } from "../utils/helpers";

emailjs.init(import.meta.env.VITE_EMAILJS_PUBLIC_KEY);

export default function Modal({ item, onClose }) {
  const [form, setForm] = useState({
    name: "",
    email: "",
    phone: "",
    startDate: "",
    endDate: "",
    type: "daily",
    notes: "",
  });
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const updateForm = (key, value) =>
    setForm((prev) => ({ ...prev, [key]: value }));

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    try {
      await emailjs.send(
        import.meta.env.VITE_EMAILJS_SERVICE_ID,
        import.meta.env.VITE_EMAILJS_TEMPLATE_ID,
        {
          to_email: "ngekedas48@gmail.com",
          from_name: form.name,
          from_email: form.email,
          phone: form.phone,
          equipment: item.name,
          equipment_price: `${form.type === "daily" ? item.dailyPrice : item.weeklyPrice}`,
          rental_type: form.type,
          start_date: form.startDate,
          end_date: form.endDate,
          notes: form.notes || "None",
        }
      );
      setSubmitted(true);
    } catch (err) {
      setError("Failed to send inquiry. Please try again.");
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const minDate = new Date().toISOString().split("T")[0];

  return (
    <div
      className="modal-overlay"
      onClick={(e) => e.target === e.currentTarget && onClose()}
    >
      <div className="modal">
        {submitted ? (
          <div className="success-msg">
            <div style={{ fontSize: "3rem", marginBottom: "1rem" }}>✅</div>
            <h3>Request Sent!</h3>
            <p>
              We've received your inquiry for <strong>{item.name}</strong>.
              <br />
              We'll confirm availability within 24 hours.
            </p>
            <button
              className="btn btn-primary"
              style={{ marginTop: "1.5rem" }}
              onClick={onClose}
            >
              Close
            </button>
          </div>
        ) : (
          <>
            <div className="modal-header">
              <div>
                <h2>{item.name}</h2>
                <p>{item.desc}</p>
              </div>
              <button className="modal-close" onClick={onClose}>
                ×
              </button>
            </div>
            <div className="mform-note">
              📋 Submit your dates and we'll confirm availability within 24
              hours. Valid ID and refundable deposit required.
            </div>
            <form onSubmit={handleSubmit}>
              <div className="mform-row">
                <div className="mform-group">
                  <label>Full Name *</label>
                  <input
                    required
                    placeholder="Your name"
                    value={form.name}
                    onChange={(e) => updateForm("name", e.target.value)}
                  />
                </div>
                <div className="mform-group">
                  <label>Phone *</label>
                  <input
                    required
                    placeholder="08012345678"
                    value={form.phone}
                    onChange={(e) => updateForm("phone", e.target.value)}
                  />
                </div>
              </div>
              <div className="mform-group">
                <label>Email *</label>
                <input
                  required
                  type="email"
                  placeholder="you@email.com"
                  value={form.email}
                  onChange={(e) => updateForm("email", e.target.value)}
                />
              </div>
              <div className="mform-group">
                <label>Rental Type</label>
                <select
                  value={form.type}
                  onChange={(e) => updateForm("type", e.target.value)}
                >
                  <option value="daily">
                    Daily — {formatCurrency(item.dailyPrice)}/day
                  </option>
                  <option value="weekly">
                    Weekly — {formatCurrency(item.weeklyPrice)}/week
                  </option>
                </select>
              </div>
              <div className="mform-row">
                <div className="mform-group">
                  <label>Start Date *</label>
                  <input
                    required
                    type="date"
                    value={form.startDate}
                    onChange={(e) => updateForm("startDate", e.target.value)}
                    min={minDate}
                  />
                </div>
                <div className="mform-group">
                  <label>End Date *</label>
                  <input
                    required
                    type="date"
                    value={form.endDate}
                    onChange={(e) => updateForm("endDate", e.target.value)}
                    min={form.startDate || minDate}
                  />
                </div>
              </div>
              <div className="mform-group">
                <label>Notes</label>
                <textarea
                  placeholder="Any special requests..."
                  value={form.notes}
                  onChange={(e) => updateForm("notes", e.target.value)}
                />
              </div>
              {error && (
                <div style={{ color: "#e74c3c", marginBottom: "1rem", fontSize: "0.9rem" }}>
                  {error}
                </div>
              )}
              <button
                type="submit"
                className="btn btn-primary"
                style={{ width: "100%" }}
                disabled={loading}
              >
                {loading ? "Sending..." : "Submit Rental Inquiry"}
              </button>
            </form>
          </>
        )}
      </div>
    </div>
  );
}
