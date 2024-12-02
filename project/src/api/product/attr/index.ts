import request from "../../../utils/request";
import { AttrResponseData, CategoryResponseData } from "./type";
import type { Attr } from "./type";
enum API {
    C1_URL = '/admin/product/getCategory1',

    C2_URL = '/admin/product/getCategory2/',

    C3_URL = '/admin/product/getCategory3/',

    ATTR_URL = '/admin/product/attrInfoList/',

    ADDORUPDATEATTR_URL = '/admin/product/saveAttrInfo',

    DELETEATTR_URL = '/admin/product/deleteAttr/'

}


export const reqC1 = () => request.get<any, CategoryResponseData>(API.C1_URL);
export const reqC2 = (Category1Id: number | string) => request.get<any, CategoryResponseData>(API.C2_URL + Category1Id);
export const reqC3 = (Category2Id: number | string) => request.get<any, CategoryResponseData>(API.C3_URL + Category2Id)

export const reqAttr = (category1Id: number | string, category2Id: number | string, category3Id: number | string) => request.get<any, AttrResponseData>(API.ATTR_URL + `${category1Id}/${category2Id}/${category3Id}`);

export const reqAddOrUpdateAttr = (data: Attr) => request.post<any, any>(API.ADDORUPDATEATTR_URL, data);
export const reqRemoveAttr = (attrId: number) => request.delete<any, any>(API.DELETEATTR_URL + attrId);
