import { AuthState } from "@/store/authSlice";
import { createApi } from "@reduxjs/toolkit/query/react";
import { BASE_URL, baseQuery } from "./baseQuery";

export interface Profile {
    picture: string | null;
    fullName: string;
    phoneNumber: string | null;
    address: string | null;
}

export interface ProfileResponse {
    success: boolean;
    message: string;
    data: Profile
}

export interface AboutUs {
    _id: string,
    type: string,
    content: string,
    createdAt: string,
    updatedAt: string,

}

export interface AboutUsResponse {
    success: boolean;
    message: string;
    data: AboutUs;
}

export interface WebsiteContent {
    _id: string;
    type: string;
    content: string;
    createdAt: string;
    updatedAt: string;
    __v?: number;
}

export interface WebsiteContentResponse {
    success: boolean;
    message: string;
    data: WebsiteContent;
}

export interface ChangePasswordRequest {
    oldPassword: string;
    newPassword: string;
    confirmNewPassword: string;
    method?: 'POST' | 'PATCH';
}

export interface ChangePasswordResponse {
    success?: boolean;
    message?: string;
    data?: any;
}

export const settingsApi = createApi({
    reducerPath: 'settingsApi',
    baseQuery,
    tagTypes: ['Profile'],
    endpoints: (builder) => ({
        getProfile: builder.query<ProfileResponse, void>({
            query: () => ({
                url: '/user/profileForUpdate',
                method: 'GET',
            }),
            providesTags: ['Profile'],
        }),
        updateProfile: builder.mutation<ProfileResponse, FormData>({
            async queryFn(formData, api) {
                try {
                    const state = api.getState() as { auth: AuthState };
                    const token = state.auth?.token;

                    const result = await new Promise<ProfileResponse>((resolve, reject) => {
                        const xhr = new XMLHttpRequest();
                        xhr.open('PATCH', `${BASE_URL}/user/profile`);

                        if (token) {
                            xhr.setRequestHeader('authorization', `Bearer ${token}`);
                        }
                        xhr.setRequestHeader('Accept', 'application/json');

                        xhr.onload = () => {
                            let responseData: any = null;
                            try {
                                responseData = JSON.parse(xhr.responseText);
                            } catch {
                                responseData = { message: xhr.responseText };
                            }

                            if (xhr.status >= 200 && xhr.status < 300) {
                                resolve(responseData);
                            } else {
                                reject({
                                    status: xhr.status,
                                    data: responseData || { message: 'Failed to update profile' },
                                });
                            }
                        };

                        xhr.onerror = () => {
                            reject({
                                status: 'FETCH_ERROR',
                                error: 'Network request failed',
                            });
                        };

                        xhr.ontimeout = () => {
                            reject({
                                status: 'TIMEOUT_ERROR',
                                error: 'Request timed out',
                            });
                        };

                        xhr.send(formData);
                    });

                    return { data: result };
                } catch (err: any) {
                    return {
                        error: err?.status
                            ? err
                            : {
                                status: 'FETCH_ERROR',
                                error: err?.message || 'Network request failed',
                            },
                    };
                }
            },
            invalidatesTags: ['Profile'],
        }),
        getAboutUs: builder.query<AboutUsResponse, void>({
            query: () => ({
                url: '/website-content/about-us',
                method: 'GET',
            })
        }),
        getTermsAndConditions: builder.query<WebsiteContentResponse, void>({
            query: () => ({
                url: '/website-content/terms-and-conditions',
                method: 'GET',
            }),
        }),
        getPrivacyPolicy: builder.query<WebsiteContentResponse, void>({
            query: () => ({
                url: '/website-content/privacy-policy',
                method: 'GET',
            }),
        }),
        changePassword: builder.mutation<ChangePasswordResponse, ChangePasswordRequest>({
            query: ({ method = 'PATCH', ...body }) => ({
                url: '/user/change-password',
                method,
                body,
            }),
        }),
    }),
});

export const {
    useGetProfileQuery,
    useUpdateProfileMutation,
    useGetAboutUsQuery,
    useGetTermsAndConditionsQuery,
    useGetPrivacyPolicyQuery,
    useChangePasswordMutation,
} = settingsApi;