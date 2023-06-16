// import React, { useCallback, useEffect, useMemo, useState } from 'react'
// import FormikForm, { FormikFieldsTemplate, TemplateFields, TemplateTypes, generateInitialObject } from '@/components/form/FormikForm'
// import { useUpdateCategoryMutation, useFetchAllCategoriesQuery, useFetchCategoryByIdQuery } from '@/api/categories'
// import { useParams, useRouter } from 'next/navigation'
// import { ICategory } from '@/types/models/types'
// import { Card, Col, Row, Tabs, TabsItem } from '@/ui-kit'
// import { Form, Formik } from 'formik'

// export const useCategoryPage = (category?:ICategory,categories?:ICategory[]) => {

//     const fieldsTemplateTab1 = useCallback((category?: ICategory): TemplateFields[] => [
//         {
//             label: "Название категории",
//             name: "name",
//             type: TemplateTypes.TEXT,
//             initialValue: category?.name || ""
//         },
//         {
//             label: "Крайняя категория?",
//             name: "is_end",
//             type: TemplateTypes.CHECKBOX,
//             initialValue: category?.is_end || false,
//         },
//         {
//             label: "Выберите родительскую категорию",
//             name: "parent_category",
//             type: TemplateTypes.SELECT,
//             options: [
//                 {
//                     value: 0,
//                     content: "Не выбрано"
//                 },
//                 ...categories?.map(cat => ({ value: cat.category_id, content: cat.name })) || []
//             ],
//             initialValue: {
//                 value: category?.parent_id || 0,
//                 content: categories?.find(cat => cat.category_id == category?.parent_id)?.name || "Не выбрано"
//             }
//         },
//         {
//             label: "Активность",
//             name: "is_active",
//             type: TemplateTypes.CHECKBOX,
//             initialValue: category?.is_active || false
//         },
//         {
//             label: "Фото категории",
//             name: "photo_full",
//             type: TemplateTypes.IMAGE,
//             initialValue: {
//                 url: "http://localhost:5000/" + category?.photo,
//                 file: null,
//             }
//         },
//     ], [categories, category])

//     const fieldsTemplateTab2 = useCallback((category?: ICategory): TemplateFields[] => [
//         {
//             label: "Описание категории",
//             name: "desc",
//             type: TemplateTypes.TEXT,
//             initialValue: category?.desc || ""
//         },
//         {
//             label: "Крайняя категория?",
//             name: "is_end",
//             type: TemplateTypes.CHECKBOX,
//             initialValue: category?.is_end || false,
//         },
//     ], [category])

//     const initialValuesTab1 = useMemo(() => generateInitialObject(fieldsTemplateTab1(category)), [fieldsTemplateTab1])
//     const initialValuesTab2 = useMemo(() => generateInitialObject(fieldsTemplateTab2(category)), [fieldsTemplateTab2])
//     const initialValues = useMemo(() => ({ ...initialValuesTab1, ...initialValuesTab2 }), [initialValuesTab1, initialValuesTab2])

//     return {
//         fieldsTemplateTab1,
//         fieldsTemplateTab2,
//         initialValues,
//     }
// }