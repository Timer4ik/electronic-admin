import React from 'react'
import { Button, Card, Checkbox, Dropdown, ErrorText, Field, FileLoader, PhotoLoader, Select, Stack, Table, TableMenuIcon, Tabs, TabsItem, Textarea } from '../ui'
import { SelectOption } from '../ui/Select/Select'

const MainPage = () => {
    return (
        <div style={{ height: 500, width: "1000px", margin: "50px auto" }}>
            <Stack flexDirection='column' gap={2}>
                <h2>Проверка ui кита</h2>
                <Card>
                    <Stack flexDirection='column' gap={3}>
                        <Tabs>
                            <TabsItem active>Первый</TabsItem>
                            <TabsItem>Второй</TabsItem>
                            <TabsItem>Третий</TabsItem>
                        </Tabs>
                        <Textarea label='Это область ввода' />
                        <Field label='Поле ввода' />
                        <Stack flexDirection='column'>
                            <Field label='Поле ввода' isInvalid />
                            <ErrorText>Поле ввода обязательно к заполнению</ErrorText>
                        </Stack>
                        <Select value={1} onChange={(value) => {
                            console.log(value);
                        }} label='Поле ввода'>
                            <SelectOption value={1}>Один</SelectOption>
                            <SelectOption value={2}>Два</SelectOption>
                            <SelectOption value={3}>Три</SelectOption>
                        </Select>
                        <Checkbox label='Да или нет?' />
                        <Stack justifyContent='space-between' gap={4}>
                            <Button>Сохранить</Button>
                            <Button color='danger'>Сохранить</Button>
                            <Button color='green'>Сохранить</Button>
                            <Button color='standard'>Сохранить</Button>
                        </Stack>
                        <Dropdown>
                            <div>
                                <Button color='standard'>DropDown</Button>
                            </div>
                            <div>
                                <div>Деактивировать</div>
                            </div>
                        </Dropdown>
                        <FileLoader />
                        <PhotoLoader label='Фото' />
                        <Table>
                            <thead>
                                <tr>
                                    <th>ID</th>
                                    <th>Название категории</th>
                                    <th>Активность</th>
                                    <th>Конечная категория?</th>
                                    <th>Фото</th>
                                    <th>Родительская категория</th>
                                </tr>
                            </thead>
                            <tbody>
                                <tr>
                                    <td>ID</td>
                                    <td>Название категории</td>
                                    <td>Активность</td>
                                    <td>Конечная категория?</td>
                                    <td>Фото</td>
                                    <td>Родительская категория</td>
                                </tr>
                            </tbody>
                        </Table>
                       
                    </Stack>
                </Card>
            </Stack>
        </div>
    )
}

export default MainPage