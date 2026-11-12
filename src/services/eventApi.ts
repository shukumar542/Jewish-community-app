import { createApi } from '@reduxjs/toolkit/query/react';
import { baseQuery } from './baseQuery';

export interface CreateEventRequest {
  category: string;
  eventTitle?: string;
  details: Record<string, any>;
}

export interface SubmittedByUser {
  picture?: string | null;
  fullName?: string;
  email?: string;
  _id?: string;
}

export interface EventData {
  _id: string;
  category: string;
  eventTitle?: string;
  status: 'pending' | 'Active' | 'approved' | 'rejected' | string;
  createdBy?: string | SubmittedByUser;
  submittedBy?: SubmittedByUser;
  details: Record<string, any>;
  isFavourite?: boolean;
  isFavorite?: boolean;
  favorited?: boolean;
  createdAt: string;
  updatedAt: string;
  __v?: number;
}

export interface CreateEventResponse {
  success: boolean;
  message: string;
  data: EventData;
}

export interface GetEventByIdResponse {
  success?: boolean;
  message?: string;
  data: EventData;
}

export type DateRange = 'today' | 'tomorrow' | 'this_week' | 'all';

export interface GetEventsParams {
  dateRange?: DateRange | string;
  category?: string;
  search?: string;
}

export interface GetEventsResponse {
  success?: boolean;
  message?: string;
  data: EventData[];
}

export interface ToggleFavouriteRequest {
  id: string;
  isFavourite?: boolean;
  method?: 'POST' | 'DELETE' | 'PATCH';
}

export interface ToggleFavouriteResponse {
  success?: boolean;
  message?: string;
  data?: any;
}

export interface GetFavoriteEventsParams {
  page?: number;
  limit?: number;
}

export interface GetFavoriteEventsResponse {
  success?: boolean;
  message?: string;
  data?: any;
  events?: any[];
  [key: string]: any;
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

    // Get All Events
    getEvents: builder.query<GetEventsResponse, GetEventsParams | void>({
      query: (params) => {
        const queryParams: Record<string, string> = {};
        if (params?.dateRange) {
          queryParams.dateRange = params.dateRange;
        }
        if (params?.category && params.category !== 'All') {
          queryParams.category = params.category;
        }
        if (params?.search) {
          queryParams.search = params.search;
        }
        return {
          url: '/events',
          method: 'GET',
          params: queryParams,
        };
      },
      providesTags: ['Events'],
    }),

    // Toggle Favourite / Unfavourite (POST to add, DELETE to remove)
    toggleFavourite: builder.mutation<ToggleFavouriteResponse, ToggleFavouriteRequest>({
      query: ({ id, isFavourite, method }) => {
        const httpMethod = method ?? (isFavourite === false ? 'DELETE' : 'POST');
        return {
          url: `/events/${id}/favorite`,
          method: httpMethod,
        };
      },
      invalidatesTags: ['Events'],
    }),

    // Add Favorite: POST /events/:id/favorite
    addFavorite: builder.mutation<ToggleFavouriteResponse, string>({
      query: (id) => ({
        url: `/events/${id}/favorite`,
        method: 'POST',
      }),
      invalidatesTags: ['Events'],
    }),

    // Remove Favorite: DELETE /events/:id/favorite
    removeFavorite: builder.mutation<ToggleFavouriteResponse, string>({
      query: (id) => ({
        url: `/events/${id}/favorite`,
        method: 'DELETE',
      }),
      invalidatesTags: ['Events'],
    }),

    // Search Events
    searchEvents: builder.query<GetEventsResponse, string | { searchQuery: string }>({
      query: (arg) => {
        const searchQuery = typeof arg === 'string' ? arg : arg.searchQuery;
        return {
          url: '/events/search',
          method: 'GET',
          params: { searchQuery },
        };
      },
      providesTags: ['Events'],
    }),

    // Get Single Event By Id
    getEventById: builder.query<GetEventByIdResponse, string>({
      query: (id) => ({
        url: `/events/${id}`,
        method: 'GET',
      }),
      providesTags: (result, error, id) => [{ type: 'Events', id }],
    }),

    // Get Favorite Events
    getFavoriteEvents: builder.query<GetFavoriteEventsResponse, GetFavoriteEventsParams | void>({
      query: (params) => {
        const page = params?.page ?? 1;
        const limit = params?.limit ?? 10;
        return {
          url: '/events/favorites',
          method: 'GET',
          params: { page, limit },
        };
      },
      providesTags: ['Events'],
    }),
  }),
});

export const {
  useCreateEventMutation,
  useGetEventsQuery,
  useGetEventByIdQuery,
  useSearchEventsQuery,
  useLazySearchEventsQuery,
  useToggleFavouriteMutation,
  useAddFavoriteMutation,
  useRemoveFavoriteMutation,
  useGetFavoriteEventsQuery,
} = eventApi;

