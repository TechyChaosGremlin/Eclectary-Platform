import { useMemo, useState } from 'react';

import ProductCard from '../components/ProductCard';
import Searchbar from '../components/Searchbar';
import SellerCard from '../components/SellerCard';
import { sellers } from '../data/sellers';
import type { Product } from '../types/product';

import '../styles/shop.css';

const products: Product[] = [
  {
    id: 101,
    title: 'Amber Glass Tumbler',
    price: 26,
    creator: 'Moss Atelier',
    tag: 'Drinkware',
    rating: 4.8,
    image: 'https://images.unsplash.com/photo-1517705008128-361805f42e86?auto=format&fit=crop&w=900&q=80',
  },
  {
    id: 102,
    title: 'Sage Linen Throw',
    price: 58,
    creator: 'Hearth & Thread',
    tag: 'Textiles',
    rating: 4.9,
    image: 'https://images.unsplash.com/photo-1521572267360-ee0c2909d518?auto=format&fit=crop&w=900&q=80',
  },
  {
    id: 103,
    title: 'Wildflower Press Set',
    price: 32,
    creator: 'Petal Foundry',
    tag: 'Art',
    rating: 4.7,
    image: 'https://images.unsplash.com/photo-1460661419201-fd4cecdf8a8b?auto=format&fit=crop&w=900&q=80',
  },
  {
    id: 104,
    title: 'Oracle Card Deck',
    price: 22,
    creator: 'Moonwell Studio',
    tag: 'Divination',
    rating: 5.0,
    image: 'https://images.unsplash.com/photo-1515377905703-c4788e51af15?auto=format&fit=crop&w=900&q=80',
  },
  {
    id: 105,
    title: 'Lavender Bath Ritual',
    price: 40,
    creator: 'The Quiet Bloom',
    tag: 'Self Care',
    rating: 4.8,
    image: 'https://images.unsplash.com/photo-1556228578-8c89e6adf883?auto=format&fit=crop&w=900&q=80',
  },
  {
    id: 106,
    title: 'Hanging Herb Drying Kit',
    price: 44,
    creator: 'Rooted & Co.',
    tag: 'Kitchen',
    rating: 4.8,
    image: 'https://images.unsplash.com/photo-1501004318641-b39e6451bec6?auto=format&fit=crop&w=900&q=80',
  },
  {
    id: 107,
    title: 'Whispering Journal',
    price: 19,
    creator: 'Ink & Lantern',
    tag: 'Stationery',
    rating: 4.9,
    image: 'https://images.unsplash.com/photo-1517841905240-472988babdf9?auto=format&fit=crop&w=900&q=80',
  },
  {
    id: 108,
    title: 'Terracotta Candle Trio',
    price: 36,
    creator: 'Ember + Fern',
    tag: 'Home',
    rating: 4.8,
    image: 'https://images.unsplash.com/photo-1602872029706-5f3b8d5d7c4f?auto=format&fit=crop&w=900&q=80',
  },
];

function Shop() {
  const [searchTerm, setSearchTerm] = useState('');

  const filteredProducts = useMemo(() => {
    const normalized = searchTerm.trim().toLowerCase();

    if (!normalized) {
      return products;
    }

    return products.filter((product) => {
      const haystack = [product.title, product.creator, product.tag].join(' ').toLowerCase();
      return haystack.includes(normalized);
    });
  }, [searchTerm]);

  const filteredSellers = useMemo(() => {
    const normalized = searchTerm.trim().toLowerCase();

    if (!normalized) {
      return sellers;
    }

    return sellers.filter((seller) => {
      const haystack = [seller.name, seller.specialty, seller.bio].join(' ').toLowerCase();
      return haystack.includes(normalized);
    });
  }, [searchTerm]);

  return (
    <div className="shop-page">
      <header className="shop-hero">
        <div>
          <p className="eyebrow">Shop the collection</p>
          <h1>Find pieces made with intention.</h1>
        </div>

        <div className="shop-summary">
          <span>{products.length} curated items</span>
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
