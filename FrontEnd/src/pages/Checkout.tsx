import { Link } from 'react-router-dom';

import { useCart } from '../context/CartContext';

function Checkout() {
	const { items, subtotal, clearCart } = useCart();

	if (items.length === 0) {
		return (
			<section style={{ margin: '0 auto', maxWidth: 720, padding: '40px 20px' }}>
				<h1>Your checkout is empty.</h1>
				<p>Add something from the shop before checking out.</p>
				<Link to="/shop">Return to the shop</Link>
			</section>
		);
	}

	return (
		<section style={{ margin: '0 auto', maxWidth: 720, padding: '40px 20px' }}>
			<p className="eyebrow">Almost yours</p>
			<h1>Checkout</h1>
			<p>{items.reduce((total, item) => total + item.quantity, 0)} items ready to order.</p>
			<p>Order total <strong>${subtotal.toFixed(2)}</strong></p>
			<button onClick={clearCart} type="button">Place mock order</button>
			<p><Link to="/cart">Back to cart</Link></p>
		</section>
	);
}

export default Checkout;
