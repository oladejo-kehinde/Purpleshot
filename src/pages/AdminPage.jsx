import { useState, useEffect, useLayoutEffect, useRef, useCallback, useTransition } from "react";
import { EQUIPMENT } from "../data/equipment";
import "../styles/admin.css";

const DEFAULT_PASSWORD = "purpleshot123";

export default function AdminPage() {
  // Auth states
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [password, setPassword] = useState("");
  const [showChangePassword, setShowChangePassword] = useState(false);
  const [oldPassword, setOldPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  // Stock & UI states
  const [stock, setStock] = useState([]);
  const [saved, setSaved] = useState(false);
  const [notification, setNotification] = useState(null);

  // React internals
  const [, startTransition] = useTransition();
  const initializedRef = useRef(false);

  // Display notification toast
  const showNotification = useCallback((message, type = "success") => {
    setNotification({ message, type });
    setTimeout(() => setNotification(null), 3000);
  }, []);

  // Initialize stock to empty (fallback)
  const loadDefaultStock = useCallback(() => {
    startTransition(() => {
      setStock(
        EQUIPMENT.map((item) => ({
          id: item.id,
          name: item.name,
          quantity: 0,
        }))
      );
    });
  }, []);

  // Load from localStorage or stock.json on mount
  const initializeStock = useCallback(() => {
    const savedStock = localStorage.getItem("equipment_stock");
    
    if (savedStock) {
      try {
        startTransition(() => {
          setStock(JSON.parse(savedStock));
        });
      } catch (e) {
        console.error("Failed to parse saved stock:", e);
        loadDefaultStock();
      }
    } else {
      fetch("/stock.json")
        .then((res) => res.json())
        .then((data) => {
          const stockItems = data.stock.map((item) => {
            const equipment = EQUIPMENT.find((e) => e.id === item.id);
            return {
              id: item.id,
              name: equipment ? equipment.name : `Equipment ${item.id}`,
              quantity: item.quantity,
            };
          });
          startTransition(() => {
            setStock(stockItems);
          });
        })
        .catch(() => {
          loadDefaultStock();
        });
    }
  }, [loadDefaultStock]);

  // Init on component mount
  useLayoutEffect(() => {
    if (!initializedRef.current) {
      initializedRef.current = true;
      initializeStock();
    }
  }, [initializeStock]);

  // Auto-save to localStorage
  useEffect(() => {
    if (stock.length > 0 && initializedRef.current) {
      localStorage.setItem("equipment_stock", JSON.stringify(stock));
      startTransition(() => {
        setSaved(true);
      });
      const timer = setTimeout(() => {
        startTransition(() => {
          setSaved(false);
        });
      }, 2000);
      return () => clearTimeout(timer);
    }
  }, [stock]);

  // Update item quantity
  const updateQuantity = (id, newQuantity) => {
    if (newQuantity < 0) return;
    setStock((prev) =>
      prev.map((item) =>
        item.id === id ? { ...item, quantity: newQuantity } : item
      )
    );
  };

  // Increment quantity
  const incrementQuantity = (id) => {
    const item = stock.find((s) => s.id === id);
    if (item) updateQuantity(id, item.quantity + 1);
  };

  // Decrement quantity
  const decrementQuantity = (id) => {
    const item = stock.find((s) => s.id === id);
    if (item && item.quantity > 0) updateQuantity(id, item.quantity - 1);
  };

  // Handle login
  const handleLogin = (e) => {
    e.preventDefault();
    const currentPassword = localStorage.getItem("admin_password") || DEFAULT_PASSWORD;
    if (password === currentPassword) {
      setIsLoggedIn(true);
      setPassword("");
    } else {
      showNotification("Incorrect password", "error");
      setPassword("");
    }
  };

  // Handle password change
  const handleChangePassword = (e) => {
    e.preventDefault();
    const currentPassword = localStorage.getItem("admin_password") || DEFAULT_PASSWORD;

    if (oldPassword !== currentPassword) {
      showNotification("Old password is incorrect", "error");
      return;
    }

    if (newPassword !== confirmPassword) {
      showNotification("New passwords don't match", "error");
      return;
    }

    if (newPassword.length < 4) {
      showNotification("Password must be at least 4 characters", "error");
      return;
    }

    localStorage.setItem("admin_password", newPassword);
    showNotification("Password changed successfully!", "success");
    setShowChangePassword(false);
    setOldPassword("");
    setNewPassword("");
    setConfirmPassword("");
    setIsLoggedIn(false);
  };

  // LOGIN SCREEN
  if (!isLoggedIn) {
    return (
      <>
        <div className="admin-login-container">
          <div className="admin-login-box">
            <h1> Admin Dashboard</h1>

            {!showChangePassword ? (
              <form onSubmit={handleLogin}>
                <input
                  type="password"
                  placeholder="Enter password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  autoFocus
                />
                <button type="submit">Login</button>
                <button
                  type="button"
                  className="forgot-password-btn"
                  onClick={() => setShowChangePassword(true)}
                >
                  Change Password?
                </button>
              </form>
            ) : (
              <form onSubmit={handleChangePassword}>
                <h3>Change Password</h3>
                <input
                  type="password"
                  placeholder="Old password"
                  value={oldPassword}
                  onChange={(e) => setOldPassword(e.target.value)}
                  autoFocus
                />
                <input
                  type="password"
                  placeholder="New password"
                  value={newPassword}
                  onChange={(e) => setNewPassword(e.target.value)}
                />
                <input
                  type="password"
                  placeholder="Confirm new password"
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                />
                <button type="submit">Update Password</button>
                <button
                  type="button"
                  className="back-btn"
                  onClick={() => {
                    setShowChangePassword(false);
                    setOldPassword("");
                    setNewPassword("");
                    setConfirmPassword("");
                  }}
                >
                  Back
                </button>
              </form>
            )}
          </div>
        </div>

        {notification && (
          <div className={`notification notification-${notification.type}`}>
            <span>{notification.message}</span>
          </div>
        )}
      </>
    );
  }

  // DASHBOARD SCREEN
  return (
    <>
      <div className="admin-page">
        <div className="admin-header">
          <h1> Equipment Stock</h1>
          <button className="logout-btn" onClick={() => setIsLoggedIn(false)}>
            Logout
          </button>
        </div>

        <div className="stock-table">
          <div className="stock-header">
            <div className="col-name">Equipment</div>
            <div className="col-quantity">Quantity</div>
            <div className="col-actions">Actions</div>
          </div>

          {stock.map((item) => (
            <div key={item.id} className="stock-row">
              <div className="col-name">
                <strong>{item.name}</strong>
              </div>
              <div className="col-quantity">
                <input
                  type="number"
                  min="0"
                  value={item.quantity}
                  onChange={(e) =>
                    updateQuantity(item.id, parseInt(e.target.value) || 0)
                  }
                  className="qty-input"
                />
              </div>
              <div className="col-actions">
                <button
                  className="btn-minus"
                  onClick={() => decrementQuantity(item.id)}
                  title="Decrease quantity"
                >
                  −
                </button>
                <button
                  className="btn-plus"
                  onClick={() => incrementQuantity(item.id)}
                  title="Increase quantity"
                >
                  +
                </button>
              </div>
            </div>
          ))}
        </div>

        <div className="admin-footer">
          <p> Auto-saved to browser</p>
        </div>
      </div>

      {saved && (
        <div className="save-indicator">✓ Saved</div>
      )}

      {notification && (
        <div className={`notification notification-${notification.type}`}>
          <span>{notification.message}</span>
        </div>
      )}
    </>
  );
}
