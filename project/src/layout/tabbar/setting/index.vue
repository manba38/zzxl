<template>
    <div>
        <el-button size="samll" :icon="Refresh" circle @click="updateRefsh"></el-button>
        <el-button size="samll" :icon="FullScreen" circle @click="fullScreen"></el-button>
        <el-button size="samll" :icon="Setting" circle></el-button>
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
                    <el-dropdown-item>退出登录</el-dropdown-item>

                </el-dropdown-menu>
            </template>
        </el-dropdown>
    </div>
</template>

<script setup lang="ts">
import { FullScreen, Refresh, Setting } from '@element-plus/icons-vue';
import useLayOutSettingStore from '../../../store/modules/types/setting';
import useUserStore from '../../../store/modules/user';
let userStore = useUserStore();
let layoutSettingStore = useLayOutSettingStore();
const updateRefsh = () => {
    layoutSettingStore.refsh = !layoutSettingStore.refsh
}
const fullScreen = () => {
    let full = document.fullscreenElement;
    if (!full) {
        document.documentElement.requestFullscreen()
    } else {
        document.exitFullscreen()
    }
}
</script>

<style scoped></style>