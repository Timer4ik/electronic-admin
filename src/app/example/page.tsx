'use client'
import { AdaptiveImage, Button, Card, Checkbox, Col, Field, FileLoader, PhotoLoader, Row, Select, Table, TableMenuIcon, Tabs, TabsItem } from '@/ui-kit'
import React, { FC, useState } from 'react'

const Page = () => {
  const [items, setItems] = useState<{
    value: number,
    content: string
  }[]>([
    { value: 0, content: "Не выбрано" },
    { value: 1, content: "Швеция" },
    { value: 2, content: "Германия" },
    { value: 3, content: "США" },
    { value: 4, content: "Польша" },
    { value: 5, content: "Беларусь" },

    { value: 6, content: "Беларусь" },
    { value: 7, content: "Китай" },
    { value: 8, content: "Япония" },
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
                <td><TableMenuIcon /></td>
                <td>123123</td>
                <td>123123</td>
                <td>123123</td>
                <td>123123</td>
                <td>123123</td>
              </tr>
              <tr>
                <td><TableMenuIcon /></td>
                <td>123123</td>
                <td>123123</td>
                <td>123123</td>
                <td>123123</td>
                <td>123123</td>
              </tr>
              <tr>
                <td><TableMenuIcon /></td>
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
          <Select label={"Выбери страну"} onChange={(item) => setSelectedItem(item)} selectedItem={selectedItem} options={items} />
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
export default Page