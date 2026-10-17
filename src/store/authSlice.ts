import type { AuthUser } from '@/services/authApi';
import { createSlice, PayloadAction } from '@reduxjs/toolkit';

export interface AuthState {
  token: string | null;
  user: AuthUser | null;
  isHydrated: boolean;
}

const initialState: AuthState = {
  token: null,
  user: null,
  isHydrated: false,
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
    },
    hydrate: (
      state,
      action: PayloadAction<{ token: string | null; user: AuthUser | null }>
    ) => {
      state.token = action.payload.token;
      state.user = action.payload.user;
      state.isHydrated = true;
    },
    logout: (state) => {
      state.token = null;
      state.user = null;
    },
  },
});

export const { setCredentials, hydrate, logout } = authSlice.actions;
export default authSlice.reducer;