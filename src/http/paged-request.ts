import { Request, RequestOptions } from './request'
import { URLSearchParams } from 'url'

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
        const params = new URLSearchParams(this.url.search)
        params.set('limit', this.limit.toFixed(0))
        params.set('start', (this.limit * this.page).toFixed(0))

        return this.begin(body)
    }
}
