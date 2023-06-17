'use client'
import React, { FC, useEffect, useState } from 'react'
import { Button, Dropdown, Field, Row, RowBetween, Select, Table, TableMenuIcon } from '../ui'
import { useFetchAllPropertiesQuery } from '@/redux/services/propertiesApi'
import { useCreateCategoryPropertyMutation, useDeleteCategoryPropertyMutation, useGetCategoryPropertiesQuery } from '@/redux/services/categoryPropertiesApi'
import { ICategory } from '@/types/models/types'
import { useGetCategoriesQuery } from '@/redux/services/categoriesApi'

interface Props {
    category: ICategory
}

const CategoryProperties: FC<Props> = ({ category }) => {

    const { data: properties } = useFetchAllPropertiesQuery({
        "filter[is_active]": true
    })
    const { data: categoryProperties, isLoading: categoryPropertiesIsLoading } = useGetCategoryPropertiesQuery({
        "filter[category_id]": category.category_id,
        extend: "property.property_type"
    })
    const [createCategoryProperty] = useCreateCategoryPropertyMutation()
    const [deleteCategoryProperty] = useDeleteCategoryPropertyMutation()

    const [selectedProperty, setSelectedProperty] = useState<{
        value: number
        content: string
    }>({
        value: 0,
        content: "Не выбрано"
    })
    const [categoryPropertyName, setCategoryPropertyName] = useState("")

    const handleCreateCategoryProperty = async () => {
        if (!category || selectedProperty.value <= 0) return

        await createCategoryProperty({
            category_id: category.category_id,
            property_id: selectedProperty.value,
            name: categoryPropertyName
        })

    }

    const handleDeleteCategoryProperty = (id: number) => {
        deleteCategoryProperty(id)
    }

    useEffect(() => {
        if (properties?.data?.length)
            setSelectedProperty({
                value: properties?.data[0]?.property_id || 0,
                content: properties?.data[0]?.name || "Не выбрано"
            })
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
                        selectedItem={selectedProperty}
                        options={properties?.data.map(item => {
                            return {
                                value: item.property_id,
                                content: item.name
                            }
                        })}
                        onChange={(item) => {
                            setSelectedProperty(item)
                        }}
                    />
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
                            <th>Обозначение характеристики</th>
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