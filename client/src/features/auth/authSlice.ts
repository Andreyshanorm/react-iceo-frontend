import { User } from "@prisma/client";
import { createSlice } from "@reduxjs/toolkit";
import { authApi } from "../../app/services/auth";
import { RootState } from "../../app/store";

interface IIntitialState {
    user: User & { token: string } | null
    isAuth: boolean
}

const initialState: IIntitialState= {
    user: null,
    isAuth: false
}

const authSlice = createSlice({
    name: 'auth',
    initialState,
    reducers: {
        logOut: () => initialState,
    },
    extraReducers: (builder) => {
        builder
            .addMatcher(authApi.endpoints.login.matchFulfilled, (state, action) => {
                state.user = action.payload;
                state.isAuth = true
            }) 
            .addMatcher(authApi.endpoints.registration.matchFulfilled, (state, action) => {
                state.user = action.payload;
                state.isAuth = true
            }) 
            .addMatcher(authApi.endpoints.curent.matchFulfilled, (state, action) => {
                state.user = action.payload;
                state.isAuth = true
            }) 
    }
})

export const { logOut } = authSlice.actions
export default authSlice.reducer;

export const selectIsAuth = (state: RootState) => state.authSlice.isAuth

export const selectUser = (state: RootState) => state.authSlice.user