import { FC, useState } from 'react'
import { useCreateProductPhotoMutation, useDeleteProductPhotoByIdMutation, useGetProductPhotosQuery, useUpdateProductPhotoMutation } from '../../../redux/services/productPhotosApi'
import { useCreateFileMutation } from '../../../redux/services/filesApi'
import { AdaptiveImage, Button, Col, Dropdown, Field, FileLoader, PhotoLoader, Stack, Table, TableMenuIcon } from '../../../ui'

interface Props {
    product_id: number
}

const ProductPhotos: FC<Props> = ({ product_id }) => {

    const { data: productPhotos, isLoading: productPhotosIsLoading } = useGetProductPhotosQuery({
        "filter[product_id]": product_id,
        "extend": "file"
    })
    const [createFile] = useCreateFileMutation()
    const [updateProductPhoto] = useUpdateProductPhotoMutation()
    const [createProductPhoto] = useCreateProductPhotoMutation()
    const [deleteProductPhoto] = useDeleteProductPhotoByIdMutation()

    const [photo, setPhoto] = useState<{ url: string, file: any } | null>(null)
    const [photoName, setPhotoName] = useState("0")

    const handleOnFileChange = (e: any) => {
        const files = e.target.files
        if (!files?.length) {
            return
        }
        const url = URL.createObjectURL(files[0]);
        const file = files[0]
        setPhoto({ url, file })
    }

    const handleDeleteProductPhoto = async (id: number) => {
        await deleteProductPhoto(id)
    }

    const handleAddProductPhoto = async () => {
        let file_id
        if (!photo) return
        if (photo?.file?.type) {
            let data = await createFile(photo)

            if (('error' in data)) {
                return
            }
            file_id = data?.data?.file_id
        }
        if (!file_id) return

        await createProductPhoto({
            name: photoName,
            file_id,
            product_id,
        })
    }

    const changeOrder = async (value: number, id: number) => {
        await updateProductPhoto({
            product_photo_id: id,
            name: value?.toString() || "0",
        })
    }

    return !productPhotosIsLoading ? (
        <Stack flexDirection='column' gap={3}>
            <h2>Фотографии товара</h2>
            <Stack flexDirection='column'>
                <PhotoLoader label='Выберите фотографию' onChange={handleOnFileChange} />
                {/* <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr" }}>
                    {productPhotos?.data.map(item => {
                        return (
                            <img width={60} style={{ objectFit: "contain" }} height={60} src={item.file?.link || ""} alt="" />
                        )
                    })}
                </div> */}
            </Stack>
            <Stack justifyContent='space-between' alignItems='center'>
                <Stack flexDirection='column' gap={1}>
                    {!!photo?.url && <Field noModify label={photo.file?.name} value={Math.round(photo.file?.size / 1024) + " кб"} />}
                </Stack>
                <Button type='button' onClick={() => handleAddProductPhoto()}>Добавить</Button>
            </Stack>
            <Stack>
                <Field type='number' label='Порядковый номер' value={photoName} onChange={(e) => setPhotoName(e.target.value)} />
            </Stack>
            <Table>
                <thead>
                    <tr>
                        <th>
                        </th>
                        <th>Порядок</th>
                        <th>Характеристика</th>
                    </tr>
                </thead>
                <tbody>
                    {productPhotos?.data.map(item => (
                        <tr key={item.product_photo_id}>
                            <td>
                                <Dropdown>
                                    <div>
                                        <TableMenuIcon />
                                    </div>
                                    <div>
                                        <div onClick={() => handleDeleteProductPhoto(item.product_photo_id)} className="danger-hover">Удалить</div>
                                    </div>
                                </Dropdown>
                            </td>
                            <td>
                                <Stack gap={3} alignItems='center'>
                                    <h1>{item.name || 0}</h1>
                                    <Stack flexDirection='column'>
                                        <Button type='button' color='standard' onClick={() => changeOrder(+(item?.name || 0) + 1, item.product_photo_id)} size={1}>+</Button>
                                        <Button type='button' color='standard' onClick={() => changeOrder(+(item?.name || 0) - 1, item.product_photo_id)} size={1}>-</Button>
                                    </Stack>
                                </Stack>
                            </td>
                            <td>
                                <img width={90} style={{ objectFit: "contain" }} height={90} src={item.file?.link || ""} alt="" />
                            </td>
                        </tr>
                    ))}
                </tbody>
            </Table>
        </Stack>
    ) : null
}

export default ProductPhotos