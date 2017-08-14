/**
 * Defines common attributes, used by several objects
 */
export interface Object {
    id?: string
    created_at?: Date
    updated_at?: Date
}

export function recreateDateFields<T extends Object>(obj: T): T {
    obj.updated_at = new Date(<any>obj.updated_at)
    obj.created_at = new Date(<any>obj.created_at)

    return obj
}
