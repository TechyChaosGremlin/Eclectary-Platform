import { useState } from "react";
import { BrowserRouter, Link, Navigate, Routes, Route, useParams } from "react-router-dom";

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
import Register from "./pages/Register";
import Profile from "./pages/Profile";
import ProductCard from "./components/ProductCard";
import SellerCard from "./components/SellerCard";
import { products } from "./data/products";
import { getCategory, handmadeCategories, isValidCategorySelection } from "./data/categories";
import { getSellers } from "./services/sellerApi";
import type { Product } from "./types";
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
        {products.map((product) => (
          <div key={product.id}>
            <ProductCard product={product} />
            <Link to={`/dashboard/products/${product.id}/edit`}>Edit listing</Link>
          </div>
        ))}
      </div>
    </section>
  )
}

function ListingForm({ product }: { product?: Product }) {
  const [categoryId, setCategoryId] = useState(product?.category ?? '');
  const [subcategory, setSubcategory] = useState(product?.subcategory ?? '');
  const [message, setMessage] = useState('');
  const selectedCategory = getCategory(categoryId);

  const selectCategory = (nextCategoryId: string) => {
    setCategoryId(nextCategoryId);
    setSubcategory('');
    setMessage('');
  };

  const submitListing = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setMessage(
      isValidCategorySelection('purely-handmade', categoryId, subcategory)
        ? 'Handmade category selection is valid.'
        : 'Choose a Handmade category and one of its subcategories.',
    );
  };

  return (
    <section style={{ padding: 24, maxWidth: 640 }}>
      <h2>{product ? 'Edit Handmade Listing' : 'Add Handmade Listing'}</h2>
      <form onSubmit={submitListing}>
        <label style={{ display: 'grid', gap: 6, marginTop: 16 }}>
          <span>Department</span>
          <input value="Handmade" readOnly aria-readonly="true" />
        </label>
        <label style={{ display: 'grid', gap: 6, marginTop: 16 }}>
          <span>Category</span>
          <select value={categoryId} onChange={(event) => selectCategory(event.target.value)} required>
            <option value="">Choose a category</option>
            {handmadeCategories.map((category) => (
              <option key={category.id} value={category.id}>{category.name}</option>
            ))}
          </select>
        </label>
        <label style={{ display: 'grid', gap: 6, marginTop: 16 }}>
          <span>Subcategory</span>
          <select value={subcategory} onChange={(event) => setSubcategory(event.target.value)} required disabled={!selectedCategory}>
            <option value="">Choose a subcategory</option>
            {selectedCategory?.childSubcategories?.map((child) => (
              <option key={child} value={child}>{child}</option>
            ))}
          </select>
        </label>
        <button type="submit" style={{ marginTop: 20 }}>{product ? 'Validate changes' : 'Validate listing'}</button>
      </form>
      {message && <p aria-live="polite">{message}</p>}
    </section>
  );
}

function AddProduct() {
  return <ListingForm />;
}

function EditProduct() {
  const { id } = useParams();
  const product = products.find((item) => item.id === Number(id));

  return product?.collection === 'purely-handmade'
    ? <ListingForm product={product} />
    : <section style={{ padding: 24 }}><h2>Listing unavailable</h2><p>Only Handmade mock listings support this category editor.</p></section>;
}

function AccountIndex() {
  const hasSession = Boolean(
    window.localStorage.getItem("eclectary-auth")
    || window.sessionStorage.getItem("eclectary-auth"),
  );

  return <Navigate to={hasSession ? "/account/profile" : "/account/login"} replace />;
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
          <Route path="/account" element={<AccountIndex />} />
          <Route path="/account/login" element={<Login />} />
          <Route path="/account/register" element={<Register />} />
          <Route path="/account/profile" element={<Profile />} />

          {/* Backward-compatible auth redirects */}
          <Route path="/login" element={<Navigate to="/account/login" replace />} />
          <Route path="/register" element={<Navigate to="/account/register" replace />} />
          <Route path="/profile" element={<Navigate to="/account/profile" replace />} />

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
          <Route path="products/:id/edit" element={<EditProduct />} />
          <Route path="orders" element={<div style={{ padding: 24 }}>Orders</div>} />
          <Route path="settings" element={<div style={{ padding: 24 }}>Settings</div>} />
        </Route>

        {/* Fallback */}
        <Route path="*" element={<NotFound />} />
      </Routes>
    </BrowserRouter>
  )
}

function Order() {
  return <div style={{ padding: 24 }}><h2>Order</h2><p>Order confirmation placeholder.</p></div>
}
export default App
