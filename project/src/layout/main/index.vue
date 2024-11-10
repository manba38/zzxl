<template>
    <div>
        <router-view v-slot="{ Component }">
            <transition name="fade">
                <component :is="Component" v-if="flag" />
            </transition>
        </router-view>
    </div>
</template>

<script setup lang="ts">
import useLayOutSettingStore from '@/store/modules/types/setting'
import { watch, ref, nextTick } from 'vue';
let flag = ref(true);
let layoutSettingStore = useLayOutSettingStore();
watch(() => layoutSettingStore.refsh, () => (
    flag.value = false,
    nextTick(() => {
        flag.value = true
    })
))
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
</style>