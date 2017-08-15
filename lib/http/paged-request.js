"use strict";
/**
 * @file definition for the PagedRequest class and PagedResponse interface
 * @author Bruno Ferreira <shirayuki@kitsune.com.br>
 * @license MIT
 */
Object.defineProperty(exports, "__esModule", { value: true });
const request_1 = require("./request");
const url = require("url");
const querystring = require("querystring");
class PagedRequest extends request_1.Request {
    /**
     * Initializes a new PagedRequest
     *
     * @param _limit how many items a page can contain at most
     * @param options options for this request {@see RequestOptions}
     */
    constructor(_limit, options) {
        super(options);
        this._page = 0;
        this._limit = 0;
        this._limit = _limit;
    }
    /**
     * Gets the current page number
     */
    get page() {
        return this._page;
    }
    /**
     * Sets the current page number
     */
    set page(v) {
        this._page = v;
    }
    /**
     * Gets how many items a page can contain at most
     */
    get limit() {
        return this._limit;
    }
    /**
     * Requests the next page
     */
    next(body) {
        this.page++;
        return this.requestPage(body);
    }
    /**
     * Requests the current page
     */
    requestPage(body) {
        let params = {};
        if (this.url.search) {
            params = querystring.parse(this.url.search);
        }
        if (this.limit) {
            params.limit = this.limit.toFixed(0);
        }
        if (this.limit && this.page) {
            params.start = (this.limit * this.page).toFixed(0);
        }
        this.url.search = '?' + querystring.stringify(params);
        // Recreate HTTP request object
        this.setUrl(url.format(this.url));
        return this.begin(body);
    }
}
exports.PagedRequest = PagedRequest;
//# sourceMappingURL=paged-request.js.map