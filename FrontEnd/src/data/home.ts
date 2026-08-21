import { categories } from './categories';
import { products } from './products';
import { sellers } from './sellers';

export const homepageData = {
  stats: [
    { value: '25k+', label: 'happy shoppers' },
    { value: '1.2k', label: 'independent makers' },
    { value: '4.9/5', label: 'average rating' },
  ],
  featuredCategories: categories,
  featuredProducts: products.slice(0, 4),
  featuredSellers: sellers.slice(0, 3),
};