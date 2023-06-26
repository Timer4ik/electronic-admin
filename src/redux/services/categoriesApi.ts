import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'
import { ICategory } from '../../types/models/types'

// Define a service using a base URL and expected endpoints
export const categoriesApi = createApi({
    reducerPath: 'categoriesApi',
    baseQuery: fetchBaseQuery({ baseUrl: "http://localhost:5000/api" }),
    tagTypes: ["Categories"],
    endpoints: (build) => ({
        getCategories: build.query<{ data: ICategory[], message: string, count: number, page: string }, any>({
            query: (params) => ({
                url: `/categories`,
                params: params,
                headers: {
                    Authorization: `Bearer ${JSON.parse(localStorage.getItem("token") || "")}`
                }
            }),
            providesTags: (result, error, arg) =>
                result
                    ? [...result.data.map(({ category_id }) =>
                        ({ type: 'Categories' as const, id: category_id })), 'Categories']
                    : ['Categories'],
        }),
        getCategoryById: build.query<{ data: ICategory, message: string }, number>({
            query: (id) => ({
                url: `/categories/${id}?extend=file`,
                headers: {
                    Authorization: `Bearer ${JSON.parse(localStorage.getItem("token") || "")}`
                }
            }),
            providesTags: (result, error, arg) => [{ type: 'Categories' as const, id: result?.data?.category_id }],
        }),
        updateCategory: build.mutation<any, ICategory>({
            query: (category) => {

                return ({
                    url: `/categories/${category.category_id}`,
                    method: "PUT",
                    body: category,
                    headers: {
                        Authorization: `Bearer ${JSON.parse(localStorage.getItem("token") || "")}`
                    }
                })
            },
            invalidatesTags: ['Categories'],
        }),
        createCategory: build.mutation<any, Omit<ICategory, 'category_id'>>({
            query: (category) => {

                return ({
                    url: `/categories`,
                    method: "POST",
                    body: category,
                    headers: {
                        Authorization: `Bearer ${JSON.parse(localStorage.getItem("token") || "")}`
                    }
                })
            },
            invalidatesTags: ['Categories'],
        }),
        deleteCategory: build.mutation<any, number>({
            query: (id) => {
                return ({
                    url: `/categories/${id}`,
                    method: "DELETE",
                    headers: {
                        Authorization: `Bearer ${JSON.parse(localStorage.getItem("token") || "")}`
                    }
                })
            },
            invalidatesTags: ['Categories'],
        }),
    }),
})

// Export hooks for usage in function components, which are
// auto-generated based on the defined endpoints
export const { useDeleteCategoryMutation, useUpdateCategoryMutation, useCreateCategoryMutation, useGetCategoriesQuery, useGetCategoryByIdQuery, useLazyGetCategoriesQuery, useLazyGetCategoryByIdQuery } = categoriesApi