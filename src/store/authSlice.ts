import type { AuthUser } from '@/services/authApi';
import { createSlice, PayloadAction } from '@reduxjs/toolkit';

export interface AuthState {
  token: string | null;
  user: AuthUser | null;
  isHydrated: boolean;
  isGuest: boolean;
}

const initialState: AuthState = {
  token: null,
  user: null,
  isHydrated: false,
  isGuest: false,
};

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    setCredentials: (
      state,
      action: PayloadAction<{ token: string; user: AuthUser }>
    ) => {
      state.token = action.payload.token;
      state.user = action.payload.user;
      state.isGuest = false;
    },
    setGuest: (state, action: PayloadAction<boolean>) => {
      state.isGuest = action.payload;
    },
    hydrate: (
      state,
      action: PayloadAction<{ token: string | null; user: AuthUser | null }>
    ) => {
      state.token = action.payload.token;
      state.user = action.payload.user;
      state.isHydrated = true;
      state.isGuest = false;
    },
    logout: (state) => {
      state.token = null;
      state.user = null;
      state.isGuest = false;
    },
  },
});

export const { setCredentials, setGuest, hydrate, logout } = authSlice.actions;
export default authSlice.reducer;