import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

// Define a service using a base URL and expected endpoints
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

// Export hooks for usage in functional components, which are
// auto-generated based on the defined endpoints
export const {
    useSigninUserMutation,
    useSignupUserMutation,
} = authApi;