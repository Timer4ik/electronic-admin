import type { IProperty } from '@/types/models/types'
import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'

// Define a service using a base URL and expected endpoints
export const propertiesApi = createApi({
    reducerPath: 'propertiesApi',
    baseQuery: fetchBaseQuery({ baseUrl: "http://localhost:5000/api" }),
    endpoints: (build) => ({
        fetchAllProperties: build.query<{ data: IProperty[], message: string, count: number }, any>({
            query: (params) => ({
                url: `/properties`,
                params: params

            }),
        }),
        fetchPropertyById: build.query<{ data: IProperty, message: string }, number>({
            query: (id) => ({
                url: `/properties/${id}`,
            }),
        }),
        deletePropertyById: build.mutation<any, number>({
            query: (id) => ({
                url: `/properties/${id}`,
                method:"DELETE"
            }),
        }),
        updateProperty: build.mutation<any, IProperty>({
            query: (property) => {

                return ({
                    url: `/properties/${property.property_id}`,
                    method: "PUT",
                    body: property
                })
            },
        }),
        createProperty: build.mutation<any, Omit<IProperty, 'property_id'>>({
            query: (property) => {

                return ({
                    url: `/properties`,
                    method: "POST",
                    body: property
                })
            },
        }),
    }),
})

// Export hooks for usage in function components, which are
// auto-generated based on the defined endpoints
export const { useDeletePropertyByIdMutation, useFetchAllPropertiesQuery, useFetchPropertyByIdQuery, useUpdatePropertyMutation, useCreatePropertyMutation } = propertiesApi