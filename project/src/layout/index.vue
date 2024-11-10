<template>
    <div class="layout_container">
        <div class="layout_slider" :class="{ fold: LayOutSettingStore.Fold ? true : false }">
            <Logo></Logo>
            <el-scrollbar class="scrollbar">
                <el-menu :default-active="$route.path" background-color="#050920" text-color="white"
                    :collapse="LayOutSettingStore.Fold ? true : false">
                    <!-- 封装成组件了 -->
                    <Menu :menuList="userStore.menuRoutes"></Menu>
                </el-menu>
            </el-scrollbar>
        </div>
        <div class="layout_tabbar" :class="{ fold: LayOutSettingStore.Fold ? true : false }">
            <Tabbar></Tabbar>
        </div>
        <div class=" layout_main" :class="{ fold: LayOutSettingStore.Fold ? true : false }">

            <Main></Main>
        </div>
    </div>

</template>

<script setup lang="ts">

// 获取路由器对象
import { useRoute } from 'vue-router'
import Logo from './logo/index.vue'
import Menu from './menu/index.vue'
import useUserStore from '../store/modules/user';
import Main from './main/index.vue'
import Tabbar from './tabbar/index.vue'
import userLayOutSettingStore from '../store/modules/types/setting';
let userStore = useUserStore()
let $route = useRoute();
console.log($route.path);
let LayOutSettingStore = userLayOutSettingStore()
</script>

<style lang="scss" scoped>
.layout_container {
    width: 100%;
    height: 100vh;
    background-color: rgb(255, 255, 255);

    .layout_slider {
        color: white;
        width: $base-menu-width;
        height: 100vh;
        background-color: $base-menu-backgroundcolor;
        transition: all 0.3s;



        .scrollbar {
            width: 100%;
            height: calc(100vh - $base-menu-logo-height-img);

            .el-menu {
                border-right: none;

            }


        }


    }

    .layout_tabbar {
        position: fixed;
        width: calc(100vw - $base-menu-width);
        height: $base-tabbar-height;
        background-color: #ffffff;
        top: 0px;
        left: $base-menu-width ;
        transition: all 0.3s;

        &.fold {
            width: calc(100vw - 70px);
            left: $base-menu-min-width ;
        }
    }

    .layout_main {
        position: absolute;
        width: calc(100% - $base-menu-width);
        height: calc(100vh - $base-tabbar-height);
        background-color: rgb(138, 231, 84);
        left: $base-menu-width ;
        top: $base-tabbar-height ;
        padding: 20px;
        overflow: auto;
        transition: all 0.3s;

        &.fold {
            width: calc(100vw - 70px);
            left: $base-menu-min-width ;
        }
    }
}
</style>