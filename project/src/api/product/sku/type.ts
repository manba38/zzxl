export interface ResponseData {
    code: number,
    message: string,
    ok: boolean
}

export interface SkuData {
    category3Id: string | number,
    spuId: string | number,
    tmId: string | number,
    skuName: string,
    price: string | number,
    weight: string | number,
    skuDesc: string,
    skuAttrValueList?: [
        {
            attrId: number | string,
            valueId: number | string
        }],
    skuSaleAttrValueList?: [
        {
            saleAttrId: number | string,
            saleAttrValueId: number | string,
        }
    ],
    skuDefaultImg: string
}

export interface saleAttr {
    "saleAttrId": number | string,
    "saleAttrValueId": number | string
}

export interface Attr {
    id?: number,
    "attrId": number | string,
    "valueId": number | string,
}

export interface SkuResponseData extends ResponseData {
    data: {
        records: SkuData[],
        total: number,
        size: number,
        current: number,
        orders: [],
        optimizeCountSql: boolean,
        hitCount: boolean,
        countId: null,
        maxLimit: null,
        searchCount: boolean,
        pages: number
    }
}

export interface SkuInfoData extends ResponseData {
    data: SkuData
}