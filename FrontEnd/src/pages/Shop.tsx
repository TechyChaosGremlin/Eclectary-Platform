import ProductCard, { type Product } from '../components/ProductCard';

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
  return (
    <div className="shop-page">
      <header className="shop-hero">
        <div>
          <p className="eyebrow">Shop the collection</p>
          <h1>Find pieces made with intention.</h1>
        </div>

        <div className="shop-summary">
          <span>238 curated items</span>
          <span>New arrivals weekly</span>
        </div>
      </header>

      <section className="shop-grid" aria-label="Shop products">
        {products.map((product) => (
          <ProductCard key={product.id} product={product} />
        ))}
      </section>
    </div>
  );
}

export default Shop;
