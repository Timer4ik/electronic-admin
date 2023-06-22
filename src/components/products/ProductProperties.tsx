import { useCreateProductPhotoMutation, useDeleteProductPhotoByIdMutation, useGetProductPhotosQuery } from '@/redux/services/productPhotosApi'
import React, { FC, useEffect, useState } from 'react'
import { Button, Dropdown, Field, FileLoader, Row, RowBetween, Select, Table, TableMenuIcon } from '../ui'
import { useCreateFileMutation } from '@/redux/services/filesApi'
import Image from 'next/image'
import { useGetCategoryPropertiesQuery } from '@/redux/services/categoryPropertiesApi'
import { useCreateProductPropertyValueMutation, useDeleteProductPropertyValueMutation, useGetProductPropertyValuesQuery } from '@/redux/services/productPropertyValuesApi'
import { useGetPropValuesQuery } from '@/redux/services/propValuesApi'
import { addNotSelectedOption } from '@/utils/addNotSelectedOption'
import { SelectOption } from '../ui/Select/Select'
import { ICategoryProperty, IProperty, IPropertyValue } from '@/types/models/types'

interface Props {
    product_id: number
    category_id: number
}

const ProductProperties: FC<Props> = ({ product_id, category_id }) => {

    const { data: categoryPropeties, isLoading: categoryPropetiesIsLoading } = useGetCategoryPropertiesQuery({
        "extend": "property",
        "filter[category_id]": category_id,
    })
    const { data: productPropertyValues, isLoading: productPropertyValuesIsLoading } = useGetProductPropertyValuesQuery({
        "filter[product_id]": product_id,
        "extend": "property,property_value",

    })

    const [createProductPropertyValue] = useCreateProductPropertyValueMutation()
    const [deleteProductPropertyValue] = useDeleteProductPropertyValueMutation()

    const [selectedCategoryProperty, setSelecterProperty] = useState<ICategoryProperty | null>(null)

    const [selectedPropertyValue, setSelecterPropertyValue] = useState<IPropertyValue | null>(null)

    const { data: propertyValues, isLoading: propertyValueIsLoading } = useGetPropValuesQuery({
        ...{ "filter[property_id]": selectedCategoryProperty?.property_id || 0 }
    })

    const handleDeleteProductPropertyValue = async (id: number) => {
        await deleteProductPropertyValue(id)
    }

    const handleAddProductPropertyValue = async () => {
        if (!product_id || !selectedCategoryProperty?.property_id || !selectedPropertyValue?.property_id) return
        await createProductPropertyValue({
            is_active: true,
            product_id,
            property_id: selectedCategoryProperty?.property_id || 0,
            property_value_id: selectedPropertyValue?.property_value_id || 0,
        })
    }

    useEffect(() => {
        setSelecterPropertyValue(null)
    }, [selectedCategoryProperty])

    return !categoryPropetiesIsLoading &&
        !productPropertyValuesIsLoading &&
        !propertyValueIsLoading ? (
        <>
            <Row>
                <h2>Характеристики товара</h2>
            </Row>
            <Row>
                <Select
                    onChange={(item) => setSelecterProperty(item)}
                    value={selectedCategoryProperty}
                >
                    <SelectOption value={null}>Не выбрано</SelectOption>
                    {categoryPropeties?.data?.map(catProperty => {
                        return (
                            <SelectOption key={catProperty.category_property_id} value={catProperty}>{catProperty?.property?.name}</SelectOption>
                        )
                    })}

                </Select>
                <Select
                    onChange={(item) => setSelecterPropertyValue(item)}
                    value={selectedPropertyValue}
                >
                    <SelectOption value={null}>Не выбрано</SelectOption>
                    {propertyValues?.data?.map(item => {
                        return <SelectOption key={item.property_value_id} value={item}>{item.name}</SelectOption>
                    })}
                </Select>
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