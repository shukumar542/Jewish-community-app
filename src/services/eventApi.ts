import { createApi } from '@reduxjs/toolkit/query/react';
import { baseQuery } from './baseQuery';

export interface CreateEventRequest {
  category: string;
  eventTitle?: string;
  details: Record<string, any>;
}

export interface EventData {
  _id: string;
  category: string;
  eventTitle?: string;
  status: 'pending' | 'approved' | 'rejected' | string;
  createdBy: string;
  details: Record<string, any>;
  createdAt: string;
  updatedAt: string;
  __v?: number;
}

export interface CreateEventResponse {
  success: boolean;
  message: string;
  data: EventData;
}

export const eventApi = createApi({
  reducerPath: 'eventApi',
  baseQuery,
  tagTypes: ['Events'],
  endpoints: (builder) => ({
    // Create Event
    createEvent: builder.mutation<CreateEventResponse, CreateEventRequest>({
      query: (body) => ({
        url: '/events',
        method: 'POST',
        body,
      }),
      invalidatesTags: ['Events'],
    }),
  }),
});

export const { useCreateEventMutation } = eventApi;

