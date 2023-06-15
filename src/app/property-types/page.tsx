'use client'
import { useFetchAllCategoriesQuery } from "@/api/categories";
import { useDeletePropertyTypeMutation, useFetchAllPropertyTypesQuery, useUpdatePropertyTypeMutation } from "@/api/propertyTypes";
import { IPropertyType } from "@/types/models/types";
import { BorderCard, Button, Checkbox, Col, Dropdown, Field, Row, RowBetween, Table, TableMenuIcon } from "@/ui-kit";
import Paginator from "@/ui-kit/Paginator/Paginator";
import { debounce } from "@/utils/debounce";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

export default function Home() {

  const limit = 8
  const [currentPage, setCurrentPage] = useState(0)

  const [searchValue, setSearchValue] = useState<string>("")
  const [likeValue, setLikeValue] = useState<string>("")
  const debouncedSetLikeValue = debounce(setLikeValue, 800)

  const changeSearchValue = (value: string) => {
    setSearchValue(value)
    debouncedSetLikeValue(value)
  }

  const { data: propertyTypes, refetch } = useFetchAllPropertyTypesQuery({
    page: currentPage,
    limit: limit,
    like: likeValue || ""
  })
  const router = useRouter()

  const [deletePropertyType] = useDeletePropertyTypeMutation()
  const [updatePropertyType] = useUpdatePropertyTypeMutation()

  useEffect(() => {
    refetch()
  }, [])

  const handleDelete = async (id: number) => {
    await deletePropertyType(id)
    refetch()
  }

  const handleToggleActive = async (propertyType: IPropertyType) => {
    let activePropertyType: IPropertyType = { ...propertyType, is_active: !propertyType.is_active }
    await updatePropertyType(activePropertyType)
    refetch()
  }

  const handlePageChange = (page: number) => {
    setCurrentPage(page)
  }

  return (
    <Col>
      <RowBetween>
        <h1>Единицы измерения характеристик</h1>
        <Button color="green" onClick={() => router.push("/property-types/add")}>Добавить</Button>
      </RowBetween>
      <RowBetween>
        <Field
          placeholder="Поиск по названию"
          value={searchValue}
          onChange={(e) => changeSearchValue(e.target.value)} />
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

                    {/* <Checkbox disabled checked={item.is_end} /> */}
                  </td>
                  <td className="black-500">{item.type_name}</td>
                  <td className="black-500">{item.unit_type}</td>
                </tr>
              )
            })}

          </tbody>
        </Table>
      </Row>
      <Paginator onClick={handlePageChange} currentPage={currentPage} pageCount={((propertyTypes?.count ?? 0) / limit) || 0} />

    </Col >
  )
}
