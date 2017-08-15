/**
 * @file definition for the PagedRequest class and PagedResponse interface
 * @author Bruno Ferreira <shirayuki@kitsune.com.br>
 * @license MIT
 */

import { Request, RequestOptions } from './request'

import * as url from 'url'
import * as querystring from 'querystring'

/**
 * Interface defining the response for a {@link PagedRequest}
 */
export interface PagedResponse<T> {
    /**
     * Total items stored
     */
    totalItems: number

    /**
     * Items contained in this page
     */
    items: T[]
}

export class PagedRequest<InType, OutType> extends Request<InType, PagedResponse<OutType>> {
    private _page = 0
    private _limit = 0

    /**
     * Gets the current page number
     */
    public get page(): number {
        return this._page
    }

    /**
     * Sets the current page number
     */
    public set page(v: number) {
        this._page = v
    }

    /**
     * Gets how many items a page can contain at most
     */
    public get limit(): number {
        return this._limit
    }

    /**
     * Initializes a new PagedRequest
     *
     * @param _limit how many items a page can contain at most
     * @param options options for this request {@see RequestOptions}
     */
    constructor(_limit: number, options: RequestOptions) {
        super(options)

        this._limit = _limit
    }

    /**
     * Requests the next page
     */
    public next(body?: InType): Promise<PagedResponse<OutType>> {
        this.page++

        return this.requestPage(body)
    }

    /**
     * Requests the current page
     */
    public requestPage(body?: InType): Promise<PagedResponse<OutType>> {
        let params: any = {}
        if (this.url.search) {
            params = querystring.parse(this.url.search)
        }
        if (this.limit) {
            params.limit = this.limit.toFixed(0)
        }
        if (this.limit && this.page) {
            params.start = (this.limit * this.page).toFixed(0)
        }
        this.url.search = '?' + querystring.stringify(params)

        // Recreate HTTP request object
        this.setUrl(url.format(this.url))

        return this.begin(body)
    }
}
