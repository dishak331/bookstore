import { createSlice } from '@reduxjs/toolkit';

// const userInfoFromStorage = localStorage.getItem('userInfo') ? localStorage.getItem('userInfo') : null;
const userDetails = localStorage.getItem('cart') ? JSON.parse(localStorage.getItem('cart')) : [];
const totalPrice = localStorage.getItem('totalCart') ? parseInt(localStorage.getItem('totalCart')) : 0;
// const admin = localStorage.getItem('admin') ? localStorage.getItem('admin') : null;

const cartInitial = {
  cartItems: userDetails,
  totalPrice: totalPrice
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
      localStorage.setItem('cart', JSON.stringify(state.cartItems));
      localStorage.setItem('totalCart', state.totalPrice);
    },
    removeFromCart(state, action) {
      const id = action.payload;
      const existing = state.cartItems.find((item) => item.productId == id);
      state.totalPrice = state.totalPrice - existing.extendedPrice;
      const removedCart = state.cartItems.filter((item) => item.productId != id);
      state.cartItems = removedCart;
      localStorage.setItem('cart', JSON.stringify(state.cartItems));
      localStorage.setItem('totalCart', state.totalPrice);
    },
    clearCart(state) {
      state.cartItems = [];
      state.totalPrice = 0;
      localStorage.removeItem('cart');
      localStorage.removeItem('totalCart');
    }
  }
});

export const cartActions = cartSlice.actions;
export default cartSlice;
