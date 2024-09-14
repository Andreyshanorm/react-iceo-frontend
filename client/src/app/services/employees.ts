import { Employee } from "@prisma/client";
import { api } from "./api";



export const employeesApi = api.injectEndpoints({
    endpoints: (builder) => ({
        getAll: builder.query<Employee[], void>({
            query: () => ({
                url: '/employees',
                method: 'GET'
            })
        }),
        getOne: builder.query<Employee, string>({
            query: (id) => ({
                url: `employees/${id}`,
                method: 'GET'
            })
        }),
        editOne: builder.mutation<string, Employee>({
            query: (employee) => ({
                url: `employees/edit/${employee.id}`,
                method: 'PUT',
                body: employee
            })
        }),
        removeOne: builder.mutation<object, object>({
            query: (id) => ({
                url: `employees/remove/${id}`,
                method: 'POST',
                body: id
            })
        }),
        addOne: builder.mutation<Employee, Employee>({
            query: (employee) => ({
                url: `employees/add`,
                method: 'POST',
                body: employee
            })
        }),

    })
})

export const { useGetAllQuery, useGetOneQuery, useEditOneMutation, useAddOneMutation, useRemoveOneMutation } = employeesApi;

export const { endpoints: { getAll, getOne, editOne, removeOne, addOne } } = employeesApi