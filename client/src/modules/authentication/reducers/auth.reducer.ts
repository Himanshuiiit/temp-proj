import { createSlice, PayloadAction } from '@reduxjs/toolkit';

import { AUTH_INITIAL_STATE } from '../constants';
import { type AuthState } from '../interfaces';

const authSlice = createSlice({
  reducerPath: 'auth',
  name: 'auth',
  initialState: AUTH_INITIAL_STATE,
  reducers: {
    login: (state: AuthState) => {
      if (localStorage.getItem('user') !== null) {
        state!.loggedIn = true;
      }
    },
    logout: (state: AuthState) => {
      state!.loggedIn = false;
      localStorage.removeItem('user');
    },
    setUser: (state: AuthState, action: PayloadAction<any>) => {
      localStorage.setItem('user', JSON.stringify(action.payload));
      state!.user = action.payload;
    }
  }
});

export const { login, logout, setUser } = authSlice.actions;
export default authSlice;
