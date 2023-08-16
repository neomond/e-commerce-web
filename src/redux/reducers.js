import { createReducer } from "@reduxjs/toolkit";
import { addToCart, removeFromCart } from "./actions";

const initialState = {
  items: [],
};

const cartReducer = createReducer(initialState, (builder) => {
  builder
    .addCase(addToCart, (state, action) => {
      const newItem = action.payload;
      state.items.push(newItem);
    })
    .addCase(removeFromCart, (state, action) => {
      const itemId = action.payload;
      state.items = state.items.filter((item) => item.id !== itemId);
    });
});

export default cartReducer;
