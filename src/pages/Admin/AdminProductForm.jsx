import { useState } from "react";

export default function AdminProductForm({ existingProduct, onSave, onCancel }) {
  const [name, setName] = useState(existingProduct?.name || "");
  const [price, setPrice] = useState(existingProduct?.price || "");
  const [category, setCategory] = useState(existingProduct?.category || "");

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!name || !price || !category) return;

    const newProduct = {
      id: existingProduct ? existingProduct.id : Date.now(),
      name,
      price,
      category,
    };

    onSave(newProduct);
  };

  return (
    <div style={formBox}>
      <h3>{existingProduct ? "Modifier le produit" : "Ajouter un produit"}</h3>

      <form onSubmit={handleSubmit} style={form}>
        
        <input
          type="text"
          placeholder="Nom du produit"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />

        <input
          type="number"
          placeholder="Prix"
          value={price}
          onChange={(e) => setPrice(e.target.value)}
        />

        <select value={category} onChange={(e) => setCategory(e.target.value)}>
          <option value="">-- Choisir une catégorie --</option>
          <option value="café">Café</option>
          <option value="pâtisserie">Pâtisserie</option>
          <option value="jus">Jus</option>
        </select>

        <button type="submit" style={btnSave}>
          Enregistrer
        </button>
        <button type="button" style={btnCancel} onClick={onCancel}>
          Annuler
        </button>
      </form>
    </div>
  );
}

/* ---- STYLES ---- */

const formBox = {
  background: "#7a3e06ff",
  padding: "20px",
  borderRadius: "10px",
  marginBottom: "20px",
  border: "1px solid #d1a96c",
};

const form = {
  display: "flex",
  flexDirection: "column",
  gap: "12px",
};

const btnSave = {
  background: "#8b5a2b",
  color: "white",
  padding: "10px",
  border: "none",
  borderRadius: "6px",
  cursor: "pointer",
};

const btnCancel = {
  background: "#b33a3a",
  color: "white",
  padding: "10px",
  border: "none",
  borderRadius: "6px",
  cursor: "pointer",
  marginTop: "8px",
};
