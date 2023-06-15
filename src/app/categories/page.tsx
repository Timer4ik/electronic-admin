'use client'
import { useDeleteCategoryMutation, useFetchAllCategoriesQuery, useLazyFetchAllCategoriesQuery, useUpdateCategoryMutation } from "@/api/categories";
import { ICategory } from "@/types/models/types";
import { BorderCard, Button, Checkbox, Col, Dropdown, Field, Row, RowBetween, Table, TableMenuIcon } from "@/ui-kit";
import Paginator from "@/ui-kit/Paginator/Paginator";
import { debounce } from "@/utils/debounce";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

export default function Home() {

  const limit = 8
  const [currentPage, setCurrentPage] = useState(0)

  const [searchValue, setSearchValue] = useState<string>("")
  const [likeValue,setLikeValue] = useState<string>("")
  const debouncedSetLikeValue = debounce(setLikeValue, 800)

  const changeSearchValue = (value:string) => {
    setSearchValue(value)
    debouncedSetLikeValue(value)
  }

  const { data: categories, refetch } = useFetchAllCategoriesQuery({
    limit,
    page: currentPage,
    extendParent: "true",
    extend: "file",
    like: likeValue || ""
  })

  const [deleteCategory] = useDeleteCategoryMutation()
  const [updateCategory] = useUpdateCategoryMutation()

  const router = useRouter()

  useEffect(() => {
    refetch()
  }, [])


  const handleDelete = async (id: number) => {
    await deleteCategory(id)
    refetch()
  }

  const handleToggleActive = async (category: ICategory) => {
    let activeCategory: ICategory = { ...category, is_active: !category.is_active }
    await updateCategory(activeCategory)
    refetch()
  }

  const handlePageChange = (page: number) => {
    setCurrentPage(page)
  }

  return (
    <Col>
      <RowBetween>
        <h1>Категории товаров</h1>
        <Button color="green" onClick={() => router.push("/categories/add")}>Добавить</Button>
      </RowBetween>
      <RowBetween>
        <Field
          placeholder="Поиск по названию"
          value={searchValue}
          onChange={(e) => changeSearchValue(e.target.value)} />
      </RowBetween>
      <Row>
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
                        <div onClick={() => router.push(`categories/${item.category_id}`)}>Изменить</div>
                        <div onClick={() => handleDelete(item.category_id)} className="danger-hover">Удалить</div>
                      </div>
                    </Dropdown>
                  </td>
                  <td className="gray">{item.category_id}</td>
                  <td className="black-500">{item.name}</td>
                  <td>
                    {item.is_active && <img src="img/icons/checked.svg" width={18} />}

                    {/* <Checkbox disabled checked={item.is_end} /> */}
                  </td>
                  <td>
                    {item.is_end && <img src="img/icons/checked.svg" width={18} />}

                    {/* <Checkbox disabled checked={item.is_end} /> */}
                  </td>
                  <td>
                    <div style={{ maxWidth: 50, maxHeight: 50, width: "50px", height: "50px", borderRadius: 10, overflow: "hidden", border: "1px solid #d3d3d378" }}>
                      <img style={{ objectFit: "contain", width: "100%", height: "100%" }} src={item.file?.link} alt="" />
                    </div>
                  </td>
                  <td>{item?.parent?.name}</td>
                </tr>
              )
            })}

          </tbody>
        </Table>
      </Row>
      <Paginator onClick={handlePageChange} currentPage={currentPage} pageCount={((categories?.count ?? 0) / limit) || 0} />
    </Col >
  )
}
