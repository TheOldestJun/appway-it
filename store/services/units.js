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
        }),
        deleteUnit: builder.mutation({
            query: (id) => ({
                url: `delete?id=${id}`,
                method: "DELETE",
            }),
            invalidatesTags: ["Units"],
        }),
    }),
});

export const { useGetAllUnitsQuery, useCreateUnitMutation, useDeleteUnitMutation } = unitsApi