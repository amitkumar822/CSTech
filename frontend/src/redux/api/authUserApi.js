import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { userLoggedIn, userLoggedOut } from "../authSlice";

const baseUrl = "http://localhost:4000/api/v1/users";

export const authUserApi = createApi({
  reducerPath: "authUserApi",
  tagTypes: ["Refresh_Agent"],
  baseQuery: fetchBaseQuery({
    baseUrl: baseUrl,
    credentials: "include",
  }),
  endpoints: (builder) => ({
    registerUser: builder.mutation({
      query: (formInput) => ({
        url: "/register",
        method: "POST",
        body: formInput,
      }),
    }),
    loginUser: builder.mutation({
      query: (formInput) => ({
        url: "/login",
        method: "POST",
        body: formInput,
      }),
      async onQueryStarted(_, { queryFulfilled, dispatch }) {
        try {
          const res = await queryFulfilled;
          const userData = res?.data?.data?.user;

          if (userData) {
            dispatch(userLoggedIn({ user: userData }));

            // Save to sessionStorage (so data persists until tab is closed)
            sessionStorage.setItem("authUser", JSON.stringify(userData));
          }
        } catch (error) {
          console.error("LoginError: ", error);
        }
      },
    }),
    logoutUser: builder.mutation({
      query: () => ({
        url: "/logout",
        method: "POST",
      }),
      async onQueryStarted(_, { queryFulfilled, dispatch }) {
        try {
          dispatch(userLoggedOut());
        } catch (error) {
          console.error("logoutUser Error: ", error);
        }
      },
    }),

    //^ Agent API methods
    getAllAgents: builder.query({
      query: () => ({
        url: "/get-all-agents",
        method: "GET",
      }),
      // refetchOnMountOrRefresh: true,
      providesTags: ["Refresh_Agent"],
    }),

    deleteAgent: builder.mutation({
      query: (deleteAgentId) => ({
        url: `/delete/${deleteAgentId}`,
        method: "DELETE",
      }),
      invalidatesTags: ["Refresh_Agent"],
    })
  }),
});

export const {
  useRegisterUserMutation,
  useLoginUserMutation,
  useLogoutUserMutation,

  //^ Agent API methods
  useGetAllAgentsQuery,
  useDeleteAgentMutation,
} = authUserApi;
