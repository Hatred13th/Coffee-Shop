import { Routes, Route } from "react-router-dom";
import { CartProvider } from "./context/CartProvider";
import { AuthProvider } from "./context/AuthContext";

import Layout from "./components/Layout";
import Home from "./pages/Home";
import Products from "./pages/Products";
import Cart from "./pages/Cart";
import Login from "./pages/Login";
import Signup from "./pages/Signup";

import AdminRoute from "./components/AdminRoute";
import AdminDashboard from "./pages/Admin/AdminDashboard";
import AdminProducts from "./pages/Admin/AdminProducts";
import AdminOrders from "./pages/Admin/AdminOrders";

function App() {
  return (
    <AuthProvider>
      <CartProvider>
        <Routes>
          <Route path="/admin/orders" element={<AdminRoute> <AdminOrders /> </AdminRoute>}/>
          
          {/*lets admin delete,edit and add products */}
          <Route path="/admin/products"element={<AdminRoute> <AdminProducts/></AdminRoute>}/>


        {/*sign up page */}
        <Route path="/signup" element={<Signup />} />


          {/* Login page */}
          <Route path="/login" element={<Login />} />

          {/* Normal pages */}
          <Route element={<Layout />}>
            <Route path="/" element={<Home />} />
            <Route path="/products" element={<Products />} />
            <Route path="/cart" element={<Cart />} />
          </Route>

          {/* Admin-only page */}
          <Route
            path="/admin"
            element={
              <AdminRoute>
                <AdminDashboard />
              </AdminRoute>
            }
          />

        </Routes>
      </CartProvider>
    </AuthProvider>
  );
}

export default App;
