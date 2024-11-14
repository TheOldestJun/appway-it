import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const productsApi = createApi({
    reducerPath: "productsApi",
    baseQuery: fetchBaseQuery({ baseUrl: "/api/products/" }),
    tagTypes: ["Products"],
    endpoints: (builder) => ({
        getAllProducts: builder.query({
            query: () => "get-all",
            providesTags: ["Products"],
        }),
        createProduct: builder.mutation({
            query: ({ ...data }) => ({
                url: "create",
                method: "POST",
                body: data,
            }),
            invalidatesTags: ["Products"],
        }),
        editProduct: builder.mutation({
            query: ({ ...data }) => ({
                url: "edit",
                method: "PUT",
                body: data,
            }),
            invalidatesTags: ["Products"],
        }),
    }),
});

export const { useGetAllProductsQuery, useCreateProductMutation, useEditProductMutation } = productsApi;
