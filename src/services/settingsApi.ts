import { createApi } from "@reduxjs/toolkit/query/react";
import { baseQuery } from "./baseQuery";

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
            query: (formData) => ({
                url: '/user/profile',
                method: 'PATCH',
                body: formData,
            }),
            invalidatesTags: ['Profile'],
        }),
        getAboutUs: builder.query<AboutUsResponse, void>({
            query: () => ({
                url: '/website-content/about-us',
                method: 'GET',
            })
        })
    }),
});

export const { useGetProfileQuery, useUpdateProfileMutation , useGetAboutUsQuery } = settingsApi;