"use strict";
/**
 * @file definition for the HTTP JSONDecoder class
 * @author Bruno Ferreira <shirayuki@kitsune.com.br>
 * @license MIT
 */
Object.defineProperty(exports, "__esModule", { value: true });
class JSONDecoder {
    decodeResponse(data) {
        let strBuffer = data.toString();
        return JSON.parse(strBuffer);
    }
}
exports.JSONDecoder = JSONDecoder;
//# sourceMappingURL=json-decoder.js.map