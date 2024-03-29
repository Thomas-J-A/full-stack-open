import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

export const apiSlice = createApi({
  reducerPath: 'api',
  baseQuery: fetchBaseQuery({
    baseUrl: 'http://localhost:3001/api',
    prepareHeaders: (headers, { getState }) => {
      const { token } = getState().auth;
      if (token) {
        headers.set('Authorization', `Bearer ${token}`);
      }
      return headers;
    },
  }),
  tagTypes: ['Blog', 'User'],
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
      invalidatesTags: [
        { type: 'Blog', id: 'LIST' },
        { type: 'User', id: 'LIST' },
      ],
    }),
    likeBlog: builder.mutation({
      query: (blogId) => ({
        url: `/blogs/${blogId}`,
        method: 'PUT',
      }),
      invalidatesTags: [{ type: 'Blog', id: 'LIST' }],
    }),
    removeBlog: builder.mutation({
      query: (blogId) => ({
        url: `/blogs/${blogId}`,
        method: 'DELETE',
      }),
      invalidatesTags: (result, error, arg) => [
        { type: 'Blog', id: arg },
        { type: 'User', id: 'LIST' },
      ],
    }),
    logIn: builder.mutation({
      query: (credentials) => ({
        url: '/login',
        method: 'POST',
        body: credentials,
      }),
    }),
    getUsers: builder.query({
      query: () => ({ url: '/users' }),
      providesTags: (result = []) => [
        { type: 'User', id: 'LIST' },
        ...result.map(({ id }) => ({ type: 'User', id })),
      ],
    }),
    addComment: builder.mutation({
      query: ({ blogId, commentData }) => ({
        url: `/blogs/${blogId}/comments`,
        method: 'POST',
        body: commentData,
      }),
      invalidatesTags: (result, error, arg) => [
        { type: 'Blog', id: arg.blogId },
      ],
    }),
  }),
});

export const {
  useGetBlogsQuery,
  useAddNewBlogMutation,
  useLikeBlogMutation,
  useRemoveBlogMutation,
  useLogInMutation,
  useGetUsersQuery,
  useAddCommentMutation,
} = apiSlice;
