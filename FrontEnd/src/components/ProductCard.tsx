import { Link } from 'react-router-dom';

import '../styles/product-card.css';

export interface Product {
  id: number;
  title: string;
  price: number;
  creator: string;
  tag: string;
  rating: number;
  image: string;
}

interface ProductCardProps {
  product: Product;
}

function ProductCard({ product }: ProductCardProps) {
  return (
    <article className="product-card">
      <Link className="product-card__image-wrap" to={`/product/${product.id}`} aria-label={product.title}>
        <img className="product-card__image" src={product.image} alt={product.title} />
      </Link>

      <div className="product-card__content">
        <div className="product-card__meta">
          <span className="product-card__tag">{product.tag}</span>
          <span className="product-card__rating">★ {product.rating}</span>
        </div>

        <Link to={`/product/${product.id}`} className="product-card__title-link">
          <h3>{product.title}</h3>
        </Link>

        <p className="product-card__creator">by {product.creator}</p>

        <div className="product-card__footer">
          <span className="product-card__price">${product.price.toFixed(2)}</span>
          <Link to={`/product/${product.id}`} className="product-card__cta">
            View item
          </Link>
        </div>
      </div>
    </article>
  );
}

export default ProductCard;
