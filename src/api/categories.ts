import type { ICategory } from '@/types/models/types'
import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'

// Define a service using a base URL and expected endpoints
export const categoriesApi = createApi({
    reducerPath: 'categoriesApi',
    baseQuery: fetchBaseQuery({ baseUrl: "http://localhost:5000/api" }),
    endpoints: (build) => ({
        fetchAllCategories: build.query<{ data: ICategory[], message: string },  { page?: number, limit?: number }>({
            query: ({page,limit}) => ({
                url: `/categories?extendParent=true`,
                params:{
                    page:page || 0,
                    limit:limit || 8
                }

            }),
        }),
        fetchCategoryById: build.query<{ data: ICategory, message: string }, number>({
            query: (id) => ({
                url: `/categories/${id}`,
            }),
        }),
        updateCategory: build.mutation<any, ICategory>({
            query: (category) => {

                const formData = new FormData()
                formData.append("name", category.name)
                formData.append("desc", category.desc || "")
                formData.append("is_end", category.is_end.toString())
                formData.append("is_active", category.is_active.toString())
                formData.append("parent_id", category.parent_id.toString())
                if (category.photo){
                    formData.append("photo", category.photo)
                }

                return ({
                    url: `/categories/${category.category_id}`,
                    method: "PUT",
                    body: formData
                })
            },
        }),
        createCategory: build.mutation<any, Omit<ICategory, 'category_id'>>({
            query: (category) => {

                const formData = new FormData()
                formData.append("name", category.name)
                formData.append("desc", category.desc || "")
                formData.append("is_end", category.is_end.toString())
                formData.append("is_active", category.is_active.toString())
                formData.append("parent_id", category.parent_id.toString())
                if (category.photo){
                    formData.append("photo", category.photo)
                }
                return ({
                    url: `/categories`,
                    method: "POST",
                    body: formData
                })
            },
        }),
    }),
})

// Export hooks for usage in function components, which are
// auto-generated based on the defined endpoints
export const { useFetchAllCategoriesQuery, useFetchCategoryByIdQuery, useUpdateCategoryMutation,useCreateCategoryMutation } = categoriesApi