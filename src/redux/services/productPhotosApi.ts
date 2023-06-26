import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'
import { IProductPhoto } from '../../types/models/types'

// Define a service using a base URL and expected endpoints
export const productPhotosApi = createApi({
    reducerPath: 'productPhotosApi',
    baseQuery: fetchBaseQuery({ baseUrl: "http://localhost:5000/api" }),
    tagTypes: ["ProductPhotos"],
    endpoints: (build) => ({
        getProductPhotos: build.query<{ data: IProductPhoto[], message: string, count: number, page: string }, any>({
            query: (params) => ({
                url: `/product-photos`,
                params: params
            }),
            providesTags: (result, error, arg) =>
                result
                    ? [...result.data.map(({ product_photo_id }) =>
                        ({ type: 'ProductPhotos' as const, id: product_photo_id })), 'ProductPhotos']
                    : ['ProductPhotos'],
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
            invalidatesTags: ['ProductPhotos'],
        }),
        updateProductPhoto: build.mutation<any, Partial<IProductPhoto>>({
            query: (product) => {
                return ({
                    url: `/product-photos/${product.product_photo_id}`,
                    method: "PUT",
                    body: product
                })
            },
            invalidatesTags: ['ProductPhotos'],
        }),
        deleteProductPhotoById: build.mutation<any, number>({
            query: (id) => {
                return ({
                    url: `/product-photos/${id}`,
                    method: "DELETE",
                })
            },
            invalidatesTags: ['ProductPhotos'],
        }),
    }),
})

// Export hooks for usage in function components, which are
// auto-generated based on the defined endpoints
export const { useCreateProductPhotoMutation, useDeleteProductPhotoByIdMutation, useUpdateProductPhotoMutation, useGetProductPhotoByIdQuery, useGetProductPhotosQuery, useLazyGetProductPhotoByIdQuery, useLazyGetProductPhotosQuery } = productPhotosApi