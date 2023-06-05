import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

export const apiSlice = createApi({
  reducerPath: 'api',
  baseQuery: fetchBaseQuery({
    baseUrl: 'http://localhost:3001/api',
    prepareHeaders: (headers) => {
      const currentUserJSON = localStorage.getItem('currentUserAndToken');
      if (currentUserJSON) {
        const userAndToken = JSON.parse(currentUserJSON);
        headers.set('Authorization', `Bearer ${userAndToken.token}`);
      }
      return headers;
    },
  }),
  tagTypes: ['Blog'],
  endpoints: (builder) => ({
    getBlogs: builder.query({
      query: () => ({ url: '/blogs' }),
      providesTags: (result = []) => [
        { type: 'Blog', id: 'LIST' },
        ...result.map(({ id }) => ({ type: 'Blog', id })),
      ],
    }),
    addNewBlog: builder.mutation({
      query: (blogData) => ({
        url: '/blogs',
        method: 'POST',
        body: blogData,
      }),
      invalidatesTags: [{ type: 'Blog', id: 'LIST' }],
    }),
  }),
});

export const { useGetBlogsQuery, useAddNewBlogMutation } = apiSlice;
