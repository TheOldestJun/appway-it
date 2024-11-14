import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const usersApi = createApi({
    reducerPath: "usersApi",
    baseQuery: fetchBaseQuery({ baseUrl: "/api/auth/" }),
    tagTypes: ["Users"],
    endpoints: (builder) => ({
        getAllUsers: builder.query({
            query: () => "users/getall",
            providesTags: ['Users'],
        }),
        createUser: builder.mutation({
            query: ({...data}) => ({
                url: "create",
                method: "POST",
                body: data,
            }),
            invalidatesTags: ['Users'],
        }),
        editUser: builder.mutation({
            query: ({ ...data }) => ({
                url: "edit",
                method: "PUT",
                body: data,
            }),
            invalidatesTags: ['Users'],
        }),
        deleteUser: builder.mutation({
            query: (id) => ({
                url: `delete?id=${id}`,
                method: "DELETE",
            }),
            invalidatesTags: ['Users'],
        })
    }),
})

export const { useGetAllUsersQuery, useCreateUserMutation, useEditUserMutation, useDeleteUserMutation } = usersApi