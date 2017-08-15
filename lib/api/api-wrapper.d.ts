/**
 * @file definition for the APIWrapper class
 * @author Bruno Ferreira <shirayuki@kitsune.com.br>
 * @license MIT
 */
import { Iugu } from '../iugu';
/**
 * Class used for shared properties for all API services
 *
 * @mixin
 */
export declare class APIWrapper {
    protected iugu: Iugu;
    constructor(iugu: Iugu);
}
