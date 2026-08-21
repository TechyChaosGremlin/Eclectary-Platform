import { Link } from 'react-router-dom';

import { useCart } from '../context/CartContext';
import { products } from '../data/products';

function Cart() {
	const { items, subtotal, updateQuantity, removeFromCart } = useCart();
	const cartProducts = items
		.map((item) => ({ item, product: products.find((product) => product.id === item.productId) }))
		.filter((entry): entry is typeof entry & { product: NonNullable<typeof entry.product> } => Boolean(entry.product));

	return (
		<section style={{ margin: '0 auto', maxWidth: 1120, padding: '40px 20px' }}>
			<p className="eyebrow">Your collection</p>
			<h1>Cart</h1>

			{cartProducts.length === 0 ? (
				<div style={{ marginTop: 24 }}>
					<p>Your cart is waiting for something special.</p>
					<Link to="/shop">Browse the shop</Link>
				</div>
			) : (
				<div style={{ display: 'grid', gap: 32, gridTemplateColumns: 'minmax(0, 1fr) 280px', marginTop: 32 }}>
					<div style={{ display: 'grid', gap: 16 }}>
						{cartProducts.map(({ item, product }) => (
							<article key={product.id} style={{ alignItems: 'center', background: 'var(--surface)', border: '1px solid var(--border-aura)', borderRadius: 12, display: 'grid', gap: 16, gridTemplateColumns: '96px minmax(0, 1fr) auto', padding: 16 }}>
								<img src={product.image} alt={product.title} style={{ aspectRatio: '1', borderRadius: 8, objectFit: 'cover', width: '100%' }} />
								<div>
									<h2 style={{ fontSize: '1.2rem' }}>{product.title}</h2>
									<p>{product.creator}</p>
									<label>
										Quantity{' '}
										<input min="1" onChange={(event) => updateQuantity(product.id, Number(event.target.value))} type="number" value={item.quantity} />
									</label>
								</div>
								<div>
									<strong>${(product.price * item.quantity).toFixed(2)}</strong>
									<button onClick={() => removeFromCart(product.id)} type="button">Remove</button>
								</div>
							</article>
						))}
					</div>
					<aside style={{ alignSelf: 'start', background: 'var(--surface)', border: '1px solid var(--border-aura)', borderRadius: 12, padding: 20 }}>
						<h2>Summary</h2>
						<p>Subtotal <strong>${subtotal.toFixed(2)}</strong></p>
						<Link to="/checkout">Continue to checkout</Link>
					</aside>
				</div>
			)}
		</section>
	);
}

export default Cart;
