import type { IPropertyType } from '@/types/models/types'
import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'

// Define a service using a base URL and expected endpoints
export const propertyTypesApi = createApi({
    reducerPath: 'propertyTypesApi',
    baseQuery: fetchBaseQuery({ baseUrl: "http://localhost:5000/api" }),
    endpoints: (build) => ({
        fetchAllPropertyTypes: build.query<{ data: IPropertyType[], message: string, count: number }, any>({
            query: (params) => ({
                url: `/property-types`,
                params: params

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
        deletePropertyType: build.mutation<any, number>({
            query: (id) => {
                return ({
                    url: `/property-types/${id}`,
                    method: "DELETE",
                })
            },
        }),

    }),
})

// Export hooks for usage in function components, which are
// auto-generated based on the defined endpoints
export const { useFetchAllPropertyTypesQuery, useDeletePropertyTypeMutation, useFetchPropertyTypeByIdQuery, useUpdatePropertyTypeMutation, useCreatePropertyTypeMutation } = propertyTypesApi