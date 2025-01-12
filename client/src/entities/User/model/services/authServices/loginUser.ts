import { createAsyncThunk } from '@reduxjs/toolkit';
import { AxiosError, AxiosResponse } from 'axios';

import { Tokens } from '../../types/User';
import { UserLoginSchema } from '../../schemas/ValidateSchema';

import { ThunkConfig } from '@/app/providers/StoreProvider/config/StateSchema';
import { USER_ACCESS_TOKEN } from '@/shared/const';

export const loginUser = createAsyncThunk<Tokens, UserLoginSchema, ThunkConfig<string>>(
    'User/loginUser',
    async (user, thunkAPI) => {
        const { extra, rejectWithValue } = thunkAPI;

        try {
            const response: AxiosResponse<Tokens> = await extra.api.post<Tokens>(
                '/api/auth/login',
                user,
            );

            if (response.status !== 200) {
                throw new Error();
            }

            localStorage.setItem(USER_ACCESS_TOKEN, response.data.accessToken);

            return response.data;
        } catch (e) {
            const axiosError = e as AxiosError;
            // @ts-ignore
            return rejectWithValue(axiosError.response?.data?.message || 'Произошла ошибка');
        }
    },
);
