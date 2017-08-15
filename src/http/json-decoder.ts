/**
 * @file definition for the HTTP JSONDecoder class
 * @author Bruno Ferreira <shirayuki@kitsune.com.br>
 * @license MIT
 */

export class JSONDecoder<T> {
    decodeResponse(data: Buffer): T {
        let strBuffer = data.toString()

        return JSON.parse(strBuffer) as T
    }
}
