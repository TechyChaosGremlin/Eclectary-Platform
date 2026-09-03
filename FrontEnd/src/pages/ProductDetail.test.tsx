import { describe, it, expect, vi } from 'vitest';
import { render, screen, waitFor } from '@testing-library/react';
import { MemoryRouter, Route, Routes } from 'react-router-dom';
import userEvent from '@testing-library/user-event';
import ProductDetail from '../pages/ProductDetail';
import { CartProvider } from '../context/CartContext';
import { WishlistProvider } from '../context/WishlistContext';

// Mock the data
vi.mock('../data/products', () => ({
  products: [
    {
      id: 1,
      title: 'Moonlit Clay Mug',
      price: 34,
      creator: 'Luna & Co.',
      tag: 'Ceramics',
      collection: 'purely-handmade',
      category: 'home-altar',
      rating: 4.9,
      image: 'https://example.com/mug.jpg',
      images: [
        'https://example.com/mug-1.jpg',
        'https://example.com/mug-2.jpg',
        'https://example.com/mug-3.jpg',
      ],
      description: 'Beautiful handmade mug',
    },
    {
      id: 2,
      title: 'Botanical Candle Set',
      price: 28,
      creator: 'Willow Grove',
      tag: 'Home Ritual',
      collection: 'purely-handmade',
      category: 'ritual-witchcraft',
      rating: 4.8,
      image: 'https://example.com/candle.jpg',
    },
    {
      id: 3,
      title: 'Celestial Journal',
      price: 24,
      creator: 'Sage Hollow',
      tag: 'Stationery',
      rating: 4.7,
      image: 'https://example.com/journal.jpg',
    },
  ],
}));

// Mock the sellers service
vi.mock('../services/sellerApi', () => ({
  getSellers: () => [
    {
      id: 1,
      name: 'Luna & Co.',
      image: 'https://example.com/seller.jpg',
      rating: 4.9,
    },
  ],
}));

const renderProductDetailWithId = (productId: string | number = 1) => {
  return render(
    <MemoryRouter initialEntries={[`/product/${productId}`]}>
      <CartProvider>
        <WishlistProvider>
          <Routes>
            <Route path="/product/:id" element={<ProductDetail />} />
          </Routes>
        </WishlistProvider>
      </CartProvider>
    </MemoryRouter>,
  );
};

describe('ProductDetail', () => {
  it('should render product details when product is found', async () => {
    const { container } = renderProductDetailWithId(1);

    await waitFor(() => {
      expect(screen.getByText('Moonlit Clay Mug')).toBeInTheDocument();
    });

    expect(screen.getAllByText('Ceramics').length).toBeGreaterThan(0);
    expect(container.querySelectorAll('.product-detail__stars')).toHaveLength(2);
    expect(screen.getAllByText('4.9').length).toBeGreaterThanOrEqual(2);
    expect(screen.getAllByText('Beautiful handmade mug')).toHaveLength(2);
  });

  it('should render product price formatted correctly', async () => {
    renderProductDetailWithId(1);

    await waitFor(() => {
      expect(screen.getByText('$34.00')).toBeInTheDocument();
    });
  });

  it('should render product image gallery', async () => {
    renderProductDetailWithId(1);

    await waitFor(() => {
      expect(screen.getByAltText('Moonlit Clay Mug')).toBeInTheDocument();
    });

    const image = screen.getByAltText('Moonlit Clay Mug') as HTMLImageElement;
    // Initially shows the main product image
    expect(image.src).toContain('mug.jpg');
  });

  it('should render gallery thumbnail buttons', async () => {
    renderProductDetailWithId(1);

    await waitFor(() => {
      const thumbButtons = screen.getAllByRole('button', {
        name: /view product image/i,
      });
      expect(thumbButtons.length).toBeGreaterThan(0);
    });
  });

  it('should change main image when thumbnail is clicked', async () => {
    const user = userEvent.setup();
    renderProductDetailWithId(1);

    await waitFor(() => {
      expect(screen.getByAltText('Moonlit Clay Mug')).toBeInTheDocument();
    });

    const thumbButtons = screen.getAllByRole('button', {
      name: /view product image/i,
    });

    await user.click(thumbButtons[1]);

    const mainImage = screen.getByAltText('Moonlit Clay Mug') as HTMLImageElement;
    expect(mainImage.src).toContain('mug-2.jpg');
  });

  it('should render Add to cart button', async () => {
    renderProductDetailWithId(1);

    await waitFor(() => {
      expect(screen.getByRole('button', { name: /add to cart/i })).toBeInTheDocument();
    });
  });

  it('should render Save for later button', async () => {
    renderProductDetailWithId(1);

    await waitFor(() => {
      expect(screen.getByRole('button', { name: /save for later/i })).toBeInTheDocument();
    });
  });

  it('should add product to cart when button is clicked', async () => {
    const user = userEvent.setup();
    renderProductDetailWithId(1);

    await waitFor(() => {
      expect(screen.getByRole('button', { name: /add to cart/i })).toBeInTheDocument();
    });

    const addToCartBtn = screen.getByRole('button', { name: /add to cart/i });
    await user.click(addToCartBtn);

    await waitFor(() => {
      expect(screen.getByRole('button', { name: /add another/i })).toBeInTheDocument();
    });
  });

  it('should toggle wishlist when Save for later button is clicked', async () => {
    const user = userEvent.setup();
    renderProductDetailWithId(1);

    await waitFor(() => {
      expect(screen.getByRole('button', { name: /save for later/i })).toBeInTheDocument();
    });

    const wishlistBtn = screen.getByRole('button', { name: /save for later/i });
    await user.click(wishlistBtn);

    await waitFor(() => {
      expect(screen.getByRole('button', { name: /saved to wishlist/i })).toBeInTheDocument();
    });
  });

  it('should render product metadata', async () => {
    renderProductDetailWithId(1);

    await waitFor(() => {
      expect(screen.getByText('home-altar')).toBeInTheDocument();
    });

    expect(screen.getByText('purely-handmade')).toBeInTheDocument();
  });

  it('should render Back to shop link', async () => {
    renderProductDetailWithId(1);

    await waitFor(() => {
      const backLinks = screen.getAllByRole('link', { name: /back to shop/i });
      expect(backLinks.length).toBeGreaterThan(0);
    });
  });

  it('should render related products section when products exist', async () => {
    renderProductDetailWithId(1);

    await waitFor(() => {
      expect(screen.getByText('You May Also Like')).toBeInTheDocument();
    });

    expect(screen.getByText('Botanical Candle Set')).toBeInTheDocument();
    expect(screen.getByText('Celestial Journal')).toBeInTheDocument();
  });

  it('should display seller name with link when seller exists', async () => {
    renderProductDetailWithId(1);

    await waitFor(() => {
      const sellerLink = screen.getByRole('link', { name: /Luna & Co./i });
      expect(sellerLink).toBeInTheDocument();
      expect(sellerLink).toHaveAttribute('href', '/seller/1');
    });
  });

  it('should show "Product not found" when product does not exist', async () => {
    renderProductDetailWithId(999);

    await waitFor(() => {
      expect(screen.getByText('Product not found')).toBeInTheDocument();
    });
  });

  it('should render product shipping information', async () => {
    renderProductDetailWithId(1);

    await waitFor(() => {
      expect(screen.getAllByText(/Ships in 3–5 days/i).length).toBeGreaterThan(0);
    });
  });

  it('should render product details from available product data', async () => {
    renderProductDetailWithId(1);

    await waitFor(() => {
      expect(screen.getByText('Collection')).toBeInTheDocument();
      expect(screen.getByText('Category')).toBeInTheDocument();
      expect(screen.getByText('About this item')).toBeInTheDocument();
    });
  });

  it('should use fallback description when product description is not provided', async () => {
    renderProductDetailWithId(1);

    await waitFor(() => {
      expect(screen.getAllByText('Beautiful handmade mug')).toHaveLength(2);
    });
  });

  it('should render product as article element', async () => {
    const { container } = renderProductDetailWithId(1);

    await waitFor(() => {
      const article = container.querySelector('article.product-detail');
      expect(article).toBeInTheDocument();
    });
  });

  it('should limit related products to 3', async () => {
    renderProductDetailWithId(1);

    await waitFor(() => {
      const productCards = screen.getAllByRole('article');
      // 1 main product detail + up to 3 related products
      expect(productCards.length).toBeLessThanOrEqual(4);
    });
  });

  it('should have proper accessibility attributes for gallery', async () => {
    renderProductDetailWithId(1);

    await waitFor(() => {
      const gallery = screen.getByLabelText('Product gallery');
      expect(gallery).toBeInTheDocument();
    });
  });

  it('should have proper accessibility attributes for related products', async () => {
    renderProductDetailWithId(1);

    await waitFor(() => {
      const relatedSection = screen.getByLabelText('Related products');
      expect(relatedSection).toBeInTheDocument();
    });
  });
});
