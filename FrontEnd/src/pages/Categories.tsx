import { useMemo, useState } from 'react';

import CategoryCard from '../components/CategoryCard';
import Searchbar from '../components/Searchbar';
import { categories } from '../data/categories';
import { getProductsByCategory } from '../services/productApi';
import { getSellersByCategory } from '../services/sellerApi';
import '../styles/categories.css';

function Categories() {
  const [searchTerm, setSearchTerm] = useState('');

  const filteredCategories = useMemo(() => {
    const normalized = searchTerm.trim().toLowerCase();

    if (!normalized) {
      return categories;
    }

    return categories.filter((category) => category.name.toLowerCase().includes(normalized));
  }, [searchTerm]);

  return (
    <div className="categories-page">
      <header className="categories-hero">
        <div>
          <p className="eyebrow">Discover Eclectary</p>
          <h1>Browse every category.</h1>
          <p className="categories-hero__copy">
            Explore products, curated collections, and the independent shops behind them.
          </p>
        </div>

        <div className="categories-summary">
          <span>{categories.length} categories</span>
          <span>New makers joining weekly</span>
        </div>
      </header>

      <Searchbar
        value={searchTerm}
        onChange={setSearchTerm}
        onSubmit={setSearchTerm}
        placeholder="Search categories like ceramics, astrology, or self-care"
        className="categories-search"
      />

      {filteredCategories.length > 0 ? (
        <section className="categories-grid" aria-label="All categories">
          {filteredCategories.map((category) => {
            const productCount = getProductsByCategory(category.id).length;
            const sellerCount = getSellersByCategory(category.id).length;

            return (
              <div key={category.id} className="categories-grid__item">
                <CategoryCard category={category} />
                <p className="categories-grid__meta">
                  {productCount} item{productCount === 1 ? '' : 's'} · {sellerCount} shop{sellerCount === 1 ? '' : 's'}
                </p>
              </div>
            );
          })}
        </section>
      ) : (
        <div className="categories-empty-state" aria-live="polite">
          <h2>No categories match your search.</h2>
          <p>Try another keyword like “ceramics,” “astrology,” or “self-care.”</p>
          <button type="button" className="categories-clear-search" onClick={() => setSearchTerm('')}>
            Clear search
          </button>
        </div>
      )}
    </div>
  );
}

export default Categories;
