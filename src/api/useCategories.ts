
import React, { useState } from "react"
import { useApi } from "./useApi";
import { AxiosError, AxiosRequestConfig } from "axios";

interface Category {
    category_id: number
    name: string
    photo: string
    parent_id: number
    is_end: string
}

export const useCategories = () => {

    const [categories, setCategories] = useState<Category[]>([])
    const [message, setMessage] = useState<string>("")
    const [error,setError] = useState()

    const fetchCategories = async (options: AxiosRequestConfig<any> = {}) => {

        try {
            const { getCategories } = useApi()

            const { data } = await getCategories()

            setCategories(data.data)
            setMessage(data.message)
        }
        catch (e:any) {
            console.log(e);
            setMessage(e.data.message)
        }
    }

    return {
        categories,
        fetchCategories,
        message
    }

}

