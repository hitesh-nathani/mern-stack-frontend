import { createSelector, createEntityAdapter } from "@reduxjs/toolkit";
import { apiSlice } from "../../app/api/apiSlice";

const usersAdapter = createEntityAdapter();

const initialState = usersAdapter.getInitialState();

export const usersApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getUsers: builder.query({
      query: () => "/userlist", // Assuming a base URL is set in apiSlice
      validateStatus: (response, result) =>
        response.status === 200 && !result?.isError,
      keepUnusedDataFor: 5,
      transformResponse: (responseData) => {
        console.log("🚀 ~ responseData:", responseData);
        const loadedUsers = responseData.map((user, index) => {
          user.id = index + 1;
          return user;
        });
        return usersAdapter.setAll(initialState, loadedUsers);
      },
      providesTags: (result, error, arg) => {
        if (result?.ids) {
          return [
            { type: "User", id: "LIST" },
            ...result.ids.map((id) => ({ type: "User", id })),
          ];
        } else return [{ type: "User", id: "LIST" }];
      },
    }),
  }),
});

// Returns the query object
export const { useGetUsersQuery } = usersApiSlice;

// Selector for query results
export const selectedUsersResult = usersApiSlice.endpoints.getUsers.select();

const selectUsersData = createSelector(
  selectedUsersResult,
  (usersResult) => usersResult.data
);

// Entity adapter selectors
export const {
  selectAll: selectAllUsers,
  selectById: selectUserById,
  selectIds: selectUserIds,
} = usersAdapter.getSelectors(
  (state) => selectUsersData(state) ?? initialState
);
