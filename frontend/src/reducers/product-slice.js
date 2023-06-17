import { createSlice } from '@reduxjs/toolkit';
import { products } from '../DummyData';

const productInitial = {
  products: [],
  messageProduct: '',
  updateSuccess: false,
  getAllBooksLoading: true,
  messageProductDetail: '',
  updateProductMessage: '',
  addProductMessage: '',
  reviewMessage: '',
  productDetail: {}
};

const productSlice = createSlice({
  name: 'product',
  initialState: productInitial,
  reducers: {
    createReview(state, action) {
      const newReview = action.payload.newReview;
      const prod = state.productDetail;
      prod.reviews.push(newReview);
      // state.productDetail = prod;
      //   prod.noOfRatings++;
      prod.averageRating = Math.round((prod.noOfRatings * prod.averageRating + parseInt(newReview.rating)) / (prod.noOfRatings + 1));
      prod.noOfRatings = prod.reviews.length;
      state.productDetail = prod;

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
    },
    updateProductMessage(state, action) {
      state.messageProduct = action.payload.message;
    },
    updateProductDetailMessage(state, action) {
      state.messageProductDetail = action.payload.message;
    },
    getAllProduct(state, action) {
      state.products = action.payload.products;
    },
    setProductDetail(state, action) {
      state.productDetail = action.payload.productDetail;
    },
    setUpdateProductMessage(state, action) {
      state.updateProductMessage = action.payload.message;
    },
    setAddProductMessage(state, action) {
      state.addProductMessage = action.payload.message;
    },
    setReviewMessage(state, action) {
      state.reviewMessage = action.payload.message;
    },
    GET_ALL_BOOKS_LOADING_CHANGE(state, action) {
      state.getAllBooksLoading = action.payload.loading;
    }
  }
});

export const productAction = productSlice.actions;

export default productSlice;
