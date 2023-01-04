import { createSlice } from '@reduxjs/toolkit';

const addressInitial = {
  addresses: []
};

const addressSlice = createSlice({
  name: 'address',
  initialState: addressInitial,
  reducers: {
    addAddress(state, action) {
      state.addresses.push(action.payload);
    },
    removeAddress(state, action) {
      const id = action.payload;
      const filter = state.addresses.filter((item) => item.addressId !== id);
      state.addresses = filter;
    }
  }
});

export const addressActions = addressSlice.actions;
export default addressSlice;
