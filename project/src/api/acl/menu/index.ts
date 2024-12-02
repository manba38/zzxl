import request from "../../../utils/request";
import { MenuParams, PermisstionResponseData } from "./type";


enum API {
    ALLPERMISSTION_URL = '/admin/acl/permission',
    ADDMENU_URL = '/admin/acl/permission/save',
    UPDATE_URL = '/admin/acl/permission/update',
    DELETEMENU_URL = '/admin/acl/permission/remove/'
}

export const reqAllPermisstion = () => request.get<any, PermisstionResponseData>(API.ALLPERMISSTION_URL)

export const reqAddOrUpdateMenu = (data: MenuParams) => {
    if (data.id) {
        return request.put<any, any>(API.UPDATE_URL, data);
    } else {
        return request.post<any, any>(API.ADDMENU_URL, data)
    }
}

export const reqRemoveMenu = (id: number) => request.delete<any, any>(API.DELETEMENU_URL + id)