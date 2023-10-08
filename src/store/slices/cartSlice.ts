import CartSlice, { CartItem } from "@/types/cart";
import { config } from "@/utils/config";
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { stringify } from "querystring";
import { json } from "stream/consumers";

const initialState: CartSlice = {
  items: [],
  isLoaing: false,
  error: null,
};

 export const orderConfirm = createAsyncThunk("cart/orderConfirm",async(payload:CartItem[],thunkApi)=>{
     const response =await fetch(`${config.apiBaseUrl}/orders`,{
        method:"POST",
        body:JSON.stringify(payload),
        headers:{
          "Content-Type": "application/json"
        }
     });
     const oderProducts =await response.json();
});

const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    addToCart: (state, action) => {
      state.items = [...state.items, action.payload];
    },
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

export const { addToCart, updateQuantity } = cartSlice.actions;
export default cartSlice.reducer;
