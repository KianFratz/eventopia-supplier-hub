
export interface Supplier {
  id: string;
  name: string;
  category: string;
  description: string;
  image: string;
  gallery?: string[];
  rating: number;
  reviews: number;
  location: string;
  price: string; // Price range or starting price
  availability: string;
  tags: string[];
  contact: {
    email: string;
    phone: string;
    website?: string;
  };
  services?: string[];
}

export interface Review {
  id: string;
  supplierId: string;
  author: string;
  rating: number;
  comment: string;
  date: string;
}
