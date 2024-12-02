import { defineStore } from "pinia";
import type { loginFormData, loginResponseData, userInfoReponseData } from "../../api/user/type";

// 创建用户相关小仓库
import { reqLogin, reqUserInfo, reqLogout } from "../../api/user";
import type { UserState } from "./types/type";
import { SET_TOKEN, GET_TOKEN, REMOVE_TOKEN } from "../../utils/token";
import { anyRoute, asnycRoute, constantRoute } from "../../router/routes";
import router from "../../router";
// @ts-ignore
import cloneDeep from 'lodash/cloneDeep'
function filterAsyncRoute(asnycRoute: any, routes: any) {
    return asnycRoute.filter((item: any) => {
        if (routes.includes(item.name)) {
            if (item.children && item.children.length > 0) {
                item.children = filterAsyncRoute(item.children, routes);
            }
            return true
        }
    })
}


let useUserStore = defineStore('User', {
    state: (): UserState => {
        return {
            token: GET_TOKEN(),
            menuRoutes: constantRoute,
            username: '',
            avatar: '',
            buttons: []
        }
    },



    actions: {
        async userLogin(data: loginFormData) {
            let result: loginResponseData = await reqLogin(data);
            console.log(result);
            if (result.code == 200) {
                this.token = (result.data as string);
                SET_TOKEN((result.data as string));
                localStorage.setItem("TOKEN", result.data as string)
                return 'ok'
            } else {
                return Promise.reject(new Error(result.data))
            }
        },
        async userInfo() {
            let result: userInfoReponseData = await reqUserInfo();

            if (result.code == 200) {
                console.log(result.data)
                if (result.code == 200) {
                    const { buttons, name, avatar } = result.data;
                    this.username = name;
                    this.avatar = avatar;
                    this.buttons = buttons;
                    // ...其他代码...
                }
                let userAsyncRoutes = filterAsyncRoute(cloneDeep(asnycRoute), result.data.routes);
                this.menuRoutes = [...constantRoute, ...userAsyncRoutes, ...anyRoute];
                [...userAsyncRoutes, ...anyRoute].forEach((route: any) => {
                    router.addRoute(route);
                })
                return 'ok';
            } else {
                return Promise.reject(new Error(result.message))
            }
        },
        async userLogout() {

            let result: any = await reqLogout();
            if (result.code == 200) {
                await reqLogout();
                this.token = '';
                this.username = '';
                this.avatar = '';
                REMOVE_TOKEN();
                return 'ok';
            } else {
                return Promise.reject(new Error(result.message))
            }
        }




    },

    getters: {

    }
})

export default useUserStore