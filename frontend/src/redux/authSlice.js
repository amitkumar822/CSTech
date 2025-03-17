import { createSlice } from "@reduxjs/toolkit";

// Load user data from sessionStorage (if available)
const storedUser = JSON.parse(sessionStorage.getItem("authUser")) || null;

const initialState = {
  user: storedUser,
  isAuthenticated: !!storedUser, // If user exists, set to true
  role: storedUser?.role || "agent",
};

const authSlice = createSlice({
  name: "authSlice",
  initialState,
  reducers: {
    userLoggedIn: (state, action) => {
      state.user = action.payload.user;
      state.role = action.payload.user?.role;
      state.isAuthenticated = true;

      // Save user to sessionStorage
      sessionStorage.setItem("authUser", JSON.stringify(action.payload.user));
    },
    userLoggedOut: (state) => {
      state.user = null;
      state.role = null;
      state.isAuthenticated = false;

      // Remove user from sessionStorage
      sessionStorage.removeItem("authUser");
    },
  },
});

export const { userLoggedIn, userLoggedOut } = authSlice.actions;
export default authSlice.reducer;



// import { createSlice } from "@reduxjs/toolkit";

// const initialState = {
//   user: null,
//   isAuthenticated: false,
//   role: "agent",
// };

// const authSlice = createSlice({
//   name: "authSlice",
//   initialState,
//   reducers: {
//     userLoggedIn: (state, action) => {
//       state.user = action.payload.user;
//       state.role = action.payload.user?.role;
//       state.isAuthenticated = true;
//     },
//     userLoggedOut: (state) => {
//       state.user = null;
//       state.role = null;
//       state.isAuthenticated = false;
//     },
//   },
// });

// export const { userLoggedIn, userLoggedOut } = authSlice.actions;
// export default authSlice.reducer;

