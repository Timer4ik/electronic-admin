export interface IFile {
    file_id:number
    size:number
    name:string
    link:string
}

export interface ICategory {
    category_id: number
    name: string
    photo: any
    parent_id: number
    is_end: boolean
    desc?: string
    is_active: boolean
    file: any
    parent?: {
        category_id: number
        name: string
        photo: any
        parent_id: number
        is_end: boolean
        desc?: string
        is_active?: boolean
    }
}

export interface IPropertyType {
    property_type_id: number
    type_name: string
    unit_type: string
}

export interface IProperty {
    property_id: number
    name: string
    property_type_id: number
    property_type?: IPropertyType
}