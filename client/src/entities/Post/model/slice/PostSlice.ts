import { createSlice } from '@reduxjs/toolkit';

import { PostSchema } from '../types/PostSchema';
import { createPost } from '../services/createPost';
import { editPost } from '../services/editPost';
import { deletePost } from '../services/deletePost';

const initialState: PostSchema = {
    data: undefined,
    isLoading: false,
    error: undefined,
};

export const PostSlice = createSlice({
    name: 'PostSlice',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(createPost.pending, (state) => {
                state.error = undefined;
                state.isLoading = true;
            })
            .addCase(createPost.fulfilled, (state) => {
                state.isLoading = false;
            })
            .addCase(createPost.rejected, (state, action) => {
                state.isLoading = false;
                state.error = action.payload;
            })

            .addCase(editPost.pending, (state) => {
                state.error = undefined;
                state.isLoading = true;
            })
            .addCase(editPost.fulfilled, (state) => {
                state.isLoading = false;
            })
            .addCase(editPost.rejected, (state, action) => {
                state.isLoading = false;
                state.error = action.payload;
            })

            .addCase(deletePost.pending, (state) => {
                state.error = undefined;
                state.isLoading = true;
            })
            .addCase(deletePost.fulfilled, (state) => {
                state.isLoading = false;
            })
            .addCase(deletePost.rejected, (state, action) => {
                state.isLoading = false;
                state.error = action.payload;
            });
    },
});

export const { actions: PostActions } = PostSlice;
export const { reducer: PostReducer } = PostSlice;
