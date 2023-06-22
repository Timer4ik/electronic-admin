'use client'
import useDebounce from "@/hooks/useDebounce";
import { ISlider } from "@/types/models/types";
import { Button, Checkbox, Col, Dropdown, Field, Row, RowBetween, Table, TableMenuIcon } from "@/components/ui";
import Paginator from "@/components/ui/Paginator/Paginator";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { useDeleteSliderByIdMutation, useGetSlidersQuery, useUpdateSliderByIdMutation } from "@/redux/services/slidersApi";

export default function Home() {

  const router = useRouter()

  // pagination
  const [limit, setLimit] = useState(10)
  const [currentPage, setCurrentPage] = useState(1)

  // filter - search
  const [searchValue, setSearchValue] = useState<string>("")
  const debouncedSearchValue = useDebounce(searchValue, 800)

  // filter - isactive
  const [isActive, setIsActive] = useState(false)

  // table data
  const { data: sliders } = useGetSlidersQuery({
    page: currentPage,
    limit: limit,
    extend: "file",
    like: debouncedSearchValue || "",
    ...(isActive ? {
      "filter[is_active]": isActive,
    } : {}),
  })

  // menu  
  const [deleteSlider] = useDeleteSliderByIdMutation()
  const [updateSlider] = useUpdateSliderByIdMutation()

  const handleDelete = async (id: number) => {
    await deleteSlider(id)
  }

  const handleToggleActive = async (slider: ISlider) => {
    let activeSlider: ISlider = { ...slider, is_active: !slider.is_active }
    await updateSlider(activeSlider)
  }

  const handlePageChange = (page: number) => {
    setCurrentPage(page)
  }

  return (
    <Col>
      <RowBetween>
        <h1>Слайдеры</h1>
        <Button color="green" onClick={() => router.push("/sliders/add")}>Добавить</Button>
      </RowBetween>
      <Col>
        <div style={{ display: "grid", gridGap: "10px", gridTemplateColumns: "1fr 1fr 1fr" }}>
          <Field
            label="Поиск"
            placeholder="Поиск по названию"
            value={searchValue}
            onChange={(e) => setSearchValue(e.target.value)} />
          {/* <Select
            label="Выберите родительскую категорию"
            onChange={(item) => setSelectedCategoryId(item)}
            value={selectedCategoryId}
          >
            <SelectOption value={0}>Не выбрано</SelectOption>
            {parentCategories?.data?.map(item => {
              return <SelectOption key={item.category_id} value={item.category_id}>{item.name}</SelectOption>
            })}
          </Select> */}
          {/*<Select
            label="Выберите производителя"
            onChange={(item) => setSelectedDeveloperId(item)}
            value={selectedDeveloperId}
          >
            <SelectOption value={0}>Не выбрано</SelectOption>
            {developers?.data?.map(item => {
              return <SelectOption key={item.developer_id} value={item.developer_id}>{item.name}</SelectOption>
            })}
          </Select> */}
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
              <th>Активность</th>
              <th>Заголовок слайдера</th>
              <th>Текст слайдера</th>
              <th>Фото слайдера</th>
            </tr>
          </thead>
          <tbody>
            {sliders?.data.map(item => {
              return (
                <tr key={item.slider_id}>
                  <td>
                    <Dropdown>
                      <div>
                        <TableMenuIcon />
                      </div>
                      <div>
                        <div onClick={() => handleToggleActive(item)}>{item.is_active ? "Деактивировать" : "Активировать"}</div>
                        <div onClick={() => router.push(`/sliders/${item.slider_id}`)}>Изменить</div>
                        <div onClick={() => handleDelete(item.slider_id)} className="danger-hover">Удалить</div>

                      </div>
                    </Dropdown>
                  </td>
                  <td className="gray">{item.slider_id}</td>
                  <td>
                    {item.is_active && <img src="img/icons/checked.svg" width={18} />}
                  </td>
                  <td className="black-500">{item.title}</td>
                  <td className="black-500">{item.text}</td>
                  <td>
                    <div className="table-photo">
                      <img src={item.file?.link} alt="" />
                    </div>
                  </td>
                </tr>
              )
            })}
          </tbody>
        </Table>
      </Row>
      <Paginator onClick={handlePageChange} currentPage={currentPage} pageCount={Math.ceil((sliders?.count ?? 0) / limit) || 0} />
    </Col >
  )
}
