import { formatCurrency, getBadgeStatus } from "../utils/helpers";

export default function RentalCard({ item, onInquire }) {
  const badge = getBadgeStatus(item.status);
  const isAvailable = item.status !== "rented";

  return (
    <div className="rental-card">
      <div className="rental-card-img-wrap">{item.icon}</div>
      <div className="rental-card-body">
        <div className="rental-card-top">
          <h3>{item.name}</h3>
          <span className={`badge ${badge.className}`}>{badge.label}</span>
        </div>
        <p className="rental-desc">{item.desc}</p>
        <hr className="rental-divider" />
        <div className="rental-prices">
          <div className="price-col">
            <label>Daily</label>
            <strong>{formatCurrency(item.dailyPrice)}</strong>
          </div>
          <div className="price-col">
            <label>Weekly</label>
            <strong>{formatCurrency(item.weeklyPrice)}</strong>
          </div>
        </div>
        <button
          className={`rent-btn ${isAvailable ? "rent-btn-active" : "rent-btn-disabled"}`}
          onClick={() => isAvailable && onInquire(item)}
          disabled={!isAvailable}
        >
          {isAvailable
            ? "Check Availability & Inquire"
            : "Currently Rented Out"}
        </button>
      </div>
    </div>
  );
}
