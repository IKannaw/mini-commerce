import { Product } from "@prisma/client";

export interface CartItem extends Product {
  quantity: number;
}

interface CartSlice {
  items: CartItem[];
  isLoaing: false;
  error: Error | null;
}

export default CartSlice;

export enum OrderStatus {
  ORDERED,
  OUTFORDELIVERY,
  DELIVERED,
  CANCLEDt
}