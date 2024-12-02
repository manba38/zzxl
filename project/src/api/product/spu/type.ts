

export interface ResponseData {
    code: number,
    message: string,
    ok: boolean
}

export interface SpuData {
    id?: number,
    spuName: string,
    description: string,
    category3Id: string | number,
    tmId: number | string,
    spuSaleAttrList: null | SaleAttr[], // 修改这里，使其与 SaleAttr[] 类型相匹配
    spuImageList: null | SpuImg[]
}

export type Records = SpuData[];

export interface HasSpuResponseData extends ResponseData {
    data: {
        records: Records,
        total: number,
        size: number,
        current: number,
        searchCount: boolean,
        pages: number
    }
}
export interface Teademark {
    id: number,
    tmName: string,
    logoUrl: string
}
export interface AllTradeMark extends ResponseData {
    data: Teademark[]
}

export interface SpuImg {
    id?: number,
    cteateTime?: string,
    updateTime?: string,
    spuId?: number,
    imgName?: string,
    imgUrl?: string,
    name?: string,
    url?: string
}
export interface SpuHasImg extends ResponseData {
    data: SpuImg[]
}

export interface SaleAttrValue {
    id?: number,
    createTime?: null,
    updateTime?: null,
    spuId?: number,
    baseSaleAttrId: number | string,
    saleAttrValueName: string,
    saleAttrName?: string,
    isChecked?: null
}
export type spuSaleAttrValueList = SaleAttrValue[];

export interface SaleAttr {
    id?: number,
    createTime?: string | null,
    updateTime?: null,
    spuId?: number,
    baseSaleAttrId: number | string,
    saleAttrName: string,
    spuSaleAttrValueList: spuSaleAttrValueList,
    flag?: boolean;
    saleAttrValue?: number | string,
}


export interface SaleAttrResponseData extends ResponseData {
    data: SaleAttr[]
}

export interface HasSaleAttr {
    id: number,
    name: string
}

export interface HasSaleAttrResponseData extends ResponseData {
    data: HasSaleAttr[]
}



export interface SkuData {
    category3Id: string | number,
    spuId: string | number,
    tmId: string | number,
    skuName: string,
    price: string | number,
    weight: string | number,
    skuDesc: string,
    isSale?: number,
    id?: number,
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

export interface SkuInfoData extends ResponseData {
    data: SkuData[]
}

export interface Attr {
    "attrId": number | string,
    "valueId": number | string,
}

export interface saleAttr {
    "saleAttrId": number | string,
    "saleAttrValueId": number | string
}