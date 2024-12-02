export interface ResponseData {
    code: number,
    message: string,
    ok: boolean
}

export interface Permisstion {
    id: number,
    createTime: string,
    updateTime: string,
    pid: number,
    name: string,
    code: null,
    toCode: string,
    type: number,
    status: null,
    level: number,
    children?: PermisstionList,
    select: boolean
}

export type PermisstionList = Permisstion[]

export interface PermisstionResponseData extends ResponseData {
    data: PermisstionList
}

export interface MenuParams {
    code: string,
    id?: number,
    level: number,
    name: string,
    pid: number,
}