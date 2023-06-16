import type { IProduct } from '@/types/models/types'
import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'

// Define a service using a base URL and expected endpoints
export const productsApi = createApi({
    reducerPath: 'productsApi',
    baseQuery: fetchBaseQuery({ baseUrl: "http://localhost:5000/api" }),
    endpoints: (build) => ({
        fetchAllProducts: build.query<{ data: IProduct[], message: string, count: number, page: string }, any>({
            query: (params) => ({
                url: `/products`,
                params: params
            }),
        }),
        fetchProductById: build.query<{ data: IProduct, message: string, page: string }, { id: number, params: any }>({
            query: ({ id, params }) => ({
                url: `/products/${id}`,
                params: params
            }),
        }),
        createProduct: build.mutation<any, Omit<IProduct, 'product_id'>>({
            query: (product) => {

                return ({
                    url: `/products`,
                    method: "POST",
                    body: product
                })
            },
        }),
        updateProduct: build.mutation<any, IProduct>({
            query: (product) => {

                return ({
                    url: `/products/${product.product_id}`,
                    method: "PUT",
                    body: product
                })
            },
        }),
        deleteProductById: build.mutation<any, number>({
            query: (id) => {
                return ({
                    url: `/products/${id}`,
                    method: "DELETE",
                })
            },
        }),
    }),
})

// Export hooks for usage in function components, which are
// auto-generated based on the defined endpoints
export const { useFetchProductByIdQuery, useCreateProductMutation, useDeleteProductByIdMutation, useFetchAllProductsQuery, useLazyFetchAllProductsQuery, useUpdateProductMutation } = productsApi