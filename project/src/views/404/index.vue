<template>
    <div class="box">
        <img src="../../assets/images/error_images/404.png" alt="">
        <button @click="goHome">回到首页吧</button>
    </div>
</template>

<script setup lang="ts">
import { useRouter } from 'vue-router';

let $router = useRouter();
const goHome = () => {
    $router.push('/home')
}
</script>

<style lang="scss" scoped>
.box {
    width: 100%;
    height: 100%;
    background: white;
    display: flex;
    justify-content: center;

    img {
        margin-left: 450px;
        width: 800px;
        height: 400px;
    }

    button {
        margin-top: 20px;
        border-radius: 10px;
        height: 50px;
        width: 100px;
        background-color: rgb(220, 215, 215);

    }
}
</style>