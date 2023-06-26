import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'
import { IFile } from '../../types/models/types'

// Define a service using a base URL and expected endpoints
export const filesApi = createApi({
    reducerPath: 'filesApi',
    baseQuery: fetchBaseQuery({ baseUrl: "http://localhost:5000/api" }),
    endpoints: (build) => ({
        createFile: build.mutation<IFile, any>({
            query: (file) => {

                const formData = new FormData()

                formData.append("file", file.file)
                
                return ({
                    url: `/files`,
                    method: "POST",
                    body: formData
                })
            },
            transformResponse: (response: { data: IFile,message:string }, meta, arg) => response.data,
        }),
    }),
})

// Export hooks for usage in function components, which are
// auto-generated based on the defined endpoints
export const { useCreateFileMutation } = filesApi