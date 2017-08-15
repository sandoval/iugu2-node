/**
 * @file declaration of the Object interface
 * @author Bruno Ferreira <shirayuki@kitsune.com.br>
 * @license MIT
 */

/**
 * Describe the id attribute
 *
 * @since 0.4.0
 */
export interface Identifier {
    id?: string
}

/**
 * Defines common attributes, used by several objects
 * @mixin
 */
export interface Object extends Identifier {
    created_at?: Date
    updated_at?: Date
}

export function recreateDateFields<T extends Object>(obj: T): T {
    if (obj.updated_at) {
        obj.updated_at = new Date(<any>obj.updated_at)
    }

    if (obj.created_at) {
        obj.created_at = new Date(<any>obj.created_at)
    }

    return obj
}
