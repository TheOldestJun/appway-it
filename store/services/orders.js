import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const ordersApi = createApi({
    reducerPath: "ordersApi",
    baseQuery: fetchBaseQuery({ baseUrl: "/api/orders/" }),
    tagTypes: ["Orders"],
    endpoints: (builder) => ({
        getAllOrders: builder.query({
            query: () => "get-all",
            providesTags: ["Orders"],
        }),
        createOrder: builder.mutation({
            query: ({data, creatorId}) => ({
                url: "create",
                method: "POST",
                body: {data, creatorId},
            }),
            invalidatesTags: ["Orders"],
        }),
        getAllOrdersByUserId: builder.query({
            query: (id) => `get-all-by-user-id?id=${id}`,
            providesTags: (result, error, userId) => [{ type: "Orders", id: userId }],
        }),
    }),
});

export const { useCreateOrderMutation, useGetAllOrdersQuery, useGetAllOrdersByUserIdQuery } = ordersApi;