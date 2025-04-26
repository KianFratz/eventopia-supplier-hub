
export type PaymentMethod = 'credit_card' | 'bank_transfer' | 'paypal';

export interface Offer {
  id: string;
  supplierId: string;
  supplierName: string;
  eventId: string;
  eventName: string;
  services: string[];
  amount: number;
  status: 'pending' | 'approved' | 'rejected' | 'paid';
  createdAt: string;
  description: string;
}
