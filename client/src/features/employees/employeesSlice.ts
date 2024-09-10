import { Employee } from "@prisma/client";
import { createSlice } from "@reduxjs/toolkit";
import { employeesApi } from "../../app/services/employees";
import { RootState } from "../../app/store";

interface IIntitialState {
    employees: Employee[] | null
}

const initialState: IIntitialState = {
    employees: null
}

const employeesSlice = createSlice({
    name: 'employees',
    initialState,
    reducers: {
        logOut: () => initialState
    },
    extraReducers: (builder) => {
        builder.addMatcher(employeesApi.endpoints.getAll.matchFulfilled, (state, action) => {
            state.employees = action.payload
        })
    }
})

export default employeesSlice.reducer;

export const selectEmployees = (state: RootState) => state.employeesSlice