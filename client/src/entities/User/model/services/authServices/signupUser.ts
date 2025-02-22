import { createAsyncThunk } from '@reduxjs/toolkit';
import { AxiosError } from 'axios';

import { UserSignupSchema } from '../../schemas/ValidateSchema';

import { ThunkConfig } from '@/app/providers/StoreProvider/config/StateSchema';

export const signupUser = createAsyncThunk<string, UserSignupSchema, ThunkConfig<string>>(
    'User/signupUser',
    async (newUser, thunkAPI) => {
        const { extra, rejectWithValue } = thunkAPI;

        try {
            const response = await extra.api.post<string>('/api/auth/sign-up', newUser);

            if (response.status > 300) {
                throw new Error();
            }

            return response.data;
        } catch (e) {
            const axiosError = e as AxiosError;
            if (axiosError.code && axiosError.code === '413') {
                return rejectWithValue('Файл слишком большой');
            }
            // @ts-ignore
            return rejectWithValue(axiosError.response?.data?.message || 'Произошла ошибка');
        }
    },
);
