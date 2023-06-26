import { useState } from "react"

export const useFileField = () => {

    const [file, setFile] = useState<FileList | File | null>()
    const [fileUrl, setFileUrl] = useState<string | undefined>()

    const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {

        const loadedFile: any = e.target.files?.length ? e.target.files[0] : null

        setFile(loadedFile)
        setFileUrl(loadedFile ? URL.createObjectURL(loadedFile) : "")
    }

    return {
        fileUrl,
        state: {
            onChange
        }
    }

}