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
            onQueryStarted: async ({ ...data }, { dispatch, queryFulfilled }) => {
                const patchResult = dispatch(
                    unitsApi.util.updateQueryData("getAllUnits", {}, (draft) => {
                        Object.assign(draft, data);
                    })
                );
                dispatch(unitsApi.util.invalidateTags(["Units"]));
            },
        }),
    }),
});

export const { useGetAllUnitsQuery, useCreateUnitMutation } = unitsApi