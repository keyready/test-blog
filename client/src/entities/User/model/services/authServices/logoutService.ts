import { createAsyncThunk } from '@reduxjs/toolkit';
import { AxiosError } from 'axios';

import { UserActions } from '../../slice/UserSlice';

import { ThunkConfig } from '@/app/providers/StoreProvider/config/StateSchema';

export const logoutService = createAsyncThunk<string, void, ThunkConfig<string>>(
    'User/logoutService',
    async (CandidateId, thunkAPI) => {
        const { extra, rejectWithValue, dispatch } = thunkAPI;

        try {
            const response = await extra.api.post<string>('/api/auth/logout', {});

            dispatch(UserActions.logout());

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
