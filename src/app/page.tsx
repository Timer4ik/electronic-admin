'use client'
import { Card, Stack } from "@/components/ui"


const CategoryEditPage = () => {
    return (
        <div style={{
            display:"flex",
            justifyContent:"center",
            alignItems:"center",
            height:"100vh"
        }}>
            <Card>
                <Stack flexDirection={"column"} gap={2} marginY={1}>
                    <button>1</button>
                    <button>2</button>
                    <button>3</button>
                </Stack>
            </Card>
        </div>
    )
}

export default CategoryEditPage


