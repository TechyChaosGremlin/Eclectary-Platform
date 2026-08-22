import { useEffect, useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";

import Button from "../components/Button";
import "../styles/profile.css";

type StoredUser = {
  email?: string;
  fullName?: string;
};

const AUTH_STORAGE_KEY = "eclectary-auth";

function Profile() {
  const navigate = useNavigate();
  const [user] = useState<StoredUser>(() => {
    const stored =
      window.localStorage.getItem(AUTH_STORAGE_KEY) ?? window.sessionStorage.getItem(AUTH_STORAGE_KEY);

    if (!stored) {
      return {
        email: "",
        fullName: "Eclectary Member",
      };
    }

    try {
      const parsed = JSON.parse(stored) as StoredUser;
      return {
        email: parsed.email ?? "",
        fullName: parsed.fullName ?? "Eclectary Member",
      };
    } catch {
      return {
        email: "",
        fullName: "Eclectary Member",
      };
    }
  });

  useEffect(() => {
    const stored =
      window.localStorage.getItem(AUTH_STORAGE_KEY) ?? window.sessionStorage.getItem(AUTH_STORAGE_KEY);

    if (!stored) {
      navigate("/account/login");
    }
  }, [navigate]);

  const initials = useMemo(() => {
    const fullName = user.fullName?.trim() || "Eclectary Member";
    const parts = fullName.split(/\s+/).filter(Boolean);

    if (parts.length >= 2) {
      return `${parts[0][0]}${parts[1][0]}`.toUpperCase();
    }

    return fullName.slice(0, 2).toUpperCase();
  }, [user.fullName]);

  function handleLogout() {
    window.localStorage.removeItem(AUTH_STORAGE_KEY);
    window.sessionStorage.removeItem(AUTH_STORAGE_KEY);
    window.dispatchEvent(new Event("eclectary-auth-change"));
    navigate("/");
  }

  const profileDetails = [
    { label: "Email", value: user.email || "Not provided" },
    { label: "Member since", value: "June 2026" },
    { label: "Saved lists", value: "12 items" },
    { label: "Delivery address", value: "No default address set" },
  ];

  const recentOrders = [
    { id: "#1042", item: "Hand-thrown ceramic vase", status: "Shipped" },
    { id: "#1038", item: "Woven market tote", status: "Delivered" },
    { id: "#1019", item: "Botanical print set", status: "Processing" },
  ];

  return (
    <main className="profile-page">
      <section className="profile-shell">
        <aside className="profile-sidebar">
          <div className="profile-avatar" aria-label="User avatar">{initials}</div>
          <div className="profile-summary">
            <p className="profile-kicker">Account</p>
            <h1>{user.fullName || "Eclectary Member"}</h1>
            <p>{user.email || "No email on file"}</p>
          </div>

          <div className="profile-actions">
            <Button type="button" variant="primary" fullWidth>
              Edit profile
            </Button>
            <Button type="button" variant="secondary" fullWidth onClick={handleLogout}>
              Log out
            </Button>
          </div>
        </aside>

        <div className="profile-content">
          <section className="profile-card">
            <div className="profile-card-header">
              <h2>Profile details</h2>
              <span className="profile-badge">Verified</span>
            </div>

            <div className="profile-detail-grid">
              {profileDetails.map((detail) => (
                <div key={detail.label} className="profile-detail-item">
                  <span>{detail.label}</span>
                  <strong>{detail.value}</strong>
                </div>
              ))}
            </div>
          </section>

          <section className="profile-card">
            <div className="profile-card-header">
              <h2>Quick stats</h2>
            </div>

            <div className="profile-stats-grid">
              <div className="profile-stat">
                <strong>12</strong>
                <span>Saved items</span>
              </div>
              <div className="profile-stat">
                <strong>4</strong>
                <span>Orders</span>
              </div>
              <div className="profile-stat">
                <strong>3</strong>
                <span>Wishlist updates</span>
              </div>
            </div>
          </section>

          <section className="profile-card">
            <div className="profile-card-header">
              <h2>Recent orders</h2>
              <a href="/shop">View all</a>
            </div>

            <div className="profile-order-list">
              {recentOrders.map((order) => (
                <div key={order.id} className="profile-order-item">
                  <div>
                    <span className="profile-order-id">{order.id}</span>
                    <p>{order.item}</p>
                  </div>
                  <span className="profile-order-status">{order.status}</span>
                </div>
              ))}
            </div>
          </section>
        </div>
      </section>
    </main>
  );
}

export default Profile;
