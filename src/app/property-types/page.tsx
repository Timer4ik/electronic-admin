'use client'
import { useFetchAllCategoriesQuery } from "@/api/categories";
import { useFetchAllPropertyTypesQuery } from "@/api/propertyTypes";
import { BorderCard, Button, Checkbox, Col, Dropdown, Field, Row, RowBetween, Table, TableMenuIcon } from "@/ui-kit";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

export default function Home() {

  const { data: propertyTypes, refetch } = useFetchAllPropertyTypesQuery({page:0,limit:10})
  const router = useRouter()

  return (
    <Col>
      <RowBetween>
        <h1>Единицы измерения характеристик</h1>
        <Button color="green" onClick={() => router.push("/property-types/add")}>Добавить</Button>
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
                        <div onClick={() => console.log("hello")}>Активировать</div>
                        <div onClick={() => router.push(`/property-types/${item.property_type_id}`)}>Изменить</div>
                        <div className="danger-hover">Удалить</div>
                      </div>
                    </Dropdown>
                  </td>
                  <td className="gray">{item.property_type_id}</td>
                  <td className="black-500">{item.type_name}</td>
                  <td className="black-500">{item.unit_type}</td>
                </tr>
              )
            })}

          </tbody>
        </Table>
      </Row>
    </Col >
  )
}
