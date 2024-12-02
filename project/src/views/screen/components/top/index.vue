<template>
    <div class="top">
        <div class="left">
            <span class="lbtn" @click="goHome">首页</span>
        </div>
        <div class="center">
            <div class="title">智慧旅游可视化数据平台</div>
        </div>
        <div class="right">
            <span class="rbtn">统计报告</span>
            <span class="time">当前时间:{{ time }}</span>

        </div>
    </div>
</template>

<script setup lang="ts">
import moment from 'moment';
import { onBeforeMount, onMounted, onUnmounted, ref } from 'vue';
import { useRouter } from 'vue-router';
let time = ref(moment().format('YYYY年MM月DD日:hh:mm:ss'));
let timer = ref(0);
let $router = useRouter();
const goHome = () => {
    $router.push('/home')
}
onMounted(() => {
    timer.value = setInterval(() => {
        time.value = moment().format('YYYY年MM月DD日:hh:mm:ss');
    }, 1000)
})
onUnmounted(() => {

});
onBeforeMount(() => {
    clearInterval(timer.value)
})
</script>

<style scoped lang="scss">
.top {
    width: 100%;
    height: 40px;
    display: flex;

    .left {
        flex: 1;
        background: url(../../images/dataScreen-header-left-bg.png) no-repeat;
        background-size: cover;

        .lbtn {
            width: 100px;
            height: 40px;
            float: right;
            background: url(../../images/dataScreen-header-btn-bg-l.png) no-repeat;
            background-size: 100% 100%;
            text-align: center;
            line-height: 40px;
            color: #29fcff;
            font-size: 20px;
        }
    }

    .center {
        flex: 2;

        .title {
            width: 100%;
            height: 74px;
            background: url(../../images/dataScreen-header-center-bg.png) no-repeat;
            background-size: 100% 100%;
            text-align: center;
            font-size: 30px;
            line-height: 74px;
            color: #29fcff;
        }
    }

    .right {
        flex: 1;
        background: url(../../images/dataScreen-header-left-bg.png) no-repeat;
        background-size: cover;
        display: flex;
        justify-content: space-between;
        align-items: center;

        .rbtn {
            width: 100px;
            height: 40px;
            float: left;
            background: url(../../images/dataScreen-header-btn-bg-l.png) no-repeat;
            background-size: 100% 100%;
            text-align: center;
            line-height: 40px;
            color: #29fcff;
            font-size: 20px;
        }

        .time {
            color: #29fcff;
            margin-right: 10px;
        }
    }
}
</style>