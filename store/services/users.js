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
        editUser: builder.mutation({
            query: ({ ...data }) => ({
                url: "edit",
                method: "PUT",
                body: data,
            }),
            onQueryStarted: async ({...data},{ dispatch, queryFulfilled }) => {
                const patchResult = dispatch(
                    usersApi.util.updateQueryData(
                        'getAllUsers', {...data}, 
                        (draft) => {
                            Object.assign(draft, data)
                        }
                    )
                );
                dispatch(usersApi.util.invalidateTags(['Users']))
            },
        }),
    }),
})

export const { useGetAllUsersQuery, useEditUserMutation } = usersApi