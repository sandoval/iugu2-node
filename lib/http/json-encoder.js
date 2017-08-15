"use strict";
/**
 * @file definition for the HTTP JSONEncoder class
 * @author Bruno Ferreira <shirayuki@kitsune.com.br>
 * @license MIT
 */
Object.defineProperty(exports, "__esModule", { value: true });
class JSONEncoder {
    processBody(body) {
        let data = JSON.stringify(body);
        return Buffer.from(data);
    }
}
exports.JSONEncoder = JSONEncoder;
//# sourceMappingURL=json-encoder.js.map