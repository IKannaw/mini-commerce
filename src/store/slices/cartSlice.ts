import CartSlice, {
  CancleOrderPayload,
  CreateOrderPayload,
} from "@/types/cart";
import { config } from "@/utils/config";
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

const initialState: CartSlice = {
  items: [],
  isLoaing: false,
  error: null,
};

export const createOrder = createAsyncThunk(
  "cart/orderConfirm",
  async (options: CreateOrderPayload, thunkApi) => {
    const { payload, onSuccess, onError } = options;
    try {
      const response = await fetch(`${config.apiBaseUrl}/order`, {
        method: "POST",
        body: JSON.stringify(payload),
        headers: {
          "Content-Type": "application/json",
        },
      });
      const orderProducts = await response.json();
      onSuccess && onSuccess(orderProducts);
    } catch (err) {
      onError && onError(err);
    }
  }
);

export const cancleOrder = createAsyncThunk(
  "cart/cancleOrder",
  async (options: CancleOrderPayload, thunkApi) => {
    const { orderId, onSuccess, onError } = options;
    try {
      const response = await fetch(`${config.apiBaseUrl}/order/${orderId}`, {
        method: "DELETE",
      });
      const deleteProduct = await response.json();
      onSuccess && onSuccess(deleteProduct);
    } catch (err) {
      onError && onError(err);
    }
  }
);

const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    addToCart: (state, action) => {
      state.items = [...state.items, action.payload];
    },
    reset: () => initialState,
    updateQuantity: (state, action) => {
      const quantity = action.payload.quantity;
      if (!quantity) {
        state.items = state.items.filter((item) => {
          return item.id !== action.payload.id;
        });
      } else {
        state.items = state.items.map((item) =>
          item.id === action.payload.id
            ? { ...item, quantity: action.payload.quantity }
            : item
        );
      }
    },
  },
});

export const { addToCart, updateQuantity, reset } = cartSlice.actions;
export default cartSlice.reducer;
