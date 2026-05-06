import { apiSlice } from './apiSlice';

export const collectorApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getCollectors: builder.query({
      query: (params) => ({
        url: '/admin/collectors',
        params,
      }),
      providesTags: ['Collector'],
    }),
    getCollector: builder.query({
      query: (id) => `/admin/collectors/${id}`,
      providesTags: (result, error, id) => [{ type: 'Collector', id }],
    }),
    createCollector: builder.mutation({
      query: (data) => ({
        url: '/admin/collectors',
        method: 'POST',
        body: data,
      }),
      invalidatesTags: ['Collector'],
    }),
    updateCollector: builder.mutation({
      query: ({ id, ...data }) => ({
        url: `/admin/collectors/${id}`,
        method: 'PUT',
        body: data,
      }),
      invalidatesTags: (result, error, { id }) => ['Collector', { type: 'Collector', id }],
    }),
    deleteCollector: builder.mutation({
      query: (id) => ({
        url: `/admin/collectors/${id}`,
        method: 'DELETE',
      }),
      invalidatesTags: ['Collector'],
    }),
  }),
});

export const {
  useGetCollectorsQuery,
  useGetCollectorQuery,
  useCreateCollectorMutation,
  useUpdateCollectorMutation,
  useDeleteCollectorMutation,
} = collectorApiSlice;
