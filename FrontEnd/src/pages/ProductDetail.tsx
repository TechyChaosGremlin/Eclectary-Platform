import { useMemo, useState } from 'react';
import { Link, useParams } from 'react-router-dom';

import ProductCard from '../components/ProductCard';
import { useCart } from '../context/CartContext';
import { useWishlist } from '../context/WishlistContext';
import { products } from '../data/products';
import { getSellers } from '../services/sellerApi';
import '../styles/product-detail.css';

function ProductDetail() {
  const { id } = useParams();
  return <ProductDetailContent key={id} productId={id} />;
}

function ProductDetailContent({ productId }: { productId?: string }) {
  const numericProductId = Number(productId);
  const { addToCart, isInCart } = useCart();
  const { toggleWishlist, isWishlisted } = useWishlist();

  const product = useMemo(
    () => products.find((item) => item.id === numericProductId),
    [numericProductId],
  );
  const seller = product ? getSellers().find((item) => item.name === product.creator) : undefined;

  const [selectedImage, setSelectedImage] = useState(product?.image ?? '');

  const relatedProducts = useMemo(
    () => (product ? products.filter((item) => item.id !== product.id).slice(0, 3) : []),
    [product],
  );

  if (!product) {
    return (
      <section className="product-detail product-detail--empty" aria-live="polite">
        <p className="product-detail__eyebrow">Product not found</p>
        <h1>That item is no longer available.</h1>
        <Link className="product-detail__back-link" to="/shop">
          Return to the shop
        </Link>
      </section>
    );
  }

  const gallery = product.images && product.images.length > 0
    ? product.images
    : [product.image, product.image, product.image];

  const handleAddToCart = () => addToCart(product, 1);
  const handleToggleWishlist = () => toggleWishlist(product.id);

  return (
    <article className="product-detail">
      <Link className="product-detail__back-link" to="/shop">
        ← Back to shop
      </Link>

      <div className="product-detail__layout">
        <div className="product-detail__gallery" aria-label="Product gallery">
          <div className="product-detail__main-image-wrap">
            <img
              className="product-detail__main-image"
              src={selectedImage || product.image}
              alt={product.title}
            />
          </div>

          <div className="product-detail__thumbs">
            {gallery.map((image, index) => (
              <button
                key={`${image}-${index}`}
                type="button"
                className={`product-detail__thumb ${selectedImage === image ? 'is-active' : ''}`}
                onClick={() => setSelectedImage(image)}
                aria-label={`View product image ${index + 1}`}
              >
                <img src={image} alt={`${product.title} view ${index + 1}`} />
              </button>
            ))}
          </div>
        </div>

        <div className="product-detail__content">
          <p className="product-detail__eyebrow">{product.tag}</p>
          <h1>{product.title}</h1>

          <div className="product-detail__meta">
            <span className="product-detail__rating">★ {product.rating.toFixed(1)}</span>
            <span>{product.category ?? 'Handcrafted'}</span>
          </div>

          <div className="product-detail__seller">
            <span>By {seller ? <Link to={`/seller/${seller.id}`}><strong>{product.creator}</strong></Link> : <strong>{product.creator}</strong>}</span>
            <span>Ships in 3–5 days</span>
          </div>

          <div className="product-detail__price">${product.price.toFixed(2)}</div>

          <p className="product-detail__description">
            {product.description ?? 'Thoughtfully designed and made to bring a sense of calm, beauty, and individuality into everyday rituals.'}
          </p>

          <div className="product-detail__actions">
            <button type="button" className="product-detail__button" onClick={handleAddToCart}>
              {isInCart(product.id) ? 'Add another' : 'Add to cart'}
            </button>
            <button type="button" className="product-detail__secondary" onClick={handleToggleWishlist}>
              {isWishlisted(product.id) ? 'Saved to wishlist' : 'Save for later'}
            </button>
          </div>

          <ul className="product-detail__details">
            <li><span>Collection</span><strong>{product.collection ?? 'Curated finds'}</strong></li>
            <li><span>Material</span><strong>Artist-made</strong></li>
            <li><span>Delivery</span><strong>Free shipping over $50</strong></li>
          </ul>
        </div>
      </div>

      {relatedProducts.length > 0 && (
        <section className="product-detail__related" aria-label="Related products">
          <div className="product-detail__related-header">
            <h2>You may also like</h2>
            <Link className="product-detail__related-link" to="/shop">View all</Link>
          </div>

          <div className="product-detail__related-grid">
            {relatedProducts.map((item) => (
              <ProductCard key={item.id} product={item} />
            ))}
          </div>
        </section>
      )}
    </article>
  );
}

export default ProductDetail;
