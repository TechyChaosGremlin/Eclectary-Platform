import { sellers } from '../data/sellers';
import type { Seller } from '../types';

export function getSellers(): Seller[] {
	return sellers;
}

export function getSellerById(id: string): Seller | undefined {
	return sellers.find((seller) => String(seller.id) === id);
}

export function getSellersByCategory(categoryId: string): Seller[] {
	return sellers.filter((seller) => seller.categories?.includes(categoryId));
}
