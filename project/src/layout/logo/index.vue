<template>
    <div class="logo" v-if="setting.logoHidden">
        <img :src="setting.logo" alt="">
        <p>{{ setting.title }}</p>

    </div>
</template>

<script setup lang="ts">
import setting from '../../setting';
</script>

<style scoped lang="scss">
.logo {
    width: 100%;
    height: 50px;
    color: white;
    display: flex;
    align-items: center;
    padding: 12px;
    padding-top: 20px;


    img {
        width: 40px;
        height: $base-menu-logo-height ;
    }

    p {
        font-size: $base-logo-title-fontSize;
        margin-left: 10px;
    }
}
</style>