import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const usersApi = createApi({
  reducerPath: "usersApi",
  baseQuery: fetchBaseQuery({
    baseUrl: "https://bechdal-api.herokuapp.com/api/v1/",
  }),
  endpoints: (builder) => ({
    getAllUsers: builder.query({
      query: () => "users",
    }),
  }),
});

export const { useGetAllUsersQuery } = usersApi;
