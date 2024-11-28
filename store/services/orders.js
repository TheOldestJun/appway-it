import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const ordersApi = createApi({
    reducerPath: "ordersApi",
    baseQuery: fetchBaseQuery({ baseUrl: "/api/orders/" }),
    tagTypes: ["Orders", "NotApproved", "Rejected"],
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
        setDeleted: builder.mutation({
            query: (id) => ({
                url: `set-deleted?id=${id}`,
                method: "PUT",
            }),
            invalidatesTags: ["Orders"],
        }),
        setClosed: builder.mutation({
            query: (id) => ({
                url: `set-closed?id=${id}`,
                method: "PUT",
            }),
            invalidatesTags: ["Orders"],
        }),
        getNotApproved: builder.query({
            query: () => "get-not-approved",
            providesTags: ["NotApproved"],
        }),
        setApproved: builder.mutation({
            query: ({ id, approverId }) => ({
                url: "set-approved",
                method: "PUT",
                body: { id, approverId },
            }),
            invalidatesTags: ["NotApproved"],
        }),
        getRejected: builder.query({
            query: () => "get-rejected",
            providesTags: ["Rejected"],
        }),
        setRejected: builder.mutation({
            query: ({ id, rejectedById, rejectedReason }) => ({
                url: "set-rejected",
                method: "PUT",
                body: { id, rejectedById, rejectedReason },
            }),
            invalidatesTags: ["Rejected"],
        }),
    }),
});

export const { 
    useCreateOrderMutation, 
    useGetAllOrdersQuery, 
    useGetAllOrdersByUserIdQuery,
    useSetDeletedMutation,
    useSetClosedMutation,
    useGetNotApprovedQuery,
    useSetApprovedMutation,
    useGetRejectedQuery } = ordersApi;