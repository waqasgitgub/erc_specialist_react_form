// import { createSlice } from "@reduxjs/toolkit";

// const initialState = {
// //   userInfo: null,
//   isAuthenticated: null,
//   token: localStorage.getItem("token"),
// };

// export const userSlice = createSlice({
//   name: "user",
//   initialState,
//   reducers: {
  
//     createUser: (state, action) => {
//       state.pending = false;
//       state.isAuthenticated = true;
//     //   state.userInfo = action.payload.user;
//       state.token = action.payload.user.token;
//       localStorage.setItem("token", action.payload.user.token);
//     },
//     loginFailure: (state) => {
//       state.pending = false;
//       state.isAuthenticated = false;
//       localStorage.removeItem("token");
//     },
 
   
//     logout: (state) => {
//       state.isAuthenticated = false;
//     //   state.userInfo = null;
//       state.token = null;
//       localStorage.removeItem("token");
//     }
//   },
// });

// export const {
//   createUser,
//   loginFailure,
//   logout
  
// } = userSlice.actions;
// export default userSlice.reducer;


import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  token: null,

};

export const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
  
    setToken: (state, action) => {
      state.token = action.payload;
      localStorage.setItem('token', action.payload);
    },
    removeToken: (state) => {
     
      state.token = null;
      localStorage.removeItem('token');
    },
  },
});

export const {
  setToken,
  removeToken
  
} = userSlice.actions;
export default userSlice.reducer;
