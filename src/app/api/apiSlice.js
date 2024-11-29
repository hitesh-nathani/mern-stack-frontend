import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { createEntityAdapter } from "@reduxjs/toolkit";

const notesAdapter = createEntityAdapter({});

export const apiSlice = createApi({
  baseQuery: fetchBaseQuery({
    baseUrl: "http://localhost:3000", // Your backend API base URL
  }),
  tagTypes: ["Note", "User"], // The tagTypes you're using for cache invalidation
  endpoints: (builder) => ({
    getnotes: builder.query({
      query: () => "/notelist", // The endpoint for fetching notes
      validateStatus: (response, result) =>
        response.status === 200 && !result.isError,
      transformResponse: (responseData) => {
        // Mapping response data to match your store
        const loadednotes = responseData.map((note) => {
          note.id = note._id; // Adjust for the structure of your response
          return note;
        });
        return notesAdapter.setAll(notesAdapter.getInitialState(), loadednotes);
      },
      providesTags: (result) => {
        if (result?.ids) {
          return [
            { type: "Note", id: "LIST" },
            ...result.ids.map((id) => ({ type: "Note", id })),
          ];
        }
        return [{ type: "Note", id: "LIST" }];
      },
    }),
    addNewNote: builder.mutation({
      query: (newNote) => ({
        url: "/notelist",
        method: "POST",
        body: newNote,
      }),
      invalidatesTags: [{ type: "Note", id: "LIST" }],
    }),
    // Add other CRUD endpoints like updateNote, deleteNote here
  }),
});

export const {
  useGetNotesQuery,
  useAddNewNoteMutation,
  // export other hooks like useUpdateNoteMutation, useDeleteNoteMutation
} = apiSlice;
