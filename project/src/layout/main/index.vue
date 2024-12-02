<template>
    <div :class="{ 'dark': isDark }" class="main">
        <router-view v-slot="{ Component }">
            <transition name="fade">
                <component :is="Component" v-if="flag" />
            </transition>
        </router-view>
    </div>
</template>

<script setup lang="ts">
import { watch, ref, nextTick, computed } from 'vue';
import { useDarkModeStore } from '../../store/modules/types/daek';
import userLayOutSettingStore from '../../store/modules/types/setting';

const darkModeStore = useDarkModeStore(); // 使用 Dark Mode Store
const isDark = computed(() => darkModeStore.dark); // 创建一个计算属性来获取 dark 状态

let flag = ref(true);
let layoutSettingStore = userLayOutSettingStore();

watch(() => layoutSettingStore.refsh, () => {
    flag.value = false;
    nextTick(() => {
        flag.value = true;
    });
});
</script>

<style scoped>
.fade-enter-active {
    transition: all 1s;
}

.fade-enter-from {
    opacity: 0;
    transform: scale(0);
}

.fade-enter-to {
    opacity: 1;
    transform: scale(1);
}

.main {
    transition: background-color 0.3s;
    /* 平滑过渡背景颜色变化 */
}

.main.dark {
    background-color: black;
}
</style>