import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'
import { IDeveloper } from '../../types/models/types'

// Define a service using a base URL and expected endpoints
export const developersApi = createApi({
    reducerPath: 'developersApi',
    baseQuery: fetchBaseQuery({ baseUrl: "http://localhost:5000/api" }),
    tagTypes: ["Developers"],
    endpoints: (build) => ({
        getDevelopers: build.query<{ data: IDeveloper[], message: string, count: number }, any>({
            query: (params) => ({
                url: `/developers`,
                params: params

            }),
            providesTags: (result, error, arg) =>
                result
                    ? [...result.data.map(({ developer_id }) =>
                        ({ type: 'Developers' as const, id: developer_id })), 'Developers']
                    : ['Developers'],
        }),
        getDeveloperById: build.query<{ data: IDeveloper, message: string }, number>({
            query: (id) => ({
                url: `/developers/${id}`,
                params: {
                    extend: "file"
                }
            }),
            providesTags: (result, error, arg) => [{ type: 'Developers' as const, id: result?.data?.developer_id }],
        }),
        deleteDeveloperById: build.mutation<any, number>({
            query: (id) => ({
                url: `/developers/${id}`,
                method: "DELETE"
            }),
            invalidatesTags: ['Developers'],
        }),
        updateDeveloper: build.mutation<any, IDeveloper>({
            query: (developer) => {
                return ({
                    url: `/developers/${developer.developer_id}`,
                    method: "PUT",
                    body: developer
                })
            },
            invalidatesTags: ['Developers'],
        }),
        createDeveloper: build.mutation<any, Omit<IDeveloper, 'developer_id'>>({
            query: (developer) => {
                return ({
                    url: `/developers`,
                    method: "POST",
                    body: developer
                })
            },
            invalidatesTags: ['Developers'],
        }),
    }),
})

// Export hooks for usage in function components, which are
// auto-generated based on the defined endpoints
export const { useCreateDeveloperMutation, useDeleteDeveloperByIdMutation, useUpdateDeveloperMutation, useGetDeveloperByIdQuery, useGetDevelopersQuery, useLazyGetDeveloperByIdQuery, useLazyGetDevelopersQuery } = developersApi