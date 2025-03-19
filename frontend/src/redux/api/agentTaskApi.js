import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

const baseUrl = "http://localhost:4000/api/v1/agent";

export const agentTaskApi = createApi({
  reducerPath: "agentTaskApi",
  tagTypes: ["Agent"],
  baseQuery: fetchBaseQuery({
    baseUrl: baseUrl,
    credentials: "include",
  }),
  endpoints: (builder) => ({
    getAllAgentTasks: builder.query({
      query: () => ({
        url: "/get-all-tasks",
      }),
      transformResponse: (response) => response.data,
    }),
  }),
});

export const { useGetAllAgentTasksQuery } = agentTaskApi;
