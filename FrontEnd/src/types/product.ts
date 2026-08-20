export interface Product {
	id: number;
	name?: string;
	slug?: string;
	title: string;
	description?: string;
	price: number;
	image: string;
	images?: string[];
	category?: string;
	seller?: string;
	creator: string;
	tag: string;
	rating: number;
	status?: string;
}
