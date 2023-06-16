import { headers } from '../constants/headers';
import { productAction } from '../reducers/product-slice';

const reviewURL = 'http://localhost:9003';

export const createReviewData = (data) => {
  return async (dispatch) => {
    try {
      console.log(JSON.stringify(data));

      const response = await fetch(`${reviewURL}/reviews`, {
        method: 'POST',
        headers: headers,
        body: JSON.stringify(data)
      });
      const body = await response.json();
      console.log(body);
      if (!response.ok) {
        dispatch(productAction.setReviewMessage({ message: 'Some error occured' }));
      } else {
        dispatch(productAction.setReviewMessage({ message: '' }));
      }
    } catch (error) {
      console.log('error occured');

      dispatch(productAction.setReviewMessage({ message: 'Server error: Try again later' }));
    }
  };
};
