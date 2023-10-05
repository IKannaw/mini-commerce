import CartSlice from "@/types/cart";
import {createSlice } from "@reduxjs/toolkit";

const initialState:CartSlice = {
   items: [],
   isLoaing:false,
   error:null
}

const cartSlice = createSlice(
    {
        name:"product",
        initialState,
        reducers:{
          addToCart:(state,action)=>{
              state.items = [...state.items, action.payload];
          }
        }
    }
)

export const {addToCart} = cartSlice.actions;
export default cartSlice.reducer;