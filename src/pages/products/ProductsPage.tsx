import { useState } from "react";
import { useNavigate } from "react-router-dom"
import { Button, Checkbox, Dropdown, Field, Loader, Select, Stack, Table, TableMenuIcon } from "../../ui";
import { SelectOption } from "../../ui/Select/Select";
import Paginator from "../../ui/Paginator/Paginator";
import useDebounce from "../../ui/hooks/useDebounce";
import { useGetCategoriesQuery } from "../../redux/services/categoriesApi";
import { useGetDevelopersQuery } from "../../redux/services/developersApi";
import { useDeleteProductByIdMutation, useGetProductsQuery, useUpdateProductMutation } from "../../redux/services/productsApi";
import { IProduct } from "../../types/models/types";

export default function ProductsPage() {

    const navigate = useNavigate()

    // pagination
    const [limit, setLimit] = useState(10)
    const [currentPage, setCurrentPage] = useState(1)

    // filter - search
    const [searchValue, setSearchValue] = useState<string>("")
    const debouncedSearchValue = useDebounce(searchValue, 800)

    // filter - isactive

    const [isActive, setIsActive] = useState(false)

    // filter - select category

    const { data: categories, isLoading: isCategoriesLoading } = useGetCategoriesQuery({})
    const [selectedCategoryId, setSelectedCategoryId] = useState<any>(0)
    // filter - select developer

    const { data: developers, isLoading: isDevelopersLoading } = useGetDevelopersQuery({})
    const [selectedDeveloperId, setSelectedDeveloperId] = useState<any>(0)

    // table data
    const { data: products, isLoading: isProductsLoading } = useGetProductsQuery({
        limit,
        page: currentPage,
        extend: "file,category,developer",
        like: debouncedSearchValue || "",
        ...(isActive ? {
            "filter[is_active]": isActive,
        } : {}),
        ...(selectedCategoryId > 0 ? {
            "filter[category_id]": selectedCategoryId
        } : {}),
        ...(selectedDeveloperId > 0 ? {
            "filter[developer_id]": selectedDeveloperId
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

    return categories?.data && developers?.data ? (
        <Stack flexDirection="column" gap={3}>
            <Stack justifyContent="space-between" alignItems="center">
                <h1>Введите название товара</h1>
                <Button color="green" onClick={() => navigate("/products/add")}>Добавить</Button>
            </Stack>
            <Stack flexDirection="column" gap={3}>
                <div style={{ display: "grid", gridGap: "10px", gridTemplateColumns: "1fr 1fr 1fr" }}>
                    <Field
                        label="Поиск"
                        placeholder="Поиск по названию"
                        value={searchValue}
                        onChange={(e) => setSearchValue(e.target.value)} />
                    <Select
                        label="Выберите категорию"
                        onChange={(item) => setSelectedCategoryId(item)}
                        value={selectedCategoryId}
                    >
                        <SelectOption value={0}>Не выбрано</SelectOption>
                        {categories?.data?.map(item => {
                            return <SelectOption key={item.category_id} value={item.category_id}>{item.name}</SelectOption>
                        })}
                    </Select>
                    <Select
                        label="Выберите производителя"
                        onChange={(item) => setSelectedDeveloperId(item)}
                        value={selectedDeveloperId}
                    >
                        <SelectOption value={0}>Не выбрано</SelectOption>
                        {developers?.data?.map(item => {
                            return <SelectOption key={item.developer_id} value={item.developer_id}>{item.name}</SelectOption>
                        })}
                    </Select>
                </div>
                <Checkbox label="Активность"
                    checked={isActive}
                    onChange={(e) => setIsActive(e.target.checked)} />
            </Stack>

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
                                            <div onClick={() => navigate(`/products/${item.product_id}`)}>Изменить</div>
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
                                        <img width={60} height={60} src={item.file?.link} alt="" />
                                    </div>
                                </td>
                                <td className="black-500">{item?.category?.name}</td>
                                <td className="black-500">{item?.developer?.name}</td>
                            </tr>
                        )
                    })}
                </tbody>
            </Table>
            {(isProductsLoading || isCategoriesLoading || isDevelopersLoading) && <Loader fixed />}
            <Paginator onClick={handlePageChange} currentPage={currentPage} pageCount={(Math.ceil((products?.count ?? 0) / limit)) || 0} />
        </Stack>
    ) : null
}
