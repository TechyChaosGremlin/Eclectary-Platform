import { Link, NavLink } from "react-router-dom";
import "../styles/navbar.css";

function Navbar() {
    return (
        <nav className="top-nav" aria-label="Main navigation">
            <div className="nav-left">
                <Link className="brand" to="/" aria-label="Eclectary home">
                    <img src="/favicon.svg" alt="Eclectary" />
                </Link>

                <div className="site-links">
                    <NavLink to="/shop" className={({isActive})=> isActive ? 'link active' : 'link'}>Shop</NavLink>
                    <NavLink to="/about" className={({isActive})=> isActive ? 'link active' : 'link'}>About</NavLink>
                </div>
            </div>

            <div className="account-actions">
                <NavLink to="/cart" className="action" title="Cart" aria-label="Cart">
                    <span aria-hidden="true">🛒</span>
                    <span>Cart</span>
                </NavLink>

                <NavLink to="/login" className="action" title="Login" aria-label="Login">
                    <span>Login</span>
                </NavLink>

                <NavLink to="/register" className="action" title="Register" aria-label="Register">
                    <span>Register</span>
                </NavLink>
            </div>
        </nav>
    );
}

export default Navbar;