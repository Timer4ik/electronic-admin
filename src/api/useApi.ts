import axios, { AxiosRequestConfig, AxiosResponse } from "axios"


export const useApi = () => {

    const API_URL = "http://localhost:5000"

    const baseFetch = (url: string, options: AxiosRequestConfig<any>): Promise<AxiosResponse<any, any>> => {

        return axios.request({
            ...options,
            url: API_URL + url,
        })
    }

    return {
        async getSliders(options: AxiosRequestConfig<any> = {}) {
            return baseFetch("/api/sliders", options)
        },
        async getCategories(options: AxiosRequestConfig<any> = {}) {
            return baseFetch(`/api/categories`, options)
        },
        async getProducts(id: number, options: AxiosRequestConfig<any> = {}) {
            return baseFetch(`/api/products?filter[category_id]=${id}`, options)
        }

    }
}