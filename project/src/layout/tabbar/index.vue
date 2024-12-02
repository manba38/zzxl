<template>
    <div class="tabbar" :class="{ 'dark': isDark }">
        <div class="tabbar_left">
            <BreadCrumb></BreadCrumb>
        </div>
        <div class="tabbar_right">
            <Setting></Setting>
        </div>
    </div>
</template>

<script setup lang="ts">
import { computed } from 'vue';
import { useDarkModeStore } from '../../store/modules/types/daek';
import BreadCrumb from './breadcrumb/index.vue';
import Setting from './setting/index.vue';

const darkModeStore = useDarkModeStore(); // 使用 Dark Mode Store
const isDark = computed(() => darkModeStore.dark); // 创建一个计算属性来获取 dark 状态
</script>

<style scoped lang="scss">
.tabbar {
    width: 100%;
    height: 100%;
    display: flex;
    justify-content: space-between;
    background-color: white; // 默认背景颜色为白色
    transition: background-color 0.3s; // 平滑过渡背景颜色变化

    &.dark {
        background-color: black; // 当 .dark 类存在时，背景颜色为黑色
    }

    .tabbar_left {
        display: flex;
        align-items: center;
        margin-left: 20px;
    }

    .tabbar_right {
        display: flex;
        align-items: center;
    }
}
</style>