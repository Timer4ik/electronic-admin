import { useCreateProductPhotoMutation, useDeleteProductPhotoByIdMutation, useGetProductPhotosQuery } from '@/redux/services/productPhotosApi'
import React, { FC, useEffect, useState } from 'react'
import { Button, Dropdown, Field, FileLoader, Row, RowBetween, Select, Table, TableMenuIcon } from '../ui'
import { useCreateFileMutation } from '@/redux/services/filesApi'
import Image from 'next/image'
import { useGetCategoryPropertiesQuery } from '@/redux/services/categoryPropertiesApi'
import { useCreateProductPropertyValueMutation, useDeleteProductPropertyValueMutation, useGetProductPropertyValuesQuery } from '@/redux/services/productPropertyValuesApi'
import { useGetPropValuesQuery } from '@/redux/services/propValuesApi'
import { addNotSelectedOption } from '@/utils/addNotSelectedOption'

interface Props {
    product_id: number
    category_id: number
}

const ProductProperties: FC<Props> = ({ product_id, category_id }) => {

    const { data: categoryPropeties, isLoading: categoryPropetiesIsLoading } = useGetCategoryPropertiesQuery({
        "extend": "property"
    })
    const { data: productPropertyValues, isLoading: productPropertyValuesIsLoading } = useGetProductPropertyValuesQuery({
        "filter[product_id]": product_id,
        "extend": "property,property_value",

    })



    const [createProductPropertyValue] = useCreateProductPropertyValueMutation()
    const [deleteProductPropertyValue] = useDeleteProductPropertyValueMutation()

    const [selectedCategoryProperty, setSelecterProperty] = useState<{
        content: string,
        value: number
        value2?: number
    }>({
        content: "Выбери характеристику",
        value: 0,
        value2: 0
    })

    const [selectedPropertyValue, setSelecterPropertyValue] = useState<{
        content: string,
        value: number
    }>({
        content: "Выбери значение характеристики",
        value: 0
    })

    const { data: propertyValues, isLoading: propertyValueIsLoading } = useGetPropValuesQuery({
        ...{ "filter[property_id]": selectedCategoryProperty.value }
    })

    const handleDeleteProductPropertyValue = async (id: number) => {
        await deleteProductPropertyValue(id)
    }

    const handleAddProductPropertyValue = async () => {
        if (!product_id || !selectedCategoryProperty?.value2 || !selectedPropertyValue.value) return
        await createProductPropertyValue({
            is_active: true,
            product_id,
            property_id: selectedCategoryProperty?.value2 || 0,
            property_value_id: selectedPropertyValue.value,
        })
    }
    useEffect(() => {
        setSelecterPropertyValue({
            content: "Выбери значение характеристики",
            value: 0
        })
    }, [selectedCategoryProperty])

    return !categoryPropetiesIsLoading &&
        !productPropertyValuesIsLoading &&
        !propertyValueIsLoading ? (
        <>
            <Row>
                <h2>Фотографии товара</h2>
            </Row>
            <Row>
                <Select
                    onChange={(item) => setSelecterProperty(item)}
                    selectedItem={selectedCategoryProperty}
                    options={addNotSelectedOption(categoryPropeties?.data?.map(item => {
                        return {
                            value: item.category_property_id,
                            value2: item.property_id,
                            content: item?.property?.name
                        }
                    }))} />
                <Select
                    onChange={(item) => setSelecterPropertyValue(item)}
                    selectedItem={selectedPropertyValue}
                    options={addNotSelectedOption(propertyValues?.data?.map(item => {
                        return {
                            value: item.property_value_id,
                            content: item.name
                        }
                    }))} />
                <RowBetween>
                    <div></div>
                    <Button type='button' color='green' onClick={() => handleAddProductPropertyValue()}>Добавить</Button>
                </RowBetween>
            </Row>

            <Row>
                <Table>
                    <thead>
                        <tr>
                            <th>
                            </th>
                            <th>ID</th>
                            <th>Характеристика</th>
                            <th>Значение</th>
                        </tr>
                    </thead>
                    <tbody>
                        {productPropertyValues?.data.map(item => (
                            <tr key={item.product_property_value_id}>
                                <td>
                                    <Dropdown>
                                        <div>
                                            <TableMenuIcon />
                                        </div>
                                        <div>
                                            <div onClick={() => handleDeleteProductPropertyValue(item.product_property_value_id)} className="danger-hover">Удалить</div>
                                        </div>
                                    </Dropdown>
                                </td>
                                <td>{item.product_property_value_id}</td>
                                <td>{item?.property?.name}</td>
                                <td>{item?.property_value?.name}</td>
                            </tr>
                        ))}
                    </tbody>
                </Table>
            </Row>
        </>
    ) : null
}

export default ProductProperties