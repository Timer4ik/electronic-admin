import { useRouter } from 'next/navigation'
import React, { useEffect } from 'react'

const CategoryEditPage = () => {

    const router = useRouter()
    router.push("/categories")

    return (
        <div>
         
        </div>
    )
}

export default CategoryEditPage


