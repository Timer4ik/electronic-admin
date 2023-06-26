import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'
import { ICategoryProperty } from '../../types/models/types'

// Define a service using a base URL and expected endpoints
export const categoryPropertiesApi = createApi({
    reducerPath: 'categoryPropertiesApi',
    baseQuery: fetchBaseQuery({ baseUrl: "http://localhost:5000/api" }),
    tagTypes: ["CategoryProperties"],
    endpoints: (build) => ({
        getCategoryProperties: build.query<{ data: ICategoryProperty[], message: string, count: number, page: string }, any>({
            query: (params) => ({
                url: `/category-properties`,
                params: params
            }),
            providesTags: (result, error, arg) =>
                result
                    ? [...result.data.map(({ category_property_id }) =>
                        ({ type: 'CategoryProperties' as const, id: category_property_id })), 'CategoryProperties']
                    : ['CategoryProperties'],

        }),
        createCategoryProperty: build.mutation<any, Omit<ICategoryProperty, 'category_property_id'>>({
            query: (category) => {

                return ({
                    url: `/category-properties`,
                    method: "POST",
                    body: category
                })
            },
            invalidatesTags: ['CategoryProperties'],
        }),
        deleteCategoryProperty: build.mutation<any, number>({
            query: (id) => {
                return ({
                    url: `/category-properties/${id}`,
                    method: "DELETE",
                })
            },
            invalidatesTags: ['CategoryProperties'],
        }),
    }),
})

// Export hooks for usage in function components, which are
// auto-generated based on the defined endpoints
export const { useGetCategoryPropertiesQuery, useCreateCategoryPropertyMutation, useDeleteCategoryPropertyMutation } = categoryPropertiesApi