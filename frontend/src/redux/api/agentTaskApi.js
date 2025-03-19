import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

const baseUrl = "http://localhost:4000/api/v1/agent";

export const agentTaskApi = createApi({
  reducerPath: "agentTaskApi",
  tagTypes: ["Refresh_Tasks"],
  baseQuery: fetchBaseQuery({
    baseUrl: baseUrl,
    credentials: "include",
  }),
  endpoints: (builder) => ({
    getAllAgentTasks: builder.query({
      query: () => ({
        url: "/get-all-tasks",
        method: "GET",
      }),
      providesTags: ["Refresh_Tasks"],
      transformResponse: (response) => response.data,
    }),
    getAgentTaskById: builder.query({
      query: (agentId) => ({
        url: `/get-task-by-id/${agentId}`,
        method: "GET",
      }),
      providesTags: ["Refresh_Tasks"],
      transformResponse: (response) => response.data,
    }),
    markTaskAsCompleted: builder.mutation({
      query: (agentTaskId) => ({
        url: `/mark-task-as-completed/${agentTaskId}`,
        method: "PUT",
      }),
      invalidatesTags: ["Refresh_Tasks"],
      transformResponse: (response) => response.data,
    })
  }),
});

export const { 
  useGetAllAgentTasksQuery,
  // useGetAgentTaskByIdMutation,
  useGetAgentTaskByIdQuery,
  useMarkTaskAsCompletedMutation,
} = agentTaskApi;
