export interface IFile {
    file_id: number
    size: number
    name?: string
    link: string
}
export interface ICategoryProperty {
    category_property_id: number
    category_id: number
    property_id: number
    property?: IProperty
    name: string
}
export interface ICategory {
    category_id: number
    name: string
    file_id?: number
    parent_id: number
    is_end: boolean
    desc?: string
    is_active: boolean

    file?: IFile
    parent?: Omit<ICategory, "parent">
}

export interface IPropertyType {
    property_type_id: number
    type_name: string
    unit_type: string

    is_active: boolean
}

export interface IProperty {
    property_id: number
    name: string
    property_type_id: number
    property_type?: IPropertyType

    is_active: boolean
}

export interface IDeveloper {
    developer_id: number
    name: string
    is_active: boolean
    file_id?: number

    file?: IFile
}

export interface IProduct {
    product_id: number
    name: string
    is_active: boolean
    descr: string
    price: number
    file_id?: number
    category_id: number
    developer_id: number

    file?: IFile
    developer?: IDeveloper
    category?: ICategory
}

export interface IProductPhoto {

    name?:string
    product_photo_id:number
    product_id:number
    file_id:number

    product?: IProduct
    file?: IFile
}

// export interface IProductProperty {
//     product_property_id
//     name
//     value
//     value_min
//     value_average
//     value_max
//     product_id
//     property_id
//     is_active
// }