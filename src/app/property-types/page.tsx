'use client'
import { useDeletePropTypeMutation, useGetPropTypesQuery, useUpdatePropTypeMutation } from "@/redux/services/propTypesApi";
import useDebounce from "@/hooks/useDebounce";
import { IPropertyType } from "@/types/models/types";
import { Button, Col, Dropdown, Field, Row, RowBetween, Table, TableMenuIcon } from "@/components/ui";
import Paginator from "@/components/ui/Paginator/Paginator";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

export default function Home() {

  const router = useRouter()

  // pagination
  const [limit, setLimit] = useState(8)
  const [currentPage, setCurrentPage] = useState(1)

  // filter - search
  const [searchValue, setSearchValue] = useState<string>("")
  const debouncedSearchValue = useDebounce(searchValue, 800)

  const { data: propertyTypes } = useGetPropTypesQuery({
    page: currentPage-1,
    limit: limit,
    like: debouncedSearchValue || ""
  })

  // menu  
  const [deletePropertyType] = useDeletePropTypeMutation()
  const [updatePropertyType] = useUpdatePropTypeMutation()

  const handleDelete = async (id: number) => {
    await deletePropertyType(id)
  }

  const handleToggleActive = async (propertyType: IPropertyType) => {
    let activePropertyType: IPropertyType = { ...propertyType, is_active: !propertyType.is_active }
    await updatePropertyType(activePropertyType)
  }

  const handlePageChange = (page: number) => {
    setCurrentPage(page)
  }

  return (
    <Col>
      <RowBetween>
        <h1>Единицы измерения</h1>
        <Button color="green" onClick={() => router.push("/property-types/add")}>Добавить</Button>
      </RowBetween>
      <RowBetween>
        <Field
          placeholder="Поиск по названию"
          value={searchValue}
          onChange={(e) => setSearchValue(e.target.value)} />
      </RowBetween>
      <Row>
        <Table>
          <thead>
            <tr>
              <th></th>
              <th>ID</th>
              <th>Активность</th>
              <th>Название единицы измерения</th>
              <th>Обозначение</th>
            </tr>
          </thead>
          <tbody>
            {propertyTypes?.data.map(item => {
              return (
                <tr key={item.property_type_id}>
                  <td>
                    <Dropdown>
                      <div>
                        <TableMenuIcon />
                      </div>
                      <div>
                        <div onClick={() => handleToggleActive(item)}>{item.is_active ? "Деактивировать" : "Активировать"}</div>
                        <div onClick={() => router.push(`/property-types/${item.property_type_id}`)}>Изменить</div>
                        <div onClick={() => handleDelete(item.property_type_id)} className="danger-hover">Удалить</div>

                      </div>
                    </Dropdown>
                  </td>
                  <td className="gray">{item.property_type_id}</td>
                  <td>
                    {item.is_active && <img src="img/icons/checked.svg" width={18} />}
                  </td>
                  <td className="black-500">{item.type_name}</td>
                  <td className="black-500">{item.unit_type}</td>
                </tr>
              )
            })}
          </tbody>
        </Table>
      </Row>
      <Paginator onClick={handlePageChange} currentPage={currentPage} pageCount={Math.round(((propertyTypes?.count ?? 0) / limit) || 0)} />

    </Col >
  )
}
