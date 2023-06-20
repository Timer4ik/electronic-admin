import type { ISlider } from '@/types/models/types'
import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'

// Define a service using a base URL and expected endpoints
export const slidersApi = createApi({
    reducerPath: 'slidersApi',
    baseQuery: fetchBaseQuery({ baseUrl: "http://26.13.70.202:5000/api" }),
    tagTypes: ["Sliders"],
    endpoints: (build) => ({
        getSliders: build.query<{ data: ISlider[], message: string, count: number }, any>({
            query: (params) => ({
                url: `/sliders`,
                params: params

            }),
            providesTags: (result, error, arg) =>
                result
                    ? [...result.data.map(({ slider_id }) =>
                        ({ type: 'Sliders' as const, id: slider_id })), 'Sliders']
                    : ['Sliders'],
        }),
        getSliderById: build.query<{ data: ISlider, message: string }, { id: number, params: any }>({
            query: ({ id, params }) => ({
                url: `/sliders/${id}`,
                params: params
            }),
            providesTags: (result, error, arg) => [{ type: 'Sliders' as const, id: result?.data?.slider_id }],
        }),
        deleteSliderById: build.mutation<any, number>({
            query: (id) => ({
                url: `/sliders/${id}`,
                method: "DELETE"
            }),
            invalidatesTags: ['Sliders'],
        }),
        updateSliderById: build.mutation<any, ISlider>({
            query: (developer) => {
                return ({
                    url: `/sliders/${developer.slider_id}`,
                    method: "PUT",
                    body: developer
                })
            },
            invalidatesTags: ['Sliders'],
        }),
        createSlider: build.mutation<any, Omit<ISlider, 'slider_id'>>({
            query: (developer) => {
                return ({
                    url: `/sliders`,
                    method: "POST",
                    body: developer
                })
            },
            invalidatesTags: ['Sliders'],
        }),
    }),
})

// Export hooks for usage in function components, which are
// auto-generated based on the defined endpoints
export const { useGetSlidersQuery, useLazyGetSlidersQuery, useCreateSliderMutation, useDeleteSliderByIdMutation, useGetSliderByIdQuery, useLazyGetSliderByIdQuery, useUpdateSliderByIdMutation } = slidersApi