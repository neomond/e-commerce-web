import { createAction } from "@reduxjs/toolkit";

export const addToCart = createAction("cart/addToCart");
export const removeFromCart = createAction("cart/removeFromCart");
export const incrementQuantity = createAction("cart/incrementQuantity");
export const decrementQuantity = createAction("cart/decrementQuantity");
