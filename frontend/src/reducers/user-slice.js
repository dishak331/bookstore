import { createSlice } from '@reduxjs/toolkit';

const uInitial = {
  firstName: '',
  lastName: '',
  email: '',
  userName: '',
  password: ''
};

const userInfoFromStorage = localStorage.getItem('userInfo') ? localStorage.getItem('userInfo') : null;
const userDetails = localStorage.getItem('user') ? JSON.parse(localStorage.getItem('user')) : uInitial;
const admin = localStorage.getItem('admin') ? localStorage.getItem('admin') : null;
// const userInfoFromStorage = null;
// const userDetails = uInitial;
const userInitial = {
  userInfo: userInfoFromStorage,
  user: userDetails,
  userList: [],
  messageLogin: '',
  messageRegister: '',
  updateSuccess: false,
  registerSuccess: false,
  isAdmin: admin
};

const userSlice = createSlice({
  name: 'user',
  initialState: userInitial,
  reducers: {
    login(state, action) {
      const loginDetails = action.payload;

      if (!loginDetails.register && loginDetails.userName === 'dk@gmail.com' && loginDetails.password === '1234') {
        localStorage.setItem('userInfo', true);
        localStorage.setItem('admin', true);
        state.user = {
          firstName: 'admin',
          lastName: '1',
          email: 'dk@gmail.com',
          userName: 'dk',
          password: '1234'
        };
        localStorage.setItem('user', JSON.stringify(state.user));
        state.userInfo = true;
        state.isAdmin = true;
        return;
      }
      console.log(loginDetails);
      const user = state.userList.find((u) => u.email === loginDetails.userName && u.password === loginDetails.password);
      if (!user) {
        if (!loginDetails.register) {
          state.messageLogin = 'Incorrect username or password';
        }
        return;
      }

      if (user && loginDetails.register && state.messageRegister.length > 0) {
        return;
      }

      state.user = user;
      state.messageLogin = '';
      // if(state.messageRegister.length===0)
      localStorage.setItem('userInfo', true);
      console.log(state.user);
      localStorage.setItem('user', JSON.stringify(state.user));
      state.userInfo = true;
      state.messageRegister = '';
    },
    logout(state) {
      localStorage.removeItem('userInfo');
      localStorage.removeItem('user');
      localStorage.removeItem('admin');
      state.user = uInitial;
      state.registerSuccess = false;
      state.userInfo = false;
      state.isAdmin = false;
    },
    register(state, action) {
      const registerDetails = action.payload;
      const details = {
        email: registerDetails.email,
        userName: registerDetails.userName,
        firstName: registerDetails.firstName,
        password: registerDetails.password,
        lastName: ''
      };

      const user = state.userList.find((u) => u.userName === registerDetails.userName || u.email === registerDetails.email);
      console.log(user);
      if (!user) {
        state.messageRegister = '';
        state.userList.push(details);
        // const login = {
        //   userName: registerDetails.email,
        //   password: registerDetails.password
        // };
        state.registerSuccess = true;
        // login(state, login);
        return;
      }
      state.registerSuccess = false;
      state.messageRegister = 'Username or email address already exists.';
      console.log(state.messageRegister);
    },
    updateDetails(state, action) {
      const update = action.payload;
      const userPresent = state.userList.find((u) => u.userName == state.user.userName);
      let user = {};
      if (!userPresent) {
        // userList.push(state.user);
        user = state.user;
      } else {
        user = userPresent;
      }
      user.email = update.email;
      user.firstName = update.firstName;
      user.lastName = update.lastName;
      user.password = update.password;
      state.user = user;
      console.log(userPresent);
      console.log(user);
      if (!userPresent) {
        state.userList.push(user);
      } else {
        const filterList = state.userList.filter((u) => u.userName != state.user.userName);
        filterList.push(user);
        state.userList = filterList;
      }

      localStorage.setItem('user', JSON.stringify(state.user));
      state.updateSuccess = true;
    },
    setMessage(state, action) {
      state.messageRegister = action.payload.message;
      console.log(state.messageRegister);
    },
    loggedInError(state, action) {
      const message = action.payload.message;
      state.messageLogin = message;
    },
    loggedIn(state, action) {
      state.user = action.payload.user;
      if (state.user.userName === 'dk@gmail.com' && state.user.password === '1234') {
        localStorage.setItem('userInfo', true);
        localStorage.setItem('admin', true);
      }

      state.messageRegister = 'x';
      state.user = user;
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
