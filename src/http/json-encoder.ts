export class JSONEncoder<T> {
    processBody(body: T): Buffer {
        let data: string = JSON.stringify(body)

        return Buffer.from(data)
    }
}
