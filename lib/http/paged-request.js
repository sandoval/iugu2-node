"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const request_1 = require("./request");
const url = require("url");
const querystring = require("querystring");
class PagedRequest extends request_1.Request {
    constructor(_limit, options) {
        super(options);
        this._page = 0;
        this._limit = 0;
        this._limit = _limit;
    }
    get page() {
        return this._page;
    }
    set page(v) {
        this._page = v;
    }
    get limit() {
        return this._limit;
    }
    next() {
        this.page++;
        return this.requestPage();
    }
    requestPage(body) {
        let params = {};
        if (this.url.search) {
            params = querystring.parse(this.url.search);
        }
        params.limit = this.limit.toFixed(0);
        params.start = (this.limit * this.page).toFixed(0);
        this.url.search = '?' + querystring.stringify(params);
        // Recreate HTTP request object
        this.setUrl(url.format(this.url));
        return this.begin(body);
    }
}
exports.PagedRequest = PagedRequest;
//# sourceMappingURL=paged-request.js.map