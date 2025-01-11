import { createSlice, PayloadAction } from '@reduxjs/toolkit';

import { UserSchema } from '../types/UserSchema';
import { signupUser } from '../services/authServices/signupUser';
import { loginUser } from '../services/authServices/loginUser';
import { User } from '../types/User';
import { getUserDataService } from '../services/profileServices/getUserData';
import { logoutService } from '../services/authServices/logoutService';

import { USER_ACCESS_TOKEN, USER_REFRESH_TOKEN } from '@/shared/const';

const initialState: UserSchema = {
    data: undefined,
    isLoading: false,
    error: undefined,
};

export const UserSlice = createSlice({
    name: 'UserSlice',
    initialState,
    reducers: {
        clearAuthError: (state) => {
            state.error = undefined;
        },
        setUserData: (state, action: PayloadAction<User>) => {
            state.data = action.payload;
        },
        logout: (state) => {
            localStorage.removeItem(USER_ACCESS_TOKEN);
            localStorage.removeItem(USER_REFRESH_TOKEN);
            state.data = undefined;
        },
    },
    extraReducers: (builder) => {
        builder
            .addCase(signupUser.pending, (state) => {
                state.error = undefined;
                state.isLoading = true;
            })
            .addCase(signupUser.fulfilled, (state) => {
                state.isLoading = false;
            })
            .addCase(signupUser.rejected, (state, action) => {
                state.isLoading = false;
                state.error = action.payload;
            })

            .addCase(logoutService.pending, (state) => {
                state.error = undefined;
                state.isLoading = true;
            })
            .addCase(logoutService.fulfilled, (state) => {
                state.isLoading = false;
                state.data = undefined;
            })
            .addCase(logoutService.rejected, (state, action) => {
                state.isLoading = false;
                state.error = action.payload;
            })

            .addCase(loginUser.pending, (state) => {
                state.error = undefined;
                state.isLoading = true;
            })
            .addCase(loginUser.fulfilled, (state) => {
                state.isLoading = false;
            })
            .addCase(loginUser.rejected, (state, action) => {
                state.isLoading = false;
                state.error = action.payload;
            })

            .addCase(getUserDataService.pending, (state) => {
                state.error = undefined;
                state.isLoading = true;
            })
            .addCase(getUserDataService.fulfilled, (state, action: PayloadAction<User>) => {
                state.isLoading = false;
                state.data = action.payload;
            })
            .addCase(getUserDataService.rejected, (state, action) => {
                localStorage.removeItem(USER_ACCESS_TOKEN);
                localStorage.removeItem(USER_REFRESH_TOKEN);
                state.isLoading = false;
                state.data = undefined;
                state.error = action.payload;
            });
    },
});

export const { actions: UserActions } = UserSlice;
export const { reducer: UserReducer } = UserSlice;
