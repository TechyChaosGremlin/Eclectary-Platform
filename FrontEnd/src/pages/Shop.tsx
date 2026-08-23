import { useEffect, useMemo, useState } from 'react';
import { Link, useSearchParams } from 'react-router-dom';

import ProductCard from '../components/ProductCard';
import Searchbar from '../components/Searchbar';
import SellerCard from '../components/SellerCard';
import logo from '../assets/images/eclectary logo nb.png';
import { useCart } from '../context/CartContext';
import { products } from '../data/products';
import { getSellers } from '../services/sellerApi';

import '../styles/shop.css';

const sellers = getSellers();

const collectionNames: Record<string, string> = {
  'custom-printing': 'Custom Printing',
  'purely-handmade': 'Purely Handmade',
  'digital-creations': 'Digital Creations',
};

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

function Shop() {
  const { totalItems } = useCart();
  const [searchParams] = useSearchParams();
  const initialSearchTerm = searchParams.get('search') ?? '';
  const [searchTerm, setSearchTerm] = useState(initialSearchTerm);
  const [isLoggedIn, setIsLoggedIn] = useState(() => hasAuthSession());
  const collection = searchParams.get('collection') ?? '';
  const collectionName = collectionNames[collection];

  useEffect(() => {
    const syncAuthState = () => setIsLoggedIn(hasAuthSession());

    window.addEventListener('storage', syncAuthState);
    window.addEventListener(AUTH_EVENT_NAME, syncAuthState);

    return () => {
      window.removeEventListener('storage', syncAuthState);
      window.removeEventListener(AUTH_EVENT_NAME, syncAuthState);
    };
  }, []);

  const filteredProducts = useMemo(() => {
    const normalized = searchTerm.trim().toLowerCase();
    const collectionProducts = collection
      ? products.filter((product) => product.collection === collection)
      : products;

    if (!normalized) {
      return collectionProducts;
    }

    return collectionProducts.filter((product) => {
      const haystack = [product.title, product.creator, product.tag].join(' ').toLowerCase();
      return haystack.includes(normalized);
    });
  }, [collection, searchTerm]);

  const filteredSellers = useMemo(() => {
    if (collection) {
      return [];
    }

    const normalized = searchTerm.trim().toLowerCase();

    if (!normalized) {
      return sellers;
    }

    return sellers.filter((seller) => {
      const haystack = [seller.name, seller.specialty, seller.bio].join(' ').toLowerCase();
      return haystack.includes(normalized);
    });
  }, [collection, searchTerm]);

  return (
    <div className="shop-page">
      {collectionName && (
        <section className="shop-collection-nav" aria-label={`${collectionName} collection navigation`}>
          <div className="shop-collection-nav__bottom" aria-label={`${collectionName} quick navigation`}>
            <Link className="shop-collection-nav__brand" to="/" aria-label="Eclectary home">
              <img src={logo} alt="Eclectary" />
            </Link>

            <label className="shop-collection-nav__search">
              <span className="shop-collection-nav__search-icon" aria-hidden="true">✦</span>
              <input
                type="search"
                value={searchTerm}
                onChange={(event) => setSearchTerm(event.target.value)}
                placeholder="Search creations, creators, ideas..."
                aria-label="Search creations, creators, ideas"
              />
            </label>

            <div className="shop-collection-nav__actions">
              <Link
                to={`/shop?collection=${collection}`}
                className="shop-collection-nav__action shop-collection-nav__action--collection"
                title={`Explore ${collectionName}`}
                aria-label={`Explore ${collectionName}`}
              >
                <span aria-hidden="true">✶</span>
                <span>{collectionName}</span>
              </Link>

              <Link
                to={isLoggedIn ? '/account/profile' : '/account/login'}
                className="shop-collection-nav__action"
                title={isLoggedIn ? 'Profile' : 'Login'}
                aria-label={isLoggedIn ? 'Profile' : 'Login'}
              >
                <span aria-hidden="true">♙</span>
                <span>{isLoggedIn ? 'Profile' : 'Login'}</span>
              </Link>

              {isLoggedIn && (
                <Link to="/favorites" className="shop-collection-nav__action" title="Favorites" aria-label="Favorites">
                  <span aria-hidden="true">♡</span>
                  <span>Favorites</span>
                </Link>
              )}

              <Link to="/cart" className="shop-collection-nav__action" title="Cart" aria-label="Cart">
                <span aria-hidden="true">🛒</span>
                <span>{totalItems > 0 ? `Cart (${totalItems})` : 'Cart'}</span>
              </Link>
            </div>
          </div>
        </section>
      )}

      <header className="shop-hero">
        <div>
          {!collectionName && <p className="eyebrow">Shop the collection</p>}
          <h1>{collectionName ?? 'Find pieces made with intention.'}</h1>
        </div>
      </header>

      {!collection && (
        <Searchbar
          value={searchTerm}
          onChange={setSearchTerm}
          onSubmit={setSearchTerm}
          className="shop-search"
        />
      )}

      {searchTerm && (
        <p className="shop-results-summary">
          {filteredProducts.length + filteredSellers.length} result{filteredProducts.length + filteredSellers.length === 1 ? '' : 's'} for “{searchTerm}”
        </p>
      )}

      {filteredProducts.length > 0 ? (
        <section className="shop-grid" aria-label="Shop products">
          {filteredProducts.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </section>
      ) : (
        <div className="shop-empty-state" aria-live="polite">
          <h2>No products match your search.</h2>
          <p>Try another keyword like “ceramics,” “journal,” or “moss.”</p>
          <button type="button" className="shop-clear-search" onClick={() => setSearchTerm('')}>
            Clear search
          </button>
        </div>
      )}

      {filteredSellers.length > 0 && (
        <section className="shop-sellers" aria-label="Seller search results">
          <div className="section-heading section-heading--row">
            <div>
              <p className="eyebrow">Shop by maker</p>
              <h2>Matching sellers</h2>
            </div>
          </div>

          <div className="shop-sellers-grid">
            {filteredSellers.map((seller) => (
              <SellerCard key={seller.id} seller={seller} />
            ))}
          </div>
        </section>
      )}
    </div>
  );
}

export default Shop;
