import { Request, RequestOptions } from './request'

import * as url from 'url'
import * as querystring from 'querystring'

export interface PagedResponse<T> {
    totalItems: number
    items: T[]
}

export class PagedRequest<InType, OutType> extends Request<InType, PagedResponse<OutType>> {
    private _page = 0
    private _limit = 0

    public get page(): number {
        return this._page;
    }
    public set page(v: number) {
        this._page = v;
    }

    public get limit(): number {
        return this._limit
    }

    constructor(_limit: number, options: RequestOptions) {
        super(options)

        this._limit = _limit
    }

    public next(): Promise<PagedResponse<OutType>> {
        this.page++

        return this.requestPage()
    }

    public requestPage(body?: InType): Promise<PagedResponse<OutType>> {
        let params: any = {}
        if (this.url.search) {
            params = querystring.parse(this.url.search)
        }
        params.limit = this.limit.toFixed(0)
        params.start = (this.limit * this.page).toFixed(0)
        this.url.search = '?' + querystring.stringify(params)

        // Recreate HTTP request object
        this.setUrl(url.format(this.url))

        return this.begin(body)
    }
}
