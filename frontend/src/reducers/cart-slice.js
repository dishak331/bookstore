import { createSlice } from '@reduxjs/toolkit';

const cartInitial = {
  cartItems: [],
  totalPrice: 0
};

const cartSlice = createSlice({
  name: 'cart',
  initialState: cartInitial,
  reducers: {
    addToCart(state, action) {
      const newItem = action.payload;
      const existing = state.cartItems.find((item) => item.productId == newItem.productId);
      if (!existing) {
        newItem.extendedPrice = newItem.itemPrice * newItem.quantity;
        state.cartItems.push(newItem);

        state.totalPrice += newItem.extendedPrice;
      } else {
        existing.quantity = newItem.quantity;
        state.totalPrice = state.totalPrice - existing.extendedPrice;
        existing.extendedPrice = newItem.quantity * newItem.itemPrice;
        state.totalPrice = state.totalPrice + existing.extendedPrice;
      }
    },
    removeFromCart(state, action) {
      const id = action.payload;
      const existing = state.cartItems.find((item) => item.productId == id);
      state.totalPrice = state.totalPrice - existing.extendedPrice;
      const removedCart = state.cartItems.filter((item) => item.productId != id);
      state.cartItems = removedCart;
    },
    clearCart(state) {
      state.cartItems = [];
    }
  }
});

export const cartActions = cartSlice.actions;
export default cartSlice;
