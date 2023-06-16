import type { IProductPhoto } from '@/types/models/types'
import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'

// Define a service using a base URL and expected endpoints
export const productPhotosApi = createApi({
    reducerPath: 'productPhotosApi',
    baseQuery: fetchBaseQuery({ baseUrl: "http://localhost:5000/api" }),
    endpoints: (build) => ({
        fetchAllProductPhotos: build.query<{ data: IProductPhoto[], message: string, count: number, page: string }, any>({
            query: (params) => ({
                url: `/product-photos`,
                params: params
            }),
        }),
        fetchProductPhotoById: build.query<{ data: IProductPhoto, message: string, page: string }, { id: number, params: any }>({
            query: ({ id, params }) => ({
                url: `/product-photos/${id}`,
                params: params
            }),
        }),
        createProductPhoto: build.mutation<any, Omit<IProductPhoto, 'product_photo_id'>>({
            query: (product) => {
                return ({
                    url: `/product-photos`,
                    method: "POST",
                    body: product
                })
            },
        }),
        updateProductPhoto: build.mutation<any, IProductPhoto>({
            query: (product) => {
                return ({
                    url: `/product-photos/${product.product_photo_id}`,
                    method: "PUT",
                    body: product
                })
            },
        }),
        deleteProductPhotoById: build.mutation<any, number>({
            query: (id) => {
                return ({
                    url: `/product-photos/${id}`,
                    method: "DELETE",
                })
            },
        }),
    }),
})

// Export hooks for usage in function components, which are
// auto-generated based on the defined endpoints
export const { useCreateProductPhotoMutation, useDeleteProductPhotoByIdMutation, useFetchAllProductPhotosQuery, useFetchProductPhotoByIdQuery, useLazyFetchAllProductPhotosQuery, useLazyFetchProductPhotoByIdQuery, useUpdateProductPhotoMutation } = productPhotosApi