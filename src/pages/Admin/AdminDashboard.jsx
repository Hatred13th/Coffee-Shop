import { Link } from "react-router-dom";

export default function AdminDashboard() {
  return (
    <div style={{ padding: "30px" }}>
      <h1>Admin Dashboard</h1>
      <p>Bienvenue dans l’espace administrateur.</p>

      <div 
        style={{
          marginTop: "25px",
          display: "flex",
          flexDirection: "column",
          gap: "15px"
        }}
      >

        <Link to="/admin/products" style={linkStyle}>
          📦 Gérer les produits
        </Link>

        <Link to="/admin/orders" style={linkStyle}>
          🧾 Gérer les commandes
        </Link>

        <Link to="/admin/settings" style={linkStyle}>
          ⚙️ Paramètres
        </Link>

      </div>
    </div>
  );
}

const linkStyle = {
  background: "#8b5a2b",
  color: "white",
  padding: "15px",
  borderRadius: "8px",
  textDecoration: "none",
  fontSize: "18px",
  width: "260px",
};
