<template>

    <template v-for="(item) in menuList" :key="item.path">
        <template v-if="!item.children">
            <el-menu-item v-if="!item.meta.hidden" :index="item.path" @click="goRoute" class="test">
                <el-icon>
                    <component :is="item.meta.icon"></component>
                </el-icon>
                <template #title>

                    <span class="pl">{{ item.meta.title }}</span>
                </template>
            </el-menu-item>
        </template>

        <template v-if="item.children && item.children.length == 1">
            <el-menu-item v-if="!item.children[0].meta.hidden" :index="item.children[0].path" @click="goRoute">
                <el-icon>
                    <component :is="item.children[0].meta.icon"></component>
                </el-icon>
                <template #title>

                    <span class="pl">{{ item.children[0].meta.title }}</span>
                </template>
            </el-menu-item>
        </template>

        <el-sub-menu :index="item.path" v-if="item.children && item.children.length > 1">
            <template #title @click="goRoute">
                <el-icon>
                    <component :is="item.meta.icon"></component>
                </el-icon>
                <span class="pl">{{ item.meta.title }}</span>
            </template>
            <Menu :menuList="item.children"></Menu>
        </el-sub-menu>
    </template>
</template>

<script setup lang="ts">
import { useRouter } from 'vue-router';
defineProps(['menuList']);
// 点击菜单的回调
let $router = useRouter();

const goRoute = (vc: any) => {
    $router.push(vc.index);
}
</script>

<script lang="ts">
export default {
    name: 'Menu'
}
</script>

<style scoped>
.test {
    padding: 0px;
}

.pl {
    padding-left: 15px;
}
</style>