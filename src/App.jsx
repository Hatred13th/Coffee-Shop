import { Routes, Route } from "react-router-dom";
import { CartProvider } from "./context/CartProvider";

import Layout from "./components/Layout";
import Home from "./pages/Home";
import Products from "./pages/Products";
import Cart from "./pages/Cart";

function App() {
  return (
    // Fournit le contexte global du panier à toute l’application
    <CartProvider>

      {/* Définition de toutes les routes de l’application */}
      <Routes>

        {/*
          Route parente utilisant <Layout />
          Le layout contient : Navbar + Footer + <Outlet />
          Toutes les routes enfants ci-dessous seront affichées dans le <Outlet />.
        */}
        <Route element={<Layout />}>

          {/* Pages principales */}
          <Route path="/" element={<Home />} />              {/* Page d’accueil */}
          <Route path="/products" element={<Products />} />   {/* Liste des produits */}
          <Route path="/cart" element={<Cart />} />           {/* Panier */}

        </Route>

      </Routes>
    </CartProvider>
  );
}

export default App;
