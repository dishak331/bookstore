import { createSlice } from '@reduxjs/toolkit';
import { products } from '../DummyData';

const productInitial = {
  products: products,
  updateSuccess: false
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
    },
    updateProduct(state, action) {
      const newProd = action.payload;
      const prevProdDetails = state.products.find((u) => u.productId == newProd.productId);
      console.log(prevProdDetails);
      console.log(newProd);
      prevProdDetails.description = newProd.description;
      prevProdDetails.imageId = newProd.image;
      prevProdDetails.price = newProd.price;
      prevProdDetails.productName = newProd.productName;
      const filterList = state.products.filter((u) => u.productId != newProd.productId);
      filterList.push(prevProdDetails);
      state.products = filterList;
      state.updateSuccess = true;
    },
    addProduct(state, action) {
      const newProd = action.payload;
      const prod = {
        productId: state.products.length + 1,
        imageId: newProd.image,
        averageRating: 0,
        noOfRatings: 0,
        price: newProd.price,
        productName: newProd.productName,
        availableItemCount: 0,
        description: newProd.description,
        reviews: []
      };
      state.products.push(prod);
      state.updateSuccess = true;
    },
    updateSuccessFalse(state, action) {
      state.updateSuccess = false;
    }
  }
});

export const productAction = productSlice.actions;

export default productSlice;
