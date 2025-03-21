import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { userLoggedIn } from "../authSlice";
import { apiUrl } from "../mainApi";

const baseUrl = `${apiUrl}/users`;

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
      invalidatesTags: ["Refresh_Agent"],
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
    }),

    updateUserOrAgent: builder.mutation({
      query: ({ editFormInput, agentId }) => ({
        url: `/update/${agentId}`,
        method: "PUT",
        body: editFormInput,
      }),
      invalidatesTags: ["Refresh_Agent"],
    }),

    //^ Agent API methods
    getAllAgents: builder.query({
      query: () => ({
        url: "/get-all-agents",
        method: "GET",
      }),
      providesTags: ["Refresh_Agent"],
      transformResponse: (response) => response.data,
    }),

    deleteAgent: builder.mutation({
      query: (deleteAgentId) => ({
        url: `/delete/${deleteAgentId}`,
        method: "DELETE",
      }),
      invalidatesTags: ["Refresh_Agent"],
    }),
  }),
});

export const {
  useRegisterUserMutation,
  useLoginUserMutation,
  useLogoutUserMutation,
  useUpdateUserOrAgentMutation,

  //^ Agent API methods
  useGetAllAgentsQuery,
  useDeleteAgentMutation,
} = authUserApi;
