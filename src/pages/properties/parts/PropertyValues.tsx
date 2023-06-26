import { FC, useState } from "react";
import { useCreatePropValueMutation, useDeletePropValueMutation, useGetPropValuesQuery } from "../../../redux/services/propValuesApi";
import { Button, Dropdown, Field,  Stack, Table, TableMenuIcon } from "../../../ui";

interface Props {
    property_id: number
}

const PropertyValues: FC<Props> = ({ property_id }) => {

    const { data: propertyValues, isLoading } = useGetPropValuesQuery({ "filter[property_id]": property_id })
    const [deletePropertyValue] = useDeletePropValueMutation()
    const [createPropertyValue] = useCreatePropValueMutation()

    const [name, setName] = useState("")

    const handleDelete = async (id: number) => {
        await deletePropertyValue(id)
    }

    const handlePropertyValueCreate = async () => {
        await createPropertyValue({
            name,
            is_active: true,
            property_id
        })
    }

    return !isLoading ? (
        <Stack flexDirection="column" gap={3}>
            <h2>Значения характеристики</h2>
            <Stack gap={3} justifyContent="space-between" alignItems="center">
                <Field placeholder="Введите значение" label='Наименование значения характеристики' value={name} onChange={(e) => setName(e.target.value)} />
                <Button type='button' onClick={() => handlePropertyValueCreate()}>Добавить</Button>
            </Stack>
            <Table>
                <thead>
                    <tr>
                        <th></th>
                        <th>ID</th>
                        <th>Значение характеристики</th>
                    </tr>
                </thead>
                <tbody>
                    {propertyValues?.data.map(item => {
                        return (
                            <tr key={item.property_value_id}>
                                <td>
                                    <Dropdown>
                                        <div>
                                            <TableMenuIcon />
                                        </div>
                                        <div>
                                            <div onClick={() => handleDelete(item.property_value_id)} className="danger-hover">Удалить</div>

                                        </div>
                                    </Dropdown>
                                </td>
                                <td className="black-500">{item.property_value_id}</td>
                                <td className="black-500">{item.name}</td>
                            </tr>
                        )
                    })}
                    <tr>
                        <td>
                            <div>
                                <TableMenuIcon />
                            </div>
                        </td>
                        <td></td>
                        <td></td>
                    </tr>
                </tbody>
            </Table>
        </Stack>
    ) : null
}


export default PropertyValues