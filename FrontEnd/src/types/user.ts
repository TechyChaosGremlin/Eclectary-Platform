export interface User {
  id: string;
  name: string;
  email: string;
  account: {
    status: string;
    createdAt?: string;
    lastLogin?: string;
  };
  role: 'admin' | 'seller' | 'buyer';
}

