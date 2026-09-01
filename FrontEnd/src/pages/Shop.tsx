import { useEffect, useMemo, useState } from 'react';
import { Link, useSearchParams } from 'react-router-dom';

import ProductCard from '../components/ProductCard';
import Searchbar from '../components/Searchbar';
import SellerCard from '../components/SellerCard';
import logo from '../assets/images/eclectary logo nb.png';
import { useCart } from '../context/CartContext';
import { products } from '../data/products';
import { intentions } from '../data/intentions';
import { categories } from '../data/categories';
import { getSellers } from '../services/sellerApi';

import '../styles/shop.css';

const sellers = getSellers();

const PRICE_BUCKETS: Array<{ id: string; label: string; min: number; max?: number }> = [
  { id: 'under-25', label: 'Under $25', min: 0, max: 25 },
  { id: '25-50', label: '$25 to $50', min: 25, max: 50 },
  { id: '50-100', label: '$50 to $100', min: 50, max: 100 },
  { id: 'over-100', label: 'Over $100', min: 100 },
];

const SORT_OPTIONS: Array<{ id: string; label: string }> = [
  { id: '', label: 'Recommended' },
  { id: 'price-asc', label: 'Price: Low to High' },
  { id: 'price-desc', label: 'Price: High to Low' },
  { id: 'rating-desc', label: 'Top Rated' },
  { id: 'newest', label: 'Newest' },
];

const collectionNames: Record<string, string> = {
  'custom-printing': 'Custom Printing',
  'purely-handmade': 'Purely Handmade',
  'digital-creations': 'Digital Creations',
};

const collectionDescriptions: Record<string, string> = {
  'purely-handmade': 'Physical products made by independent creators.',
};

const AUTH_STORAGE_KEY = 'eclectary-auth';
const AUTH_EVENT_NAME = 'eclectary-auth-change';

// Matches the single-column breakpoint in shop.css.
const DESKTOP_MEDIA_QUERY = '(min-width: 901px)';

function useIsDesktop() {
  const [isDesktop, setIsDesktop] = useState(() => (
    typeof window === 'undefined' ? true : window.matchMedia(DESKTOP_MEDIA_QUERY).matches
  ));

  useEffect(() => {
    const mediaQuery = window.matchMedia(DESKTOP_MEDIA_QUERY);
    const syncIsDesktop = (event: MediaQueryListEvent) => setIsDesktop(event.matches);

    setIsDesktop(mediaQuery.matches);
    mediaQuery.addEventListener('change', syncIsDesktop);

    return () => mediaQuery.removeEventListener('change', syncIsDesktop);
  }, []);

  return isDesktop;
}

function hasAuthSession() {
  if (typeof window === 'undefined') {
    return false;
  }

  return Boolean(
    window.localStorage.getItem(AUTH_STORAGE_KEY)
    || window.sessionStorage.getItem(AUTH_STORAGE_KEY),
  );
}

function Shop() {
  const { totalItems } = useCart();
  const [searchParams, setSearchParams] = useSearchParams();
  const initialSearchTerm = searchParams.get('search') ?? '';
  const [searchTerm, setSearchTerm] = useState(initialSearchTerm);
  const [isLoggedIn, setIsLoggedIn] = useState(() => hasAuthSession());
  const [isFiltersOpen, setIsFiltersOpen] = useState(false);
  const isDesktop = useIsDesktop();
  const [openFilterSections, setOpenFilterSections] = useState(() => ({
    categories: isDesktop,
    intentions: isDesktop,
    price: isDesktop,
  }));
  const collection = searchParams.get('collection') ?? '';
  const intention = searchParams.get('intention') ?? '';
  const category = searchParams.get('category') ?? '';
  const priceBucket = searchParams.get('price') ?? '';
  const sort = searchParams.get('sort') ?? '';
  const collectionName = collectionNames[collection];
  const departmentCategories = collection
    ? categories.filter((item) => item.collection === collection)
    : [];

  const setFilterParam = (key: string, nextValue: string) => {
    const nextParams = new URLSearchParams(searchParams);

    if (nextValue) {
      nextParams.set(key, nextValue);
    } else {
      nextParams.delete(key);
    }

    setSearchParams(nextParams);
  };

  const selectIntention = (nextIntention: string) => setFilterParam('intention', nextIntention);
  const selectCategory = (nextCategory: string) => setFilterParam('category', nextCategory);
  const selectPrice = (nextPrice: string) => setFilterParam('price', nextPrice);
  const selectSort = (nextSort: string) => setFilterParam('sort', nextSort);

  const clearDepartmentFilters = () => {
    const nextParams = new URLSearchParams(searchParams);
    nextParams.delete('intention');
    nextParams.delete('category');
    nextParams.delete('price');
    nextParams.delete('sort');
    setSearchParams(nextParams);
  };

  useEffect(() => {
    const syncAuthState = () => setIsLoggedIn(hasAuthSession());

    window.addEventListener('storage', syncAuthState);
    window.addEventListener(AUTH_EVENT_NAME, syncAuthState);

    return () => {
      window.removeEventListener('storage', syncAuthState);
      window.removeEventListener(AUTH_EVENT_NAME, syncAuthState);
    };
  }, []);

  useEffect(() => {
    if (isDesktop) {
      setOpenFilterSections({ categories: true, intentions: true, price: true });
    }
  }, [isDesktop]);

  const activePriceBucket = PRICE_BUCKETS.find((bucket) => bucket.id === priceBucket);

  const filteredProducts = useMemo(() => {
    const normalized = searchTerm.trim().toLowerCase();
    const collectionProducts = collection
      ? products.filter((product) => product.collection === collection)
      : products;
    const categoryProducts = category
      ? collectionProducts.filter((product) => product.category === category)
      : collectionProducts;
    const intentionProducts = intention
      ? categoryProducts.filter((product) => product.intentions?.includes(intention))
      : categoryProducts;
    const priceProducts = activePriceBucket
      ? intentionProducts.filter((product) => (
        product.price >= activePriceBucket.min
        && (activePriceBucket.max === undefined || product.price < activePriceBucket.max)
      ))
      : intentionProducts;

    const searchedProducts = normalized
      ? priceProducts.filter((product) => {
        const haystack = [product.title, product.creator, product.tag].join(' ').toLowerCase();
        return haystack.includes(normalized);
      })
      : priceProducts;

    const sortedProducts = [...searchedProducts];

    switch (sort) {
      case 'price-asc':
        sortedProducts.sort((a, b) => a.price - b.price);
        break;
      case 'price-desc':
        sortedProducts.sort((a, b) => b.price - a.price);
        break;
      case 'rating-desc':
        sortedProducts.sort((a, b) => b.rating - a.rating);
        break;
      case 'newest':
        sortedProducts.sort((a, b) => b.id - a.id);
        break;
      default:
        break;
    }

    return sortedProducts;
  }, [activePriceBucket, category, collection, intention, searchTerm, sort]);

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
      {collectionName && (
        <section className="shop-collection-nav" aria-label={`${collectionName} collection navigation`}>
          <div className="shop-collection-nav__bottom" aria-label={`${collectionName} quick navigation`}>
            <Link className="shop-collection-nav__brand" to="/" aria-label="Eclectary home">
              <img src={logo} alt="Eclectary" />
            </Link>

            <label className="shop-collection-nav__search">
              <span className="shop-collection-nav__search-icon" aria-hidden="true">✦</span>
              <input
                type="search"
                value={searchTerm}
                onChange={(event) => setSearchTerm(event.target.value)}
                placeholder="Search creations, creators, ideas..."
                aria-label="Search creations, creators, ideas"
              />
            </label>

            <div className="shop-collection-nav__actions">
              <Link
                to={`/shop?collection=${collection}`}
                className="shop-collection-nav__action shop-collection-nav__action--collection"
                title={`Explore ${collectionName}`}
                aria-label={`Explore ${collectionName}`}
              >
                <span aria-hidden="true">✶</span>
                <span>{collectionName}</span>
              </Link>

              <Link
                to={isLoggedIn ? '/account/profile' : '/account/login'}
                className="shop-collection-nav__action"
                title={isLoggedIn ? 'Profile' : 'Login'}
                aria-label={isLoggedIn ? 'Profile' : 'Login'}
              >
                <span aria-hidden="true">♙</span>
                <span>{isLoggedIn ? 'Profile' : 'Login'}</span>
              </Link>

              {isLoggedIn && (
                <Link to="/favorites" className="shop-collection-nav__action" title="Favorites" aria-label="Favorites">
                  <span aria-hidden="true">♡</span>
                  <span>Favorites</span>
                </Link>
              )}

              <Link to="/cart" className="shop-collection-nav__action" title="Cart" aria-label="Cart">
                <span aria-hidden="true">🛒</span>
                <span>{totalItems > 0 ? `Cart (${totalItems})` : 'Cart'}</span>
              </Link>
            </div>
          </div>
        </section>
      )}

      <header className="shop-hero">
        <div>
          {!collectionName && <p className="eyebrow">Shop the collection</p>}
          <h1>{collectionName ?? 'Find pieces made with intention.'}</h1>
          {collectionDescriptions[collection] && <p>{collectionDescriptions[collection]}</p>}
        </div>
      </header>

      {!collection && (
        <Searchbar
          value={searchTerm}
          onChange={setSearchTerm}
          onSubmit={setSearchTerm}
          className="shop-search"
        />
      )}

      {collectionName ? (
        <div className="shop-layout">
          <button
            type="button"
            className="shop-filters-toggle"
            aria-expanded={isFiltersOpen}
            aria-controls="shop-filters"
            onClick={() => setIsFiltersOpen((isOpen) => !isOpen)}
          >
            <span aria-hidden="true">✦</span>
            Filters
          </button>

          <aside
            id="shop-filters"
            className={`shop-sidebar${isFiltersOpen ? ' shop-sidebar--open' : ''}`}
            aria-label={`${collectionName} filters`}
          >
            <p className="shop-sidebar__title"><span aria-hidden="true">✦</span> Filters</p>
            {departmentCategories.length > 0 && (
              <details
                className="shop-sidebar__section"
                open={isDesktop ? openFilterSections.categories : undefined}
                onToggle={(event) => {
                  const isOpen = event.currentTarget.open;
                  setOpenFilterSections((sections) => ({ ...sections, categories: isOpen }));
                }}
              >
                <summary className="shop-sidebar__heading"><span aria-hidden="true">✧</span> Categories</summary>
                <ul className="shop-sidebar__list">
                  <li>
                    <button
                      type="button"
                      className={`shop-sidebar__link${!category ? ' shop-sidebar__link--active' : ''}`}
                      aria-pressed={!category}
                      onClick={() => selectCategory('')}
                    >
                      All categories
                    </button>
                  </li>
                  {departmentCategories.map((departmentCategory) => (
                    <li key={departmentCategory.id}>
                      <button
                        type="button"
                        className={`shop-sidebar__link${category === departmentCategory.id ? ' shop-sidebar__link--active' : ''}`}
                        aria-pressed={category === departmentCategory.id}
                        onClick={() => selectCategory(departmentCategory.id)}
                      >
                        {departmentCategory.name}
                      </button>
                    </li>
                  ))}
                </ul>
              </details>
            )}

            <details
              className="shop-sidebar__section"
              open={isDesktop ? openFilterSections.intentions : undefined}
                onToggle={(event) => {
                  const isOpen = event.currentTarget.open;
                  setOpenFilterSections((sections) => ({ ...sections, intentions: isOpen }));
                }}
            >
              <summary className="shop-sidebar__heading"><span aria-hidden="true">✦</span> Shop by intention</summary>
              <ul className="shop-sidebar__list">
                <li>
                  <button
                    type="button"
                    className={`shop-sidebar__link${!intention ? ' shop-sidebar__link--active' : ''}`}
                    aria-pressed={!intention}
                    onClick={() => selectIntention('')}
                  >
                    All intentions
                  </button>
                </li>
                {intentions.map((availableIntention) => (
                  <li key={availableIntention}>
                    <button
                      type="button"
                      className={`shop-sidebar__link${intention === availableIntention ? ' shop-sidebar__link--active' : ''}`}
                      aria-pressed={intention === availableIntention}
                      onClick={() => selectIntention(availableIntention)}
                    >
                      {availableIntention}
                    </button>
                  </li>
                ))}
              </ul>
            </details>

            <details
              className="shop-sidebar__section"
              open={isDesktop ? openFilterSections.price : undefined}
                onToggle={(event) => {
                  const isOpen = event.currentTarget.open;
                  setOpenFilterSections((sections) => ({ ...sections, price: isOpen }));
                }}
            >
              <summary className="shop-sidebar__heading"><span aria-hidden="true">◇</span> Price</summary>
              <ul className="shop-sidebar__list">
                <li>
                  <button
                    type="button"
                    className={`shop-sidebar__link${!priceBucket ? ' shop-sidebar__link--active' : ''}`}
                    aria-pressed={!priceBucket}
                    onClick={() => selectPrice('')}
                  >
                    Any price
                  </button>
                </li>
                {PRICE_BUCKETS.map((bucket) => (
                  <li key={bucket.id}>
                    <button
                      type="button"
                      className={`shop-sidebar__link${priceBucket === bucket.id ? ' shop-sidebar__link--active' : ''}`}
                      aria-pressed={priceBucket === bucket.id}
                      onClick={() => selectPrice(bucket.id)}
                    >
                      {bucket.label}
                    </button>
                  </li>
                ))}
              </ul>
            </details>

            {(intention || category || priceBucket) && (
              <button type="button" className="shop-sidebar__clear" onClick={clearDepartmentFilters}>
                Clear all filters
              </button>
            )}
          </aside>

          <div className="shop-main">
            <div className="shop-toolbar">
              {(searchTerm || intention || category || priceBucket) ? (
                <p className="shop-results-summary">
                  {filteredProducts.length} result{filteredProducts.length === 1 ? '' : 's'}
                  {searchTerm && ` for “${searchTerm}”`}
                  {intention && ` with the intention “${intention}”`}
                  {category && ` in “${departmentCategories.find((item) => item.id === category)?.name ?? category}”`}
                  {activePriceBucket && ` priced ${activePriceBucket.label.toLowerCase()}`}
                </p>
              ) : <span />}

              <label className="shop-sort">
                <span>Sort by</span>
                <select value={sort} onChange={(event) => selectSort(event.target.value)}>
                  {SORT_OPTIONS.map((option) => (
                    <option key={option.id || 'default'} value={option.id}>
                      {option.label}
                    </option>
                  ))}
                </select>
              </label>
            </div>

            {filteredProducts.length > 0 ? (
              <section className="shop-grid" aria-label="Shop products">
                {filteredProducts.map((product) => (
                  <ProductCard key={product.id} product={product} />
                ))}
              </section>
            ) : (
              <div className="shop-empty-state" aria-live="polite">
                <h2>No products match these filters.</h2>
                <p>Try clearing a filter or searching a different keyword.</p>
                <button type="button" className="shop-clear-search" onClick={clearDepartmentFilters}>
                  Clear filters
                </button>
              </div>
            )}
          </div>
        </div>
      ) : (
        <>
          <section className="shop-intentions" aria-labelledby="shop-intentions-heading">
            <div className="section-heading">
              <p className="eyebrow">Shop by intention</p>
              <h2 id="shop-intentions-heading">Find what calls to you.</h2>
            </div>
            <div className="shop-intentions__list" role="group" aria-label="Filter products by intention">
              <button
                type="button"
                className={`shop-intention${!intention ? ' shop-intention--active' : ''}`}
                aria-pressed={!intention}
                onClick={() => selectIntention('')}
              >
                All intentions
              </button>
              {intentions.map((availableIntention) => (
                <button
                  key={availableIntention}
                  type="button"
                  className={`shop-intention${intention === availableIntention ? ' shop-intention--active' : ''}`}
                  aria-pressed={intention === availableIntention}
                  onClick={() => selectIntention(availableIntention)}
                >
                  {availableIntention}
                </button>
              ))}
            </div>
          </section>

          {(searchTerm || intention || filteredProducts.length > 0) && (
            <div className="shop-toolbar">
              {(searchTerm || intention) ? (
                <p className="shop-results-summary">
                  {filteredProducts.length + filteredSellers.length} result{filteredProducts.length + filteredSellers.length === 1 ? '' : 's'}
                  {searchTerm && ` for “${searchTerm}”`}
                  {intention && ` with the intention “${intention}”`}
                </p>
              ) : <span />}

              {filteredProducts.length > 0 && (
                <label className="shop-sort">
                  <span>Sort by</span>
                  <select value={sort} onChange={(event) => selectSort(event.target.value)}>
                    {SORT_OPTIONS.map((option) => (
                      <option key={option.id || 'default'} value={option.id}>
                        {option.label}
                      </option>
                    ))}
                  </select>
                </label>
              )}
            </div>
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
        </>
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
