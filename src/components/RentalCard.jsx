import { formatCurrency, badge as getBadge } from "../utils/helpers";

export default function RentalCard({ item, onInquire }) {
  const badgeInfo = getBadge(item.quantity);
  const isAvailable = item.quantity > 0;

  return (
    <div className="rental-card">
      <div className="rental-card-img-wrap">
        {item.src ? <img src={item.src} alt={item.alt} /> : item.icon}
      </div>
      <div className="rental-card-body">
        <div className="rental-card-top">
          <h3>{item.name}</h3>
          <span className={`badge ${badgeInfo.c}`}>{badgeInfo.l}</span>
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
        <div className="stock-info">
          {isAvailable ? (
            <span className="stock-count">
              {item.quantity} {item.quantity === 1 ? "item" : "items"} in stock
            </span>
          ) : (
            <span className="stock-unavailable">Out of Stock</span>
          )}
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
