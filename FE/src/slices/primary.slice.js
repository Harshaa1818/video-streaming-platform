import { createSlice } from '@reduxjs/toolkit';

const slice = createSlice({
    name: 'primary',
    initialState: {
        data: [],
        loading: false,
        error: null,
    },
    reducers: {
        fetch: (state) => {
            state.loading = true;
        },
        fetchSuccess: (state, action) => {
            state.data = action.payload;
            state.loading = false;
            state.error = null;
        },
        fetchError: (state, action) => {
            state.error = action.payload;
            state.loading = false;
        },
    },
})

export const { fetch, fetchSuccess, fetchError } = slice.actions;
export default slice.reducer;