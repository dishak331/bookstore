import { createSlice } from '@reduxjs/toolkit';

const orderInitial = {
  orders: []
};

const orderSlice = createSlice({
  name: 'order',
  initialState: orderInitial,
  reducers: {
    addOrder(state, action) {
      state.orders.push(action.payload);
    }
  }
});

export const orderActions = orderSlice.actions;
export default orderSlice;
