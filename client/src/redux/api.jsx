import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const authApi = createApi({
  reducerPath: "authApi",
  baseQuery: fetchBaseQuery({ baseUrl: "http://localhost:5000" }),
  endpoints: (builder) => ({
    LoginUser: builder.mutation({
      query: (body) => {
        return {
          url: "api/v1/auth/login",
          method: "post",
          body,
        };
      },
    }),

    RegisterUser: builder.mutation({
      query: (body) => {
        return {
          url: "api/v1/auth/register",
          method: "post",
          body,
        };
      },
    }),
  }),
});

export const { useLoginUserMutation, useRegisterUserMutation } = authApi;
