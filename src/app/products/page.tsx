'use client'
import { useLazyFetchAllCategoriesQuery } from "@/api/categories";
import { useLazyFetchAllDevelopersQuery } from "@/api/developersApi";
import { useDeleteProductByIdMutation, useFetchAllProductsQuery, useUpdateProductMutation } from "@/api/productsApi";
import { IProduct } from "@/types/models/types";
import { BorderCard, Button, Checkbox, Col, Dropdown, Field, Row, RowBetween, Select, Table, TableMenuIcon } from "@/ui-kit";
import Paginator from "@/ui-kit/Paginator/Paginator";
import { addNotSelectedOption } from "@/utils/addNotSelectedOption";
import { debounce } from "@/utils/debounce";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

export default function Home() {

    const [fetchDevelopers, { data: developers }] = useLazyFetchAllDevelopersQuery()
    const [fetchCategories, { data: categories }] = useLazyFetchAllCategoriesQuery()
    const [selectedCategory, setSelectedCategory] = useState<{
        value: number,
        content: string
    }>({
        value: 0,
        content: "Не выбрано"
    })
    const [isActive, setIsActive] = useState(false)

    const limit = 8
    const [currentPage, setCurrentPage] = useState(0)

    const [searchValue, setSearchValue] = useState<string>("")
    const [likeValue, setLikeValue] = useState<string>("")
    const debouncedSetLikeValue = debounce(setLikeValue, 800)

    const changeSearchValue = (value: string) => {
        setSearchValue(value)
        debouncedSetLikeValue(value)
    }

    const { data: products, refetch } = useFetchAllProductsQuery({
        limit,
        page: currentPage,
        extendParent: "true",
        extend: "file,category,developer",
        like: likeValue || "",
        ...(isActive ? {
            "filter[is_active]": isActive,
        }:{}),
        ...(selectedCategory.value > 0 ? {
            "filter[category_id]": selectedCategory.value
        } : {})
    })

    const [deleteProduct] = useDeleteProductByIdMutation()
    const [updateProduct] = useUpdateProductMutation()

    const router = useRouter()

    useEffect(() => {
        fetchDevelopers({})
        fetchCategories({})
        refetch()
    }, [])


    const handleDelete = async (id: number) => {
        await deleteProduct(id)
        refetch()
    }

    const handleToggleActive = async (product: IProduct) => {
        let activeProduct: IProduct = { ...product, is_active: !product.is_active }
        await updateProduct(activeProduct)
        refetch()
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
                        onChange={(e) => changeSearchValue(e.target.value)} />
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
                </div>
                <Checkbox label="Активность" checked={isActive} onChange={(e) => setIsActive(e.target.checked)} />
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
                            {/* <th>Конечная категория?</th>
              <th>Фото</th>
              <th>Родительская категория</th> */}
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

                                        {/* <Checkbox disabled checked={item.is_end} /> */}
                                    </td>
                                    <td className="black-500">{item.price}</td>
                                    <td>
                                        <div style={{ maxWidth: 50, maxHeight: 50, width: "50px", height: "50px", borderRadius: 10, overflow: "hidden", border: "1px solid #d3d3d378" }}>
                                            <img style={{ objectFit: "contain", width: "100%", height: "100%" }} src={item.file?.link} alt="" />
                                        </div>
                                    </td>
                                    <td className="black-500">{item?.category?.name}</td>
                                    <td className="black-500">{item?.developer?.name}</td>
                                    {/* <td>
                    {item.is_end && <img src="img/icons/checked.svg" width={18} />}

                  </td>
               
                  <td>{item?.parent?.name}</td> */}
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
