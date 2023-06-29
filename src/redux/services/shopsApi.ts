import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'
import { IShop } from '../../types/models/types'

// Define a service using a base URL and expected endpoints
export const shopsApi = createApi({
    reducerPath: 'shopsApi',
    baseQuery: fetchBaseQuery({ baseUrl: "http://localhost:5000/api" }),
    tagTypes: ["Shops"],
    endpoints: (build) => ({
        getShops: build.query<{ data: IShop[], message: string, count: number, page: string }, any>({
            query: (params) => ({
                url: `/shops`,
                params: params,
                headers: {
                    Authorization: `Bearer ${JSON.parse(localStorage.getItem("token") || "")}`
                }
            }),
            providesTags: (result, error, arg) =>
                result
                    ? [...result.data.map(({ shop_id }) =>
                        ({ type: 'Shops' as const, id: shop_id })), 'Shops']
                    : ['Shops'],
        }),
        getShopById: build.query<{ data: IShop, message: string }, number>({
            query: (id) => ({
                url: `/shops/${id}?extend=file`,
                headers: {
                    Authorization: `Bearer ${JSON.parse(localStorage.getItem("token") || "")}`
                }
            }),
            providesTags: (result, error, arg) => [{ type: 'Shops' as const, id: result?.data?.shop_id }],
        }),
        updateShop: build.mutation<any, IShop>({
            query: (shop) => {

                return ({
                    url: `/shops/${shop.shop_id}`,
                    method: "PUT",
                    body: shop,
                    headers: {
                        Authorization: `Bearer ${JSON.parse(localStorage.getItem("token") || "")}`
                    }
                })
            },
            invalidatesTags: ['Shops'],
        }),
        createShop: build.mutation<any, Omit<IShop, 'shop_id'>>({
            query: (shop) => {

                return ({
                    url: `/shops`,
                    method: "POST",
                    body: shop,
                    headers: {
                        Authorization: `Bearer ${JSON.parse(localStorage.getItem("token") || "")}`
                    }
                })
            },
            invalidatesTags: ['Shops'],
        }),
        deleteShop: build.mutation<any, number>({
            query: (id) => {
                return ({
                    url: `/shops/${id}`,
                    method: "DELETE",
                    headers: {
                        Authorization: `Bearer ${JSON.parse(localStorage.getItem("token") || "")}`
                    }
                })
            },
            invalidatesTags: ['Shops'],
        }),
    }),
})

// Export hooks for usage in function components, which are
// auto-generated based on the defined endpoints
export const { useDeleteShopMutation, useUpdateShopMutation, useCreateShopMutation, useGetShopsQuery, useGetShopByIdQuery, useLazyGetShopsQuery, useLazyGetShopByIdQuery } = shopsApi