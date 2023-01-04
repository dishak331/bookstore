import { createSlice } from '@reduxjs/toolkit';
import { products } from '../DummyData';

const productInitial = {
  products: products
};

const productSlice = createSlice({
  name: 'product',
  initialState: productInitial,
  reducers: {
    createReview(state, action) {
      const id = action.payload.id;
      const newReview = action.payload.newReview;
      const prod = state.products.find((prod) => prod.productId == id);
      prod.reviews.push(newReview);
      //   prod.noOfRatings++;
      prod.averageRating = (prod.noOfRatings * prod.averageRating + parseInt(newReview.ratingValue)) / (prod.noOfRatings + 1);
      prod.noOfRatings = prod.reviews.length;

      console.log(prod.averageRating);
    }
  }
});

export const productAction = productSlice.actions;

export default productSlice;
