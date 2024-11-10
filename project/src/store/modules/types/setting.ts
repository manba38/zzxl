// 关于layout组件相关配置仓库

import { defineStore } from "pinia";

let userLayOutSettingStore = defineStore('SettingStore', {
    state: () => {
        return {
            Fold: false,
            refsh: false
        }
    }
})


export default userLayOutSettingStore;
