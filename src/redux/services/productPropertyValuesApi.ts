import type { IProductPropertyValue } from '@/types/models/types'
import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'

// Define a service using a base URL and expected endpoints
export const productPropertyValuesApi = createApi({
    reducerPath: 'productPropertyValuesApi',
    baseQuery: fetchBaseQuery({ baseUrl: "http://localhost:5000/api" }),
    tagTypes: ["ProductPropertyValues"],
    endpoints: (build) => ({
        getProductPropertyValues: build.query<{ data: IProductPropertyValue[], message: string, count: number, page: string }, any>({
            query: (params) => ({
                url: `/product-properties`,
                params: params
            }),
            providesTags: (result, error, arg) =>
                result
                    ? [...result.data.map(({ product_property_value_id }) =>
                        ({ type: 'ProductPropertyValues' as const, id: product_property_value_id })), 'ProductPropertyValues']
                    : ['ProductPropertyValues'],
        }),
        getProductPropertyValueById: build.query<{ data: IProductPropertyValue, message: string, page: string }, { id: number, params: any }>({
            query: ({ id, params }) => ({
                url: `/product-properties/${id}`,
                params: params
            }),
        }),
        createProductPropertyValue: build.mutation<any, Omit<IProductPropertyValue, 'product_property_value_id'>>({
            query: (product) => {
                return ({
                    url: `/product-properties`,
                    method: "POST",
                    body: product
                })
            },
            invalidatesTags: ['ProductPropertyValues'],
        }),
        updateProductPropertyValue: build.mutation<any, IProductPropertyValue>({
            query: (product) => {
                return ({
                    url: `/product-properties/${product.product_property_value_id}`,
                    method: "PUT",
                    body: product
                })
            },
            invalidatesTags: ['ProductPropertyValues'],
        }),
        deleteProductPropertyValue: build.mutation<any, number>({
            query: (id) => {
                return ({
                    url: `/product-properties/${id}`,
                    method: "DELETE",
                })
            },
            invalidatesTags: ['ProductPropertyValues'],
        }),
    }),
})

// Export hooks for usage in function components, which are
// auto-generated based on the defined endpoints
export const { useCreateProductPropertyValueMutation, useDeleteProductPropertyValueMutation, useGetProductPropertyValueByIdQuery, useGetProductPropertyValuesQuery, useLazyGetProductPropertyValueByIdQuery, useLazyGetProductPropertyValuesQuery, useUpdateProductPropertyValueMutation } = productPropertyValuesApi