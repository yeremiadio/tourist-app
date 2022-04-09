import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { Tourist } from "../../model/Tourist";

export const touristApi = createApi({
    reducerPath: "touristApi",
    baseQuery: fetchBaseQuery({
        baseUrl: process.env.REACT_APP_BASE_URL + "/api/Tourist", prepareHeaders: (headers, { getState }) => {
            const token = localStorage.getItem('token')
            if (token) {
                headers.set('Authorization', `Bearer ${token}`)
            }

            return headers
        },
    }),
    endpoints: (builder) => ({
        createTourist: builder.mutation({
            query: (body: Tourist) => {
                return {
                    url: "/",
                    method: "post",
                    body,
                };
            },
        }),
        updateTourist: builder.mutation({
            query: (body: Tourist) => {
                return {
                    url: `/${body.id}`,
                    method: "put",
                    body,
                };
            },
        }),
        deleteTourist: builder.mutation({
            query: (body: Partial<Tourist>) => {
                return {
                    url: `/${body.id}`,
                    method: "delete",
                    body,
                };
            },
        }),
    }),
});

export const {
    useCreateTouristMutation,
    useUpdateTouristMutation,
    useDeleteTouristMutation,
} = touristApi;