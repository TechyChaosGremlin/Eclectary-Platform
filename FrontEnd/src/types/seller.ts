export interface Seller {
  id: string | number;
  name: string;
  image: string;
  specialty: string;
  bio: string;
  categories?: string[];
}
