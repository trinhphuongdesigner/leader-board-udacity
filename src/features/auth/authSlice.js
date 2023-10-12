import { toast } from 'react-toastify';
import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  userInfo: {},
};

export const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    login: (state, action) => {
      state.userInfo = action.payload;
      toast.success('Login successful');
    },

    logout: (state) => {
      state.userInfo = {};
    },
  },
});

export const { login, logout } = authSlice.actions;

export const authReducer = authSlice.reducer;
