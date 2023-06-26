import React, { FC, useEffect, useState } from 'react'
import { useGetCategoryPropertiesQuery } from '../../../redux/services/categoryPropertiesApi'
import { useCreateProductPropertyValueMutation, useDeleteProductPropertyValueMutation, useGetProductPropertyValuesQuery } from '../../../redux/services/productPropertyValuesApi'
import { ICategoryProperty, IPropertyValue } from '../../../types/models/types'
import { useGetPropValuesQuery } from '../../../redux/services/propValuesApi'
import { Button, Dropdown, Select, Stack, Table, TableMenuIcon } from '../../../ui'
import { SelectOption } from '../../../ui/Select/Select'

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
        "extend": "category_property.property,property_value",

    })

    const [createProductPropertyValue] = useCreateProductPropertyValueMutation()
    const [deleteProductPropertyValue] = useDeleteProductPropertyValueMutation()

    const [selectedCategoryProperty, setSelecterProperty] = useState<ICategoryProperty | null>(null)

    const [selectedPropertyValue, setSelecterPropertyValue] = useState<IPropertyValue | null>(null)

    const { data: propertyValues, isLoading: propertyValueIsLoading } = useGetPropValuesQuery({
        ...{ "filter[property_id]": selectedCategoryProperty?.category_property_id || 0 }
    })

    const handleDeleteProductPropertyValue = async (id: number) => {
        await deleteProductPropertyValue(id)
    }

    const handleAddProductPropertyValue = async () => {
        if (!product_id || !selectedCategoryProperty?.property_id || !selectedPropertyValue?.property_id) return
        await createProductPropertyValue({
            is_active: true,
            product_id,
            category_property_id: selectedCategoryProperty?.category_property_id || 0,
            property_value_id: selectedPropertyValue?.property_value_id || 0,
        })
    }

    useEffect(() => {
        setSelecterPropertyValue(null)
    }, [selectedCategoryProperty])

    return !categoryPropetiesIsLoading &&
        !productPropertyValuesIsLoading &&
        !propertyValueIsLoading ? (
        <Stack flexDirection="column" gap={3}>
            <h2>Характеристики товара</h2>
            <Stack justifyContent='space-between' alignItems='flex-end' gap={5}>
                <Select
                    label='Характеристика'
                    onChange={(item) => setSelecterProperty(item)}
                    value={selectedCategoryProperty}
                >
                    <SelectOption value={null}>Не выбрано</SelectOption>
                    {categoryPropeties?.data?.map(catProperty => {
                        return (
                            <SelectOption key={catProperty.category_property_id} value={catProperty}>{catProperty?.name || catProperty?.property?.name}</SelectOption>
                        )
                    })}

                </Select>
                <Select
                    label='Значение'
                    onChange={(item) => setSelecterPropertyValue(item)}
                    value={selectedPropertyValue}
                >
                    <SelectOption value={null}>Не выбрано</SelectOption>
                    {propertyValues?.data?.map(item => {
                        return <SelectOption key={item.property_value_id} value={item}>{item.name}</SelectOption>
                    })}
                </Select>
                <Stack justifyContent='space-between' alignItems='center'>
                    <div></div>
                    <Button type='button' color='green' onClick={() => handleAddProductPropertyValue()}>Добавить</Button>
                </Stack>
            </Stack>

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
                            <td>{item?.category_property?.name || item?.category_property?.property?.name}</td>
                            <td>{item?.property_value?.name}</td>
                        </tr>
                    ))}
                </tbody>
            </Table>
        </Stack>
    ) : null
}

export default ProductProperties