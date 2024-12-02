<template>
    <div class="box">
        <div class="top">
            <p class="title">实时游客统计</p>
            <p class="bg"></p>
            <p class="right">可预约总量<span>99999</span>人</p>
        </div>
        <div class="number">
            <span v-for="(item, index) in people" :key="index">{{ item }}</span>
        </div>
        <div class="charts" ref="charts"></div>
    </div>
</template>

<script setup lang="ts">
import { onMounted, ref } from 'vue';
import *as echarts from 'echarts'
import 'echarts-liquidfill'
let people = ref('215908人')
let charts = ref();
onMounted(() => {
    let mycharts = echarts.init(charts.value);
    mycharts.setOption({
        title: {
            text: '水球图'
        },
        xAxis: {},
        yAxis: {},
        series: {
            type: 'liquidFill',
            data: [0.6, 0.4, 0.2],
            waveAnimation: true,
            animationDuration: 3,
            animationDurationUpadate: 0,
            radius: '100%'
        },
        grid: {
            left: 0,
            right: 0,
            top: 0,
            bottom: 0
        }
    })
})
</script>

<style scoped>
.box {
    background: url(../../images/dataScreen-main-lb.png);
    background-size: 100% 100%;
    margin-top: 10px;

    .top {
        .title {
            color: white;
            font-size: 20px;

        }

        .bg {
            width: 68px;
            height: 7px;
            background: url(../../images//dataScreen-title.png)no-repeat;
            background-size: 100% 100%;
            margin-top: 10px;
        }

        .right {
            float: right;
            color: white;
            font-size: 20px;

            span {
                color: yellowgreen;
            }
        }
    }

    .number {
        padding: 20px;
        margin-top: 30px;
        display: flex;

        span {
            flex: 1;
            height: 50px;
            text-align: center;
            line-height: 50px;
            background: url(../../images/total.png) no-repeat;
            background-size: 100% 100%;
            color: aqua;
            font-size: 30px;
        }
    }

    .charts {
        width: 100%;
        height: 260px;
    }
}
</style>