export class JSONDecoder<T> {
    decodeResponse(data: Buffer): T {
        let strBuffer = data.toString()

        return JSON.parse(strBuffer) as T
    }
}
