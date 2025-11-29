import { useEffect, useState } from "react";
import AdminProductForm from "./AdminProductForm";

export default function AdminProducts() {
  const [products, setProducts] = useState([]);
  const [editingProduct, setEditingProduct] = useState(null); // product being edited
  const [showForm, setShowForm] = useState(false);

  // Load products from localStorage
  useEffect(() => {
    const saved = JSON.parse(localStorage.getItem("products")) || [];
    setProducts(saved);
  }, []);

  // Save products to localStorage
  const saveProducts = (updated) => {
    setProducts(updated);
    localStorage.setItem("products", JSON.stringify(updated));
  };

  const deleteProduct = (id) => {
    const updated = products.filter((p) => p.id !== id);
    saveProducts(updated);
  };

  const startEdit = (product) => {
    setEditingProduct(product);
    setShowForm(true);
  };

  const startAdd = () => {
    setEditingProduct(null);
    setShowForm(true);
  
  };

  return (
    <div style={{ padding: "30px" }}>
      <h1>Gestion des Produits</h1>

      <button
        style={btnAdd}
        onClick={startAdd}
      >
        ➕ Ajouter un produit
      </button>

      {/* Add/Edit Form */}
      {showForm && (
        <AdminProductForm
          existingProduct={editingProduct}
          onCancel={() => setShowForm(false)}
          onSave={(newProduct) => {
            let updated;

            if (editingProduct) {
              updated = products.map((p) =>
                p.id === editingProduct.id ? newProduct : p
              );
            } else {
              updated = [...products, newProduct];
            }

            saveProducts(updated);
            setShowForm(false);
          }}
        />
      )}

      <hr style={{ margin: "20px 0" }} />

      {/* Product List */}
      {products.length === 0 ? (
        <p>Aucun produit disponible.</p>
      ) : (
        products.map((prod) => (
          <div key={prod.id} style={card}>
            <h3>{prod.name}</h3>
            <p>Prix: {prod.price} TND</p>
            <p>Catégorie: {prod.category}</p>

            <button style={btnEdit} onClick={() => startEdit(prod)}>
              Modifier
            </button>

            <button style={btnDelete} onClick={() => deleteProduct(prod.id)}>
              Supprimer
            </button>
          </div>
        ))
      )}
    </div>
  );
}

/* ---- STYLES ---- */
const card = {
  background: "#7a3e06ff",
  padding: "15px",
  borderRadius: "6px",
  marginBottom: "12px",
  border: "1px solid #ddd",
};

const btnAdd = {
  background: "#8b5a2b",
  color: "white",
  padding: "12px 15px",
  border: "none",
  borderRadius: "6px",
  cursor: "pointer",
  marginBottom: "20px",
};

const btnEdit = {
  background: "#4CAF50",
  color: "white",
  padding: "8px 12px",
  marginRight: "10px",
  border: "none",
  borderRadius: "5px",
  cursor: "pointer",
};

const btnDelete = {
  background: "#b33a3a",
  color: "white",
  padding: "8px 12px",
  border: "none",
  borderRadius: "5px",
  cursor: "pointer",
};
