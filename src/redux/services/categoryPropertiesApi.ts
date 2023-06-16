import type { ICategoryProperty } from '@/types/models/types'
import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'

// Define a service using a base URL and expected endpoints
export const categoryPropertiesApi = createApi({
    reducerPath: 'categoryPropertiesApi',
    baseQuery: fetchBaseQuery({ baseUrl: "http://localhost:5000/api" }),
    endpoints: (build) => ({
        fetchAllCategoryProperties: build.query<{ data: ICategoryProperty[], message: string, count: number, page: string }, any>({
            query: (params) => ({
                url: `/category-properties`,
                params: params
            }),
        }),
        createCategoryProperty: build.mutation<any, Omit<ICategoryProperty, 'category_property_id'>>({
            query: (category) => {

                return ({
                    url: `/category-properties`,
                    method: "POST",
                    body: category
                })
            },
        }),
        deleteCategoryProperty: build.mutation<any, number>({
            query: (id) => {
                return ({
                    url: `/category-properties/${id}`,
                    method: "DELETE",
                })
            },
        }),
    }),
})

// Export hooks for usage in function components, which are
// auto-generated based on the defined endpoints
export const { useFetchAllCategoryPropertiesQuery, useCreateCategoryPropertyMutation, useDeleteCategoryPropertyMutation } = categoryPropertiesApi