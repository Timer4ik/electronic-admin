import type { IDeveloper } from '@/types/models/types'
import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'

// Define a service using a base URL and expected endpoints
export const developersApi = createApi({
    reducerPath: 'developersApi',
    baseQuery: fetchBaseQuery({ baseUrl: "http://localhost:5000/api" }),
    endpoints: (build) => ({
        fetchAllDevelopers: build.query<{ data: IDeveloper[], message: string, count: number }, any>({
            query: (params) => ({
                url: `/developers`,
                params: params

            }),
        }),
        fetchDeveloperById: build.query<{ data: IDeveloper, message: string }, number>({
            query: (id) => ({
                url: `/developers/${id}`,
                params: {
                    extend: "file"
                }
            }),
        }),
        deleteDeveloperById: build.mutation<any, number>({
            query: (id) => ({
                url: `/developers/${id}`,
                method: "DELETE"
            }),
        }),
        updateDeveloper: build.mutation<any, IDeveloper>({
            query: (developer) => {
                return ({
                    url: `/developers/${developer.developer_id}`,
                    method: "PUT",
                    body: developer
                })
            },
        }),
        createDeveloper: build.mutation<any, Omit<IDeveloper, 'developer_id'>>({
            query: (developer) => {
                return ({
                    url: `/developers`,
                    method: "POST",
                    body: developer
                })
            },
        }),
    }),
})

// Export hooks for usage in function components, which are
// auto-generated based on the defined endpoints
export const { useCreateDeveloperMutation, useDeleteDeveloperByIdMutation, useFetchAllDevelopersQuery, useFetchDeveloperByIdQuery, useLazyFetchAllDevelopersQuery, useLazyFetchDeveloperByIdQuery, useUpdateDeveloperMutation } = developersApi