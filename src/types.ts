export interface Bouquet {
  id: string;
  name: string;
  priceKGS: number;
  description: string;
  image: string;
  tags: string[];
  flowersList: string;
}

export interface FlowerType {
  id: string;
  name: string;
  priceKGS: number;
  color: string;
  symbolism: string;
}

export interface WrappingStyle {
  id: string;
  name: string;
  priceKGS: number;
  description: string;
}

export interface DeliveryLocation {
  id: string;
  name: string; // Balykchy, Cholpon-Ata, Karakol, etc.
  priceKGS: number;
  timeHours: string;
  description: string;
}

export interface CustomBouquet {
  flowers: { flowerId: string; count: number }[];
  wrappingId: string;
  ribbonColor: string;
  cardText: string;
  cardSender: string;
  cardRecipient: string;
}

export interface OrderDetails {
  id: string;
  itemsSummary: string;
  isCustom: boolean;
  basePrice: number;
  deliveryPrice: number;
  totalPrice: number;
  senderName: string;
  senderPhone: string;
  recipientName: string;
  recipientPhone: string;
  deliveryLocationId: string;
  deliveryAddress: string;
  deliveryDate: string;
  deliveryTime: string;
  cardText: string;
  paymentMethod: 'cash' | 'card' | 'elsom';
}
