import { Product } from "@prisma/client";

export interface CartItem extends Product {
  quantity: number;
}

interface CartSlice {
  items: CartItem[];
  isLoaing: false;
  error: Error | null;
}

export interface BaseOrderPayload {
  onSuccess?: (data?: any) => void;
  onError?: (data?: any) => void;
}

export interface CreateOrderPayload extends BaseOrderPayload {
  payload: CartItem[];
}

export interface CancleOrderPayload extends BaseOrderPayload {
  orderId: string | string[] | undefined;
}

export default CartSlice;

export enum OrderStatus {
  ORDERED,
  OUTFORDELIVERY,
  DELIVERED,
  CANCLEDt,
}
