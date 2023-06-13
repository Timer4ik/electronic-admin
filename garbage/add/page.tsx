'use client'
import { useCategories } from '@/api/useCategories'
import { useFileField } from '@/hooks/useFileFields'
import { useFormCheckbox } from '@/hooks/useFormCheckbox'
import { useFormInput } from '@/hooks/useFormInput'
import Col from '@/ui-kit/Col/Col'
import React, { useEffect } from 'react'

const CategoriesAddPage = () => {

  const { categories, fetchCategories } = useCategories()

  useEffect(() => {
    (async () => {
      await fetchCategories()
    })()
  }, [])

  const categoryName = useFormInput({
    initialValue: "",
  })
  const isEndCategory = useFormCheckbox({
    initialValue: false,
  })
  const photoField = useFileField()


  const handleSubmit = () => {

  }

  return (
    <div>
      <Col>
        <h1>Категория</h1>
      </Col>
    </div>
  )
}
export default CategoriesAddPage