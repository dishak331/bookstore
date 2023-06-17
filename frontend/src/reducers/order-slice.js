import { createSlice } from '@reduxjs/toolkit';

const orderInitial = {
  orders: [],
  cartMessage: '',
  orderMessage: '',
  orderDetails: {},
  orderLoading: true,
  userData: {}
};

const orderSlice = createSlice({
  name: 'order',
  initialState: orderInitial,
  reducers: {
    setCartMessage(state, action) {
      state.cartMessage = action.payload.message;
    },
    setOrderMessage(state, action) {
      state.orderMessage = action.payload.message;
    },
    addOrderDetail(state, action) {
      state.orderDetails = action.payload.details;
    },
    addOrders(state, action) {
      state.orders = action.payload.orders;
    },
    setLoading(state, action) {
      state.orderLoading = action.payload.loading;
    },
    setUserData(state, action) {
      state.userData = action.payload.userData;
    }
  }
});

export const orderActions = orderSlice.actions;
export default orderSlice;
