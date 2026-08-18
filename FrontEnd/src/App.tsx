import { BrowserRouter, Routes, Route } from "react-router-dom";

import MainLayout from "./layouts/MainLayout";
import SellerLayout from "./layouts/SellerLayout";
import DashboardLayout from "./layouts/DashboardLayout";
import Home from "./pages/Home";
import Shop from "./pages/Shop";
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
  return <div style={{ padding: 24 }}><h2>Seller Portal</h2><p>Seller home.</p></div>
}

function DashboardOverview() {
  return <div style={{ padding: 24 }}><h2>Dashboard</h2><p>Overview.</p></div>
}

function Products() {
  return <div style={{ padding: 24 }}><h2>Products</h2><p>Product list.</p></div>
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
          <Route path="/shop/:id" element={<ShopDetail />} />
          <Route path="/category/:id" element={<Category />} />
          <Route path="/product/:id" element={<Product />} />
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

function ShopDetail() {
  return <div style={{ padding: 24 }}><h2>Shop</h2><p>Shop detail placeholder.</p></div>
}

function Category() {
  return <div style={{ padding: 24 }}><h2>Category</h2><p>Category listing placeholder.</p></div>
}

function Product() {
  return <div style={{ padding: 24 }}><h2>Product</h2><p>Product detail placeholder.</p></div>
}

/* Authentication placeholders */
function Login() {
  return <div style={{ padding: 24 }}><h2>Login</h2><p>Login form placeholder.</p></div>
}

function Register() {
  return <div style={{ padding: 24 }}><h2>Register</h2><p>Registration form placeholder.</p></div>
}

function Profile() {
  return <div style={{ padding: 24 }}><h2>Profile</h2><p>User profile placeholder.</p></div>
}

/* Shopping placeholders */
function Cart() {
  return <div style={{ padding: 24 }}><h2>Cart</h2><p>Your cart.</p></div>
}

function Checkout() {
  return <div style={{ padding: 24 }}><h2>Checkout</h2><p>Checkout flow placeholder.</p></div>
}

function Order() {
  return <div style={{ padding: 24 }}><h2>Order</h2><p>Order confirmation placeholder.</p></div>
}
export default App
