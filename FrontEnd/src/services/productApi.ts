import { products } from '../data/products';
import type { Product } from '../types';

export function getProducts(): Product[] {
	return products;
}

export function getProductsByCategory(categoryId: string): Product[] {
	return products.filter((product) => product.category === categoryId);
}
