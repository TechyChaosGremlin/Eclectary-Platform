export interface Category {
  id: string;
  name: string;
  image: string;
  childSubcategories?: string[];
  collection?: 'custom-printing' | 'purely-handmade' | 'digital-creations';
}
