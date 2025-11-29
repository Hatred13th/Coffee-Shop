import { useEffect, useState } from "react";

export default function AdminOrders() {
  const [orders, setOrders] = useState([]);

  // Load orders from localStorage
  useEffect(() => {
    const savedOrders = JSON.parse(localStorage.getItem("orders")) || [];
    setOrders(savedOrders);
  }, []);

  // Save orders to localStorage
  const saveOrders = (updated) => {
    setOrders(updated);
    localStorage.setItem("orders", JSON.stringify(updated));
  };

  // Change order status
  const updateStatus = (id, newStatus) => {
    const updated = orders.map((order) =>
      order.id === id ? { ...order, status: newStatus } : order
    );
    saveOrders(updated);
  };

  return (
    <div style={{ padding: "30px" }}>
      <h1>Gestion des Commandes</h1>

      {orders.length === 0 && <p>Aucune commande enregistrée.</p>}

      {orders.map((order) => (
        <div key={order.id} style={orderCard}>
          <h3>Commande #{order.id}</h3>

          <p><strong>Email client:</strong> {order.email}</p>
          <p><strong>Total:</strong> {order.total} TND</p>
          <p><strong>Date:</strong> {order.date}</p>

          <div>
            <strong>Produits:</strong>
            <ul>
              {order.items.map((item, index) => (
                <li key={index}>
                  {item.name} – {item.price} TND × {item.quantity}
                </li>
              ))}
            </ul>
          </div>

          <label><strong>Statut:</strong></label>
          <select
            value={order.status}
            onChange={(e) => updateStatus(order.id, e.target.value)}
            style={selectStyle}
          >
            <option value="En attente">En attente</option>
            <option value="En préparation">En préparation</option>
            <option value="Terminée">Terminée</option>
          </select>

        </div>
      ))}
    </div>
  );
}

/* ---- STYLES ---- */
const orderCard = {
  background: "#f9f9f9",
  padding: "15px",
  borderRadius: "8px",
  border: "1px solid #ccc",
  marginBottom: "20px"
};

const selectStyle = {
  marginTop: "10px",
  padding: "8px",
  borderRadius: "6px",
  border: "1px solid #aaa"
};
