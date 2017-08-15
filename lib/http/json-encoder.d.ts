/// <reference types="node" />
/**
 * @file definition for the HTTP JSONEncoder class
 * @author Bruno Ferreira <shirayuki@kitsune.com.br>
 * @license MIT
 */
export declare class JSONEncoder<T> {
    processBody(body: T): Buffer;
}
