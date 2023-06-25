import type { IPropertyValue } from '@/types/models/types'
import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'

// Define a service using a base URL and expected endpoints
export const propValuesApi = createApi({
    reducerPath: 'propValuesApi',
    baseQuery: fetchBaseQuery({ baseUrl: "http://localhost:5000/api" }),
    tagTypes: ["PropValues"],
    endpoints: (build) => ({
        getPropValues: build.query<{ data: IPropertyValue[], message: string, count: number }, any>({
            query: (params) => ({
                url: `/property-values`,
                params: params

            }),
            providesTags: (result, error, arg) =>
                result
                    ? [...result.data.map(({ property_value_id }) =>
                        ({ type: 'PropValues' as const, id: property_value_id })), 'PropValues']
                    : ['PropValues'],
        }),
        getPropValueById: build.query<{ data: IPropertyValue, message: string }, number>({
            query: (id) => ({
                url: `/property-values/${id}`,
            }),
            providesTags: (result, error, arg) => [{ type: 'PropValues' as const, id: result?.data?.property_value_id }],
        }),
        updatePropValue: build.mutation<any, IPropertyValue>({
            query: (propValue) => ({
                url: `/property-values/${propValue.property_value_id}`,
                method: "PUT",
                body: propValue
            }),
            invalidatesTags: ['PropValues'],
        }),
        createPropValue: build.mutation<any, Omit<IPropertyValue, 'property_value_id'>>({
            query: (propValue) => ({
                url: `/property-values`,
                method: "POST",
                body: propValue
            }),
            invalidatesTags: ['PropValues'],
        }),
        deletePropValue: build.mutation<any, number>({
            query: (id) => ({
                url: `/property-values/${id}`,
                method: "DELETE",
            }),
            invalidatesTags: ['PropValues'],
        }),

    }),
})

// Export hooks for usage in function components, which are
// auto-generated based on the defined endpoints
export const { useCreatePropValueMutation, useDeletePropValueMutation, useGetPropValueByIdQuery, useGetPropValuesQuery, useLazyGetPropValueByIdQuery, useLazyGetPropValuesQuery, useUpdatePropValueMutation } = propValuesApi