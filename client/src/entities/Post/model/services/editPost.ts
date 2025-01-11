import { createAsyncThunk } from '@reduxjs/toolkit';
import { AxiosError } from 'axios';

import { Post } from '../types/Post';

import { ThunkConfig } from '@/app/providers/StoreProvider/config/StateSchema';

export const editPost = createAsyncThunk<string, Post, ThunkConfig<string>>(
    'Post/editPost',
    async (props, thunkAPI) => {
        const { extra, rejectWithValue } = thunkAPI;

        try {
            const response = await extra.api.put<string>(`/api/${props.id}`, props);

            if (!response.data) {
                throw new Error();
            }

            return response.data;
        } catch (e) {
            const axiosError = e as AxiosError;
            // @ts-ignore
            return rejectWithValue(axiosError.response?.data?.message || 'Произошла ошибка');
        }
    },
);
