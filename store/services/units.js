import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const unitsApi = createApi({
    reducerPath: "unitsApi",
    baseQuery: fetchBaseQuery({ baseUrl: "/api/units/" }),
    tagTypes: ["Units"],
    endpoints: (builder) => ({
        getAllUnits: builder.query({
            query: () => "get-all",
            providesTags: ["Units"],
        }),
        createUnit: builder.mutation({
            query: ({ ...data }) => ({
                url: "create",
                method: "POST",
                body: data,
            }),
            invalidatesTags: ["Units"],
/*             onQueryStarted: async ({ ...data }, { dispatch, queryFulfilled }) => {
                const patchResult = dispatch(
                    unitsApi.util.updateQueryData("getAllUnits", {}, (draft) => {
                        Object.assign(draft, data);
                    })
                );
                dispatch(unitsApi.util.invalidateTags(["Units"]));
            }, */
        }),
        deleteUnit: builder.mutation({
            query: (id) => ({
                url: `delete?id=${id}`,
                method: "DELETE",
            }),
            invalidatesTags: ["Units"],
/*             onQueryStarted: async ({id},{ dispatch, queryFulfilled }) => {
                const patchResult = dispatch(
                    unitsApi.util.updateQueryData(
                        'getAllUnits', id, 
                        (draft) => {
                            Object.assign(draft, id)
                        }
                    )
                );
                dispatch(unitsApi.util.invalidateTags(['Units']))
            }, */
        }),
    }),
});

export const { useGetAllUnitsQuery, useCreateUnitMutation, useDeleteUnitMutation } = unitsApi