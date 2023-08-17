import { createReducer } from "@reduxjs/toolkit";
import {
  addToCart,
  removeFromCart,
  incrementQuantity,
  decrementQuantity,
} from "./actions";

const initialState = {
  items: [],
};

const cartReducer = createReducer(initialState, (builder) => {
  builder
    .addCase(addToCart, (state, action) => {
      const product = action.payload;
      const existingItem = state.items.find((item) => item.id === product.id);

      if (existingItem) {
        existingItem.quantity += 1;
      } else {
        state.items.push({ ...product, quantity: 1 });
      }
    })
    .addCase(removeFromCart, (state, action) => {
      const productId = action.payload;
      state.items = state.items.filter((item) => item.id !== productId);
    })
    .addCase(incrementQuantity, (state, action) => {
      const itemId = action.payload;
      const itemToIncrement = state.items.find((item) => item.id === itemId);
      if (itemToIncrement) {
        itemToIncrement.quantity += 1;
      }
    })
    .addCase(decrementQuantity, (state, action) => {
      const itemId = action.payload;
      const itemToDecrement = state.items.find((item) => item.id === itemId);

      if (itemToDecrement) {
        if (itemToDecrement.quantity > 1) {
          itemToDecrement.quantity -= 1;
        } else {
          // Remove the item from the cart when quantity is zero or negative
          state.items = state.items.filter((item) => item.id !== itemId);
        }
      }
    });
});

export default cartReducer;
