import { defineStore } from "pinia";

// 创建用户相关小仓库
import { reqLogin, reqUserInfo } from "../../api/user";
import { loginForm, loginResponseData } from "../../api/user/type";
import type { UserState } from "./types/type";
import { SET_TOKEN, GET_TOKEN } from "../../utils/token";
import { constantRoute } from "../../router/routes";
let useUserStore = defineStore('User', {
    state: (): UserState => {
        return {
            token: GET_TOKEN(),
            menuRoutes: constantRoute,
            username: '',
            avatar: ''
        }
    },



    actions: {
        async userLogin(data: loginForm) {
            let result: loginResponseData = await reqLogin(data)
            if (result.code == 200) {
                this.token = (result.data.token as string);
                SET_TOKEN((result.data.token as string))
                return 'ok'
            } else {
                return Promise.reject(new Error(result.data.message))
            }
        },
        async userInfo() {
            let result = await reqUserInfo();
            if (result.code == 200) {
                this.username = result.data.checkUser.username;
                this.avatar = result.data.checkUser.avatar
            }
        }




    },

    getters: {

    }
})

export default useUserStore