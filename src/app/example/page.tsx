'use client'
import { AdaptiveImage, Button, Card, Checkbox, Col, Field, FileLoader, PhotoLoader, Row, Select, SelectOption, Table, TableMenuIcon, Tabs, TabsItem } from '@/ui-kit'
import React, { FC, useState } from 'react'

const page = () => {
  const [items, setItems] = useState([
    { id: 0, value: "Не выбрано" },
    { id: 1, value: "Швеция" },
    { id: 2, value: "Германия" },
    { id: 3, value: "США" },
    { id: 4, value: "Польша" },
    { id: 5, value: "Беларусь" },

    { id: 6, value: "Беларусь" },
    { id: 7, value: "Китай" },
    { id: 8, value: "Япония" },
  ])
  const [selectedItem, setSelectedItem] = useState(items[0])

  const [objectUrl, setObjectUrl] = useState("")
  const [file, setFile] = useState<any>(null)

  const handleOnFileChange = (e: any) => {
    const files = e.target.files
    if (!files?.length) {
      return
    }
    const url = URL.createObjectURL(files[0]);
    setObjectUrl(url)
    setFile(files[0])
  }
  return (
    <div>
      <Col>
        <h1>Таблица</h1>
        <Card noPadding>
          <Table>
            <thead className='table__thead'>
              <tr>
                <th></th>
                <th>Первая колонка</th>
                <th>Первая колонка</th>
                <th>Первая колонка</th>
                <th>Первая колонка</th>
                <th>Первая колонка</th>
              </tr>
            </thead>
            <tbody className='table__tbody'>
              <tr>
                <td><TableMenuIcon/></td>
                <td>123123</td>
                <td>123123</td>
                <td>123123</td>
                <td>123123</td>
                <td>123123</td>
              </tr>
              <tr>
                <td><TableMenuIcon/></td>
                <td>123123</td>
                <td>123123</td>
                <td>123123</td>
                <td>123123</td>
                <td>123123</td>
              </tr>
              <tr>
                <td><TableMenuIcon/></td>
                <td>123123</td>
                <td>123123</td>
                <td>123123</td>
                <td>123123</td>
                <td>123123</td>
              </tr>
            </tbody>
          </Table>
        </Card>
      </Col>
      <Row>
        <h1>Категории товаров</h1>
      </Row>
      <Card>
        <Row>
          <Tabs>
            <TabsItem active>Settings</TabsItem>
            <TabsItem>Billing</TabsItem>
            <TabsItem>Security</TabsItem>
            <TabsItem>Notifications</TabsItem>
          </Tabs>
          <h2>RegisterForm</h2>

        </Row>
        <Row>
          <Field label={"First name"} />
          <Select label={"Выбери страну"} selectedItem={selectedItem?.value}>
            {items.map(item => {
              return (
                <SelectOption key={item.id} onClick={() => setSelectedItem(item)}>{item.value}</SelectOption>
              )
            })}
          </Select>
        </Row>
        <Row>
          <Checkbox label={"Хочешь умереть?"} />
          <Row>
            <Button>Привет</Button>
            <Button color="danger">Привет</Button>
            <Button color="standard">Привет</Button>
          </Row>
        </Row>
        <Row>
          {/* <DatePicker label="Выберите число" /> */}
          <FileLoader label="Загрузить файл" />
        </Row>
        <Row>
          <PhotoLoader label={"Загрузка файла"} />
          <Col>
            <Field noModify label="Загруженные изображения" />
            <Field noModify label="qoolImage.png" value="123 кб" />
            <Field noModify label="qoolImage.png" value="123 кб" />
            <Field noModify label="qoolImage.png" value="123 кб" />
          </Col>
        </Row>
        <Row>
          <PhotoLoader label={"Загрузка файла"} onChange={handleOnFileChange} />
          <Col>
            {!!file && <Field noModify label={file?.name} value={Math.round(file?.size / 1024) + " кб"} />}
            {!!file && <AdaptiveImage src={objectUrl} alt="" />}
          </Col>
        </Row>


      </Card>

    </div>
  )
}
export default page