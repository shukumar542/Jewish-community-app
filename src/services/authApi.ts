import { createApi } from '@reduxjs/toolkit/query/react';
import { baseQuery } from './baseQuery';
export interface RegisterRequest {
  fullName: string;
  email: string;
  password: string;
  confirmPassword: string;
}

export interface RegisterResponse {
  success?: boolean;
  message?: string;
  data?: unknown;
}


export interface VerifyOtpRequest {
  email: string;
  otp: string;
}

export interface AuthUser {
  id: string;
  email: string;
  fullName: string;
  role: string;
}


export interface VerifyOtpResponse {
  success: boolean;
  message: string;
  data: {
    accessToken: string;
    user: AuthUser;
  };
}

export interface LogoutResponse {
  success?: boolean;
  message?: string;
  data?: unknown;
}

export const authApi = createApi({
  reducerPath: 'authApi',
  baseQuery,
  endpoints: (builder) => ({
    register: builder.mutation<RegisterResponse, RegisterRequest>({
      query: (body) => ({
        url: '/auth/register',
        method: 'POST',
        body,
      }),
    }),

    verifyOtp: builder.mutation<VerifyOtpResponse, VerifyOtpRequest>({
      query: (body) => ({
        url: '/auth/verify-otp',
        method: 'POST',
        body,
      }),
    }),

    resendOtp: builder.mutation<VerifyOtpResponse, { email: string }>({
      query: (body) => ({
        url: '/auth/resend-otp',
        method: 'POST',
        body,
      }),
    }),

    // User Login 
    login: builder.mutation<VerifyOtpResponse, { email: string; password: string }>({
      query: (body) => ({
        url: '/auth/login',
        method: 'POST',
        body,
      }),
    }),

    // User Logout
    logout: builder.mutation<LogoutResponse, void>({
      query: () => ({
        url: '/auth/logout',
        method: 'POST',
      }),
    }),
  }),
});

export const { useRegisterMutation, useVerifyOtpMutation, useResendOtpMutation, useLoginMutation, useLogoutMutation } = authApi;