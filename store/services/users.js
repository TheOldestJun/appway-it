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
/*             onQueryStarted: async ({...data},{ dispatch, queryFulfilled }) => {
                const patchResult = dispatch(
                    usersApi.util.updateQueryData(
                        'getAllUsers', {...data}, 
                        (draft) => {
                            Object.assign(draft, data)
                        }
                    )
                );
                dispatch(usersApi.util.invalidateTags(['Users']))
            }, */
        }),
        editUser: builder.mutation({
            query: ({ ...data }) => ({
                url: "edit",
                method: "PUT",
                body: data,
            }),
            invalidatesTags: ['Users'],
/*             onQueryStarted: async ({...data},{ dispatch, queryFulfilled }) => {
                const patchResult = dispatch(
                    usersApi.util.updateQueryData(
                        'getAllUsers', {...data}, 
                        (draft) => {
                            Object.assign(draft, data)
                        }
                    )
                );
                dispatch(usersApi.util.invalidateTags(['Users']))
            }, */
        }),
        deleteUser: builder.mutation({
            query: (id) => ({
                url: `delete?id=${id}`,
                method: "DELETE",
            }),
            invalidatesTags: ['Users'],
/*             onQueryStarted: async ({id},{ dispatch, queryFulfilled }) => {
                const patchResult = dispatch(
                    usersApi.util.updateQueryData(
                        'getAllUsers', id, 
                        (draft) => {
                            Object.assign(draft, id)
                        }
                    )
                );
                dispatch(usersApi.util.invalidateTags(['Users']))
            }, */
        })
    }),
})

export const { useGetAllUsersQuery, useCreateUserMutation, useEditUserMutation, useDeleteUserMutation } = usersApi