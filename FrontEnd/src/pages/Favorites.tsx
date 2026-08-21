import { Link } from 'react-router-dom';

import ProductCard from '../components/ProductCard';
import { useWishlist } from '../context/WishlistContext';
import { products } from '../data/products';
import '../styles/wishlist.css';

function Favorites() {
  const { ids, clearWishlist } = useWishlist();
  const favoriteProducts = products.filter((product) => ids.includes(product.id));

  return (
    <section className="wishlist-page" aria-label="Favorites">
      <header className="wishlist-page__header">
        <div>
          <p className="eyebrow">Saved finds</p>
          <h1>Favorites</h1>
        </div>

        <div className="wishlist-page__summary">
          <span>{favoriteProducts.length} saved item{favoriteProducts.length === 1 ? '' : 's'}</span>
          {favoriteProducts.length > 0 && (
            <button type="button" className="wishlist-page__clear" onClick={clearWishlist}>
              Clear all
            </button>
          )}
        </div>
      </header>

      {favoriteProducts.length > 0 ? (
        <div className="wishlist-page__grid" aria-live="polite">
          {favoriteProducts.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      ) : (
        <div className="wishlist-page__empty" aria-live="polite">
          <h2>Your favorites list is empty.</h2>
          <p>Save pieces you love and come back to them anytime.</p>
          <Link to="/shop" className="wishlist-page__cta">
            Browse the shop
          </Link>
        </div>
      )}
    </section>
  );
}

export default Favorites;
