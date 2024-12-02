<template>
    <div>
        <el-button size="samll" :icon="Refresh" circle @click="updateRefsh"></el-button>
        <el-button size="samll" :icon="FullScreen" circle @click="fullScreen"></el-button>
        <el-popover title="主题设置" :width="300" trigger="hover">
            <el-form>
                <el-form-item label="主题颜色">
                    <el-color-picker :teleported="false" @change="setColor" size="lager" v-model="color" show-alpha
                        :predefine="predefineColors" />
                </el-form-item>
                <el-form-item label="暗黑模式">
                    <el-switch @change="changeDark" v-model="dark" size="lager" active-icon="MoonNight"
                        inactive-icon="Sunny" inline-prompt />
                </el-form-item>
            </el-form>
            <template #reference>
                <el-button size="samll" :icon="Setting" circle></el-button>
            </template>
        </el-popover>

        <img :src="userStore.avatar" alt="" style="width: 32px;height: 32px; margin:0px 10px;border-radius: 50%; ">

        <el-dropdown>
            <span class="el-dropdown-link" style="margin: 8px;">
                {{ userStore.username }}
                <el-icon class="el-icon--right">
                    <arrow-down />
                </el-icon>
            </span>
            <template #dropdown>
                <el-dropdown-menu>
                    <el-dropdown-item @click="logout()">退出登录</el-dropdown-item>

                </el-dropdown-menu>
            </template>
        </el-dropdown>
    </div>
</template>

<script setup lang="ts">
import { useRouter, useRoute } from 'vue-router';
import { FullScreen, Refresh, Setting } from '@element-plus/icons-vue';

// 获取用户相关的小仓库
import useUserStore from '../../../store/modules/user';
// 获取路由器对象
let $router = useRouter();
// 获取路由对象
let $route = useRoute();
let dark = ref<boolean>(false)
// 获取骨架的小仓库
import useLayOutSettingStore from '../../../store/modules/types/setting';
import { ref } from 'vue';
import { useDarkModeStore } from '../../../store/modules/types/daek';

let userStore = useUserStore();
let layoutSettingStore = useLayOutSettingStore();
// 刷新按钮点击回调
const updateRefsh = () => {
    layoutSettingStore.refsh = !layoutSettingStore.refsh
}
// 全屏按钮点击回调
const fullScreen = () => {
    let full = document.fullscreenElement;
    if (!full) {
        document.documentElement.requestFullscreen()
    } else {
        document.exitFullscreen()
    }
}
// 推出登录点击回调
const logout = async () => {
    // 第一件事情:需要向服务器发请求 退出登录的接口
    // 第二件事情:仓库当中关于用于相关的数据清空 token username avatar
    // 第三件事情:跳转到登录页面
    await userStore.userLogout();
    // 跳转到登录页页面
    $router.push({ path: '/login', query: { redirect: $route.path } })
}

const color = ref('rgba(255, 69, 0, 0.68)')
const predefineColors = ref([
    '#ff4500',
    '#ff8c00',
    '#ffd700',
    '#90ee90',
    '#00ced1',
    '#1e90ff',
    '#c71585',
    'rgba(255, 69, 0, 0.68)',
    'rgb(255, 120, 0)',
    'hsv(51, 100, 98)',
    'hsva(120, 40, 94, 0.5)',
    'hsl(181, 100%, 37%)',
    'hsla(209, 100%, 56%, 0.73)',
    '#c7158577',
])
// 引入 Pinia store

const changeDark = () => {
    const darkModeStore = useDarkModeStore();
    darkModeStore.toggleDarkMode(); // 切换暗黑模式状态

    let html = document.documentElement;
    html.className = darkModeStore.dark ? 'dark' : '';
};


const setColor = () => {
    const html = document.documentElement;
    html.style.setProperty('--el-color-primary', color.value)
}

</script>

<style scoped></style>