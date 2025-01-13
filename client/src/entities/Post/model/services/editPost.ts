import { createAsyncThunk } from '@reduxjs/toolkit';
import { AxiosError } from 'axios';

import { Post } from '../types/Post';

import { ThunkConfig } from '@/app/providers/StoreProvider/config/StateSchema';

export const editPost = createAsyncThunk<
    Post,
    { post: FormData; id: string },
    ThunkConfig<{ code: number; message: string }>
>('Post/editPost', async ({ post, id }, thunkAPI) => {
    const { extra, rejectWithValue } = thunkAPI;

    try {
        const response = await extra.api.post<Post>(`/api/posts/${id}`, post, {
            headers: {
                'Content-Type': 'multipart/form-data',
            },
        });

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
