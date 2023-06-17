import { useCreateProductPhotoMutation, useDeleteProductPhotoByIdMutation, useGetProductPhotosQuery } from '@/redux/services/productPhotosApi'
import React, { FC, useState } from 'react'
import { Button, Dropdown, Field, FileLoader, Row, RowBetween, Select, Table, TableMenuIcon } from '../ui'
import { useCreateFileMutation } from '@/redux/services/filesApi'
import Image from 'next/image'

interface Props {
    product_id: number
}

const ProductPhotos: FC<Props> = ({ product_id }) => {

    const { data: productPhotos, isLoading: productPhotosIsLoading } = useGetProductPhotosQuery({
        "filter[product_id]": product_id,
        "extend": "file"
    })
    const [createFile] = useCreateFileMutation()
    const [createProductPhoto] = useCreateProductPhotoMutation()
    const [deleteProductPhoto] = useDeleteProductPhotoByIdMutation()

    const [photo, setPhoto] = useState<{ url: string, file: any } | null>(null)
    const [photoName, setPhotoName] = useState("")

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

    return !productPhotosIsLoading ? (
        <>
            <Row>
                <h2>Фотографии товара</h2>
            </Row>
            <Row>
                <RowBetween>
                    <FileLoader label='Выберите фотографию' onChange={handleOnFileChange} />
                    <Field label='Наименование' value={photoName} onChange={(e) => setPhotoName(e.target.value)} />
                    <Button type='button' onClick={() => handleAddProductPhoto()}>Добавить</Button>
                </RowBetween>
            </Row>
            <Row>
                <Table>
                    <thead>
                        <tr>
                            <th>
                            </th>
                            <th>ID</th>
                            <th>Наименование</th>
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
                                <td>{item.product_photo_id}</td>
                                <td>{item.name}</td>
                                <td>
                                    <Image width={300} style={{objectFit:"contain"}} height={300} src={item.file?.link || ""} alt="" />
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </Table>
            </Row>
        </>
    ) : null
}

export default ProductPhotos