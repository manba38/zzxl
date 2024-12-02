<template>
    <div class="box6">
        <div class="title">
            <p>热门景区排行</p>
            <img src="../../images/dataScreen-title.png" alt="">
        </div>
        <div class="charts" ref="charts">

        </div>
    </div>
</template>

<script setup lang="ts">
import { onMounted, ref } from 'vue';
import *as echarts from 'echarts'
let charts = ref();
onMounted(() => {
    let mycharts = echarts.init(charts.value);
    mycharts.setOption({
        title: {
            text: '景区排行',
            left: '50%',
            textStyle: {
                color: 'skyblue',
                fontSize: 20
            },
            subtext: '各大景区排行',
            subtextStyle: {
                color: "yellowgreen"
            }
        },
        xAxis: {
            type: 'category'
        },
        yAxis: {
        },

        series: [
            {
                type: 'bar',
                data: [10, 20, 30, 40, 50, 60, 70],
                label: {
                    show: true,
                    position: 'insideTop',
                    color: 'yellowgreen'
                },
                showBackground: true,
            },
            {
                type: 'line',
                data: [10, 20, 30, 40, 50, 60, 90],
                smooth: true
            }
        ],
        grid: {
            left: 20,
            right: 20,
            top: 48,
            bottom: 10
        }
    })
})
</script>

<style scoped>
.box6 {
    background: url(../../images/dataScreen-main-lb.png);
    background-size: 100% 100%;
    margin: 20px 0px;
    width: 100%;
    height: 100%;

    .title {

        p {
            color: white;
            font-size: 20px;
        }
    }

    .charts {
        width: 100%;
        height: 350px;
    }
}
</style>