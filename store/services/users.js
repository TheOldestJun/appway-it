import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const usersApi = createApi({
    reducerPath: "usersApi",
    baseQuery: fetchBaseQuery({ baseUrl: "/api/auth/users/" }),
    endpoints: (builder) => ({
        getAllUsers: builder.query({
            query: () => "getall",
        }),
        getUser: builder.query({
            query: (id) => `getone?id=${id}`,
        })
    }),
})

export const { useGetAllUsersQuery, useGetUserQuery } = usersApi