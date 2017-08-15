/// <reference types="node" />
/**
 * @file definition for the HTTP JSONDecoder class
 * @author Bruno Ferreira <shirayuki@kitsune.com.br>
 * @license MIT
 */
export declare class JSONDecoder<T> {
    decodeResponse(data: Buffer): T;
}
