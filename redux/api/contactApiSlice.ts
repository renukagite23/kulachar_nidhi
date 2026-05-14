import { apiSlice } from './apiSlice';

export const contactApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getContacts: builder.query({
      query: () => '/admin/contacts',
      providesTags: ['Contact'],
    }),
    updateContact: builder.mutation({
      query: (data) => ({
        url: '/admin/contacts',
        method: 'PATCH',
        body: data,
      }),
      invalidatesTags: ['Contact'],
    }),
    deleteContact: builder.mutation({
      query: (id) => ({
        url: `/admin/contacts?id=${id}`,
        method: 'DELETE',
      }),
      invalidatesTags: ['Contact'],
    }),
  }),
});

export const {
  useGetContactsQuery,
  useUpdateContactMutation,
  useDeleteContactMutation,
} = contactApiSlice;
