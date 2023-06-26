import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'
import { IProduct } from '../../types/models/types'

// Define a service using a base URL and expected endpoints
export const productsApi = createApi({
    reducerPath: 'productsApi',
    baseQuery: fetchBaseQuery({ baseUrl: "http://localhost:5000/api" }),
    tagTypes: ["Products"],
    endpoints: (build) => ({
        getProducts: build.query<{ data: IProduct[], message: string, count: number, page: string }, any>({
            query: (params) => ({
                url: `/products`,
                params: params
            }),
            providesTags: (result, error, arg) =>
                result
                    ? [...result.data.map(({ product_id }) =>
                        ({ type: 'Products' as const, id: product_id })), 'Products']
                    : ['Products'],
        }),
        getProductById: build.query<{ data: IProduct, message: string, page: string }, { id: number, params: any }>({
            query: ({ id, params }) => ({
                url: `/products/${id}`,
                params: params
            }),
            providesTags: (result, error, arg) => [{ type: 'Products' as const, id: result?.data?.product_id }],
        }),
        createProduct: build.mutation<any, Omit<IProduct, 'product_id'>>({
            query: (product) => {

                return ({
                    url: `/products`,
                    method: "POST",
                    body: product
                })
            },
            invalidatesTags: ['Products'],
        }),
        updateProduct: build.mutation<any, IProduct>({
            query: (product) => {

                return ({
                    url: `/products/${product.product_id}`,
                    method: "PUT",
                    body: product
                })
            },
            invalidatesTags: ['Products'],
        }),
        deleteProductById: build.mutation<any, number>({
            query: (id) => {
                return ({
                    url: `/products/${id}`,
                    method: "DELETE",
                })
            },
            invalidatesTags: ['Products'],
        }),
    }),
})

export const { useCreateProductMutation, useDeleteProductByIdMutation,  useUpdateProductMutation, useGetProductByIdQuery, useGetProductsQuery, useLazyGetProductByIdQuery, useLazyGetProductsQuery } = productsApi