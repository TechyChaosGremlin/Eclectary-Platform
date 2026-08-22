import { beforeEach, describe, expect, it } from 'vitest';
import { fireEvent, render, screen } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import userEvent from '@testing-library/user-event';

import Cart from './Cart';
import { CartProvider } from '../context/CartContext';

const CART_STORAGE_KEY = 'eclectary-cart';

function renderCart() {
  return render(
    <BrowserRouter>
      <CartProvider>
        <Cart />
      </CartProvider>
    </BrowserRouter>,
  );
}

describe('Cart', () => {
  beforeEach(() => {
    window.localStorage.clear();
  });

  it('shows an empty-cart state when no items have been added', () => {
    renderCart();

    expect(screen.getByRole('heading', { name: 'Your cart is empty.' })).toBeInTheDocument();
    expect(screen.getByRole('link', { name: 'Browse the shop' })).toHaveAttribute('href', '/shop');
  });

  it('loads cart items from local storage and calculates the subtotal', () => {
    window.localStorage.setItem(CART_STORAGE_KEY, JSON.stringify([{ productId: 1, quantity: 2 }]));

    renderCart();

    expect(screen.getByRole('heading', { name: 'Moonlit Clay Mug' })).toBeInTheDocument();
    expect(screen.getByDisplayValue('2')).toBeInTheDocument();
    expect(screen.getByLabelText('Cart summary')).toHaveTextContent('$68.00');
  });

  it('increases and decreases an item quantity and updates totals', async () => {
    const user = userEvent.setup();
    window.localStorage.setItem(CART_STORAGE_KEY, JSON.stringify([{ productId: 1, quantity: 1 }]));
    renderCart();

    await user.click(screen.getByRole('button', { name: 'Increase quantity for Moonlit Clay Mug' }));

    expect(screen.getByDisplayValue('2')).toBeInTheDocument();
    expect(screen.getByLabelText('Cart summary')).toHaveTextContent('$68.00');

    await user.click(screen.getByRole('button', { name: 'Decrease quantity for Moonlit Clay Mug' }));

    expect(screen.getByDisplayValue('1')).toBeInTheDocument();
    expect(screen.getByLabelText('Cart summary')).toHaveTextContent('$34.00');
  });

  it('updates an item quantity from the quantity field and persists it', () => {
    window.localStorage.setItem(CART_STORAGE_KEY, JSON.stringify([{ productId: 1, quantity: 1 }]));
    renderCart();

    fireEvent.change(screen.getByRole('spinbutton', { name: 'Quantity for Moonlit Clay Mug' }), {
      target: { value: '3' },
    });

    expect(screen.getByDisplayValue('3')).toBeInTheDocument();
    expect(screen.getByLabelText('Cart summary')).toHaveTextContent('$102.00');
    expect(window.localStorage.getItem(CART_STORAGE_KEY)).toBe('[{"productId":1,"quantity":3}]');
  });

  it('removes an item from the cart', async () => {
    const user = userEvent.setup();
    window.localStorage.setItem(CART_STORAGE_KEY, JSON.stringify([{ productId: 1, quantity: 1 }]));
    renderCart();

    await user.click(screen.getByRole('button', { name: 'Remove' }));

    expect(screen.getByRole('heading', { name: 'Your cart is empty.' })).toBeInTheDocument();
    expect(window.localStorage.getItem(CART_STORAGE_KEY)).toBe('[]');
  });
});