import { useState } from "react"
import useDebounce from "../../ui/hooks/useDebounce"
import { useDeleteCategoryMutation, useGetCategoriesQuery, useUpdateCategoryMutation } from "../../redux/services/categoriesApi"
import { ICategory } from "../../types/models/types"
import { Button, Checkbox, Dropdown, Field, RowBetween, Select, Stack, Table, TableMenuIcon } from "../../ui"
import { SelectOption } from "../../ui/Select/Select"
import { useNavigate } from "react-router-dom"
import Paginator from "../../ui/Paginator/Paginator"
import { DatePicker } from "../../ui/DatePicker/DatePicker"

export default function CategoriesPage() {

  // pagination
  const navigate = useNavigate()
  const [limit, setLimit] = useState(10)
  const [currentPage, setCurrentPage] = useState(1)

  // filter - search
  const [searchValue, setSearchValue] = useState<string>("")
  const debouncedSearchValue = useDebounce(searchValue, 800)

  // filter - isactive
  const [isActive, setIsActive] = useState(false)

  // filter - select category
  const { data: parentCategories } = useGetCategoriesQuery({})
  const [selectedCategoryId, setSelectedCategoryId] = useState<any>(0)

  // table data
  const { categories } = useGetCategoriesQuery({
    limit,
    page: currentPage,
    extend: "file,parent",
    like: debouncedSearchValue || "",
    ...(isActive ? {
      "filter[is_active]": isActive,
    } : {}),
    ...(selectedCategoryId ? {
      "filter[parent_id]": selectedCategoryId,
    } : {}),
  }, {
    selectFromResult({ data }) {
      return {
        categories: data,
      }
    }
  })
  // menu
  const [deleteCategory] = useDeleteCategoryMutation()
  const [updateCategory] = useUpdateCategoryMutation()

  const handleDelete = async (id: number) => {
    await deleteCategory(id)
  }

  const handleToggleActive = async (category: ICategory) => {
    let activeCategory: ICategory = { ...category, is_active: !category.is_active }
    await updateCategory(activeCategory)
  }

  const handlePageChange = (page: number) => {
    setCurrentPage(page)
  }

  return categories?.data && parentCategories?.data ? (
    <Stack flexDirection="column" gap={3}>
      <RowBetween>
        <h1>Категории товаров</h1>
        <Button color="green" onClick={() => navigate("/categories/add")}>Добавить</Button>
      </RowBetween>
      <Stack flexDirection="column" gap={3}>
        <div style={{ display: "grid", gridGap: "10px", gridTemplateColumns: "1fr 1fr" }}>
          <Field
            label="Поиск"
            placeholder="Поиск по названию"
            value={searchValue}
            onChange={(e) => setSearchValue(e.target.value)} />
          <Select
            label="Выберите родительскую категорию"
            onChange={(item) => setSelectedCategoryId(item)}
            value={selectedCategoryId}
          >
            <SelectOption value={0}>Не выбрано</SelectOption>
            {parentCategories?.data?.map(item => {
              return <SelectOption key={item.category_id} value={item.category_id}>{item.name}</SelectOption>
            })}
          </Select>
          <DatePicker></DatePicker>
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
                      <div onClick={() => handleToggleActive(item)}>{item.is_active ? "Деактивировать" : "Активировать"}</div>
                      <div onClick={() => navigate(`/categories/${item.category_id}`)}>Изменить</div>
                      <div onClick={() => handleDelete(item.category_id)} className="danger-hover">Удалить</div>
                    </div>
                  </Dropdown>
                </td>
                <td className="gray">{item.category_id}</td>
                <td className="black-500">{item.name}</td>
                <td>
                  {item.is_active && <img width={18} height={18} src="img/icons/checked.svg" alt="" />}
                </td>
                <td>
                  {item.is_end && <img width={18} height={18} src="img/icons/checked.svg" alt="" />}
                </td>
                <td>
                  <div className="table-photo">
                    <img width={60} height={60} src={item.file?.link || ""} alt="" />
                  </div>
                </td>
                <td>{item?.parent?.name}</td>
              </tr>
            )
          })}

        </tbody>
      </Table>
      <Paginator onClick={handlePageChange} currentPage={currentPage} pageCount={Math.ceil((categories?.count ?? 0) / limit) || 0} />
    </Stack >
  ) : null
}
