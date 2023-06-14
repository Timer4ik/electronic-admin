import { useApi } from "./useApi";

export async function fetchProducts(id: number) {

    const { getProducts } = useApi()

    const res = await getProducts(id)

    const { data }: { data: ProductItem[] } = await res.json()

    if (!res.ok) {
        // This will activate the closest `error.js` Error Boundary
        throw new Error('Failed to fetch data');
    }

    return data
}
