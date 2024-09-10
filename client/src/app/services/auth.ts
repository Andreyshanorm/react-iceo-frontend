import { User } from "@prisma/client";
import { api } from "./api";

export type UserData = Omit<User, "id">
type ResponseLoginData = User & { token: string }

export const authApi = api.injectEndpoints({
    endpoints: (builder) => ({
        login: builder.mutation<ResponseLoginData, UserData>({
            query: (userData) => ({
                url: '/user/login',
                method: 'POST',
                body: userData
            })
        }),
        registration: builder.mutation<ResponseLoginData, UserData>({
            query: (userData) => ({
                url: '/user/registration',
                method: 'POST',
                body: userData
            })
        }),
        curent: builder.query<ResponseLoginData, void>({
            query: () => ({
                url: '/user/current',
                method: 'GET',
            })
        })
    })
})

export const { useLoginMutation, useRegistrationMutation, useCurentQuery } = authApi

export const { endpoints: { login, registration, curent } } = authApi