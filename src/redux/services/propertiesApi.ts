import type { IProperty } from '@/types/models/types'
import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'

// Define a service using a base URL and expected endpoints
export const propertiesApi = createApi({
    reducerPath: 'propertiesApi',
    baseQuery: fetchBaseQuery({ baseUrl: "http://localhost:5000/api" }),
    tagTypes: ["Properties"],
    endpoints: (build) => ({
        fetchAllProperties: build.query<{ data: IProperty[], message: string, count: number }, any>({
            query: (params) => ({
                url: `/properties`,
                params: params

            }),
            providesTags: (result, error, arg) =>
                result
                    ? [...result.data.map(({ property_id }) =>
                        ({ type: 'Properties' as const, id: property_id })), 'Properties']
                    : ['Properties'],
        }),
        fetchPropertyById: build.query<{ data: IProperty, message: string }, { id: number, params: any }>({
            query: ({id, params}) => ({
                url: `/properties/${id}`,
                params
            }),
            providesTags: (result, error, arg) => [{ type: 'Properties' as const, id: result?.data?.property_id }],
        }),
        deletePropertyById: build.mutation<any, number>({
            query: (id) => ({
                url: `/properties/${id}`,
                method: "DELETE"
            }),
            invalidatesTags: ['Properties'],
        }),
        updateProperty: build.mutation<any, IProperty>({
            query: (property) => {

                return ({
                    url: `/properties/${property.property_id}`,
                    method: "PUT",
                    body: property
                })
            },
            invalidatesTags: ['Properties'],
        }),
        createProperty: build.mutation<any, Omit<IProperty, 'property_id'>>({
            query: (property) => {

                return ({
                    url: `/properties`,
                    method: "POST",
                    body: property
                })
            },
            invalidatesTags: ['Properties'],
        }),
    }),
})

// Export hooks for usage in function components, which are
// auto-generated based on the defined endpoints
export const { useDeletePropertyByIdMutation, useLazyFetchAllPropertiesQuery, useFetchAllPropertiesQuery, useFetchPropertyByIdQuery, useUpdatePropertyMutation, useCreatePropertyMutation } = propertiesApi