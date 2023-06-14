'use client'
import { useFetchAllCategoriesQuery } from "@/api/categories";
import { BorderCard, Button, Checkbox, Col, Dropdown, Field, Row, RowBetween, Table, TableMenuIcon } from "@/ui-kit";
import Paginator from "@/ui-kit/Paginator/Paginator";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

export default function Home() {

  const { data: categories, refetch } = useFetchAllCategoriesQuery({ page: 0, limit: 20 })
  const router = useRouter()

  useEffect(() => {
    refetch()
  }, [categories])

  return (
    <Col>
      <RowBetween>
        <h1>Категории товаров</h1>
        <Button color="green" onClick={() => router.push("/categories/add")}>Добавить</Button>
      </RowBetween>
      <RowBetween>
        <Field placeholder="Поиск по названию" />
      </RowBetween>
      <Row>
        <Table>
          <thead>
            <tr>
              <th></th>
              <th>ID</th>
              <th>Название категории</th>
              <th>Активность</th>
              <th>Конечная категория?</th>
              <th>Фото</th>
              <th>Родительская категория</th>
            </tr>
          </thead>
          <tbody>
            {categories?.data.map(item => {
              return (
                <tr key={item.category_id}>
                  <td>
                    <Dropdown>
                      <div>
                        <TableMenuIcon />
                      </div>
                      <div>
                        <div onClick={() => console.log("hello")}>Активировать</div>
                        <div onClick={() => router.push(`categories/${item.category_id}`)}>Изменить</div>
                        <div className="danger-hover">Удалить</div>
                      </div>
                    </Dropdown>
                  </td>
                  <td className="gray">{item.category_id}</td>
                  <td className="black-500">{item.name}</td>
                  <td>
                    {item.is_active && <img src="img/icons/checked.svg" width={18} />}

                    {/* <Checkbox disabled checked={item.is_end} /> */}
                  </td>
                  <td>
                    {item.is_end && <img src="img/icons/checked.svg" width={18} />}

                    {/* <Checkbox disabled checked={item.is_end} /> */}
                  </td>
                  <td>
                    <div style={{ maxWidth: 50, maxHeight: 50, width: "50px", height: "50px", borderRadius: 10, overflow: "hidden", border: "1px solid #d3d3d378" }}>
                      <img style={{ objectFit: "contain", width: "100%", height: "100%" }} src={"http://localhost:5000/" + item.photo} alt="" />
                    </div>
                  </td>
                  <td>{item?.parent?.name}</td>
                </tr>
              )
            })}

          </tbody>
        </Table>
      </Row>
      <Paginator pageCount={10} />
    </Col >
  )
}
