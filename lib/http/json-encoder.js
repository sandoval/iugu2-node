"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class JSONEncoder {
    processBody(body) {
        let data = JSON.stringify(body);
        return Buffer.from(data);
    }
}
exports.JSONEncoder = JSONEncoder;
//# sourceMappingURL=json-encoder.js.map