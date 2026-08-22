import { Link } from 'react-router-dom';
import { useEffect, useMemo, useState } from 'react';

import customPrinting from '../assets/images/custom-printing.png';
import digitalCreations from '../assets/images/digital-creations.png';
import purelyHandmade from '../assets/images/purely-handmade.png';
import heroBanner from '../assets/images/herobanner3.png';
import logo from '../assets/images/eclectary logo nb.png';
import SellerCard from '../components/SellerCard';
import ProductCard from '../components/ProductCard';
import { useCart } from '../context/CartContext';
import { products } from '../data/products';
import { getSellers } from '../services/sellerApi';

import '../styles/home.css';

const sellers = getSellers();
const AUTH_STORAGE_KEY = 'eclectary-auth';
const AUTH_EVENT_NAME = 'eclectary-auth-change';

function hasAuthSession() {
  if (typeof window === 'undefined') {
    return false;
  }

  return Boolean(
    window.localStorage.getItem(AUTH_STORAGE_KEY)
    || window.sessionStorage.getItem(AUTH_STORAGE_KEY),
  );
}

function Home() {
  const { totalItems } = useCart();
  const [searchTerm, setSearchTerm] = useState('');
  const [isLoggedIn, setIsLoggedIn] = useState(() => hasAuthSession());
  const normalizedSearch = searchTerm.trim().toLowerCase();

  useEffect(() => {
    const syncAuthState = () => setIsLoggedIn(hasAuthSession());

    window.addEventListener('storage', syncAuthState);
    window.addEventListener(AUTH_EVENT_NAME, syncAuthState);

    return () => {
      window.removeEventListener('storage', syncAuthState);
      window.removeEventListener(AUTH_EVENT_NAME, syncAuthState);
    };
  }, []);
  const filteredSellers = useMemo(
    () => normalizedSearch
      ? sellers.filter((seller) => [seller.name, seller.specialty, seller.bio].join(' ').toLowerCase().includes(normalizedSearch))
      : sellers.slice(0, 4),
    [normalizedSearch],
  );
  const filteredProducts = useMemo(
    () => normalizedSearch
      ? products.filter((product) => [product.title, product.creator, product.tag].join(' ').toLowerCase().includes(normalizedSearch))
      : [],
    [normalizedSearch],
  );

  return (
    <div className="legacy-home">
      <div className="legacy-search-container">
        <div className="home-bottom-nav" aria-label="Home quick navigation">
          <Link className="home-bottom-nav__brand" to="/" aria-label="Eclectary home">
            <img src={logo} alt="Eclectary" />
          </Link>

          <label className="legacy-search-bar home-bottom-nav__search">
            <span className="legacy-search-icon" aria-hidden="true">✦</span>
            <input
              type="search"
              value={searchTerm}
              onChange={(event) => setSearchTerm(event.target.value)}
              placeholder="Search creations, creators, ideas..."
              aria-label="Search creations, creators, ideas"
            />
          </label>

          <div className="home-bottom-nav__actions">
            <Link
              to={isLoggedIn ? '/profile' : '/login'}
              className="home-bottom-nav__action"
              title={isLoggedIn ? 'Profile' : 'Login'}
              aria-label={isLoggedIn ? 'Profile' : 'Login'}
            >
              <span aria-hidden="true">♙</span>
              <span>{isLoggedIn ? 'Profile' : 'Login'}</span>
            </Link>

            <Link to="/cart" className="home-bottom-nav__action" title="Cart" aria-label="Cart">
              <span aria-hidden="true">🛒</span>
              <span>{totalItems > 0 ? `Cart (${totalItems})` : 'Cart'}</span>
            </Link>
          </div>
        </div>
      </div>

      <section className="legacy-category-banner" aria-label="Browse Eclectary collections">
        <Link to="/shop?collection=custom-printing"><img src={customPrinting} alt="Custom Printing" /></Link>
        <Link to="/shop?collection=purely-handmade"><img src={purelyHandmade} alt="Purely Handmade" /></Link>
        <Link to="/shop?collection=digital-creations"><img src={digitalCreations} alt="Digital Creations" /></Link>
      </section>

      {normalizedSearch && (
        <section className="home-search-results" aria-label="Search results">
          <div className="makers-header">
            <h2>Search results</h2>
            <p>{filteredProducts.length} product{filteredProducts.length === 1 ? '' : 's'} and {filteredSellers.length} maker{filteredSellers.length === 1 ? '' : 's'} found</p>
          </div>

          {filteredProducts.length > 0 && (
            <div className="home-search-products">
              {filteredProducts.map((product) => <ProductCard key={product.id} product={product} />)}
            </div>
          )}
        </section>
      )}

      <section className="legacy-hero-banner" aria-label="Eclectary introduction">
        <img src={heroBanner} alt="Find what calls to you and discover creations made with passion." />
      </section>

      <section className="makers-section">
        <div className="makers-header"><h2>Meet the Makers</h2></div>
        <div className="makers-grid">
          {filteredSellers.map((seller) => <SellerCard key={seller.id} seller={seller} />)}
        </div>
        <div className="makers-footer"><Link to="/shop">View All Makers <span aria-hidden="true">→</span></Link></div>
      </section>
    </div>
  );
}

export default Home;
