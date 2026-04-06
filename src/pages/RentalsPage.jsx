import { useState, useEffect } from "react";
import RentalCard from "../components/RentalCard";
import Modal from "../components/Modal";
import { EQUIPMENT, EQUIPMENT_CATEGORIES } from "../data/equipment";

export default function RentalsPage({ nav }) {
  const [category, setCategory] = useState("ALL");
  const [modal, setModal] = useState(null);
  const [equipment, setEquipment] = useState(EQUIPMENT);

  // Load stock quantities from localStorage
  useEffect(() => {
    const savedStock = localStorage.getItem("equipment_stock");
    if (savedStock) {
      try {
        const stockData = JSON.parse(savedStock);
        // Merge stock data with equipment
        const updatedEquipment = EQUIPMENT.map((item) => {
          const stockItem = stockData.find((s) => s.id === item.id);
          return {
            ...item,
            quantity: stockItem ? stockItem.quantity : 0,
          };
        });
        setEquipment(updatedEquipment);
      } catch (err) {
        console.error("Failed to parse stock data:", err);
        setEquipment(EQUIPMENT.map((item) => ({ ...item, quantity: 0 })));
      }
    } else {
      // No stock data yet - show all as out of stock
      setEquipment(EQUIPMENT.map((item) => ({ ...item, quantity: 0 })));
    }
  }, []);

  const filtered =
    category === "ALL"
      ? equipment
      : equipment.filter((e) => e.category === category);

  return (
    <>
      <div className="rentals-hero">
        <img src="/assets/images/rental-hero.jpg" alt="Equipment" />
        <div className="rentals-hero-content">
          <h1>Equipment Rental</h1>
          <p>
            Professional gear available for daily/weekly rental. Pickup and
            delivery options. Requires valid ID and refundable deposit.
          </p>
        </div>
      </div>

      <div className="filter-bar">
        {EQUIPMENT_CATEGORIES.map((cat) => (
          <button
            key={cat}
            className={`filter-btn ${category === cat ? "active" : ""}`}
            onClick={() => setCategory(cat)}
          >
            {cat}
          </button>
        ))}
      </div>

      <div className="rentals-grid">
        {filtered.map((item) => (
          <RentalCard key={item.id} item={item} onInquire={setModal} />
        ))}
      </div>

      <div className="inquire-cta">
        <h2>Check Availability & Inquire</h2>
        <p>Don't see what you need? Reach out and we'll help.</p>
        <button
          className="btn btn-primary"
          onClick={() => nav("contact")}
        >
          Get in Touch
        </button>
      </div>

      {modal && <Modal item={modal} onClose={() => setModal(null)} />}
    </>
  );
}