import { BrowserRouter, Navigate, Routes, Route, useNavigate } from "react-router-dom";

import MainLayout from "./layouts/MainLayout";
import SellerLayout from "./layouts/SellerLayout";
import DashboardLayout from "./layouts/DashboardLayout";
import Home from "./pages/Home";
import Shop from "./pages/Shop";
import SellerDetail from "./pages/SellerDetail";
import ProductDetail from "./pages/ProductDetail";
import Favorites from "./pages/Favorites";
import Categories from "./pages/Categories";
import Category from "./pages/Category";
import Cart from "./pages/Cart";
import Checkout from "./pages/Checkout";
import Login from "./pages/Login";
import ProductCard from "./components/ProductCard";
import SellerCard from "./components/SellerCard";
import { products } from "./data/products";
import { getSellers } from "./services/sellerApi";
import "./App.css";

function NotFound() {
  return (
    <div style={{ padding: 40 }}>
      <h2>404 — Page not found</h2>
      <p>The page you requested does not exist.</p>
    </div>
  )
}

function About() {
  return <div style={{ padding: 24 }}><h2>About</h2><p>About Eclectary.</p></div>
}

function SellerHome() {
  const sellers = getSellers();

  return (
    <section style={{ padding: 24 }}>
      <h2>Seller Portal</h2>
      <p>{sellers.length} makers are currently represented in the marketplace.</p>
      <div className="shop-sellers-grid">
        {sellers.slice(0, 3).map((seller) => <SellerCard key={seller.id} seller={seller} />)}
      </div>
    </section>
  )
}

function DashboardOverview() {
  const totalValue = products.reduce((sum, product) => sum + product.price, 0);

  return (
    <section style={{ padding: 24 }}>
      <h2>Dashboard</h2>
      <p>Marketplace data at a glance.</p>
      <div style={{ display: "grid", gap: 16, gridTemplateColumns: "repeat(auto-fit, minmax(160px, 1fr))", marginTop: 24 }}>
        <strong>{products.length} products</strong>
        <strong>{getSellers().length} sellers</strong>
        <strong>${totalValue.toFixed(2)} catalog value</strong>
      </div>
    </section>
  )
}

function Products() {
  return (
    <section style={{ padding: 24 }}>
      <h2>Products</h2>
      <p>{products.length} products from the mock catalog.</p>
      <div className="shop-grid" style={{ marginTop: 24 }}>
        {products.map((product) => <ProductCard key={product.id} product={product} />)}
      </div>
    </section>
  )
}

function AddProduct() {
  return <div style={{ padding: 24 }}><h2>Add Product</h2><p>New product form placeholder.</p></div>
}

function App() {
  return (
    <BrowserRouter>
      <Routes>
        {/* Public routes wrapped in MainLayout */}
        <Route element={<MainLayout />}>
          <Route path="/" element={<Home />} />
          <Route path="/shop" element={<Shop />} />
          <Route path="/seller/:id" element={<SellerDetail />} />
          <Route path="/shop/:id" element={<SellerDetail />} />
          <Route path="/categories" element={<Categories />} />
          <Route path="/category/:id" element={<Category />} />
          <Route path="/product/:id" element={<ProductDetail />} />
          <Route path="/favorites" element={<Favorites />} />
          <Route path="/wishlist" element={<Navigate to="/favorites" replace />} />
          <Route path="/about" element={<About />} />

          {/* Authentication */}
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/profile" element={<Profile />} />

          {/* Shopping */}
          <Route path="/cart" element={<Cart />} />
          <Route path="/checkout" element={<Checkout />} />
          <Route path="/order" element={<Order />} />
        </Route>

        {/* Seller routes */}
        <Route path="/seller" element={<SellerLayout />}>
          <Route index element={<SellerHome />} />
        </Route>

        {/* Creator dashboard routes */}
        <Route path="/dashboard" element={<DashboardLayout />}>
          <Route index element={<DashboardOverview />} />
          <Route path="products" element={<Products />} />
          <Route path="products/new" element={<AddProduct />} />
          <Route path="orders" element={<div style={{ padding: 24 }}>Orders</div>} />
          <Route path="settings" element={<div style={{ padding: 24 }}>Settings</div>} />
        </Route>

        {/* Fallback */}
        <Route path="*" element={<NotFound />} />
      </Routes>
    </BrowserRouter>
  )
}

function Register() {
  return <div style={{ padding: 24 }}><h2>Register</h2><p>Registration form placeholder.</p></div>
}

function Profile() {
  const navigate = useNavigate();

  function handleLogout() {
    window.localStorage.removeItem("eclectary-auth");
    window.sessionStorage.removeItem("eclectary-auth");
    window.dispatchEvent(new Event("eclectary-auth-change"));
    navigate("/");
  }

  return (
    <div style={{ padding: 24, display: "grid", gap: 14, maxWidth: 560 }}>
      <h2 style={{ margin: 0 }}>Profile</h2>
      <p style={{ margin: 0 }}>Signed in to Eclectary.</p>
      <button
        type="button"
        onClick={handleLogout}
        style={{
          width: "fit-content",
          border: "none",
          borderRadius: 999,
          background: "linear-gradient(135deg, #58174c, #a14d76)",
          color: "#fff",
          fontWeight: 700,
          padding: "10px 16px",
          cursor: "pointer",
        }}
      >
        Logout
      </button>
    </div>
  )
}

function Order() {
  return <div style={{ padding: 24 }}><h2>Order</h2><p>Order confirmation placeholder.</p></div>
}
export default App
