/**
 * @file definition for the PagedRequest class and PagedResponse interface
 * @author Bruno Ferreira <shirayuki@kitsune.com.br>
 * @license MIT
 */
import { Request, RequestOptions } from './request';
/**
 * Interface defining the response for a {@link PagedRequest}
 */
export interface PagedResponse<T> {
    /**
     * Total items stored
     */
    totalItems: number;
    /**
     * Items contained in this page
     */
    items: T[];
}
export declare class PagedRequest<InType, OutType> extends Request<InType, PagedResponse<OutType>> {
    private _page;
    private _limit;
    /**
     * Gets the current page number
     */
    /**
     * Sets the current page number
     */
    page: number;
    /**
     * Gets how many items a page can contain at most
     */
    readonly limit: number;
    /**
     * Initializes a new PagedRequest
     *
     * @param _limit how many items a page can contain at most
     * @param options options for this request {@see RequestOptions}
     */
    constructor(_limit: number, options: RequestOptions);
    /**
     * Requests the next page
     */
    next(body?: InType): Promise<PagedResponse<OutType>>;
    /**
     * Requests the current page
     */
    requestPage(body?: InType): Promise<PagedResponse<OutType>>;
}
