import { Link, useParams } from 'react-router-dom';

import ProductCard from '../components/ProductCard';
import SellerCard from '../components/SellerCard';
import { categories } from '../data/categories';
import { getProductsByCategory } from '../services/productApi';
import { getSellersByCategory } from '../services/sellerApi';
import '../styles/category-detail.css';

function Category() {
  const { id } = useParams();
  const category = id ? categories.find((item) => item.id === id) : undefined;

  if (!category) {
    return (
      <section className="category-detail category-detail--empty" aria-live="polite">
        <p className="eyebrow">Category not found</p>
        <h1>That category is unavailable.</h1>
        <Link className="category-detail__back-link" to="/shop">
          Return to the shop
        </Link>
      </section>
    );
  }

  const categoryProducts = getProductsByCategory(category.id);
  const categorySellers = getSellersByCategory(category.id);

  return (
    <section className="category-detail">
      <Link className="category-detail__back-link" to="/categories">
        Back to categories
      </Link>

      <header className="category-detail__hero">
        <img className="category-detail__image" src={category.image} alt="" />
        <div className="category-detail__copy">
          <p className="eyebrow">Marketplace category</p>
          <h1>{category.name}</h1>
          {Boolean(category.childSubcategories?.length) && (
            <p className="category-detail__subcategories">
              Child categories: {category.childSubcategories?.join(', ')}
            </p>
          )}
          <p className="category-detail__count">
            {categoryProducts.length} item{categoryProducts.length === 1 ? '' : 's'}
          </p>
        </div>
      </header>

      {categoryProducts.length > 0 ? (
        <div className="category-detail__grid" aria-label={`${category.name} products`}>
          {categoryProducts.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      ) : (
        <div className="category-detail__empty-state" aria-live="polite">
          <h2>No products in this category yet.</h2>
          <p>Check back soon as new makers join Eclectary.</p>
        </div>
      )}

      {categorySellers.length > 0 && (
        <section className="category-detail__sellers" aria-label={`Shops in ${category.name}`}>
          <div className="section-heading">
            <p className="eyebrow">Shop by maker</p>
            <h2>Shops in this category</h2>
          </div>

          <div className="category-detail__sellers-grid">
            {categorySellers.map((seller) => (
              <SellerCard key={seller.id} seller={seller} />
            ))}
          </div>
        </section>
      )}
    </section>
  );
}

export default Category;
