export interface ICategory {
    category_id:number
    name:string
    photo:any
    parent_id:number
    is_end:boolean
    descr?:string
    is_active:boolean
    parent?:{
        category_id:number
        name:string
        photo:any
        parent_id:number
        is_end:boolean
        descr?:string
        is_active?:boolean
    }
}

export interface IPropertyType {
    property_type_id:number
    type_name:string
    unit_type:string
} 