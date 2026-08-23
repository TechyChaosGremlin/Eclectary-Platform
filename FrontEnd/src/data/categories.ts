import type { Category } from '../types/category';

export const categories: Category[] = [
	{
		id: 'apothecary-cleansing',
		name: 'Apothecary & Cleansing',
		childSubcategories: ['Loose Herbs', 'Small-Batch Oils', 'Hand-Rolled Incense'],
		image: 'https://images.unsplash.com/photo-1565193566173-7a0ee3dbe261?auto=format&fit=crop&w=900&q=80',
	},
	{
		id: 'altar-home-decor',
		name: 'Altar & Home Decor',
		childSubcategories: ['Woodworking', 'Ceramics', 'Wall Art', 'Textiles'],
		image: 'https://images.unsplash.com/photo-1616486338812-3dadae4b4ace?auto=format&fit=crop&w=900&q=80',
	},
	{
		id: 'jewelry-wearables',
		name: 'Jewelry & Wearables',
		childSubcategories: ['Wire-Wrapped', 'Metalwork', 'Talismans', 'Rings'],
		image: 'https://images.unsplash.com/photo-1532968961962-8a0cb3a2d0c7?auto=format&fit=crop&w=900&q=80',
	},
	{
		id: 'ritual-candles',
		name: 'Ritual Candles',
		childSubcategories: ['Intention Jars', 'Beeswax Pillars', 'Wax Melts'],
		image: 'https://images.unsplash.com/photo-1513506003901-1e6a229e2d15?auto=format&fit=crop&w=900&q=80',
	},
	{
		id: 'divination-tools',
		name: 'Divination & Tools',
		childSubcategories: ['Indie Decks', 'Resin Pendulums', 'Runes'],
		image: 'https://images.unsplash.com/photo-1608571423902-eed4a5ad8108?auto=format&fit=crop&w=900&q=80',
	},
];
