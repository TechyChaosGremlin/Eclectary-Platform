import { Link } from 'react-router-dom';

import type { Seller } from '../types';
import '../styles/seller-card.css';

interface SellerCardProps {
	seller: Seller;
}

function SellerCard({ seller }: SellerCardProps) {
	return (
		<article className="seller-card">
			<Link className="seller-card__image-link" to={`/seller/${seller.id}`} aria-label={`View ${seller.name}'s shop`}>
				<img className="seller-card__image" src={seller.image} alt={`${seller.name}, ${seller.specialty}`} loading="lazy" />
			</Link>

			<div className="seller-card__content">
				<p className="seller-card__specialty">{seller.specialty}</p>
				<h3 className="seller-card__name">{seller.name}</h3>
				<p className="seller-card__bio">{seller.bio}</p>
				<Link className="seller-card__link" to={`/seller/${seller.id}`}>
					Visit Shop
				</Link>
			</div>
		</article>
	);
}

export default SellerCard;
