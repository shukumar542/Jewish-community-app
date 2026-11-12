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

export interface ForgotPasswordRequest {
  email: string;
}

export interface ForgotPasswordResponse {
  success?: boolean;
  message?: string;
  data?: any;
  token?: string;
}

export interface VerifyForgotPasswordOtpRequest {
  token: string;
  otp: string;
}

export interface VerifyForgotPasswordOtpResponse {
  success?: boolean;
  message?: string;
  data?: any;
  resetPasswordToken?: string;
  token?: string;
}

export interface ResendForgotPasswordOtpRequest {
  token: string;
}

export interface ResendForgotPasswordOtpResponse {
  success?: boolean;
  message?: string;
  data?: any;
  token?: string;
}

export interface ResetPasswordRequest {
  resetPasswordToken: string;
  newPassword: string;
  confirmNewPassword: string;
}

export interface ResetPasswordResponse {
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

    // Forgot Password - Send OTP
    forgotPassword: builder.mutation<ForgotPasswordResponse, ForgotPasswordRequest>({
      query: (body) => ({
        url: '/auth/forgot-password',
        method: 'POST',
        body,
      }),
    }),

    // Verify Forgot Password OTP
    verifyForgotPasswordOtp: builder.mutation<
      VerifyForgotPasswordOtpResponse,
      VerifyForgotPasswordOtpRequest
    >({
      query: (body) => ({
        url: '/auth/verify-forgot-password-otp',
        method: 'POST',
        body,
      }),
    }),

    // Resend Forgot Password OTP
    resendForgotPasswordOtp: builder.mutation<
      ResendForgotPasswordOtpResponse,
      ResendForgotPasswordOtpRequest
    >({
      query: (body) => ({
        url: '/auth/resend-forgot-password-otp',
        method: 'POST',
        body,
      }),
    }),

    // Reset Password
    resetPassword: builder.mutation<ResetPasswordResponse, ResetPasswordRequest>({
      query: (body) => ({
        url: '/auth/reset-password',
        method: 'POST',
        body,
      }),
    }),
  }),
});

export const {
  useRegisterMutation,
  useVerifyOtpMutation,
  useResendOtpMutation,
  useLoginMutation,
  useLogoutMutation,
  useForgotPasswordMutation,
  useVerifyForgotPasswordOtpMutation,
  useResendForgotPasswordOtpMutation,
  useResetPasswordMutation,
} = authApi;