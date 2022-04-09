import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const authApi = createApi({
    reducerPath: "authApi",
    baseQuery: fetchBaseQuery({ baseUrl: process.env.REACT_APP_BASE_URL + "/api" }),
    endpoints: (builder) => ({
        signinUser: builder.mutation({
            query: (body: { email: string; password: string }) => {
                return {
                    url: "/authaccount/login",
                    method: "post",
                    body,
                };
            },
        }),
        signupUser: builder.mutation({
            query: (body: { name: string; email: string; password: string }) => {
                return {
                    url: "/authaccount/registration",
                    method: "post",
                    body,
                };
            },
        }),
    }),
});

export const {
    useSigninUserMutation,
    useSignupUserMutation,
} = authApi;