import request from "../../../utils/request";
import { TradeMark, TradeMarkResponseData } from "./type";

// 书写品牌管理接口

// 品牌管理模块接口地址
enum API {
    TRADEMAEK_URL = "/admin/product/baseTrademark/ ",
    // add banner
    ADDTRADEMARK_URL = '/admin/product/baseTrademark/save',
    // change banner
    UPDATETRADEMARK_URL = '/admin/product/baseTrademark/update',
    // delete has message
    DELETE_URL = '/admin/product/baseTrademark/remove/'
}


export const reqHasTradmark = (page: number, limit: number) => request.get<any, TradeMarkResponseData>(API.TRADEMAEK_URL + `${page} / ${limit}`);

// banner add and update 
export const reqAddOruPDATEtRADEMARK = (data: TradeMark) => {
    if (data.id) {
        return request.put<any, any>(API.UPDATETRADEMARK_URL, data);
    } else {
        return request.post<any, any>(API.ADDTRADEMARK_URL, data)
    }
}

export const reqDeleteTrademark = (id: number) => request.delete<any, any>(API.DELETE_URL + id)