import type { IPropertyType } from '@/types/models/types'
import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'

// Define a service using a base URL and expected endpoints
export const propTypesApi = createApi({
    reducerPath: 'propTypesApi',
    baseQuery: fetchBaseQuery({ baseUrl: "http://localhost:5000/api" }),
    tagTypes: ["PropTypes"],
    endpoints: (build) => ({
        getPropTypes: build.query<{ data: IPropertyType[], message: string, count: number }, any>({
            query: (params) => ({
                url: `/property-types`,
                params: params

            }),
            providesTags: (result, error, arg) =>
                result
                    ? [...result.data.map(({ property_type_id }) =>
                        ({ type: 'PropTypes' as const, id: property_type_id })), 'PropTypes']
                    : ['PropTypes'],
        }),
        getPropTypeById: build.query<{ data: IPropertyType, message: string }, number>({
            query: (id) => ({
                url: `/property-types/${id}`,
            }),
            providesTags: (result, error, arg) => [{ type: 'PropTypes' as const, id: result?.data?.property_type_id }],
        }),
        updatePropType: build.mutation<any, IPropertyType>({
            query: (propType) => ({
                url: `/property-types/${propType.property_type_id}`,
                method: "PUT",
                body: propType
            }),
            invalidatesTags: ['PropTypes'],
        }),
        createPropType: build.mutation<any, Omit<IPropertyType, 'property_type_id'>>({
            query: (propType) => ({
                url: `/property-types`,
                method: "POST",
                body: propType
            }),
            invalidatesTags: ['PropTypes'],
        }),
        deletePropType: build.mutation<any, number>({
            query: (id) => ({
                url: `/property-types/${id}`,
                method: "DELETE",
            }),
            invalidatesTags: ['PropTypes'],
        }),

    }),
})

// Export hooks for usage in function components, which are
// auto-generated based on the defined endpoints
export const { useCreatePropTypeMutation, useDeletePropTypeMutation, useGetPropTypeByIdQuery, useGetPropTypesQuery, useLazyGetPropTypeByIdQuery, useLazyGetPropTypesQuery, useUpdatePropTypeMutation } = propTypesApi