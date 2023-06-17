import type { IProductPhoto } from '@/types/models/types'
import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'

// Define a service using a base URL and expected endpoints
export const productPropertiesApi = createApi({
    reducerPath: 'productPropertiesApi',
    baseQuery: fetchBaseQuery({ baseUrl: "http://localhost:5000/api" }),
    tagTypes: ["ProductProperties"],
    endpoints: (build) => ({
        getProductPhotos: build.query<{ data: IProductPhoto[], message: string, count: number, page: string }, any>({
            query: (params) => ({
                url: `/product-photos`,
                params: params
            }),
            providesTags: (result, error, arg) =>
                result
                    ? [...result.data.map(({ product_photo_id }) =>
                        ({ type: 'ProductProperties' as const, id: product_photo_id })), 'ProductProperties']
                    : ['ProductProperties'],
        }),
        getProductPhotoById: build.query<{ data: IProductPhoto, message: string, page: string }, { id: number, params: any }>({
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
            invalidatesTags: ['ProductProperties'],
        }),
        updateProductPhoto: build.mutation<any, IProductPhoto>({
            query: (product) => {
                return ({
                    url: `/product-photos/${product.product_photo_id}`,
                    method: "PUT",
                    body: product
                })
            },
            invalidatesTags: ['ProductProperties'],
        }),
        deleteProductPhotoById: build.mutation<any, number>({
            query: (id) => {
                return ({
                    url: `/product-photos/${id}`,
                    method: "DELETE",
                })
            },
            invalidatesTags: ['ProductProperties'],
        }),
    }),
})

// Export hooks for usage in function components, which are
// auto-generated based on the defined endpoints
export const { useCreateProductPhotoMutation, useDeleteProductPhotoByIdMutation, useUpdateProductPhotoMutation, useGetProductPhotoByIdQuery, useGetProductPhotosQuery, useLazyGetProductPhotoByIdQuery, useLazyGetProductPhotosQuery } = productPropertiesApi