import { headers } from '../constants/headers';
import { orderActions } from '../reducers/order-slice';
import { userActions } from '../reducers/user-slice';

const userURL = 'http://localhost:9001';

export const registerUserData = (data) => {
  return async (dispatch) => {
    try {
      const response = await fetch(`${userURL}/register`, {
        method: 'POST',
        headers: headers,
        body: JSON.stringify(data)
      });
      const body = await response.json();
      console.log(body);
      if (!response.ok) {
        dispatch(userActions.setMessage({ message: body.message }));
      } else {
        dispatch(userActions.setMessage({ message: '' }));
        const dataStore = {
          userId: body.user_id,
          userName: body.username,
          firstName: body.first_name,
          lastName: body.last_name,
          email: body.email,
          password: body.password
        };
        dispatch(userActions.loggedIn({ user: dataStore }));
      }
    } catch (error) {
      console.log('error occured');
      dispatch(userActions.setMessage({ message: 'Server error: Try again later' }));
    }
  };
};

export const loginUserData = (data) => {
  return async (dispatch) => {
    try {
      if (data.email === 'dk@gmail.com' && data.password === '1234') {
        dispatch(userActions.adminCheckLogin());
        return;
      }
      const response = await fetch(`${userURL}/login`, {
        method: 'POST',
        headers: headers,
        body: JSON.stringify(data)
      });
      const body = await response.json();
      console.log(body);
      if (!response.ok) {
        dispatch(userActions.setMessageLogin({ message: body.message }));
      } else {
        dispatch(userActions.setMessageLogin({ message: '' }));
        const dataStore = {
          userId: body.user_id,
          userName: body.username,
          firstName: body.first_name,
          lastName: body.last_name,
          email: body.email,
          password: body.password
        };
        dispatch(userActions.loggedIn({ user: dataStore }));
      }
    } catch (error) {
      console.log('error occured');
      dispatch(userActions.setMessageLogin({ message: 'Server error: Try again later' }));
    }
  };
};

export const updateUserData = (data) => {
  return async (dispatch) => {
    console.log(data);
    const response = await fetch(`${userURL}/users`, {
      method: 'PUT',
      headers: headers,
      body: JSON.stringify(data)
    });
    const body = await response.json();
    console.log(body);
    if (!response.ok) {
      dispatch(userActions.setMessageUpdate({ message: body.message }));
    } else {
      dispatch(userActions.setMessageUpdate({ message: '' }));
      dispatch(userActions.updateUser({ user: body }));
    }
  };
};

export const getUserDataById = (id) => {
  return async (dispatch) => {
    try {
      const response = await fetch(`${userURL}/users/${id}`, {
        method: 'GET',
        headers: headers
      });
      const body = await response.json();
      console.log(body);
      if (!response.ok) {
      } else {
        dispatch(
          orderActions.setUserData({
            userData: {
              userId: body.user_id,
              userName: body.username,
              firstName: body.first_name,
              lastName: body.last_name,
              email: body.email,
              password: body.password
            }
          })
        );
      }
    } catch (error) {
      console.log('error occured');
      return {};
    }
  };
};
