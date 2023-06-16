import type { ICategory } from '@/types/models/types'
import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'

// Define a service using a base URL and expected endpoints
export const categoriesApi = createApi({
    reducerPath: 'categoriesApi',
    baseQuery: fetchBaseQuery({ baseUrl: "http://localhost:5000/api" }),
    endpoints: (build) => ({
        fetchAllCategories: build.query<{ data: ICategory[], message: string,count:number,page:string },  any>({
            query: (params) => ({
                url: `/categories`,
                params:params
            }),
        }),
        fetchCategoryById: build.query<{ data: ICategory, message: string }, number>({
            query: (id) => ({
                url: `/categories/${id}?extend=file`,
            }),
        }),
        updateCategory: build.mutation<any, ICategory>({
            query: (category) => {

                return ({
                    url: `/categories/${category.category_id}`,
                    method: "PUT",
                    body: category
                })
            },
        }),
        createCategory: build.mutation<any, Omit<ICategory, 'category_id'>>({
            query: (category) => {

                return ({
                    url: `/categories`,
                    method: "POST",
                    body: category
                })
            },
        }),
        deleteCategory: build.mutation<any, number>({
            query: (id) => {
                return ({
                    url: `/categories/${id}`,
                    method: "DELETE",
                })
            },
        }),
    }),
})

// Export hooks for usage in function components, which are
// auto-generated based on the defined endpoints
export const { useFetchAllCategoriesQuery,useLazyFetchAllCategoriesQuery,useDeleteCategoryMutation, useFetchCategoryByIdQuery, useUpdateCategoryMutation,useCreateCategoryMutation } = categoriesApi