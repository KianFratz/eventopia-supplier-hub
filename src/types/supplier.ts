
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
  verified?: boolean;
}

export interface Review {
  id: string;
  supplierId: string;
  author: string;
  rating: number;
  comment: string;
  date: string;
}

export interface VerificationRequest {
  id?: string;
  supplierId: string;
  supplierName: string;
  businessName: string;
  businessAddress: string;
  taxId: string;
  licenseNumber?: string;
  contactPerson: string;
  contactEmail: string;
  contactPhone: string;
  documents: string[];
  additionalInfo?: string;
  status: 'pending' | 'approved' | 'rejected';
  submittedAt: string;
  updatedAt?: string;
}
