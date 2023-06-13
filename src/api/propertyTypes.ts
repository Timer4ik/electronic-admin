import type { IPropertyType } from '@/types/models/types'
import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'

// Define a service using a base URL and expected endpoints
export const propertyTypesApi = createApi({
    reducerPath: 'propertyTypesApi',
    baseQuery: fetchBaseQuery({ baseUrl: "http://localhost:5000/api" }),
    endpoints: (build) => ({
        fetchAllPropertyTypes: build.query<{ data: IPropertyType[], message: string }, { page: number, limit: number }>({
            query: ({ page, limit }) => ({
                url: `/property-types`,
                params: {
                    page, 
                    limit
                }

            }),
        }),
        fetchPropertyTypeById: build.query<{ data: IPropertyType, message: string }, number>({
            query: (id) => ({
                url: `/property-types/${id}`,
            }),
        }),
        updatePropertyType: build.mutation<any, IPropertyType>({
            query: (propertyType) => {

                return ({
                    url: `/property-types/${propertyType.property_type_id}`,
                    method: "PUT",
                    body: propertyType
                })
            },
        }),
        createPropertyType: build.mutation<any, Omit<IPropertyType, 'property_type_id'>>({
            query: (propertyType) => {

                return ({
                    url: `/property-types`,
                    method: "POST",
                    body: propertyType
                })
            },
        }),
    }),
})

// Export hooks for usage in function components, which are
// auto-generated based on the defined endpoints
export const { useFetchAllPropertyTypesQuery, useFetchPropertyTypeByIdQuery, useUpdatePropertyTypeMutation, useCreatePropertyTypeMutation } = propertyTypesApi