/** 分页请求参数 */
declare interface QueryCondition {
    pageSize: number
    pageNum: number
}

/** 分页响应参数 */
interface QueryRes<T> extends QueryCondition {
    record: T[] | null
    total: number
}

/** 响应体 */
declare interface ResponeBody<T = any | null> {
    status: boolean
    msg: string
    data: T
}


