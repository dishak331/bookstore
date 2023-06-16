import { headers } from '../constants/headers';
import { productAction } from '../reducers/product-slice';

const productURL = 'http://localhost:9002';

export const getAllBooksData = () => {
  return async (dispatch) => {
    try {
      dispatch(productAction.GET_ALL_BOOKS_LOADING_CHANGE({ loading: true }));
      const response = await fetch(`${productURL}/books`, {
        method: 'GET',
        headers: headers
      });
      const body = await response.json();
      console.log(body);
      if (!response.ok) {
        // console.log(body);
        dispatch(productAction.updateProductMessage({ message: 'Some error occured' }));
      } else {
        dispatch(productAction.updateProductMessage({ message: '' }));
        let prod = [];
        body.map((product) => {
          prod.push({
            productId: product.book_id,
            imageId: product.image_url,
            averageRating: product.average_reviews,
            noOfRatings: product.total_reviews,
            price: product.price,
            productName: product.title,
            author: product.author,
            outOfStock: product.out_of_stock,
            description: product.description,
            reviews: product.reviews
          });
        });

        dispatch(productAction.getAllProduct({ products: prod }));
        dispatch(productAction.GET_ALL_BOOKS_LOADING_CHANGE({ loading: false }));
      }
    } catch (error) {
      console.log('error occured');
      dispatch(productAction.GET_ALL_BOOKS_LOADING_CHANGE({ loading: false }));
      dispatch(productAction.updateProductMessage({ message: 'Server error: Try again later' }));
    }
  };
};

export const getBookData = (id) => {
  return async (dispatch) => {
    try {
      // dispatch(productAction.GET_ALL_BOOKS_LOADING_CHANGE({ loading: true }));
      const response = await fetch(`${productURL}/books/${id}`, {
        method: 'GET',
        headers: headers
      });
      const body = await response.json();
      console.log(body);
      if (!response.ok) {
        // console.log(body);
        dispatch(productAction.updateProductDetailMessage({ message: 'Some error occured' }));
      } else {
        dispatch(productAction.updateProductDetailMessage({ message: '' }));
        const product = body;
        const prod = {
          productId: product.book_id,
          imageId: product.image_url,
          averageRating: product.average_reviews,
          noOfRatings: product.total_reviews,
          price: product.price,
          productName: product.title,
          author: product.author,
          outOfStock: product.out_of_stock,
          description: product.description,
          reviews: product.reviews
        };

        dispatch(productAction.setProductDetail({ productDetail: prod }));
        // dispatch(productAction.GET_ALL_BOOKS_LOADING_CHANGE({ loading: false }));
      }
    } catch (error) {
      console.log('error occured');
      //   dispatch(productAction.GET_ALL_BOOKS_LOADING_CHANGE({ loading: false }));
      dispatch(productAction.updateProductDetailMessage({ message: 'Server error: Try again later' }));
    }
  };
};

export const updateBookData = (data) => {
  return async (dispatch) => {
    try {
      // dispatch(productAction.GET_ALL_BOOKS_LOADING_CHANGE({ loading: true }));
      const response = await fetch(`${productURL}/books`, {
        method: 'PUT',
        headers: headers,
        body: JSON.stringify(data)
      });
      const body = await response.json();
      console.log(body);
      if (!response.ok) {
        // console.log(body);
        dispatch(productAction.setUpdateProductMessage({ message: 'Some error occured' }));
      } else {
        dispatch(productAction.setUpdateProductMessage({ message: '' }));
        const product = body;
        const prod = {
          productId: product.book_id,
          imageId: product.image_url,
          averageRating: product.average_reviews,
          noOfRatings: product.total_reviews,
          price: product.price,
          productName: product.title,
          author: product.author,
          outOfStock: product.out_of_stock,
          description: product.description,
          reviews: product.reviews
        };

        dispatch(productAction.setProductDetail({ productDetail: prod }));
        // dispatch(productAction.GET_ALL_BOOKS_LOADING_CHANGE({ loading: false }));
      }
    } catch (error) {
      console.log('error occured');
      //   dispatch(productAction.GET_ALL_BOOKS_LOADING_CHANGE({ loading: false }));
      dispatch(productAction.setUpdateProductMessage({ message: 'Server error: Try again later' }));
    }
  };
};

export const addBookData = (data) => {
  return async (dispatch) => {
    try {
      console.log(JSON.stringify(data));
      // dispatch(productAction.GET_ALL_BOOKS_LOADING_CHANGE({ loading: true }));
      const response = await fetch(`${productURL}/books`, {
        method: 'POST',
        headers: headers,
        body: JSON.stringify(data)
      });
      const body = await response.json();
      console.log(body);
      if (!response.ok) {
        // console.log(body);
        dispatch(productAction.setAddProductMessage({ message: 'Some error occured' }));
      } else {
        dispatch(productAction.setAddProductMessage({ message: '' }));
        const product = body;
        //   const prod = {
        //     productId: product.book_id,
        //     imageId: product.image_url,
        //     averageRating: product.average_reviews,
        //     noOfRatings: product.total_reviews,
        //     price: product.price,
        //     productName: product.title,
        //     author: product.author,
        //     outOfStock: product.out_of_stock,
        //     description: product.description,
        //     reviews: product.reviews
        //   };

        //   dispatch(productAction.setProductDetail({ productDetail: prod }));
        // dispatch(productAction.GET_ALL_BOOKS_LOADING_CHANGE({ loading: false }));
      }
    } catch (error) {
      console.log('error occured');
      //   dispatch(productAction.GET_ALL_BOOKS_LOADING_CHANGE({ loading: false }));
      dispatch(productAction.setAddProductMessage({ message: 'Server error: Try again later' }));
    }
  };
};
