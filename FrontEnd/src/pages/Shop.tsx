import { useMemo, useState } from 'react';
import { useSearchParams } from 'react-router-dom';

import ProductCard from '../components/ProductCard';
import Searchbar from '../components/Searchbar';
import SellerCard from '../components/SellerCard';
import { products } from '../data/products';
import { getSellers } from '../services/sellerApi';

import '../styles/shop.css';

const sellers = getSellers();

const collectionNames: Record<string, string> = {
  'custom-printing': 'Custom Printing',
  'purely-handmade': 'Purely Handmade',
  'digital-creations': 'Digital Creations',
};

function Shop() {
  const [searchParams] = useSearchParams();
  const [searchTerm, setSearchTerm] = useState('');
  const collection = searchParams.get('collection') ?? '';
  const collectionName = collectionNames[collection];

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
      <header className="shop-hero">
        <div>
          <p className="eyebrow">{collectionName ?? 'Shop the collection'}</p>
          <h1>{collectionName ?? 'Find pieces made with intention.'}</h1>
        </div>

        <div className="shop-summary">
          <span>{filteredProducts.length} curated items</span>
          <span>New arrivals weekly</span>
        </div>
      </header>

      <Searchbar
        value={searchTerm}
        onChange={setSearchTerm}
        onSubmit={setSearchTerm}
        className="shop-search"
      />

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
