import { ICategory } from "@/types/models/types";
import { useApi } from "./useApi";

export async function fetchSliders(): Promise<ICategory[]> {

    const { getSliders } = useApi()

    const { data } = await getSliders()

    return data
}
