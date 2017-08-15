/**
 * @file definition for the HTTP JSONEncoder class
 * @author Bruno Ferreira <shirayuki@kitsune.com.br>
 * @license MIT
 */

export class JSONEncoder<T> {
    processBody(body: T): Buffer {
        let data: string = JSON.stringify(body)

        return Buffer.from(data)
    }
}
