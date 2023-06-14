'use client'
import { useFetchAllCategoriesQuery } from "@/api/categories";
import { useFetchAllPropertiesQuery } from "@/api/properties";
import { BorderCard, Button, Checkbox, Col, Dropdown, Field, Row, RowBetween, Table, TableMenuIcon } from "@/ui-kit";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

export default function Home() {

  const { data: properties, refetch } = useFetchAllPropertiesQuery({page:0,limit:10})
  const router = useRouter()

  useEffect(() => {
    refetch()
  }, [])

  return (
    <Col>
      <RowBetween>
        <h1>Характеристики</h1>
        <Button color="green" onClick={() => router.push("/properties/add")}>Добавить</Button>
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
              <th>Характеристика</th>
              <th>Единица измерения</th>
            </tr>
          </thead>
          <tbody>
            {[...(properties?.data || [])].sort((a,b) => a.property_id - b.property_id).map(item => {
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
                  <td className="black-500">{item.name}</td>
                  <td className="black-500">{item?.property_type?.type_name}</td>
                </tr>
              )
            })}

          </tbody>
        </Table>
      </Row>
    </Col >
  )
}
