"use strict";
/**
 * @file definition for the PaymentTokenAPI class
 * @author Bruno Ferreira <shirayuki@kitsune.com.br>
 * @license MIT
 */
Object.defineProperty(exports, "__esModule", { value: true });
const api_wrapper_1 = require("./api-wrapper");
class PaymentTokenAPI extends api_wrapper_1.APIWrapper {
    /**
     * Creates a new PaymentToken
     *
     * @param tokenData the data for the token that will be created
     * @returns {Promise<PaymentToken>} a promise that may resolve to the created object
     */
    create(tokenData) {
        return this.iugu.makeRequest('POST', '/payment_token').begin(tokenData);
    }
}
exports.PaymentTokenAPI = PaymentTokenAPI;
//# sourceMappingURL=payment-token.js.map