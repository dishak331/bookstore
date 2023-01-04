import { useSelector } from 'react-redux';
import { userActions } from '../reducers/user-slice';

const message = useSelector((state) => state.user.messageRegister);

export const register = (details) => (dispatch) => {
  dispatch(userActions.register(details));
  const login = {
    userName: details.email,
    password: details.password
  };
  if (message === '') {
    dispatch;
  }
};
