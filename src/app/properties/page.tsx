'use client'
import { useFetchAllCategoriesQuery } from "@/api/categories";
import { useDeletePropertyByIdMutation, useFetchAllPropertiesQuery, useUpdatePropertyMutation } from "@/api/properties";
import { IProperty } from "@/types/models/types";
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

  const { data: properties, refetch } = useFetchAllPropertiesQuery({
    page: 0,
    limit: 10,
    extend: "property_type",
    like: likeValue || ""
  })

  const [updateProperty] = useUpdatePropertyMutation()
  const [deletePropertyById] = useDeletePropertyByIdMutation()

  const router = useRouter()

  useEffect(() => {
    refetch()
  }, [])

  const handleDelete = async (id: number) => {
    await deletePropertyById(id)
    refetch()
  }

  const handleToggleActive = async (property: IProperty) => {
    let activeProperty: IProperty = { ...property, is_active: !property.is_active }
    await updateProperty(activeProperty)
    refetch()
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
          onChange={(e) => changeSearchValue(e.target.value)} />
      </RowBetween>
      <Row>
        <Table>
          <thead>
            <tr>
              <th></th>
              <th>ID</th>
              <th>Активность</th>
              <th>Характеристика</th>
              <th>Единица измерения</th>
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
                        <div onClick={() => console.log("hello")}>Активировать</div>
                        <div onClick={() => router.push(`/properties/${item.property_id}`)}>Изменить</div>
                        <div className="danger-hover">Удалить</div>
                      </div>
                    </Dropdown>
                  </td>
                  <td className="gray">{item.property_id}</td>
                  <td>
                    {item.is_active && <img src="img/icons/checked.svg" width={18} />}

                    {/* <Checkbox disabled checked={item.is_end} /> */}
                  </td>
                  <td className="black-500">{item.name}</td>
                  <td className="black-500">{item?.property_type?.type_name}</td>
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
