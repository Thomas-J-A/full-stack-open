import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

export const apiSlice = createApi({
  reducerPath: 'api',
  baseQuery: fetchBaseQuery({
    baseUrl: 'http://localhost:3001',
  }),
  tagTypes: ['Anecdote'],
  endpoints: (builder) => ({
    getAnecdotes: builder.query({
      query: () => ({ url: '/anecdotes' }),
      providesTags: (result = []) => [
        { type: 'Anecdote', id: 'LIST' },
        ...result.map(({ id }) => ({ type: 'Anecdote', id })),
      ],
    }),
    getAnecdote: builder.query({
      query: (anecdoteId) => ({
        url: `/anecdotes/${anecdoteId}`,
      }),
      providesTags: (result, error, arg) => [{ type: 'Anecdote', id: arg }],
    }),
    addNewAnecdote: builder.mutation({
      query: (anecdoteData) => ({
        url: '/anecdotes',
        method: 'POST',
        body: anecdoteData,
      }),
      invalidatesTags: [{ type: 'Anecdote', id: 'LIST' }],
    }),
    voteAnecdote: builder.mutation({
      query: ({ anecdoteId, ...patchData }) => ({
        url: `/anecdotes/${anecdoteId}`,
        method: 'PATCH',
        body: patchData,
      }),
      // Optimistically update single details, refetch entire collection
      // invalidatesTags: () => [{ type: 'Anecdote', id: 'LIST' }],
      async onQueryStarted({ anecdoteId, ...patchData }, { dispatch, queryFulfilled }) {
        const patchResult = dispatch(
          apiSlice.util.updateQueryData('getAnecdote', anecdoteId, (draft) => {
            draft.votes += 1;
          }),
        );

        try {
          await queryFulfilled;
        } catch (err) {
          patchResult.undo();
        }
      },
    }),
    removeAnecdote: builder.mutation({
      query: (anecdoteId) => ({
        url: `/anecdotes/${anecdoteId}`,
        method: 'DELETE',
      }),
      invalidatesTags: (result, error, arg) => [{ type: 'Anecdote', id: arg }],
    }),
  }),
});

export const {
  useGetAnecdotesQuery,
  useGetAnecdoteQuery,
  useAddNewAnecdoteMutation,
  useVoteAnecdoteMutation,
  useRemoveAnecdoteMutation,
} = apiSlice;
