import { Link } from "react-router-dom";
import "../styles/navbar.css";
import logo from "../assets/images/eclectary logo nb.png";

function Navbar() {
    return (
        <nav className="top-nav" aria-label="Main navigation">
            <Link className="brand" to="/" aria-label="Eclectary home">
                <img src={logo} alt="Eclectary" />
            </Link>

            <div className="account-actions">
                <Link to="/login" className="action" title="Account" aria-label="Account">
                    <span aria-hidden="true">♙</span>
                    <span>Account</span>
                </Link>
                <Link to="/favorites" className="action" title="Favorites" aria-label="Favorites">
                    <span aria-hidden="true">♡</span>
                    <span>Favorites</span>
                </Link>
                <Link to="/cart" className="action" title="Cart" aria-label="Cart">
                    <span aria-hidden="true">🛒</span>
                    <span>Cart</span>
                </Link>
            </div>
        </nav>
    );
}

export default Navbar;