'use client'
import { useDeletePropertyByIdMutation, useFetchAllPropertiesQuery, useUpdatePropertyMutation } from "../../redux/services/propertiesApi";
import { Button, Checkbox, Col, Dropdown, Field, Row, RowBetween, Table, TableMenuIcon } from "../../ui";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import useDebounce from "../../ui/hooks/useDebounce";
import { IProperty } from "../../types/models/types";
import Paginator from "../../ui/Paginator/Paginator";

export default function PropertiesPage() {

  const navigate = useNavigate()

  // pagination
  const [limit, setLimit] = useState(10)
  const [currentPage, setCurrentPage] = useState(1)

  // filter - search
  const [searchValue, setSearchValue] = useState<string>("")
  const debouncedSearchValue = useDebounce(searchValue, 800)

  // filter - isactive
  const [isActive, setIsActive] = useState(false)

  // table data
  const { data: properties } = useFetchAllPropertiesQuery({
    page: 0,
    limit: 10,
    extend: "property_values",
    ...(isActive ? {
      "filter[is_active]": isActive,
    } : {}),
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
        <Button color="green" onClick={() => navigate("/properties/add")}>Добавить</Button>
      </RowBetween>
      <Col>
        <div style={{ display: "grid", gridGap: "10px", gridTemplateColumns: "1fr 1fr 1fr" }}>
          <Field
            label="Поиск"
            placeholder="Поиск по названию"
            value={searchValue}
            onChange={(e) => setSearchValue(e.target.value)} />
        </div>
        <Checkbox label="Активность"
          checked={isActive}
          onChange={(e) => setIsActive(e.target.checked)} />
      </Col>
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
            {properties?.data.map(item => {
              return (
                <tr key={item.property_id}>
                  <td>
                    <Dropdown>
                      <div>
                        <TableMenuIcon />
                      </div>
                      <div>
                        <div onClick={() => handleToggleActive(item)}>{item.is_active ? "Деактивировать" : "Активировать"}</div>
                        <div onClick={() => navigate(`/properties/${item.property_id}`)}>Изменить</div>
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
      <Paginator onClick={handlePageChange} currentPage={currentPage} pageCount={Math.ceil((properties?.count ?? 0) / limit) || 0} />
    </Col >
  )
}
