import { Routes, Route } from "react-router-dom";
import { CartProvider } from "./context/CartProvider";

import Layout from "./components/Layout";
import Home from "./pages/Home";
import Products from "./pages/Products";
import Cart from "./pages/Cart";

function App() {
  return (
    <CartProvider>
      <Routes>
        {/* Parent route with layout */}
        <Route element={<Layout />}>
          <Route path="/" element={<Home />} />
          <Route path="/products" element={<Products />} />
          <Route path="/cart" element={<Cart />} />
        </Route>
      </Routes>
    </CartProvider>
  );
}

export default App;
