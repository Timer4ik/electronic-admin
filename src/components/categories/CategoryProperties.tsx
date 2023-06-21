'use client'
import React, { FC, useEffect, useState } from 'react'
import { Button, Dropdown, Field, Row, RowBetween, Select, Table, TableMenuIcon } from '../ui'
import { useFetchAllPropertiesQuery } from '@/redux/services/propertiesApi'
import { useCreateCategoryPropertyMutation, useDeleteCategoryPropertyMutation, useGetCategoryPropertiesQuery } from '@/redux/services/categoryPropertiesApi'
import { ICategory } from '@/types/models/types'
import { SelectOption } from '../ui/Select/Select'

interface Props {
    category: ICategory
}

const CategoryProperties: FC<Props> = ({ category }) => {

    const { data: properties } = useFetchAllPropertiesQuery({
        "filter[is_active]": true
    })
    const { data: categoryProperties, isLoading: categoryPropertiesIsLoading } = useGetCategoryPropertiesQuery({
        "filter[category_id]": category.category_id,
        extend: "property"
    })

    const [createCategoryProperty] = useCreateCategoryPropertyMutation()
    const [deleteCategoryProperty] = useDeleteCategoryPropertyMutation()

    const [selectedPropertyId, setSelectedPropertyId] = useState<any>(0)
    const [categoryPropertyName, setCategoryPropertyName] = useState("")

    const handleCreateCategoryProperty = async () => {
        if (!category || selectedPropertyId <= 0) return

        await createCategoryProperty({
            category_id: category.category_id,
            property_id: selectedPropertyId,
            name: categoryPropertyName
        })
    }

    const handleDeleteCategoryProperty = (id: number) => {
        deleteCategoryProperty(id)
    }

    useEffect(() => {
        if (properties?.data?.length)
            setSelectedPropertyId(properties?.data[0]?.property_id)
    }, [properties])


    return !categoryPropertiesIsLoading ? (
        <>
            <Row>
                <h2>Характеристики</h2>
            </Row>
            <Row>
                <RowBetween>
                    <Select
                        label='Выберите характеристику'
                        value={selectedPropertyId}
                        onChange={(item) => {
                            setSelectedPropertyId(item)
                        }}
                    >
                        {properties?.data?.map(property => {
                            return (
                                <SelectOption key={property.property_id} value={property.property_id}>{property?.name}</SelectOption>
                            )
                        })}
                    </Select>
                    <Field label='Наименование' value={categoryPropertyName} onChange={(e) => setCategoryPropertyName(e.target.value)} />
                    <Button type='button' onClick={() => handleCreateCategoryProperty()}>Добавить</Button>
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
                        {categoryProperties?.data.map(item => (
                            <tr key={item.category_property_id}>
                                <td>
                                    <Dropdown>
                                        <div>
                                            <TableMenuIcon />
                                        </div>
                                        <div>
                                            <div onClick={() => handleDeleteCategoryProperty(item.category_property_id)} className="danger-hover">Удалить</div>
                                        </div>
                                    </Dropdown>
                                </td>
                                <td>{item.category_property_id}</td>
                                <td>{item.name}</td>
                                <td>{item?.property?.name}</td>
                            </tr>
                        ))}
                    </tbody>
                </Table>
            </Row>
        </>
    ) : null
}

export default CategoryProperties