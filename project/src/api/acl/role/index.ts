import request from "../../../utils/request";
import { MeunResponseData, RoleData, RoleResponseData } from "./type";


enum API {
    ALLROLE_URL = '/admin/acl/role/',
    ADDROLE_URL = '/admin/acl/role/save',
    UPDATEROLE_URL = '/admin/acl/role/update',
    ALLPERMISSION = '/admin/acl/permission/toAssign/',
    SETPERMISTION_URL = '/admin/acl/permission/doAssign/?',
    REMOVEROLE_URL = '/admin/acl/role/remove/'
}

export const reqAllRoleList = (page: number, limit: number, roleName: string) => request.get<any, RoleResponseData>(API.ALLROLE_URL + `${page}/${limit}/?roleName=${roleName}`)

export const reqAddOrUpdateRole = (data: RoleData) => {
    if (data.id) {
        return request.put<any, any>(API.UPDATEROLE_URL, data)

    } else {
        return request.post<any, any>(API.ADDROLE_URL, data)
    }
}

export const reqAllMenuList = (roleId: number) => request.get<any, MeunResponseData>(API.ALLPERMISSION + roleId)

export const reqSerPermisstion = (roleId: number, permissionId: number[]) => request.post<any, any>(API.SETPERMISTION_URL + `roleId=${roleId}&permissionId:${permissionId}`)

export const reqRemoveRole = (roleId: number) => request.delete<any, any>(API.REMOVEROLE_URL + roleId)