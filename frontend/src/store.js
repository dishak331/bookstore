import { configureStore } from '@reduxjs/toolkit';
import userSlice from './reducers/user-slice';
import productSlice from './reducers/product-slice';
import cartSlice from './reducers/cart-slice';
import addressSlice from './reducers/address-slice';
import orderSlice from './reducers/order-slice';

const store = configureStore({
  reducer: {
    user: userSlice.reducer,
    product: productSlice.reducer,
    cart: cartSlice.reducer,
    address: addressSlice.reducer,
    order: orderSlice.reducer
  }
});

export default store;
