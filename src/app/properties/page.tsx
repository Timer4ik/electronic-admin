'use client'
import { useDeletePropertyByIdMutation, useFetchAllPropertiesQuery, useUpdatePropertyMutation } from "@/redux/services/propertiesApi";
import useDebounce from "@/hooks/useDebounce";
import { IProperty } from "@/types/models/types";
import { Button, Col, Dropdown, Field, Row, RowBetween, Table, TableMenuIcon } from "@/components/ui";
import Paginator from "@/components/ui/Paginator/Paginator";
import { useRouter } from "next/navigation";
import { useState } from "react";

export default function Home() {

  const router = useRouter()

  // pagination
  const [limit, setLimit] = useState(10)
  const [currentPage, setCurrentPage] = useState(0)

  // filter - search
  const [searchValue, setSearchValue] = useState<string>("")
  const debouncedSearchValue = useDebounce(searchValue, 800)

  // table data
  const { data: properties } = useFetchAllPropertiesQuery({
    page: 0,
    limit: 10,
    extend: "property_values",
    like: debouncedSearchValue || ""
  })

  // menu  

  const [updateProperty] = useUpdatePropertyMutation()
  const [deletePropertyById] = useDeletePropertyByIdMutation()

  const handleDelete = async (id: number) => {
    await deletePropertyById(id)
  }

  const handleToggleActive = async (property: IProperty) => {
    let activeProperty: IProperty = { ...property, is_active: !property.is_active }
    await updateProperty(activeProperty)
  }

  const handlePageChange = (page: number) => {
    setCurrentPage(page)
  }

  return (
    <Col>
      <RowBetween>
        <h1>Характеристики</h1>
        <Button color="green" onClick={() => router.push("/properties/add")}>Добавить</Button>
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
              <th>Характеристика</th>
            </tr>
          </thead>
          <tbody>
            {[...(properties?.data || [])].sort((a, b) => a.property_id - b.property_id).map(item => {
              return (
                <tr key={item.property_id}>
                  <td>
                    <Dropdown>
                      <div>
                        <TableMenuIcon />
                      </div>
                      <div>
                        <div onClick={() => handleToggleActive(item)}>{item.is_active ? "Деактивировать" : "Активировать"}</div>
                        <div onClick={() => router.push(`/properties/${item.property_id}`)}>Изменить</div>
                        <div onClick={() => handleDelete(item.property_id)} className="danger-hover">Удалить</div>
                      </div>
                    </Dropdown>
                  </td>
                  <td className="gray">{item.property_id}</td>
                  <td>
                    {item.is_active && <img src="img/icons/checked.svg" width={18} />}
                  </td>
                  <td className="black-500">{item.name}</td>
                </tr>
              )
            })}
          </tbody>
        </Table>
      </Row>
      <Paginator onClick={handlePageChange} currentPage={currentPage} pageCount={((properties?.count ?? 0) / limit) || 0} />
    </Col >
  )
}
