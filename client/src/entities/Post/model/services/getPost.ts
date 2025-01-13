import { createAsyncThunk } from '@reduxjs/toolkit';
import { AxiosError } from 'axios';

import { Post } from '../types/Post';

import { ThunkConfig } from '@/app/providers/StoreProvider/config/StateSchema';

export const getPost = createAsyncThunk<
    Post,
    string,
    ThunkConfig<{ code: number; message: string }>
>('Post/getPost', async (postId, thunkAPI) => {
    const { extra, rejectWithValue, dispatch } = thunkAPI;

    try {
        const response = await extra.api.get<Post>(`/api/posts/${postId}`);

        if (!response.data) {
            throw new Error();
        }

        return response.data;
    } catch (e) {
        const axiosError = e as AxiosError;
        // @ts-ignore
        return rejectWithValue(axiosError.response?.data);
    }
});
