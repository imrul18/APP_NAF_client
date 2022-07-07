import {createSlice} from '@reduxjs/toolkit';

const authSlice = createSlice({
  name: 'auth',

  initialState: {
    user: null,
  },

  reducers: {
    loadUser: (state, action) => {
      state.user = action.payload;
    },
    loadUserFromLocal: (state, action) => {
      state.user = action.payload;
    },
  },
});

export const {loadUser, loadUserFromLocal} = authSlice.actions;

export default authSlice.reducer;
