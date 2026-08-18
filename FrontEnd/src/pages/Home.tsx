import Button from '../components/Button';
import ProductCard, { type Product } from '../components/ProductCard';

import '../styles/home.css';

const categories = [
  'Handmade Ceramics',
  'Botanical Home',
  'Astrology Goods',
  'Witchy Decor',
  'Self-Care',
  'Giftable Finds',
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
  return (
    <div className="marketplace-home">
      <section className="hero-section">
        <div className="hero-copy">
          <p className="eyebrow">Curated for mindful living</p>
          <h1>Find one-of-a-kind pieces made to feel personal.</h1>
          <p className="hero-text">
            Discover original handmade goods, spiritual essentials, and thoughtful gifts from independent creators.
          </p>

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

      <section className="category-section">
        <div className="section-heading">
          <p className="eyebrow">Browse by vibe</p>
          <h2>Shop what speaks to you</h2>
        </div>

        <div className="category-grid">
          {categories.map((category) => (
            <div key={category} className="category-pill">
              {category}
            </div>
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

        <div className="products-grid">
          {featuredProducts.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      </section>
    </div>
  );
}

export default Home;
