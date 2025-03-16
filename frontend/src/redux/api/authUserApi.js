import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react"
import { userLoggedIn, userLoggedOut } from "../authSlice";

const baseUrl = "http://localhost:4000/api/v1/users";

export const authUserApi = createApi({
    reducerPath: "authUserApi",
    baseQuery: fetchBaseQuery({
        baseUrl: baseUrl,
        credentials: "include",
        // prepareHeaders: (headers, { getState }) => {
        //     const token = getState().authUserApi.authToken;
        //     if (token) {
        //         headers.set("Authorization", `Bearer ${token}`);
        //     }
        //     return headers;
        // },
    }),
    endpoints: (builder) => ({
        registerUser: builder.mutation({
            query: (formInput) => ({
                url: "/register",
                method: "POST",
                body: formInput,
            })
        }),
        loginUser: builder.mutation({
            query: (formInput) => ({
                url: "/login",
                method: "POST",
                body: formInput,
            }),
            async onQueryStarted(_, {queryFulfilled, dispatch}) {
                try {
                    const res = await queryFulfilled;
                    dispatch(userLoggedIn({user: res?.data?.data?.user}))
                } catch (error) {
                    console.error("LoginError: ", error);
                }
            }
        }),
        logoutUser: builder.mutation({
            query: () => ({
                url: "/logout",
                method: "GET"
            }),
            async onQueryStarted(_, {queryFulfilled, dispatch}) {
                try {
                    dispatch(userLoggedOut());
                } catch (error) {
                    console.error("logoutUser Error: ", error);
                }
            }
        }),
    }),
});

export const {
    useRegisterUserMutation,
    useLoginUserMutation,
    useLogoutUserMutation,
} = authUserApi;