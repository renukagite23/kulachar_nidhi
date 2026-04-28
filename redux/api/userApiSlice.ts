import { apiSlice } from './apiSlice';

export const userApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getProfile: builder.query({
      query: () => '/user/profile',
      providesTags: ['User'],
    }),
    getDonations: builder.query({
      query: () => '/user/donations',
      providesTags: ['Donation'],
    }),
    donate: builder.mutation({
      query: (data) => ({
        url: '/donate',
        method: 'POST',
        body: data,
      }),
      invalidatesTags: ['Donation', 'User', 'Stats'],
    }),
    getAdminStats: builder.query({
      query: () => '/admin/stats',
      providesTags: ['Stats'],
    }),
  }),
});

export const { 
  useGetProfileQuery, 
  useGetDonationsQuery, 
  useDonateMutation, 
  useGetAdminStatsQuery 
} = userApiSlice;
