export interface OrderItem {
  id: number;
  name: string;
  quantity: number;
  price: number;
}

export interface Order {
  id: string | number;
  items: OrderItem[];
  total: number;
  status: string;
  date: string;
}
