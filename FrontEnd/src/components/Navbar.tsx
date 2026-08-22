import { useEffect, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { useCart } from "../context/CartContext";
import "../styles/navbar.css";
import logo from "../assets/images/eclectary logo nb.png";

const AUTH_STORAGE_KEY = "eclectary-auth";
const AUTH_EVENT_NAME = "eclectary-auth-change";

function hasAuthSession() {
    if (typeof window === "undefined") {
        return false;
    }

    return Boolean(
        window.localStorage.getItem(AUTH_STORAGE_KEY)
        || window.sessionStorage.getItem(AUTH_STORAGE_KEY),
    );
}

function Navbar() {
    const location = useLocation();
    const { totalItems } = useCart();
    const [isLoggedIn, setIsLoggedIn] = useState(() => hasAuthSession());

    useEffect(() => {
        setIsLoggedIn(hasAuthSession());
    }, [location.pathname]);

    useEffect(() => {
        const syncAuthState = () => {
            setIsLoggedIn(hasAuthSession());
        };

        window.addEventListener("storage", syncAuthState);
        window.addEventListener(AUTH_EVENT_NAME, syncAuthState);

        return () => {
            window.removeEventListener("storage", syncAuthState);
            window.removeEventListener(AUTH_EVENT_NAME, syncAuthState);
        };
    }, []);

    return (
        <nav className="top-nav" aria-label="Main navigation">
            <Link className="brand" to="/" aria-label="Eclectary home">
                <img src={logo} alt="Eclectary" />
            </Link>

            <div className="account-actions">
                <Link
                    to={isLoggedIn ? "/profile" : "/login"}
                    className="action"
                    title={isLoggedIn ? "Profile" : "Login"}
                    aria-label={isLoggedIn ? "Profile" : "Login"}
                >
                    <span aria-hidden="true">♙</span>
                    <span>{isLoggedIn ? "Profile" : "Login"}</span>
                </Link>

                {isLoggedIn && (
                    <Link to="/favorites" className="action" title="Favorites" aria-label="Favorites">
                        <span aria-hidden="true">♡</span>
                        <span>Favorites</span>
                    </Link>
                )}

                <Link to="/cart" className="action" title="Cart" aria-label="Cart">
                    <span aria-hidden="true">🛒</span>
                    <span>{totalItems > 0 ? `Cart (${totalItems})` : "Cart"}</span>
                </Link>
            </div>
        </nav>
    );
}

export default Navbar;