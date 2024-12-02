<template>
    <el-card>
        <div class="box">
            <img :src="useStore.avatar" alt="" class="avatar">
            <div class="bottom">
                <h1 class="title">{{ getTime() }}好呀{{ useStore.username }}</h1>
                <p class="subtitle">ErrorMaker3的运营平台</p>
            </div>
        </div>

    </el-card>
    <div class="bottoms">
        <svg-icon name="welcome" width="500px" height="500px"></svg-icon>
    </div>
</template>

<script setup lang="ts">
import { onMounted } from 'vue';
import useUserStore from '../../store/modules/user';
import { getTime } from '../../utils/time';
let userStore = useUserStore()
onMounted(() => {
    userStore.userInfo()
})
let useStore = useUserStore()
</script>

<style scoped lang="scss">
.box {
    display: flex;

    .avatar {
        width: 100px;
        height: 100px;
        border-radius: 50%;
    }

    .bottom {
        margin-left: 20px;

        .title {
            margin-top: 20px;
            font-size: 20px;
            margin-bottom: 10px;
            font-weight: 900;
        }

        .subtitle {
            font-style: italic;
            color: skyblue;
        }
    }

}

.bottoms {
    margin-top: 10px;
    display: flex;
    justify-content: center;
}
</style>