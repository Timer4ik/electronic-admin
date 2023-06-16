'use client'
import { useGetCategoriesQuery } from "@/redux/services/categoriesApi";
import { useGetDevelopersQuery } from "@/redux/services/developersApi";
import { useDeleteProductByIdMutation, useGetProductsQuery, useUpdateProductMutation } from "@/redux/services/productsApi";
import useDebounce from "@/hooks/useDebounce";
import { IProduct } from "@/types/models/types";
import { Button, Checkbox, Col, Dropdown, Field, Row, RowBetween, Select, Table, TableMenuIcon } from "@/components/ui";
import Paginator from "@/components/ui/Paginator/Paginator";
import { addNotSelectedOption } from "@/utils/addNotSelectedOption";
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

    // filter - isactive

    const [isActive, setIsActive] = useState(false)

    // filter - select category

    const { data: categories } = useGetCategoriesQuery({})
    const [selectedCategory, setSelectedCategory] = useState<{
        value: number,
        content: string
    }>({
        value: 0,
        content: "Не выбрано"
    })
    // filter - select developer

    const { data: developers } = useGetDevelopersQuery({})
    const [selectedDeveloper, setSelectedDeveloper] = useState<{
        value: number,
        content: string
    }>({
        value: 0,
        content: "Не выбрано"
    })

    // table data
    const { data: products } = useGetProductsQuery({
        limit,
        page: currentPage,
        extendParent: "true",
        extend: "file,category,developer",
        like: debouncedSearchValue || "",
        ...(isActive ? {
            "filter[is_active]": isActive,
        } : {}),
        ...(selectedCategory.value > 0 ? {
            "filter[category_id]": selectedCategory.value
        } : {}),
        ...(selectedDeveloper.value > 0 ? {
            "filter[developer_id]": selectedDeveloper.value
        } : {})
    })

    // menu  
    const [deleteProduct] = useDeleteProductByIdMutation()
    const [updateProduct] = useUpdateProductMutation()

    const handleDelete = async (id: number) => {
        await deleteProduct(id)
    }

    const handleToggleActive = async (product: IProduct) => {
        let activeProduct: IProduct = { ...product, is_active: !product.is_active }
        await updateProduct(activeProduct)
    }

    const handlePageChange = (page: number) => {
        setCurrentPage(page)
    }

    return (
        <Col>
            <RowBetween>
                <h1>Товары</h1>
                <Button color="green" onClick={() => router.push("/products/add")}>Добавить</Button>
            </RowBetween>
            <Col>
                <div style={{ display: "grid", gridGap: "10px", gridTemplateColumns: "1fr 1fr 1fr" }}>
                    <Field
                        label="Поиск"
                        placeholder="Поиск по названию"
                        value={searchValue}
                        onChange={(e) => setSearchValue(e.target.value)} />
                    <Select
                        label="Выберите категорию"
                        onChange={(item) => setSelectedCategory(item)}
                        selectedItem={selectedCategory}
                        options={addNotSelectedOption(categories?.data.map(item => {
                            return {
                                content: item.name,
                                value: item.category_id
                            }
                        }))}
                    />
                    <Select
                        label="Выберите производителя"
                        onChange={(item) => setSelectedDeveloper(item)}
                        selectedItem={selectedDeveloper}
                        options={addNotSelectedOption(developers?.data.map(item => {
                            return {
                                content: item.name,
                                value: item.developer_id
                            }
                        }))}
                    />
                </div>
                <Checkbox label="Активность"
                    checked={isActive}
                    onChange={(e) => setIsActive(e.target.checked)} />
            </Col>

            <Row>
                <Table>
                    <thead>
                        <tr>
                            <th></th>
                            <th>ID</th>
                            <th>Название товара</th>
                            <th>Активность</th>
                            <th>Цена</th>
                            <th>Фото</th>
                            <th>Категория</th>
                            <th>Производитель</th>
                        </tr>
                    </thead>
                    <tbody>
                        {products?.data.map(item => {
                            return (
                                <tr key={item.product_id}>
                                    <td>
                                        <Dropdown>
                                            <div>
                                                <TableMenuIcon />
                                            </div>
                                            <div>
                                                <div onClick={() => handleToggleActive(item)}>{item.is_active ? "Деактивировать" : "Активировать"}</div>
                                                <div onClick={() => router.push(`/products/${item.product_id}`)}>Изменить</div>
                                                <div onClick={() => handleDelete(item.product_id)} className="danger-hover">Удалить</div>
                                            </div>
                                        </Dropdown>
                                    </td>
                                    <td className="gray">{item.product_id}</td>
                                    <td className="black-500">{item.name}</td>
                                    <td>
                                        {item.is_active && <img src="img/icons/checked.svg" width={18} />}
                                    </td>
                                    <td className="black-500">{item.price}</td>
                                    <td>
                                        <div className="table-photo">
                                            <img src={item.file?.link} alt="" />
                                        </div>
                                    </td>
                                    <td className="black-500">{item?.category?.name}</td>
                                    <td className="black-500">{item?.developer?.name}</td>
                                </tr>
                            )
                        })}

                    </tbody>
                </Table>
            </Row>
            <Paginator onClick={handlePageChange} currentPage={currentPage} pageCount={((products?.count ?? 0) / limit) || 0} />
        </Col >
    )
}
