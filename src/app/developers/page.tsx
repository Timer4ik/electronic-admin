'use client'
import { useFetchAllCategoriesQuery, useLazyFetchAllCategoriesQuery } from "@/api/categories";
import { useDeleteDeveloperByIdMutation, useFetchAllDevelopersQuery, useLazyFetchAllDevelopersQuery, useUpdateDeveloperMutation } from "@/api/developersApi";
import { IDeveloper } from "@/types/models/types";
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

  const { data: developers, refetch } = useFetchAllDevelopersQuery({
    page: currentPage,
    limit: limit,
    extend: "file",
    like: likeValue || ""
  })
  const router = useRouter()

  const [deleteDeveloper] = useDeleteDeveloperByIdMutation()
  const [updateDeveloper] = useUpdateDeveloperMutation()

  const handleDelete = async (id: number) => {
    await deleteDeveloper(id)
    refetch()
  }

  const handleToggleActive = async (developer: IDeveloper) => {
    let activeDeveloper: IDeveloper = { ...developer, is_active: !developer.is_active }
    await updateDeveloper(activeDeveloper)
    refetch()
  }

  const handlePageChange = (page: number) => {
    setCurrentPage(page)
  }

  useEffect(() => {
    refetch()
  }, [])


  return (
    <Col>
      <RowBetween>
        <h1>Производители</h1>
        <Button color="green" onClick={() => router.push("/developers/add")}>Добавить</Button>
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
              <th>Производитель</th>
              <th>Фото производителя</th>
            </tr>
          </thead>
          <tbody>
            {developers?.data.map(item => {
              return (
                <tr key={item.developer_id}>
                  <td>
                    <Dropdown>
                      <div>
                        <TableMenuIcon />
                      </div>
                      <div>
                        <div onClick={() => handleToggleActive(item)}>{item.is_active ? "Деактивировать" : "Активировать"}</div>
                        <div onClick={() => router.push(`/developers/${item.developer_id}`)}>Изменить</div>
                        <div onClick={() => handleDelete(item.developer_id)} className="danger-hover">Удалить</div>

                      </div>
                    </Dropdown>
                  </td>
                  <td className="gray">{item.developer_id}</td>
                  <td>
                    {item.is_active && <img src="img/icons/checked.svg" width={18} />}

                    {/* <Checkbox disabled checked={item.is_end} /> */}
                  </td>
                  <td className="black-500">{item.name}</td>
                  <td>
                    <div style={{ maxWidth: 50, maxHeight: 50, width: "50px", height: "50px", borderRadius: 10, overflow: "hidden", border: "1px solid #d3d3d378" }}>
                      <img style={{ objectFit: "contain", width: "100%", height: "100%" }} src={item.file?.link} alt="" />
                    </div>
                  </td>
                </tr>
              )
            })}

          </tbody>
        </Table>
      </Row>
      <Paginator onClick={handlePageChange} currentPage={currentPage} pageCount={((developers?.count ?? 0) / limit) || 0} />

    </Col >
  )
}
