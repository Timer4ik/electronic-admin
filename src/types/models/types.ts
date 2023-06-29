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

export interface IPropertyValue {
    property_value_id: number
    name: string
    property_id: number
    is_active: boolean

    property?: IProperty
}

export interface IProperty {
    property_id: number
    name: string
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

    name?: string
    product_photo_id: number
    product_id: number
    file_id: number

    product?: IProduct
    file?: IFile
}

export interface IProductPropertyValue {
    product_property_value_id: number
    product_id: number
    category_property_id: number
    property_value_id: number
    is_active: boolean

    category_property?: ICategoryProperty
    product?: IProduct
    property_value?: IPropertyValue
}

export interface ISlider {
    slider_id: number
    title: string
    text: string
    file_id?: number
    product_id?: number
    is_active: boolean
    start_active_dt?: any
    end_active_dt?: any

    file?: IFile
}

export interface IShopProduct {
    shop_product: number
    product_id: number
    shop_id: number
    is_active: boolean
    is_sold: boolean
}
export interface IShop {
    shop_id: number
    file_id?: number
    address: string
    cords: string
    openFrom: string
    openTo: string
    is_active:boolean

    file?: IFile
}