import { createSlice } from '@reduxjs/toolkit';

const uInitial = {
  userId: -1,
  firstName: '',
  lastName: '',
  email: '',
  userName: '',
  password: ''
};

const userInfoFromStorage = localStorage.getItem('userInfo') ? localStorage.getItem('userInfo') : null;
const userDetails = localStorage.getItem('user') ? JSON.parse(localStorage.getItem('user')) : uInitial;
const admin = localStorage.getItem('admin') ? localStorage.getItem('admin') : null;

const userInitial = {
  userInfo: userInfoFromStorage,
  user: userDetails,
  userList: [],
  messageLogin: '',
  messageRegister: '',
  messageUpdate: '',
  updateSuccess: false,
  registerSuccess: false,
  isAdmin: admin
};

const userSlice = createSlice({
  name: 'user',
  initialState: userInitial,
  reducers: {
    logout(state) {
      localStorage.removeItem('userInfo');
      localStorage.removeItem('user');
      localStorage.removeItem('admin');
      localStorage.removeItem('cart');
      localStorage.removeItem('totalCart');
      state.user = uInitial;
      state.registerSuccess = false;
      state.userInfo = false;
      state.isAdmin = false;
      state.messageLogin = '';
      state.messageRegister = '';
    },

    updateUser(state, action) {
      const update = action.payload.user;
      const updatedDetails = {
        userId: update.user_id,
        userName: update.username,
        email: update.email,
        firstName: update.first_name,
        lastName: update.last_name,
        password: update.password
      };
      console.log(updatedDetails);
      state.messageUpdate = '';

      localStorage.setItem('user', JSON.stringify(updatedDetails));
      state.user = updatedDetails;
      state.updateSuccess = true;
      console.log(state.user);
    },
    setMessage(state, action) {
      state.messageRegister = action.payload.message;
      console.log(state.messageRegister);
    },
    setMessageLogin(state, action) {
      state.messageLogin = action.payload.message;
      console.log(state.messageLogin);
    },
    setMessageUpdate(state, action) {
      state.messageUpdate = action.payload.message;
      console.log(state.messageLogin);
    },
    loggedInError(state, action) {
      const message = action.payload.message;
      state.messageLogin = message;
    },
    adminCheckLogin(state, action) {
      localStorage.setItem('userInfo', true);
      localStorage.setItem('admin', true);
      state.user = {
        userId: -1,
        firstName: 'admin',
        lastName: '1',
        email: 'dk@gmail.com',
        userName: 'dk',
        password: '1234'
      };
      localStorage.setItem('user', JSON.stringify(state.user));
      state.userInfo = true;
      state.isAdmin = true;
    },
    loggedIn(state, action) {
      state.user = action.payload.user;
      state.messageLogin = '';
      state.messageRegister = '';
      state.messageLogin = '';
      localStorage.setItem('userInfo', true);
      console.log(state.user);
      localStorage.setItem('user', JSON.stringify(state.user));
      state.userInfo = true;
    },

    setSuccessFalse(state) {
      state.updateSuccess = false;
    }
  }
});

export const userActions = userSlice.actions;
export { userDetails };
export default userSlice;
