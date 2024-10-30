import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const rolesApi = createApi({
    reducerPath: "rolesApi",
    baseQuery: fetchBaseQuery({ baseUrl: "/api/auth" }),
    endpoints: (builder) => ({
        getRoles: builder.query({
            query: () => "roles",
        }),
    }),
});

export const { useGetRolesQuery } = rolesApi