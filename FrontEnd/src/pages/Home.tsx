import { useMemo, useState } from 'react';

import Button from '../components/Button';
import CategoryCard from '../components/CategoryCard';
import ProductCard from '../components/ProductCard';
import Searchbar from '../components/Searchbar';
import SellerCard from '../components/SellerCard';
import { sellers } from '../data/sellers';
import type { Category } from '../types/category';
import type { Product } from '../types/product';

import '../styles/home.css';

const categories: Category[] = [
  {
    id: 'handmade-ceramics',
    name: 'Handmade Ceramics',
    image: 'https://images.unsplash.com/photo-1565193566173-7a0ee3dbe261?auto=format&fit=crop&w=900&q=80',
  },
  {
    id: 'botanical-home',
    name: 'Botanical Home',
    image: 'https://images.unsplash.com/photo-1616486338812-3dadae4b4ace?auto=format&fit=crop&w=900&q=80',
  },
  {
    id: 'astrology-goods',
    name: 'Astrology Goods',
    image: 'https://images.unsplash.com/photo-1532968961962-8a0cb3a2d0c7?auto=format&fit=crop&w=900&q=80',
  },
  {
    id: 'witchy-decor',
    name: 'Witchy Decor',
    image: 'https://images.unsplash.com/photo-1513506003901-1e6a229e2d15?auto=format&fit=crop&w=900&q=80',
  },
  {
    id: 'self-care',
    name: 'Self-Care',
    image: 'https://images.unsplash.com/photo-1608571423902-eed4a5ad8108?auto=format&fit=crop&w=900&q=80',
  },
  {
    id: 'giftable-finds',
    name: 'Giftable Finds',
    image: 'https://images.unsplash.com/photo-1549465220-1a8b9238cd48?auto=format&fit=crop&w=900&q=80',
  },
];

const featuredProducts: Product[] = [
  {
    id: 1,
    title: 'Moonlit Clay Mug',
    price: 34,
    creator: 'Luna & Co.',
    tag: 'Ceramics',
    rating: 4.9,
    image: 'https://images.unsplash.com/photo-1514228742587-6b1558fcca3d?auto=format&fit=crop&w=900&q=80',
  },
  {
    id: 2,
    title: 'Botanical Candle Set',
    price: 28,
    creator: 'Willow Grove',
    tag: 'Home Ritual',
    rating: 4.8,
    image: 'https://images.unsplash.com/photo-1602872029706-5f3b8d5d7c4f?auto=format&fit=crop&w=900&q=80',
  },
  {
    id: 3,
    title: 'Celestial Journal',
    price: 24,
    creator: 'Sage Hollow',
    tag: 'Stationery',
    rating: 4.9,
    image: 'https://images.unsplash.com/photo-1517841905240-472988babdf9?auto=format&fit=crop&w=900&q=80',
  },
  {
    id: 4,
    title: 'Pressed Herb Bundle',
    price: 18,
    creator: 'Earth & Thread',
    tag: 'Wellness',
    rating: 4.7,
    image: 'https://images.unsplash.com/photo-1466692476868-aef1dfb1e735?auto=format&fit=crop&w=900&q=80',
  },
];

function Home() {
  const [searchTerm, setSearchTerm] = useState('');

  const filteredProducts = useMemo(() => {
    const normalized = searchTerm.trim().toLowerCase();

    if (!normalized) {
      return featuredProducts;
    }

    return featuredProducts.filter((product) => {
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
    <div className="marketplace-home">
      <section className="hero-section">
        <div className="hero-copy">
          <p className="eyebrow">Curated for mindful living</p>
          <h1>Find one-of-a-kind pieces made to feel personal.</h1>
          <p className="hero-text">
            Discover original handmade goods, spiritual essentials, and thoughtful gifts from independent creators.
          </p>

          <Searchbar
            value={searchTerm}
            onChange={setSearchTerm}
            onSubmit={setSearchTerm}
            className="home-search"
          />

          <div className="hero-actions">
            <Button>Shop best sellers</Button>
            <Button variant="secondary">Become a creator</Button>
          </div>

          <ul className="hero-stats" aria-label="Marketplace statistics">
            <li>
              <strong>25k+</strong>
              <span>happy shoppers</span>
            </li>
            <li>
              <strong>1.2k</strong>
              <span>independent makers</span>
            </li>
            <li>
              <strong>4.9/5</strong>
              <span>average rating</span>
            </li>
          </ul>
        </div>

        <div className="hero-visual" aria-label="Featured collection preview">
          <div className="feature-card feature-card--large">
            <span className="feature-badge">Featured drop</span>
            <h2>Golden Hour Ritual</h2>
            <p>Hand-poured candle + ceramic holder bundle</p>
            <div className="feature-price-row">
              <span>$42</span>
              <Button variant="ghost" size="sm">Explore</Button>
            </div>
          </div>
        </div>
      </section>

      {searchTerm && (
        <p className="search-results-summary">
          {filteredProducts.length + filteredSellers.length} result{filteredProducts.length + filteredSellers.length === 1 ? '' : 's'} for “{searchTerm}”
        </p>
      )}

      <section className="category-section">
        <div className="section-heading">
          <p className="eyebrow">Browse by vibe</p>
          <h2>Shop what speaks to you</h2>
        </div>

        <div className="category-grid">
          {categories.map((category) => (
            <CategoryCard key={category.id} category={category} />
          ))}
        </div>
      </section>

      <section className="products-section">
        <div className="section-heading section-heading--row">
          <div>
            <p className="eyebrow">Fresh picks</p>
            <h2>Popular this week</h2>
          </div>
          <Button variant="secondary" size="sm">
            View all products
          </Button>
        </div>

        {filteredProducts.length > 0 ? (
          <div className="products-grid">
            {filteredProducts.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        ) : (
          <div className="home-empty-state" aria-live="polite">
            <h3>No featured products match your search.</h3>
            <button type="button" className="home-clear-search" onClick={() => setSearchTerm('')}>
              Clear search
            </button>
          </div>
        )}
      </section>

      <section className="sellers-section">
        <div className="section-heading section-heading--row">
          <div>
            <p className="eyebrow">Meet the makers</p>
            <h2>Find a seller by name</h2>
          </div>
        </div>

        {filteredSellers.length > 0 ? (
          <div className="sellers-grid">
            {filteredSellers.map((seller) => (
              <SellerCard key={seller.id} seller={seller} />
            ))}
          </div>
        ) : (
          <div className="home-empty-state" aria-live="polite">
            <h3>No sellers match your search.</h3>
            <button type="button" className="home-clear-search" onClick={() => setSearchTerm('')}>
              Clear search
            </button>
          </div>
        )}
      </section>
    </div>
  );
}

export default Home;
