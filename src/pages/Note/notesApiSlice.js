import { createSelector, createEntityAdapter } from "@reduxjs/toolkit";
import { apiSlice } from "../../app/api/apiSlice";

// Create an entity adapter for notes
const notesAdapter = createEntityAdapter({});

// Initial state setup using the adapter's initial state
const initialState = notesAdapter.getInitialState();

// Define the `notesApiSlice` with the injected endpoints
export const notesApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    // Define the `getNotes` query to fetch notes from the server
    getNotes: builder.query({
      query: () => "/notelist", // Ensure this path is correct for your API
      validateStatus: (response, result) => {
        return response.status === 200 && !result.isError;
      },
      transformResponse: (responseData) => {
        console.log("🚀 ~ responseData:======>", responseData); // Debugging log
        // Adjusting the response to map the `_id` or other identifiers
        const loadedNotes = responseData.map((note) => {
          // Ensure the correct field is mapped to `id` (e.g., `_id` -> `id`)
          note.id = note._id || note.id; // Change this depending on the structure of your response
          return note;
        });
        return notesAdapter.setAll(initialState, loadedNotes);
      },
      providesTags: (result) => {
        if (result?.ids) {
          return [
            { type: "Note", id: "LIST" },
            ...result.ids.map((id) => ({
              type: "Note",
              id,
            })),
          ];
        } else return [{ type: "Note", id: "LIST" }];
      },
    }),
    // Mutation to add a new note
    addNewNote: builder.mutation({
      query: (initialNote) => ({
        url: "/notelist",
        method: "POST",
        body: { ...initialNote },
      }),
      invalidatesTags: [{ type: "Note", id: "LIST" }],
    }),
    // Mutation to update an existing note
    updateNote: builder.mutation({
      query: (initialNote) => ({
        url: `/notelist/${initialNote.id}`,
        method: "PATCH",
        body: { ...initialNote },
      }),
      invalidatesTags: (result, error, arg) => [{ type: "Note", id: arg.id }],
    }),
    // Mutation to delete a note
    deleteNote: builder.mutation({
      query: ({ id }) => ({
        url: `/notelist/${id}`,
        method: "DELETE",
        body: { id },
      }),
      invalidatesTags: (result, error, arg) => [{ type: "Note", id: arg.id }],
    }),
  }),
});

// Export hooks to be used in components
export const {
  useGetNotesQuery,
  useAddNewNoteMutation,
  useUpdateNoteMutation,
  useDeleteNoteMutation,
} = notesApiSlice;

// Selectors to retrieve data from the store
export const selectNotesResult = notesApiSlice.endpoints.getNotes.select();

// Create a selector to extract notes data from the result
const selectNotesData = createSelector(
  selectNotesResult,
  (notesResult) => notesResult.data
);

// Export selectors for accessing the notes state
export const {
  selectAll: selectAllNotes,
  selectById: selectNoteById, // Corrected the typo to `selectById`
  selectIds: selectNoteIds,
} = notesAdapter.getSelectors(
  (state) => selectNotesData(state) ?? initialState
);
