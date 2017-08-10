import { Request, RequestOptions } from './request';
export interface PagedResponse<T> {
    totalItems: number;
    items: T[];
}
export declare class PagedRequest<InType, OutType> extends Request<InType, PagedResponse<OutType>> {
    private _page;
    private _limit;
    page: number;
    readonly limit: number;
    constructor(_limit: number, options: RequestOptions);
    next(): Promise<PagedResponse<OutType>>;
    requestPage(body?: InType): Promise<PagedResponse<OutType>>;
}
