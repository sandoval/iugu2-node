import { CustomVariable } from './custom-variable'
import { Object } from './object'

/**
 * Defines a customer associated with an IUGU account
 */
export interface Customer extends Object {
    /**
     * Customer e-mail address. Required.
     *
     * @type String
     */
    email: string

    /**
     * Customer name. Required.
     *
     * @type String
     */
    name: string

    /**
     * Additional information
     *
     * @type String
     */
    notes?: string

    /**
     * The CPF or CNPJ. Required if emitting registered boletos
     *
     * @type String
     */
    cpf_cnpj?: string

    /**
     * Additional e-mail addresses for carbon-copy
     *
     * @type String
     */
    cc_emails?: string

    /**
     * CEP. Required if emitting registered boletos
     *
     * @type String
     */
    zip_code?: string

    /**
     * Address number. Required if zip_code is set
     *
     * @type Integer number
     */
    number?: number

    /**
     * Street name. Required if zip_code is set and incomplete.
     *
     * @type String
     */
    street?: string

    /**
     * Address' city
     *
     * @type String
     */
    city?: string

    /**
     * Address' state
     *
     * @type String
     */
    state?: string

    /**
     * Address' district. Required if zip_code is set.
     *
     * @type String
     */
    district?: string

    /**
     * Address' additional information
     *
     * @example room number, floor number, nearby references
     * @type String
     */
    complement?: string

    /**
     * Custom information
     *
     * @example [{ name: 'database_id', value: '1' }]
     * @type CustomVariable[]
     */
    custom_variables?: CustomVariable[]
}
