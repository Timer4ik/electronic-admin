'use client'
import { useDeleteDeveloperByIdMutation, useFetchAllDevelopersQuery, useUpdateDeveloperMutation } from "@/redux/services/developersApi";
import useDebounce from "@/hooks/useDebounce";
import { IDeveloper } from "@/types/models/types";
import { Button, Col, Dropdown, Field, Row, RowBetween, Table, TableMenuIcon } from "@/components/ui";
import Paginator from "@/components/ui/Paginator/Paginator";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

export default function Home() {

  const router = useRouter()

  // pagination
  const [limit, setLimit] = useState(10)
  const [currentPage, setCurrentPage] = useState(0)

  // filter - search
  const [searchValue, setSearchValue] = useState<string>("")
  const debouncedSearchValue = useDebounce(searchValue, 800)

  // table data
  const { data: developers, refetch } = useFetchAllDevelopersQuery({
    page: currentPage,
    limit: limit,
    extend: "file",
    like: debouncedSearchValue || ""
  })

  // menu  
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
          onChange={(e) => setSearchValue(e.target.value)} />
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
                  </td>
                  <td className="black-500">{item.name}</td>
                  <td>
                    <div className="table-photo">
                      <img src={item.file?.link} alt="" />
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
