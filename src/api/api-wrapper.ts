/**
 * @file definition for the APIWrapper class
 * @author Bruno Ferreira <shirayuki@kitsune.com.br>
 * @license MIT
 */

import { Iugu } from '../iugu'

/**
 * Class used for shared properties for all API services
 *
 * @mixin
 */
export class APIWrapper {
    constructor(protected iugu: Iugu) {}
}
