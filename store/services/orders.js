import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

export const ordersApi = createApi({
  reducerPath: 'ordersApi',
  baseQuery: fetchBaseQuery({ baseUrl: '/api/orders/' }),
  tagTypes: ['Orders'],
  refetchOnFocus: true,
  endpoints: builder => ({
    getAllOrders: builder.query({
      query: () => 'get-all',
      providesTags: result =>
        result
          ? [
              ...result.map(({ id }) => ({ type: 'Orders', id })),
              { type: 'Orders', id: 'LIST' },
            ]
          : [{ type: 'Orders', id: 'LIST' }],
    }),
    createOrder: builder.mutation({
      query: ({ data, creatorId }) => ({
        url: 'create',
        method: 'POST',
        body: { data, creatorId },
      }),
      invalidatesTags: [{ type: 'Orders', id: 'LIST' }],
    }),
    getAllOrdersByUserId: builder.query({
      query: id => `get-all-by-user-id?id=${id}`,
      providesTags: result =>
        result
          ? [
              ...result.map(({ id }) => ({ type: 'Orders', id })),
              { type: 'Orders', id: 'LIST' },
            ]
          : [{ type: 'Orders', id: 'LIST' }],
    }),
    setDeleted: builder.mutation({
      query: id => ({
        url: `set-deleted?id=${id}`,
        method: 'PUT',
      }),
      invalidatesTags: [{ type: 'Orders', id: 'LIST' }],
    }),
    setClosed: builder.mutation({
      query: id => ({
        url: `set-closed?id=${id}`,
        method: 'PUT',
      }),
      invalidatesTags: [{ type: 'Orders', id: 'LIST' }],
    }),
    getNotApproved: builder.query({
      query: () => 'get-not-approved',
      providesTags: result =>
        result
          ? [
              ...result.map(({ id }) => ({ type: 'Orders', id })),
              { type: 'Orders', id: 'LIST' },
            ]
          : [{ type: 'Orders', id: 'LIST' }],
    }),
    setApproved: builder.mutation({
      query: ({ id, approverId }) => ({
        url: 'set-approved',
        method: 'PUT',
        body: { id, approverId },
      }),
      invalidatesTags: [{ type: 'Orders', id: 'LIST' }],
    }),
    getRejected: builder.query({
      query: id => `get-rejected-by-user-id?id=${id}`,
      providesTags: result =>
        result
          ? [
              ...result.map(({ id }) => ({ type: 'Orders', id })),
              { type: 'Orders', id: 'LIST' },
            ]
          : [{ type: 'Orders', id: 'LIST' }],
    }),
    setRejected: builder.mutation({
      query: ({ id, rejectedById, rejectedReason }) => ({
        url: 'set-rejected',
        method: 'PUT',
        body: { id, rejectedById, rejectedReason },
      }),
      invalidatesTags: [{ type: 'Orders', id: 'LIST' }],
    }),
    deleteOrder: builder.mutation({
      query: id => ({
        url: `delete?id=${id}`,
        method: 'DELETE',
      }),
      invalidatesTags: [{ type: 'Orders', id: 'LIST' }],
    }),
    getNotOrdered: builder.query({
      query: () => 'get-not-ordered',
      providesTags: result =>
        result
          ? [
              ...result.map(({ id }) => ({ type: 'Orders', id })),
              { type: 'Orders', id: 'LIST' },
            ]
          : [{ type: 'Orders', id: 'LIST' }],
    }),
    setOrdered: builder.mutation({
      query: ({ orderId, quantity, executorId }) => ({
        url: 'set-ordered',
        method: 'PUT',
        body: { orderId, quantity, executorId },
      }),
      invalidatesTags: [{ type: 'Orders', id: 'LIST' }],
    }),
    getNotReceived: builder.query({
      query: () => 'get-not-received',
      providesTags: result =>
        result
          ? [
              ...result.map(({ id }) => ({ type: 'Orders', id })),
              { type: 'Orders', id: 'LIST' },
            ]
          : [{ type: 'Orders', id: 'LIST' }],
    }),
    setReceived: builder.mutation({
      query: ({ orderId, quantity, receiverId }) => ({
        url: 'set-received',
        method: 'PUT',
        body: { orderId, quantity, receiverId },
      }),
      invalidatesTags: [{ type: 'Orders', id: 'LIST' }],
    }),
    setInStock: builder.mutation({
      query: ({ orderId, quantity, receiverId }) => ({
        url: 'set-in-stock',
        method: 'PUT',
        body: { orderId, quantity,receiverId },
      }),
      invalidatesTags: [{ type: 'Orders', id: 'LIST' }],
    })
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
  useGetRejectedQuery,
  useSetRejectedMutation,
  useDeleteOrderMutation,
  useGetNotOrderedQuery,
  useSetOrderedMutation,
  useGetNotReceivedQuery,
  useSetReceivedMutation,
  useSetInStockMutation,
} = ordersApi;
