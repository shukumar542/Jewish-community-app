import { AuthState } from '@/store/authSlice';
import { fetchBaseQuery } from '@reduxjs/toolkit/query/react';

export const BASE_URL =
  process.env.EXPO_PUBLIC_API_URL ?? 'http://10.10.28.71:8000';

export const baseQuery = fetchBaseQuery({
  baseUrl: BASE_URL,
   prepareHeaders: (headers, { getState }) => {
    const token = (getState() as { auth: AuthState }).auth.token;
    if (token) headers.set('authorization', `Bearer ${token}`);
    return headers;
  },
});