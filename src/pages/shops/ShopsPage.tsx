import { useState } from "react"
import useDebounce from "../../ui/hooks/useDebounce"
import { useDeleteCategoryMutation, useGetCategoriesQuery, useUpdateCategoryMutation } from "../../redux/services/categoriesApi"
import { IShop } from "../../types/models/types"
import { Button, Checkbox, Dropdown, Field, RowBetween, Select, Stack, Table, TableMenuIcon } from "../../ui"
import { SelectOption } from "../../ui/Select/Select"
import { useNavigate } from "react-router-dom"
import Paginator from "../../ui/Paginator/Paginator"
import { useDeleteShopMutation, useGetShopsQuery, useUpdateShopMutation } from "../../redux/services/shopsApi"

export default function ShopsPage() {

    // pagination
    const navigate = useNavigate()
    const [limit, setLimit] = useState(10)
    const [currentPage, setCurrentPage] = useState(1)

    // filter - search
    const [searchValue, setSearchValue] = useState<string>("")
    const debouncedSearchValue = useDebounce(searchValue, 800)

    // filter - isactive
    const [isActive, setIsActive] = useState(false)

    // table data
    const { shops } = useGetShopsQuery({
        limit,
        page: currentPage,
        like: debouncedSearchValue || "",
        ...(isActive ? {
            "filter[is_active]": isActive,
        } : {}),
    }, {
        selectFromResult({ data }) {
            return {
                shops: data,
            }
        }
    })
    // menu
    const [deleteShop] = useDeleteShopMutation()
    const [updateShop] = useUpdateShopMutation()

    const handleDelete = async (id: number) => {
        await deleteShop(id)
    }

    const handleToggleActive = async (shop: IShop) => {
        let activeShop: IShop = { ...shop, is_active: !shop.is_active }
        await updateShop(activeShop)
    }

    const handlePageChange = (page: number) => {
        setCurrentPage(page)
    }

    return shops?.data && shops?.data ? (
        <Stack flexDirection="column" gap={3}>
            <RowBetween>
                <h1>Магазины</h1>
                <Button color="green" onClick={() => navigate("/shops/add")}>Добавить</Button>
            </RowBetween>
            <Stack flexDirection="column" gap={3}>
                <div style={{ display: "grid", gridGap: "10px", gridTemplateColumns: "1fr 1fr" }}>
                    <Field
                        label="Поиск по адресу"
                        placeholder="Поиск по названию"
                        value={searchValue}
                        onChange={(e) => setSearchValue(e.target.value)} />
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
                        <th>Адрес</th>
                        <th>Активность</th>
                        <th>Координаты</th>
                    </tr>
                </thead>
                <tbody>
                    {shops?.data.map(item => {
                        return (
                            <tr key={item.shop_id}>
                                <td>
                                    <Dropdown>
                                        <div>
                                            <TableMenuIcon />
                                        </div>
                                        <div>
                                            <div onClick={() => handleToggleActive(item)}>{item.is_active ? "Деактивировать" : "Активировать"}</div>
                                            <div onClick={() => navigate(`/shops/${item.shop_id}`)}>Изменить</div>
                                            <div onClick={() => handleDelete(item.shop_id)} className="danger-hover">Удалить</div>
                                        </div>
                                    </Dropdown>
                                </td>
                                <td className="gray">{item.shop_id}</td>
                                <td className="black-500">{item.address}</td>
                                <td>
                                    {item.is_active && <img width={18} height={18} src="img/icons/checked.svg" alt="" />}
                                </td>
                                <td>{item?.cords}</td>
                            </tr>
                        )
                    })}

                </tbody>
            </Table>
            <Paginator onClick={handlePageChange} currentPage={currentPage} pageCount={Math.ceil((shops?.count ?? 0) / limit) || 0} />
        </Stack >
    ) : null
}
