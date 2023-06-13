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
  messageRegister: 'x',
  updateSuccess: false,
  isAdmin: admin
};

const userSlice = createSlice({
  name: 'user',
  initialState: userInitial,
  reducers: {
    login(state, action) {
      const loginDetails = action.payload;
      if (loginDetails.userName === 'dk@gmail.com' && loginDetails.password === '1234') {
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
        state.messageLogin = 'Incorrect username or password';
        return;
      }
      state.messageRegister = 'x';
      state.user = user;
      state.messageLogin = '';
      localStorage.setItem('userInfo', true);
      console.log(state.user);
      localStorage.setItem('user', JSON.stringify(state.user));
      state.userInfo = true;
    },
    logout(state) {
      localStorage.removeItem('userInfo');
      localStorage.removeItem('user');
      localStorage.removeItem('admin');
      state.user = uInitial;
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
      if (!user) {
        state.messageRegister = '';
        state.userList.push(details);
        // const login = {
        //   userName: registerDetails.email,
        //   password: registerDetails.password
        // };
        // userSlice.caseReducers.login(state, login);
        return;
      }
      state.messageRegister = 'Username or email address already exists.';
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
    setSuccessFalse(state) {
      state.updateSuccess = false;
    }
  }
});

export const userActions = userSlice.actions;
export { userDetails };
export default userSlice;
