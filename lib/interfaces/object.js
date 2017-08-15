"use strict";
/**
 * @file declaration of the Object interface
 * @author Bruno Ferreira <shirayuki@kitsune.com.br>
 * @license MIT
 */
Object.defineProperty(exports, "__esModule", { value: true });
function recreateDateFields(obj) {
    if (obj.updated_at) {
        obj.updated_at = new Date(obj.updated_at);
    }
    if (obj.created_at) {
        obj.created_at = new Date(obj.created_at);
    }
    return obj;
}
exports.recreateDateFields = recreateDateFields;
//# sourceMappingURL=object.js.map