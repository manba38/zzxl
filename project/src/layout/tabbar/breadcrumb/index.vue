<template>

    <el-icon style="margin-right:10px" @click="changeIcon">
        <component :is="LayOutSettingStore.Fold ? 'Fold' : 'Expand'"></component>
    </el-icon>
    <el-breadcrumb separator-icon="ArrowRight">
        <el-breadcrumb-item v-for="(item, index) in $route.matched" :key="index" v-show="item.meta.title"
            :to="item.path">
            <el-icon style="margin: 0px 2px;">
                <component :is="item.meta.icon"></component>
            </el-icon>
            <span>{{ item.meta.title }}</span>
        </el-breadcrumb-item>
    </el-breadcrumb>
</template>

<script setup lang="ts">
import { useRoute } from 'vue-router';
import userLayOutSettingStore from '../../../store/modules/types/setting';
let LayOutSettingStore = userLayOutSettingStore();
const changeIcon = () => {
    LayOutSettingStore.Fold = !LayOutSettingStore.Fold;
}
let $route = useRoute()

</script>

<style scoped></style>