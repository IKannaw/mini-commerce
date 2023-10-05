import { Product } from "@prisma/client";

interface CartItem extends Product {
  quantity: number;
}

interface CartSlice {
  items: CartItem[];
  isLoaing: false;
  error: Error | null;
}

export default CartSlice;
